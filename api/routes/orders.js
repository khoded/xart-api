const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/check-auth');

const OrderController = require('../controllers/orders');

// GET - Retrieve all orders
router.get('/', checkAuth, OrderController.orders_get_all);

// POST - Add an order
router.post('/', checkAuth, OrderController.orders_create_order);

// GET - Get a single order
router.get('/:orderId', checkAuth, OrderController.orders_get_order);

// DELETE - Delete an order
router.delete('/:orderId', checkAuth, OrderController.orders_delete_order);

module.exports = router;
