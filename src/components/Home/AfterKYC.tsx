import React, { useEffect, useState } from "react";
import Badge from "../../svgs/Badge.svg";
import Image from "react-bootstrap/Image";
import { Button, Col } from "react-bootstrap";
import {
  getDepositFunction,
  getKYCValidation,
} from "../../Utils/SmartContractFunction";

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

  /**
   * get My Deposits by calling function from smart contract
   */
  const callGetDeposit = async () => {
    const result = await getDepositFunction(props.currentAccount);
    setmyDeposit(result);
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

  return (
    <Col md={12} className="mt-2 p-3 bg-white rounded-4">
      <div className="d-flex justify-content-between align-items-start">
        <div className="gap-1">
          <p className="fs-6 text-muted lh-sm">My Deposits</p>
          <h6 className=" d-flex align-items-start lh-sm">{myDeposit}</h6>
        </div>
        {KYCVerified && (
          <div>
            <Image src={Badge} alt="badge" />
          </div>
        )}
      </div>
      <div className="d-flex  mt-2">
        <div className="d-flex flex-grow-1 gap-3">
          <div>
            <p className="fs-6 text-muted lh-sm">Verification Limit</p>
            <h6 className="d-flex align-items-start lh-sm">$0.01</h6>
          </div>
          {KYCVerified && (
            <div>
              <p className="fs-6 text-muted lh-sm">Provider</p>
              <h6 className="d-flex align-items-start lh-sm">Synaps</h6>
            </div>
          )}
        </div>
        {!KYCVerified && (
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
            <p className="text-center text-muted">Learn more</p>
          </div>
        )}
      </div>
    </Col>
  );
};

export default AfterKYC;
