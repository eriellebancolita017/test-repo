/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { JWTUserClaims } from "../../helpers/token";
import { RootState } from "../../redux/store";
interface GlobalCacheInitialState {
  user: any;
  userId: string;
  accessToken: string;
  userExtension: string;
  stepOne: any;
  secondStep: any;
  // userClaims: JWTUserClaims | undefined | null;
  isLoading: boolean;
  toastMessage: {
    message: string;
    status: "error" | "success";
    open: boolean;
  };
  refreshProfile: any;
  deliveryLocation: string;
}

const initialState: GlobalCacheInitialState = {
  user: undefined,
  userId: "",
  accessToken: "",
  userExtension: "",
  stepOne: undefined,
  secondStep: {
    storeName: "",
    storeAddress: {
      street: "",
      street2: "",
      city: "",
      postalCode: "",
      country: "",
      state: "",
      ein: "",
      primaryPhoneNumber: "",
      businessContactNumber: "",
    },
  },
  isLoading: false,
  toastMessage: {
    message: "",
    status: "error",
    open: false,
  },
  refreshProfile: 0,
  deliveryLocation: "",
  // userClaims: undefined,
};

const globalCacheSlice = createSlice({
  name: "globalCache",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<any>) => {
      return { ...state, user: action.payload };
    },
    setUserId: (state, action: PayloadAction<string>) => {
      state.userId = action.payload;
    },
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
    setUserExtension: (state, action: PayloadAction<string>) => {
      state.userExtension = action.payload;
    },
    setStepOne: (state, action: PayloadAction<any>) => {
      state.stepOne = action.payload;
    },
    setSecondStep: (state, action: PayloadAction<any>) => {
      state.secondStep = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setToastMessage: (
      state,
      action: PayloadAction<{
        message: string;
        status: "error" | "success";
        open: boolean;
      }>,
    ) => {
      state.toastMessage = action.payload;
    },
    refreshProfile: (state, action: PayloadAction<any>) => {
      state.refreshProfile = action.payload;
    },
    setDeliveryLocation: (state, action: PayloadAction<string>) => {
      state.deliveryLocation = action.payload;
    },
  },
});

export const {
  setUser,
  setUserId,
  setAccessToken,
  setUserExtension,
  setStepOne,
  setSecondStep,
  setIsLoading,
  setToastMessage,
  refreshProfile,
  setDeliveryLocation,
} = globalCacheSlice.actions;

export const globalCacheStateSelector = (state: RootState) => state.globalCache;
export default globalCacheSlice.reducer;
