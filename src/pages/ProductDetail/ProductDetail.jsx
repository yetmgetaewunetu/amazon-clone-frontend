import React, { useContext, useEffect, useState } from "react";
import Layout from "../../components/LayOut/Layout";
import { useParams } from "react-router-dom";
import classes from "./ProductDetail.module.css";
import { Rating } from "@mui/material";
import Loading from "../Loading/Loading";
import { DataContext } from "../../components/DataProvider/DataProvider";
import { Type } from "../../utility/action.type";
export default function ProductDetail() {
  const [item, setItem] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [state, dispatch] = useContext(DataContext);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const result = await fetch(`https://fakestoreapi.com/products/${id}`);

        const data = await result.json();
        setItem({ ...data });
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [id]);
  const addToCart = () => {
    const { image, price, rating, title, id } = item;
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
    <Layout>
      <h1 classname={classes.title}>{item.title}</h1> <hr />
      {loading ? (
        <Loading />
      ) : (
        <div className={classes.detail_container}>
          <img src={item.image} alt={item.title} />
          <div className={classes.item_description}>
            <h3>
              <span>title: </span>
              {item.title}
            </h3>
            <h3>
              <span>price: </span>
              {item.price}
            </h3>
            <h3>
              <span>category: </span>
              {item.category}
            </h3>
            {item.rating && (
              <div className={classes.rating}>
                <Rating value={item.rating.rate} />
                <span>{item.rating?.count}</span>
              </div>
            )}
            <p className={classes.p}>{item.description}</p>
            <button onClick={addToCart} className={classes.button}>
              add to cart
            </button>
          </div>
        </div>
      )}
    </Layout>
  );
}
