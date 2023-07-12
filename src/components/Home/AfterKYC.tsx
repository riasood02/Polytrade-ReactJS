import React, { useEffect, useState } from "react";
import Badge from "../../svgs/Badge.svg";
import Image from "react-bootstrap/Image";
import { Button, Col } from "react-bootstrap";
import {
  getKYCProviderInfo,
  getKYCValidation,
} from "../../Utils/SmartContractFunction";
import "../../style.css";
import { KYCProvider } from "../../Data/KYCProviders";
import {
  LEARN_MORE,
  MY_DEPOSITS,
  START_KYC,
  VERIFICATION_LIMIT,
} from "../../Data/Constants";

/**
 * AfterKYC Status
 * @param {object} props Component props
 * @param {string | null | undefined} props.currentAccount current wallet address
 * @param {boolean} props.meta is metamask connected
 * @param {string} props.myDeposit gets my Deposits of the user
 */
const AfterKYC = (props: {
  currentAccount: string | null | undefined;
  meta: boolean;
  myDeposit: string;
  validateLimit: string;
}) => {
  const [KYCVerified, setKYCVerified] = useState<boolean>();

  const [KYCInfo, setKYCInfo] = useState<{ name: string; icon: string }>({
    name: "",
    icon: "",
  });

  /**
   * gets KYC Provider of the user by calling the function from smart contract
   */
  const callGetKYCUserProvider = async () => {
    const result = await getKYCProviderInfo(props.currentAccount);
    for (let i = 0; i < KYCProvider.length; i++) {
      if (KYCProvider[i].id === result) {
        setKYCInfo({ name: KYCProvider[i].name, icon: KYCProvider[i].icon });
        break;
      }
    }
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
    callGetKYCUserProvider();
  }, [props.currentAccount]);

  return (
    <Col md={12} className="mt-5 p-3 bg-white rounded-4">
      <div className="d-flex justify-content-between align-items-start">
        <div className="gap-1">
          <p className="fs-4 text-muted lh-sm">{MY_DEPOSITS}</p>
          <h3 className=" d-flex align-items-start lh-sm">
            <b>{props.myDeposit}</b>
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
            <p className="fs-4 text-muted lh-sm">{VERIFICATION_LIMIT}</p>
            <h3 className="d-flex align-items-start lh-sm">
              <b>{props.validateLimit}</b>
            </h3>
          </div>
          {KYCVerified && (
            <div>
              <p className="fs-4 text-muted lh-sm">Provider</p>
              <div className="d-flex align-items-center">
                <Image src={KYCInfo.icon} height={70} />
                <h3 className="d-flex align-items-start lh-sm">
                  <b>{KYCInfo.name}</b>
                </h3>
              </div>
            </div>
          )}
        </div>
        {!KYCVerified && (
          <div>
            <Button
              className="button-dark text-white rounded-pill"
              variant="default"
            >
              {START_KYC}
            </Button>
            <p className="text-center text-muted">{LEARN_MORE}</p>
          </div>
        )}
      </div>
    </Col>
  );
};

export default AfterKYC;
