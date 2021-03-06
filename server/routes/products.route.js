const express = require('express');
const router = express.Router();

const productsCtrl = require('../controllers/products.controller');

router.get('/', productsCtrl.getAll);
router.post('/new', productsCtrl.create);
router.get('/:id', productsCtrl.get);
router.put('/:id', productsCtrl.update);
router.delete('/:id', productsCtrl.delete);

module.exports = router;
