const Order = require('../models/order');

// 🟢 Membuat Pesanan Baru
exports.createOrder = async (req, res) => {
  try {
    const { user, orderItems } = req.body;

    // Hitung totalAmount berdasarkan quantity * harga produk (jika produk punya field price)
    // Jika tidak, bisa diganti manual sesuai kebutuhan
    let totalAmount = 0;
    for (let item of orderItems) {
      if (item.product.price) {
        totalAmount += item.product.price * item.quantity;
      }
    }

    const order = new Order({
      user,
      orderItems,
      totalAmount,
    });

    const savedOrder = await order.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🟡 Mengambil Semua Pesanan
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('user', 'name email') // tampilkan hanya name & email user
      .populate('orderItems.product', 'name price'); // tampilkan hanya name & price produk

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🔵 Mengambil Pesanan Berdasarkan ID
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('user', 'name email')
      .populate('orderItems.product', 'name price');

    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🟣 Memperbarui Status Pesanan
exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};