const { DataTypes, Sequelize, Model } = require('sequelize');
const sequelize = require('../database');

const Order = require('./order');
const Product = require('./product');

class Item extends Model {}

Item.init( 
    {
        orderId: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'order',
                key: 'orderId',
            },
        },
        productId: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'product',
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
        sequelize,
        modelName: 'item',
        tableName: 'items',
    },
);

Order.hasMany(Item, { foreignKey: 'orderId' });
Item.belongsTo(Order, { foreignKey: 'orderId' });

Product.hasMany(Item, { foreignKey: 'productId' });
Item.belongsTo(Product, { foreignKey: 'productId' });

module.exports = Item;