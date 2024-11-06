import React, { useState, useRef } from "react";
import Image from "next/image";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import NextIcon from "@/public/images/grommet-icons_next.png";

interface SimpleSliderProps {
  items: React.ReactNode[];
}

const SimpleSlider: React.FC<SimpleSliderProps> = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<AliceCarousel>(null);

  const handleSlideChange = ({ item }: { item: number }) => {
    setCurrentIndex(item);
  };

  const handlePrevClick = () => {
    carouselRef.current?.slidePrev();
  };

  const handleNextClick = () => {
    carouselRef.current?.slideNext();
  };

  return (
    <div>
      <div className="my-4 px-4 gap-3 relative">
        <AliceCarousel
          ref={carouselRef}
          mouseTracking
          items={items}
          responsive={{
            512: { items: 3 },
            1024: { items: 4 },
          }}
          activeIndex={currentIndex}
          onSlideChanged={handleSlideChange}
          disableDotsControls
          infinite={true} // Enable infinite loop
          // autoPlay={true} // Enable autoplay
          autoPlayInterval={1000} // Adjust time interval for slide change
          animationDuration={800} // Smooth transition animation
        />
        <button
          onClick={handlePrevClick}
          className="prev-button absolute top-[45%] left-0 border border-[#1010DC] rounded-full cursor-pointer text-lg p-2 w-10 h-10 flex items-center justify-center"
        >
          <Image
            src={NextIcon}
            alt="prev"
            width={20}
            height={25}
            className="rotate-180"
          />
        </button>
        <button
          onClick={handleNextClick}
          className="next-button absolute right-0 top-[45%] border border-[#1010DC] rounded-full cursor-pointer text-lg p-2 w-10 h-10 flex items-center justify-center"
        >
          <Image src={NextIcon} alt="next" width={20} height={25} />
        </button>
      </div>
    </div>
  );
};

export default SimpleSlider;
