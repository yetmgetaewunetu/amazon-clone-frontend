import React, { useContext } from "react";
import classes from "./Header.module.css";
import logo from "../../logo.svg";
import { SlLocationPin } from "react-icons/sl";
import { FaSearch } from "react-icons/fa";
import { BiCart } from "react-icons/bi";
import LowerHeader from "./LowerHeader";
import { Link } from "react-router-dom";
import { DataContext } from "../DataProvider/DataProvider";
import { Type } from "../../utility/action.type";
import { auth } from "../../utility/firebase";

export default function Header() {
  const [state, dispatch] = useContext(DataContext);
  return (
    <>
      <div className={classes.header_container}>
        <div className={classes.logo_container}>
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
          <SlLocationPin />
          <div className={classes.delivery}>
            <p>Deliver to</p>

            <span>Ethiopia</span>
          </div>
        </div>
        <div className={classes.search}>
          <select name="" id="">
            <option value="all">all</option>
          </select>
          <input type="text" />
          <FaSearch size={38} />
        </div>
        <div className={classes.order_container}>
          <div to="/" className={classes.language}>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Flag_of_the_United_States_%28DoS_ECA_Color_Standard%29.svg"
              alt=""
            />
            <select name="" id="">
              <option value="">US</option>
            </select>
          </div>
          {state.user === null ? (
            <Link to="/auth">
              <p>Sign In</p>
              <span>Account & Lists</span>
            </Link>
          ) : (
            <Link
              onClick={() => {
                dispatch({
                  type: Type.SIGN_OUT,
                });
                auth.signOut();
              }}
            >
              <span>hello, {state.user.email.split("@")[0]}</span>
              <p>sign-out</p>
            </Link>
          )}
          <Link to="/orders">
            <p>returns</p>
            <span>& Orders</span>
          </Link>

          <Link to="/cart" className={classes.cart}>
            <BiCart size={35} />
            <span>{state.basket.length}</span>
          </Link>
        </div>
      </div>
      <LowerHeader />
    </>
  );
}
