/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prettier/prettier */
"use client";
import ProductSlider from "@/components/common/Slider/productSlider";
import React, { useEffect, useState } from "react";
import TabComponent from "@/components/common/basicTab/page";
import Description from "./component/description";
import { Reviews } from "./component/review";
import { UserApi } from "@fizno/api-client/src/apis/UserApi";
import { useRouter, useSearchParams } from "next/navigation";
import RoundedLoader from "@/components/common/loader/roundedLoader";
import Shipping from "./component/shipping";
import Specification from "./component/specification";
import StorePolicies from "./component/storePolicies";
import TouchSpin from "@/components/touchspin/touchspin";
import Image from "next/image";
import SimpleSlider from "@/components/common/Slider/simpleSlider";
import BreadcrumbTwo from "@/components/common/breadcrumb/breadcrumbTwo";
import ProductReview from "./component/productReview";
import {
  Alert,
  Avatar,
  Box,
  CircularProgress,
  IconButton,
  LinearProgress,
  Snackbar,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  globalCacheStateSelector,
  setToastMessage,
} from "@/redux/slices/globaCache.slice";
import SVG from "@/public/svg";
import { setCartCount } from "@/redux/slices/product.slice";
import { SVGIcon } from "@/assets/svg";
import { tokens } from "@/helpers/jwtTokenFunction";
import moment from "moment";
import SkeletonProductCard from "@/components/common/card/skeletonProductCard";
import ProductCard from "@/components/common/card/productCard";
import { categoriesService } from "@fizno/api-client/src/apis/catergory";
import SkeletonLoader from "@/components/loader/skeletonLoader";
import ShareModal from "@/components/common/modal/shareModal";
import Benefits from "@/components/common/Carousal/Benefits";

export type FeaturedProductType = {
  id: number;
  image: string;
  likes: string;
  comments: string;
  shares: string;
  title: string;
  condition: string;
  price: string;
  shipping: string;
  sellerImage: string;
  sellerName: string;
  location: string;
  rating: string;
  stock: number;
};

