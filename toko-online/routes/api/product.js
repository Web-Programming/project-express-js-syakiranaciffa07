const express = require("express");
const router = express.router();
const productController = require("../../controllers/product");

//url create - POST (/api/produk)
router.post("/", productController.create);
//url read all - GET (/api/produk)
router.get("/", productController.all);
//url read one - detail - GET (api/produk/id
router.get("/:id", productController.detailproduk);
//url update - PUT  
router.put("/:id", productController.update);
//url delete - DELETE
router.delete("/:id", productController.remove);

module.exports = router;