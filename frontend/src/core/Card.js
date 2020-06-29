import React from "react";
import { Link } from "react-router-dom";
import ProductPhoto from "./ProductPhoto";

const Card = ({ product, showViewProductButton = true }) => {
  return (
    <div className="card">
      <div className="card-header">{product.name}</div>
      <div className="card-body">
        <ProductPhoto item={product} url={"product"} />
        <p>{product.description}</p>
        <p>${product.price}</p>
        {showViewProductButton && (
          <Link to={`product/${product._id}`}>
            <button className="btn btn-outline-primary col-6">
              View Product
            </button>
          </Link>
        )}
        <button className="btn btn-outline-warning col-6">Add to Cart</button>
      </div>
    </div>
  );
};

export default Card;
