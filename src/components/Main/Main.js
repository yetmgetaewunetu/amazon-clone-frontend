import React, { useEffect, useState } from "react";
import classes from "./Main.module.css";
import Cards from "./Cards/Cards";
export default function Main() {
  async function fetchProducts() {
    try {
      const response = await fetch("https://fakestoreapi.com/products");
      const json = await response.json();
      setItems(json);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }
  const [items, setItems] = useState([]);
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className={classes.cards_container}>
      {items.map((item, index) => {
        return <Cards key={index} {...item} />;
      })}
    </div>
  );
}
