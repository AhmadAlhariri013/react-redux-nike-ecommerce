import {
  Cart,
  FlexContent,
  Footer,
  Hero,
  Navbar,
  Sales,
  Stories,
} from "./components";
import Wishlist from "./components/Wishlist";
import {
  footerAPI,
  heroapi,
  highlight,
  popularsales,
  sneaker,
  story,
  toprateslaes,
} from "./data/data";

const App = () => {
  return (
    <>
      <Navbar />
      <main className="flex flex-col gap-16 relative">
        <Hero {...heroapi} />
        <Sales endpoint={popularsales} ifExists />
        <FlexContent endpoint={highlight} ifExists />
        <Sales endpoint={toprateslaes} />
        <FlexContent endpoint={sneaker} />
        <Stories {...story} />
        <Cart />
        <Wishlist />
      </main>
      <Footer footerAPI={footerAPI} />
    </>
  );
};

export default App;
