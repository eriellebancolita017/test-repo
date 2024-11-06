// import SVG from "@/public/svg";
import React, { useState } from "react";

interface TouchSpinProps {
  min: number;
  max: number;
  step: number;
  initialValue: number;
  onChange: (value: number) => void;
}

const CustomTouchSpin: React.FC<TouchSpinProps> = ({
  min,
  max,
  step,
  initialValue,
  onChange,
}) => {
  const [value, setValue] = useState(initialValue);

  const handleIncrement = () => {
    if (value < max) {
      const newValue = Math.min(value + step, max);
      setValue(newValue);
      onChange(newValue);
    }
  };

  const handleDecrement = () => {
    if (value > min) {
      const newValue = Math.max(value - step, min);
      setValue(newValue);
      onChange(newValue);
    }
  };

  return (
    <div className="number p-2 flex items-center space-x-2">
      {max > 1 && (
        <span
          onClick={handleDecrement}
          className={`minus  rounded px-2 py-1 border text-center ${
            value <= min
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-gray-200 border-gray-300 cursor-pointer"
          }`}
          style={{ fontSize: "1.25rem", lineHeight: "1rem" }}
          aria-disabled={value <= min}
        >
          -
        </span>
      )}
      <input
        type="text"
        value={value}
        readOnly
        className="text-center w-14 text-xl border font-semibold border-gray-300 rounded"
      />
      {max > 1 && (
        <span
          onClick={handleIncrement}
          className={`plus rounded px-2 py-1 border text-center ${
            value >= max
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-gray-200 border-gray-300 cursor-pointer"
          }`}
          style={{ fontSize: "1.25rem", lineHeight: "1rem" }}
          aria-disabled={value >= max}
        >
          +
        </span>
      )}
    </div>
  );
};

export default CustomTouchSpin;
