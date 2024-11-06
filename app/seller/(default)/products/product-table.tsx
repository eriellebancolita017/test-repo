/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useItemSelection } from "@/components/utils/use-item-selection";
import ProductTableItem from "./product-table-item";
import { useRouter } from "next/navigation";
import SearchSingleSelect from "@/components/common/select/searchableSingleSelect";
import React, { useState } from "react";
import { StaticImageData } from "next/image";
import SVG from "@/public/svg";

export interface Product {
  id: number;
  image: StaticImageData;
  name: string;
  stock: number;
  price: string;
  taxonomies: any;
  views: number;
  status: string;
  date: string;
}

export default function ProductTable({
  categories,
  conditions,
  productsArray,
  products,
  setPageSize,
  query,
  setQuery,
  setSnackbar,
  total,
}: {
  categories: any[];
  conditions: any[];
  productsArray: any[];
  products: Product[];
  setPageSize: (data: any) => void;
  query: { product: string; category: string; condition: string };
  setQuery: (data: any) => void;
  setSnackbar: (data: any) => void;
  total: number;
}) {
  const {
    selectedItems,
    isAllSelected,
    handleCheckboxChange,
    handleSelectAllChange,
  } = useItemSelection(products);
  const router = useRouter();

  /**
   * state management
   */
  const [searchText, setSearchText] = useState<string>("");

  return (
    <>
      <div className="py-3 px-3 mb-4 flex justify-between items-center bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 relative">
        <div className="">
          <span className="text-primaryMain cursor-pointer">All ({total})</span>{" "}
          |{" "}
          <span className="text-primaryMain cursor-pointer">
            Active ({total}){" "}
          </span>
          |{" "}
          {/* <span className="text-primaryMain cursor-pointer">Inactive (6) </span> */}
        </div>

        <div className="flex items-center">
          <button
            className="btn bg-primaryMain hover:bg-blueTwo text-white mr-3"
            onClick={() => router.push("/seller/add-products")}
          >
            <svg
              className="w-4 h-4 fill-current opacity-50 shrink-0"
              viewBox="0 0 16 16"
            >
              <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
            </svg>
            <span className="hidden xs:block ml-2">Add Product</span>
          </button>
        </div>
      </div>
      <div className="bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 relative">
        <header className="px-5 py-2">
          {/* <h2 className="font-semibold text-slate-800 dark:text-slate-100">
          All Products{" "}
          <span className="text-slate-400 dark:text-slate-500 font-medium">
            248
          </span>
        </h2> */}
        </header>
        <div>
          {/* Table */}

          <div className="flex justify-between mb-4 px-4">
            <div className="flex items-center w-7/12">
              <div className="mr-3 w-48">
                <SearchSingleSelect
                  options={categories}
                  onChange={(e: any) =>
                    setQuery({ ...query, category: e.value })
                  }
                  value={categories.find(
                    (category: any) => category.value === query.category,
                  )}
                  label="Category"
                />
              </div>
              <div className="mr-3 w-48">
                <SearchSingleSelect
                  options={conditions}
                  onChange={(e) => setQuery({ ...query, condition: e.value })}
                  value={conditions.find(
                    (condition: any) => condition.value === query.condition,
                  )}
                  label="Condition"
                />
              </div>
              <div className="mr-3 w-48">
                <SearchSingleSelect
                  options={productsArray}
                  onChange={(e) => setQuery({ ...query, product: e.value })}
                  value={productsArray.find(
                    (product: any) => product.value === query.product,
                  )}
                  label="Product"
                />
              </div>
            </div>
            <div className="flex items-center">
              {/* <button
                className="btn bg-primaryMain hover:bg-blueTwo text-white mr-3"
          
              >
                <span className="hidden xs:block ">Bulk Edit</span>
              </button> */}
              {/* <button
                className="btn bg-primaryMain hover:bg-blueTwo text-white"
                // onClick={() => router.push("/add-products")}
              >
                {" "}
                <span className="hidden xs:block ">
                  <svg
                    className="h-5 w-5"
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 24 24"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M16 1.75V3h5.25a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1 0-1.5H8V1.75C8 .784 8.784 0 9.75 0h4.5C15.216 0 16 .784 16 1.75Zm-6.5 0V3h5V1.75a.25.25 0 0 0-.25-.25h-4.5a.25.25 0 0 0-.25.25ZM4.997 6.178a.75.75 0 1 0-1.493.144L4.916 20.92a1.75 1.75 0 0 0 1.742 1.58h10.684a1.75 1.75 0 0 0 1.742-1.581l1.413-14.597a.75.75 0 0 0-1.494-.144l-1.412 14.596a.25.25 0 0 1-.249.226H6.658a.25.25 0 0 1-.249-.226L4.997 6.178Z"></path>
                    <path d="M9.206 7.501a.75.75 0 0 1 .793.705l.5 8.5A.75.75 0 1 1 9 16.794l-.5-8.5a.75.75 0 0 1 .705-.793Zm6.293.793A.75.75 0 1 0 14 8.206l-.5 8.5a.75.75 0 0 0 1.498.088l.5-8.5Z"></path>
                  </svg>
                </span>
              </button> */}
            </div>
          </div>
          <div className="flex justify-between mb-4 px-4">
            <div className="flex items-center ">
              <span>Show</span>
              <select
                className="w-20 h-10 mx-2 dark:bg-[rgb(18,18,18)] dark:border-slate-700"
                onChange={(event: any) => {
                  setPageSize(event.target.value);
                }}
              >
                <option>10</option>
                <option>25</option>
                <option>50</option> <option>100</option>
              </select>
              <span>Entries</span>
            </div>
            <div className="">
              <input
                type="text"
                className="h-9 mr-2 px-2 rounded-sm border border-slate-200 dark:bg-[rgb(18,18,18)] dark:border-slate-700"
                placeholder="search"
                onChange={(e) => setSearchText(e.target.value)}
              />
              <button
                className="btn bg-primaryMain hover:bg-blueTwo text-white"
                onClick={() => setQuery({ ...query, search: searchText })}
              >
                Search
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="table-auto w-full dark:text-slate-300">
              {/* Table header */}
              <thead className="text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-900/20 border-t border-b border-slate-200 dark:border-slate-700">
                <tr>
                  <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
                    <div className="flex items-center">
                      <label className="inline-flex">
                        <span className="sr-only">Select all</span>
                        <input
                          className="form-checkbox"
                          type="checkbox"
                          onChange={handleSelectAllChange}
                          checked={isAllSelected}
                        />
                      </label>
                    </div>
                  </th>
                  <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                    <div className="font-semibold text-left">Image</div>
                  </th>
                  <th className="px-2 first:pl-5 last:pr-5 py-3 w-52">
                    <div className="font-semibold text-left">Name</div>
                  </th>
                  <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                    <div className="font-semibold text-left">Status</div>
                  </th>
                  <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                    <div className="font-semibold text-left">Stock</div>
                  </th>
                  <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                    <div className="font-semibold text-left">Price</div>
                  </th>
                  <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                    <div className="font-semibold text-center">Taxonomies</div>
                  </th>
                  <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                    <div className="font-semibold">Views</div>
                  </th>
                  <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                    <div className="font-semibold text-center">Date</div>
                  </th>
                  <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                    <div className="font-semibold text-left">Actions</div>
                  </th>
                </tr>
              </thead>
              {/* Table body */}
              <tbody className="text-sm divide-y divide-slate-200 dark:divide-slate-700">
                {products?.map((product) => (
                  <ProductTableItem
                    key={product.id}
                    product={product}
                    setSnackbar={setSnackbar}
                    onCheckboxChange={handleCheckboxChange}
                    isSelected={selectedItems.includes(product.id)}
                  />
                ))}
              </tbody>
            </table>
            {products.length === 0 && (
              <div className="p-4 flex items-center justify-center">
                <SVG.NoDataIcon />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
