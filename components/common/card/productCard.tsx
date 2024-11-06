import { tokens } from "@/helpers/jwtTokenFunction";
import IMAGES from "@/public/images";
// import SVG from "@/public/svg";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setToastMessage } from "@/redux/slices/globaCache.slice";
//import { AuthApi } from "@fizno/api-client/src/apis/AuthApi";
//import pinIcon from "../../../assets/images/pin-icon.png";
import {
  productStateSelector,
  setCartCount,
} from "@/redux/slices/product.slice";

import { UserApi } from "@fizno/api-client/src/apis/UserApi";
import { CircularProgress } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface follower {
  follower_id: number;
  id: number;
  vendor_id: number;
}

// Define the props interface
interface ProductCardProps {
  type?: "gridView" | "listView";
  product: {
    id?: number;
    image: string;
    likes: string;
    comments: string;
    shares: string;
    title: string;
    condition: string;
    salePrice: string;
    price: string;
    shipping: string;
    sellerImage: string;
    sellerName: string;
    sellerId: number;
    location: string;
    rating: string;
    stock: number;
    follower?: follower[];
    userId?: number;
  };
  handleRefreshFavList?: () => void;
  handleRefreshCartList?: () => void;
}

// Update the component to accept props
export default function ProductCard({
  type,
  product,
  // handleRefreshFavList,
  handleRefreshCartList,
}: ProductCardProps) {
  /**
   * router
   */

  const router = useRouter();
  //const searchParams = useSearchParams();
  //const id = searchParams.get("id");
  /**
   * redux
   */
  const dispatch = useAppDispatch();
  const [userId, setUserId] = useState(product.userId || "");
  const { allCartProducts } = useAppSelector(productStateSelector);

  /**
   * state management
   */
  const [imageSrc, setImageSrc] = useState<any>(product.image);
  const [isLocalCartItem, setIsLocalCartItem] = useState<boolean>(false);
  const [cardLoading, setCardLoading] = useState<"BUY" | "CART" | "FAV" | "">(
    "",
  );
  //const [, setUserDetail] = useState<any>();
  //const [, setLoading] = useState(true);

  /**
   * handle remove favorite
   */
  // const handleRemoveFav = async (productId: number) => {
  //   if (typeof window !== "undefined" && tokens.getAccessToken()) {
  //     const payload = {
  //       productId,
  //     };
  //     setCardLoading("FAV");

  //     const response = await UserApi.removeFavoriteAPI(payload);
  //     if (response.remote === "success") {
  //       setCardLoading("");
  //       handleRefreshFavList && handleRefreshFavList();
  //       dispatch(
  //         setToastMessage({
  //           message: "Product removed from favorite.",
  //           status: "success",
  //           open: true,
  //         }),
  //       );
  //     } else {
  //       setCardLoading("");
  //       dispatch(
  //         setToastMessage({
  //           message: response.error.errors.message || "An error occurred!",
  //           status: "error",
  //           open: true,
  //         }),
  //       );
  //     }
  //   } else {
  //     dispatch(
  //       setToastMessage({
  //         message: "To mark product favorite, please login.",
  //         status: "error",
  //         open: true,
  //       }),
  //     );
  //   }
  // };

  /**
   * get user details
   */

  /*const getUserById = async () => {
    try {
      const response = await AuthApi.getUserById(id as string);
      if (response.remote === "success") {
        setUserDetail(response.data.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };*/

  /**
   * handle follow user
   */

  /* const handleFollowUser = async (userId: number) => {
    const payload = { userId };
    dispatch(setIsLoading(true));
    const response = await UserApi.followUserAPI(payload);

    if (response.remote === "success") {
      dispatch(setIsLoading(false));
      getUserById();
    } else {
      dispatch(setIsLoading(false));
      dispatch(
        setToastMessage({
          message: response.error.errors.message || "An error occurred!",
          open: true,
          status: "error",
        }),
      );
    }
  }; */

  /**
   * handle add to fav
   */

  // const handleAddToFav = async (productId: number) => {
  //   if (typeof window !== "undefined" && tokens.getAccessToken()) {
  //     const payload = { productId };
  //     setCardLoading("FAV");
  //     const response = await UserApi.addToFavoriteAPI(payload);

  //     if (response.remote === "success") {
  //       setCardLoading("");
  //       handleRefreshFavList && handleRefreshFavList();
  //       dispatch(
  //         setToastMessage({
  //           message: "Product added to favorite.",
  //           status: "success",
  //           open: true,
  //         }),
  //       );
  //     } else {
  //       setCardLoading("");
  //       dispatch(
  //         setToastMessage({
  //           message: response.error.errors.message || "An error occurred!",
  //           status: "error",
  //           open: true,
  //         }),
  //       );
  //     }
  //   } else {
  //     dispatch(
  //       setToastMessage({
  //         message: "To mark product favorite, please login",
  //         status: "error",
  //         open: true,
  //       }),
  //     );
  //   }
  // };

  /**
   * handle add to cart
   */

  const handleAddToCart = async (productId: number, isBuy = false) => {
    if (typeof window !== "undefined" && tokens.getAccessToken()) {
      const payload = { productId, quantity: 1 };
      setCardLoading(isBuy ? "BUY" : "CART");
      const response = await UserApi.addToCartAPI(payload);

      if (response.remote === "success") {
        setCardLoading("");
        handleRefreshCartList && handleRefreshCartList();
        isBuy && router.push("/shopping-cart");
        dispatch(
          setToastMessage({
            message: "Product added to Cart.",
            status: "success",
            open: true,
          }),
        );
      } else {
        setCardLoading("");
        dispatch(
          setToastMessage({
            message: response.error.errors.message || "An error occurred!",
            status: "error",
            open: true,
          }),
        );
      }
    } else {
      dispatch(
        setToastMessage({
          message: "You are not logged in yet, please login.",
          status: "error",
          open: true,
        }),
      );
    }
  };

  // const handleFav = () => {
  //   if (product.id) {
  //     allFavoriteProducts.some((el: any) => el?.id === product?.id)
  //       ? handleRemoveFav(product.id)
  //       : handleAddToFav(product.id);
  //   }
  // };

  const isLocalCartProductExist = () => {
    if (typeof window !== "undefined") {
      const localCartData = localStorage.getItem("localCart");
      if (localCartData) {
        const isExist = JSON.parse(localCartData)?.some(
          (el: any) => el.title === product?.title,
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

  /**
   * handle add to cart local
   */

  const handleAddToCartLocal = (isBuy = false) => {
    const data = {
      title: product?.title,
      price: product?.salePrice,
      image: product?.image,
      stocks: product?.stock,
      quantity: 1,
      storeName: product.sellerName,
      productId: product?.id,
      sellerId: product?.sellerId,
    };
    if (typeof window !== "undefined") {
      const localCart = localStorage.getItem("localCart");
      if (localCart) {
        const isExist = JSON.parse(localCart)?.find(
          (el: any) => el.productId === data.productId,
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

  useEffect(() => {
    if (typeof window !== "undefined") {
      isLocalCartProductExist();
    }
  }, []);

  useEffect(() => {
    if (product.userId && product.userId !== userId) {
      setUserId(product.userId);
    }
  }, [product.userId, userId]);

  return (
    <div
      className={`product_card border-[1.54px] p-3 border-[#F0F0F0] rounded-lg relative ${type === "listView" ? "flex w-full" : "block"}`}
    >
      <div
        className={`${type === "listView" ? " border-r pr-3 mr-3" : "text-center"} `}
      >
        <div
          className={`${type === "listView" ? "pr-3" : "text-center"} cursor-pointer `}
          onClick={() => router.push(`/search-detail?id=${product.id}`)}
          // style={{
          //   background:
          //     "linear-gradient(90deg, #D0E4F7 0%, #D0E4F7 50%, #D0E4F7 100%)",
          // }}
        >
          {/*<div className="relative">
            <Image*/}
          {/*  src={imageSrc}*/}
          {/*  width={220}*/}
          {/*  height={199}*/}
          {/*  alt={product.title}*/}
          {/*  className=" rounded w-full h-[199px] object-cover object-top"*/}
          {/*  onError={() => setImageSrc(IMAGES.dummyProduct)}*/}
          {/*  loading="eager"*/}
          {/*/>*/}
          <Image
            src={imageSrc}
            width={199}
            height={199}
            alt={product.title}
            className="rounded-lg w-full h-auto max-w-[199px] max-h-[199px] object-cover"
            onError={() => setImageSrc(IMAGES.dummyProduct)}
            loading="eager"
          />
          {/* <LazyLoadImage
            src={imageSrc}
            width={199}
            height={199}
            alt={product.title}
            className=" rounded-lg w-full h-[199px]"
            onError={() => setImageSrc(IMAGES.dummyProduct)}
            effect="blur"
            wrapperProps={{
              style: { transitionDelay: "2s" },
            }}
          /> */}
        </div>
      </div>

      {/* buy and cart  */}
      <div className="py-2 w-full">
        <div
          className={`relative ${type === "listView" ? "flex w-full justify-between" : "block"}`}
        >
          <div className={`${type === "listView" ? "w-6/12" : "w-full"}`}>
            <div className="h-14 ">
              <h5
                className="text-[#252525] font-semibold  mb-3  text-sm !leading-4 cursor-pointer overflow-hidden text-ellipsis line-clamp-3 capitalize !text-[14px]"
                onClick={() => router.push(`/search-detail?id=${product.id}`)}
              >
                {product.title}
              </h5>
            </div>
            <div className="flex items-baseline gap-2">
              <h4 className="text-xl text-black font-bold">
                {product.salePrice || "$0"}
              </h4>
              {product.price !== "$0" && (
                <p className="text-[#666666] text-[12px] normal-case line-through">
                  {product.price}
                </p>
              )}
            </div>
            <p className="text-zinc-400 text-[12px] normal-case py-1">
              {product.shipping}
            </p>

            {/*
            <div className="justify-between items-center my-2 card-av-wrapper">
              <div
                className="flex items-center cursor-pointer"
                onClick={() =>
                  router.push(`store-page?sellerId=${product.sellerId}`)
                }
              >
                <Avatar
                  src={product?.sellerImage}
                  sx={{ background: "#306cb5" }}
                >
                  <button
                    disabled={!tokens.getAccessToken()}
                    onClick={(e) => {
                      e.stopPropagation();
                      product.sellerId &&
                        handleFollowUser(Number(product.sellerId));
                    }}
                    className="absolute top-[-4px] right-[-5px]"
                  >
                    {product?.follower?.some(
                      (el: any) =>
                        Number(el?.follower_id) === Number(product?.userId),
                    ) ? (
                      <svg
                        className="w-[18px] h-[18px] fill-[#24b21d]"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                      >
                        <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z" />
                      </svg>
                    ) : (
                      <svg
                        className="w-[18px] h-[18px] fill-[red]"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                      >
                        <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM232 344l0-64-64 0c-13.3 0-24-10.7-24-24s10.7-24 24-24l64 0 0-64c0-13.3 10.7-24 24-24s24 10.7 24 24l0 64 64 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-64 0 0 64c0 13.3-10.7 24-24 24s-24-10.7-24-24z" />
                      </svg>
                    )}
                  </button>
                  {product?.sellerName[0] || ""}
                </Avatar>

                <div className="ml-2">
                  <p
                    className="text-[#0066cc] font-bold text-[16px] normal-case truncate"
                    dangerouslySetInnerHTML={{
                      __html: product.sellerName,
                    }}
                  />
                  <p className="text-[14px] font-medium normal-case truncate ">
                    <span>
                      <Image
                        alt="pin icon"
                        className="w-[6px] mr-1"
                        src={pinIcon}
                      />
                    </span>
                    {product.location}
                  </p>
                </div>
              </div>
              {/*
              <div className="bg-orange-100 text-yellow-600 font-semibold py-1 h-7 px-2 rounded-md flex items-center">
                <svg
                  className="mr-2"
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
                {product.rating}
              </div>
            </div>
            */}
          </div>
          <div
            className={` mt-1 gap-3 hidden md:flex ${type === "listView" ? "block text-end w-3/12" : "flex"}`}
          >
            <button
              disabled={cardLoading === "BUY"}
              onClick={() => {
                if (typeof window !== "undefined" && tokens.getAccessToken()) {
                  allCartProducts.some(
                    (el: any) => el?.product?.ID === product.id,
                  )
                    ? router.push("/shopping-cart")
                    : handleAddToCart(Number(product.id), true);
                } else {
                  handleAddToCartLocal(true);
                }
              }}
              className={`text-[14px] relative bg-primaryMain text-white  border border-[#3A4980] h-9 px-4 rounded-[5px] ${type === "listView" ? "w-full" : "w-6/12"}`}
            >
              {cardLoading === "BUY" && (
                <>
                  <CircularProgress
                    size="12px"
                    sx={{
                      color: "#fff",
                      position: "absolute",
                      left: "3px",
                      top: "35%",
                    }}
                  />
                </>
              )}
              Buy Now
            </button>
            {/* <div className="flex justify-end"> */}
            <button
              disabled={cardLoading === "CART"}
              onClick={() => {
                if (typeof window !== "undefined" && tokens.getAccessToken()) {
                  allCartProducts.some(
                    (el: any) => el?.product?.ID === product.id,
                  )
                    ? router.push("/shopping-cart")
                    : handleAddToCart(Number(product.id));
                } else {
                  if (isLocalCartItem) {
                    router.push("/shopping-cart");
                  } else {
                    handleAddToCartLocal();
                  }
                }
              }}
              className={`text-[14px]  bg-transparent text-primaryMain font-semibold border border-primaryMain h-9 rounded-[5px] ${type === "listView" ? "w-full mt-4" : "w-6/12"}`}
            >
              {" "}
              <span className=" justify-center flex  items-center">
                {cardLoading === "CART" && (
                  <>
                    <CircularProgress
                      size="10px"
                      sx={{ marginRight: "4px", height: "14px", width: "12px" }}
                    />
                  </>
                )}
                {typeof window !== "undefined" && tokens.getAccessToken()
                  ? allCartProducts.some(
                      (el: any) => el?.product?.ID === product.id,
                    )
                    ? "Go To Cart"
                    : "Add To Cart"
                  : isLocalCartItem
                    ? "Go To Cart"
                    : "Add To Cart"}
              </span>{" "}
            </button>
            {/* </div> */}
          </div>
          <ul className="flex bottom-0 justify-between mt-3 border-t  pt-3">
            <li className="text-gray-400 flex items-center text-xs">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 14"
                // fill={`${product.likes > "0" ? "#e54b4d" : "none"}`}
                fill="none"
                className="mr-1 cursor-pointer"
              >
                <path
                  d="M8.4135 13.8733C8.18683 13.9533 7.8135 13.9533 7.58683 13.8733C5.6535 13.2133 1.3335 10.46 1.3335 5.79332C1.3335 3.73332 2.9935 2.06665 5.04016 2.06665C6.2535 2.06665 7.32683 2.65332 8.00016 3.55998C8.6735 2.65332 9.7535 2.06665 10.9602 2.06665C13.0068 2.06665 14.6668 3.73332 14.6668 5.79332C14.6668 10.46 10.3468 13.2133 8.4135 13.8733Z"
                  stroke="#737373"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="font-semibold text-[14px]">
                {product.likes}{" "}
              </span>{" "}
            </li>
            <li className="text-gray-400 flex items-center text-xs">
              <svg
                className="mr-1 cursor-pointer"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 14"
                fill="none"
              >
                <path
                  d="M5.66683 12.6666H5.3335C2.66683 12.6666 1.3335 12 1.3335 8.66665V5.33331C1.3335 2.66665 2.66683 1.33331 5.3335 1.33331H10.6668C13.3335 1.33331 14.6668 2.66665 14.6668 5.33331V8.66665C14.6668 11.3333 13.3335 12.6666 10.6668 12.6666H10.3335C10.1268 12.6666 9.92683 12.7666 9.80016 12.9333L8.80016 14.2666C8.36016 14.8533 7.64016 14.8533 7.20016 14.2666L6.20016 12.9333C6.0935 12.7866 5.84683 12.6666 5.66683 12.6666Z"
                  stroke="#737373"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M4.6665 5.33331H11.3332"
                  stroke="#737373"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M4.6665 8.66669H8.6665"
                  stroke="#737373"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="font-semibold text-[14px]">
                {product.comments}{" "}
              </span>{" "}
            </li>
            <li className="text-gray-400 flex items-center text-xs">
              <svg
                className="mr-1 cursor-pointer"
                xmlns="http://www.w3.org/2000/svg"
                width="17"
                height="18"
                viewBox="0 0 16 14"
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
              <span className="font-semibold text-[14px]">
                {product.shares}
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
