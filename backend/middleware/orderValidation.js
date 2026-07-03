const { body, validationResult } = require("express-validator");

const createOrderValidation = [
    body("store_id")
        .notEmpty()
        .withMessage("Store ID is required")
        .isInt()
        .withMessage("Store ID must be a number"),

    body("items")
        .isArray({ min: 1 })
        .withMessage("Items are required"),

    body("total_amount")
        .isFloat({ gt: 0 })
        .withMessage("Total amount must be greater than 0")
];

const updateOrderStatusValidation = [
    body("status")
        .notEmpty()
        .withMessage("Status is required")
        .isIn(["PLACED", "PREPARING", "COMPLETED"])
        .withMessage("Invalid status")
];

const validate = (req, res, next) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            errors: errors.array()
        });
    }

    next();
};

module.exports = {
    createOrderValidation,
    updateOrderStatusValidation,
    validate
};