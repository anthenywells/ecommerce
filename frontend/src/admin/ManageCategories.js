import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth";
import { deleteCategory } from "./apiAdmin";
import { getCategories } from "../core/apiCore";
import Layout from "../core/Layout";

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);
  const { user, token } = isAuthenticated();

  const loadCategories = () => {
    getCategories().then((data) => {
      if (data.error) {
        console.log("loadCategories -> data.error", data.error);
      } else {
        setCategories(data);
      }
    });
  };

  const destroy = (categoryId) => {
    deleteCategory(categoryId, user._id, token).then((data) => {
      if (data.error) {
        console.log("loadCategories -> data.error", data.error);
      } else {
        loadCategories();
      }
    });
  };

  useEffect(() => {
    loadCategories();
  }, []);

  return (
    <Layout title="Manage Categories" description="Perform CRUD on categories">
      <h2 className="mb-4">Manage Categories</h2>
      <div className="row">
        <div className="col-12">
          <h2 className="text-center">Total {categories.length} categories</h2>
          <hr />
          <ul className="list-group">
            {categories.map((p, i) => (
              <li
                keu={i}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <strong>{p.name}</strong>
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

export default ManageCategories;
