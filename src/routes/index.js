const express = require('express');
const orderRoutes = require('./orderRoutes');
const productRoutes = require('./productRoutes');

const router = express.Router();

router.use('/order', orderRoutes);
router.use('/product', productRoutes);

module.exports = router;