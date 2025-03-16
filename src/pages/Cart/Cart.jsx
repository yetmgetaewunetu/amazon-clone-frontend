import React, { useContext, useState } from "react";
import Layout from "../../components/LayOut/Layout";
import classes from "./Cart.module.css";
import { DataContext } from "../../components/DataProvider/DataProvider";
import { Type } from "../../utility/action.type";
import { Link } from "react-router-dom";
import { FaChevronUp } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";

export default function Cart() {
  const [state, dispatch] = useContext(DataContext);

  let price = 0;
  state.basket.forEach((element) => {
    price = price + Number.parseFloat(element.price * element.amount);
  });
  const increase = (item) => {
    dispatch({
      type: Type.ADD_TO_CART,
      item,
    });
  };
  const decrease = (id) => {
    dispatch({
      type: Type.REMOVE_FROM_CART,
      id,
    });
  };
  return (
    <Layout>
      <div className={classes.cart_container}>
        <h1>Items in Your Cart</h1> <hr /> <br />
        <br />
        <br />
        {state.basket.map((item, index) => {
          const { image, price, title, id, amount, rating } = item;
          return (
            <div key={index} className={classes.cart_item}>
              <div className={classes.description}>
                <img src={image} className={classes.cart_image} alt={title} />
                <h3>{title}</h3>
                <p className={classes.price}>${price}</p>
                <div className={classes.amountCtrl}>
                  <button
                    onClick={() => {
                      increase(item);
                    }}
                  >
                    <FaChevronUp />
                  </button>

                  <span>{amount}</span>
                  <button
                    onClick={() => {
                      decrease(item.id);
                    }}
                  >
                    <FaChevronDown />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className={classes.proceed}>
        <div>
          <span className={classes.spanTxt}>Total items:</span>{" "}
          <span className={classes.num}>{state.basket.length}</span>
        </div>
        <div>
          <span className={classes.spanTxt}>price:</span>{" "}
          <span className={classes.num}>${price}</span>
        </div>
        <div>
          {" "}
          <input type="checkbox" name="gift" id="" />
          <small>is that a gift?</small>
        </div>
        <Link to="/payment">
          {" "}
          <button className={classes.checkout}>proceed to checkout</button>
        </Link>
      </div>
    </Layout>
  );
}
