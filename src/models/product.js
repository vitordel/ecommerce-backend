const { DataTypes, Sequelize, Model } = require('sequelize');
const sequelize = require('../database');
const { v4: uuidv4 } = require('uuid');
const { UUIDV4 } = require('sequelize/lib/data-types');

class Product extends Model {}

Product.init( 
    {
        id: {
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
    }, 
    {
        sequelize,
        modelName: 'product',
        tableName: 'products',
        underscored: true
    }
);

module.exports = Product;