const express = require('express');
const router = express.Router();

const ApiRoutes = require('./api')
const authRoutes = require('./auth.route');

router.use('/auth', authRoutes);
router.use('/users', ApiRoutes.users);
router.use('/products', ApiRoutes.products);
router.use('/orders', ApiRoutes.orders);
router.use('/questions', ApiRoutes.questions);
router.use('/contacts', ApiRoutes.contacts);

module.exports = router;
