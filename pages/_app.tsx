import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/700.css";
import "../styles/swiper-bundle.css";
import "../styles/styles.css";

const theme = extendTheme({
  fonts: {
    heading: "Poppins",
    body: "Poppins",
  },
  colors: {
    highlight: "#FFBA08",
    black: "#0000",
    headingsAndText: "#47585B",
    lightHeadings: "#F5F8FA",
    info: "#999999",
  },
  // breakpoints: {
  //   sm: "375px",
  //   md: "768px",
  //   lg: "960px",
  //   xl: "1200px",
  // },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
