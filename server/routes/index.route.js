const express = require('express');
const router = express.Router();

const authRoutes = require('./auth.route');
const usersRoutes = require('./users.route');
const productsRoutes = require('./products.route');

router.use('/auth', authRoutes);
router.use('/users', usersRoutes);
router.use('/products', productsRoutes);

module.exports = router;
