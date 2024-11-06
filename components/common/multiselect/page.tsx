/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Multiselect from "multiselect-react-dropdown";

interface MultiselectDropdownProps {
  label: string;
  options: { label: string; value: string }[]; // Define the type of options
  className?: string;
  handleRemove?: (e: any) => void;
  handleSelect?: (e: any) => void;
  selectedValues?: { label: string; value: string }[];
}

const MultiselectDropdown: React.FC<MultiselectDropdownProps> = ({
  label,
  options,
  className,
  selectedValues,
  handleSelect,
  handleRemove,
}) => {
  return (
    <div className="multi_select_div">
      <label
        className={`block text-zinc-600 text-sm font-bold mb-1 ${className}`}
        htmlFor={label}
      >
        {label}
      </label>
      <div>
        <Multiselect
          className="border border-slate-200 "
          displayValue="label"
          selectedValues={selectedValues}
          onRemove={handleRemove}
          onSelect={handleSelect}
          options={options} // Pass options from parent component
          showCheckbox={false}
          closeIcon="cancel"
          style={{ multiselectContainer: { width: "100%" } }}
          placeholder="Search and select "
        />
      </div>
    </div>
  );
};

export default MultiselectDropdown;
