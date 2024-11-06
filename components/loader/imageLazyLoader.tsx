import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css"; // Optional effect styles

interface LazyBackgroundImageProps {
  src: string;
  height?: string;
  alt?: string;
  onClick?: void;
}

const ImageLazyLoader: React.FC<LazyBackgroundImageProps> = ({
  src,
  height,
  alt,
}) => {
  return (
    <LazyLoadImage
      src={src}
      alt={alt}
      height={height}
      width="100%"
      effect="blur" // Optional effect, can use "opacity", "black-and-white", etc.
      wrapperProps={{
        // If you need to, you can tweak the effect transition using the wrapper style.
        style: { transitionDelay: "2s" },
      }}
    />
  );
};

export default ImageLazyLoader;
