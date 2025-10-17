const express = require('express');
const router = express.Router();
const userController = require('../../controllers/user');

// POST /api/users → buat user baru
router.post('/', userController.createUser);

// GET /api/users → ambil semua user
router.get('/', userController.getAllUsers);

// GET /api/users/:id → ambil user berdasarkan ID
router.get('/:id', userController.getUserById);

// PUT /api/users/:id → update user
router.put('/:id', userController.updateUser);

// DELETE /api/users/:id → hapus user
router.delete('/:id', userController.deleteUser);

module.exports = router;