import React from "react";
import Badge from "../svgs/Badge.svg";
import Image from "react-bootstrap/Image";
import "../style.css";
import {
  Button,
  ButtonGroup,
  Col,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";
import LineChart from "./LineChart";
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
      <Col md={12} className="mt-2 p-3 bg-white rounded-4">
        <div className="d-flex justify-content-between align-items-start">
          <div className="gap-1">
            <p className="fs-6 text-muted lh-sm">My Deposits</p>
            <h6 className=" d-flex align-items-start lh-sm">$24000</h6>
          </div>
          <div>
            <Image src={Badge} alt="badge" />
          </div>
        </div>
        <div className="d-flex  mt-2">
          <div className="d-flex flex-grow-1 gap-3">
            <div>
              <p className="fs-6 text-muted lh-sm">Verification Limit</p>
              <h6 className="d-flex align-items-start lh-sm">$84,272</h6>
            </div>
            <div>
              <p className="fs-6 text-muted lh-sm">Provider</p>
              <h6 className="d-flex align-items-start lh-sm">Synaps</h6>
            </div>
          </div>
          <div>
            <Button
              className="button-dark text-white rounded-pill"
              variant="default"
            >
              Continue KYC
            </Button>
            <p className="text-center text-muted">Learn more</p>
          </div>
        </div>
      </Col>
    </Col>
  );
};

export default ThirdGrid;
