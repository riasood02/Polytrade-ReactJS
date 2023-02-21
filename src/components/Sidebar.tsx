import React from "react";
import { Nav } from "react-bootstrap";
import home from "../svgs/Homehouse.svg";
import Activity from "../svgs/Activity.svg";

import Asset from "../svgs/Asset 120160 1.svg";
import Wallet from "../svgs/Wallet.svg";
import History from "../svgs/History.svg";
import Profile from "../svgs/Profile.svg";
import symbol from "../svgs/Group 1179.svg";
import logo from "../svgs/logo.svg";
import Image from "react-bootstrap/Image";
/**
 * Side Navigation Bar
 */
const Sidebar = () => {
  return (
    <div className="p-1">
      <div>
        <Image src={logo} alt="logo"></Image>
      </div>
      <div>
        <Image src={symbol} alt="symbol"></Image>
      </div>

      <Nav defaultActiveKey="/home" className="flex-column">
        <Nav.Link href="/home">
          <Image src={home} alt="home"></Image>
          <br />
          <p className="fs-6 text-muted">Home</p>
        </Nav.Link>
        <Nav.Link eventKey="link-1">
          <Image src={Activity} alt="Activity"></Image>
          <br />
          <p className="fs-6 text-muted">World of T-Stable</p>
        </Nav.Link>
        <Nav.Link eventKey="link-2">
          <Image src={Asset} alt="asset"></Image>
          <br />
          <p className="fs-6 text-muted">Borrow</p>
        </Nav.Link>
        <Nav.Link eventKey="link-2">
          <Image src={Wallet} alt="wallet"></Image>
          <br />
          <p className="fs-6 text-muted">Wallet</p>
        </Nav.Link>
        <Nav.Link eventKey="link-2">
          <Image src={History} alt="history"></Image>
          <br />
          <p className="fs-6 text-muted">History</p>
        </Nav.Link>
        <Nav.Link eventKey="link-2" className="p-2">
          <Image src={Profile} alt="profile"></Image>
          <br />
          <p className="fs-6 text-muted">Profile</p>
        </Nav.Link>
      </Nav>
    </div>
  );
};

export default Sidebar;
