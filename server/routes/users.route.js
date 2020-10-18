const express = require('express');
const router = express.Router();

const usersCtrl = require('../controllers/users.controller');

router.post('/exists', usersCtrl.exists);
router.get('/:id', usersCtrl.get);
router.put('/:id', usersCtrl.update);

module.exports = router;
