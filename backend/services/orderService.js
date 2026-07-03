const orderModel = require("../models/orderModel");

const createOrder = async (orderData) => {

    const result = await orderModel.createOrder(orderData);

    return {
        orderId: result.insertId
    };
};

const getOrders = async (storeId, page, limit) => {

    const offset = (page - 1) * limit;

    const orders = await orderModel.getOrders(
        Number(storeId),
        Number(limit),
        Number(offset)
    );

    return orders;
};

const updateOrderStatus = async (orderId, status) => {

    const result = await orderModel.updateOrderStatus(
        orderId,
        status
    );

    return result;
};

module.exports = {
    createOrder,
    getOrders,
    updateOrderStatus
};