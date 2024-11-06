/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prettier/prettier */
import React from "react";
import MultiRangeSlider from "multi-range-slider-react";

interface RangeEvent {
  minValue: number;
  maxValue: number;
  setMinValue: (e: any) => void;
  setMaxValue: (e: any) => void;
  min: number;
  max: number;
  resetPrice: () => void;
}

const PriceSlider = ({
  minValue,
  maxValue,
  setMinValue,
  setMaxValue,
  min,
  max,
  resetPrice,
}: RangeEvent) => {
  const handleInput = (e: RangeEvent) => {
    setMinValue(e.minValue);
    setMaxValue(e.maxValue);
  };

  const handleMinInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    // if (value <= maxValue) {
    setMinValue(value);
    // }
  };

  const handleMaxInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    // if (value >= minValue) {
    setMaxValue(value);
    // }
  };

  return (
    <div className="flex flex-col items-center range_slider_main">
      <MultiRangeSlider
        className="w-full price_range_slider"
        min={min}
        max={max}
        step={5}
        minValue={minValue}
        maxValue={maxValue}
        onInput={(e: any) => handleInput(e)}
        ruler={false}
        barInnerColor="#306CB5"
        barRightColor="#EDEEF3"
      />
      <div className="flex justify-between gap-4 items-end mt-2">
        <div className="flex  items-center w-full">
          $
          <input
            type="number"
            value={minValue}
            onChange={handleMinInputChange}
            className="w-[80px] ml-1 text-sm p-2 border text-[#1A064F] border-[#E4E4E4] rounded-[10px] text-left"
          />
        </div>
        <div className="flex items-center w-full">
          $
          <input
            type="number"
            value={maxValue}
            onChange={handleMaxInputChange}
            className="w-[80px] ml-1 text-sm p-2 border text-[#1A064F] border-[#E4E4E4] rounded-[10px] text-left"
          />
        </div>
      </div>
      <div className="flex justify-end w-full">
        <span
          className="text-primaryMain underline normal-case font-medium cursor-pointer mr-2"
          onClick={resetPrice}
        >
          Reset
        </span>
      </div>
    </div>
  );
};

export default PriceSlider;
