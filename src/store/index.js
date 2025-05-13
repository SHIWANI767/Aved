import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { encryptTransform } from "redux-persist-transform-encrypt";
import userReducer from "./slices/userSlice";
import cartReducer from "./slices/cartSlice";
import availablePropertySlice from "./slices/availablePropertySlice";
import blogReducer from "./slices/blogSlice";
 
// Combine Reducers
const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  property: availablePropertySlice,
  blog:blogReducer
});

// Encryption Transform
// const encryptor ;

// Persist Config
const persistConfig = {
  key: "root",
  storage,
  transforms: [
    encryptTransform({
      secretKey: "donotsee", // Use a strong key
      onError: function (error) {
        console.error("Encryption error:", error);
      },
    }),
  ], // Use `encryptTransform`
};

// Persisted Reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Required to prevent warnings
    }),
});

// Persistor
export const persistor = persistStore(store);
