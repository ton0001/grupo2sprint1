const express = require('express');
const router = express.Router();
const productController = require('../controllers/productsController');

router.get('/products', productController.listCategory)
router.get('/products', productController.allProduct)
router.get('/products/:id', productController.oneProduct)

module.exports = router;