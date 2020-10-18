const express = require('express');
const router = express.Router();

const authRoutes = require('./auth.route');
const usersRoutes = require('./users.route');
const productsRoutes = require('./products.route');
const ordersRoutes = require('./orders.route');
const questionsRoute = require('./questions.route');
const contactsRoute = require('./contacts.route');

router.use('/auth', authRoutes);
router.use('/users', usersRoutes);
router.use('/products', productsRoutes);
router.use('/orders', ordersRoutes);
router.use('/questions', questionsRoute);
router.use('/contacts', contactsRoute);

module.exports = router;
