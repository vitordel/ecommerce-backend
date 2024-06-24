'use strict';

const { tableName } = require("../src/models/order");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('items', {
      order_id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        references: {
          model: {
            tableName: 'orders'
          },
          key: 'id',
        },
      },
      product_id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        references: {
          model: {
            tableName: 'products'
          },
          key: 'id',
        },
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      price: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('now'),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('now'),
      },
      deleted_at: Sequelize.DATE,
    });

    await queryInterface.addIndex('items', ['order_id', 'product_id'], {
      unique: true,
      name: 'unique_order_product'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeIndex('items', 'unique_order_product');

    await queryInterface.dropTable('items');
  }
};