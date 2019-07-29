const NodeNew = require('./NodeNew');

const getAllNews = (callback) => {
    const query = NodeNew.find({}).sort({createdAt: 'desc'});
    query.exec( (error, news) => {
        if(error) return callback('Unabled to get the news');    
        callback(undefined, news);
    }) 
}

const getNews = (limit, callback) => {
    let query = NodeNew.find({isDeleted: false}).sort({createdAt: 'desc'});

    if(limit){
        query = query.limit(limit);
    }
    
    query.exec( (error, news) => {
        if(error) return callback('Unabled to get the news');    
        callback(undefined, news);
    })
}

const deleteNew = (newId, callback) => {
    NodeNew.updateOne({_id: newId}, { isDeleted: true }, (error, result) => {
        if(error) return callback('Unabled to delete the new');
        callback(undefined, result);
    });
}

module.exports = {
    getAllNews: getAllNews,
    getNews: getNews,
    deleteNew: deleteNew
};