const express = require('express');
const router = express.Router();

const Controllers = require('../controllers');
const usersCtrl = Controllers.api.Users;

router.post('/exists', usersCtrl.exists);
router.get('/:id', usersCtrl.get);
router.get('/', usersCtrl.getAll);
router.put('/:id', usersCtrl.update);

module.exports = router;
