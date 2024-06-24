const { DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../database');
const { v4: uuidv4 } = require('uuid');
const { UUIDV4 } = require('sequelize/lib/data-types');

const Product = sequelize.define('Product', 
    {
        productId: {
            type: DataTypes.UUID,
            defaultValue: UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
    }
);

module.exports = Product;