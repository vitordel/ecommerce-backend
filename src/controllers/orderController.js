const { Order, Item, Product } = require('../models');

const createOrder = async (req, res, next) => {
  let transaction;
  try {
    transaction = await sequelize.transaction();

    const { numeroPedido, valorTotal, dataCriacao, items } = req.body;

    const order = await Order.create({
      orderId: numeroPedido,
      value: valorTotal,
      creationDate: dataCriacao,
    }, { transaction });

    const itemPromises = items.map(item => {
      return item.create({
        orderId: order.orderId,
        productId: item.idItem,
        quantity: item.quantidadeItem,
        price: item.valorItem,
      }, { transaction });
    });

    await Promise.all(itemPromises);
    await transaction.commit();

    res.status(201).json(order);
  } catch (err) {
    if (transaction) await transaction.rollback();
    next(err);
  }
}

const getOrder = async (req, res, next) => {
  try {
    const orderId = req.params.orderId;
    const order = await Order.findOne({
      where: { orderId },
      include: {
        model: item,
        include: [product]
      },
    });

    if (!order) {
      return res.status(404).json({ message: 'Pedido não encontrado.' });
    }

    res.json(order);
  } catch (err) {
    next(err);
  }
}

const getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      include: [{
        model: Item
      }]
    });
    res.json(orders);
  } catch (err) {
    next(err);
  }
}

const updateOrder = async (req, res, next) => {
  let transaction;
  try {
    transaction = await sequelize.transaction();

    const orderId = req.params.orderId;
    const updatedOrder = req.body;

    await Order.update(updatedOrder, {
      where: { orderId },
      transaction,
    });

    await Item.destroy({ where: { orderId }, transaction });

    const itemPromises = updatedOrder.items.map(item => {
      return Item.create({
        orderId: orderId,
        productId: item.idItem,
        quantity: item.quantidadeItem,
        price: item.valorItem,
      }, { transaction });
    });

    await Promise.all(itemPromises);
    await transaction.commit();

    const updatedOrderWithItems = await Order.findOne({
      where: { orderId },
      include: {
        model: Item,
        include: [Product]
      },
    });

    res.json(updatedOrderWithItems);
  } catch (err) {
    if (transaction) await transaction.rollback();
    next(err);
  }
}

const deleteOrder = async (req, res, next) => {
  let transaction;
  try {
    transaction = await sequelize.transaction();

    const orderId = req.params.orderId;

    await Order.destroy({
      where: { orderId },
      transaction,
    });

    await Item.destroy({
      where: { orderId },
      transaction,
    });

    await transaction.commit();

    res.json({ message: 'Pedido deletado com sucesso.' });
  } catch (err) {
    if (transaction) await transaction.rollback();
    next(err);
  }
}

module.exports = {
  createOrder,
  getOrder,
  getAllOrders,
  updateOrder,
  deleteOrder
}