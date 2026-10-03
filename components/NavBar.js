import React, { useState } from "react";
import "./navbar.css";
import { BsFillMoonStarsFill } from "react-icons/bs";

function Navbar({ darkMode, toggleDarkMode }) {
  const [active, setActive] = useState("nav-menu");
  const [icon, setIcon] = useState("nav-toggler");

  const navToggle = () => {
    if (active === "nav-menu") {
      setActive("nav-menu nav-active");
    } else setActive("nav-menu");

    // Icon Toggler
    if (icon === "nav-toggler") {
      setIcon("nav-toggler toggle");
    } else setIcon("nav-toggler");
  };

  // const navToggle = () => {
  //   setActive((prevActive) =>
  //     prevActive === "hidden md:flex" ? "md:flex" : "hidden md:flex"
  //   );
  //   setIcon((prevIcon) =>
  //     prevIcon === "nav-toggler" ? "nav-toggler toggle" : "nav-toggler"
  //   );
  // };

  return (
    <nav
      className={`py-10 mb-1 flex justify-between ${darkMode ? "dark" : ""}`}
    >
      <h1 className="text-xl font-burtons dark:text-white">
        <a href="/">vimukthi</a>
      </h1>

      <ul className={`md:flex ${active}`}>
        {/* <li className="nav-item">
          <a href="#" className="nav-link text-gray-900  dark:text-white">
            Home
          </a>
        </li> */}
        <li className="nav-item">
          <a href="#about" className="nav-link text-gray-900  dark:text-white">
            About
          </a>
        </li>
        <li className="nav-item">
          <a href="#portfolio" className="nav-link text-gray-900  dark:text-white">
            Portfolio
          </a>
        </li>
        <li className="nav-item">
          <a href="#services" className="nav-link text-gray-900  dark:text-white">
            Services
          </a>
        </li>
        <li className="nav-item text-gray-900  dark:text-white">
          <a href="#contact" className="nav-link">
            Contact
          </a>
        </li>
      </ul>
      <ul className="flex items-center">
        <li>
          <BsFillMoonStarsFill
            onClick={toggleDarkMode}
            className={`cursor-pointer text-2xl ${
              darkMode ? "dark:text-white" : "text-gray-800"
            }`}
          />
        </li>
        <li>
          <a href="https://drive.google.com/file/d/1mTHi7QIsUehgRbgx9URDEGe_XokwLiSW/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-cyan-500 to-teal-500 text-white px-4 py-2 rounded-md ml-8"
          >
            Resume
          </a>
        </li>
      </ul>
      <div onClick={navToggle} className={`${icon}`}>
        <div className="line1"></div>
        <div className="line2 "></div>
        <div className="line3"></div>
      </div>
    </nav>
  );
}

export default Navbar;