export default function SearchDetail() {
  /**
   * router
   */
  const router = useRouter();
  const searchParams = useSearchParams();
  const id: string | null = searchParams.get("id");

  /**
   * redux
   */
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(globalCacheStateSelector);

  /**
   * state management
   */

  const [breadcrumbItems, setBreadcrumbItems] = useState([
    { text: "Home", href: "/" },
    { text: "Dirt Bike", href: "#" },
    { text: "HUSQVARNA FX  350", href: "/search-detail" },
  ]);
  const [product, setProduct] = useState<any>(null);
  console.log({ product });

  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState<
    "BUY" | "CART" | "FAV" | "FOLLOW" | ""
  >("");
  const [similarProduct, setSimilarProduct] = useState<FeaturedProductType[]>(
    [],
  );

  const [otherProduct, setOtherProduct] = useState<FeaturedProductType[]>([]);
  const [snackbar, setSnackbar] = useState<{
    message: string;
    severity: "success" | "error";
    open: boolean;
  }>({ message: "", severity: "success", open: false });
  const [allFavList, setAllFavList] = useState<any>([]);
  const [allCartProd, setAllCartProd] = useState<any>([]);
  const [allProdCommentList, setAllProdCommentList] = useState<any>([]);
  const [isLocalCartItem, setIsLocalCartItem] = useState<boolean>(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [reivewCount, setReviewCount] = useState<number>(0);

  const handleShareOpenModal = () => setIsShareModalOpen(true);
  const handleShareCloseModal = () => setIsShareModalOpen(false);
  const handleQuantityChange = (value: number) => {
    setQuantity(value);
  };
  const colors: string[] = [
    "#ffa500",
    "#ff0000",
    "#008000",
    "#ffc0cb",
    "#800080",
  ];
  const sizes: string[] = ["M", "X", "XL", "2XL"];
  const [color, setColor] = useState<string>("#008000");
  const [size, setSize] = useState<string>("XL");
  const handleColorChange = (value: string) => {
    setColor(value);
  };
  const handleSizeChange = (value: string) => {
    setSize(value);
  };

  const similarCards = similarProduct?.map((product: any) => (
    <div className="mx-3" key={product.id}>
      <ProductCard
        type="gridView"
        product={product}
        handleRefreshCartList={() => getAllCartProdList()}
        handleRefreshFavList={() => getFavList()}
      />
    </div>
  ));

  const otherCards = otherProduct?.map((product: any) => (
    <div className="mx-3" key={product.id}>
      <ProductCard
        type="gridView"
        product={product}
        handleRefreshCartList={() => getAllCartProdList()}
        handleRefreshFavList={() => getFavList()}
      />
    </div>
  ));

  /**
   * fetch product details
   */

  const fetchProductDetail = async () => {
    try {
      const response = await UserApi.getProductById(id || "");
      if (response.data.status === 200) {
        setProduct(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * fetch product comments
   */

  const handleGetAllComments = async () => {
    if (id) {
      const response = await UserApi.getAllProdCommentsAPI(Number(id));

      if (response.remote === "success") {
        const data = response?.data?.data?.map((item: any) => ({
          id: item?.id,
          username: item?.user?.display_name,
          userId: item?.user?.id,
          date: moment(item?.created_at).format("MM-DD-YYYY"),
          content: item?.content,
          avatarUrl: item?.user?.avatar?.guid,
        }));
        setAllProdCommentList(data.length === 0 ? null : data);
      }
    }
  };

  /**
   * fetch similar products
   */

  const fetchSimilarProducts = async () => {
    const data = {
      keyword: "",
      condition: [],
      brand: [],
      category: [
        product.wp_term_relationships.filter(
          (item: any) => item.taxonomy === "product_cat",
        )[0].id,
      ],
      pageIndex: 1,
      pageSize: 16,
      minPrice: 0,
      maxPrice: 1000,
      sort: "ASC",
    };
    const response = await categoriesService.searchProducts(data);

    const prodData = response?.data?.data?.updateData;
    const productData = prodData?.map((item: any) => {
      const getMetaValue = (key: string) => {
        const meta = item?.wp_nepaz2_postmeta?.find(
          (item: any) => item.meta_key === key,
        )?.meta_value;
        return meta;
      };
      const postmeta = item.wp_nepaz2_postmeta.reduce((acc: any, meta: any) => {
        acc[meta.meta_key] = meta.meta_value;
        return acc;
      }, {});
      return {
        id: item?.ID,
        image: postmeta._ebay_product_featured_image
          ? postmeta._ebay_product_featured_image.img_url
          : item.attachment.length > 0
            ? item.attachment[0]?.guid.includes("http")
              ? item.attachment[0]?.guid
              : `${process.env.NEXT_PUBLIC_API_BASE_URL}${item.attachment[0]?.guid}`
            : "",
        likes: item?.wp_add_product_fav || 0,
        comments: item?.comment_count || 0,
        shares: "0",
        title: item?.post_name,
        condition: "New",
        price: `$${getMetaValue("_price") || 0}`,
        shipping: "Free Shipping",
        sellerImage: item?.wp_nepaz2_users?.avatar?.guid,
        sellerName: item?.wp_nepaz2_users?.display_name,
        location: `${item?.wp_nepaz2_users?.store?.address?.city}, ${item?.wp_nepaz2_users?.store?.address?.country}`,
        rating: item?.wp_nepaz2_users?.avgRate || 0,
        stock: `${getMetaValue("_stock") || 0}`,
      };
    });
    setSimilarProduct(productData);
  };

  const fetchOtherProducts = async () => {
    const data = {
      keyword: "",
      condition: [],
      brand: [],
      category: [
        product.wp_term_relationships.filter(
          (item: any) => item.taxonomy === "product_cat",
        )[0].id,
      ],
      pageIndex: 1,
      pageSize: 16,
      minPrice: 0,
      maxPrice: 1000,
      sort: "ASC",
    };
    const response = await categoriesService.searchOtherProducts(data);

    const prodData = response?.data?.data?.updateData;
    const productData = prodData?.map((item: any) => {
      const getMetaValue = (key: string) => {
        const meta = item?.wp_nepaz2_postmeta?.find(
          (item: any) => item.meta_key === key,
        )?.meta_value;
        return meta;
      };
      const postmeta = item.wp_nepaz2_postmeta.reduce((acc: any, meta: any) => {
        acc[meta.meta_key] = meta.meta_value;
        return acc;
      }, {});
      return {
        id: item?.ID,
        image: postmeta._ebay_product_featured_image
          ? postmeta._ebay_product_featured_image.img_url
          : item.attachment.length > 0
            ? item.attachment[0]?.guid.includes("http")
              ? item.attachment[0]?.guid
              : `${process.env.NEXT_PUBLIC_API_BASE_URL}${item.attachment[0]?.guid}`
            : "",
        likes: item?.wp_add_product_fav || 0,
        comments: item?.comment_count || 0,
        shares: "0",
        title: item?.post_name,
        condition: "New",
        price: `$${getMetaValue("_price") || 0}`,
        shipping: "Free Shipping",
        sellerImage: item?.wp_nepaz2_users?.avatar?.guid,
        sellerName: item?.wp_nepaz2_users?.display_name,
        location: `${item?.wp_nepaz2_users?.store?.address?.city}, ${item?.wp_nepaz2_users?.store?.address?.country}`,
        rating: item?.wp_nepaz2_users?.avgRate || 0,
        stock: `${getMetaValue("_stock") || 0}`,
      };
    });
    setOtherProduct(productData);
  };

  /* const fetchOtherProducts = async () => {
        // setLoading(true);
        try {
          const response = await categoriesService.getAllProducts(1, 16, {
            seller: product?.wp_nepaz2_users?.id,
            category: "",
            condition: "",
          });
          if (response.remote === "success") {
            const data = response.data.data.updateData;
            const productData = data.map((item: any) => {
              const getMetaValue = (key: string) => {
                const meta = item?.wp_nepaz2_postmeta?.find(
                  (item: any) => item.meta_key === key,
                )?.meta_value;
                return meta;
              };
              const postmeta = item.wp_nepaz2_postmeta.reduce(
                (acc: any, meta: any) => {
                  acc[meta.meta_key] = meta.meta_value;
                  return acc;
                },
                {},
              );
              return {
                id: item?.ID,
                image: postmeta._ebay_product_featured_image
                  ? postmeta._ebay_product_featured_image.img_url
                  : item.attachment.length > 0
                    ? item.attachment[0]?.guid.includes("http")
                      ? item.attachment[0]?.guid
                      : `${process.env.NEXT_PUBLIC_API_BASE_URL}${item.attachment[0]?.guid}`
                    : "",
                likes: item?.wp_add_product_fav.length || 0,
                comments: item?.comment_count || 0,
                shares: "0",
                title: item?.post_name,
                condition: "New",
                price: `$${getMetaValue("_price") || 0}`,
                shipping: "Free Shipping",
                sellerImage: item?.wp_nepaz2_users?.avatar?.guid,
                sellerName: item?.wp_nepaz2_users?.display_name,
                location: `${item?.wp_nepaz2_users?.store?.address?.city}, ${item?.wp_nepaz2_users?.store?.address?.country}`,
                rating: item?.wp_nepaz2_users?.avgRate || 0,
                stock: `${getMetaValue("_stock") || 0}`,
              };
            });
            setOtherProduct(productData);
          } else {
            console.error(response.message);
          }
        } catch (error) {
          console.error("Error fetching products:", error);
        } finally {
          // setLoading(false);
        }
      }; */

  /**
   * handle follow user
   */

  const handleFollowUser = async (userId: number) => {
    const payload = { userId };
    setLoading("FOLLOW");

    const response = await UserApi.followUserAPI(payload);

    if (response.remote === "success") {
      setLoading("");
      fetchProductDetail();
      setSnackbar({
        message: "You have followed successfully!",
        severity: "error",
        open: true,
      });
    } else {
      setLoading("");
      setSnackbar({
        message: response.error.errors.message || "An error occurred!",
        severity: "error",
        open: true,
      });
    }
  };

  /**
   * handle add to fav
   */

  const handleAddToFav = async () => {
    if (id) {
      const payload = { productId: Number(id) };
      setLoading("FAV");
      const response = await UserApi.addToFavoriteAPI(payload);

      if (response.remote === "success") {
        setLoading("");
        getFavList();
        setSnackbar({
          message: "Product added to favorite.",
          severity: "success",
          open: true,
        });
      } else {
        setLoading("");
        setSnackbar({
          message: response.error.errors.message || "An error occurred!",
          severity: "error",
          open: true,
        });
      }
    }
  };

  /**
   * get add to fav list
   */

  const getFavList = async () => {
    const response = await UserApi.allFavoriteAPI();
    if (response.remote === "success") {
      setAllFavList(response.data.data);
    }
  };

  /**
   * handle get all review
   */

  const handleGetAllReview = async () => {
    if (id) {
      const response = await UserApi.getAllProdReviewAPI(id);

      if (response.remote === "success") {
        setReviewCount(response.data.data.total);
      }
    }
  };

  /**
   * handle remove favorite
   */
  const handleRemoveFav = async () => {
    if (id) {
      const payload = {
        productId: Number(id),
      };
      setLoading("FAV");

      const response = await UserApi.removeFavoriteAPI(payload);
      if (response.remote === "success") {
        setLoading("");
        getFavList();
        setSnackbar({
          message: "Product removed from favorite.",
          severity: "success",
          open: true,
        });
      } else {
        setLoading("");
        setSnackbar({
          message: response.error.errors.message || "An error occurred!",
          severity: "error",
          open: true,
        });
      }
    }
  };

  /**
   * handle add to cart
   */

  const handleAddToCart = async (isBuy = false) => {
    if (id) {
      const payload = { productId: Number(id), quantity };
      setLoading(isBuy ? "BUY" : "CART");
      const response = await UserApi.addToCartAPI(payload);

      if (response.remote === "success") {
        setLoading("");
        getAllCartProdList();

        dispatch(
          setToastMessage({
            message: "Product added to Cart.",
            open: true,
            status: "success",
          }),
        );
        isBuy && router.push("/shopping-cart");
      } else {
        setLoading("");
        dispatch(
          setToastMessage({
            message: response.error.errors.message || "An error occurred!",
            open: true,
            status: "error",
          }),
        );
      }
    }
  };

  /**
   * get all cart product list
   */

  const getAllCartProdList = async () => {
    const response = await UserApi.getAllCartProdAPI();
    if (response.remote === "success") {
      setAllCartProd(response.data.data);
      dispatch(setCartCount(response?.data?.data?.length || 0));
    }
  };

  /**
   * add recently view product
   */

  const handleRecentlyViewProduct = async () => {
    if (id) {
      const payload = {
        productId: Number(id),
        userId: user?.id,
      };

      const response = await UserApi.addRecentlyViewProductAPI(payload);
      if (response.remote === "failure") {
        setSnackbar({
          message: response.error.errors.message || "An error occurred!",
          severity: "error",
          open: true,
        });
      }
    }
  };

  useEffect(() => {
    if (id) {
      fetchProductDetail();
      getFavList();
      getAllCartProdList();
      handleGetAllReview();
    }
  }, [id]);

  useEffect(() => {
    handleRecentlyViewProduct();
  }, [id, user]);

  useEffect(() => {
    if (id) {
      handleGetAllComments();
    }
  }, [id]);

  useEffect(() => {
    if (product) {
      fetchSimilarProducts();
      setBreadcrumbItems([
        { text: "Home", href: "/" },
        {
          text: product.wp_term_relationships.filter(
            (item: any) => item.taxonomy === "product_cat",
          )[0]?.name,
          href: "#",
        },
        { text: product.post_title, href: "#" },
      ]);

      fetchOtherProducts();
    }
  }, [product]);

  const getMetaValue = (key: string) => {
    const meta = product?.wp_nepaz2_users?.wp_nepaz2_usermeta.find(
      (item: any) => item.meta_key === key,
    )?.meta_value;
    return meta;
  };
  const getProductMetaValue = (key: string) => {
    const meta = product?.wp_nepaz2_postmeta.find(
      (item: any) => item.meta_key === key,
    )?.meta_value;
    return meta;
  };

  const convertEbayImagesToArray = (data: any) => {
    const images: any[] = [];
    Object.keys(data).forEach((key) => {
      const attribute = data[key];
      images.push(attribute);
    });

    return images;
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  /**
   * handle add to cart local
   */
  const handleAddToCartLocal = (isBuy = false) => {
    const data = {
      title: product?.post_title,
      price: `$${
        product?.wp_nepaz2_postmeta?.find(
          (item: any) => item.meta_key == "sale_price",
        )?.meta_value
      }`,
      image: product?.attachment[0]?.guid,
      stocks:
        product?.wp_nepaz2_postmeta?.find(
          (item: any) => item.meta_key == "_stock",
        )?.meta_value || 0,
      quantity,
      storeName: getMetaValue("dokan_profile_settings")?.store_name,
      productId: product?.ID,
      sellerId: product?.wp_nepaz2_users?.id,
    };
    if (typeof window !== "undefined") {
      const localCart = localStorage.getItem("localCart");
      if (localCart) {
        const isExist = JSON.parse(localCart)?.find(
          (el: any) => el.title === data.title,
        );
        if (!isExist) {
          const cartItem = [...JSON.parse(localCart), data];
          localStorage.setItem("localCart", JSON.stringify(cartItem));
          isLocalCartProductExist();
          isBuy && router.push("/shopping-cart");
        }
      } else {
        localStorage.setItem("localCart", JSON.stringify([data]));
        isLocalCartProductExist();
        isBuy && router.push("/shopping-cart");
      }
    }
  };

  const isLocalCartProductExist = () => {
    if (typeof window !== "undefined") {
      const localCartData = localStorage.getItem("localCart");
      if (localCartData) {
        const isExist = JSON.parse(localCartData)?.some(
          (el: any) => el.title === product?.post_title,
        );
        dispatch(setCartCount(JSON.parse(localCartData)?.length || 0));
        if (isExist) {
          setIsLocalCartItem(true);
        } else {
          setIsLocalCartItem(false);
        }
      } else {
        setIsLocalCartItem(false);
      }
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined" && !tokens.getAccessToken()) {
      isLocalCartProductExist();
    }
  }, [product]);

  return (
    <>
      <div className="search_result_page_main">
        <div className="container ">
          <div className="w-3/5">
            <div className="my-4">
              <BreadcrumbTwo
                items={breadcrumbItems}
                className="rounded-lg px-2"
              />
            </div>
          </div>
          <div className="flex gap-3 flex-wrap justify-center">
            <div className="product_thumbnail_slider">
              <ProductSlider
                images={
                  getProductMetaValue("_ebay_product_gallery_images")
                    ? convertEbayImagesToArray(
                        getProductMetaValue("_ebay_product_gallery_images"),
                      ).map((item: any, index: number) => {
                        return { id: index, url: item.img_url };
                      })
                    : product?.attachment.map((item: any, index: number) => {
                        return { id: index, url: item.guid };
                      }) || []
                }
              />
            </div>
            {/* <div className="w-1/12"></div> */}
            <div className="w-[675px] px-4">
              <div className="ml-2 relative">
                <div className="absolute right-2">
                  {/*
                  <span className="text-yellow-600 w-5 h-5 cursor-pointer">
                    {allFavList.some(
                      (el: any) =>
                        el.porduct.ID === Number(id) && el.user.id === user?.id,
                    ) ? (
                      <IconButton
                        disabled={loading === "FAV"}
                        onClick={handleRemoveFav}
                      >
                        <SVG.favouriteFillIcon color="#306cb5" />
                      </IconButton>
                    ) : (
                      <IconButton
                        disabled={loading === "FAV"}
                        onClick={() =>
                          tokens.getAccessTokenCookies()
                            ? handleAddToFav()
                            : dispatch(
                                setToastMessage({
                                  message: "To save the product, please login",
                                  status: "error",
                                  open: true,
                                }),
                              )
                        }
                      >
                        <SVG.favouriteIcon color="#306cb5" />
                      </IconButton>
                    )}
                  </span>
                  */}
                </div>
                <div className="flex items-center justify-between -mt-2">
                  <div className="my-3 text-black w-fit px-3 py-1 border rounded-full normal-case text-sm font-semibold">
                    {product?.wp_term_relationships?.find(
                      (item: any) => item.taxonomy === "pa_condition",
                    )?.name || "New"}
                  </div>
                  <div className=" flex product-top-wrapper items-center gap-2">
                    {/* <ProductReview
                      reviewArray={allProdCommentList}
                      handleFav={() =>
                        allFavList.some(
                          (el: any) =>
                            el.porduct.ID === Number(id) &&
                            el.user.id === user?.id,
                        )
                          ? handleRemoveFav()
                          : handleAddToFav()
                      }
                      favCount={allFavList?.length}
                      productId={id || ""}
                      handleRefreshComments={() => handleGetAllComments()}
                    /> */}
                    <svg
                      className=""
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      height="30"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <path
                        d="M4.29199 1.66669V18.3334"
                        stroke="#737373"
                        strokeWidth="1.5"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M4.29199 3.33331H13.6253C15.8753 3.33331 16.3753 4.58331 14.792 6.16665L13.792 7.16665C13.1253 7.83331 13.1253 8.91665 13.792 9.49998L14.792 10.5C16.3753 12.0833 15.792 13.3333 13.6253 13.3333H4.29199"
                        stroke="#737373"
                        strokeWidth="1.5"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <svg
                      onClick={handleShareOpenModal}
                      className="cursor-pointer"
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      height="30"
                      viewBox="0 0 16 16"
                      fill="none"
                    >
                      <path
                        d="M4.93313 4.21331L10.5931 2.32665C13.1331 1.47998 14.5131 2.86665 13.6731 5.40665L11.7865 11.0666C10.5198 14.8733 8.43979 14.8733 7.17313 11.0666L6.61312 9.38665L4.93313 8.82665C1.12646 7.55998 1.12646 5.48665 4.93313 4.21331Z"
                        stroke="#737373"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M6.74023 9.1L9.1269 6.70667"
                        stroke="#737373"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
                <h4 className="capitalize text-3xl font-bold text-black py-2">
                  {product?.post_title ? (
                    <>{product?.post_title}</>
                  ) : (
                    <SkeletonLoader type="text" width="90%" height={42} />
                  )}
                </h4>
                <div className="flex items-center"></div>
                <div className="flex justify-between">
                  <div className="flex items-center">
                    <h3 className="font-bold text-black text-2xl heading_title">
                      $
                      {product?.wp_nepaz2_postmeta?.find(
                        (item: any) => item.meta_key == "sale_price",
                      )?.meta_value
                        ? Number(
                            product?.wp_nepaz2_postmeta?.find(
                              (item: any) => item.meta_key == "sale_price",
                            )?.meta_value,
                          ) === 0
                          ? product?.wp_nepaz2_postmeta?.find(
                              (item: any) => item.meta_key == "_price",
                            )?.meta_value
                          : product?.wp_nepaz2_postmeta?.find(
                              (item: any) => item.meta_key == "sale_price",
                            )?.meta_value
                        : product?.wp_nepaz2_postmeta?.find(
                            (item: any) => item.meta_key == "_price",
                          )?.meta_value}
                      {/* <SkeletonLoader type="text" width="100px" height={42} /> */}
                    </h3>
                    {(product?.wp_nepaz2_postmeta?.find(
                      (item: any) => item.meta_key == "_price",
                    )?.meta_value ||
                      Number(
                        product?.wp_nepaz2_postmeta?.find(
                          (item: any) => item.meta_key == "sale_price",
                        )?.meta_value,
                      ) !== 0) && (
                      <p className="text-[#666666] ml-2 text-base normal-case line-through">
                        $
                        {
                          product?.wp_nepaz2_postmeta?.find(
                            (item: any) => item.meta_key == "_price",
                          )?.meta_value
                        }
                      </p>
                    )}
                    <div className="flex text-lg ml-3 normal-case  text-[#737373]">
                      Free shipping
                    </div>
                  </div>
                  <div className=" flex product-top-wrapper items-center gap-2">
                    <ProductReview
                      reviewArray={allProdCommentList}
                      handleFav={() =>
                        allFavList.some(
                          (el: any) =>
                            el.porduct.ID === Number(id) &&
                            el.user.id === user?.id,
                        )
                          ? handleRemoveFav()
                          : handleAddToFav()
                      }
                      favCount={allFavList?.length}
                      productId={id || ""}
                      handleRefreshComments={() => handleGetAllComments()}
                    />
                  </div>
                </div>
                <div className="mt-5">
                  <p className="capitalize font-semibold text-[#737373]">
                    Quantity
                  </p>
                  <div className="flex items-center gap-3 mt-2">
                    <TouchSpin
                      min={1}
                      max={Number(
                        product?.wp_nepaz2_postmeta?.find(
                          (item: any) => item.meta_key == "_stock",
                        )?.meta_value,
                      )}
                      step={1}
                      initialValue={quantity}
                      onChange={handleQuantityChange}
                    />
                    <div className="flex items-center">
                      <div className="my-3  w-fit  rounded-md normal-case text-md">
                        <span className="text-[#252525]ks">
                          {" "}
                          {
                            product?.wp_nepaz2_postmeta?.find(
                              (item: any) => item.meta_key == "_stock",
                            )?.meta_value
                          }{" "}
                          Available
                        </span>
                      </div>
                      {/* <SkeletonLoader type="text" width="160px" height={50} /> */}
                    </div>
                  </div>
                </div>

                {/* <div className="mt-5">
                  <p className="capitalize font-semibold text-[#737373]">
                    Colours
                  </p>

                  <div className="flex gap-2 mt-2">
                    {colors?.map((c, i) => {
                      return (
                        <div
                          key={i}
                          onClick={() => handleColorChange(c)}
                          className={`bg-[${c}] cursor-pointer flex items-center justify-center w-11 h-11 rounded-full`}
                        >
                          {c === color && <SVGIcon.CheckIcon fill="white" />}
                        </div>
                      );
                    })}
                  </div>
                </div> */}

                {/* <div className="mt-5">
                  <p className="capitalize font-semibold text-[#737373]">
                    Sizes
                  </p>
                  <div className="flex gap-3 mt-2 text-black">
                    {sizes.map((s, i) => {
                      return (
                        <button onClick={()=>handleSizeChange(s)} key={i} className={`font-semibold  rounded-full border w-12 h-12 ${s==size && "bg-[#f0f0f0] border-black"}`}>
                          {s}
                        </button>
                      );
                    })}
                  </div>
                </div> */}

                <div className="mt-5">
                  <div className="flex flex-wrap my-2 gap-4 ">
                    <TouchSpin
                      min={1}
                      max={Number(
                        product?.wp_nepaz2_postmeta?.find(
                          (item: any) => item.meta_key == "_stock",
                        )?.meta_value,
                      )}
                      step={1}
                      initialValue={quantity}
                      onChange={handleQuantityChange}
                    />
                    <button
                      onClick={() => {
                        if (
                          typeof window !== "undefined" &&
                          tokens.getAccessToken()
                        ) {
                          allCartProd?.some(
                            (el: any) =>
                              el.product?.ID === Number(id) &&
                              el.user?.id === user?.id,
                          )
                            ? router.push("/shopping-cart")
                            : handleAddToCart(true);
                        } else {
                          if (isLocalCartItem) {
                            router.push("/shopping-cart");
                          } else {
                            handleAddToCartLocal(true);
                          }
                        }
                      }}
                      className="bg-primaryMain lg:px-6 2xl:px-8 px-8 py-3 lg:py-3 2xl:py-3 text-white font-semibold rounded w-full"
                    >
                      Buy Now{" "}
                    </button>
                  </div>
                  <div>
                    <button className="w-full mt-5 border-primaryMain border lg:px-6 2xl:px-8 px-8 py-3 lg:py-3 2xl:py-3 rounded bg-transparent text-primaryMain font-semibold">
                      Make offer
                    </button>
                  </div>
                  <div>
                    <button
                      disabled={loading === "CART"}
                      onClick={() => {
                        if (
                          typeof window !== "undefined" &&
                          tokens.getAccessToken()
                        ) {
                          allCartProd?.some(
                            (el: any) =>
                              el.product?.ID === Number(id) &&
                              el.user?.id === user?.id,
                          )
                            ? router.push("/shopping-cart")
                            : handleAddToCart();
                        } else {
                          if (isLocalCartItem) {
                            router.push("/shopping-cart");
                          } else {
                            handleAddToCartLocal();
                          }
                        }
                      }}
                      className="flex mt-2 underline justify-center items-center bg-transparent lg:px-6 2xl:px-8 px-8 py-3 lg:py-3 2xl:py-3  text-primaryMain font-semibold w-full"
                    >
                      {loading === "CART" && (
                        <>
                          <CircularProgress
                            size="12px"
                            sx={{
                              marginRight: "4px",
                              height: "19px",
                              width: "18px",
                            }}
                          />
                        </>
                      )}
                      {typeof window !== "undefined" && tokens.getAccessToken()
                        ? allCartProd?.some(
                            (el: any) =>
                              el.product?.ID === Number(id) &&
                              el.user?.id === user?.id,
                          )
                          ? "Go To Cart"
                          : "Add To Cart"
                        : isLocalCartItem
                          ? "Go To Cart"
                          : "Add To Cart"}
                    </button>
                  </div>

                  {/* Profile part  */}
                  <div className="border-grey-300 rounded-lg px-3 py-3 border my-3 w-full">
                    <div className="flex  items-center my-2  justify-between">
                      <div
                        className="flex gap-1  items-center cursor-pointer"
                        onClick={() =>
                          router.push(
                            `/store-page?sellerId=${product?.wp_nepaz2_users?.id}`,
                          )
                        }
                      >
                        <Avatar
                          src={product?.wp_nepaz2_users?.avatar?.guid}
                          style={{
                            width: "60px",
                            height: "60px",
                            background: "#306cb5",
                          }}
                        >
                          {
                            getMetaValue("dokan_profile_settings")
                              ?.store_name[0]
                          }
                        </Avatar>

                        <div className="ml-2 lg:ml-1 2xl:ml-2">
                          <div className="flex gap-2">
                            <p
                              className="text-[#252525] uppercase font-semibold text-xl lg:text-[16px]  leading-6"
                              dangerouslySetInnerHTML={{
                                __html: getMetaValue("dokan_profile_settings")
                                  ?.store_name,
                              }}
                            />
                            <div className="flex items-center">
                              {Array.from({ length: 5 }).map((data, i) => {
                                return (
                                  <svg
                                    key={i}
                                    className=""
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="15"
                                    height="15"
                                    viewBox="0 0 10 10"
                                    fill="none"
                                  >
                                    <path
                                      d="M4.77249 1.1524C4.79097 1.10732 4.82244 1.06877 4.86289 1.04163C4.90335 1.01449 4.95096 1 4.99968 1C5.04839 1 5.096 1.01449 5.13646 1.04163C5.17691 1.06877 5.20838 1.10732 5.22686 1.1524L6.15524 3.38533C6.17262 3.42711 6.20119 3.46329 6.2378 3.48988C6.27442 3.51647 6.31766 3.53245 6.36276 3.53605L8.77351 3.72916C8.99152 3.74663 9.07977 4.01881 8.91375 4.1608L7.07707 5.73447C7.04276 5.76383 7.01719 5.80206 7.00316 5.84498C6.98914 5.88791 6.98744 5.93384 6.99813 5.97754L7.57088 8.34357C7.62322 8.5658 7.39147 8.74202 7.19762 8.62282L5.19173 7.39604C5.1511 7.37257 5.10625 7.35977 5.05968 7.35977C5.01311 7.35977 4.96826 7.37257 4.92763 7.39604L2.92174 8.62282C2.72789 8.74202 2.49614 8.5658 2.54848 8.34357L3.12123 5.97754C3.13191 5.93384 3.13021 5.88791 3.11619 5.84498C3.10216 5.80206 3.07659 5.76383 3.04228 5.73447L1.2056 4.1608C1.03958 4.01881 1.12783 3.74663 1.34585 3.72916L3.7566 3.53605C3.80169 3.53245 3.84493 3.51647 3.88154 3.48988C3.91815 3.46329 3.94672 3.42711 3.96411 3.38533L4.77249 1.1524Z"
                                      fill="#ffce31"
                                      stroke="currentColor"
                                      strokeWidth="0"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </svg>
                                );
                              })}
                              <p className="text-sm ml-1">({reivewCount})</p>
                            </div>
                          </div>

                          <div className="flex gap-1 my-1">
                            <SVGIcon.LocationIcon width="10px" />
                            <p className=" font-medium text-[14px] normal-case text-[#252525]">
                              {
                                getMetaValue("dokan_profile_settings")?.address
                                  ?.city
                              }
                              ,{" "}
                              {
                                getMetaValue("dokan_profile_settings")?.address
                                  ?.country
                              }
                            </p>
                          </div>
                          <div className="flex gap-3 items-center">
                            <p className=" text-[16px] normal-case">
                              <span className="text-[#252525]">
                                {product?.wp_nepaz2_users?.follower?.length}
                              </span>{" "}
                              Followers
                            </p>
                            <p className="w-[5px] h-[5px] bg-black rounded-full"></p>
                            <p className="text-[16px] normal-case">
                              <span className="text-[#252525]">
                                {product?.wp_nepaz2_users?.totalListing || 0}
                              </span>{" "}
                              Listings
                            </p>
                          </div>
                        </div>
                      </div>

                      <div
                        onClick={() =>
                          tokens.getAccessTokenCookies()
                            ? router.push(
                                `/messages?sendTo=${product?.wp_nepaz2_users?.id}&tab="newMessage"&productId=${id}`,
                              )
                            : dispatch(
                                setToastMessage({
                                  message:
                                    "Please login or register to message.",
                                  status: "error",
                                  open: true,
                                }),
                              )
                        }
                        className="bg-[#ECECFE] px-4 py-2 text-base lg:text-[14px]  text-primaryMain font-semibold normal-case h-9 rounded-lg cursor-pointer flex items-center"
                      >
                        Message seller
                      </div>
                      {/* <div className="mr-0 lg:mr-1 2xl:mr-0 mt-2 sm:mt-4">
                      <ul className="flex">
                        <li className="border-r border-black text-xs lg:text-[9px] 2xl:text-xs  font-light text-center px-2 normal-case">
                          <p>{product?.wp_nepaz2_users?.totalListing || 0}</p>
                          <p>Listings</p>
                        </li>
                        <li className="border-r border-black text-xs lg:text-[9px] 2xl:text-xs font-light text-center px-2 normal-case">
                          <p>{product?.wp_nepaz2_users?.following?.length}</p>
                          <p>Following</p>
                        </li>
                        <li className=" text-xs lg:text-[9px] 2xl:text-xs font-light text-center px-2 normal-case">
                          <p>0</p>
                          <p>Items Sold</p>
                        </li>
                      </ul>
                      <button
                        disabled={
                          loading === "FOLLOW" ||
                          product?.wp_nepaz2_users?.following?.some(
                            (el: any) => el.follower_id === user?.id,
                          )
                        }
                        onClick={() => {
                          if (!tokens.getAccessTokenCookies()) {
                            dispatch(
                              setToastMessage({
                                message: "Please login or register to follow.",
                                status: "error",
                                open: true,
                              }),
                            );
                          } else {
                            !product?.wp_nepaz2_users?.follower?.some(
                              (el: any) => el.follower_id === user?.id,
                            ) && handleFollowUser(product?.wp_nepaz2_users?.id);
                          }
                        }}
                        className="w-full relative px-6 py-1 text-white font-semibold rounded-md mt-4"
                        style={{
                          background: "#306cb5",
                        }}
                      >
                        {loading === "FOLLOW" && (
                          <>
                            <CircularProgress
                              size="15px"
                              sx={{
                                color: "#fff",
                                position: "absolute",
                                left: "20%",
                                top: "22%",
                              }}
                            />
                          </>
                        )}
                        {product?.wp_nepaz2_users?.follower?.some(
                          (el: any) => el.follower_id === user?.id,
                        )
                          ? "Followed"
                          : "Follow"}
                      </button>
                    </div> */}

                      {/* <div className="">
                      <div className="flex justify-between mb-4 gap-2 mt-4">
                        <div className="bg-orange-100 text-black font-semibold py-1 h-7 px-2 rounded-md flex items-center text-base lg:text-sm">
                          <svg
                            className="mr-2 lg:mr-1"
                            xmlns="http://www.w3.org/2000/svg"
                            width="15"
                            height="15"
                            viewBox="0 0 10 10"
                            fill="none"
                          >
                            <path
                              d="M4.77249 1.1524C4.79097 1.10732 4.82244 1.06877 4.86289 1.04163C4.90335 1.01449 4.95096 1 4.99968 1C5.04839 1 5.096 1.01449 5.13646 1.04163C5.17691 1.06877 5.20838 1.10732 5.22686 1.1524L6.15524 3.38533C6.17262 3.42711 6.20119 3.46329 6.2378 3.48988C6.27442 3.51647 6.31766 3.53245 6.36276 3.53605L8.77351 3.72916C8.99152 3.74663 9.07977 4.01881 8.91375 4.1608L7.07707 5.73447C7.04276 5.76383 7.01719 5.80206 7.00316 5.84498C6.98914 5.88791 6.98744 5.93384 6.99813 5.97754L7.57088 8.34357C7.62322 8.5658 7.39147 8.74202 7.19762 8.62282L5.19173 7.39604C5.1511 7.37257 5.10625 7.35977 5.05968 7.35977C5.01311 7.35977 4.96826 7.37257 4.92763 7.39604L2.92174 8.62282C2.72789 8.74202 2.49614 8.5658 2.54848 8.34357L3.12123 5.97754C3.13191 5.93384 3.13021 5.88791 3.11619 5.84498C3.10216 5.80206 3.07659 5.76383 3.04228 5.73447L1.2056 4.1608C1.03958 4.01881 1.12783 3.74663 1.34585 3.72916L3.7566 3.53605C3.80169 3.53245 3.84493 3.51647 3.88154 3.48988C3.91815 3.46329 3.94672 3.42711 3.96411 3.38533L4.77249 1.1524Z"
                              fill="#F59E0B"
                              stroke="currentColor"
                              strokeWidth="0.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          {product?.wp_nepaz2_users?.avgRate || 0}
                        </div>
                        <div className="bg-gray-200 text-base lg:text-[10px] 2xl:text-base text-blueTwo font-semibold py-1 h-7 px-2 rounded-md flex items-center normal-case">
                          <span className="mr-2">
                            <SVGIcon.reviewIcon />
                          </span>
                          {reivewCount || 0} Reviews
                        </div>
                      </div>
                      <div
                        onClick={() =>
                          tokens.getAccessTokenCookies()
                            ? router.push(
                                `/messages?sendTo=${product?.wp_nepaz2_users?.id}&tab="newMessage"&productId=${id}`,
                              )
                            : dispatch(
                                setToastMessage({
                                  message:
                                    "Please login or register to message.",
                                  status: "error",
                                  open: true,
                                }),
                              )
                        }
                        className="bg-primaryMain text-base lg:text-xs 2xl:text-base flex justify-center items-center text-white font-semibold normal-case h-9 rounded-lg cursor-pointer"
                      >
                        <span className="mr-2">
                          <SVGIcon.commentIcon color="gray" />
                        </span>
                        Message seller
                      </div>
                    </div> */}
                    </div>
                  </div>

                  {/* Comment Part part  */}
                  <div className="message-wrapper">
                    <ProductReview
                      reviewArray={allProdCommentList}
                      handleFav={() =>
                        allFavList.some(
                          (el: any) =>
                            el.porduct.ID === Number(id) &&
                            el.user.id === user?.id,
                        )
                          ? handleRemoveFav()
                          : handleAddToFav()
                      }
                      favCount={allFavList?.length}
                      productId={id || ""}
                      handleRefreshComments={() => handleGetAllComments()}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-7 tab_detail_section mx-4 ">
              <TabComponent
                tabs={[
                  {
                    id: "tab1",
                    label: "Description",
                    content: (
                      <div>
                        <Description product={product} />
                      </div>
                    ),
                  },
                  {
                    id: "tab2",
                    label: "Shipping",
                    content: (
                      <div>
                        <Shipping product={product} />
                      </div>
                    ),
                  },
                  {
                    id: "tab3",
                    label: "Specification",
                    content: (
                      <div>
                        <Specification
                          product={product}
                          attributes={product?.attribute_lookup}
                        />
                      </div>
                    ),
                  },
                  {
                    id: "tab4",
                    label: "Store Policies",
                    content: (
                      <div>
                        <StorePolicies product={product} />
                      </div>
                    ),
                  },

                  {
                    id: "tab5",
                    label: "Reviews",
                    content: (
                      <div>
                        <Reviews productId={id || ""} />
                      </div>
                    ),
                  },
                ]}
              />
            </div>
            {/* Other listings */}
            <div className="">
              <div className="flex my-5 pb-3 border-b-2 border-primaryMain items-center justify-start">
                <h4 className=" heading_crm_pages text-primaryMain font-bold capitalize text-2xl">
                  {getMetaValue("dokan_profile_settings")?.store_name} Other
                  listings
                </h4>
              </div>
              {otherProduct && otherProduct.length !== 0 && (
                <div className="mt-5 mb-5 gap-5 similar_card_slider">
                  <SimpleSlider items={otherCards} />
                </div>
              )}
              {otherProduct?.length === 0 && (
                <div className="mt-5 flex mb-5 gap-4">
                  {[...Array(5)].map((index) => (
                    <>
                      <div className="">
                        <SkeletonProductCard />
                      </div>
                    </>
                  ))}
                </div>
              )}
              {!otherProduct && (
                <div className="mt-5 mb-5 gap-5">
                  <div className="mx-3 flex justify-center">
                    <SVGIcon.NoDataIcon />
                  </div>
                </div>
              )}
            </div>
            <div className="flex items-center justify-center">
              <Benefits />
            </div>
            <div className="mb-20 mt-16">
              <div className="flex my-5 pb-3 border-b-2 border-primaryMain items-center justify-start">
                <h4 className=" heading_crm_pages text-primaryMain font-bold capitalize text-2xl">
                  Similar Items You Might Also Like
                </h4>
              </div>
              {similarProduct && similarProduct.length !== 0 && (
                <div className="mt-5 mb-5 gap-5 similar_card_slider">
                  <SimpleSlider items={similarCards} />
                </div>
              )}
              {similarProduct?.length === 0 && (
                <div className="mt-5 flex mb-5 gap-4">
                  {[...Array(5)].map((index) => (
                    <>
                      <div className="">
                        <SkeletonProductCard />
                      </div>
                    </>
                  ))}
                </div>
              )}
              {!similarProduct && (
                <div className="mt-5 mb-5 gap-5">
                  <div className="mx-3 flex justify-center">
                    <SVGIcon.NoDataIcon />
                  </div>
                </div>
              )}
            </div>
          </div>
          <Snackbar
            open={snackbar.open}
            autoHideDuration={6000}
            onClose={handleCloseSnackbar}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <Alert
              severity={snackbar.severity}
              sx={{
                textTransform: "none",
                borderRadius: "30px", // Custom border radius
                padding: "16px", // Padding inside the Alert
                position: "relative", // To position the progress bar at the bottom
              }}
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={handleCloseSnackbar}
                >
                  <SVGIcon.crossIcon />
                </IconButton>
              }
            >
              {snackbar.message}
              {/* Box wrapping the progress bar */}
              <Box
                sx={{
                  position: "absolute",
                  bottom: 0,
                  left: "20px",
                  right: "20px",
                  height: "4px", // Height of the progress bar
                }}
              >
                {/* Progress bar at the bottom */}
                <LinearProgress
                  color={snackbar.severity}
                  variant="determinate"
                  value={80}
                />
              </Box>
            </Alert>
          </Snackbar>

          <ShareModal
            isOpen={isShareModalOpen}
            onClose={handleShareCloseModal}
            shareUrl={`${window.location.protocol}//${window.location.host}/search-detail?id=${id}`}
          />
        </div>
      </div>
    </>
  );
}
