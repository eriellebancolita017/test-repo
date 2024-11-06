/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Breadcrumb from "@/components/common/breadcrumb/breadcrumb";
import React, { useEffect, useState, useRef } from "react";
import AccordionBasic from "@/components/accordion-basic";
import FilterBox from "./component/filterBox";
import PaginationMain from "@/components/common/pagination/pagination";
import Image from "next/image";
import { categoriesService } from "@fizno/api-client/src/apis/catergory";
import { useSearchParams } from "next/navigation";
import LabelFilterBox from "./component/labelFilterBox";
import SearchSingleSelect from "@/components/common/select/searchableSingleSelect";
import PriceSlider from "@/components/common/Slider/priceSlider";
import { useAppDispatch } from "@/redux/hooks";
import { UserApi } from "@fizno/api-client/src/apis/UserApi";
import { AdminApi } from "@fizno/api-client/src/apis/AdminApi";
import {
  setAllCartProduct,
  setAllFavoriteProducts,
  setCartCount,
} from "@/redux/slices/product.slice";
import { Alert, Snackbar } from "@mui/material";
import ProductCard from "@/components/common/card/productCard";
import SVG from "@/public/svg";
import SkeletonProductCard from "@/components/common/card/skeletonProductCard";
import { decodeHtmlEntities } from "@/utils/commonFunction";
import { SlidersHorizontal } from "lucide-react";

