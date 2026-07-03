
"use client";

import { useEffect } from "react";
import Link from "next/link";


import socket from "../services/socket";

export default function Home() {

useEffect(() => {

    console.log("Page Loaded");

    console.log("Socket Connected?", socket.connected);

    if (socket.connected) {
        console.log("Socket ID:", socket.id);
    }

    socket.on("connect", () => {
        console.log("Socket Connected:", socket.id);
    });

    socket.on("order-created", (data) => {
        console.log("🟢 New Order:", data);
    });

    socket.on("disconnect", () => {
        console.log("Socket Disconnected");
    });

    socket.on("connect_error", (err) => {
        console.log("Socket Error:", err.message);
    });

    return () => {
        socket.off("connect");
        socket.off("order-created");
        socket.off("disconnect");
        socket.off("connect_error");
    };

}, []);
  return (
    <div className="container mt-5">

      <div className="text-center mb-5">
        <h1>Multi Store Order Management System</h1>
        <p className="text-muted">
          Manage Orders Across Multiple Stores
        </p>
      </div>

      <div className="row">

        <div className="col-md-4 mb-4">
          <div className="card shadow">

            <div className="card-body text-center">

              <h3>Create Order</h3>

              <p>
                Create a new customer order.
              </p>

              <Link
                href="/create-order"
                className="btn btn-primary"
              >
                Open
              </Link>

            </div>

          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="card shadow">

            <div className="card-body text-center">

              <h3>Orders List</h3>

              <p>
                View all store orders.
              </p>

              <Link
                href="/orders"
                className="btn btn-success"
              >
                Open
              </Link>

            </div>

          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="card shadow">

            <div className="card-body text-center">

              <h3>Update Status</h3>

              <p>
                Update Order Status.
              </p>

              <Link
                href="/update-status"
                className="btn btn-warning"
              >
                Open
              </Link>

            </div>

          </div>
        </div>

      </div>

    </div>
  );
}