import React, { useEffect, useContext } from "react";
import { DataContext } from "../DataProvider/DataProvider";
import { useNavigate } from "react-router";

export default function ProtectedComponent({ children, msg, redirect }) {
  const navigate = useNavigate();
  const [{ user }, dispatch] = useContext(DataContext);
  useEffect(() => {
    if (!user) {
      navigate("/auth", { state: { msg, redirect } });
    }
  }, [user]);

  return children;
}
