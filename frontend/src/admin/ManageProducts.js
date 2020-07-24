import React, { useState } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";

const ManageProducts = () => {
  return (
    <Layout title="Manage Products" description="Perform CRUD on products">
      <h2 className="mb-4">Manage Products</h2>
      <div className="row">
        <div>...</div>
      </div>
    </Layout>
  );
};

export default ManageProducts;