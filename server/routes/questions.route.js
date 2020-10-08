const express = require('express');
const router = express.Router();

const questionsCtrl = require('../controllers/questions.controller');

router.get('/', questionsCtrl.getAll);
router.post('/new', questionsCtrl.create);
router.get('/:id', questionsCtrl.get);
router.put('/:id', questionsCtrl.update);
router.delete('/:id', questionsCtrl.delete);

module.exports = router;
