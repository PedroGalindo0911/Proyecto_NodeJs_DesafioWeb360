const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

router.get('/', orderController.getAllOrders);
router.post('/', orderController.createOrder);
router.put('/:orderId', orderController.updateOrder);
router.delete('/:orderId', orderController.deleteOrder);

// Rutas para detalles de orden
router.get('/:orderId/details', orderController.getOrderDetails);
router.post('/:orderId/details', orderController.createOrderDetail);
router.put('/details/:detailId', orderController.updateOrderDetail);
router.delete('/details/:detailId', orderController.deleteOrderDetail);

module.exports = router;