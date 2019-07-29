const moongose = require('mongoose');

const NewSchema = new moongose.Schema({
    title: {
        type: String, 
        required: true
    }, 
    author : {
        type: String,
        required: true
    },
    createdAt : {
        type: Date,
        required: true
    },
    url : {
        type: String
    },
    isDeleted : {
        type: Boolean,
        default: false
    }
});

const NodeNew = moongose.model('NodeNew', NewSchema);

module.exports = NodeNew;