import React from "react";
// @ts-expect-error/types issue
import { ProgressBar, Step } from "react-step-progress-bar";
import "react-step-progress-bar/styles.css";

interface StepProgressProps {
  currentStep: number;
  steps: { title: React.ReactNode; icon?: React.ReactNode }[];
}

const OnTrackingSlider: React.FC<StepProgressProps> = ({
  currentStep,
  steps,
}) => {
  return (
    <div className="w-full p-4 mt-2 mb-5 order_tracking_status min-h-28">
      <ProgressBar
        percent={(currentStep / (steps.length - 1)) * 100}
        filledBackground="#306CB5"
        unfillColor="#fff"
      >
        {steps.map((step, index) => (
          <Step key={index}>
            {() => {
              let bgColor = "";
              if (index < currentStep) {
                bgColor = "bg-primaryMain border-primaryMain text-white"; // Completed
              } else if (index === currentStep) {
                bgColor = "bg-primaryMain border-white text-white"; // In Progress
              } else {
                bgColor = "bg-white border-primaryMain text-gray-500"; // Not Started
              }

              let color = "";
              if (index < currentStep) {
                color = " text-[#191C1F]"; // Completed
              } else if (index === currentStep) {
                color = "text-[#191C1F]"; // In Progress
              } else {
                color = "text-[#818181]"; // Not Started
              }

              let svgColor = "";
              if (index < currentStep) {
                svgColor = " text-[#2DB224]"; // Completed
              } else if (index === currentStep) {
                svgColor = "text-[#306CB5]"; // In Progress
              } else {
                svgColor = "text-[#818181]"; // Not Started
              }
              return (
                <div className={`flex flex-col items-center mt-[105px] `}>
                  <div
                    className={`rounded-full w-6 h-6 flex items-center justify-center border-2 ${bgColor}`}
                  >
                    {index < currentStep ? (
                      <span className="text-white">✓</span>
                    ) : (
                      ""
                    )}
                  </div>
                  {step.icon && (
                    <div className={`mt-6 mb-2 ${svgColor}`}>{step.icon}</div>
                  )}
                  <div className={`text-center font-medium text-sm ${color} `}>
                    {step.title}
                  </div>
                </div>
              );
            }}
          </Step>
        ))}
      </ProgressBar>
    </div>
  );
};

export default OnTrackingSlider;
