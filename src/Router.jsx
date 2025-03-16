import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing/Landing";
import Cart from "./pages/Cart/Cart";
import Auth from "./pages/Auth/Auth";
import Payment from "./pages/Payment/Payment";
import Orders from "./pages/Orders/Orders";
import Results from "./pages/Results/Results";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import ProtectedComponent from "./components/ProtectedComponent/ProtectedComponent";

const stripePromise = loadStripe(
  "pk_test_51Q7CSSJN8dQioMqTT4eLDnzlD2Is0TInyNx8u03L3I2BJrtwoR1e9nxLYk3qJ97QuOuAdGpGkHz0cxhfdhdoL96c00yrv7DDWs"
);

export default function Routing() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/auth" element={<Auth />} />
          <Route
            path="/payment"
            element={
              <ProtectedComponent
                msg={"you must login first to pay!"}
                redirect={"/payment"}
              >
                <Elements stripe={stripePromise}>
                  <Payment />
                </Elements>
              </ProtectedComponent>
            }
          />
          <Route
            path="/orders"
            element={
              <ProtectedComponent
                msg={"you must login first to see orders history!"}
                redirect={"/payment"}
              >
                <Orders />
              </ProtectedComponent>
            }
          />
          <Route path="/catagory/:categoryName" element={<Results />} />
          <Route path="/singleProduct/:id" element={<ProductDetail />} />
        </Routes>
      </Router>
    </div>
  );
}
