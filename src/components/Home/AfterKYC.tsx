import React, { useEffect, useState } from "react";
import Badge from "../../svgs/Badge.svg";
import Image from "react-bootstrap/Image";
import { Button, Col } from "react-bootstrap";
import {
  getDepositFunction,
  getKYCValidation,
  validationLimit,
} from "../../Utils/SmartContractFunction";
import { addDollar, toDecimal } from "../../Utils/NumberFormattingFunctions";
import "../../style.css";

/**
 * AfterKYC Status
 * @param {object} props Component props
 * @param {string | null | undefined} props.currentAccount current wallet address
 * @param {boolean} props.meta is metamask connected
 */

const AfterKYC = (props: {
  currentAccount: string | null | undefined;
  meta: boolean;
}) => {
  const [KYCVerified, setKYCVerified] = useState<boolean>();
  const [myDeposit, setmyDeposit] = useState<string>();
  const [validateLimit, setvalidateLimit] = useState<string>();
  /**
   * get My Deposits by calling function from smart contract
   */
  const callValidationLimit = async () => {
    const result = await validationLimit();
    setvalidateLimit(result);
  };
  const callGetDeposit = async () => {
    const result = await getDepositFunction(props.currentAccount);
    const response = toDecimal(result, 6);
    setmyDeposit(addDollar(response));
  };

  /**
   * Check if user wallet account is KYC Verified
   */
  const callKYCVerification = async () => {
    if (props.meta === true) {
      const result = await getKYCValidation(props.currentAccount);
      setKYCVerified(result);
    }
  };

  useEffect(() => {
    callKYCVerification();
    callGetDeposit();
  }, [props.currentAccount]);
  useEffect(() => {
    callValidationLimit();
  }, []);

  return (
    <Col md={12} className="mt-5 p-3 bg-white rounded-4">
      <div className="d-flex justify-content-between align-items-start">
        <div className="gap-1">
          <p className="fs-4 text-muted lh-sm">My Deposits</p>
          <h3 className=" d-flex align-items-start lh-sm">
            <b>{myDeposit}</b>
          </h3>
        </div>
        {KYCVerified && (
          <div>
            <Image src={Badge} height={50} alt="badge" />
          </div>
        )}
      </div>
      <div className="d-flex  mt-2">
        <div className="d-flex flex-grow-1 gap-3">
          <div>
            <p className="fs-4 text-muted lh-sm">Verification Limit</p>
            <h3 className="d-flex align-items-start lh-sm">
              <b>{validateLimit}</b>
            </h3>
          </div>
          {KYCVerified && (
            <div>
              <p className="fs-4 text-muted lh-sm">Provider</p>
              <h3 className="d-flex align-items-start lh-sm">
                <b>Synaps</b>
              </h3>
            </div>
          )}
        </div>
        {!KYCVerified && (
          <div>
            <Button
              className="button-dark text-white rounded-pill"
              variant="default"
            >
              Start KYC
            </Button>
            <p className="text-center text-muted">Learn more</p>
          </div>
        )}
      </div>
    </Col>
  );
};

export default AfterKYC;
