/* eslint-disable @typescript-eslint/no-explicit-any */
import SkeletonLoader from "@/components/loader/skeletonLoader";
import IMAGES from "@/public/images";
import React, { useState, useRef, useEffect } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

interface ProductImage {
  id: number;
  url: string;
}

interface ProductSliderProps {
  images: ProductImage[];
}

const ProductSlider: React.FC<ProductSliderProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentImage, setCurrentImage] = useState<string | undefined>();

  const carouselRef = useRef<AliceCarousel>(null);

  const updateCurrentImage = (index: number) => {
    const imageUrl = images[index]?.url.includes("http")
      ? images[index]?.url
      : `${process.env.NEXT_PUBLIC_API_BASE_URL}${images[index]?.url}`;
    setCurrentImage(imageUrl);
  };

  const handleSlideChange = ({ item }: { item: number }) => {
    setCurrentIndex(item);
    updateCurrentImage(item);
  };

  const handleThumbnailClick = (index: number) => {
    setCurrentIndex(index);
    updateCurrentImage(index);
    carouselRef.current?.slideTo(index);
  };

  const handlePrevClick = () => {
    if (currentIndex > 0) {
      carouselRef.current?.slidePrev();
    }
  };

  const handleNextClick = () => {
    if (currentIndex < images.length - 1) {
      carouselRef.current?.slideNext();
    }
  };

  useEffect(() => {
    if (images.length > 0) updateCurrentImage(0);
  }, [images]);

  const carouselItems = images.map((image, index) => (
    <div
      className={`item mx-2 ${
        index === currentIndex ? "border-2 border-primaryMain rounded-md" : ""
      }`}
      key={image.id}
    >
      <img
        className="border rounded-lg"
        alt={`Product ${index + 1}`}
        style={{ width: "100%", cursor: "pointer" }}
        src={
          image.url.includes("http")
            ? image.url
            : `${process.env.NEXT_PUBLIC_API_BASE_URL}${image.url}`
        }
        onClick={() => handleThumbnailClick(index)}
        onError={(e: any) => {
          e.target.src = "./images/default_upload.png";
        }}
      />
    </div>
  ));

  return (
    <div className="mx-4">
      {images.length ? (
        <div className="main-image">
          <img
            className="rounded-2xl"
            src={currentImage}
            alt={`Product ${currentIndex + 1}`}
            style={{ width: "100%", maxWidth: "100%", height: "auto" }}
            onError={() => setCurrentImage(IMAGES.dummyProductBig.src)}
          />
        </div>
      ) : (
        <SkeletonLoader type="rectangular" width={510} height={528} />
      )}

      <div className="thumbnails my-4 px-4 gap-3 relative">
        {images.length < 4 ? (
          <ul className="flex gap-4">
            {images.map((image, index) => (
              <li key={image.id}>
                <img
                  className="border rounded-lg"
                  alt={`Product ${index + 1}`}
                  style={{ width: "107px", height: "107px", cursor: "pointer" }}
                  src={
                    image.url.includes("http")
                      ? image.url
                      : `${process.env.NEXT_PUBLIC_API_BASE_URL}${image.url}`
                  }
                  onClick={() => handleThumbnailClick(index)}
                  onError={(e: any) => {
                    e.target.src = "./images/default_upload.png";
                  }}
                />
              </li>
            ))}
          </ul>
        ) : (
          <>
            <AliceCarousel
              ref={carouselRef}
              mouseTracking
              items={carouselItems}
              responsive={{
                0: { items: 1 },
                512: { items: 3 },
                1024: { items: 4 },
              }}
              activeIndex={currentIndex}
              onSlideChanged={handleSlideChange}
              disableButtonsControls={images.length < 4}
              disableDotsControls
              autoPlay={false}
              autoPlayInterval={5000}
            />
            {images.length > 4 && (
              <>
                <button
                  onClick={handlePrevClick}
                  disabled={currentIndex === 0}
                  className={`prev-button absolute top-12 left-0 ${
                    currentIndex === 0 ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="10"
                    height="17"
                    viewBox="0 0 10 17"
                    fill="none"
                  >
                    <path
                      d="M8.75 1L1.25 8.5L8.75 16"
                      stroke="black"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                <button
                  onClick={handleNextClick}
                  disabled={currentIndex === images.length - 1}
                  className={`next-button absolute right-0 top-12 ${
                    currentIndex === images.length - 1
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="10"
                    height="17"
                    viewBox="0 0 10 17"
                    fill="none"
                  >
                    <path
                      d="M1.25 1L8.75 8.5L1.25 16"
                      stroke="black"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ProductSlider;
