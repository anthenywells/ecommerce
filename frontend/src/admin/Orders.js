import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import Layout from "../core/Layout";
import { listOrders, getStatusValues, updateOrderStatus } from "./apiAdmin";
import { isAuthenticated } from "../auth";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [statusValues, setStatusValues] = useState([]);
  const { user, token } = isAuthenticated();

  const loadOrders = () => {
    listOrders(user._id, token).then((data) => {
      if (data.error) {
        console.log("loadOrders -> data.error", data.error);
      } else {
        setOrders(data);
      }
    });
  };

  const loadStatusValues = () => {
    getStatusValues(user._id, token).then((data) => {
      if (data.error) {
        console.log("loadOrders -> data.error", data.error);
      } else {
        setStatusValues(data);
      }
    });
  };

  useEffect(() => {
    loadOrders();
    loadStatusValues();
  }, []);

  const showOrderslength = () => {
    if (orders.length > 0) {
      return (
        <h1 className="text-danger display-2">Total Orders: {orders.length}</h1>
      );
    } else {
      return <h1 className="text-danger display-2">No Orders</h1>;
    }
  };

  const showInput = (key, value) => (
    <div className="input-group mr-sm-2">
      <div className="input-group-prepend">
        <div className="input-group-text">{key}</div>
      </div>
      <input type="text" value={value} className="form-control" readOnly />
    </div>
  );

  const handleStatusChange = (e, orderId) => {
    updateOrderStatus(user._id, token, orderId, e.target.value).then((data) => {
      if (data.error) {
        console.log("handleStatusChange -> data.error", data.error);
      } else {
        loadOrders();
      }
    });
  };

  const showStatus = (o) => (
    <div className="form-group">
      <h3 className="mark mb-4">Status: {o.status}</h3>
      <select
        className="form-control"
        onChange={(e) => handleStatusChange(e, o._id)}
      >
        <option>Update Status</option>
        {statusValues.map((status, index) => (
          <option key={index} value={status}>
            {status}
          </option>
        ))}
      </select>
    </div>
  );

  return (
    <Layout
      title="Add a new category"
      description={`Hello, ${user.name}, you can manage all orders here.`}
    >
      <div className="row">
        <div className="col-md-8 offset-md-2">
          {showOrderslength()}
          {orders.map((o, oIndex) => {
            return (
              <div
                className="mb-5"
                key={oIndex}
                style={{ borderBottom: "5px solid indigo" }}
              >
                <h3 className="mt-3 font-italic">Order Id: {o._id}</h3>
                <ul className="list-group">
                  <li className="list-group-item">{showStatus(o)}</li>
                  <li className="list-group-item">
                    Transaction Id: {o.transaction_id}
                  </li>
                  <li className="list-group-item">Amount: ${o.amount}</li>
                  <li className="list-group-item">User: {o.user.name}</li>
                  <li className="list-group-item">
                    Ordered On: {moment(o.createdAt).fromNow()}
                  </li>
                  <li className="list-group-item">
                    Delivery Address: {o.address}
                  </li>
                </ul>
                <h4 className="mt-3 font-italic">
                  Total Products: {o.products.length}
                </h4>

                {o.products.map((p, pIndex) => (
                  <div
                    className="mb-4"
                    key={pIndex}
                    style={{
                      padding: "20px",
                      border: "1px solid indigo",
                    }}
                  >
                    {showInput("Product name", p.name)}
                    {showInput("Product price", p.price)}
                    {showInput("Product total", p.count)}
                    {showInput("Product Id", p._id)}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
