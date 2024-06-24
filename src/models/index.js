const sequelize = require('../database/index');
const Order = require('./order');
const Item = require('./item');
const Product = require('./product');

module.exports = {
  sequelize,
  Order,
  Item,
  Product,
};