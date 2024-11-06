/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import { Product } from "./product-table";
import { useRouter } from "next/navigation";
import TooltipMainComponent from "@/components/common/tooltip/tooltipMainComponent";
import React, { useState } from "react";
interface CustomersTableItemProps {
  product: Product;
  onCheckboxChange: (id: number, checked: boolean) => void;
  isSelected: boolean;
  setSnackbar: (e: {
    message: string;
    severity: "success" | "error";
    open: boolean;
  }) => void;
}
// import Image08 from "@/public/images/product4.png";
// import { Alert, Snackbar } from "@mui/material";
// import { UserApi } from "@fizno/api-client/src/apis/UserApi";
// import { useAppDispatch, useAppSelector } from "@/redux/hooks";
// import { setGlobalLoading, setReload } from "@/redux/slices/product.slice";
import DeleteModal from "@/components/common/modal/deleteModal";
import { decodeHtmlEntities } from "@/utils/commonFunction";
import IMAGES from "@/public/images";

export default function ProductTableItem({
  product,
  onCheckboxChange,
  isSelected,
  setSnackbar,
}: CustomersTableItemProps) {
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onCheckboxChange(product.id, e.target.checked);
  };
  // const [snackbar, setSnackbar] = useState<{
  //   message: string;
  //   severity: "success" | "error";
  //   open: boolean;
  // }>({ message: "", severity: "success", open: false });
  const router = useRouter();
  // const dispatch = useAppDispatch();
  // const { reload } = useAppSelector((state) => state.products);

  /**
   * state mangement
   */
  const [prodImage, setProdImage] = useState<any>(product.image);
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);

  // const deleteProducts = async (id: number) => {
  //   dispatch(setGlobalLoading(true));
  //   try {
  //     const response = await UserApi.deleteProducts(id);
  //     if (response.remote === "success") {
  //       setSnackbar({
  //         message: "delete successful!",
  //         severity: "success",
  //         open: true,
  //       });
  //     }
  //   } catch (error) {
  //     setSnackbar({
  //       message: "something went wrong!",
  //       severity: "error",
  //       open: true,
  //     });
  //     console.error("Error deleting products:", error);
  //   }
  //   dispatch(setGlobalLoading(false));
  //   setReload(!reload);
  // };

  return (
    <>
      <tr>
        <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
          <div className="flex items-center">
            <label className="inline-flex">
              <span className="sr-only">Select</span>
              <input
                className="form-checkbox text-primaryMain"
                type="checkbox"
                onChange={handleCheckboxChange}
                checked={isSelected}
              />
            </label>
          </div>
        </td>
        <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
          <Image
            className="rounded-full h-10 w-10"
            src={prodImage}
            width={40}
            height={40}
            alt={product.name}
            onError={() => setProdImage(IMAGES.dummyProduct)}
          />
        </td>
        <td className="px-2 first:pl-5 last:pr-5 py-3 ">
          <div className="flex items-center">
            <div className="font-medium text-slate-800 dark:text-slate-100">
              {product.name}
            </div>
          </div>
        </td>
        <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
          {product.status === "draft" ? (
            <div className="text-center text-xs rounded-sm text-white bg-primaryMain capitalize">
              {product.status}
            </div>
          ) : (
            <div className="text-center text-xs rounded-sm text-white bg-emerald-500 capitalize">
              {product.status}
            </div>
          )}
        </td>
        <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
          {product.stock === 0 ? (
            <div className="text-left font-semibold text-red-400">
              Out of stock
            </div>
          ) : (
            <div className="text-left font-semibold text-emerald-500">
              In stock
              <span className="text-zinc-500 font-normal ms-2">
                ({product.stock})
              </span>
            </div>
          )}
        </td>
        <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
          <div className="text-left">{product.price}</div>
        </td>
        <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
          <div className="text-center">
            <b>Categories:</b>
            {product.taxonomies?.map(
              (item: any, index: any) =>
                item.term_taxonomy.taxonomy === "product_cat" && (
                  <span
                    key={index}
                    className="block text-emerald-500 font-semibold"
                  >
                    {`${decodeHtmlEntities(item.term_taxonomy.term.name)},`}
                  </span>
                ),
            )}
          </div>
          <div className="text-center">
            <b>Conditions:</b>
            {product.taxonomies?.map(
              (item: any, index: any) =>
                item.term_taxonomy.taxonomy === "pa_condition" && (
                  <span
                    key={index}
                    className="block text-emerald-500 font-semibold"
                  >
                    {`${item.term_taxonomy.term.name},`}
                  </span>
                ),
            )}
          </div>
        </td>
        <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
          <div className="text-center font-medium text-fuchsia-500">
            {product.views}
          </div>
        </td>
        <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
          <div className="text-center">{product.date}</div>
        </td>
        <td
          className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap items-center"
          valign="middle"
          // style={{ minHeight: "110px" }}
        >
          {/* Menu button */}{" "}
          {/* <TooltipMainComponent tooltipContent="Quick Edit">
            <button className="bg-primaryMain text-white p-1 hover:bg-blueTwo rounded-md shadow">
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 640 512"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M579.8 267.7c56.5-56.5 56.5-148 0-204.5c-50-50-128.8-56.5-186.3-15.4l-1.6 1.1c-14.4 10.3-17.7 30.3-7.4 44.6s30.3 17.7 44.6 7.4l1.6-1.1c32.1-22.9 76-19.3 103.8 8.6c31.5 31.5 31.5 82.5 0 114L422.3 334.8c-31.5 31.5-82.5 31.5-114 0c-27.9-27.9-31.5-71.8-8.6-103.8l1.1-1.6c10.3-14.4 6.9-34.4-7.4-44.6s-34.4-6.9-44.6 7.4l-1.1 1.6C206.5 251.2 213 330 263 380c56.5 56.5 148 56.5 204.5 0L579.8 267.7zM60.2 244.3c-56.5 56.5-56.5 148 0 204.5c50 50 128.8 56.5 186.3 15.4l1.6-1.1c14.4-10.3 17.7-30.3 7.4-44.6s-30.3-17.7-44.6-7.4l-1.6 1.1c-32.1 22.9-76 19.3-103.8-8.6C74 372 74 321 105.5 289.5L217.7 177.2c31.5-31.5 82.5-31.5 114 0c27.9 27.9 31.5 71.8 8.6 103.9l-1.1 1.6c-10.3 14.4-6.9 34.4 7.4 44.6s34.4 6.9 44.6-7.4l1.1-1.6C433.5 260.8 427 182 377 132c-56.5-56.5-148-56.5-204.5 0L60.2 244.3z"></path>
              </svg>
            </button>{" "}
          </TooltipMainComponent> */}
          <div className="flex items-center">
            <TooltipMainComponent tooltipContent="View">
              <button
                onClick={() =>
                  window.open(`/search-detail?id=${product.id}`, "_blank")
                }
                className="ms-2 bg-primaryMain text-white p-1 hover:bg-blueTwo rounded-md shadow"
              >
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 576 512"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M288 144a110.94 110.94 0 0 0-31.24 5 55.4 55.4 0 0 1 7.24 27 56 56 0 0 1-56 56 55.4 55.4 0 0 1-27-7.24A111.71 111.71 0 1 0 288 144zm284.52 97.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400c-98.65 0-189.09-55-237.93-144C98.91 167 189.34 112 288 112s189.09 55 237.93 144C477.1 345 386.66 400 288 400z"></path>
                </svg>
              </button>
            </TooltipMainComponent>
            <TooltipMainComponent tooltipContent="Duplicate">
              <button className="ms-2 bg-primaryMain text-white p-1 hover:bg-blueTwo rounded-md shadow">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 448 512"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M433.941 65.941l-51.882-51.882A48 48 0 0 0 348.118 0H176c-26.51 0-48 21.49-48 48v48H48c-26.51 0-48 21.49-48 48v320c0 26.51 21.49 48 48 48h224c26.51 0 48-21.49 48-48v-48h80c26.51 0 48-21.49 48-48V99.882a48 48 0 0 0-14.059-33.941zM266 464H54a6 6 0 0 1-6-6V150a6 6 0 0 1 6-6h74v224c0 26.51 21.49 48 48 48h96v42a6 6 0 0 1-6 6zm128-96H182a6 6 0 0 1-6-6V54a6 6 0 0 1 6-6h106v88c0 13.255 10.745 24 24 24h88v202a6 6 0 0 1-6 6zm6-256h-64V48h9.632c1.591 0 3.117.632 4.243 1.757l48.368 48.368a6 6 0 0 1 1.757 4.243V112z"></path>
                </svg>
              </button>
            </TooltipMainComponent>
            <TooltipMainComponent tooltipContent="Edit">
              <button
                className="ms-2 bg-primaryMain text-white p-1 hover:bg-blueTwo rounded-md shadow"
                onClick={() =>
                  router.push(`../seller/edit-products?id=${product.id}`)
                }
              >
                <svg
                  stroke="currentColor"
                  fill="none"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                </svg>
              </button>
            </TooltipMainComponent>
            <TooltipMainComponent tooltipContent="Delete">
              <button
                // onClick={() => deleteProducts(product.id)}
                onClick={() => setDeleteModalOpen(true)}
                className="ms-2 bg-primaryMain text-white p-1 hover:bg-blueTwo rounded-md shadow"
              >
                <svg
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
              </button>
            </TooltipMainComponent>
          </div>
        </td>
      </tr>
      <DeleteModal
        setSnackbar={setSnackbar}
        id={product.id}
        isOpen={deleteModalOpen}
        setIsOpen={setDeleteModalOpen}
      ></DeleteModal>
    </>
  );
}
