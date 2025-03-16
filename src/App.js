import "./App.css";
import { auth } from "./utility/firebase";
import Layout from "./components/LayOut/Layout";
import Routing from "./Router";
import { Type } from "./utility/action.type";
import { DataContext } from "./components/DataProvider/DataProvider";
import { useContext, useEffect } from "react";
function App() {
  const [{ user }, dispatch] = useContext(DataContext);
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      dispatch({
        type: Type.SET_USER,
        user: authUser,
      });
    });
  }, []);
  return (
    <>
      <Routing />
    </>
  );
}

export default App;
