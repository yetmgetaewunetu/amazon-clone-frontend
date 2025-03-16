import React from "react";
import classes from "./Orderscard.module.css";
import { Rating } from "@mui/material";

export default function OrdersCard({ amount, basket, created }) {
  return (
    <div className={classes.containn}>
      <div className={classes.contain}>
        <div>
          <span>Created At: </span> <p>{created}</p>
        </div>
        <div>
          <span>Total Price: </span> <p>{amount / 100}</p>
        </div>
      </div>

      <div className={classes.OrdersCardContainer}>
        <div className={classes.basketItem}>
          {basket.map((item) => {
            const { rating, title, price, image, amount } = item;
            return (
              <div className={classes.basketCard}>
                <img src={image} alt="title" />
                <div className={classes.cardDetails}>
                  <div>
                    <span>title: </span>
                    <p>{title.slice(0, 100)}</p>
                  </div>
                  <div>
                    <span>price: </span>
                    <p>${price}</p>
                  </div>
                  <div>
                    <span>quantity: </span>
                    <p>{amount}</p>
                  </div>
                  <Rating value={rating.rate} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <hr />
    </div>
  );
}
