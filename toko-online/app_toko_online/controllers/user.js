// Simulasi database sementara (pakai array)
let users = [];
let nextId = 1;

// Create (POST)
exports.createUser = (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ message: 'Nama dan email wajib diisi.' });
  }

  const newUser = { id: nextId++, name, email };
  users.push(newUser);
  res.status(201).json({ message: 'User berhasil dibuat.', data: newUser });
};

// Read All (GET)
exports.getAllUsers = (req, res) => {
  res.status(200).json(users);
};

// Read One (GET by ID)
exports.getUserById = (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ message: 'User tidak ditemukan.' });
  res.status(200).json(user);
};

// Update (PUT)
exports.updateUser = (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ message: 'User tidak ditemukan.' });

  const { name, email } = req.body;
  if (name) user.name = name;
  if (email) user.email = email;

  res.status(200).json({ message: 'User berhasil diperbarui.', data: user });
};

// Delete (DELETE)
exports.deleteUser = (req, res) => {
  const userIndex = users.findIndex(u => u.id === parseInt(req.params.id));
  if (userIndex === -1) return res.status(404).json({ message: 'User tidak ditemukan.' });

  users.splice(userIndex, 1);
  res.status(200).json({ message: 'User berhasil dihapus.' });
}; 