const express = require('express');
const router = express.Router();
const {getPictureById, updatePic, createPic, deletePicture, getPictureByProductId} = require('../controllers/picturesController');

router.get('/:id', getPictureById);
router.get('/', getPictureByProductId)
router.post('/',createPic);
router.put('/:id',updatePic);
router.delete('/:id',deletePicture);

module.exports = router;
