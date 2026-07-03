const express = require("express");

const router = express.Router();

const {
    createOrder,
    getOrders,
    updateOrderStatus ,archiveOldOrders,ordersPerDay ,revenuePerStore ,topItems
} = require("../controllers/orderController");

const {
    createOrderValidation,
    updateOrderStatusValidation,
    validate
} = require("../middleware/orderValidation");

// Create Order
router.post(
    "/",
    createOrderValidation,
    validate,
    createOrder
);

// Get Orders
router.get(
    "/",
    getOrders
);

// Update Status
router.patch(
    "/:id/status",
    updateOrderStatusValidation,
    validate,
    updateOrderStatus
);


router.post("/archive-old", archiveOldOrders);

router.get("/analytics/orders-per-day", ordersPerDay);
router.get("/analytics/revenue", revenuePerStore);
router.get("/analytics/top-items", topItems);

module.exports = router;