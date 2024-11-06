"use client";
import React, { useEffect } from "react";
import InputComponent from "@/components/common/inputField/page";
import MultiselectDropdown from "@/components/common/multiselect/page";
import SelectComponent from "@/components/common/select/page";
import TextEditor from "@/components/common/textEditor/page";
import Shipping from "./shipping";
import Tax from "./tax";
import SEO from "./seo";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Offers from "./offers";
import { categoriesService } from "@fizno/api-client/src/apis/catergory";
import { useFormik, FormikHelpers } from "formik";
import * as Yup from "yup";
import { Alert, Snackbar } from "@mui/material";
import { UserApi } from "@fizno/api-client/src/apis/UserApi";
import RoundedLoader from "@/components/common/loader/roundedLoader";
import { useAppSelector } from "@/redux/hooks";
import SVG from "@/public/svg";
import Cropper from "@/components/common/cropper";
import Variant from "./variant";
import ThreeLayerDropdown, {
  Category,
} from "@/components/dropdown/threeLayerCategory";
import ErrorText from "@/components/common/errorText";
import { decodeHtmlEntities } from "@/utils/commonFunction";

interface ProductValues {
  productType: number;
  productName: string;
  price: string;
  salePrice: string;
  costPerItem: string;
  description: string;
  // category: any[];
  condition: string;
  stocks: string;
  attributes: any;
  tags: [];
}

