import React, { useState } from "react";
import { Button, Col } from "react-bootstrap";
import Badge from "../svgs/Badge.svg";
import Image from "react-bootstrap/Image";
import "../../style.css";
/**
 * BeforeKYC Status
 */
const BeforeKYC = () => {
  return (
    <Col md={12} className="p-3 bg-white rounded-5 mt-5">
      <div className="d-flex justify-content-between align-items-start">
        <div className="gap-1">
          <p className="fs-4 text-muted lh-sm">Verification Limit</p>
          <h3 className=" d-flex align-items-start lh-sm">
            <b>$0.01</b>
          </h3>
        </div>
        <div>
          <Button
            className="button-dark text-white rounded-pill"
            variant="default"
          >
            Start KYC
          </Button>
        </div>
      </div>
      <div className="mt-2">
        <p className="d-flex align-items-start fs-4 text-muted lh-sm">
          Provider
        </p>
        <h3 className="d-flex align-items-start lh-sm">
          <b>Synaps</b>
        </h3>
      </div>
    </Col>
  );
};

export default BeforeKYC;
