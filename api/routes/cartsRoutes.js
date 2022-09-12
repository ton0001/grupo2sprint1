const express = require('express');
const router = express.Router();
const cartsController = require('../controllers/cartsController');

router.get('/:id', cartsController.listCart);
router.get('/user/:id/cart', cartsController.listCart);

router.put('/cart/:id', cartsController.updateCart);
router.put('/user/:id/cart', cartsController.updateCart);

module.exports = router;