export default function AddProduct() {
  /**
   * router
   */

  const router = useRouter();
  const handleBack = () => {
    router.back();
  };

  const productTypeOptions = [
    { value: 2, label: "Simple Listing" },
    { value: 4, label: "Variable Listing" },
  ];

  /**
   * state management
   */
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const [showAddMediaInput, setShowAddMediaInput] = useState(false);
  // const [tackOrder, setTrackOrder] = useState(false);
  const [categoriesArray, setAllCategories] = useState([]);

  const [conditionArray, setAllConditions] = useState([]);
  // const [productArray, setAllProductTypes] = useState([]);
  const [productTags, setAllProductTags] = useState([]);
  // const [allAttributes, setAllAttributes] = useState([]);
  const [taxStatus, setTaxStatus] = useState("");
  const [taxClass, setTaxClass] = useState("");
  const [metaKeyword, setMetaKeyword] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [minimumOffer, setMinimumOffer] = useState("");
  const [offer, setOffer] = useState("not-now");
  const [length, setLength] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [processTime, setProccessTime] = useState("");
  const [width, setWidth] = useState("");
  const [flatRate, setFlatRate] = useState("");
  const [reload, setReload] = useState(true);
  const [loading, setLoading] = useState(false);
  const { hardReload } = useAppSelector(
    (state: { products: any }) => state.products,
  );
  const [videoUrl, setVideoUrl] = useState("");
  const [snackbar, setSnackbar] = useState<{
    message: string;
    severity: "success" | "error";
    open: boolean;
  }>({ message: "", severity: "success", open: false });

  // const [showSchedule, setShowSchedule] = useState(false);
  const [fileUploadComponents, setFileUploadComponents] = useState<any>([
    { isUploaded: false },
  ]);

  /**
   * handle file upload
   */

  const handleAddFileUpload = () => {
    // Add a new instance of FileUploadComponent to the array
    setFileUploadComponents([...fileUploadComponents, { isUploaded: false }]);
  };

  /**
   * handle image change
   */

  const handleImageChange = (
    selectedImage: File | undefined,
    index: number,
  ) => {
    if (selectedImage) {
      const uploadedData = fileUploadComponents;
      uploadedData[index].item = selectedImage;
      uploadedData[index].isUploaded = true;
      setFileUploadComponents(uploadedData);
      setReload(!reload);
      // setImage(selectedImage);
      // setPreview(URL.createObjectURL(selectedImage));
    }
  };

  // const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setTrackOrder(e.target.checked);
  // };

  /**
   * handle fetch product tags
   */

  const fetchProductTags = async () => {
    const response = await categoriesService.getAllProductTags();
    if (response.remote === "success") {
      setAllProductTags(response.data);
    }
  };

  /**
   * handle fetch product types
   */

  const fetchProductTypes = async () => {
    const response = await categoriesService.getAllProductTypes();
    if (response.remote === "success") {
      console.log("prodcut type --- ", response.data);
    }
  };

  const groupData = (data: any) => {
    const map = new Map();
    data?.forEach((item: any) => {
      map.set(item.term_taxonomy_id, { ...item, children: [] });
    });

    // Step 2: Iterate through the array and assign children
    data.forEach((item: any) => {
      if (item.parent !== 0) {
        const parent = map.get(item.parent);
        if (parent) {
          parent.children.push(map.get(item.term_taxonomy_id));
        }
      }
    });

    // Step 3: Filter the array to include only top-level elements
    const result = data
      .filter((item: any) => item.parent === 0)
      .map((item: any) => map.get(item.term_taxonomy_id));

    const formatedData = result.map((el: any) => ({
      id: el?.term_taxonomy_id,
      name: decodeHtmlEntities(el?.term?.name),
      parent: 0,
      subcategories: el?.children?.map((subItem: any) => ({
        parent: el?.term_taxonomy_id,
        id: subItem?.term?.term_id,
        name: decodeHtmlEntities(subItem?.term?.name),
        subcategories: [],
      })),
    }));

    setAllCategories(formatedData);
  };

  /**
   * handle fetch categories
   */

  const fetchCatgories = async () => {
    const data = {
      pageSize: 1000000,
      pageIndex: 1,
      query: "",
      search: "",
    };
    const response = await categoriesService.getCategories(data);
    groupData(response?.data?.data?.updatedData);
  };

  /**
   * handle fetch conditions
   */

  const fetchConditions = async () => {
    const response = await categoriesService.getAllConditions();
    if (response.remote === "success") {
      setAllConditions(response.data);
    }
  };

  /**
   * formik
   */

  const formik = useFormik<ProductValues>({
    initialValues: {
      productType: 2,
      productName: "",
      price: "",
      salePrice: "",
      costPerItem: "",
      description: "",
      // category: [],
      condition: "",
      stocks: "",
      attributes: {},
      tags: [],
    },
    validationSchema: Yup.object({
      productType: Yup.number().required("Required"),
      productName: Yup.string().required("Required"),
      price: Yup.string().required("Required"),

      description: Yup.string().required("Required"),
      condition: Yup.string().required("Required"),
    }),
    onSubmit: async (
      values: ProductValues,
      { setSubmitting }: FormikHelpers<ProductValues>,
    ) => {
      setLoading(true);
      const shipping = {
        length,
        weight,
        width,
        height,
        processTime,
        flatRate,
      };
      const formattedCats = selectedCategories.flatMap((el) => [
        { value: el.id, label: el.name, parent: el.parent },
        ...(el?.subcategories?.map((item) => ({
          value: item.id,
          label: item.name,
          parent: item.parent,
        })) ?? []),
      ]);

      const response: any = await UserApi.addNewProducts({
        ...values,
        taxStatus,
        taxClass,
        metaDescription,
        metaKeyword,
        minimumOffer,
        offer,
        shipping,
        category: formattedCats,
      });
      if (response.remote === "success") {
        uploadImages(response.data.data.ID);
        // router.push("/products");
      } else {
        setSnackbar({
          message: response.data.errors.message || "An error occurred!",
          severity: "error",
          open: true,
        });
      }
      setSubmitting(false);
    },
  });

  const uploadImages = async (id: number) => {
    try {
      const formData = new FormData();
      for (let i = 0; i < fileUploadComponents.length; i++) {
        const element = fileUploadComponents[i];
        formData.append("image", element.item);
      }
      formData.append("id", `${id}`);
      const response: any = await UserApi.uploadProductAttachment(formData);
      if (response.remote === "success") {
        setSnackbar({
          message: "Add new product successfully",
          severity: "success",
          open: true,
        });
        // uploadImages(response.data.data.ID)
        router.push("/seller/products");
      } else {
        setSnackbar({
          message: response.error.errors.message || "An error occurred!",
          severity: "error",
          open: true,
        });
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const brandsArray = [
    { value: "brandOne", label: "BrandOne" },
    { value: "brandTwo", label: "BrandTwo" },
    { value: "brandThree", label: "BrandThree" },
    { value: "brandFour", label: "BrandFour" },
  ];

  const handleTagSelect = (
    selectedList: { label: string; value: string }[],
  ) => {
    formik.setFieldValue("tags", selectedList);
  };

  const handleTagRemove = (
    selectedList: { label: string; value: string }[],
  ) => {
    formik.setFieldValue("tags", selectedList);
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const setMediaInDescription = () => {
    const value = formik.getFieldProps("description").value;
    const media = `[embed]${videoUrl}[/embed]`;
    formik.setFieldValue("description", `${value} ${media}`);
    setShowAddMediaInput(false);
    setVideoUrl("");
  };

  useEffect(() => {
    fetchConditions();
    fetchCatgories();
    fetchProductTypes();
    // fetchAllAttributes();
    fetchProductTags();
  }, [hardReload]);

  return loading ? (
    <RoundedLoader />
  ) : (
    <>
      {" "}
      <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-[96rem] mx-auto">
        <div className="sm:flex sm:justify-between sm:items-center mb-8">
          {/* Left: Title */}
          <div className="mb-4 sm:mb-0">
            <h1 className=" flex items-center text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold">
              Add Products
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
          <button
            className="btn bg-primaryMain hover:bg-blueTwo text-white"
            onClick={() => handleBack()}
          >
            <span className="flex items-center">
              <svg
                className="mr-1"
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 24 24"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M21 11H6.414l5.293-5.293-1.414-1.414L2.586 12l7.707 7.707 1.414-1.414L6.414 13H21z"></path>
              </svg>
              Back
            </span>
          </button>
        </div>

        <div>
          <div className="px-4 sm:px-6 lg:px-8 py-8 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 relative">
            <div className="flex gap-5">
              <div className="w-7/12">
                <div className="">
                  <label className="block text-zinc-600 text-sm font-bold mb-1 undefined">
                    Product Type
                  </label>
                  <div className="mb-6 flex w-full gap-4">
                    {productTypeOptions.map((option) => {
                      const isSelected =
                        Number(formik.values.productType) ===
                        Number(option.value);
                      return (
                        <div
                          key={option.value}
                          className={`cursor-pointer border rounded-full px-3 py-1 normal-case font-medium text-sm ${
                            isSelected
                              ? "border-primaryMain text-primaryMain bg-blue-100"
                              : "border-gray-500 text-gray-500 bg-gray-100"
                          }`}
                          onClick={() => {
                            formik.setFieldValue("productType", option.value);
                          }}
                        >
                          <input
                            type="radio"
                            className="mr-2"
                            checked={isSelected}
                            readOnly
                          />
                          {option.label}
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-4">
                  <InputComponent
                    className="w-[80%]"
                    label="Product Title"
                    {...formik.getFieldProps("productName")}
                  />
                  {formik.touched.productName && formik.errors.productName ? (
                    <div className="text-red-600">
                      {formik.errors.productName}
                    </div>
                  ) : null}
                </div>

                <div className="mt-4">
                  <SelectComponent
                    label="Condition"
                    options={conditionArray}
                    onSelect={(value) =>
                      formik.setFieldValue("condition", value[0].value)
                    }
                  />
                  {formik.touched.condition && formik.errors.condition ? (
                    <div className="text-red-600">
                      {formik.errors.condition}
                    </div>
                  ) : null}
                </div>

                <div className="mt-4">
                  <SelectComponent label="Brands" options={brandsArray} />
                </div>

                <div className="mt-4 product_page_description">
                  <label
                    className={`block text-zinc-600 text-sm font-bold mb-1`}
                    htmlFor="date"
                  >
                    Description
                  </label>
                  <div className="mb-4">
                    <div
                      style={{ width: "fit-content" }}
                      className="py-2 px-4 items-center flex bg-[#f6f7f7] text-primaryMain border border-primaryMain rounded-md"
                      onClick={() => setShowAddMediaInput(true)}
                    >
                      <span className="mr-1">
                        {" "}
                        <SVG.mediaIcon />
                      </span>{" "}
                      Add Media
                    </div>
                  </div>
                  {showAddMediaInput ? (
                    <div className="flex gap-4 mb-4 items-end">
                      <div className="w-10/12">
                        <InputComponent
                          onChange={(e: any) => setVideoUrl(e.target.value)}
                          label=""
                          placeholder="Enter video URL "
                        />
                      </div>
                      <div className="w-2/12">
                        <div
                          className=" bg-primaryMain w-full py-2 rounded-md text-white text-center"
                          onClick={() => setMediaInDescription()}
                        >
                          Add
                        </div>
                      </div>
                    </div>
                  ) : null}
                  <TextEditor
                    value={formik.getFieldProps("description").value}
                    onChange={(e: any) =>
                      formik.setFieldValue("description", e)
                    }
                    className="w-[80%] "
                    label=""
                  />
                  {formik.touched.description && formik.errors.description ? (
                    <div className="text-red-600">
                      {formik.errors.description}
                    </div>
                  ) : null}
                </div>

                <div className="mt-4 categories_dropdown">
                  <ThreeLayerDropdown
                    label="Categories"
                    categories={categoriesArray}
                    selectedCategories={selectedCategories}
                    setSelectedCategories={(vl: any) =>
                      setSelectedCategories(vl)
                    }
                  />
                  {/* {formik.getFieldProps("category").value.length === 0 ? (
                    <div className="text-red-600">
                      {formik.errors.condition}
                    </div>
                  ) : null} */}
                </div>

                <div className="mt-4 mb-4 categories_dropdown">
                  <MultiselectDropdown
                    label="Tags"
                    handleSelect={handleTagSelect}
                    handleRemove={handleTagRemove}
                    selectedValues={formik.getFieldProps("tags").value}
                    options={productTags}
                  />
                </div>
              </div>
              <div className="w-5/12 ">
                <div className="mb-4 flex-wrap  flex items-end">
                  {fileUploadComponents.map((component: any, index: number) => (
                    <div
                      key={index}
                      className={`mt-4 mr-2   ${
                        fileUploadComponents.length > 1
                          ? "small_upload_div"
                          : ""
                      }`}
                    >
                      {
                        <Cropper
                          onChange={(e) => handleImageChange(e, index)}
                          value={fileUploadComponents[index]?.item}
                          isActive
                          key={index}
                        />
                      }
                    </div>
                  ))}
                  <div className="text-end">
                    <svg
                      className="cursor-pointer"
                      onClick={handleAddFileUpload}
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth="0"
                      viewBox="0 0 1024 1024"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M696 480H544V328c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v152H328c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h152v152c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V544h152c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8z"></path>
                      <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="my-6 px-4 sm:px-6 lg:px-8 py-8 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 relative">
            <h5 className="font-bold">Pricing</h5>
            <div className="flex gap-5 mt-4">
              <div className="w-6/12">
                <div className="">
                  <InputComponent
                    className="w-[80%]"
                    label="Price($)"
                    {...formik.getFieldProps("price")}
                  />
                  {formik.touched.price && formik.errors.price && (
                    <ErrorText>{formik.errors.price}</ErrorText>
                  )}
                </div>
              </div>
              <div className="w-6/12">
                <div className="">
                  <InputComponent
                    className="w-[80%]"
                    label="Sales Price($)"
                    {...formik.getFieldProps("salePrice")}
                  />
                </div>
              </div>
            </div>
            {/* <div className="mt-4">
              <InputComponent
                className="w-[80%]"
                label="Cost per item"
                {...formik.getFieldProps("costPerItem")}
              />
            </div>*/}
            <span className="mt-1 text-sm">Customers won&apos;t see this</span>
            {/* <div className="mt-4 text-sm mb-2 text-slate-900 dark:text-zinc-500 flex items-center">
              <input
                type="checkbox"
                className="mr-2 focus:border-none dark:bg-[rgb(18,18,18)] dark:border-slate-700"
              />
              Charge tax on this product
            </div> */}
          </div>
          <div className="my-6 px-4 sm:px-6 lg:px-8 py-8 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 relative">
            <h5 className="font-bold">Inventory</h5>
            <>
              <div className="flex gap-5 mt-4">
                <div className="w-6/12">
                  <div className="">
                    <InputComponent
                      className="w-[80%]"
                      label="SKU (Stock Keeping Unit)"
                      {...formik.getFieldProps("stocks")}
                    />
                    {formik.touched.stocks && formik.errors.stocks && (
                      <ErrorText>{formik.errors.stocks}</ErrorText>
                    )}
                  </div>
                </div>
                {/* <div className="w-6/12">
                  <div className="">
                    <InputComponent
                      className="w-[80%]"
                      label="Barcode (ISBN, UPC, GTIN, etc)"
                    />
                  </div>
                </div> */}
              </div>
              {/* <div className="mt-4 text-sm mb-2 text-slate-900 dark:text-zinc-500 flex items-center">
                <input
                  onChange={handleCheckboxChange}
                  type="checkbox"
                  className="mr-2 h-4 w-4 focus:border-none dark:bg-[rgb(18,18,18)] dark:border-slate-700"
                />
                Track quantity
              </div> */}
              {/* {tackOrder ? (
                <>
                  <div className="mt-2 text-sm mb-2 text-slate-900 dark:text-zinc-500 flex items-center">
                    <input
                      type="checkbox"
                      className="mr-2 h-4 w-4 focus:border-none dark:bg-[rgb(18,18,18)] dark:border-slate-700"
                    />
                    Continue selling when out of stock
                  </div>
                  <hr className="my-2"></hr>
                  <h5 className="font-bold mt-4">Quantity</h5>
                  <div className="w-[50%] mt-4">
                    <InputComponent
                      className="w-[80%]"
                      label="Available"
                      type="number"
                    />
                  </div>{" "}
                </>
              ) : (
                <p className="text-sm">Not Tracked</p>
              )} */}
            </>
          </div>
          <div className="my-6 px-4 sm:px-6 lg:px-8 py-8 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 relative">
            <h5 className="font-bold">Shipping</h5>
            <Shipping
              setWeight={setWeight}
              setlength={setLength}
              setWidth={setWidth}
              setHeight={setHeight}
              setProccessTime={setProccessTime}
              setFlatRate={setFlatRate}
              weight={weight}
              length={length}
              width={width}
              height={height}
              proccessTime={processTime}
              flatRate={flatRate}
            />
          </div>
          {formik.values.productType === 4 && (
            <div className="my-6 px-4 sm:px-6 lg:px-8 py-8 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 relative">
              <h5 className="font-bold">Variant</h5>
              <div className="">
                <Variant />
              </div>
            </div>
          )}
          <div className="my-6 px-4 sm:px-6 lg:px-8 py-8 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 relative">
            <h5 className="font-bold">Tax</h5>
            <div className="">
              <Tax
                taxClass={taxClass}
                taxStatus={taxStatus}
                onClassChange={(e: any) => setTaxClass(e.value)}
                onStatusChange={(e: any) => setTaxStatus(e.value)}
              />
            </div>
          </div>
          <div className="my-6 px-4 sm:px-6 lg:px-8 py-8 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 relative">
            <h5 className="font-bold">SEO</h5>
            <div className="">
              <SEO
                metaDescription={metaDescription}
                metaKeyword={metaKeyword}
                onMetaDescriptionChange={setMetaDescription}
                onMetaKeywordChange={setMetaKeyword}
              />
            </div>
          </div>
          <div className="my-6 px-4 sm:px-6 lg:px-8 py-8 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 relative">
            <h5 className="font-bold">Offers</h5>
            <div className="">
              <Offers
                minimumOffer={minimumOffer}
                offer={offer}
                setOffer={setOffer}
                setMinimumOffer={setMinimumOffer}
              />
            </div>
          </div>
          <div className="text-end">
            <button
              className="btn  bg-primaryMain hover:bg-blueTwo text-white px-6"
              type="button" // Use button to prevent form submission
              onClick={() => formik.handleSubmit()}
            >
              <span className="hidden xs:block">Save</span>
            </button>
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
