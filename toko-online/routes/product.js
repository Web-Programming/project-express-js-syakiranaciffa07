var express = require("express")
var router = express.Router();

router.get("/:id", function(req,res,next){
    const productId = parseInt(req.params.id); //Tangkap ID dari URL
    const product = product.find(p => p.id == productId);

    if(!product){
        return res.status(404).send('produk tidak ditemukan');
    }


    res.render('produk-detail',
        {
            title : product.name,
            product : product
        }
);
});
module.export = router;

