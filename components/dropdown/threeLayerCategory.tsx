import React, { useState } from "react";
// import InputComponent from "../common/inputField/page";
// import SelectComponent from "../common/select/page";

// Define the type for Category
export interface Category {
  id: number;
  name: string;
  parent: number;
  subcategories?: Category[];
}

// Define the props for the child component
interface ThreeLayerDropdownProps {
  categories: Category[];
  label: string;
  selectedCategories: Category[];
  setSelectedCategories: (vl: Category[]) => void;
}

const ThreeLayerDropdown: React.FC<ThreeLayerDropdownProps> = ({
  categories,
  label,
  selectedCategories,
  setSelectedCategories,
}) => {
  const [expandedCategories, setExpandedCategories] = useState<number[]>([]);

  // Toggle category expansion
  const toggleCategory = (id: number) => {
    setExpandedCategories((prev) =>
      prev.includes(id) ? prev.filter((catId) => catId !== id) : [...prev, id],
    );
  };

  // Recursive function to select/deselect all children when a parent is selected/deselected
  const selectCategoryWithChildren = (
    category: Category,
    isSelected: boolean,
  ) => {
    const collectIds = (cat: any): Category[] => [cat];

    const isExist = selectedCategories.find((el) => el.id === category.id);
    if (isExist) {
      const filteredData = selectedCategories.map((item) => {
        if (item.id === category.id) {
          return {
            ...item,
            subcategories: [
              ...(item.subcategories ?? []),
              ...(category.subcategories ?? []),
            ],
          };
        } else {
          return item;
        }
      });

      if (isSelected) {
        setSelectedCategories(filteredData);
      } else {
        const filteredData = selectedCategories.map((el) => {
          if (el.id === category.id) {
            return {
              ...el,
              subcategories: el.subcategories?.filter(
                (item) =>
                  !category.subcategories?.some((el) => el.id === item.id),
              ),
            };
          } else {
            return el;
          }
        });

        const result = filteredData.filter(
          (el) => el.subcategories?.length !== 0,
        );

        setSelectedCategories(result);
      }
    } else {
      const allCategories = collectIds(category);

      setSelectedCategories(
        isSelected
          ? [...new Set([...selectedCategories, ...allCategories])]
          : selectedCategories.filter((cat) => !allCategories.includes(cat)),
      );
    }
  };

  // Handle checkbox change
  const handleCheckboxChange = (category: Category, isChecked: boolean) => {
    selectCategoryWithChildren(category, isChecked);
  };

  // Check if a category is selected
  const isCategorySelected = (
    id: number,
    isSubCat: boolean,
    parentCatId: number,
  ) =>
    isSubCat
      ? selectedCategories
          .find((cat) => cat.id === parentCatId)
          ?.subcategories?.some((el) => el.id === id)
      : selectedCategories.some((cat) => cat.id === id);

  // Remove a tag (deselect the category)
  const removeTag = (category: Category) => {
    const filteredData = selectedCategories.filter(
      (el) => el.id !== category.id,
    );
    setSelectedCategories(filteredData);
  };

  // Render categories recursively
  const renderCategories = (
    categories: Category[],
    isSubCat = false,
    parentCat: any,
  ) => (
    <ul className="pl-1 list_category_three_layer">
      {categories.map((category) => (
        <li key={category.id} className="my-2 text-sm">
          <div className="flex items-center gap-2">
            {category.subcategories && (
              <button
                className="text-sm text-blue-600"
                onClick={() => {
                  toggleCategory(category.id);
                }}
              >
                {expandedCategories.includes(category.id) ? "-" : "+"}
              </button>
            )}
            <input
              type="checkbox"
              checked={isCategorySelected(category.id, isSubCat, parentCat.id)}
              onChange={(e) => {
                if (isSubCat) {
                  const cat = {
                    id: parentCat.id,
                    name: parentCat.name,
                    parent: 0,
                    subcategories: [category],
                  };
                  handleCheckboxChange(cat, e.target.checked);
                } else {
                  handleCheckboxChange(category, e.target.checked);
                }
              }}
            />
            <span>{category.name}</span>
          </div>
          {expandedCategories.includes(category.id) &&
            category.subcategories &&
            renderCategories(category.subcategories, true, category)}
        </li>
      ))}
    </ul>
  );

  // const categoriesArray = [{ value: "ATV", label: "ATV" }];
  // const [showAddCategoryForm, setShowAddCategoryForm] = useState(false);
  return (
    <>
      <label className="block text-zinc-600 text-sm font-bold mb-1">
        {label}
      </label>

      <div className="pl-3 rounded-sm border border-slate-200 w-full dark:bg-[rgb(18,18,18)] dark:border-slate-700">
        {/* Render selected tags */}
        {selectedCategories.length < 1 ? (
          ""
        ) : (
          <div className="show_selected_tag flex gap-2 flex-wrap my-2 border-b pb-2">
            {selectedCategories.map((category) => (
              <div
                key={category.id}
                className="flex items-center text-sm bg-blue-100 text-blue-800 px-3 py-0 rounded-full"
              >
                <span>{category.name}</span>
                <button
                  onClick={() => removeTag(category)}
                  className="ml-2 text-red-500 font-bold"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        )}
        {renderCategories(categories, false, [])}
      </div>
      {/* <p
        className="text-primaryMain text-xs cursor-pointer my-1"
        onClick={() =>
          setShowAddCategoryForm(showAddCategoryForm ? false : true)
        }
      >
        + Add new Category{" "}
      </p> */}
      {/* {showAddCategoryForm && (
        <div className="add_new_category">
          <div className="">
            {" "}
            <InputComponent
              label="New Category "
              placeholder="New category name"
            />
          </div>
          <div className="mb-4 mt-4">
            <SelectComponent label="Parent" options={categoriesArray} />
          </div>
          <div className="text-end">
            <button
              className="btn  bg-primaryMain hover:bg-blueTwo text-white px-6"
              type="button" // Use button to prevent form submission
            >
              <span className="hidden xs:block">Add</span>
            </button>
          </div>
        </div>
      )} */}
    </>
  );
};

export default ThreeLayerDropdown;
