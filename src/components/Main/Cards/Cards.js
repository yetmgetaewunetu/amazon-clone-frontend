import React, { useContext, useRef } from "react";
import classes from "./Cards.module.css";
import { Rating } from "@mui/material";
import { Link } from "react-router-dom";
import { DataContext } from "../../DataProvider/DataProvider";
import { Type } from "../../../utility/action.type";

const Cards = ({ image, price, rating, title, id }) => {
  const displayBtn = () => {
    btn.current.style.display = "block";
  };
  const hideBtn = () => {
    btn.current.style.display = "none";
  };
  const btn = useRef(null);

  const [, dispatch] = useContext(DataContext);

  const addToCart = () => {
    dispatch({
      type: Type.ADD_TO_CART,
      item: {
        image,
        price,
        rating,
        title,
        id,
      },
    });
  };

  return (
    <Link className={classes.link} to={`/singleProduct/${id}`}>
      <div
        onMouseOver={() => {
          displayBtn();
        }}
        onMouseOut={() => {
          hideBtn();
        }}
        className={classes.cardup}
      >
        <div className={classes.card}>
          <img src={image} alt="item-image" />
          <h3 className={classes.title}>{title}</h3>
          <div className={classes.rating}>
            <Rating value={rating.rate} />
            <span>{rating.count}</span>
          </div>
          <p className={classes.price}>${price}</p>
        </div>

        <button
          className={classes.button}
          onClick={(e) => {
            addToCart();
            e.preventDefault();
          }}
          ref={btn}
        >
          add to cart
        </button>
      </div>
    </Link>
  );
};

export default Cards;
