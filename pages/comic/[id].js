import Head from "next/head";
import Header from "../Header.js";
import Image from "next/image";
import fs from "fs/promises";
import { readFile } from "fs/promises";
import { stat } from "fs/promises";
import Link from "next/link.js";
import { basename } from "path";

export default function Comic({
  id,
  img,
  alt,
  title,
  width,
  height,
  nextId,
  hasNext,
  prevId,
  hasPrevious,
}) {
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
        <section className="max-w-md m-auto px-8 flex flex-col justify-center flex-wrap content-center items-center mb-9">
          <h1 className="font-bold text-2xl mb-4">{title}</h1>
          <Image width={width} height={height} src={img} alt={alt}></Image>
          <p className="text-center mt-4">{alt}</p>
          <div className="flex flex-row justify-center flex-wrap content-center items-center gap-5 mt-5">
            {hasPrevious && (
              <Link
                href={`./${prevId}`}
                className="text-gray-600 border border-indigo-600 px-6 pb-1.5 pt-1 text-indigo-600 hover:bg-indigo-600 hover:text-white rounded-full"
              >
                ← Previus
              </Link>
            )}
            {hasNext && (
              <Link
                href={`./${nextId}`}
                className="text-gray-600 border border-indigo-600 px-6 pb-1.5 pt-1 text-indigo-600 hover:bg-indigo-600 hover:text-white rounded-full"
              >
                Next →
              </Link>
            )}
          </div>
        </section>
      </main>
    </>
  );
}

/*La primera función, getStaticPaths, se utiliza para generar las rutas estáticas 
para una página dinámica. Recibe un objeto params que contiene parámetros de ruta. En este caso, 
parece que espera recibir un parámetro id. La función utiliza 
el módulo fs (sistema de archivos) para leer el 
contenido de la carpeta "./comics" y obtener una lista de archivos.
 Luego, mapea esa lista de archivos y crea un array de objetos params con 
 el id de cada archivo. Estos objetos params representan las posibles 
 rutas que se generarán para esta página. Al final, la función devuelve 
 un objeto con las rutas generadas y establece fallback en false, lo que 
 significa que cualquier ruta que no esté predefinida devolverá un 404.
*/

export async function getStaticPaths({ params }) {
  const files = await fs.readdir("./comics");
  const paths = files.map((file) => {
    const id = basename(file, ".json");
    return { params: { id } };
  });

  return {
    paths,
    fallback: false,
  };
}

//La segunda función, getStaticProps, se utiliza para obtener propiedades estáticas para una página dinámica. También recibe un objeto params que contiene los parámetros de ruta, en este caso, el id
export async function getStaticProps({ params }) {
  // console.log(params);
  const { id } = params;
  const content = await readFile(`./comics/${id}.json`, "utf-8");
  const comic = JSON.parse(content);
  // console.log(comic);
  const idNumber = +id;
  const prevId = idNumber - 1;
  const nextId = idNumber + 1;
  //stat si existe un archivo o no

  const [prevResult, nextResult] = await Promise.allSettled([
    stat(`./comics/${prevId}.json`),
    stat(`./comics/${nextId}.json`),
  ]);

  const hasPrevious = prevResult.status === "fulfilled";
  const hasNext = nextResult.status === "fulfilled";
  //  console.log(results);

  return {
    props: {
      ...comic,
      hasPrevious,
      hasNext,
      nextId,
      prevId,
    },
  };
}
