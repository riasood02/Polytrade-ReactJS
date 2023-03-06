import React from "react";
import Badge from "../svgs/Badge.svg";
import Image from "react-bootstrap/Image";
import { Button, Col } from "react-bootstrap";
const AfterKYC = () => {
  return (
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
            style={{
              backgroundColor: "rgb(118,140,250)",
              fontWeight: "700",
              minWidth: "150px",
            }}
            className="text-white rounded-pill"
            variant="default"
          >
            Continue KYC
          </Button>
          <p className="text-center text-muted">Learn more</p>
        </div>
      </div>
    </Col>
  );
};

export default AfterKYC;
