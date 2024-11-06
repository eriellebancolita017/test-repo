// components/stepper.tsx
import React from "react";

interface StepHeaderProps {
  steps: { title: string; description: string }[];
  currentStep: number;
}

const StepHeader: React.FC<StepHeaderProps> = ({ steps, currentStep }) => {
  return (
    <div className="flex justify-center mb-6">
      {steps.map((step, index) => (
        <div
          key={index}
          className="px-4 py-2 mx-1 rounded-full stepper_counter_div 
          "
        >
          <div className="flex">
            <div
              className={`h-7 w-7 font-medium  rounded-full mr-2 flex justify-center items-center ${
                currentStep >= index
                  ? "bg-green-500 text-white"
                  : "bg-white text-primaryMain shadow-xl countShadow"
              }`}
            >
              {index + 1}
            </div>
            <div>
              <p className="font-semibold text-black capitalize">
                {step.title}
              </p>
              <span className="text-nowrap text-sm capitalize text-gray-400">
                {step.description}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StepHeader;
