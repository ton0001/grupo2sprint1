const express = require('express');
const router = express.Router();
const productController = require('../controllers/productsController');

router.get('/products', productController.allProduct)
router.get('/products/:id', productController.oneProduct)
router.get('/:id/pictures', productController.getPicByProductId)


module.exports = router;