const {Model, DataTypes} = require('sequelize');
const sequelize = require('../database');

class Order extends Model {}

Order.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
        value: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
    },
    { 
        sequelize,
        modelName: 'order',
        tableName: 'orders',
        underscored: true
    }
);

module.exports = Order;