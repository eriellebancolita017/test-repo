/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prettier/prettier */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../redux/store";

interface ProductsInitialState {
  attributes: any;
  loading: boolean;
  reload: boolean;
  hardReload: boolean;
  cartCount: number;
  allCartProducts: any;
  allFavoriteProducts: any;
}

const initialState: ProductsInitialState = {
  attributes: {},
  loading: false,
  reload: false,
  hardReload: false,
  cartCount: 0,
  allCartProducts: [],
  allFavoriteProducts: [],
  // userClaims: undefined,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setAttributes: (state, action: PayloadAction<any>) => {
      return { ...state, attributes: action.payload };
    },
    setGlobalLoading: (state, action: PayloadAction<any>) => {
      return { ...state, loading: action.payload };
    },
    setReload: (state, action: PayloadAction<any>) => {
      return { ...state, loading: action.payload };
    },
    setHardReload: (state, action: PayloadAction<any>) => {
      return { ...state, hardReload: action.payload };
    },
    setCartCount: (state, action: PayloadAction<number>) => {
      state.cartCount = action.payload;
    },
    setAllCartProduct: (state, action: PayloadAction<any>) => {
      state.allCartProducts = action.payload;
    },

    setAllFavoriteProducts: (state, action: PayloadAction<any>) => {
      state.allFavoriteProducts = action.payload;
    },
  },
});

export const {
  setAttributes,
  setGlobalLoading,
  setReload,
  setHardReload,
  setCartCount,
  setAllFavoriteProducts,
  setAllCartProduct,
} = productSlice.actions;

export const productStateSelector = (state: RootState) => state.products;
export default productSlice.reducer;
