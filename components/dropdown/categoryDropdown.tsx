/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

export const CategoryDropdown = ({ categories }: { categories: any[] }) => {
  return (
    <>
      <div className="category_dropdown_main py-8 px-16 border-t-2 w-full bg-white border-yellow-500 top-[67px]  z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {categories.map((category, index) => (
            <div
              key={category.term_taxonomy_id || index}
              className={`mb-6 menu_title_div ${
                ![0, 4, 8].includes(index)
                  ? "border-l-none md:border-l border-gray-300 ps-0 md:ps-4"
                  : ""
              }`}
            >
              <h5
                className="font-bold text-black"
                dangerouslySetInnerHTML={{
                  __html: category?.term?.name,
                }}
              />
              <ul>
                {category.children.map((subCategory: any) => (
                  <li key={subCategory.term_taxonomy_id} className="py-1 ">
                    <a
                      href={`/search-result?category=${category.term_taxonomy_id}&subcategory=${subCategory.term_taxonomy_id}`}
                      dangerouslySetInnerHTML={{
                        __html: subCategory?.term?.name,
                      }}
                    >
                      {/* {subCategory.term.name} */}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
