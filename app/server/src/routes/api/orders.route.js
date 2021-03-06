const express = require('express');
const router = express.Router();

const Controllers = require('../../controllers');
const ordersCtrl = Controllers.api.Orders;

router.get('/', ordersCtrl.getAll);
router.post('/new', ordersCtrl.create);
router.get('/:id', ordersCtrl.get);
router.get('/user/:id', ordersCtrl.getAllOfUser);
router.put('/:id', ordersCtrl.update);
router.delete('/:id', ordersCtrl.delete);

module.exports = router;
