import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = ({ user }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get("/api/orders", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setOrders(data);
      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch orders", err);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    setUpdatingId(id);
    try {
      await axios.put(
        `/api/orders/${id}/status`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
          },
        }
      );
      await fetchOrders();
    } catch (err) {
      console.error("Failed to update status", err);
    } finally {
      setUpdatingId(null);
    }
  };

  useEffect(() => {
    if (user?.isAdmin) {
      fetchOrders();
    }
  }, [user]);

  if (!user?.isAdmin) {
    return (
      <div className="p-6 text-red-600 font-semibold">
        ❌ You are not authorized to view this page.
      </div>
    );
  }

  if (loading) return <div className="p-4">Loading orders...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">📦 Admin Order Dashboard</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded shadow">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="py-2 px-4">Order ID</th>
              <th className="py-2 px-4">Customer</th>
              <th className="py-2 px-4">Amount</th>
              <th className="py-2 px-4">Status</th>
              <th className="py-2 px-4">Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="border-t">
                <td className="py-2 px-4">{order._id}</td>
                <td className="py-2 px-4">
                  {order.user?.name || "N/A"}
                  <br />
                  <span className="text-sm text-gray-500">
                    {order.user?.email}
                  </span>
                </td>
                <td className="py-2 px-4">₹{order.totalAmount}</td>
                <td className="py-2 px-4">
                  <select
                    className="border p-1 rounded"
                    value={order.status}
                    onChange={(e) =>
                      handleStatusChange(order._id, e.target.value)
                    }
                    disabled={updatingId === order._id}
                  >
                    <option>Pending</option>
                    <option>Confirmed</option>
                    <option>Preparing</option>
                    <option>Out for Delivery</option>
                    <option>Delivered</option>
                  </select>
                </td>
                <td className="py-2 px-4">
                  {new Date(order.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
