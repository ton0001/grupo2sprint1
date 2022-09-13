const express = require('express');
const router = express.Router();
const cartsController = require('../controllers/cartsController');

router.get('/:id', cartsController.listCart);

router.put('/:id', cartsController.updateCart);

module.exports = router;