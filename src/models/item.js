const { DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../database');

const Order = require('./order');
const Product = require('./product');


const Item = sequelize.define('Item', 
    {
        orderId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'Orders',
                key: 'orderId',
            },
        },
        productId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'Products',
                key: 'productId',
            },
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
    }, {
    indexes: [
      {
        unique: true,
        fields: ['orderId', 'productId']
      }
    ]
});

Order.hasMany(Item, { foreignKey: 'orderId' });
Item.belongsTo(Order, { foreignKey: 'orderId' });

Product.hasMany(Item, { foreignKey: 'productId' });
Item.belongsTo(Product, { foreignKey: 'productId' });

module.exports = Item;