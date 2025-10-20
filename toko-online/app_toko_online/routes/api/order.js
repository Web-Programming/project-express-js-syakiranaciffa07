const express = require('express');
const router = express.Router();
const orderController = require('../../controllers/order');

// POST → buat pesanan baru
router.post('/', orderController.createOrder);

// GET → ambil semua pesanan
router.get('/', orderController.getAllOrders);

// GET → ambil pesanan berdasarkan ID
router.get('/:id', orderController.getOrderById);

// PUT → ubah status pesanan
router.put('/:id', orderController.updateOrderStatus);

module.exports = router;