/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

// export const metadata = {
//   title: "Customers - Mosaic",
//   description: "Page description",
// };
import React, { useEffect, useState } from "react";
import { SelectedItemsProvider } from "@/app/selected-items-context";
import PaginationClassic from "@/components/pagination-classic";
// const BASEURL = "https://fizno.com/wp-content/uploads/";
import Image01 from "@/public/images/product1.png";
// import Image02 from "@/public/images/product2.jpg";
// import Image03 from "@/public/images/product3.jpg";
// import Image04 from "@/public/images/product4.png";
// import Image05 from "@/public/images/product1.png";
// import Image06 from "@/public/images/product2.jpg";
// import Image07 from "@/public/images/product3.jpg";
// import Image08 from "@/public/images/product4.png";
// import Image09 from "@/public/images/product1.png";
// import Image10 from "@/public/images/product2.jpg";
import ProductTable from "./product-table";
import { UserApi } from "@fizno/api-client/src/apis/UserApi";
import { Alert, Snackbar } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setGlobalLoading } from "@/redux/slices/product.slice";
import RoundedLoader from "@/components/common/loader/roundedLoader";
import { categoriesService } from "@fizno/api-client/src/apis/catergory";
interface Product {
  id: any;
  image: any;
  name: any;
  email: any;
  location: any;
  orders: any;
  lastOrder: any;
  stock: number;
  refunds: any;
  fav: boolean;
  price: string;
  taxonomies: { categories: string; conditions: string }[];
  views: any;
  status: string;
  date: string;
}

function ProductContent() {
  // Some dummy customers data
  const [products, setProducts] = useState<Product[]>([]);
  const { loading, reload } = useAppSelector((state) => state.products);
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(10); // You can adjust the page size as needed
  const [totalResults, setTotalResults] = useState(0);
  const [categories, setCategories] = useState<any>([]);
  const [conditions, setConditions] = useState<any>([]);
  const [productsArray, setProductsArray] = useState<any>([]);
  const dispatch = useAppDispatch();
  const [query, setQuery] = useState({
    product: "",
    category: "",
    condition: "",
    search: "",
  });
  const [snackbar, setSnackbar] = useState<{
    message: string;
    severity: "success" | "error";
    open: boolean;
  }>({ message: "", severity: "success", open: false });

  const fetchProducts = async (pageIndex: number) => {
    dispatch(setGlobalLoading(true));
    try {
      const response = await UserApi.getAllProducts(pageIndex, pageSize, query);
      if (response.remote === "success") {
        const mappedProducts = response.data.data.updateData.map(
          (product: any) => {
            // Extract the required meta values
            const postmeta = product.wp_nepaz2_postmeta.reduce(
              (acc: any, meta: any) => {
                acc[meta.meta_key] = meta.meta_value;
                return acc;
              },
              {},
            );
            return {
              id: product.ID,
              image: postmeta._ebay_product_featured_image
                ? postmeta._ebay_product_featured_image.img_url
                : product.attachment.length > 0
                  ? product.attachment[0]?.guid.includes("http")
                    ? product.attachment[0]?.guid
                    : `${process.env.NEXT_PUBLIC_API_BASE_URL}${product.attachment[0]?.guid}`
                  : Image01,
              name: product.post_title,
              email: product.post_author,
              location: product.post_name,
              orders: product.menu_order.toString(),
              lastOrder: product.post_date,
              stock: postmeta._stock ? parseInt(postmeta._stock) : 0,
              refunds: product.comment_count.toString(),
              fav: false,
              price: postmeta.sale_price
                ? `$${postmeta.sale_price}`
                : `$${postmeta._price}`,
              taxonomies: product.wp_term_relationships,
              views: postmeta.pageview ? parseInt(postmeta.pageview) : 0,
              status: product.post_status,
              date: new Date(product.post_date).toLocaleDateString(),
            };
          },
        );
        // console.log(mappedProducts)
        setProducts(mappedProducts);

        setTotalResults(response.data.data.totalResults); // Update with total results if available
      } else {
        console.error(response.message);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      dispatch(setGlobalLoading(false));
    }
    dispatch(setGlobalLoading(false));
  };

  useEffect(() => {
    // console.log(reload,"reload");
    fetchProducts(pageIndex);
  }, [pageIndex, pageSize, query, reload]);

  const fetchCatgories = async () => {
    const response = await categoriesService.getParentCategory();
    if (response.remote === "success") {
      setCategories(response.data);
    }
  };
  const fetchConditions = async () => {
    const response = await categoriesService.getAllConditions();
    if (response.remote === "success") {
      setConditions(response.data);
    }
  };
  const fetchProductsArray = async () => {
    const response = await categoriesService.getAllProductTypes();
    if (response.remote === "success") {
      setProductsArray(response.data);
    }
  };

  useEffect(() => {
    fetchCatgories();
    fetchConditions();
    fetchProductsArray();
  }, []);

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
    fetchProducts(pageIndex);
  };

  return loading ? (
    <RoundedLoader />
  ) : (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-[96rem] mx-auto">
      {/* Page header */}
      <div className="sm:flex sm:justify-between sm:items-center mb-8">
        {/* Left: Title */}
        <div className="mb-4 sm:mb-0">
          <h1 className=" flex items-center text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold">
            Products
            <svg
              className="shrink-0 h-6 w-6 ms-2"
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 512 512"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="32"
                d="M448 341.37V170.61A32 32 0 0 0 432.11 143l-152-88.46a47.94 47.94 0 0 0-48.24 0L79.89 143A32 32 0 0 0 64 170.61v170.76A32 32 0 0 0 79.89 369l152 88.46a48 48 0 0 0 48.24 0l152-88.46A32 32 0 0 0 448 341.37z"
              ></path>
              <path
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="32"
                d="m69 153.99 187 110 187-110m-187 310v-200"
              ></path>
            </svg>
          </h1>
        </div>

        {/* Right: Actions */}
        <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
          {/* Delete button */}
          <div className="">
            {/* <div className="text-red-500 border border-red-500 rounded-md py-1 px-2">
              Products Limit: Unlimited
            </div> */}
          </div>
        </div>
      </div>

      {/* Table */}
      <ProductTable
        categories={categories}
        conditions={conditions}
        productsArray={productsArray}
        products={products}
        query={query}
        setQuery={setQuery}
        setPageSize={setPageSize}
        setSnackbar={setSnackbar}
        total={totalResults}
      />

      {/* Pagination */}
      <div className="mt-8">
        <PaginationClassic
          pageIndex={pageIndex}
          pageSize={pageSize}
          totalResults={totalResults}
          setPageIndex={setPageIndex}
        />
      </div>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default function Products() {
  return (
    <SelectedItemsProvider>
      <ProductContent />
    </SelectedItemsProvider>
  );
}
