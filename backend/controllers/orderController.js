
const { getIO } = require("../socket/socket");

const db = require("../config/database");
const orderService = require("../services/orderService");
const {
    successResponse,
    errorResponse
} = require("../utils/response");

const createOrder = async (req, res) => {

    try {

        const result = await orderService.createOrder(req.body);

        // Emit Socket Event
        const io = getIO();

        io.emit("order-created", {
            message: "New Order Created",
            data: result
        });

        return successResponse(
            res,
            201,
            "Order Created Successfully",
            result
        );

    } catch (error) {

        return errorResponse(
            res,
            500,
            error.message
        );

    }

};

const getOrders = async (req, res) => {

    console.log("GET /orders API called");
    console.log(req.query);

    try {

        const storeId = parseInt(req.query.store_id);
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const orders = await orderService.getOrders(
            storeId,
            page,
            limit
        );

        return successResponse(
            res,
            200,
            "Orders fetched successfully",
            orders
        );

    } catch (error) {

        return errorResponse(
            res,
            500,
            error.message
        );

    }
};

const updateOrderStatus = async (req, res) => {

    try {

        const orderId = req.params.id;
        const { status } = req.body;

        await orderService.updateOrderStatus(
            orderId,
            status
        );

        return successResponse(
            res,
            200,
            "Order Status Updated Successfully"
        );

    } catch (error) {

        return errorResponse(
            res,
            500,
            error.message
        );

    }

}







const archiveOldOrders = async (req, res) => {

    try {

        const [orders] = await db.query(`
            SELECT * FROM orders
            WHERE created_at < NOW() - INTERVAL 30 DAY
        `);

        if (orders.length === 0) {
            return res.json({ message: "No orders to archive" });
        }

        for (let order of orders) {

            await db.query(`
                INSERT INTO orders_archive
                (id, store_id, items, total_amount, status, created_at)
                VALUES (?, ?, ?, ?, ?, ?)
            `, [
                order.id,
                order.store_id,
                JSON.stringify(order.items),
                order.total_amount,
                order.status,
                order.created_at
            ]);

        }

        await db.query(`
            DELETE FROM orders
            WHERE created_at < NOW() - INTERVAL 30 DAY
        `);

        res.json({
            message: "Archive completed",
            count: orders.length
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


const ordersPerDay = async (req, res) => {

    const [result] = await db.query(`
        SELECT DATE(created_at) as date,
        COUNT(*) as total_orders
        FROM orders
        GROUP BY DATE(created_at)
        ORDER BY date DESC
    `);

    res.json(result);
};


const revenuePerStore = async (req, res) => {

    const [result] = await db.query(`
        SELECT store_id,
        SUM(total_amount) as revenue
        FROM orders
        GROUP BY store_id
    `);

    res.json(result);
};

const topItems = async (req, res) => {

    const [orders] = await db.query(`SELECT items FROM orders`);

    const map = {};

    orders.forEach(order => {

  const items = Array.isArray(order.items)  ? order.items : JSON.parse(order.items);




        items.forEach(i => {
            map[i.item_id] = (map[i.item_id] || 0) + i.qty;
        });

    });

    const result = Object.entries(map)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([item_id, qty]) => ({ item_id, qty }));

    res.json(result);
};
module.exports = {
    createOrder,
    getOrders ,updateOrderStatus ,archiveOldOrders,ordersPerDay ,revenuePerStore ,topItems
};


















