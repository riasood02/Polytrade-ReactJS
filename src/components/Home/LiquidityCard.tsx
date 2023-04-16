import React from "react";
import { Col } from "react-bootstrap";
import LineChart from "./LineChart";

/**
 * Liquidity card
 * @param {object} props Component props
 * @param {string} props.FirstText headline
 * @param {string} props.SecondText value
 * @param {(invoice:number) => void} props.showtotalInvoice sets the total invoices funded
 */
const LiquidityCard = (props: {
  FirstText: string;
  SecondText: string;
  showtotalInvoice: (invoice: number) => void;
}) => {
  return (
    <Col md={12} className="bg-white p-3 rounded-5 mt-4">
      <div className="d-flex align-items-start">
        <p className="fs-6 lh-sm text-muted">{props.FirstText}</p>
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

export default LiquidityCard;
