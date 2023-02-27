import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Image from "react-bootstrap/Image";
import notification from "../svgs/notification.svg";
import audited from "../svgs/audited.svg";
import profile from "../svgs/profile_dp.svg";
import ConnectWallet from "./ConnectWallet";
import React from "react";
/**
 * Top Navigation bar
 */
const Topbar = () => {
  return (
    <Navbar
      className="d-flex justify-content-between p-3"
      bg="white"
      expand="lg"
    >
      <Container fluid>
        <div className="d-flex align-items-center ">
          <Navbar.Brand href="#">
            <i
              className="fas fa-align-left primary-text fs-4 me-auto my-2 my-lg-0 "
              id="menu-toggle"
            ></i>
            <h2 className="fs-2 m-0">Dashboard</h2>
          </Navbar.Brand>
        </div>
        <div>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto my-2 my-lg-0 d-flex" navbarScroll>
              <Image
                fluid
                className="px-2"
                src={notification}
                alt="notification"
              ></Image>
              <Image fluid className="px-2" src={audited} alt="audited"></Image>
              <ConnectWallet />
              <Image className="px-2" rounded src={profile}></Image>
              <NavDropdown
                title="messilionel@gmail.com"
                id="navbarScrollingDropdown"
              >
                <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action4">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action5">
                  Something else here
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </div>
      </Container>
    </Navbar>
  );
};

export default Topbar;
