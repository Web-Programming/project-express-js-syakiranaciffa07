const {name} = require("ejs");
var products = require("../../data/products.json");
var Products = require("../models/products");

const index = async (req, res) => {
  try {
    const prod = await Products.find({});
    res.render("index", {
      title: "Toko online sederhana",
      products: prod,
    });
  } catch (err) {
    res.status(500).send("gagal memuat produk");
  }
};

const all = async (req, res) => {
  try {
    res.render("index", {
      title: "Daftar Produk",
      products: products,
      query: "",
    });
  } catch (err) {
    res.status(500).send("gagal memuat produk");
  }
};

const detail = async (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    const product = products.find((p) => p.id === productId);

    if (!product) {
      return res.status(404).send("Produk tidak tersedia");
    }

    res.render("product-detail", {
      title: product.name,
      product: product,
    });
  } catch (err) {
    res.status(500).send("gagal memuat produk");
  }
};

// Controller: Search Produk
const search = async (req, res) => {
  try {
    const q = req.query.q ? req.query.q.toLowerCase() : "";
    let filteredProducts = products;

    if (q) {
      filteredProducts = products.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    console.log("Query:", q, "Jumlah hasil:", filteredProducts.length);

    res.render("index", {
      title: q ? `Hasil pencarian ${q}` : "Toko Online Sederhana",
      products: filteredProducts,
      query: q,
    });
  } catch (err) {
    console.error("Error pada pencarian:", err);
    res.status(500).send("Gagal memuat produk");
  }
};

const reviewDetail = (req, res) => {
  try {
    const productId = req.params.productId;
    const reviewId = req.params.reviewId;

    res.render("review-detail", {
      title: `Ulasan ${reviewId} untuk Produk ${productId}`,
      productId,
      reviewId,
    });
  } catch (err) {
    console.error("Gagal memuat detail ulasan:", err);
    res.status(500).send("Terjadi kesalahan saat memuat ulasan");
  }
};

//membuat rest api
const apiall = async (req, res) => {
  try {
    const prod = await Product.find({});
    res.status(200).json({
      status: true,
      message: "Data produk berhasil diambil",
      data: prod,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: "Gagal memuat produk",
    });
  }
};

const create = async (req, res) => {
  try {
    // 1. ambil dsata dari request body
    const newProduct = new Product({
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      stock: req.body.stock || 0,
    });
    // 2. simpan data ke  mongo db melalui model product
    const product = await newProduct.save();

    // 3. kirim respon sukses ke user.
    res.status(200).json({
      status: true,
      message: "Produk berhasil disimpan",
      data: product,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: `Internal Server Error`,
    });
  }
};

const update = async (req, res) => {};

const remove = async (req, res) => {};

module.exports = {
  index,
  detail,
  search,
  reviewDetail,
  all,
  apiall,
  create,
  detail,
  update,
  remove,
};