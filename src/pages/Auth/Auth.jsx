import React, { useContext, useState } from "react";
import Layout from "../../components/LayOut/Layout";
import classes from "./signin.module.css";
import logo from "./amzon.png";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { auth } from "../../utility/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { DataContext } from "../../components/DataProvider/DataProvider";
import { Type } from "../../utility/action.type";
import { SyncLoader } from "react-spinners";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [{ user }, dispatch] = useContext(DataContext);
  const [loading, setLoading] = useState({ in: false, up: false });
  const updateEmail = (e) => setEmail(e.currentTarget.value);
  const updatePassword = (e) => setPassword(e.currentTarget.value);
  const navigate = useNavigate();
  const navStateData = useLocation();
  console.log(navStateData);
  console.log(user);
  const authHandler = async (e) => {
    e.preventDefault();
    const action = e.target.name;

    try {
      if (action === "signin") {
        setLoading({ ...loading, in: true });
        const userInfo = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

        dispatch({
          type: Type.SET_USER,
          user: userInfo.user,
        });

        setLoading({ ...loading, in: false });
        navigate(navStateData?.state?.redirect || "/");
      } else if (action === "signup") {
        setLoading({ ...loading, up: true });
        const userInfo = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        dispatch({
          type: "SET_USER",
          user: userInfo.user,
        });
        setLoading({ ...loading, up: false });
        navigate(navStateData?.state?.redirect || "/");
      }
    } catch (error) {
      console.log(error.message);
      setError(error.message);
      setLoading({ in: false, up: false });
    }
  };

  return (
    <Layout>
      <div className={classes.authContainer}>
        <Link to="/">
          <img className={classes.logo} src={logo} alt="amazon logo" />
        </Link>
        <div className={classes.form}>
          <h2 className={classes.h2}>Sign in</h2>
          {error && (
            <p
              style={{
                color: "red",
                fontSize: "0.9rem",
                width: "100%",
                padding: "5px",
                textAlign: "center",
              }}
              className={classes.error}
            >
              {error}
            </p>
          )}
          <small
            style={{
              color: "red",
              fontWeight: "bolder",
              textTransform: "capitalize",
            }}
          >
            {navStateData?.state?.msg}
          </small>
          <span>Email or mobile phone number</span>
          <input onChange={updateEmail} value={email} type="text" />
          <span>Password</span>
          <input
            onChange={updatePassword}
            value={password}
            type="password"
            name="password"
            id="password"
          />
          <button
            type="submit"
            onClick={authHandler}
            className={classes.button}
            name="signin"
          >
            {loading.in ? (
              <SyncLoader speedMultiplier={0.7} size={10} />
            ) : (
              "Sign in"
            )}
          </button>
          <p className={classes.p}>
            By continuing, you agree to Amazon's{" "}
            <Link to="/">Conditions of Use and Privacy Notice.</Link>
          </p>
          <Link className={classes.a} to="/help">
            Need help?
          </Link>
          <hr />
          <span className={classes.span}>Buying for work?</span>
          <Link className={classes.a} to="/business">
            Shop on Amazon Business
          </Link>
        </div>
        <div className={classes.new_to_amazon}>
          <span>New to Amazon?</span>
        </div>
        <button
          type="submit"
          onClick={authHandler}
          className={classes.createAccount}
          name="signup"
        >
          {loading.up ? <SyncLoader size={10} /> : "Create your Amazon Account"}
        </button>

        <div className={classes.footer_links}>
          <Link className={classes.a} to="/conditions">
            Conditions of use
          </Link>
          <Link className={classes.a} to="/privacy">
            Privacy Notice
          </Link>
          <Link className={classes.a} to="/help">
            Help
          </Link>
        </div>
        <p className={classes.copyright}>
          &copy; 1996-2024, Amazon.com, Inc. or its affiliates
        </p>
      </div>
    </Layout>
  );
}
