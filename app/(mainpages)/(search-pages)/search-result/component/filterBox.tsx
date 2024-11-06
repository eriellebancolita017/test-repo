/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";

interface FilterItem {
  label: string;
  value: number;
  count: string;
}

interface FilterBoxProps {
  filters: FilterItem[];
  checkbox: boolean;
  onChange: (e: any) => void;
  value?: number[];
}

const FilterBox: React.FC<FilterBoxProps> = ({
  filters,
  checkbox,
  onChange,
  value,
}) => {
  const [showAll, setShowAll] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<number[]>([]);

  const handleFilterClick = (filter: FilterItem) => {
    const isSelected = selectedFilters.includes(filter.value);

    if (isSelected) {
      setSelectedFilters(
        selectedFilters.filter((value) => value !== filter.value),
      );
    } else {
      setSelectedFilters([...selectedFilters, filter.value]);
    }

    onChange(filter);
  };
  const selectArray = () => {
    if (showAll) {
      return filters;
    } else {
      return filters.slice(0, 8);
    }
  };
  // console.log({value})
  return (
    <div className="border-b pb-2">
      <ul>
        {selectArray().map((filter, index) => (
          <li key={index} className="flex justify-between mb-2">
            <div className="flex">
              {checkbox ? (
                <input
                  type="checkbox"
                  // id={`filter-${filter.value}`}
                  checked={value?.some((item: any) => item == filter.value)}
                  onChange={() => onChange(filter)}
                  className="mr-1"
                />
              ) : (
                ""
              )}
              <label
                className={` normal-case cursor-pointer text-[12px] ${
                  value?.some((item: any) => item == filter.value)
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
                selectedFilters.includes(filter.value)
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

export default FilterBox;
