import React, { useEffect, useState } from "react";
import { Col } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import total from "../../svgs/Total.svg";
import "../../style.css";
import {
  getDepositFunction,
  getTUSDCBalance,
} from "../../Utils/SmartContractFunction";
import { addDollar, toDecimal } from "../../Utils/NumberFormattingFunctions";
import Redeem from "./Modals/Redeem";
import ClaimUSDC from "./Modals/ClaimUSDC";

/**
 * Redeem Pool
 * @param {object} props Component props
 * @param {string | undefined} props.currentAccount current wallet account
 * @param {(message: string, type:string) => void} props.notify displays alert dialogue box
 */
const RedeemPool = (props: {
  currentAccount: string | null | undefined;
  notify: (message: string, type: any) => void;
}) => {
  const [myDeposit, setmyDeposit] = useState<string>("0");
  const [TUSDCBalance, setTUSDCBalance] = useState<number>(0);
  const [redeemDone, setredeemDone] = useState<boolean>(false);
  const [claimDone, setclaimDone] = useState<boolean>(false);

  /**
   * this gets the deposits of the user
   */
  const callGetDeposit = async () => {
    const result = await getDepositFunction(props.currentAccount);
    const response = toDecimal(result, 6);
    setmyDeposit(addDollar(response));
  };

  /**
   * This gets the Tspice balance
   */
  useEffect(() => {
    const callgetTUSDCBalance = async () => {
      if (props.currentAccount !== undefined || null) {
        var response = await getTUSDCBalance(props.currentAccount);
        setTUSDCBalance(response);
      }
    };
    callgetTUSDCBalance();
  }, [props.currentAccount, redeemDone]);

  useEffect(() => {
    callGetDeposit();
  }, [props.currentAccount, redeemDone]);

  return (
    <Col md={12} sm={8} className="mt-3">
      <div className="my-5 bg-white mx-2 rounded-5 p-4 d-flex justify-content-between gap-4">
        <Image className="mt-2 circle-icon" src={total}></Image>
        <div className="text-start">
          <h5 className="lh-sm">TSpice Balance</h5>
          <h5 className="lh-sm">{myDeposit}</h5>
        </div>
        <div></div>
        <div></div>
        <div></div>
        <Redeem
          currentAccount={props.currentAccount}
          notify={props.notify}
          redeemDone={redeemDone}
          setredeemDone={setredeemDone}
        />
        <Image className="mt-2 circle-icon" src={total}></Image>
        <div className="text-start">
          <h5 className="lh-sm">TSpice Balance in Wallet</h5>
          <h5 className="lh-sm">{addDollar(TUSDCBalance)}</h5>
        </div>
        <div></div>
        <div></div>
        <div></div>
        <ClaimUSDC
          currentAccount={props.currentAccount}
          notify={props.notify}
          redeemDone={redeemDone}
          setredeemDone={setredeemDone}
          claimDone={claimDone}
          setclaimDone={setclaimDone}
        />
      </div>
    </Col>
  );
};

export default RedeemPool;
