import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Image from "react-bootstrap/Image";
import notification from "../svgs/notification.svg";
import audited from "../svgs/audited.svg";
import profile from "../svgs/profile_dp.svg";
import ConnectWallet from "./ConnectWallet";
import React, { useEffect, useState } from "react";
import { Button, ButtonGroup, Dropdown } from "react-bootstrap";
import meta from "../svgs/metamask.svg";
import Web3 from "web3";
/**
 * Top Navigation bar
 */
const Topbar = (props: {
  alert: {
    message: string | null;
    type: string | null;
  };
  showAlert: (message: string | null, type: string | null) => void;
}) => {
  const [isConnected, setisConnected] = useState(false);
  const [currentAccount, setcurrentAccount] = useState<string | null>();
  const [provider, setProvider] = useState((window as any).ethereum);
  const [chainId, setChainId] = useState<Number>();
  const [web3, setWeb3] = useState<Web3 | null>();

  const onConnecting = async (provider: any) => {
    const web3 = new Web3(provider);
    const accounts: string[] = await web3!.eth.getAccounts();
    const chainId = await web3!.eth.getChainId();
    if (accounts.length === 0) {
      console.log("please connect to metamask");
      props.showAlert("Metamask not connected", "danger");
    } else if (accounts[0] !== currentAccount) {
      setProvider(provider);
      setWeb3(web3);
      setChainId(chainId);
      setcurrentAccount(accounts[0]);
      setisConnected(true);
      props.showAlert("Wallet connected", "success");
    }
  };
  const onDisconnecting = () => {
    setisConnected(false);
  };
  useEffect(() => {
    const handleAccountsChanged = async (accounts: string[]) => {
      const web3Accounts = await web3!.eth.getAccounts();
      if (accounts.length === 0) {
        onLogout();
      } else if (accounts[0] !== currentAccount) {
        setcurrentAccount(accounts[0]);
      }
    };
    const handleChainChanged = async (chainId: string) => {
      const web3ChainId = await web3!.eth.getChainId();
      setChainId(web3ChainId);
    };
    if (isConnected) {
      provider.on("accountChanged", handleAccountsChanged);
      provider.on("chainChanged", handleChainChanged);
    }
    return () => {
      if (isConnected) {
        provider.removeListener("accountChanged", handleAccountsChanged);
        provider.removeListener("chainChanged", handleChainChanged);
      }
    };
  }, [isConnected]);
  const onLogout = () => {
    setisConnected(false);
    setcurrentAccount(null);
    props.showAlert("Wallet Disconnected", "warning");
  };
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
            <Nav
              className="me-auto my-2 my-lg-0 d-flex"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Image
                fluid
                className="px-2"
                src={notification}
                alt="notification"
              ></Image>
              <Image fluid className="px-2" src={audited} alt="audited"></Image>
              {!isConnected && (
                <ConnectWallet
                  onConnecting={onConnecting}
                  onDisconnecting={onDisconnecting}
                />
              )}
              {isConnected && (
                <Dropdown
                  as={ButtonGroup}
                  style={{
                    color: "rgb(10,11,32)",
                    backgroundColor: "rgb(244,248,251)",
                    fontWeight: "500",
                    alignItems: "center",
                  }}
                  className="rounded-pill"
                >
                  <Image
                    className="px-2"
                    style={{ height: "20px" }}
                    src={meta}
                  />
                  <Button variant="default">
                    <>{currentAccount}</>
                  </Button>

                  <Dropdown.Toggle
                    split
                    variant="default"
                    id="dropdown-split-basic"
                  />

                  <Dropdown.Menu className="rounded-pill">
                    <Dropdown.Item onClick={onLogout}>Disconnect</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              )}
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
