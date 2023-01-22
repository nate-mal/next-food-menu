import Header from "@/components/Header/Header";
import { CartContextProvider } from "../components/Context/cart-context";
import style from "../styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <CartContextProvider>
      <Header />
      <Component {...pageProps} />
    </CartContextProvider>
  );
}
