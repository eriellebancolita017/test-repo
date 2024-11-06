/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Multiselect from "multiselect-react-dropdown";

interface SelectComponentProps {
  label: string;
  options: { label: string; value: string }[];
  className?: string;
  disabled?: boolean;
  placeholder?: string;
  onSelect?: (value: any) => void;
  selectedValue?: any;
  mandatory?: boolean;
}

const SelectComponent: React.FC<SelectComponentProps> = ({
  label,
  options,
  className,
  disabled,
  placeholder,
  onSelect,
  selectedValue,
  mandatory,
}) => {
  // const handleSelect = (selectedList: any, selectedItem: any) => {
  //   setSelectedValue(selectedItem);
  // };
  return (
    <div className="multi_select_div ">
      <label
        className={`block text-zinc-600 text-sm font-bold mb-1 ${className}`}
        htmlFor={label}
      >
        {label}
        {mandatory ? <span className="text-red-500">*</span> : ""}
      </label>
      <div className="relative">
        <Multiselect
          disable={disabled}
          displayValue="label"
          options={options}
          singleSelect
          placeholder={placeholder}
          selectedValues={selectedValue ? [selectedValue] : []}
          onSearch={() => console.log("search")}
          onSelect={onSelect}
        />
      </div>
    </div>
  );
};

export default SelectComponent;
