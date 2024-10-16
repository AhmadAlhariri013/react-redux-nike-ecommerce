import { combineReducers, configureStore } from "@reduxjs/toolkit";
import cartSlice from "./features/cart/cartSlice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import wishlistSlice from "./features/wishlist/wishlistSlice";

const rootPersistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"],
};

const cartPersistConfig = {
  key: "cart",
  storage,
  whitelist: ["cartItems"],
};

const wishlistPersistConfig = {
  key: "wishlist",
  storage,
  whiteList: ["wishlistItems"],
};

const rootReducer = combineReducers({
  cart: persistReducer(cartPersistConfig, cartSlice),
  wishlist: persistReducer(wishlistPersistConfig, wishlistSlice),
});

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

const persistor = persistStore(store);

export { store, persistor };
