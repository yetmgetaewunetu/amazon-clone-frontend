import React from "react";
import classes from "./Header.module.css";
import { MdOutlineMenu } from "react-icons/md";

export default function LowerHeader() {
  return (
    <div className={classes.lower_header}>
      <ul>
        <li>
          <MdOutlineMenu size={20} />
          <p>All</p>
        </li>
        <li>Today's Deals</li>
        <li>Customer Service</li>
        <li>Registry</li>
        <li>Gift Service</li>
        <li>Sell</li>
      </ul>
    </div>
  );
}
