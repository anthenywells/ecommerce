import React, { useState, useEffect } from "react";
import DropIn from "braintree-web-drop-in-react";
import { Link } from "react-router-dom";
import { getBraintreeClientToken, processPayment } from "./apiCore";
import { isAuthenticated } from "../auth";

const Checkout = ({ products, setRun = (f) => f, run = undefined }) => {
  const [data, setData] = useState({
    success: false,
    clientToken: null,
    error: "",
    instance: {},
    address: "",
  });

  const userId = isAuthenticated() && isAuthenticated().user._id;
  const token = isAuthenticated() && isAuthenticated().token;

  const getToken = (userId, token) => {
    getBraintreeClientToken(userId, token).then((data) => {
      if (data.error) {
        setData({ ...data, error: data.error });
      } else {
        setData({ clientToken: data.clientToken });
      }
    });
  };

  useEffect(() => {
    getToken(userId, token);
  }, []);

  const getTotal = () => {
    return products.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0);
  };

  const showCheckout = () => {
    return isAuthenticated() ? (
      <div>{showDropIn()}</div>
    ) : (
      <Link to="/signin">
        <button className="btn btn-primary">Sign in to checkout</button>
      </Link>
    );
  };

  const buy = () => {
    //send nonce to server
    //nonce = data.instance.requestPaymentMethod()
    let nonce;
    let getNonce = data.instance
      .requestPaymentMethod()
      .then((data) => {
        console.log("buy -> data", data);
        nonce = data.nonce;
        //once you have nonce, send (card type, card number) send nonce as 'paymentMethodNonce' and total to be charged
        // console.log(
        //   "send nonce and total to be process:",
        //   nonce,
        //   getTotal(products)
        // );
        const paymentData = {
          paymentMethodNonce: nonce,
          amount: getTotal(products),
        };

        processPayment(userId, token, paymentData)
          .then((response) => {
            // console.log("buy -> response", response);
            setData({ ...data, success: response.success });
            //empty cart
            //create order

          })
          .catch((error) => {
            console.log("buy -> error", error);
          });
      })
      .catch((error) => {
        // console.log("buy -> error", error);
        setData({ ...data, error: error.message });
      });
  };

  const showDropIn = () => (
    <div onBlur={() => setData({ ...data, error: "" })}>
      {data.clientToken !== null && products.length > 0 ? (
        <div>
          <DropIn
            options={{
              authorization: data.clientToken,
            }}
            onInstance={(instance) => (data.instance = instance)}
          />
          <button onClick={buy} className="btn btn-success btn-block">
            Pay
          </button>
        </div>
      ) : null}
    </div>
  );

  const showError = (error) => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  const showSuccess = (success) => (
    <div
      className="alert alert-info"
      style={{ display: success ? "" : "none" }}
    >
      Thank you. Payment was successful.
    </div>
  );

  return (
    <div>
      <h2>Total: ${getTotal()}</h2>
      {showError(data.error)}
      {showSuccess(data.success)}
      {showCheckout()}
    </div>
  );
};

export default Checkout;
