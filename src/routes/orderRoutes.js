const express = require('express');
const controller = require('../controllers/orderController');

const router = express.Router();

router.post('/', controller.createOrder);
router.get('/list', controller.getAllOrders);
router.get('/:id', controller.getOrder);
router.put('/:id', controller.updateOrder);
router.delete('/:id', controller.deleteOrder);

module.exports = router;