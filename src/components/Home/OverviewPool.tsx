import React, { useState } from "react";
import "../../style.css";
import { Col, Dropdown } from "react-bootstrap";
import BeforeKYC from "./BeforeKYC";
import AfterKYC from "./AfterKYC";
import { addDollar } from "../../Utils/NumberFormattingFunctions";
import LiquidityCard from "./LiquidityCard";

/**
 * OverView Pool
 * @param {object} props Component props
 * @param {string | null | undefined} props.currentAccount current wallet address
 * @param {boolean} props.meta is metamask connected
 * @param {string} props.myDeposit gets the my deposits of the user
 * @param {string} props.validateLimit gets validation limit
 */
const OverviewPool = (props: {
  currentAccount: string | null | undefined;
  meta: boolean;
  myDeposit: string;
  validateLimit: string;
}) => {
  const [totalInvoice, settotalInvoice] = useState<number>();

  /**
   * Sets the total invoices funded
   */
  const showtotalInvoice = (invoice: number) => {
    settotalInvoice(invoice);
  };

  return (
    <Col md={4}>
      <div className="d-flex align-items-center justify-content-between mt-3">
        <div className="bd-highlight">
          <h4>
            <b>Overview</b>
          </h4>
        </div>
        <div className="p-2 bd-highlight">
          <Dropdown>
            <Dropdown.Toggle
              variant="default"
              className="fw-normal fs-5 border-0 bg-white rounded-pill px-5"
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
      <div>
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
          <AfterKYC
            currentAccount={props.currentAccount}
            meta={props.meta}
            myDeposit={props.myDeposit}
            validateLimit={props.validateLimit}
          />
        ) : (
          <BeforeKYC validateLimit={props.validateLimit} />
        )}
      </div>
    </Col>
  );
};

export default OverviewPool;
