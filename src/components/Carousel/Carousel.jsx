import React from "react";
import images from "./images/images";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import classes from "./Carousel.module.css";

export default function CarouselEffect() {
  return (
    <div className={classes.carousel}>
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showIndicators={false}
        showThumbs={false}
      >
        {images.map((img, index) => {
          return <img key={index} src={img} alt="image" />;
        })}
      </Carousel>
      <div className={classes.hero_img}></div>
    </div>
  );
}
