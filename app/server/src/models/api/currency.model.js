const mongoose = require('mongoose');

const CurrencySchema = new mongoose.Schema({
    code: {
        type: Number,
        required: true
    },
    cost: {
        type: Number,
        required: true
    },
});

module.exports = CurrencySchema;
