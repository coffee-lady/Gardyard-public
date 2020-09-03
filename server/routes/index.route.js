const express = require('express');
const router = express.Router();

const authRoutes = require('./auth.route');
const usersRoutes = require('./users.route');

router.use('/auth', authRoutes);
router.use('/users', usersRoutes);

module.exports = router;
