import React from "react";

interface ButtonLoaderProps {
  className?: string; // Optional className for styling
  size?: number; // Optional size for the loader
  color?: string; // Optional color for the SVG icon
}

export const ButtonLoader: React.FC<ButtonLoaderProps> = ({
  className = "",
  size = 16,
  color = "currentColor",
}) => {
  return (
    <svg
      className={`animate-spin ${className}`} // Combine props class with default animation
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill={color} // Set fill color from props
    >
      <path d="M8 16a7.928 7.928 0 01-3.428-.77l.857-1.807A6.006 6.006 0 0014 8c0-3.309-2.691-6-6-6a6.006 6.006 0 00-5.422 8.572l-1.806.859A7.929 7.929 0 010 8c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z" />
    </svg>
  );
};
