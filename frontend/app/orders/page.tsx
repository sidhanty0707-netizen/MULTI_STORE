"use client";

import { useState, useCallback } from "react";
import { getOrders } from "../../services/orderService";
import { updateOrderStatus } from "../../services/orderService";
import { useRouter } from "next/navigation";
type Order = {
  id: number;
  store_id: number;
  total_amount: string;
  status: string;
  created_at: string;
  items: {
    item_id: number;
    qty: number;
  }[];
};

export default function Orders() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [storeId, setStoreId] = useState("1");
  const [page, setPage] = useState(1);
  const limit = 10;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getOrders(
        Number(storeId),
        page,
        limit
      );

      console.log("API Response:", response);

      setOrders(response.data);

    } catch (err) {
      console.error(err);
      setError("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  }, [storeId, page]);

//   useEffect(() => {
//     fetchOrders();
//   }, [fetchOrders]);

  const handleSearch = () => {
    if (!storeId) {
      setError("Please enter Store ID");
      return;
    }

    setPage(1);
    fetchOrders();
  };

  const handleReset = () => {
    setStoreId("1");
    setPage(1);
    setError("");
  };




const handleUpdateStatus = async (
    orderId: number,
    currentStatus: string
) => {

    try {

        let newStatus = "";

        if (currentStatus === "PLACED") {
            newStatus = "PREPARING";
        } else if (currentStatus === "PREPARING") {
            newStatus = "COMPLETED";
        } else {
            alert("Order is already completed.");
            return;
        }

        await updateOrderStatus(orderId, newStatus);

        alert("Order Status Updated Successfully");

        fetchOrders();

    } catch (error) {

        console.error(error);
        alert("Failed to update order.");

    }

};








  return (
    <div className="container mt-5">

      <div className="card shadow">

        <div className="card-header bg-success text-white">
          <h3>Orders List</h3>
        </div>

        <div className="card-body">

          <div className="row mb-4">

            <div className="col-md-6">

              <label className="form-label">
                Filter By Store ID
              </label>

              <input
                type="number"
                className="form-control"
                value={storeId}
                onChange={(e) => setStoreId(e.target.value)}
                placeholder="Enter Store ID"
              />

            </div>

            <div className="col-md-3 d-flex align-items-end">

              <button
                className="btn btn-success w-100"
                onClick={handleSearch}
              >
                Search
              </button>

            </div>

            <div className="col-md-3 d-flex align-items-end">

              <button
                className="btn btn-secondary w-100"
                onClick={handleReset}
              >
                Reset
              </button>

            </div>

          </div>

          {loading && (
            <div className="alert alert-info">
              Loading Orders...
            </div>
          )}

          {error && (
            <div className="alert alert-danger">
              {error}
            </div>
          )}

          <table className="table table-bordered table-hover">

            <thead className="table-dark">

              <tr>
                <th>Order ID</th>
                <th>Store ID</th>
                <th>Total</th>
                <th>Status</th>
                <th>Created At</th>
                <th>Action</th>
              </tr>

            </thead>

            <tbody>

              {orders.length === 0 ? (

                <tr>
                  <td colSpan={6} className="text-center">
                    No Orders Found
                  </td>
                </tr>

              ) : (

                orders.map((order) => (

                  <tr key={order.id}>

                    <td>{order.id}</td>

                    <td>{order.store_id}</td>

                    <td>₹{order.total_amount}</td>

                    <td>

                      <span
                        className={`badge ${
                          order.status === "PLACED"
                            ? "bg-primary"
                            : order.status === "PREPARING"
                            ? "bg-warning text-dark"
                            : "bg-success"
                        }`}
                      >
                        {order.status}
                      </span>

                    </td>

                    <td>
                      {new Date(order.created_at).toLocaleString()}
                    </td>

                    <td>

                    <button
    className="btn btn-warning btn-sm"
    onClick={() =>
        handleUpdateStatus(
            order.id,
            order.status
        )
    }
>
    Update
</button>
                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

          <div className="d-flex justify-content-end gap-2">

            <button
              className="btn btn-secondary"
              disabled={page === 1}
              onClick={() => setPage((prev) => prev - 1)}
            >
              Previous
            </button>

            <button className="btn btn-primary">
              {page}
            </button>

            <button
              className="btn btn-secondary"
              onClick={() => setPage((prev) => prev + 1)}
            >
              Next
            </button>
<button
    className="btn btn-secondary ms-2"
    onClick={() => router.push("/")}
>
    ← Back to Home
</button>
          </div>

        </div>

      </div>

    </div>
  );
}