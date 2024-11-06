import React, { useState } from "react";

interface TouchSpinProps {
  min: number;
  max: number;
  step: number;
  initialValue: number;
  onChange: (value: number) => void;
}

const TouchSpin: React.FC<TouchSpinProps> = ({
  min,
  max,
  step,
  initialValue,
  onChange,
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
    <div className="touchspin space-x-2 rounded-lg">
      <button
        onClick={handleDecrement}
        disabled={value <= min}
        className="font-semibold rounded-full border w-10 h-10 "
      >
        -
      </button>
      <button className="bg-transparent  font-bold text-center ">
        {value}
      </button>
      <button
        onClick={handleIncrement}
        disabled={value >= max}
        className="font-semibold rounded-full border w-10 h-10 "
      >
        +
      </button>
    </div>
  );
};

export default TouchSpin;