export default function PrivacyPolicy() {
  const breadcrumbItems = [
    { text: "Home", href: "/" },
    { text: "Search result", href: "/search-result" },
  ];

  /**
   * redux
   */
  const dispatch = useAppDispatch();

  /**
   * state management
   */
  const [selectedView, setSelectedView] = useState<string | null>("gridView");
  const [categoriesArray, setAllCategories] = useState<FilterItem[]>([]);
  const [conditionArray, setAllConditions] = useState<FilterItem[]>([]);
  const [brandsArray, setAllBrands] = useState<FilterItem[]>([]);
  const [subCategoriesArray, setSubCategoriesArray] = useState<FilterItem[]>(
    [],
  );
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(75);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(1000);
  const [sortingOption, setSortingOption] = useState({
    value: "ASC",
    label: "Sort by price low to high",
  });
  const [selectedCategory, setSelectedCategory] = useState<any>();
  const [selectedConditions, setSelectedConditions] = useState<any>([]);
  const [selectedBrands, setSelectedBrands] = useState<any>([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState<any>([]);
  const [subCategoryId, setSubCategoryId] = useState("");
  const [allProducts, setAllProducts] = useState<any>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [, setLoading] = useState(false);
  const query = useSearchParams();
  const catId = query.get("category");
  const subCatId = query.get("subcategory");
  const word = query.get("keyword");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 16; // Define how many items you want per page
  const [isDataComplete, setDataComplete] = useState(false);
  const [snackbar, setSnackbar] = useState<{
    message: string;
    severity: "success" | "error";
    open: boolean;
  }>({ message: "", severity: "success", open: false });

  /**
   * get add to fav list
   */

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const FilterDrawer = () => {
    const drawerRef = useRef<HTMLDivElement>(null);

    const handleClickOutside = (event: MouseEvent) => {
      if (
        drawerRef.current &&
        !drawerRef.current.contains(event.target as Node)
      ) {
        setIsDrawerOpen(false);
      }
    };

    useEffect(() => {
      if (isDrawerOpen) {
        document.addEventListener("mousedown", handleClickOutside);
      } else {
        document.removeEventListener("mousedown", handleClickOutside);
      }
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [isDrawerOpen]);

    return (
      <div className="block md:hidden">
        <div>
          <button
            onClick={toggleDrawer}
            className="border rounded-full px-5 py-1 text-sm bg-primaryMain"
          >
            <SlidersHorizontal color="#F0F8FF" />
          </button>

          {isDrawerOpen && (
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 z-50">
              <div
                ref={drawerRef}
                className="fixed inset-y-0 left-0 w-80 bg-white p-4 z-50 overflow-y-auto"
              >
                <button
                  onClick={toggleDrawer}
                  className="border rounded-full px-5 py-1 text-sm mb-4"
                >
                  Close
                </button>
                <div className="mt-2 rounded-lg filter_left_section border">
                  <AccordionBasic title="Filter By Type" defaultOpen={true}>
                    <div className="mt-2">
                      <FilterBox
                        filters={conditionArray}
                        onChange={onConditionSelect}
                        checkbox={true}
                        value={selectedConditions}
                      />
                    </div>
                  </AccordionBasic>
                  <AccordionBasic title="Price" defaultOpen={true}>
                    <div className="mt-2">
                      <PriceSlider
                        minValue={minValue}
                        maxValue={maxValue}
                        min={min}
                        max={max}
                        resetPrice={resetPrice}
                        setMaxValue={setMaxValue}
                        setMinValue={setMinValue}
                      />
                    </div>
                  </AccordionBasic>
                  <AccordionBasic title="Main Categories" defaultOpen={true}>
                    <div className="mt-2">
                      <LabelFilterBox
                        filters={categoriesArray.filter(
                          (item: any) => item.count > 0,
                        )}
                        onChange={onCategorySelect}
                        checkbox={false}
                        value={selectedCategory}
                      />
                    </div>
                  </AccordionBasic>

                  {subCategoriesArray.length > 0 && (
                    <AccordionBasic
                      title={`${decodeHtmlEntities(
                        selectedCategory?.label,
                      )}(${selectedCategory?.count})`}
                      defaultOpen={true}
                    >
                      <div className="mt-2">
                        <FilterBox
                          filters={subCategoriesArray}
                          onChange={onSubcategorySelect}
                          checkbox={true}
                          value={selectedSubCategory}
                        />
                      </div>
                    </AccordionBasic>
                  )}
                  <AccordionBasic title="Brands" defaultOpen={true}>
                    <div className="mt-2">
                      <FilterBox
                        filters={brandsArray}
                        onChange={onBrandSelect}
                        value={selectedBrands}
                        checkbox={true}
                      />
                    </div>
                  </AccordionBasic>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const getFavList = async () => {
    const response = await UserApi.allFavoriteAPI();
    if (response.remote === "success") {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const data = response.data.data.map((item: any) => ({
        id: item.porduct.ID,
        image:
          "https://www.pareedhaan.in/product-images/Dummy1.jpg/386590000002593099/800x800",
        likes: "1k",
        comments: "19",
        shares: "44k",
        title: item.porduct.post_title,
        condition: "New",
        price: "$99.99",
        shipping: "Free Shipping",
        sellerImage: "/images/avatar99.png",
        sellerName: "John Doe",
        location: "New York, USA",
        rating: "4.5",
      }));
      dispatch(setAllFavoriteProducts(data));
    }
  };

  /**
   * get all cart product list
   */

  const getAllCartProdList = async () => {
    const response = await UserApi.getAllCartProdAPI();
    if (response.remote === "success") {
      dispatch(setAllCartProduct(response.data.data));
      dispatch(setCartCount(response?.data?.data?.length || 0));
    }
  };

  useEffect(() => {
    getAllCartProdList();
    getFavList();
  }, []);

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const handleClick = (selectedView: string) => {
    setSelectedView(selectedView);
  };

  interface FilterItem {
    label: string;
    value: number;
    count: string;
  }

  const fetchCatgories = async () => {
    const response = await categoriesService.getParentCategory();
    if (response.remote === "success") {
      setAllCategories(response.data);
      if (catId) {
        const category = response.data.find((item: any) => item.value == catId);
        setSelectedCategory(category);
      }
    }
  };
  const fetchConditions = async () => {
    const response = await categoriesService.getAllConditions();
    if (response.remote === "success") {
      setAllConditions(response.data);
    }
  };
  const fetchBrands = async () => {
    const response = await categoriesService.getAllBrands();
    if (response.remote === "success") {
      setAllBrands(response.data);
    }
  };
  const getHighestPriceValue = async () => {
    try {
      const resposne = await AdminApi.getHighestPriceValue();
      if (resposne.remote === "success") {
        setMax(parseInt(resposne.data.data.meta_value));
        setMaxValue(parseInt(resposne.data.data.meta_value));
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getLowesttPriceValue = async () => {
    try {
      const resposne = await AdminApi.getLowestPriceValue();
      if (resposne.remote === "success") {
        setMin(parseInt(resposne.data.data.meta_value));
        setMinValue(parseInt(resposne.data.data.meta_value));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCatgories();
    fetchConditions();
    fetchBrands();
    getHighestPriceValue();
    getLowesttPriceValue();
    // fetchProductTypes();
  }, []);

  useEffect(() => {
    fetchCatgories();
    getCategoryFromQeryparams();
  }, [catId]);

  const getSearchProducts = async () => {
    setLoading(true);
    const data = {
      keyword: word || "",
      condition: selectedConditions,
      brand: selectedBrands,
      category: selectedSubCategory,
      pageIndex: currentPage,
      pageSize: 16,
      minPrice: minValue,
      maxPrice: maxValue,
      sort: sortingOption.value,
    };
    const response = await categoriesService.searchProducts(data);
    const mappedData = response?.data?.data?.updateData?.map((product: any) => {
      const postmeta = product.wp_nepaz2_postmeta.reduce(
        (acc: any, meta: any) => {
          acc[meta.meta_key] = meta.meta_value;
          return acc;
        },
        {},
      );
      const condition = product.wp_term_relationships.find(
        (item: any) => item.term_taxonomy.taxonomy === "pa_condition",
      )?.term_taxonomy.term.name;
      return {
        id: product.ID,
        image: postmeta._ebay_product_featured_image
          ? postmeta._ebay_product_featured_image.img_url
          : product.attachment.length > 0
            ? product.attachment[0]?.guid.includes("http")
              ? product.attachment[0]?.guid
              : `${process.env.NEXT_PUBLIC_API_BASE_URL}${product.attachment[0]?.guid}`
            : "",
        likes: "0",
        comments: "0",
        shares: "0",
        title: product.post_title,
        condition: condition,
        salePrice: postmeta.sale_price
          ? `$${Number(postmeta.sale_price) === 0 ? Number(postmeta._price).toFixed(2) : Number(postmeta.sale_price).toFixed(2)}`
          : `$${Number(postmeta._price).toFixed(2) || 0}`,
        price: postmeta.sale_price
          ? `$${Number(postmeta._price).toFixed(2) || 0}`
          : "$0",
        shipping: "Free Shipping",
        sellerImage: product?.wp_nepaz2_users.avatar?.guid,
        sellerName: product?.wp_nepaz2_users?.display_name,
        location: `${product?.wp_nepaz2_users?.store?.address?.city}, ${product?.wp_nepaz2_users?.store?.address?.country}`,
        rating: product?.wp_nepaz2_users?.avgRate,
      };
    });
    setTotalCount(response?.data?.data?.totalResults);
    setAllProducts(mappedData);
    setLoading(false);
  };

  useEffect(() => {
    if (isDataComplete) {
      getSearchProducts();
    }
  }, [
    selectedConditions.length,
    selectedBrands.length,
    selectedSubCategory.length,
    minValue,
    maxValue,
    currentPage,
    word,
    subCategoryId,
    isDataComplete,
    sortingOption,
  ]);

  const onConditionSelect = (data: any) => {
    if (selectedConditions.some((item: any) => item == data.value)) {
      const filter = selectedConditions.filter(
        (item: any) => item !== data.value,
      );
      setSelectedConditions(filter);
    } else {
      setSelectedConditions([...selectedConditions, data.value]);
    }
  };
  const onCategorySelect = async (data: any) => {
    setSelectedCategory(data);
    const response = await categoriesService.getCategoryByParentId(data.value);
    if (response.remote === "success") {
      setSubCategoriesArray(response.data);
    }
  };
  const onBrandSelect = (data: any) => {
    // console.log({ data });

    if (selectedBrands.some((item: any) => item == data.value)) {
      const filter = selectedBrands.filter((item: any) => item !== data.value);
      setSelectedBrands(filter);
    } else {
      setSelectedBrands([...selectedBrands, data.value]);
    }
  };

  const onSubcategorySelect = (data: any) => {
    if (selectedSubCategory.some((item: any) => item == data.value)) {
      const filter = selectedSubCategory.filter(
        (item: any) => item !== data.value,
      );
      setSelectedSubCategory(filter);
    } else {
      setSelectedSubCategory([...selectedSubCategory, data.value]);
    }
  };

  const getCategoryFromQeryparams = async () => {
    if (catId) {
      const response = await categoriesService.getCategoryByParentId(catId);
      if (response.remote === "success") {
        // console.log(response)
        setSubCategoriesArray(response.data);
        if (subCatId) {
          setSelectedSubCategory([subCatId]);
          setSubCategoryId(subCatId);
        } else {
          const subCat = response.data.map((cat: any) => {
            return cat.value;
          });
          setSelectedSubCategory(subCat);
        }
        // getSearchProducts();
      }
    }
    setDataComplete(true);
  };

  const sortingArray = [
    {
      value: "ASC",
      label: "Sort by price low to high",
    },
    {
      value: "DESC",
      label: "Sort by price high to low",
    },
  ];
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const getSubCategoryItemFormValue = (value: number) => {
    const filter = subCategoriesArray.find((item: any) => item.value == value);
    return filter;
  };
  const getConditionItemFormValue = (value: number) => {
    const filter = conditionArray.find((item: any) => item.value == value);
    return filter;
  };

  const getBrandItemFormValue = (value: number) => {
    const filter = brandsArray.find((item: any) => item.value == value);
    return filter;
  };

  const removeSubCategory = (value: number) => {
    const filter = selectedSubCategory.filter((item: any) => item !== value);
    setSelectedSubCategory(filter);
  };

  const removeCondition = (value: number) => {
    const filter = selectedConditions.filter((item: any) => item !== value);
    setSelectedConditions(filter);
  };

  const removeBrands = (value: number) => {
    const filter = selectedBrands.filter((item: any) => item !== value);
    setSelectedBrands(filter);
  };

  const clearAll = () => {
    setSelectedBrands([]);
    setSelectedConditions([]);
    setSelectedSubCategory([]);
    setMinValue(min);
    setMaxValue(max);
  };

  const resetPrice = () => {
    setMinValue(min);
    setMaxValue(max);
  };

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top on page load
  }, []);
  return (
    <>
      <div className="search_result_page_main min-h-screen pb-16">
        <div className="container">
          <div className="w-auto md:w-1/5 min-w-[250px] mx-2">
            <div className="my-4">
              <Breadcrumb
                items={breadcrumbItems}
                className="rounded-lg px-2 py-1"
              />
            </div>
          </div>
          {selectedView === "listView" ? (
            <div className="my-6">
              <Image
                alt=""
                src="/images/mainpages/search-banner.png"
                width={100}
                height={250}
                className="w-full h-64"
                unoptimized
              />
            </div>
          ) : (
            ""
          )}
          <div className="flex flex-wrap md:flex-nowrap justify-between gap-5">
            {/*left side panel*/}
            <div className="w-full md:w-1/5 min-w-[260px]">
              <div className="flex justify-start mb-4 ms-2">
                <h5 className="font-medium text-xl texxt-black capitalize hidden">
                  Filters
                </h5>
                <button
                  onClick={clearAll}
                  className="border rounded-full px-5 py-1 text-sm "
                >
                  Clear All
                </button>
                <div className="ms-2">
                  <FilterDrawer />
                </div>
              </div>
              {/*filter component start*/}
              <div className="mt-2 rounded-lg filter_left_section border hidden md:block ">
                <AccordionBasic title="Filter By Type" defaultOpen={true}>
                  <div className="mt-2">
                    <FilterBox
                      filters={conditionArray}
                      onChange={onConditionSelect}
                      checkbox={true}
                      value={selectedConditions}
                    />
                  </div>
                </AccordionBasic>
                <AccordionBasic title="Price" defaultOpen={true}>
                  <div className="mt-2">
                    {" "}
                    <PriceSlider
                      minValue={minValue}
                      maxValue={maxValue}
                      min={min}
                      max={max}
                      resetPrice={resetPrice}
                      setMaxValue={setMaxValue}
                      setMinValue={setMinValue}
                    />
                  </div>
                </AccordionBasic>
                <AccordionBasic title="Main Categories" defaultOpen={true}>
                  <div className="mt-2">
                    <LabelFilterBox
                      filters={categoriesArray.filter(
                        (item: any) => item.count > 0,
                      )}
                      onChange={onCategorySelect}
                      checkbox={false}
                      value={selectedCategory}
                    />
                  </div>
                </AccordionBasic>

                {subCategoriesArray.length > 0 && (
                  <AccordionBasic
                    title={`${decodeHtmlEntities(selectedCategory?.label)}(${selectedCategory?.count})`}
                    defaultOpen={true}
                  >
                    <div className="mt-2">
                      <FilterBox
                        filters={subCategoriesArray}
                        onChange={onSubcategorySelect}
                        checkbox={true}
                        value={selectedSubCategory}
                      />
                    </div>
                  </AccordionBasic>
                )}
                <AccordionBasic title="Brands" defaultOpen={true}>
                  <div className="mt-2">
                    <FilterBox
                      filters={brandsArray}
                      onChange={onBrandSelect}
                      value={selectedBrands}
                      checkbox={true}
                    />
                  </div>
                </AccordionBasic>
              </div>

              {/*  filter component end*/}
            </div>
            <div className="w-full  md:w-4/5 mt-0 md:mt-4 lg:-mt-14">
              <div className="search_result_right_section mb-8 min-h-screen relative">
                {/*top portion of the right section*/}
                <div className="flex flex-wrap md:flex-nowrap justify-between mb-11 items-center mx-2">
                  <h5 className="normal-base font-medium capitalize ">
                    {totalCount} Products found for ({word})
                  </h5>
                  <div className="flex gap-4">
                    <div className="sorting_filter">
                      <SearchSingleSelect
                        label=""
                        options={sortingArray}
                        onChange={(value) => setSortingOption(value)}
                        value={sortingOption}
                        placeholder="sort by price low to high"
                      />
                      {/* <option className="text-[#1D364D] text-sm font-medium">
                          Sort by price low to high
                        </option>
                      </SearchSingleSelect> */}
                    </div>
                    <div
                      className={`cursor-pointer p-2 bg-blue-200 rounded-md ${selectedView === "gridView" ? "text-primaryMain bg-primaryMain" : "bg-blue-200"}`}
                      onClick={() => handleClick("gridView")}
                    >
                      <svg
                        className={
                          selectedView === "gridView"
                            ? " text-white"
                            : "text-primaryMain"
                        }
                        width="25"
                        height="25"
                        viewBox="0 0 25 25"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M22.5 9.02V4.48C22.5 3.07 21.86 2.5 20.27 2.5H16.23C14.64 2.5 14 3.07 14 4.48V9.01C14 10.43 14.64 10.99 16.23 10.99H20.27C21.86 11 22.5 10.43 22.5 9.02Z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M22.5 20.27V16.23C22.5 14.64 21.86 14 20.27 14H16.23C14.64 14 14 14.64 14 16.23V20.27C14 21.86 14.64 22.5 16.23 22.5H20.27C21.86 22.5 22.5 21.86 22.5 20.27Z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M11 9.02V4.48C11 3.07 10.36 2.5 8.77 2.5H4.73C3.14 2.5 2.5 3.07 2.5 4.48V9.01C2.5 10.43 3.14 10.99 4.73 10.99H8.77C10.36 11 11 10.43 11 9.02Z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M11 20.27V16.23C11 14.64 10.36 14 8.77 14H4.73C3.14 14 2.5 14.64 2.5 16.23V20.27C2.5 21.86 3.14 22.5 4.73 22.5H8.77C10.36 22.5 11 21.86 11 20.27Z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>

                  <div className="selected_filters absolute top-12 gap-2 flex w-full hidden sm:flex">
                    {!(minValue == min && maxValue == max) && (
                      <div className="bg-primaryMain text-white rounded-2xl text-xs normal-case py-[1px] px-2 flex items-center">
                        <span className="">{`$${minValue}-${maxValue}`}</span>
                      </div>
                    )}
                    {selectedConditions.map((item: any) => {
                      return (
                        <div
                          key={item}
                          className="bg-primaryMain text-white rounded-2xl text-xs normal-case py-[1px] px-2 flex items-center"
                        >
                          <span
                            dangerouslySetInnerHTML={{
                              __html:
                                getConditionItemFormValue(item)?.label || "",
                            }}
                          />
                          <span
                            onClick={() => removeCondition(item)}
                            className="ml-2 cursor-pointer "
                          >
                            x
                          </span>
                        </div>
                      );
                    })}

                    {selectedBrands.map((item: any) => {
                      return (
                        <div
                          key={item}
                          className="bg-primaryMain text-white rounded-2xl text-xs normal-case py-[1px] px-2 flex items-center"
                        >
                          <span
                            dangerouslySetInnerHTML={{
                              __html: getBrandItemFormValue(item)?.label || "",
                            }}
                          />
                          <span
                            onClick={() => removeBrands(item)}
                            className="ml-2 cursor-pointer "
                          >
                            x
                          </span>
                        </div>
                      );
                    })}
                    {selectedSubCategory.length < 3 ? (
                      selectedSubCategory.map((item: any) => {
                        return (
                          <div
                            key={item}
                            className="bg-primaryMain text-white rounded-2xl text-xs normal-case py-[1px] px-2 flex items-center"
                          >
                            <span
                              dangerouslySetInnerHTML={{
                                __html:
                                  getSubCategoryItemFormValue(item)?.label ||
                                  "",
                              }}
                            />
                            <span
                              onClick={() => removeSubCategory(item)}
                              className="ml-2 cursor-pointer "
                            >
                              x
                            </span>
                          </div>
                        );
                      })
                    ) : (
                      <>
                        {selectedSubCategory.slice(0, 3).map((item: any) => {
                          return (
                            <div
                              key={item}
                              className="bg-primaryMain text-white rounded-2xl text-xs normal-case py-[1px] px-2 flex items-center"
                            >
                              <span
                                dangerouslySetInnerHTML={{
                                  __html:
                                    getSubCategoryItemFormValue(item)?.label ||
                                    "",
                                }}
                              />
                              <span
                                onClick={() => removeSubCategory(item)}
                                className="ml-2 cursor-pointer "
                              >
                                x
                              </span>
                            </div>
                          );
                        })}
                        <div className="bg-primaryMain text-white rounded-2xl text-xs normal-case py-[1px] px-2 flex items-center">
                          <span className="">
                            {" "}
                            {selectedSubCategory.length - 3} more
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <div className="mt-4">
                  {selectedView === "gridView" ? (
                    <>
                      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4 mx-2 md:mx-4">
                        {allProducts?.map((product: any) => (
                          <ProductCard
                            key={product.id}
                            type="gridView"
                            product={product}
                            handleRefreshCartList={() => getAllCartProdList()}
                            handleRefreshFavList={() => getFavList()}
                          />
                        ))}
                      </div>
                      {/* )} */}
                      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4 mx-2 md:mx-4">
                        {allProducts?.length === 0 && (
                          <>
                            {[...Array(16)].map((index) => (
                              <div className="" key={index}>
                                <SkeletonProductCard type="w-full" />
                              </div>
                            ))}
                          </>
                        )}
                      </div>
                    </>
                  ) : (
                    <>
                      {/* {loading ? (
                        <div className="">
                          <RoundedLoader />
                        </div>
                      ) : ( */}
                      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-5">
                        {allProducts?.map((product: any) => (
                          <ProductCard
                            key={product.id}
                            type="gridView"
                            product={product}
                            handleRefreshCartList={() => getAllCartProdList()}
                            handleRefreshFavList={() => getFavList()}
                          />
                        ))}
                      </div>
                      {/* )} */}
                      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-5">
                        {allProducts?.length === 0 && (
                          <>
                            {[...Array(16)].map((index) => (
                              <div className="" key={index}>
                                <SkeletonProductCard type="w-full" />
                              </div>
                            ))}
                          </>
                        )}
                      </div>
                    </>
                  )}
                  {!allProducts && (
                    <div className="flex items-center justify-center w-full">
                      <SVG.NoDataIcon />
                    </div>
                  )}
                </div>
              </div>
              {allProducts ? (
                <div className="my-2">
                  <PaginationMain
                    totalItems={totalCount}
                    itemsPerPage={itemsPerPage}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                  />
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
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
    </>
  );
}
