import Head from "next/head";
import Link from "next/link.js";
import { Layout } from "../../components/Layout.js";
import Image from "next/image.js";
import { search } from "../services/index.js";

export default function Search({ query, results }) {
  return (
    <>
      <Head>
        <title>xkcd - Results for</title>
        <meta name="description" content={`Search results for ${query}`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Layout>
        <h1 className="text-xl font-bold mb-7">
          {results.length} Results for your Search : {query}
        </h1>

        {results.map((result) => (
          <Link
            key={result.id}
            href={`/result/${result.id}`}
            className="flex -flex-row justify-start content-center"
          >
            <Image
              alt={result.alt}
              src={result.img}
              width="50"
              height="50"
              className="rounded-full"
            ></Image>
            <h2>{result.title}</h2>
          </Link>
        ))}
      </Layout>
    </>
  );
}

export async function getServerSideProps(context) {
  const { query } = context;
  const { q = "" } = query;

  const { results } = await search({ q });

  return {
    props: {
      query: q,
      results: results,
    },
  };
}
