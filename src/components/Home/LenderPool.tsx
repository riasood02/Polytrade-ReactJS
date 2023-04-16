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
  getRewardBalance,
  getStableBalance,
} from "../../Utils/SmartContractFunction";
import RewardsCalculate from "./RewardsCalculate";
import LendToken from "./LendToken";
import { INFO_LINE } from "../../Data/Constants";

/**
 * Lender Pool
 * @param {object} props Component props
 * @param {string | undefined} props.currentAccount current wallet account
 * @param {(message: string, type:string) => void} props.notify displays alert dialogue box
 * @param {string} props.myDeposit gets the deposits of the user
 */
const LenderPool = (props: {
  currentAccount: string | null | undefined;
  notify: (message: string, type: string) => void;
  myDeposit: string;
}) => {
  const [stableBalance, setStableBalance] = useState<string>();
  const [rewardBalance, setRewardBalance] = useState<string>();
  const [PoolLiquidity, setPoolLiquidity] = useState<string>();

  /**
   * Calculates all the values of the Lender Pool and sets their variables
   */
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
      <div className="my-4 bg-white mx-1 rounded-5 p-3">
        <LendToken
          currentAccount={props.currentAccount}
          notify={props.notify}
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
                FirstText={props.myDeposit}
                SecondText="T-Stable Balance"
              />
            </div>
          </Row>
          <div className="d-flex gap-1 align-items-center m-3">
            <Image src={info} />
            <p className="fs-6 mb-0 text-muted">{INFO_LINE}</p>
          </div>
        </Container>
      </div>
      <RewardsPool />
    </Col>
  );
};

export default LenderPool;
