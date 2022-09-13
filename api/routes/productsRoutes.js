const express = require('express');
const router = express.Router();


const {getPicByProductId} = require('../controllers/productsController');


router.get('/:id/pictures', getPicByProductId)

module.exports = router;