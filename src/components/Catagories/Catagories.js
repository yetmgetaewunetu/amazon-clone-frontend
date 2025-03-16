import React from "react";
import classes from "./Catagories.module.css";
import catagories from "./images/catagories";
import { Link } from "react-router-dom";

export default function Catagories() {
  return (
    <div className={classes.catagories_container}>
      {catagories.map((item, index) => {
        const { category, image, name } = item;
        return (
          <Link
            className={classes.catagoriesa}
            key={index}
            to={`/catagory/${category}`}
          >
            <div className={classes.card}>
              <h3>{category}</h3>
              <img src={image} alt="name" className={classes.card_image} />
            </div>
          </Link>
        );
      })}
    </div>
  );
}
