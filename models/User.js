const mongoose = require('mongoose');

//schrma of db user collection
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    jwt_token: {
        type: String,
        required: true
    }
    ,
    jwt_secret_key: {
        type: String,
        required: true
    }
});

const User = mongoose.model('User', UserSchema);
module.exports = User;