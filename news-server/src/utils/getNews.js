const request = require('request')
const NodeNew = require('../data/NodeNew')

const getNews = () => {
    console.log('Getting the last Node JS news.')

    getLastTimeStamp((error, timestamp) => {
        if(error) return console.error('An error occourred calculating last timestamp')

        const url = timestamp ?
            'https://hn.algolia.com/api/v1/search_by_date?query=nodejs&numericFilters=created_at_i%3E' + timestamp :
            'https://hn.algolia.com/api/v1/search_by_date?query=nodejs'

        makeNewRequest(url, (error, news) => {
            if(error){
                return console.error(error)
            }
    
            saveNews(news, (error, newsCount) => {
                if(error) return console.error(error)
                console.log('Got ' + newsCount + ' news')
            })
        })
    })
    
}

const getLastTimeStamp = (callback) => {
    const query = NodeNew.find({}).sort({createdAt: 'desc'}).limit(1)
    query.exec( (err, news) => {
        if(err) return callback(err);    

        if(!news.length) {
            callback(undefined, undefined)
        } else {
            callback(undefined, news[0].createdAt.getTime()/1000)
        }
    }) 
}

const saveNews = (news, callback) => {
    news.forEach(nodeNew => {
        let newToSave = new NodeNew(nodeNew)
          
        newToSave.save((err) => {
            if(err) return callback(err)    
        })
    });
    callback(undefined, news.length)
}

const makeNewRequest = (url, callback) => {

    request({url, json:true}, (error, response) => {
        if(error) { 
            callback('Unable to connect news provider')
        } else {
            const body = response.body
            const news = []
            const hits = body.hits

            for(let hit of hits) {
                let nodeNew = {
                    title: hit.story_title ? hit.story_title: hit.title,
                    author: hit.author,
                    createdAt: hit.created_at,
                    url: hit.story_url ? hit.story_url : url
                }

                if(nodeNew.title) {
                    news.push(nodeNew)
                }
            }
            callback(undefined, news)
        }
    })
}

module.exports = getNews