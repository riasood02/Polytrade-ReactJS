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
import { switchNetwork } from "../Utils/SwitchNetwork";
import { addressShortener } from "../Utils/NumberFormattingFunctions";
import {
  ALERT_MESSAGES,
  ALERT_TYPE,
  BUTTONS,
  DROPDOWNS,
} from "../Data/Constants";

/**
 * Top Navigation Bar
 * @param {object} props Component props
 * @param {(address: string | null | undefined) => void} props.showCurrentAccount current wallet address
 * @param {boolean} props.meta is metamask connected
 * @param {(b: boolean) => void} props.showMeta function to set props.meta
 * @param {(message: string, type: any) => void} props.showAlert function to set alert
 * @param {(bal: string | undefined) => void} props.showcurrentBalance displays current wallet balance
 */

const Topbar = (props: {
  showCurrentAccount: (address: string | null | undefined) => void;
  meta: boolean;
  showMeta: (b: boolean) => void;
  showcurrentBalance: (bal: string | undefined) => void;
  notify: (message: string, type: string) => void;
}) => {
  const [isConnected, setisConnected] = useState(false);
  const [currentAccount, setcurrentAccount] = useState<string>("none");
  const [currentBalance, setcurrentBalance] = useState<string>();
  const [provider, setProvider] = useState((window as any).ethereum);
  const [chainId, setChainId] = useState<Number>();
  const [web3, setWeb3] = useState<Web3 | null>();

  /**
   * Setting states on wallet connect
   * @param {any} provider displays current wallet balance
   */
  const onConnecting = async (provider: any) => {
    const web3 = new Web3(provider);
    const accounts: string[] = await web3!.eth.getAccounts();
    const chainId = await web3!.eth.getChainId();
    const balance = await web3!.eth.getBalance(accounts[0]);
    let mainBalance = web3!.utils.fromWei(balance);
    if (accounts.length === 0) {
      props.notify(ALERT_MESSAGES.META_NOT_CONNECTED, ALERT_TYPE.WARN);
    } else if (accounts[0] !== currentAccount) {
      setProvider(provider);
      setWeb3(web3);
      setChainId(chainId);
      setcurrentAccount(accounts[0]);
      setisConnected(true);
      setcurrentBalance(mainBalance);
      props.showcurrentBalance(mainBalance);
      props.showMeta(true);
      props.notify(ALERT_MESSAGES.META_CONNECTED, ALERT_TYPE.SUCCESS);
      props.showCurrentAccount(accounts[0]);
    }
  };

  /**
   * Setting isconnected false when matamask disconnected
   */
  const onDisconnecting = () => {
    setisConnected(false);
  };

  /**
   * getting the current account connected
   */
  async function getAccount() {
    const accounts = await (window as any).ethereum.enable();
    const account = accounts[0];
    const balance = await web3!.eth.getBalance(account);
    let mainBalance = web3!.utils.fromWei(balance);
    setcurrentAccount(account);
    setcurrentBalance(mainBalance);
    props.showcurrentBalance(mainBalance);
    props.showCurrentAccount(account);
    props.showMeta(true);
    props.notify(ALERT_MESSAGES.ACCOUNT_CHANGED, ALERT_TYPE.INFO);
  }

  (window as any).ethereum.on("accountsChanged", function (accounts: string[]) {
    getAccount();
  });

  useEffect(() => {
    /**
     * handles chain changing of metamask. Switches network if connected to wrong chain
     */
    const handleChainChanged = async () => {
      const web3ChainId = await web3!.eth.getChainId();
      if (web3ChainId !== 80001) {
        props.notify(ALERT_MESSAGES.WRONG_CHAIN, ALERT_TYPE.WARN);
        switchNetwork(80001);
      }
      setChainId(web3ChainId);
    };
    if (isConnected) {
      provider.on("chainChanged", handleChainChanged);
    }
    return () => {
      if (isConnected) {
        provider.removeListener("chainChanged", handleChainChanged);
      }
    };
  }, [isConnected]);

  /**
   * handles states if user logs out from metamask.
   */
  const onLogout = () => {
    setisConnected(false);
    setcurrentAccount("none");
    props.showcurrentBalance("0");
    props.notify(ALERT_MESSAGES.DISCONNECTED, ALERT_TYPE.INFO);
    props.showMeta(false);
  };
  return (
    <Navbar
      className="d-flex justify-content-between align-items-center py-4"
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
            <h2>Dashboard</h2>
          </Navbar.Brand>
        </div>
        <div>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0 d-flex gap-4 align-items-center"
              navbarScroll
            >
              <Dropdown>
                <Dropdown.Toggle
                  variant="default"
                  className="text-muted fw-normal fs-5 border-0"
                  id="dropdown-basic"
                >
                  {DROPDOWNS.AUDITED}
                </Dropdown.Toggle>

                <Dropdown.Menu className="rounded-4 w-100">
                  <Dropdown.Item href="#/action-1">
                    {" "}
                    <Image
                      fluid
                      className="px-2"
                      src={audited}
                      alt="audited"
                    ></Image>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              {isConnected && (
                <a href="">
                  <Image fluid src={notification} alt="notification"></Image>
                </a>
              )}

              {!isConnected && (
                <ConnectWallet
                  onConnecting={onConnecting}
                  onDisconnecting={onDisconnecting}
                />
              )}
              {isConnected && (
                <Dropdown
                  className="rounded-pill"
                  style={{
                    color: "rgb(10,11,32)",
                    backgroundColor: "rgb(244,248,251)",
                    fontWeight: "500",
                    alignItems: "center",
                  }}
                >
                  <div className="d-flex align-items-center py-3 px-5">
                    <p className="mb-0 mx-2 fs-4">Account</p>
                    <Image
                      className="mx-1"
                      style={{ height: "20px" }}
                      src={meta}
                    />
                    <div className="text-muted fs-5">
                      <>{addressShortener(currentAccount)}</>
                    </div>
                    <div>
                      <Dropdown.Toggle
                        variant="default"
                        id="dropdown-basic"
                        className="border-0"
                      ></Dropdown.Toggle>
                    </div>
                  </div>

                  <Dropdown.Menu className="rounded-4 w-100">
                    <Dropdown.Item onClick={onLogout}>
                      <h4 className="text-bold">{BUTTONS.DISCONNECT}</h4>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              )}
              {isConnected && (
                <Image className="px-2" rounded src={profile}></Image>
              )}
            </Nav>
          </Navbar.Collapse>
        </div>
      </Container>
    </Navbar>
  );
};

export default Topbar;
