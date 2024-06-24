'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Items', {
      orderId: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'Orders',
          key: 'orderId',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      productId: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'Products',
          key: 'productId',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      price: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
    });

    await queryInterface.addIndex('Items', ['orderId', 'productId'], {
      unique: true,
      name: 'unique_order_product'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeIndex('Items', 'unique_order_product');

    await queryInterface.dropTable('Items');
  }
};