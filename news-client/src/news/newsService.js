const axios = require('axios');

export function getNews(callback) {
    const url = '/news?limit=20';

    axios.get(url)
        .then(response => {
            callback(response.data);
        })
        .catch(error => {
            console.error('Unable to get the news.');
        });
}; 

export function deleteNew(id, callback) {
    const url = '/news/' + id;

    axios.delete(url)
        .then(response => {
            callback(response.data);
        })
        .catch(error => {
            console.error('Unable to delete this new.');
        });    
}