"use client";

import { useState } from "react";
import { createOrder } from "../../services/orderService";
import { useRouter } from "next/navigation";
type Item = {
    item_id: string;
    qty: string;
};

export default function CreateOrder() {

    const router = useRouter();
    const [storeId, setStoreId] = useState("");
    const [items, setItems] = useState<Item[]>([
        { item_id: "", qty: "" }
    ]);
    const [totalAmount, setTotalAmount] = useState("");
    const [status, setStatus] = useState("PLACED");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    // Add new item
    const addItem = () => {
        setItems([...items, { item_id: "", qty: "" }]);
    };

    // Remove item
    const removeItem = (index: number) => {
        const updated = [...items];
        updated.splice(index, 1);
        setItems(updated);
    };

    // Handle item change
    const handleItemChange = (
        index: number,
        field: keyof Item,
        value: string
    ) => {
        const updated = [...items];
        updated[index][field] = value;
        setItems(updated);
    };

    // Reset form
    const resetForm = () => {
        setStoreId("");
        setItems([{ item_id: "", qty: "" }]);
        setTotalAmount("");
        setStatus("PLACED");
        setMessage("");
        setError("");
    };

    // Submit order
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {

            setLoading(true);
            setMessage("");
            setError("");

            if (!storeId) {
                setError("Store ID required");
                return;
            }

            const payload = {
                store_id: Number(storeId),
                items: items.map(i => ({
                    item_id: Number(i.item_id),
                    qty: Number(i.qty)
                })),
                total_amount: Number(totalAmount),
                status
            };

            const response = await createOrder(payload);

            setMessage("Order Created Successfully!");

            console.log(response);

            resetForm();

        } catch (err) {
            console.error(err);
            setError("Failed to create order");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-5">

            <div className="card shadow">

                <div className="card-header bg-primary text-white">
                    <h3>Create New Order</h3>
                </div>

                <div className="card-body">

                    <form onSubmit={handleSubmit}>

                        {/* Store ID */}
                        <div className="mb-3">
                            <label className="form-label">Store ID</label>
                            <input
                                type="number"
                                className="form-control"
                                value={storeId}
                                onChange={(e) => setStoreId(e.target.value)}
                            />
                        </div>

                        {/* Items */}
                        <h5>Items</h5>

                        {items.map((item, index) => (
                            <div className="row mb-3" key={index}>

                                <div className="col-md-5">
                                    <input
                                        type="number"
                                        className="form-control"
                                        placeholder="Item ID"
                                        value={item.item_id}
                                        onChange={(e) =>
                                            handleItemChange(index, "item_id", e.target.value)
                                        }
                                    />
                                </div>

                                <div className="col-md-5">
                                    <input
                                        type="number"
                                        className="form-control"
                                        placeholder="Qty"
                                        value={item.qty}
                                        onChange={(e) =>
                                            handleItemChange(index, "qty", e.target.value)
                                        }
                                    />
                                </div>

                                <div className="col-md-2">
                                    {items.length > 1 && (
                                        <button
                                            type="button"
                                            className="btn btn-danger w-100"
                                            onClick={() => removeItem(index)}
                                        >
                                            X
                                        </button>
                                    )}
                                </div>

                            </div>
                        ))}

                        <button
                            type="button"
                            className="btn btn-secondary mb-3"
                            onClick={addItem}
                        >
                            + Add Item
                        </button>

                        {/* Total */}
                        <div className="mb-3">
                            <label>Total Amount</label>
                            <input
                                type="number"
                                className="form-control"
                                value={totalAmount}
                                onChange={(e) => setTotalAmount(e.target.value)}
                            />
                        </div>

                        {/* Status */}
                        <div className="mb-3">
                            <label>Status</label>
                            <select
                                className="form-select"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                            >
                                <option value="PLACED">PLACED</option>
                                <option value="PREPARING">PREPARING</option>
                                <option value="COMPLETED">COMPLETED</option>
                            </select>
                        </div>

                        {/* Messages */}
                        {message && (
                            <div className="alert alert-success">
                                {message}
                            </div>
                        )}

                        {error && (
                            <div className="alert alert-danger">
                                {error}
                            </div>
                        )}

                        {/* Buttons */}
                        <button
                            type="submit"
                            className="btn btn-primary me-2"
                            disabled={loading}
                        >
                            {loading ? "Creating..." : "Create Order"}
                        </button>

                        <button
                            type="button"
                            className="btn btn-danger"
                            onClick={resetForm}
                        >
                            Reset
                        </button>

                        <button
    className="btn btn-secondary ms-2"
    onClick={() => router.push("/")}
>
    ← Back to Home
</button>

                    </form>

                </div>

            </div>

        </div>
    );
}