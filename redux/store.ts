import { combineReducers, configureStore } from "@reduxjs/toolkit";
import globalCacheReducer from "./slices/globaCache.slice";
import productReducer from "./slices/product.slice";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import { persistReducer } from "redux-persist";
import { WebStorage } from "redux-persist/lib/types";
export function createPersistStorage(): WebStorage {
  const isServer = typeof window === "undefined";

  // Returns noop (dummy) storage.
  if (isServer) {
    return {
      getItem() {
        return Promise.resolve(null);
      },
      setItem() {
        return Promise.resolve();
      },
      removeItem() {
        return Promise.resolve();
      },
    };
  }

  return createWebStorage("local");
}

const persistConfig = {
  timeout: 2000,
  key: "root",
  storage: createPersistStorage(),
  whitelist: ["globalCache"],
};
const rootReducers = combineReducers({
  globalCache: globalCacheReducer,
  products: productReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducers);
export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
