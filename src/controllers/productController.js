const { Product } = require('../models');

const createProduct = async (req, res, next) => {
  try {
    const { name, price } = req.body;
    const product = await Product.create({ name, price });
    res.status(201).json(product);
  } catch (err) {
    next(err);
  }
}

const getProduct = async (req, res, next) => {
  try {
    const productId = req.params.productId;
    const product = await Product.findByPk(productId);

    if (!product) {
      return res.status(404).json({ message: 'Produto não encontrado.' });
    }

    res.json(product);
  } catch (err) {
    next(err);
  }
}

const getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (err) {
    next(err);
  }
}

const updateProduct = async (req, res, next) => {
  try {
    const productId = req.params.productId;
    const { name, price } = req.body;

    const [updated] = await Product.update({ name, price }, {
      where: { productId },
    });

    if (!updated) {
      return res.status(404).json({ message: 'Produto não encontrado.' });
    }

    const product = await Product.findByPk(productId);
    res.json(product);
  } catch (err) {
    next(err);
  }
}

const deleteProduct = async (req, res, next) => {
  try {
    const productId = req.params.productId;

    const deleted = await Product.destroy({
      where: { productId },
    });

    if (!deleted) {
      return res.status(404).json({ message: 'Produto não encontrado.' });
    }

    res.json({ message: 'Produto deletado com sucesso.' });
  } catch (err) {
    next(err);
  }
}

module.exports = {
    createProduct,
    getProduct,
    getAllProducts,
    updateProduct,
    deleteProduct
}