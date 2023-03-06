import React, { useEffect, useState } from "react";
import Badge from "../svgs/Badge.svg";
import Image from "react-bootstrap/Image";
import {
  Button,
  ButtonGroup,
  Col,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";
import LineChart from "./LineChart";
import BeforeKYC from "./BeforeKYC";
import AfterKYC from "./AfterKYC";
import Web3 from "web3";
/**
 * Liquidity card
 * @param {object} props Component props
 * @param {string} props.txt1 headline
 * @param {string} props.txt2 value
 */
const LiquidityCard = (props: { txt1: string; txt2: string }) => {
  return (
    <Col md={12} className="bg-white p-2 rounded-4 mt-2">
      <div className="d-flex align-items-start">
        <p className="fs-6 lh-sm text-muted">{props.txt1}</p>
      </div>
      <div className="d-flex align-items-start">
        <h6 className="lh-sm">{props.txt2}</h6>
      </div>
      <LineChart />
    </Col>
  );
};
/**
 * Third Grid
 */
const ThirdGrid = () => {
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
    } else if (accounts[0] !== currentAccount) {
      setProvider(provider);
      setWeb3(web3);
      setChainId(chainId);
      setcurrentAccount(accounts[0]);
      setisConnected(true);
    }
  };
  const onDisconnecting = () => {
    setisConnected(false);
  };

  useEffect(() => {
    async function WalletConnected() {
      const accounts = await (window as any).ethereum.request({
        method: "eth_accounts",
      });
      if (accounts.length) {
        setisConnected(true);
        console.log("connected");
      } else {
        setisConnected(false);
        console.log("not connected");
      }
    }
    WalletConnected();
  }, []);
  return (
    <Col md={4}>
      <div className="d-flex justify-content-between">
        <div className="p-2 bd-highlight">
          <h5>
            <b>Overview</b>
          </h5>
        </div>
        <div className="p-2 bd-highlight">
          <DropdownButton
            variant="default"
            className="bg-white rounded-pill"
            as={ButtonGroup}
            align={{ lg: "end" }}
            title="USD"
            id="dropdownUSD"
          >
            <Dropdown.Item eventKey="1">Action 1</Dropdown.Item>
            <Dropdown.Item eventKey="2">Action 2</Dropdown.Item>
          </DropdownButton>
        </div>
      </div>
      <LiquidityCard
        txt1="Total Polytrade Liquidity"
        txt2="$17,683,857,723"
      ></LiquidityCard>
      <LiquidityCard txt1="Total Invoice Funded" txt2="$24,00"></LiquidityCard>
      {isConnected ? <AfterKYC /> : <BeforeKYC />}
    </Col>
  );
};

export default ThirdGrid;
