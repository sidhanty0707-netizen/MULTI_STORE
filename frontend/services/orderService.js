import api from "./api";

export const getOrders = async (
    storeId,
    page = 1,
    limit = 10
) => {

    const response = await api.get("/orders", {
        params: {
            store_id: storeId,
            page,
            limit
        }
    });

    return response.data;
};


export const updateOrderStatus = async (
    orderId,
    status
) => {

    const response = await api.patch(
        `/orders/${orderId}/status`,
        {
            status
        }
    );

    return response.data;
};


export const createOrder = async (orderData) => {

    const response = await api.post(
        "/orders",
        orderData
    );

    return response.data;
};

