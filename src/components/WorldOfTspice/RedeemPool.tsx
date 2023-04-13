import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import total from "../../svgs/Total.svg";
import "../../style.css";
import {
  getCurrentPoolLiquidity,
  getDepositFunction,
  getTUSDCBalance,
  redeemTSpiceBalance,
} from "../../Utils/SmartContractFunction";
import { addDollar, toDecimal } from "../../Utils/NumberFormattingFunctions";
import PrimaryButton from "../../atoms/PrimaryButton";
import Redeem from "./Modals/Redeem";
import ClaimUSDC from "./Modals/ClaimUSDC";
import { HistoryFetchData } from "../../Utils/FetchAPI";
const RedeemPool = (props: {
  currentAccount: string | null | undefined;
  notify: (message: string, type: any) => void;
}) => {
  const [myDeposit, setmyDeposit] = useState<string>("0");
  const [TUSDCBalance, setTUSDCBalance] = useState<number>(0);
  const [RedeemPoolLiquidity, setRedeemPoolLiquidity] = useState<string>("0");
  const [redeemDone, setredeemDone] = useState<boolean>(false);
  const [claimDone, setclaimDone] = useState<boolean>(false);
  const callGetDeposit = async () => {
    const result = await getDepositFunction(props.currentAccount);
    const response = toDecimal(result, 6);
    setmyDeposit(addDollar(response));
  };

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

  useEffect(() => {
    const callLiquidityBalance = async () => {
      const result = await getCurrentPoolLiquidity();
      setRedeemPoolLiquidity(result);
    };

    callLiquidityBalance();
  }, []);

  return (
    <Col md={12} className="mt-3">
      <div className="my-5 bg-white mx-2 rounded-5 p-5 d-flex gap-5">
        <Image className="mt-2 circle-icon" src={total}></Image>
        <div className="text-start">
          <h3 className="lh-sm">TSpice Balance</h3>
          <h3 className="lh-sm">{myDeposit}</h3>
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
          <h3 className="lh-sm">TSpice Balance in Wallet</h3>
          <h3 className="lh-sm">{addDollar(TUSDCBalance)}</h3>
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
