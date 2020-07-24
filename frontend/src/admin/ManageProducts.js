import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth";
import { getProducts, deleteProduct } from "./apiAdmin";
import Layout from "../core/Layout";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const { user, token } = isAuthenticated();

  const loadProducts = () => {
    getProducts().then((data) => {
      if (data.error) {
        console.log("loadProducts -> data.error", data.error);
      } else {
        setProducts(data);
      }
    });
  };

  const destroy = (productId) => {
    deleteProduct(productId, user._id, token).then((data) => {
      if (data.error) {
        console.log("loadProducts -> data.error", data.error);
      } else {
        loadProducts();
      }
    });
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <Layout title="Manage Products" description="Perform CRUD on products">
      <h2 className="mb-4">Manage Products</h2>
      <div className="row">
        <div className="col-12">
          <ul className="list-group">
            {products.map((p, i) => (
              <li
                keu={i}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <strong>{p.name}</strong>
                <Link path={`/admin/product/update/${p._id}`}>
                  <span className="badge bg-warning rounded-pill">Update</span>
                </Link>
                <span
                  onClick={() => destroy(p._id)}
                  className="badge bg-danger rounded-pill"
                >
                  Delete
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default ManageProducts;
