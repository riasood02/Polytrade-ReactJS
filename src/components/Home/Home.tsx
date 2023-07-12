import React, { useEffect, useState } from "react";
import Pool from "./Pool";
import { Container, Row } from "react-bootstrap";
import LenderPool from "./LenderPool";
import OverviewPool from "./OverviewPool";
import RedeemPool from "../WorldOfTspice/RedeemPool";
import PoolHistory from "../history/PoolHistory";
import { toast, ToastContainer } from "react-toastify";
import {
  getDepositFunction,
  validationLimit,
} from "../../Utils/SmartContractFunction";
import { addDollar, toDecimal } from "../../Utils/NumberFormattingFunctions";

/**
 * Home Page
 * @param {object} props Component props
 * @param {string | null | undefined} props.currentAccount current wallet address
 * @param {boolean} props.metamaskConnected is metamask connected
 * @param {(message: string, type:string) => void} props.notify displays alert dialogue box
 */
const Home = (props: {
  currentAccount: string | null | undefined;
  metamaskConnected: boolean;
  notify: (message: string, type: string) => void;
}) => {
  const [myDeposit, setmyDeposit] = useState<string>("");
  const [validateLimit, setvalidateLimit] = useState<string>("");

  /**
   * gets the deposits of the user by calling the function from smart contract
   */
  const callGetDeposit = async () => {
    const result = await getDepositFunction(props.currentAccount);
    const response = toDecimal(result, 6);
    setmyDeposit(addDollar(response));
  };

  /**
   * gets the validation limit by calling the function from smart contract
   */
  const callValidationLimit = async () => {
    const result = await validationLimit();
    setvalidateLimit(result);
  };

  useEffect(() => {
    callGetDeposit();
    callValidationLimit();
  }, [props.currentAccount]);

  return (
    <div className="main-body container-true p-4">
      <Pool />
      <Container fluid>
        <Row>
          <LenderPool
            currentAccount={props.currentAccount}
            notify={props.notify}
            myDeposit={myDeposit}
          />
          <OverviewPool
            meta={props.metamaskConnected}
            currentAccount={props.currentAccount}
            myDeposit={myDeposit}
            validateLimit={validateLimit}
          />
        </Row>
      </Container>
    </div>
  );
};

export default Home;
