import lock from "../../svgs/Lock.svg";
import filled from "../../svgs/filled_amount_2.svg";
import stable from "../../svgs/stable.svg";
import bonus from "../../svgs/bonus.svg";
import total from "../../svgs/Total.svg";
import tstable from "../../svgs/T-Stable.svg";
import info from "../../svgs/info.svg";
import Image from "react-bootstrap/Image";
import { Col, Container, Row } from "react-bootstrap";
import RewardsPool from "./RewardsPool";
import PoolCard from "./PoolCard";
import React, { useEffect, useState } from "react";
import "../../style.css";
import {
  getCurrentPoolLiquidity,
  getDepositFunction,
  getRewardBalance,
  getStableBalance,
} from "../../Utils/SmartContractFunction";
import { addDollar, toDecimal } from "../../Utils/NumberFormattingFunctions";
import RewardsCalculate from "./RewardsCalculate";
import LendToken from "./LendToken";

/**
 * Lender Pool
 * @param {object} props Component props
 * @param {string | undefined} props.currentAccount current wallet account
 * @param {}
 */
const LenderPool = (props: {
  currentAccount: string | null | undefined;
  notify: (message: string, type: any) => void;
}) => {
  const [stableBalance, setStableBalance] = useState<string>();
  const [rewardBalance, setRewardBalance] = useState<string>();
  const [PoolLiquidity, setPoolLiquidity] = useState<string>();
  const [myDeposit, setmyDeposit] = useState<string>();

  const callGetDeposit = async () => {
    const result = await getDepositFunction(props.currentAccount);
    const response = toDecimal(result, 6);
    setmyDeposit(addDollar(response));
  };

  useEffect(() => {
    callGetDeposit();
  }, [props.currentAccount]);

  useEffect(() => {
    const callStableBalance = async () => {
      const result = await getStableBalance();
      setStableBalance(result);
    };

    const callRewardBalance = async () => {
      const result = await getRewardBalance();
      setRewardBalance(result);
    };

    const callLiquidityBalance = async () => {
      const result = await getCurrentPoolLiquidity();
      setPoolLiquidity(result);
    };

    callLiquidityBalance();
    callStableBalance();
    callRewardBalance();
  }, []);

  return (
    <Col sm={12} md={8} className="mt-3">
      <RewardsCalculate />
      <div className="my-5 bg-white mx-2 rounded-5 p-5">
        <LendToken
          notify={props.notify}
          currentAccount={props.currentAccount}
        />
        <Container className="py-2 mt-4">
          <Row className="gy-3 gx-3 mx-1">
            <div className="d-md-flex gap-3 justify-content-evenly">
              <PoolCard
                image={lock}
                FirstText="100 USDC"
                SecondText="Min Locked Amount"
              />
              <PoolCard
                image={filled}
                FirstText={PoolLiquidity}
                SecondText="Current Pool Liquidity"
              />
              <PoolCard
                image={stable}
                FirstText={stableBalance}
                SecondText="Fixed APR"
              />
            </div>
            <div className="d-md-flex gap-3 justify-content-evenly">
              <PoolCard
                image={bonus}
                FirstText={rewardBalance}
                SecondText="Bonus Rewards"
              />
              <PoolCard
                image={total}
                FirstText="1"
                SecondText="Total numer of invoices funded"
              />
              <PoolCard
                image={tstable}
                FirstText={myDeposit}
                SecondText="T-Stable Balance"
              />
            </div>
          </Row>
          <div className="d-flex gap-1 align-items-center m-3">
            <Image src={info} />
            <p className="fs-6 mb-0">
              Deposit limit will be 1000 USDT if you didn't verify KYC
            </p>
          </div>
        </Container>
      </div>
      <RewardsPool />
    </Col>
  );
};

export default LenderPool;
