const express = require('express');
const router = express.Router();
const productController = require('../controllers/productsController');

router.get('/', productController.allProduct)
router.get('/mostwanted', productController.mostWanted)
router.get('/', productController.listCategory)
router.get('/:id/pictures', productController.getPicByProductId)
router.get('/:id', productController.oneProduct)
router.post('/', productController.createProdut)
router.put('/:id', productController.productEdit)

module.exports = router;