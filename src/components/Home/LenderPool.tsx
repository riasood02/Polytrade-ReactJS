import lock from "../../svgs/Lock.svg";
import filled from "../../svgs/filled_amount_2.svg";
import stable from "../../svgs/stable.svg";
import bonus from "../../svgs/bonus.svg";
import total from "../../svgs/Total.svg";
import tstable from "../../svgs/T-Stable.svg";
import usdc from "../../svgs/usdc.svg";
import info from "../../svgs/info.svg";
import Image from "react-bootstrap/Image";
import { Button, ButtonGroup, Col, Container, Row } from "react-bootstrap";
import RewardsPool from "./RewardsPool";
import PoolCard from "./PoolCard";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import React, { useEffect, useState } from "react";
import "../../style.css";
import {
  approveSpendingLimit,
  getCurrentPoolLiquidity,
  getDepositFunction,
  getRewardBalance,
  getStableBalance,
  getUSDCBalance,
  sendUSDCtoLenderPool,
} from "../../Utils/SmartContractFunction";
import {
  addDollar,
  addUSDC,
  convertMatictoUSDC,
  toDecimal,
} from "../../Utils/NumberFormattingFunctions";

/**
 * Lender Pool
 * @param {object} props Component props
 * @param {string | undefined} props.currentBalance current wallet balance
 */
const LenderPool = (props: {
  currentBalance: string | undefined;
  currentAccount: string | null | undefined;
}) => {
  const [isError, setisError] = useState<boolean>(false);
  const [errors, setErrors] = useState<any>({});
  const [amount, setAmount] = useState<number>(0);
  const [stableBalance, setStableBalance] = useState<string>();
  const [rewardBalance, setRewardBalance] = useState<string>();
  const [PoolLiquidity, setPoolLiquidity] = useState<string>();
  const [show, setShow] = useState(false);
  const [USDCbal, setUSDCbal] = useState<Number>(0);
  const [isLend, setisLend] = useState<number>(0);
  const [myDeposit, setmyDeposit] = useState<string>();

  const callGetDeposit = async () => {
    const result = await getDepositFunction(props.currentAccount);
    const response = toDecimal(result, 6);
    setmyDeposit(addDollar(response));
  };
  useEffect(() => {
    callGetDeposit();
  }, [props.currentAccount]);
  const handleChange = (event: any) => {
    if (event.target.checked) {
      setisLend(1);
    } else {
      setisLend(0);
    }
  };
  const handleInputAmount = (event: any) => {
    setAmount(event.target.value);
    if (event.target.value === " ") {
      setisError(true);
      setErrors({ ...errors, amount: "Cant be empty" });
    } else if (event.target.value < Number(100)) {
      setisError(true);
      setErrors({ ...errors, amount: "must be greater than 100" });
    } else if (event.target.value > Number(USDCbal)) {
      setisError(true);
      setErrors({ ...errors, amount: "must be lower than balance" });
    } else {
      setisError(false);
      setErrors({ ...errors, amount: null });
    }
  };

  const handleSubmit = async (e: any) => {
    if (!isError && isLend === 1) {
      console.log("submitted", amount);
      setErrors({ ...errors, checkbox: null });
      await sendUSDCtoLenderPool(props.currentAccount, amount);
    } else {
      setErrors({ ...errors, checkbox: "Cant be empty" });
    }
  };
  const func = async (e: any) => {
    await approveSpendingLimit(props.currentAccount, amount);
  };
  const handleClose = () => setShow(false);

  const handleShow = () => setShow(true);

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
  useEffect(() => {
    const callgetUSDCBalance = async () => {
      if (props.currentAccount !== undefined || null) {
        var response = await getUSDCBalance(props.currentAccount);
        setUSDCbal(response);
      }
    };
    callgetUSDCBalance();
  }, [props.currentAccount]);

  return (
    <Col sm={12} md={8} className="mt-3">
      <div className="d-flex justify-content-between">
        <ButtonGroup aria-label="Basic example">
          <Button
            className="radio-group-button-left p-3"
            variant="dark outline light"
          >
            USDC
          </Button>
          <Button className="p-3" variant="dark outline-light">
            USDT
          </Button>
          <Button
            className="radio-group-button-right p-3"
            variant="dark outline-light"
          >
            USDA
          </Button>
        </ButtonGroup>
        <Button
          className=" button-dark rounded-pill px-4 py-3 fs-4"
          variant="default"
        >
          Calculate Rewards
        </Button>
      </div>

      <div className="my-5 bg-white mx-2 rounded-5 p-5">
        <div className="d-flex justify-content-between">
          <div className="d-flex flex-grow-1 mx-3 mt-2">
            <Image height={120} src={usdc} />
            <div className="mx-2 mt-3">
              <h1 className="lh-sm">
                <b>24% APR*</b>
              </h1>
              <p className="fs-5 text-muted lh-sm">Polygon</p>
            </div>
          </div>
          <div className="d-flex m-4 gap-5 align-items-center">
            <a href="#" className="link-style">
              <h4>View Contracts</h4>
            </a>
            <Button
              onClick={handleShow}
              className="button-dark text-white rounded-pill fs-4 px-4 py-3"
              variant="default"
            >
              Lend Now
            </Button>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>
                  <div className="d-flex justify-content-center align-items-center">
                    <Image src={usdc} />
                    <h3>USDC</h3>
                  </div>
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Wallet Balance:</Form.Label>

                    <Form.Text>
                      <b>{addUSDC(USDCbal)}</b>
                    </Form.Text>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="Amount">
                    <Form.Label>Enter Amount</Form.Label>
                    <Form.Control
                      placeholder="Amount in USDC"
                      autoFocus
                      required
                      value={amount}
                      onChange={handleInputAmount}
                      isInvalid={!!errors.amount}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.amount}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group
                    className="mb-3 d-flex"
                    controlId="formBasicCheckbox"
                  >
                    <Form.Check
                      type="checkbox"
                      label="Accept&nbsp;"
                      value={isLend}
                      onChange={handleChange}
                      required
                      isInvalid={!!errors.checkbox}
                    />
                    <a className="text-dark" href="#">
                      Terms and Conditions
                    </a>
                    <Form.Control.Feedback type="invalid">
                      {errors.checkbox}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="primary" onClick={handleSubmit}>
                  Lend
                </Button>
                <Button variant="primary" onClick={func}>
                  Approve Spending Limit
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
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
