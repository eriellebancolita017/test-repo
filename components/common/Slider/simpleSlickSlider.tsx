// pages/SliderWithCustomArrows.tsx
import React from "react";
import dynamic from "next/dynamic"; // Import for dynamic import
import { IconButton } from "@mui/material"; // Material UI for custom buttons (optional)

// Dynamically import react-slick
const SlickSlider = dynamic(() => import("react-slick"), { ssr: false });

// Custom Next Arrow Button
const NextArrow = (props: any) => {
  const { className, style, onClick } = props;
  return (
    <IconButton
      className={className}
      style={{
        ...style,
        display: "block",
        right: "10px", // Custom positioning
        zIndex: 1,
      }}
      onClick={onClick}
    >
      {/* Add your custom icon or element here */}
      <div style={{ fontSize: "24px", color: "black" }}>Next</div>
    </IconButton>
  );
};

// Custom Previous Arrow Button
const PrevArrow = (props: any) => {
  const { className, style, onClick } = props;
  return (
    <IconButton
      className={className}
      style={{
        ...style,
        display: "block",
        left: "10px", // Custom positioning
        zIndex: 1,
      }}
      onClick={onClick}
    >
      {/* Add your custom icon or element here */}
      <div style={{ fontSize: "24px", color: "black" }}>Prev</div>
    </IconButton>
  );
};

const SimpleSlickSlider = () => {
  // Slider settings for react-slick
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    nextArrow: <NextArrow />, // Custom Next Arrow
    prevArrow: <PrevArrow />, // Custom Previous Arrow
  };

  return (
    <div>
      <h2>Slider with Custom Next/Prev Buttons</h2>

      <SlickSlider {...settings}>
        <div>
          <h3>Slide 1</h3>
        </div>
        <div>
          <h3>Slide 2</h3>
        </div>
        <div>
          <h3>Slide 3</h3>
        </div>
        <div>
          <h3>Slide 4</h3>
        </div>
        <div>
          <h3>Slide 5</h3>
        </div>
      </SlickSlider>
    </div>
  );
};

export default SimpleSlickSlider;
