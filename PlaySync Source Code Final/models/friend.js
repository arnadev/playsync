const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const friendSchema = new Schema({
    userId: {
        type: String,
        required: true,
        unique: true
    },
    friendsList: {
        type: [String],
        default: []
    },
    friendRequests: {
        type: [String],
        default: []
    }
});

const Friend = mongoose.model('Friend', friendSchema);

module.exports = Friend;