import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICartItemProps, IWishlistInitialState } from "../../../types/types";
import toast from "react-hot-toast";

const initialState: IWishlistInitialState = {
  wishlistState: false,
  wishlistItems: [],
  wishlistItemsCount: 0,
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    toggleWishlist: (
      state: IWishlistInitialState,
      action: PayloadAction<boolean>
    ) => {
      state.wishlistState = action.payload;
    },

    setToggleItemToWishlist: (
      state: IWishlistInitialState,
      action: PayloadAction<ICartItemProps>
    ) => {
      const itemIndex = state.wishlistItems.findIndex(
        (item) => item.id === action.payload.id
      );

      if (itemIndex >= 0) {
        // Item exists, remove it
        state.wishlistItems.splice(itemIndex, 1);
        toast.success(`${action.payload.title} removed from your wishlist`);
      } else {
        // Item does not exist, add it
        state.wishlistItems.push(action.payload);
        toast.success(`${action.payload.title} added to your wishlist`);
      }
    },
  },
});

// Selector to get total items count in the wishlist
export const selectWishlistCount = (state: {
  wishlist: IWishlistInitialState;
}) => state.wishlist.wishlistItems.length;

export const selectWishlistItems = (state: {
  wishlist: IWishlistInitialState;
}) => state.wishlist.wishlistItems;

export const selectWishlistState = (state: {
  wishlist: IWishlistInitialState;
}) => state.wishlist.wishlistState;

export const { toggleWishlist, setToggleItemToWishlist } =
  wishlistSlice.actions;

export default wishlistSlice.reducer;
