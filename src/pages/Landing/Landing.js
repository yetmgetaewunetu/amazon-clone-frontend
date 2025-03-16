import React from "react";
import CarouselEffect from "../../components/Carousel/Carousel";
import Catagories from "../../components/Catagories/Catagories";
import Layout from "../../components/LayOut/Layout";
import Main from "../../components/Main/Main";
export default function Landing() {
  return (
    <Layout>
      <CarouselEffect />
      <Catagories />
      <Main />
    </Layout>
  );
}
