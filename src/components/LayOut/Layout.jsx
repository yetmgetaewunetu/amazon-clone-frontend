import React from "react";
import Header from "../Header/Header";
import CarouselEffect from "../Carousel/Carousel";
import Catagories from "../Catagories/Catagories";
export default function Layout({ children }) {
  return (
    <div>
      <Header />

      {children}
    </div>
  );
}
