/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";

interface LabelFilterItem {
  label: string;
  value: number;
  count: string;
}

interface LabelFilterBoxProps {
  filters: LabelFilterItem[];
  checkbox: boolean;
  onChange: (e: any) => void;
  multiSelect?: boolean;
  value: any;
}

const LabelFilterBox: React.FC<LabelFilterBoxProps> = ({
  filters,
  checkbox,
  onChange,
  value,
}) => {
  const [showAll, setShowAll] = useState(false);
  // const [selectedFilters, setSelectedFilters] = useState<any>(value);

  const handleFilterClick = (filter: LabelFilterItem) => {
    // setSelectedFilters(filter.value);
    onChange(filter); // Pass the updated selection to parent
  };

  const selectArray = () => {
    if (showAll) {
      return filters;
    } else {
      return filters.slice(0, 8);
    }
  };
  return (
    <div className="border-b pb-2">
      <ul>
        {selectArray().map((filter, index) => (
          <li key={index} className="flex justify-between mb-2">
            <div className="flex">
              {checkbox ? (
                <input
                  type="checkbox"
                  id={`filter-${filter.value}`}
                  onChange={() => onChange(filter)}
                  className="mr-1"
                />
              ) : (
                ""
              )}
              <label
                className={` normal-case cursor-pointer text-[12px] ${
                  value?.value == filter.value
                    ? "text-primaryMain font-bold"
                    : "text-black font-medium"
                }`}
                htmlFor={`filter-${filter.value}`}
                onClick={() => {
                  handleFilterClick(filter);
                }}
                dangerouslySetInnerHTML={{ __html: filter.label }}
              />
            </div>
            <span
              className={`text-[12px] ${
                value?.value === filter.value
                  ? "text-primaryMain font-bold"
                  : "text-black"
              }`}
            >
              ({filter.count.toLocaleString()})
            </span>
          </li>
        ))}
      </ul>
      <p
        onClick={() => setShowAll(!showAll)}
        className="underline text-primaryMain mt-5 font-medium normal-case cursor-pointer"
      >
        {showAll ? "Show less" : "Show more"}
      </p>
    </div>
  );
};

export default LabelFilterBox;
