import { useAppDispatch, useAppSelector } from "../app/hooks";
import CartEmpty from "./cart/CartEmpty";
import CartItem from "./cart/CartItem";
import {
  selectWishlistCount,
  selectWishlistItems,
  selectWishlistState,
  toggleWishlist,
} from "../app/features/wishlist/wishlistSlice";
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/24/outline";

const Wishlist = () => {
  const wishlistState = useAppSelector(selectWishlistState);
  const wishlistItems = useAppSelector(selectWishlistItems);
  const totalQTY = useAppSelector(selectWishlistCount);

  const dispatch = useAppDispatch();

  const onWishlistoggle = () => {
    dispatch(toggleWishlist(!wishlistState));
  };

  return (
    <div
      className={`fixed top-0 left-0 right-0 bottom-0 blur-effect-theme duration-500 w-full h-screen opacity-100 z-[250] ${
        wishlistState
          ? "opacity-100 visible translate-x-0"
          : "opacity-0 invisible -translate-x-8"
      }`}
    >
      <div
        className={`blur-effect-theme duration-500 h-screen max-w-xl w-full absolute left-0 ${
          wishlistState
            ? "opacity-100 visible translate-x-0"
            : "opacity-0 invisible -translate-x-8"
        }`}
      >
        <div className="bg-white h-11 flex items-center justify-between px-3 sticky top-0 left-0 right-0 w-full">
          <div className="flex items-center gap-3 flex-row-reverse justify-between w-full">
            <div
              className="grid items-center cursor-pointer"
              onClick={onWishlistoggle}
            >
              <ChevronDoubleRightIcon className="w-5 h-5 text-slate-900 hover:text-orange-500 stroke-[2]" />
            </div>
            <div className="grid items-center justify-center">
              <h1 className="text-base font-medium text-slate-900">
                Your Wishlist{" "}
                <span className="bg-theme-cart rounded px-1 py-0.5 text-slate-100 font-normal text-sm">
                  ({totalQTY} Items)
                </span>
              </h1>
            </div>
          </div>
        </div>

        {wishlistItems?.length === 0 ? (
          <CartEmpty onCartToggle={onWishlistoggle} />
        ) : (
          <div>
            <div className="flex items-start justify-start flex-col gap-y-7 lg:gap-y-5 overflow-y-scroll h-[81vh] scroll-smooth scroll-hidden py-3">
              {wishlistItems?.map((item, i) => (
                <CartItem key={i} items={item} isWishlist={true} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
