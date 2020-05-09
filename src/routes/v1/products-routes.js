const express = require('express');

const productsController = require('../../controllers/v1/products-controller');

const router = express.Router();

router.post('/create', productsController.createProduct);
router.post('/delete', productsController.deleteProduct);
router.post('/get-all', productsController.getProducts);

module.exports = router;
