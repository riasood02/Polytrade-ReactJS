import React, { useEffect, useState } from "react";
import { Col } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import "../../style.css";
import PrimaryButton from "../../atoms/PrimaryButton";
import { validationLimit } from "../../Utils/SmartContractFunction";
import fractal from "../../svgs/fractal.png";
/**
 * BeforeKYC Status
 */

const BeforeKYC = () => {
  const [validateLimit, setvalidateLimit] = useState<string>();
  const callValidationLimit = async () => {
    const result = await validationLimit();
    setvalidateLimit(result);
  };

  useEffect(() => {
    callValidationLimit();
  }, []);

  return (
    <Col md={12} className="p-3 bg-white rounded-5 mt-5">
      <div className="d-flex justify-content-between align-items-start">
        <div className="gap-1">
          <p className="fs-4 text-muted lh-sm">Verification Limit</p>
          <h3 className=" d-flex align-items-start lh-sm">
            <b>{validateLimit}</b>
          </h3>
        </div>
        <div>
          <PrimaryButton btnName="Start KYC" />
        </div>
      </div>
      <div className="mt-2">
        <p className="d-flex align-items-start fs-4 text-muted lh-sm">
          Provider
        </p>
        <div className="d-flex align-items-center">
          <Image
            className="d-flex align-items-start"
            src={fractal}
            height={50}
            width={40}
          />
          <h3 className="d-flex align-items-start lh-sm">
            <b>Fractal</b>
          </h3>
        </div>
      </div>
    </Col>
  );
};

export default BeforeKYC;
