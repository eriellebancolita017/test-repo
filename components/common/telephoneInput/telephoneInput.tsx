/* eslint-disable prettier/prettier */
import React, { useState, ChangeEvent } from "react";

// Interface for the component props
interface InputComponentProps {
  label: string;
  className?: string;
  value?: string;
  disabled?: boolean;
  placeholder?: string;
  type?: string;
  onChange?: (newValue: string) => void;
  tooltipMessage?: string;
  showTooltip?: boolean;
}

// TelephoneInput function
const TelephoneInput = (mobileNumber: string): string => {
  let input = mobileNumber.replace(/\D/g, ""); // Remove non-numeric characters
  if (input.length > 0 && input.charAt(0) === "0") {
    // Remove leading zeros
    input = input.replace(/^0+/, "");
  }
  const match = input.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/); // Divide the number into groups
  if (match) {
    let formattedInput = match[1] ? `(${match[1]}` : "";
    if (match[2]) {
      formattedInput += `) ${match[2]}`;
    }
    if (match[3]) {
      formattedInput += `-${match[3]}`;
    }
    return formattedInput;
  } else {
    return mobileNumber;
  }
};

// React component
const TelephoneInputComponent: React.FC<InputComponentProps> = ({
  label,
  className,
  value = "",
  disabled = false,
  placeholder = "",
  type = "text",
  // onChange = false,
  onChange = () => {}, // Default onChange handler
}) => {
  const [inputValue, setInputValue] = useState(value);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const formattedValue = TelephoneInput(event.target.value);
    setInputValue(formattedValue);
    if (onChange) {
      onChange(formattedValue);
    }
  };

  return (
    <div className={`input-container ${className}`}>
      {label && (
        <label
          className="block text-zinc-600 text-sm font-bold mb-1"
          htmlFor="telephone"
        >
          {label}{" "}
        </label>
      )}
      <input
        type={type}
        id="telephone"
        value={inputValue}
        onChange={handleInputChange}
        placeholder={placeholder}
        disabled={disabled}
        className="h-9 px-2 rounded-sm border border-slate-200 w-full telephone-input"
      />
    </div>
  );
};

export default TelephoneInputComponent;
