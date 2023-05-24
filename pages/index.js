import Head from "next/head";
import Header from "./Header.js";
import fs from "fs/promises";
import Link from "next/link.js";
import Image from "next/image.js";
import { useState } from "react";
import { Button } from "@nextui-org/react";
export default function Home({ latestComics }) {
  let allLengthComics = latestComics.length;

  let [numbForComics, setnumbForComics] = useState(6);
  return (
    <>
      <Head>
        <title>xkcd - Comics for Developers</title>
        <meta name="description" content="Comics for Developers" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main>
        <h2 className="text-3xl font-bold text-center mb-10">Latest Comics</h2>

        <section className="grid grid-cols-1 gap-2 max-w-md m-auto sm:grid-cols-2 md:grid-cols-3">
          {latestComics.slice(0, numbForComics).map((comic) => {
            return (
              <Link
                className="mt-5"
                href={`./comic/${comic.id}`}
                key={comic.id}
              >
                <div className="flex flex-col justify-center flex-wrap content-center">
                  <div className="mb-2 Title-Main-Cards">
                    <h3 className="font-bold text-sm text-center mb-4 ">
                      {comic.title}
                    </h3>
                  </div>

                  <Image
                    width={comic.width}
                    height={comic.height}
                    layout="intrinsic"
                    objectFit="cover"
                    src={comic.img}
                    alt={comic.alt}
                  />
                </div>
              </Link>
            );
          })}
        </section>
        <div className="flex flex-col flex-wrap justify-items-center items-center content-center ">
          <button
            className=" text-gray-600 border mt-12 mb-10 border-indigo-600 px-6 pb-1.5 pt-1 text-indigo-600 hover:bg-indigo-600 hover:text-white rounded-full"
            onClick={() => setnumbForComics(numbForComics + 6)}
          >
            Load More
          </button>
        </div>
      </main>
    </>
  );
}

export async function getStaticProps() {
  const files = await fs.readdir("./comics");
  const numbFiles = files.length;
  const latestComicsFiles = files
    .reverse()
    .slice(-numbFiles, files.length)
    .reverse();
  const promisesReadFile = latestComicsFiles.map(async (file) => {
    const content = await fs.readFile(`./comics/${file}`, "utf-8");
    return JSON.parse(content);
  });
  const latestComics = await Promise.all(promisesReadFile);
  console.log(latestComics);

  return {
    props: {
      latestComics,
    },
  };
}
