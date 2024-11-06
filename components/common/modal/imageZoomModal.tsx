import React, { useState } from "react";

interface ZoomableImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
}

const ZoomableImage: React.FC<ZoomableImageProps> = ({
  src,
  alt,
  width,
  height,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <div
        className="cursor-pointer"
        style={{
          width: `${width}px`,
          height: `${height}px`,
        }}
        onClick={openModal}
      >
        <img
          src={src}
          alt={alt}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
          className="rounded-2xl"
        />
      </div>

      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#00000021] bg-opacity-90"
          onClick={closeModal}
        >
          <div className="relative max-w-full max-h-full">
            <img
              src={src}
              alt={alt}
              className="max-w-full max-h-screen object-contain"
            />
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-white text-3xl"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ZoomableImage;
