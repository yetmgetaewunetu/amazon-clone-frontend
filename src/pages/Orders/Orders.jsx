import React, { useContext, useEffect, useState } from "react";
import Layout from "../../components/LayOut/Layout";
import classes from "./Orders.module.css";
import { db } from "../../utility/firebase";
import { DataContext } from "../../components/DataProvider/DataProvider";
import { doc, collection, getDocs } from "firebase/firestore";
import OrdersCard from "./orderscard/OrdersCard";
export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [{ user }, dispatch] = useContext(DataContext);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user?.uid) return;

      try {
        // Step 1: Reference to the user document
        const userRef = doc(db, "users", user.uid);

        // Step 2: Reference to the "orders" sub-collection
        const ordersCollectionRef = collection(userRef, "orders");

        // Step 3: Fetch all documents from the "orders" sub-collection
        const ordersSnapshot = await getDocs(ordersCollectionRef);

        // Step 4: Process the fetched data
        const ordersData = ordersSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        console.log(ordersData);
        setOrders(ordersData);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, [user]);

  return (
    <Layout>
      <div className={classes.container}>
        <h1>Your Orders</h1>

        <div className={classes.orders}>
          {orders.map((order, index) => {
            return <OrdersCard {...order} key={index} />;
          })}
        </div>
      </div>
    </Layout>
  );
}
