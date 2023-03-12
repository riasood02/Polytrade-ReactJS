import React, { useState } from "react";
import { Button, Col } from "react-bootstrap";
import Badge from "../svgs/Badge.svg";
import Image from "react-bootstrap/Image";

/**
 * BeforeKYC Status
 */
const BeforeKYC = () => {
  return (
    <Col md={12} className="mt-2 p-3 bg-white rounded-4">
      <div className="d-flex justify-content-between align-items-start">
        <div className="gap-1">
          <p className="fs-6 text-muted lh-sm">Verification Limit</p>
          <h6 className=" d-flex align-items-start lh-sm">$0.01</h6>
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
            Start KYC
          </Button>
        </div>
      </div>
      <div className="mt-2">
        <p className="d-flex align-items-start fs-6 text-muted lh-sm">
          Provider
        </p>
        <h6 className="d-flex align-items-start lh-sm">Synaps</h6>
      </div>
    </Col>
  );
};

export default BeforeKYC;
