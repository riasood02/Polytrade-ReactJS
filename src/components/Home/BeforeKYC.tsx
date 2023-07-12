import React, { useEffect, useState } from "react";
import { Col } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import "../../style.css";
import PrimaryButton from "../../atoms/PrimaryButton";
import { validationLimit } from "../../Utils/SmartContractFunction";
import fractal from "../../svgs/fractal.png";
import { FRACTAL, PROVIDER, VERIFICATION_LIMIT } from "../../Data/Constants";

/**
 * BeforeKYC Status
 * @param {string} props.validateLimit gets the validation limit
 */
const BeforeKYC = (props: { validateLimit: string }) => {
  return (
    <Col md={12} className="p-3 bg-white rounded-5 mt-5">
      <div className="d-flex justify-content-between align-items-start">
        <div className="gap-1">
          <p className="fs-4 text-muted lh-sm">{VERIFICATION_LIMIT}</p>
          <h3 className=" d-flex align-items-start lh-sm">
            <b>{props.validateLimit}</b>
          </h3>
        </div>
        <div>
          <PrimaryButton btnName="Start KYC" />
        </div>
      </div>
      <div className="mt-2">
        <p className="d-flex align-items-start fs-4 text-muted lh-sm">
          {PROVIDER}
        </p>
        <div className="d-flex align-items-center">
          <Image
            className="d-flex align-items-start"
            src={fractal}
            height={50}
            width={40}
          />
          <h3 className="d-flex align-items-start lh-sm">
            <b>{FRACTAL}</b>
          </h3>
        </div>
      </div>
    </Col>
  );
};

export default BeforeKYC;
