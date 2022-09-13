const express = require("express");
const router = express.Router();
const productsController = require("../controllers/productsController");

router.get("/products", productsController.allProduct);
router.get("/products/search", productsController.searchProduct);
router.get("/products/:id", productsController.oneProduct);

module.exports = router;
