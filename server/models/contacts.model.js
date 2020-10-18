const mongoose = require('mongoose');

const ContactsSchema = new mongoose.Schema({
    city: {
        type: String,
        required: true,
    },
    latitude: {
        type: Number,
        required: true,
    },
    longitude: {
        type: Number,
        required: true,
    },
});

module.exports = mongoose.model('Contacts', ContactsSchema, 'contacts');
