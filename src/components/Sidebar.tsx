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
    <div className="p-4">
      <a href="/">
        <div>
          <Image src={logo} alt="logo"></Image>
        </div>
        <div className="mb-5">
          <Image src={symbol} alt="symbol"></Image>
        </div>
      </a>

      <Nav defaultActiveKey="/home" className="flex-column gap-1">
        {links.map((links) => (
          <div key={links.id}>
            <Link
              to={links.link}
              className="link-style fs-6 text-muted fw-normal"
            >
              <Image className="mx-3" src={links.image} alt={links.alt}></Image>
              <br />
              <p className="fs-6 mx-1">{links.text}</p>
            </Link>
          </div>
        ))}
      </Nav>
    </div>
  );
};

export default Sidebar;
