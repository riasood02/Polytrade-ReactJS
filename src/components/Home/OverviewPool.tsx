import React, { useState } from "react";
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
import { addDollar } from "../../Utils/NumberFormattingFunctions";
/**
 * Liquidity card
 * @param {object} props Component props
 * @param {string} props.FirstText headline
 * @param {string} props.SecondText value
 */
const LiquidityCard = (props: {
  FirstText: string;
  SecondText: string;
  showtotalInvoice: (invoice: number) => void;
}) => {
  return (
    <Col md={12} className="bg-white p-3 rounded-5 mt-5">
      <div className="d-flex align-items-start">
        <p className="fs-4 lh-sm text-muted">{props.FirstText}</p>
      </div>
      <div className="d-flex align-items-start">
        <h3 className="lh-sm">
          <b>{props.SecondText}</b>
        </h3>
      </div>
      <LineChart showtotalInvoice={props.showtotalInvoice} />
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
  const [totalInvoice, settotalInvoice] = useState<number>();
  const showtotalInvoice = (invoice: number) => {
    settotalInvoice(invoice);
  };
  return (
    <Col md={4}>
      <div className="d-flex align-items-center justify-content-between">
        <div className="bd-highlight">
          <h3>
            <b>Overview</b>
          </h3>
        </div>
        <div className="p-2 bd-highlight">
          <Dropdown>
            <Dropdown.Toggle
              variant="default"
              className="fw-normal fs-3 border-0 bg-white rounded-pill px-5"
              id="dropdown-basic"
            >
              USD
            </Dropdown.Toggle>

            <Dropdown.Menu className="rounded-4 w-100">
              <Dropdown.Item href="#/action-1">
                <b>Action</b>
              </Dropdown.Item>
              <Dropdown.Item href="#/action-2">
                <b>Another action</b>
              </Dropdown.Item>
              <Dropdown.Item href="#/action-3">
                <b>Something else</b>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
      <div className="mt-5">
        <LiquidityCard
          FirstText="Total Polytrade Liquidity"
          SecondText="$17,683,857,723"
          showtotalInvoice={showtotalInvoice}
        ></LiquidityCard>
        <LiquidityCard
          FirstText="Total Invoice Funded"
          SecondText={addDollar(totalInvoice)}
          showtotalInvoice={showtotalInvoice}
        ></LiquidityCard>
        {props.meta ? (
          <AfterKYC currentAccount={props.currentAccount} meta={props.meta} />
        ) : (
          <BeforeKYC />
        )}
      </div>
    </Col>
  );
};

export default OverviewPool;
