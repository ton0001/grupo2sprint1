const express = require('express');
const router = express.Router();
const productController = require('../controllers/productsController');

router.get('/products', productController.allProduct)
router.get('/products/mostwanted', productController.mostWanted)
router.get('/products/:id', productController.oneProduct)


router.post('/products', productController.createProdut)
router.put('/products/:id', productController.productEdit)


module.exports = router;