"use client";
import Link from "next/link";
import React, { useState } from "react";
import NavLink from "./NavLink";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import MenuOverlay from "./MenuOverlay";
import Image from "next/image";
import GithubIcon from "../../../public/github-icon.svg";
import LinkedinIcon from "../../../public/linkedin-icon.svg";

const navLinksBeforeIcons = [
  {
    title: "About",
    path: "#about",
  },
  {
    title: "Projects",
    path: "#projects",
  },
];

const navLinksAfterIcons = [
  {
    title: "Reviews",
    path: "#reviews",
  },
  {
    title: "Connect",
    path: "#connect",
  },
];

const Navbar = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);

  return (
    <nav className="fixed mx-auto border border-[#33353F] top-0 left-0 right-0 z-10 bg-[#121212] bg-opacity-100">
      <div className="flex container lg:py-4 flex-wrap items-center justify-between mx-auto px-4 py-2">
      <Link
          href={"/"}
            className="text-2xl md:text-5xl font-semibold flex items-center space-x-2"
          >
            <h1 className="relative text-4xl font-extrabold bg-gradient-to-r from-gray-400 via-gray-500 to-gray-600 bg-clip-text text-transparent">
             &lt; Udaysk &gt;
            </h1>
          </Link>
        <div className="mobile-menu block md:hidden">
          {!navbarOpen ? (
            <button
              onClick={() => setNavbarOpen(true)}
              className="flex items-center px-3 py-2 border rounded border-slate-200 text-slate-200 hover:text-white hover:border-white"
            >
              <Bars3Icon className="h-5 w-5" />
            </button>
          ) : (
            <button
              onClick={() => setNavbarOpen(false)}
              className="flex items-center px-3 py-2 border rounded border-slate-200 text-slate-200 hover:text-white hover:border-white"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          )}
        </div>
        <div className="menu hidden md:flex md:w-auto items-center space-x-4" id="navbar">
          <ul className="flex p-4 md:p-0 md:flex-row md:space-x-8 mt-0 items-center">
            {navLinksBeforeIcons.map((link, index) => (
              <li key={index}>
                <NavLink href={link.path} title={link.title} />
              </li>
            ))}
            <li>
              <Link
                href="#github"
                className="flex items-center space-x-1 hover:text-white transition-colors duration-200"
              >
                <Image
                  src={GithubIcon}
                  alt="GitHub Icon"
                  width={24}
                  height={24}
                  className="hover:opacity-75 transition-opacity duration-200"
                />
                <span className="hover:text-white">Activity</span>
              </Link>
            </li>
            <li>
              <Link
                href="#linkedin"
                className="flex items-center space-x-1 hover:text-white transition-colors duration-200"
              >
                <Image
                  src={LinkedinIcon}
                  alt="LinkedIn Icon"
                  width={24}
                  height={24}
                  className="hover:opacity-75 transition-opacity duration-200"
                />
                <span className="hover:text-white">Activity</span>
              </Link>
            </li>
            {navLinksAfterIcons.map((link, index) => (
              <li key={index}>
                <NavLink href={link.path} title={link.title} />
              </li>
            ))}
          </ul>
        </div>
      </div>
      {navbarOpen ? <MenuOverlay links={[...navLinksBeforeIcons, { title: "GitHub", path: "#github" }, { title: "LinkedIn", path: "#linkedin" }, ...navLinksAfterIcons]} /> : null}
    </nav>
  );
};

export default Navbar;
