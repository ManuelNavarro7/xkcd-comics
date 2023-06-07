import * as React from "react";
import Head from "next/head";
import { NextUIProvider } from "@nextui-org/react";
import "../styles/globals.css";
export default function App({ Component, pageProps }) {
  return (
    <NextUIProvider>
      <Head>
        <link rel="icon" href="./next.svg" />
      </Head>
      <Component {...pageProps} />
    </NextUIProvider>
  );
}
