const mongoose = require('mongoose');

const ContactsSchema = new mongoose.Schema({});

module.exports = mongoose.model('Contacts', ContactsSchema, 'contacts');
