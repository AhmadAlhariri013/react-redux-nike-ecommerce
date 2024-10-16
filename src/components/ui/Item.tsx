import { ShoppingBagIcon, StarIcon } from "@heroicons/react/24/solid";
import { IItemProps } from "../../types/types";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  setAddItemToCart,
  toggleCart,
} from "../../app/features/cart/cartSlice";
import { HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconFull } from "@heroicons/react/24/solid";
import {
  selectWishlistItems,
  setToggleItemToWishlist,
} from "../../app/features/wishlist/wishlistSlice";
import { useMemo } from "react";

export const Item = ({
  ifExists,
  item: { id, color, shadow, title, text, img, btn, rating, price },
}: IItemProps) => {
  const cartState = useAppSelector((state) => state.cart.cartState);
  const wishlistItems = useAppSelector(selectWishlistItems);
  const dispatch = useAppDispatch();

  const onCartToggle = () => {
    dispatch(toggleCart(!cartState));
  };
  const onAddToCart = () => {
    const item = { id, title, text, img, color, shadow, price };
    dispatch(setAddItemToCart(item));
  };

  const onToggleToWishlist = () => {
    const item = { id, title, text, img, color, shadow, price };
    dispatch(setToggleItemToWishlist(item));
  };

  // Memoize the check for whether the item is in the wishlist
  const isInWishlist = useMemo(() => {
    return wishlistItems.some((item) => item.id === id);
  }, [id, wishlistItems]);

  return (
    //   Item Container
    <div
      className={`relative bg-gradient-to-b  ${color} ${shadow} grid items-center ${
        ifExists ? "justify-items-start" : "justify-items-center"
      } rounded-xl py-4 px-5 transition-all duration-700 ease-in-out w-full hover:scale-105`}
    >
      {/* Text Container */}
      <div
        className={`grid items-center ${
          ifExists ? "justify-items-start" : "justify-items-center"
        }`}
      >
        {/* Header */}
        <h1 className="text-slate-200 text-xl lg:text-lg md:text-base font-medium filter drop-shadow">
          {title}
        </h1>
        <p className="text-slate-200 filter drop-shadow text-base md:text-sm font-normal">
          {text}
        </p>
        {/* Price & Rating */}
        <div className="flex items-center justify-between w-28 my-2">
          <div className="flex items-center bg-white/80  px-1 rounded blur-effect-theme">
            <h1 className="text-black text-sm font-medium">${price}</h1>
          </div>
          <div className="flex items-center gap-1">
            <StarIcon className="icon-style w-5 h-5 md:w-4 md:h-4" />
            <h1 className="md:text-sm font-normal text-slate-100">{rating}</h1>
          </div>
        </div>
        {/* Shopping Buttons */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="bg-white/90 blur-effect-theme button-theme p-0.5 shadow shadow-sky-200"
            onClick={onAddToCart}
          >
            <ShoppingBagIcon className="icon-style text-slate-900" />
          </button>
          <button
            type="button"
            className="bg-white/90 blur-effect-theme button-theme px-2 py-1 shadow shadow-sky-200 text-sm text-black"
            onClick={() => {
              onAddToCart();
              onCartToggle();
            }}
          >
            {btn}
          </button>

          <button
            type="button"
            className="bg-white/90 blur-effect-theme button-theme p-0.5 shadow shadow-sky-200 text-center"
            onClick={() => {
              onToggleToWishlist();
            }}
          >
            {isInWishlist ? (
              <HeartIconFull className="icon-style text-red-700" />
            ) : (
              <HeartIcon className="icon-style text-slate-700" />
            )}
          </button>
        </div>
      </div>
      {/* Image Container */}
      <div
        className={`flex items-center ${
          ifExists ? "absolute top-5 right-1" : "justify-center mt-1.5"
        }`}
      >
        <img
          src={img}
          alt={`img/item-img/${id}`}
          className={`transitions-theme hover:-rotate-12 ${
            ifExists
              ? "h-auto w-64 lg:w-56 md:w-48 -rotate-[35deg]"
              : "h-36 w-64"
          }`}
        />
      </div>
    </div>
  );
};
