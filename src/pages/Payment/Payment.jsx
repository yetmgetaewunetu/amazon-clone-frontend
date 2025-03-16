import React, { useContext, useState } from "react";
import Layout from "../../components/LayOut/Layout";
import classes from "./Payment.module.css";
import { DataContext } from "../../components/DataProvider/DataProvider";
import Cards from "../../components/Main/Cards/Cards";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import instance from "../../API/axios";
import { SyncLoader } from "react-spinners";
import { db } from "../../utility/firebase";
import { doc, setDoc, collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router";

export default function Payment() {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [{ basket, user }, dispatch] = useContext(DataContext);
  const items = basket.reduce((amount, item) => {
    return amount + item.amount;
  }, 0);
  const total = basket.reduce((amount, item) => {
    return amount + item.amount * item.price;
  }, 0);
  const [error, setError] = useState(null);
  const handleChange = (e) => {
    e?.error?.message ? setError(e?.error?.message) : setError("");
  };
  const navigate = useNavigate();
  const handlePayment = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const response = await instance({
        method: "POST",
        url: `/payment/create?total=${total * 100}`,
      });
      const ClientSecret = await response.data.clientSecret;
      console.log(ClientSecret);
      const { paymentIntent } = await stripe.confirmCardPayment(
        ClientSecret,

        {
          payment_method: {
            card: elements.getElement(CardElement),
          },
        }
      );
      console.log(paymentIntent);
      const userRef = doc(collection(db, "users"), user.uid); // Get user doc reference
      const ordersRef = doc(collection(userRef, "orders"), paymentIntent.id); // Get orders doc reference

      await setDoc(ordersRef, {
        basket: basket,
        amount: paymentIntent.amount,
        created: paymentIntent.created,
      });
      navigate("/orders", { state: { msg: "you have place a new order!" } });
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  return (
    <Layout>
      <h1 className={classes.header}>Checkout ({items} )items</h1>
      <hr />
      {/* delivery address*/}
      <div className={classes.flex}>
        <h3 className={classes.h3}>Delivery Adress</h3>
        <div>
          <span>{user?.email}</span>
          <span>4-kilo st.trinity</span>
          <span>Addis Ababa,Ethiopia</span>
        </div>
      </div>
      <hr />
      <div className={classes.flex}>
        <h3>Review your Items</h3>
        <div className={classes.cardContainer}>
          {basket.map((item) => {
            return <Cards {...item} />;
          })}
        </div>
      </div>
      <div className={classes.flex}>
        <h3>Payment Methods</h3>
        <div className={classes.payment_card_container}>
          <div>
            <form onSubmit={handlePayment}>
              {error && <small style={{ color: "red" }}>{error}</small>}
              <CardElement onChange={handleChange} />
              <div className={classes.btnpart}>
                <div>
                  <span>Total Price: ${total}</span>
                </div>
                <button type="submit">
                  {loading ? <SyncLoader size={7} /> : "Pay Now"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}
