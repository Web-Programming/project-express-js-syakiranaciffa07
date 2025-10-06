var products = require('../../data/products.json');

exports.searchByID = (req, res) => {
    // tulis kode untuk mendapatkan query pencarian 'q' dari req.query
    const q = req.query.q ? req.query.q.toLowerCase() : "";
    //filter array 'products'berdasarkan 'q'
    let filteredProducts;
    if (q === "") {
        // jika query kosong tampilkan semua produk
        filteredProducts = products;
    } else {
        // jika ada query filter berdasarkan nama produk
        filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(q));
    };
    //kirim hasil filter ke view 'index' atau view 'search-result' baru
    res.render("index", {
        title: "Hasil Pencarian",
        products: filteredProducts,
        isSearch: true,
        keyword: req.query.q
    });
};
