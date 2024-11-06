/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Select from "react-select";
import TooltipCustom from "../tooltip/tooltip";

interface Option {
  value: string;
  label: string;
}

interface DropdownProps {
  isSearchable?: boolean;
  isDisabled?: boolean;
  options: Option[];
  label?: string;
  tooltipMessage?: string;
  showTooltip?: boolean;
  onChange?: (data: any) => void;
  value?: any;
  placeholder?: string;
  mandatory?: boolean;
}

const SearchSingleSelect: React.FC<DropdownProps> = ({
  isDisabled,
  options,
  label,
  onChange,
  tooltipMessage,
  showTooltip,
  value,
  placeholder,
  mandatory,
}) => {
  return (
    <>
      <div className="search_single_select">
        <label className={`flex text-zinc-600 text-sm font-bold mb-1 `}>
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
        <Select
          className="dark:bg-slate-800"
          classNamePrefix="select"
          defaultValue={value}
          value={value}
          isDisabled={isDisabled}
          isSearchable={true}
          name="color"
          options={options}
          onChange={onChange}
          placeholder={placeholder}
        />
      </div>
    </>
  );
};

export default SearchSingleSelect;
