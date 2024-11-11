const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    nickname: {
        type: String,
        required: true,
        default: '[No Nickname]',
    },
    bio: {
        type: String,
        default: '[No Bio]',
    },
    age: {
        type: Number,
        min: 0,
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other','Unset'],
        default: 'Unset',
    },

    belongsTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        unique: true,
    },
    profilePictureName: {
        type: String,
        default: 'other-pfp-placeholder.jpg',
    },
}, { timestamps: true });

const Profile = mongoose.model('profile', profileSchema);
module.exports = Profile;