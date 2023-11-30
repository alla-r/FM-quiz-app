import "@/styles/variables.css";
import "@/styles/globals.css";

import ThemeToggle from "@/components/theme.util";

export default function App({ Component, pageProps }) {
  return (
    <>
      <ThemeToggle />
      <Component {...pageProps} />
    </>
  );
}
