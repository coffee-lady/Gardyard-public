const mongoose = require('mongoose');

const States = Object.freeze({
    NEW: 0,
    SENT: 1,
    CLOSED: 2
});

const ProductInOrderSchema = new mongoose.Schema({
    count: {
        type: Number,
        required: true,
    },
    productId: {
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
    userId: {
        type: String,
        required: true
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
    products: [ProductInOrderSchema]
});

module.exports = mongoose.model('Order', OrderSchema, 'orders');
