export interface IHeroProps {
  title: string;
  subTitle: string;
  btnText: string;
  img: string;
  videos: { imgsrc: string; clip: string }[];
  socialLinks: { icon: string }[];
}

export interface ISalesProps {
  ifExists?: boolean;
  endpoint: {
    title: string;
    items: ICartItemProps[];
  };
}

export interface IStoriesProps {
  title: string;
  news: {
    title: string;
    text: string;
    img: string;
    url: string;
    like: string;
    time: string;
    by: string;
    btn: string;
  }[];
}

export interface IFlexContentProps {
  ifExists?: boolean;
  endpoint: {
    heading: string;
    title: string;
    text: string;
    btn: string;
    url: string;
    img: string;
  };
}

export interface IFooterProps {
  footerAPI: {
    titles: { title: string }[];
    links: { link: string }[][];
  };
}
export interface IClipsProps {
  clip: string;
  imgsrc: string;
}

export interface ISocialLinksProps {
  icon: string;
}

export interface IItemProps {
  ifExists: boolean | undefined;
  item: ICartItemProps;
}

export interface ICartInitialState {
  cartState: boolean;
  cartItems: ICartItemProps[];
  cartTotalAmount: number;
  cartTotalQantity: number;
}
export interface IWishlistInitialState {
  wishlistState: boolean;
  wishlistItems: ICartItemProps[];
  wishlistItemsCount: number;
}
export interface ICartItemState {
  items: ICartItemProps;
  isWishlist: boolean;
}

export interface ICartItemProps {
  id: string;
  title: string;
  text: string;
  img: string;
  color: string;
  shadow: string;
  price: number;
  cartQuantity?: number;
  rating?: string;
  btn?: string;
}
