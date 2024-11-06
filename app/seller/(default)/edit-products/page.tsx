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
import SingleUploadComponent from "@/components/common/fileUpload/singleFileUpload";
import { useRouter, useSearchParams } from "next/navigation";
import Offers from "./offers";
import { categoriesService } from "@fizno/api-client/src/apis/catergory";
import { useFormik, FormikHelpers } from "formik";
import * as Yup from "yup";
import { Alert, Snackbar } from "@mui/material";
import { UserApi } from "@fizno/api-client/src/apis/UserApi";
import RoundedLoader from "@/components/common/loader/roundedLoader";
import Variant from "./variant";
import ThreeLayerDropdown from "@/components/dropdown/threeLayerCategory";
import { decodeHtmlEntities } from "@/utils/commonFunction";
import ErrorText from "@/components/common/errorText";
interface ProductValues {
  productType: number;
  productName: string;
  price: string;
  salePrice: string;
  description: string;
  category: any[];
  condition?: any[];
  stocks: string;
  attributes: any;
  tags: any[];
}

export default function AddProduct() {
  /**
   * state management
   */
  // const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const [categoriesArray, setAllCategories] = useState([]);
  const [conditionArray, setAllConditions] = useState<any>([]);
  // const [allAttributes, setAllAttributes] = useState([]);
  const [productTags, setAllProductTags] = useState([]);
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
  const [flatRate, setFlatRate] = useState("Free shipping");
  const [snackbar, setSnackbar] = useState<{
    message: string;
    severity: "success" | "error";
    open: boolean;
  }>({ message: "", severity: "success", open: false });
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState<any>(false);
  const [reload, setReload] = useState(true);
  // const [tackOrder, setTrackOrder] = useState(false);
  const [fileUploadComponents, setFileUploadComponents] = useState<any>([
    { isUploaded: false },
  ]);

  /**
   * router
   */
  const searchParams = useSearchParams();
  const id: string | null = searchParams.get("id");
  const router = useRouter();
  const handleBack = () => {
    router.back();
  };

  // const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setTrackOrder(e.target.checked);
  // };

  const handleAddFileUpload = () => {
    // Add a new instance of FileUploadComponent to the array
    setFileUploadComponents([...fileUploadComponents, { isUploaded: false }]);
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
      subcategories: el?.children?.map((subItem: any) => ({
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

  const fetchProductTags = async () => {
    const response = await categoriesService.getAllProductTags();
    if (response.remote === "success") {
      setAllProductTags(response.data);
    }
  };

  const fetchConditions = async () => {
    const response = await categoriesService.getAllConditions();
    if (response.remote === "success") {
      setAllConditions(response.data);
    }
  };

  // const fetchAllAttributes = async () => {
  //   const response = await categoriesService.getAllAttributes();
  //   if (response.remote === "success") {
  //     setAllAttributes(response.data);
  //   }
  // };

  useEffect(() => {
    fetchCatgories();
    fetchConditions();
    // fetchAllAttributes();
    fetchProductTags();
  }, []);

  const formik = useFormik<ProductValues>({
    initialValues: {
      productType: 2,
      productName: "",
      price: "",
      salePrice: "",
      description: "",
      category: [],
      stocks: "",
      attributes: {},
      tags: [],
      condition: [],
    },
    validationSchema: Yup.object({
      productType: Yup.number().required("Required"),
      productName: Yup.string().required("Required"),
      price: Yup.string().required("Required"),
      description: Yup.string().required("Required"),
      // condition: Yup.string().required("Required"),
    }),
    onSubmit: async (
      values: ProductValues,
      { setSubmitting }: FormikHelpers<ProductValues>,
    ) => {
      setLoading(true);
      try {
        const shipping = {
          length,
          weight,
          width,
          height,
          processTime,
          flatRate,
        };
        const payload = {
          ...values,
          category: values.category?.flatMap((el) => [
            { value: el.id, label: el.name, parent: el.parent },
            ...(el?.subcategories?.map((item: any) => ({
              value: item.id,
              label: item.name,
              parent: item.parent,
            })) ?? []),
          ]),
        };
        console.log({ payload });

        const response: any = await UserApi.updateProducts(
          {
            ...payload,
            taxClass,
            taxStatus,
            metaDescription,
            metaKeyword,
            offer,
            minimumOffer,
            shipping,
          },
          id as string,
        );
        if (response.remote === "success") {
          uploadImages();
        } else {
          setSnackbar({
            message: response.data.errors.message || "An error occurred!",
            severity: "error",
            open: true,
          });
        }
      } catch (error: any) {
        console.log(error);
        setSnackbar({
          message: error.message,
          severity: "error",
          open: true,
        });
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const fetchProductDetail = async () => {
    setLoading(true);
    try {
      const response = await UserApi.getProductById(id || "");
      if (response.data.status === 200) {
        setProduct(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (id) {
      fetchProductDetail();
    }
  }, [id]);
  console.log({ formik: formik.values });

  useEffect(() => {
    if (product) {
      const productType = product.wp_term_relationships.find(
        (item: any) => item?.taxonomy === "product_type",
      );

      const condition = product.wp_term_relationships.find(
        (item: any) => item?.taxonomy === "pa_condition",
      );
      const attributesTaxnonomy = {
        ...product.wp_nepaz2_postmeta.find(
          (item: any) => item.meta_key == "_product_attributes",
        )?.meta_value,
      };
      const groupedData = product.attribute_lookup.reduce(
        (acc: any, item: any) => {
          const { taxonomy } = item;
          if (!acc[taxonomy]) {
            acc[taxonomy] = [];
          }
          acc[taxonomy].push({
            label: item.terms.name,
            value: item.terms.term_id,
          });
          return acc;
        },
        {},
      );

      if (groupedData) {
        Object.keys(groupedData).forEach((key) => {
          const attribute = groupedData[key];
          if (attribute) {
            if (attributesTaxnonomy[key]) {
              attributesTaxnonomy[key].value = attribute;
            }
          }
        });
      }

      formik.setValues({
        productType: productType?.id,
        condition: condition?.id,
        productName: product.post_title,
        price: product.wp_nepaz2_postmeta.find(
          (item: any) => item.meta_key == "_price",
        )?.meta_value,
        description: product.post_content,
        salePrice: product.wp_nepaz2_postmeta.find(
          (item: any) => item.meta_key == "sale_price",
        )?.meta_value,
        category: product.wp_term_relationships
          .filter((item: any) => item?.taxonomy === "product_cat")
          .map((el: any) => ({
            id: el.id,
            name: el.name,
            parent: 0,
            subcategories: el?.subcategory?.map((item: any) => ({
              id: item?.id,
              name: item?.name,
              subcategories: [],
            })),
          })),
        stocks: product.wp_nepaz2_postmeta.find(
          (item: any) => item.meta_key == "_stock",
        )?.meta_value,
        attributes: attributesTaxnonomy,
        tags: product.wp_term_relationships
          .filter((item: any) => item.taxonomy === "product_tag")
          .map((value: any) => {
            return {
              label: value?.name,
              value: value?.id,
            };
          }),
      });
      setTaxClass(
        product.wp_nepaz2_postmeta.find(
          (item: any) => item.meta_key == "tax_class",
        )?.meta_value,
      );

      setTaxStatus(
        product.wp_nepaz2_postmeta.find(
          (item: any) => item.meta_key == "tax_status",
        )?.meta_value,
      );

      setMetaDescription(
        product.wp_nepaz2_postmeta.find(
          (item: any) => item.meta_key == "meta_description",
        )?.meta_value,
      );
      setMetaKeyword(
        product.wp_nepaz2_postmeta.find(
          (item: any) => item.meta_key == "meta_keyword",
        )?.meta_value,
      );

      setOffer(
        product.wp_nepaz2_postmeta.find((item: any) => item.meta_key == "offer")
          ?.meta_value,
      );
      setMinimumOffer(
        product.wp_nepaz2_postmeta.find(
          (item: any) => item.meta_key == "minimum_offer",
        )?.meta_value,
      );

      setWeight(
        product.wp_nepaz2_postmeta.find(
          (item: any) => item.meta_key == "_shiping",
        )?.meta_value?.weight,
      );

      setLength(
        product.wp_nepaz2_postmeta.find(
          (item: any) => item.meta_key == "_shiping",
        )?.meta_value?.length,
      );

      setWidth(
        product.wp_nepaz2_postmeta.find(
          (item: any) => item.meta_key == "_shiping",
        )?.meta_value?.width,
      );

      setHeight(
        product.wp_nepaz2_postmeta.find(
          (item: any) => item.meta_key == "_shiping",
        )?.meta_value?.height,
      );

      setProccessTime(
        product.wp_nepaz2_postmeta.find(
          (item: any) => item.meta_key == "_shiping",
        )?.meta_value?.processTime,
      );

      setFlatRate(
        product.wp_nepaz2_postmeta.find(
          (item: any) => item.meta_key == "_shiping",
        )?.meta_value?.flatRate,
      );

      const attchemnts = product.attachment.map((item: any) => {
        return { isUploaded: true, item: item };
      });
      if (attchemnts.length > 0) {
        setFileUploadComponents(attchemnts);
      }
    }
  }, [product]);

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const selectedFiles = e.target.files;
    const uploadedData = [...fileUploadComponents];
    // console.log(uploadedData)
    if (selectedFiles && selectedFiles.length > 0) {
      const selectedImage = selectedFiles[0];
      if (selectedImage) {
        const data = { isUploaded: true, item: selectedImage };
        uploadedData[index] = data;
        setFileUploadComponents(uploadedData);
        setReload(!reload);
      }
      // setImage(selectedImage);
      // setPreview(URL.createObjectURL(selectedImage));
    }
  };

  const handleDelete = (key: number) => {
    const filter = fileUploadComponents.filter(
      (item: any, index: number) => index !== key,
    );
    if (filter.length > 0) {
      setFileUploadComponents(filter);
    } else {
      setFileUploadComponents([{ isUploaded: false }]);
    }
  };

  const handleApiDelete = async (id: number, key: number) => {
    const response = await UserApi.deleteProducts(id);
    if (response.remote === "success") {
      const filter = fileUploadComponents.filter(
        (item: any, index: number) => index !== key,
      );
      if (filter > 0) {
        setFileUploadComponents(filter);
      } else {
        setFileUploadComponents([{ isUploaded: false }]);
      }
    }
  };

  const uploadImages = async () => {
    try {
      const formData = new FormData();
      for (let i = 0; i < fileUploadComponents.length; i++) {
        const element = fileUploadComponents[i];
        if (element.item && !element.item.ID) {
          formData.append("image", element.item);
        }
      }
      formData.append("id", `${id}`);
      const response: any = await UserApi.uploadProductAttachment(formData);
      if (response.remote === "success") {
        setSnackbar({
          message: "edit product successfully",
          severity: "success",
          open: true,
        });
        // uploadImages(response.data.data.ID)
        router.push("../seller/products");
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

  const productTypeOptions = [
    { value: 2, label: "Simple Listing" },
    { value: 4, label: "Variable Listing" },
  ];

  const brandsArray = [
    { value: "brandOne", label: "BrandOne" },
    { value: "brandTwo", label: "BrandTwo" },
    { value: "brandThree", label: "BrandThree" },
    { value: "brandFour", label: "BrandFour" },
  ];

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
              Edit Products
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
          <span
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
          </span>
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
                <div className="">
                  {" "}
                  {/* <SelectComponent
                    label="Simple Product"
                    options={productArray}
                    selectedValue={productArray.find(
                      (item: any) =>
                        item.value ===
                        formik.getFieldProps("productType").value,
                    )}
                    onSelect={(value: any) =>
                      formik.setFieldValue("productType", value[0].value)
                    }
                  /> */}
                  {formik.touched.productType && formik.errors.productType ? (
                    <div className="text-red-600">
                      {formik.errors.productType}
                    </div>
                  ) : null}
                </div>
                <div className="mt-4">
                  {" "}
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

                <div className="mt-4 categories_dropdown">
                  <ThreeLayerDropdown
                    label="Categories"
                    categories={categoriesArray}
                    selectedCategories={formik.values.category}
                    setSelectedCategories={(vl) => {
                      console.log({ vl });

                      formik.setFieldValue("category", vl);
                    }}
                  />
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

                <div className="mt-4">
                  <SelectComponent
                    label="Condition"
                    selectedValue={conditionArray?.find(
                      (el: any) => el.value === formik.values.condition,
                    )}
                    onSelect={(value) =>
                      formik.setFieldValue("condition", value[0].value)
                    }
                    options={conditionArray}
                  />
                </div>

                <div className="mb-4 mt-4 categories_dropdown">
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
                  {fileUploadComponents.map((component: any, index: any) => (
                    <div
                      key={index}
                      className={`mt-4 mr-2   ${
                        fileUploadComponents.length > 1
                          ? "small_upload_div"
                          : ""
                      }`}
                    >
                      {
                        <SingleUploadComponent
                          handleDelete={() => {
                            if (component.item.ID) {
                              handleApiDelete(component.item.ID, index);
                            } else {
                              handleDelete(index);
                            }
                          }}
                          handleImageChange={(e) => handleImageChange(e, index)}
                          component={component}
                          key={0}
                          type="add"
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
              <InputComponent className="w-[80%]" label="Cost per item" />
            </div> */}
            {/* <span className="mt-1 text-sm">Customers won&apos;t see this</span>
            <div className="mt-4 text-sm mb-2 text-slate-900 dark:text-zinc-500 flex items-center">
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
              onClick={() => formik.handleSubmit()}
              className="btn  bg-primaryMain hover:bg-blueTwo text-white px-6"
              type="button" // Use button to prevent form submission
            >
              <span className="hidden xs:block">Update</span>
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
