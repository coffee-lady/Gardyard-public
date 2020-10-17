const mongoose = require('mongoose');
const CurrencySchema = require('./currency.model');

const CareItemSchema = new mongoose.Schema({
    param: {
        type: String,
        required: true
    },
    value: {
        type: String,
        required: true
    }
});

const PlantSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    picture: String,
    description: {
        type: String,
        required: true
    },
    cultivation: {
        type: String,
        required: true
    },
    care: [CareItemSchema],
    inStock: Number,
    rates: {
        type: [Number],
        default: [5]
    },
    vendorCode: {
        type: String,
        required: true
    },
    numberOfSeeds: {
        type: Number,
        required: true
    },
    cost: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Plant', PlantSchema, 'products');
