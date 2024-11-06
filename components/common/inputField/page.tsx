/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import TooltipCustom from "../tooltip/tooltip";
import SVG from "@/public/svg";

interface InputComponentProps {
  label: string;
  className?: string;
  disabled?: boolean;
  placeholder?: string;
  type?: string;
  tooltipMessage?: string;
  showTooltip?: boolean;
  mandatory?: boolean;
  onChange?: (e: any) => void;
  value?: string | number;
  maxLength?: number;
}

const InputComponent: React.FC<InputComponentProps> = ({
  label,
  className,
  disabled,
  placeholder,
  type,
  tooltipMessage,
  showTooltip,
  mandatory,
  maxLength,
  ...rest
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  return (
    <div className="relative">
      <label
        className={`text-zinc-600 text-sm font-bold mb-1 flex  ${className}`}
        htmlFor={label}
      >
        {label} {mandatory ? <span className="text-red-500">*</span> : ""}
        {showTooltip ? (
          <TooltipCustom bg="light" className="ms-2 ">
            <div className="text-[10px] font-normal text-slate-900 min-w-52 ">
              {tooltipMessage}
            </div>
          </TooltipCustom>
        ) : (
          ""
        )}
      </label>
      <input
        className="h-10 px-3 rounded-sm border border-slate-200 w-full dark:bg-[rgb(18,18,18)] dark:border-slate-700"
        disabled={disabled}
        placeholder={placeholder}
        maxLength={maxLength}
        // onChange={onChange}
        type={type === "password" && showPassword ? "text" : type}
        {...rest}
      />
      {type === "password" && (
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute bottom-3 right-2 flex items-center px-2"
        >
          {!showPassword ? <SVG.EyeClose /> : <SVG.EyeOpen />}
        </button>
      )}
    </div>
  );
};

export default InputComponent;
