const express = require('express');
const router = express.Router();

const contactsCtrl = require('../controllers/contacts.contoller');

router.get('/', contactsCtrl.getAll);
router.post('/new', contactsCtrl.create);
router.get('/:id', contactsCtrl.get);
router.put('/:id', contactsCtrl.update);
router.delete('/:id', contactsCtrl.delete);

module.exports = router;
