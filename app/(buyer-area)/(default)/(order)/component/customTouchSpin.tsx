import SVG from "@/public/svg";
import React, { useState } from "react";

interface TouchSpinProps {
  min: number;
  max: number;
  step: number;
  initialValue: number;
  onChange: (value: number) => void;
  isDisabled?: boolean;
}

const CustomTouchSpin: React.FC<TouchSpinProps> = ({
  min,
  max,
  step,
  initialValue,
  onChange,
  isDisabled = false,
}) => {
  const [value, setValue] = useState(initialValue);

  const handleIncrement = () => {
    const newValue = Math.min(value + step, max);
    setValue(newValue);
    onChange(newValue);
  };

  const handleDecrement = () => {
    const newValue = Math.max(value - step, min);
    setValue(newValue);
    onChange(newValue);
  };

  return (
    <div className="touchspin border p-2 w-24  flex justify-between rounded-3xl">
      <input
        type="number"
        value={value}
        readOnly
        className="bg-transparent w-12 font-bold text-end"
      />
      <div className="grid text-center w-5">
        <button
          onClick={handleDecrement}
          disabled={value <= min || isDisabled}
          className="font-semibold"
        >
          <SVG.upSign />
        </button>
        <button
          onClick={handleIncrement}
          disabled={value >= max || isDisabled}
          className="font-semibold"
        >
          <SVG.downSign />
        </button>
      </div>
    </div>
  );
};

export default CustomTouchSpin;
