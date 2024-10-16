import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICartInitialState, ICartItemProps } from "../../../types/types";
import toast from "react-hot-toast";

const initialState: ICartInitialState = {
  cartState: false,
  cartItems: [],
  cartTotalAmount: 0,
  cartTotalQantity: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    toggleCart: (state: ICartInitialState, action: PayloadAction<boolean>) => {
      state.cartState = action.payload;
    },
    setAddItemToCart: (
      state: ICartInitialState,
      action: PayloadAction<ICartItemProps>
    ) => {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );

      const item = state.cartItems[itemIndex];
      if (item) {
        if ((item.cartQuantity ?? 0) < 10) {
          item.cartQuantity = (item.cartQuantity ?? 0) + 1;
          toast.success(`Item QTY Increased`);
        } else {
          toast.error(
            ` You reached the maximum quantity for this item${action.payload.title} `
          );
        }
      } else {
        const temp = { ...action.payload, cartQuantity: 1 };
        state.cartItems.push(temp);

        toast.success(`${action.payload.title} added to Cart`);
      }
    },
    setGetTotals: (state) => {
      console.log("setGetTotals");
      let { totalAmount, totalQTY } = state.cartItems.reduce(
        (cartTotal, cartItem) => {
          const { price, cartQuantity } = cartItem;
          const totalPrice = price * (cartQuantity ?? 0);

          cartTotal.totalAmount += totalPrice;
          cartTotal.totalQTY += cartQuantity ?? 0;

          return cartTotal;
        },
        {
          totalAmount: 0,
          totalQTY: 0,
        }
      );

      state.cartTotalAmount = totalAmount;
      state.cartTotalQantity = totalQTY;
    },

    setRemoveItemFromCart: (state, action) => {
      const removeItem = state.cartItems.filter(
        (item) => item.id !== action.payload.id
      );

      state.cartItems = removeItem;
      toast.success(`${action.payload.title} Removed From Cart`);
    },

    setIncreaseItemQTY: (state, action) => {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );

      const item = state.cartItems[itemIndex];
      if (item) {
        if ((item.cartQuantity ?? 0) < 10) {
          item.cartQuantity = (item.cartQuantity ?? 0) + 1;
          toast.success(`Item QTY Increased`);
        } else {
          toast.error(
            ` You reached the maximum quantity for this item${action.payload.title} `
          );
        }
      }
      //   localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },
    setDecreaseItemQTY: (state, action) => {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );

      if (
        state.cartItems[itemIndex] &&
        (state.cartItems[itemIndex].cartQuantity ?? 0) > 1
      ) {
        state.cartItems[itemIndex].cartQuantity =
          (state.cartItems[itemIndex].cartQuantity ?? 0) - 1;
        toast.success(`Item QTY Decreased`);
      } else {
        // Optionally remove the item if quantity reaches zero
        state.cartItems = state.cartItems.filter(
          (item) => item.id !== action.payload.id
        );
        toast.success(`${action.payload.title} Removed From Cart`);
      }
    },

    setClearCartItems: (state) => {
      state.cartItems = [];
      toast.success(`Cart Cleared`);
    },
  },
});

export const {
  toggleCart,
  setAddItemToCart,
  setGetTotals,
  setIncreaseItemQTY,
  setRemoveItemFromCart,
  setClearCartItems,
  setDecreaseItemQTY,
} = cartSlice.actions;

export default cartSlice.reducer;
