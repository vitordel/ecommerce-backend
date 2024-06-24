const { DataTypes, UUIDV4 } = require('sequelize');
const sequelize = require('../database');

const Order = sequelize.define('Order', {
        orderId: {
            type: DataTypes.UUID,
            defaultValue: UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
        value: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        creationDate: {
            type: DataTypes.DATE,
            allowNull: false,
        }
    }  
);

module.exports = Order;