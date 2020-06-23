import React, { useState } from "react";
import Layout from "../core/Layout";

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false,
  });

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const signUpForm = () => (
    <form className="pt-3">
      <div className="mb-3">
        <label htmlFor="" className="text-muted">
          Name
        </label>
        <input
          onChange={handleChange("name")}
          type="text"
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="" className="text-muted">
          Email
        </label>
        <input
          onChange={handleChange("email")}
          type="email"
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="" className="text-muted">
          Password
        </label>
        <input
          onChange={handleChange("password")}
          type="password"
          className="form-control"
        />
      </div>
      <button className="btn btn-primary">Submit</button>
    </form>
  );
  return (
    <Layout
      title="Signup"
      description="Signup Node React E-commerce App"
      className="container col-md-8 offset-md-2"
    >
      {signUpForm()}
     </Layout>
  );
};
export default Signup;
