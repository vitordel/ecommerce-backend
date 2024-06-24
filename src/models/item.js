const { DataTypes, Sequelize, Model } = require('sequelize');
const sequelize = require('../database');

const Order = require('./order');
const Product = require('./product');

class Item extends Model {}

Item.init( 
    {
        order_id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
        },
        product_id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
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
        underscored: true,
    },
);

Order.hasMany(Item, { foreignKey: 'order_id' });
Item.belongsTo(Order, { foreignKey: 'order_id' });

Product.hasMany(Item, { foreignKey: 'product_id' });
Item.belongsTo(Product, { foreignKey: 'product_id' });

module.exports = Item;