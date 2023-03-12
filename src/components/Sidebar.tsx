import React from "react";
import { Nav } from "react-bootstrap";
import home from "../svgs/Homehouse.svg";
import Activity from "../svgs/Activity.svg";
import "../style.css";
import Asset from "../svgs/Asset 120160 1.svg";
import Wallet from "../svgs/Wallet.svg";
import History from "../svgs/History.svg";
import Profile from "../svgs/Profile.svg";
import symbol from "../svgs/Group 1179.svg";
import logo from "../svgs/logo.svg";
import Image from "react-bootstrap/Image";
import { Link } from "react-router-dom";
/**
 * Side Navigation Bar
 */
const Sidebar = () => {
  const links = [
    {
      id: 1,
      image: home,
      alt: "home",
      text: "Home",
      link: "/",
    },
    {
      id: 2,
      image: Activity,
      alt: "Activity",
      text: "World of T-Stable",
      link: "/Activity",
    },
    {
      id: 3,
      image: Asset,
      alt: "asset",
      text: "Borrow",
      link: "/Asset",
    },
    {
      id: 4,
      image: Wallet,
      alt: "wallet",
      text: "Wallet",
      link: "/wallet",
    },
    {
      id: 5,
      image: History,
      alt: "history",
      text: "History",
      link: "/history",
    },
    {
      id: 6,
      image: Profile,
      alt: "profile",
      text: "Profile",
      link: "/profile",
    },
  ];
  return (
    <div className="p-1">
      <div>
        <Image src={logo} alt="logo"></Image>
      </div>
      <div>
        <Image src={symbol} alt="symbol"></Image>
      </div>

      <Nav defaultActiveKey="/home" className="flex-column">
        {links.map((link) => (
          <Nav.Link eventKey={link.link} className="mt-1">
            <Image src={link.image} alt={link.alt}></Image>
            <br />
            <Link to={link.link} className="link-style fs-6 text-muted">
              {link.text}
            </Link>
          </Nav.Link>
        ))}
      </Nav>
    </div>
  );
};

export default Sidebar;
