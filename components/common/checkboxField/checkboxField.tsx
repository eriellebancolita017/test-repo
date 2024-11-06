import React, { ReactNode } from "react";
import TooltipCustom from "../tooltip/tooltip";

interface CheckboxComponentProps {
  label: ReactNode;
  className?: string;
  value?: string; // Define the type for the value prop
  disabled?: boolean;
  placeholder?: string;
  type?: string;
  onChange?: (newValue: boolean) => void; // Correct type for onChange
  tooltipMessage?: string;
  showTooltip?: boolean;
  mandatory?: boolean;
  checked?: boolean;
}

const CheckboxComponent: React.FC<CheckboxComponentProps> = ({
  label,
  className,
  value,
  disabled,
  placeholder,
  onChange,
  type,
  tooltipMessage,
  showTooltip,
  mandatory,
  checked,
  ...rest
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e.target.checked); // Pass the new value to the parent component
    }
  };
  return (
    <div className="flex items-start">
      <input
        value={value}
        disabled={disabled}
        placeholder={placeholder}
        checked={checked}
        onChange={handleChange}
        type={type}
        {...rest}
        name="remove_items"
        className="mr-2 mt-1 h-4 w-4 focus:border-none dark:bg-[rgb(18,18,18)] dark:border-slate-700"
      />
      <label className={`block text-zinc-600 text-sm mb-1  ${className}`}>
        {label}
        {mandatory ? <span className="text-red-500">*</span> : ""}
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
    </div>
  );
};

export default CheckboxComponent;
