const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: false
    },
    city: {
        type: String,
        required: false
    },
    hashedPassword: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        enum: ['user', 'manager', 'admin']
    },
}, {
    versionKey: false
});

module.exports = mongoose.model('User', UserSchema, 'users');
