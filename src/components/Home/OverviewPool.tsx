import React from "react";
import "../../style.css";
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
/**
 * Liquidity card
 * @param {object} props Component props
 * @param {string} props.FirstText headline
 * @param {string} props.SecondText value
 */
const LiquidityCard = (props: { FirstText: string; SecondText: string }) => {
  return (
    <Col md={12} className="bg-white p-2 rounded-4 mt-2">
      <div className="d-flex align-items-start">
        <p className="fs-6 lh-sm text-muted">{props.FirstText}</p>
      </div>
      <div className="d-flex align-items-start">
        <h6 className="lh-sm">{props.SecondText}</h6>
      </div>
      <LineChart />
    </Col>
  );
};

/**
 * OverView Pool
 * @param {object} props Component props
 * @param {string | null | undefined} props.currentAccount current wallet address
 * @param {boolean} props.meta is metamask connected
 */
const OverviewPool = (props: {
  currentAccount: string | null | undefined;
  meta: boolean;
}) => {
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
        FirstText="Total Polytrade Liquidity"
        SecondText="$17,683,857,723"
      ></LiquidityCard>
      <LiquidityCard
        FirstText="Total Invoice Funded"
        SecondText="$24,00"
      ></LiquidityCard>
      {props.meta ? (
        <AfterKYC currentAccount={props.currentAccount} meta={props.meta} />
      ) : (
        <BeforeKYC />
      )}
    </Col>
  );
};

export default OverviewPool;
