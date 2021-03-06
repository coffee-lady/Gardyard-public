const mongoose = require('mongoose');

const States = Object.freeze({
    NEW: 0,
    SENT: 1,
    ARRIVED: 2,
    CLOSED: 3,
});

const ProductInOrderSchema = new mongoose.Schema({
    count: {
        type: Number,
        required: true,
    },
    id: {
        type: String,
        required: true,
    },
});

const OrderSchema = new mongoose.Schema({
    No: {
        type: Number,
        required: true,
        unique: true
    },
    date: {
        type: Date,
        required: true
    },
    state: {
        type: String,
        enum: Object.values(States),
        required: true
    },
    products: [ProductInOrderSchema],
    rate: {
        type: Number,
        default: 0
    },
    userGeo: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: false
    },
    userPhone: {
        type: Number,
        required: false
    },

});

module.exports = mongoose.model('Order', OrderSchema, 'orders');
