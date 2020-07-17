import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import ProductPhoto from "./ProductPhoto";
import moment from "moment";
import { addItem } from "./cartHelpers";

const Card = ({ product, showViewProductButton = true }) => {
  const [redirect, setRedirect] = useState(false);

  const {
    name,
    description,
    price,
    quantity,
    category,
    createdAt,
    _id,
  } = product;

  const showStock = (quantity) => {
    return quantity > 0 ? (
      <span className="badge rounded-pill bg-primary mb-3">In Stock</span>
    ) : (
      <span className="badge rounded-pill bg-primary mb-3">Out of Stock</span>
    );
  };

  const showViewButton = (showViewProductButton) => {
    return (
      showViewProductButton && (
        <Link to={`/product/${_id}`} className="mr-2">
          <button className="btn btn-outline-primary mt-2 mb-2 card-btn-1">
            View Product
          </button>
        </Link>
      )
    );
  };

  const addToCart = () => {
    addItem(product, () => {
      setRedirect(true);
    });
  };

  const shouldRedirect = (redirect) => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };

  const showAddToCartButton = () => {
    return (
      <button onClick={addToCart} className="btn btn-outline-warning col-6">
        Add to Cart
      </button>
    );
  };
  return (
    <div className="card">
      <div className="card-header name">{name}</div>
      <div className="card-body">
        {shouldRedirect(redirect)}
        <ProductPhoto item={product} url={"product"} />
        <p className="lead">{description}</p>
        <p className="black-10">${price}</p>
        <p className="black-9">Category: {category && category.name}</p>
        <p className="black-8">Added on: {moment(createdAt).fromNow()}</p>
        {showStock(quantity)}
        <br />
        {showViewButton(showViewProductButton)}
        {showAddToCartButton()}
      </div>
    </div>
  );
};

export default Card;
