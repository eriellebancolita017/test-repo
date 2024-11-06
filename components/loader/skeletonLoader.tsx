import React from "react";
import Skeleton from "@mui/material/Skeleton";

interface SkeletonProps {
  type: "text" | "rectangular" | "circular"; // Determines the shape of the skeleton
  width?: number | string; // Optional width
  height?: number | string; // Optional height
  imgPreview?: boolean;
  className?: string;
}

const SkeletonLoader: React.FC<SkeletonProps> = ({
  type,
  width,
  height,
  imgPreview,
  className,
}) => {
  return (
    <div className="relative">
      <Skeleton
        variant={type}
        width={width}
        height={height}
        animation="wave"
        className={className}
        sx={{
          background:
            "linear-gradient(90deg, #D0E4F7 0%, #B7E0F5 50%, #D0E4F7 100%)", // Updated gradient
          backgroundSize: "300% 100%", // Increase the size for a more pronounced effect
          animation: "shimmer 1.2s infinite", // Apply custom animation
        }}
      />
      {imgPreview && (
        <div className="absolute top-0 left-0 flex justify-center items-center w-full h-full ">
          {" "}
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 16 16"
            className=" text-5xl text-[#578fd3] opacity-[0.4]"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M.002 3a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-12a2 2 0 0 1-2-2zm1 9v1a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062zm5-6.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0"></path>
          </svg>
        </div>
      )}
    </div>
  );
};

export default SkeletonLoader;
