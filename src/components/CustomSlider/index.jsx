"use client";
import React from "react";
import Slider from "react-slick";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import "./index.scss";


const CustomSlider = (props) => {
  const customSettings = props?.customSettings;
  const responsiveSettings = customSettings?.responsive;

  const settings = {
    responsive:
      responsiveSettings?.length > 0
        ? responsiveSettings
        : [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: true,
                dots: true,
              },
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                initialSlide: 2,
              },
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
              },
            },
          ],
    arrows: customSettings?.arrows || false,
    dots: customSettings?.dots || false,
    infinite: customSettings?.infinite || false,
    speed: customSettings?.speed || 1500,
    initialSlide: 0,
    slidesToShow: customSettings?.slidesToShow || 1,
    slidesToScroll: customSettings?.slidesToScroll || 1,
    autoplay: customSettings?.autoplay || true,
    dotsClass: "slick-dots slick-thumb slick-hero-dots",
    swipe: customSettings?.swipe || true,
    pauseOnHover: customSettings?.pauseOnHover || true,
    autoplaySpeed: customSettings?.autoplaySpeed || 4000,
    nextArrow: <div className="prevBtn"><ArrowForwardIosIcon /></div>,
    prevArrow: <div className="nextBtn"><ArrowBackIosIcon /></div>,
    // cssEase: "linear",
  };
  return (
    <div className={props?.className}>
      <Slider {...settings}> {props?.children} </Slider>
    </div>
  );
};

export default CustomSlider;
