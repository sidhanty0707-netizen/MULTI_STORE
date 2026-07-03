const db = require("../config/database");

const createOrder = async (orderData) => {

    const sql = `
        INSERT INTO orders
        (store_id, items, total_amount)
        VALUES (?, ?, ?)
    `;

    const [result] = await db.execute(
        sql,
        [
            orderData.store_id,
            JSON.stringify(orderData.items),
            orderData.total_amount
        ]
    );

    return result;
};

const getOrders = async (storeId, limit, offset) => {

    console.log("storeId:", storeId);
    console.log("limit:", limit);
    console.log("offset:", offset);

    const sql = `
        SELECT *
        FROM orders
        WHERE store_id = ?
        ORDER BY created_at DESC
        LIMIT ${Number(limit)}
        OFFSET ${Number(offset)}
    `;

    console.log(sql);

    const [rows] = await db.execute(
        sql,
        [Number(storeId)]
    );

    return rows;
};

const updateOrderStatus = async (orderId, status) => {

    const sql = `
        UPDATE orders
        SET status = ?
        WHERE id = ?
    `;

    const [result] = await db.execute(
        sql,
        [
            status,
            orderId
        ]
    );

    return result;
};

module.exports = {
    createOrder,
    getOrders ,updateOrderStatus
};