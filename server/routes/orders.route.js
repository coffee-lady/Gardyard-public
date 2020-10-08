const express = require('express');
const router = express.Router();

const ordersCtrl = require('../controllers/orders.controller');

router.get('/', ordersCtrl.getAll);
router.post('/new', ordersCtrl.create);
router.get('/:id', ordersCtrl.get);
router.put('/:id', ordersCtrl.update);
router.delete('/:id', ordersCtrl.delete);

module.exports = router;
