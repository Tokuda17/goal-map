/* 
List of Todo:
Need to Add Drop Down Menu when Screen is small
*/

import React, { useState } from "react";
import "../styles/Navbar.css";
import logo from "../images/MT.png";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav id="navbar">
      <div
        className={`off-screen-menu ${isOpen ? "off-screen-menu-open" : ""}`}
      >
        <ul className="sidebar-links">
          <li className="sidebar-link">
            <Link className="sidebar-a" href="calendar">
              Calendar
            </Link>
          </li>
          <li className="sidebar-link">
            <Link className="sidebar-a" href="login">
              Login
            </Link>
          </li>
          <li className="sidebar-link">
            <Link className="sidebar-a" href="logout">
              Logout
            </Link>
          </li>
          <li className="sidebar-link">
            <Link className="sidebar-a" href="#Latest-Projects">
              Sign-Up
            </Link>
          </li>
        </ul>
      </div>
      <ul className="navbar-links">
        <li className="navbar-link">
          <Link className="navbar-a" href="/">
            <Image
              width={100}
              height={100}
              className="navbar-logo"
              src={logo}
            ></Image>
          </Link>
        </li>
        <li className="navbar-link">
          <Link className="navbar-a" href="calendar">
            Calendar
          </Link>
        </li>
        <li className="navbar-link">
          <Link className="navbar-a" href="login">
            Login
          </Link>
        </li>
        <li className="navbar-link">
          <Link className="navbar-a" href="logout">
            Logout
          </Link>
        </li>
        <li className="navbar-link">
          <Link className="navbar-a" href="signup">
            Sign-Up
          </Link>
        </li>
      </ul>
      <div
        onClick={toggleMenu}
        className={`hamburger-menu ${isOpen ? "hamburger-menu-open" : ""}`}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
    </nav>
  );
};

export default Navbar;
