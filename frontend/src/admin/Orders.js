import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "../core/Layout";
import { listOrders } from "./apiAdmin";
import { isAuthenticated } from "../auth";

const Orders = () => {
  const [orders, setOrders] = useState([]);
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

  useEffect(() => {
    loadOrders();
  }, []);

  const noOrders = (orders) => (orders.length < 1 ? <h4>No orders.</h4> : null);

  return (
    <Layout title="Add a new category" description={`Hello, ${user.name}, you can manage all orders here.`}>
      <div className="row">
        <div className="col-md-8 offset-md-2">
          {noOrders(orders)}
          {JSON.stringify(orders)}
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
