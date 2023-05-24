import Header from "./Header";
import Head from "next/head";

export default function About() {
  return (
    <>
      <Head>
        <title>xkcd - Comics for Developers</title>
        <meta name="description" content="Comics for Developers" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div className="pt-10 px-10">
        <p className="text-center px-10">
          Welcome to our website! We are thrilled to introduce our project, a
          unique online platform created using Next.js and featuring delightful
          content from xkcd (https://xkcd.com/). We would like to express our
          sincere gratitude to xkcd for providing us with access to their
          amazing collection of files. Our goal is to bring you the joy and
          humor that xkcd has been known for through an interactive and
          user-friendly experience. Explore our website and immerse yourself in
          the world of xkcd, where you'll find an assortment of hilarious and
          thought-provoking comics. Whether you're a long-time fan or new to
          xkcd, we hope you enjoy this journey with us as we showcase the
          brilliance of xkcd in a whole new way.
        </p>
      </div>
    </>
  );
}
