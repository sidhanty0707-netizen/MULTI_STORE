"use client";

import { useState } from "react";
import { updateOrderStatus } from "../../services/orderService";
import { useRouter } from "next/navigation";
export default function UpdateStatus() {
const router = useRouter();
    const [orderId, setOrderId] = useState("");
    const [status, setStatus] = useState("PLACED");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();

        try {

            setLoading(true);
            setMessage("");
            setError("");

            if (!orderId) {
                setError("Order ID required");
                return;
            }

            await updateOrderStatus(Number(orderId), status);

            setMessage("Order Status Updated Successfully");

            setOrderId("");

        } catch (err) {
            console.error(err);
            setError("Failed to update status");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-5">

            <div className="card shadow">

                <div className="card-header bg-warning text-dark">
                    <h3>Update Order Status</h3>
                </div>

                <div className="card-body">

                    <form onSubmit={handleUpdate}>

                        {/* Order ID */}
                        <div className="mb-3">
                            <label className="form-label">Order ID</label>
                            <input
                                type="number"
                                className="form-control"
                                value={orderId}
                                onChange={(e) => setOrderId(e.target.value)}
                                placeholder="Enter Order ID"
                            />
                        </div>

                        {/* Status */}
                        <div className="mb-3">
                            <label className="form-label">Status</label>
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

                        {/* Button */}
                        <button
                            type="submit"
                            className="btn btn-warning"
                            disabled={loading}
                        >
                            {loading ? "Updating..." : "Update Status"}
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