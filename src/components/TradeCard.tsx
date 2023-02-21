import React from "react";
import { Button, Col } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import info from "../svgs/info.svg";
/**
 * Trade Card
 * @param {object} props Component props
 * @param {string} props.txt1 headline
 * @param {string} props.txt2 value
 */
const TradeCard = ({ txt1, txt2 }: { txt1: string; txt2: string }) => {
  return (
    <Col md={6} className="p-4 bg-white rounded-4">
      <div className="d-flex align-items-start">
        <div className="flex-grow-1">
          <div className="d-flex align-items-start">
            <h2>
              <b>{txt1}</b>
            </h2>
          </div>

          <div className="d-flex gap-1 align-items-center">
            <p className="fs-6 mb-0 text-muted">{txt2}</p>
            <Image src={info} />
          </div>
        </div>
        <div className="d-flex align-items-center">
          <Button
            style={{
              color: "rgb(10,11,32)",
              backgroundColor: "rgb(244,248,251)",
              fontWeight: "500",
            }}
            className="rounded-pill"
            variant="default"
          >
            Claim
          </Button>
        </div>
      </div>
    </Col>
  );
};

export default TradeCard;
