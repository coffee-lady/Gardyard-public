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
})

const PlantSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    picture: {
        data: Buffer,
        contentType: String,
    },
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
    rates: [Number],
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
    // cost: {
    //     type: CurrencySchema,
    //     required: true
    // }
});

module.exports = mongoose.model('Plant', PlantSchema, 'products');
