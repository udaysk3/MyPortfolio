import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="footer border z-10 border-t-[#33353F] border-l-transparent border-r-transparent text-white">
      <div className="container p-12 flex justify-between">
      <Link
          href={"/"}
            className="text-2xl md:text-5xl font-semibold flex items-center space-x-2"
          >
            <h1 className="relative text-4xl font-extrabold bg-gradient-to-r from-gray-400 via-gray-500 to-gray-600 bg-clip-text text-transparent">
             &lt; / Udaysk &gt;
            </h1>
          </Link>
        <p className="text-slate-600">All rights reserved. Udaysk@2024</p>
      </div>
    </footer>
  );
};

export default Footer;
