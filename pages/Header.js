import React, { useState, useRef } from "react";
import Link from "next/link";
import { search } from "../services";

export default function Header() {
  const [showMenu, setShowMenu] = useState(false);
  const [results, setResults] = useState([]);
  const searchRef = useRef();
  const q = searchRef?.current?.value;
  async function handleChange() {
    try {
      let resu = await fetch(`/api/search?q=${q}`)
        .then((res) => res.json())
        .then((searchResults) => {
          setResults(searchResults);
        });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <header className="header sticky top-0">
        <nav className="navbar ">
          <Link href="../" className="nav-logo flex flex-row">
            {/* <Image
              width={40}
              height={40}
              src="/pyramid.png"
              className="nav-pic"
            /> */}
            <h1 className=" text-xs font-bold ms-2 nav-title">
              xkcd<span className="font-light">comics</span>
            </h1>
          </Link>
          <ul className={`nav-menu ${showMenu ? "active" : ""}`}>
            <li className="nav-item">
              <Link href="../" className="nav-link">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link href="../about" className="nav-link">
                About
              </Link>
            </li>

            <li className="nav-item relative z-10">
              {/* <div passHref="/search" className="nav-link"> */}
              <input
                className="text-md border border-gray-400  rounded-2xl"
                ref={searchRef}
                type="search"
                onChange={handleChange}
              />

              {Boolean(results.length) && (
                <div className="absolute top-0 left-0">
                  <ul className="mt-8 w-full border rounded-lg overflow-hidden shadow-sm border-gray-50 bg-white">
                    {q ? (
                      <Link href={`search?q=${q}`}>
                        <li className="text-white  bg-gray-500 text-sm pl-3 pr-3 pt-2 pb-2">
                          Number of results {results.length}
                        </li>
                      </Link>
                    ) : (
                      ""
                    )}
                    {q
                      ? results.map((result) => {
                          return (
                            <li
                              className="text-xs mt-5 pl-2 pr-2 "
                              key={result.id}
                            >
                              <Link href={`/comic/${result.id}`}>
                                {result.title}
                              </Link>
                            </li>
                          );
                        })
                      : ""}
                  </ul>
                </div>
              )}
              {/* </div> */}
            </li>
          </ul>
          <button
            onClick={() => setShowMenu(!showMenu)}
            className={`hamburger ${showMenu ? "active" : ""}`}
          >
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </button>
        </nav>
      </header>
    </>
  );
}
