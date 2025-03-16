import React, { useEffect, useState } from "react";
import Layout from "../../components/LayOut/Layout";
import { useParams } from "react-router-dom";
import Cards from "../../components/Main/Cards/Cards";
import classes from "./Results.module.css";
import Loading from "../Loading/Loading";
export default function Results() {
  const { categoryName } = useParams();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const baseUrl = "https://fakestoreapi.com/products/category";

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const initilaUrl = `${baseUrl}/${categoryName}`;
        const encodedUrl = initilaUrl.replace(" ", "%20");

        const result = await fetch(encodedUrl);
        const data = await result.json();
        setItems(data);
        setLoading(false);
      } catch (error) {}
    }
    fetchData();
  }, [categoryName]);

  return (
    <Layout>
      {loading ? (
        <Loading />
      ) : (
        <div>
          {" "}
          <h1 className={classes.pageTitle}>{categoryName}</h1> <hr />
          <div className={classes.cards_container}>
            {items.map((item) => {
              return <Cards {...item} />;
            })}
          </div>
        </div>
      )}
    </Layout>
  );
}
