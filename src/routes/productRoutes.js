const express = require('express');
const productController = require('../controllers/productController');

const router = express.Router();

router.post('/', productController.createProduct);
router.get('/:productId', productController.getProduct);
router.get('/', productController.getAllProducts);
router.put('/:productId', productController.updateProduct);
router.delete('/:productId', productController.deleteProduct);

module.exports = router;