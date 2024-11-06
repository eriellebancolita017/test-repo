import CustomTagInput from "@/components/common/inputField/customTagInput";
import SearchSingleSelect from "@/components/common/select/searchableSingleSelect";
import React, { useState } from "react";

interface Option {
  id: number; // Unique identifier for each option
}

export default function Variant() {
  const [showVariantData, setShowVariantData] = useState(false);
  const [variantOptions, setVariantOptions] = useState<Option[]>([{ id: 1 }]); // Initialize with one option

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShowVariantData(e.target.checked);
  };

  // Add a new option
  const handleAddOption = () => {
    setVariantOptions((prevOptions) => [
      ...prevOptions,
      { id: prevOptions.length + 1 }, // Generate new ID
    ]);
  };

  // Remove an option by ID
  const handleRemoveOption = (id: number) => {
    setVariantOptions((prevOptions) =>
      prevOptions.filter((option) => option.id !== id),
    );
  };

  const optionsArray = [
    { value: "Size", label: "Size" },
    { value: "Color", label: "Color" },
    { value: "Material", label: "Material" },
    { value: "Style", label: "Style" },
    { value: "Title", label: "Title" },
  ];

  return (
    <>
      <div className="flex gap-5 mt-2">
        <div className="w-6/12">
          <div className="mt-2 text-sm mb-2 text-slate-900 dark:text-zinc-500 flex items-center">
            <input
              type="checkbox"
              className="mr-2 w-4 h-4 focus:border-none dark:bg-[rgb(18,18,18)] dark:border-slate-700"
              onChange={handleCheckboxChange}
            />
            This product has multiple options, like different sizes or colors.
          </div>
        </div>
      </div>

      {/* Show variant data if checkbox is checked */}
      {showVariantData && (
        <>
          <div className="border-t border-gray-200 py-3 mt-1">
            <label>OPTIONS</label>
            {variantOptions.map((option, index) => (
              <div key={option.id} className="mt-4">
                <div className="flex justify-between w-full">
                  <label className="block text-zinc-600 text-sm font-bold mb-1 w-[80%]">
                    Option {index + 1}
                  </label>
                  {index > 0 && (
                    <span
                      className="text-primaryMain cursor-pointer"
                      onClick={() => handleRemoveOption(option.id)}
                    >
                      Remove
                    </span>
                  )}
                </div>
                <div className="flex w-full gap-6">
                  <div className="w-[20%]">
                    <SearchSingleSelect label="" options={optionsArray} />
                  </div>
                  <div className="w-[80%]">
                    <CustomTagInput />
                  </div>
                </div>
              </div>
            ))}

            <div className="mt-6">
              <button
                className="btn w-[20%] bg-primaryMain hover:bg-blueTwo text-white px-6"
                type="button" // Use button to prevent form submission
                onClick={handleAddOption}
              >
                <span className="hidden xs:block">Add another option</span>
              </button>
            </div>
          </div>
          <div className="border-t border-gray-200 py-3 mt-1">
            <label>PREVIEW</label>
            <table className="w-full mt-6">
              <thead>
                <tr>
                  <th align="left">Variant</th>
                  <th align="left">Price</th>
                  <th align="left">Quantity</th>
                  <th align="left">SKU</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td align="left" className="py-2 px-3">
                    M
                  </td>
                  <td className="py-2 px-3">
                    <input className="h-10 px-3 rounded-sm border border-slate-200 w-full dark:bg-[rgb(18,18,18)] dark:border-slate-700" />
                  </td>
                  <td className="py-2 px-3">
                    <input
                      type="number"
                      className="h-10 px-3 rounded-sm border border-slate-200 w-full dark:bg-[rgb(18,18,18)] dark:border-slate-700"
                    />
                  </td>
                  <td className="py-2 px-3">
                    <input className="h-10 px-3 rounded-sm border border-slate-200 w-full dark:bg-[rgb(18,18,18)] dark:border-slate-700" />
                  </td>
                </tr>
                <tr className="border-b">
                  <td align="left" className="py-2 px-3">
                    L
                  </td>
                  <td className="py-2 px-3">
                    <input className="h-10 px-3 rounded-sm border border-slate-200 w-full dark:bg-[rgb(18,18,18)] dark:border-slate-700" />
                  </td>
                  <td className="py-2 px-3">
                    <input
                      type="number"
                      className="h-10 px-3 rounded-sm border border-slate-200 w-full dark:bg-[rgb(18,18,18)] dark:border-slate-700"
                    />
                  </td>
                  <td className="py-2 px-3">
                    <input className="h-10 px-3 rounded-sm border border-slate-200 w-full dark:bg-[rgb(18,18,18)] dark:border-slate-700" />
                  </td>
                </tr>
                <tr className="border-b">
                  <td align="left" className="py-2 px-3">
                    XL
                  </td>
                  <td className="py-2 px-3">
                    <input className="h-10 px-3 rounded-sm border border-slate-200 w-full dark:bg-[rgb(18,18,18)] dark:border-slate-700" />
                  </td>
                  <td className="py-2 px-3">
                    <input
                      type="number"
                      className="h-10 px-3 rounded-sm border border-slate-200 w-full dark:bg-[rgb(18,18,18)] dark:border-slate-700"
                    />
                  </td>
                  <td className="py-2 px-3">
                    <input className="h-10 px-3 rounded-sm border border-slate-200 w-full dark:bg-[rgb(18,18,18)] dark:border-slate-700" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </>
      )}
    </>
  );
}
