import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  const [showMenu, setShowMenu] = useState(false);

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

            <li className="nav-item">
              <Link href="#" className="nav-link">
                Contact
              </Link>
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
