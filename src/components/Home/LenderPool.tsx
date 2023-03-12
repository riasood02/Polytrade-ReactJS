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
import {
  getCurrentPoolLiquidity,
  getRewardBalance,
  getStableBalance,
} from "../../Utils/SmartContractFunction";
import { convertMatictoUSDC } from "../../Utils/NumberFormattingFunctions";

/**
 * Lender Pool
 * @param {object} props Component props
 * @param {string | undefined} props.currentBalance current wallet balance
 */
const LenderPool = (props: { currentBalance: string | undefined }) => {
  const [isError, setisError] = useState<boolean>(false);
  const [errors, setErrors] = useState<any>({});
  const [amount, setAmount] = useState<number>(0);
  const [stableBalance, setStableBalance] = useState<string>();
  const [rewardBalance, setRewardBalance] = useState<string>();
  const [PoolLiquidity, setPoolLiquidity] = useState<string>();
  const [show, setShow] = useState(false);

  const handleInputAmount = (event: any) => {
    setAmount(event.target.value);
    setisError(false);
    const balance = extractBalance();
    console.log(balance);
    if (!amount) {
      setisError(true);
      setErrors({ ...errors, amount: "Cant be empty" });
      console.log("Please enter a number");
    }
    if (amount < 10) {
      setisError(true);
      setErrors({ ...errors, amount: "must be greater than 100" });
      console.log("less than 100");
    }
    if (Number(amount) > Number(balance)) {
      setisError(true);
      setErrors({ ...errors, amount: "must be lower than balance" });
      console.log("more than balance");
    }
    if (!isError) {
      setErrors({ ...errors, amount: null });
    }
  };

  const extractBalance = () => {
    const bal = convertMatictoUSDC(props.currentBalance);
    const splitNumber = bal.split(" ");
    return splitNumber[0];
  };

  const handleSubmit = (e: any) => {
    if (!isError) {
      console.log("submitted", amount);
    }
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

  return (
    <Col sm={12} md={8} className="mt-3">
      <div className="d-flex justify-content-between">
        <ButtonGroup aria-label="Basic example">
          <Button
            style={{
              borderTopLeftRadius: "46px",
              borderBottomLeftRadius: "46px",
            }}
            variant="dark outline light"
          >
            USDC
          </Button>
          <Button variant="dark outline-light">USDT</Button>
          <Button
            style={{
              borderTopRightRadius: "46px",
              borderBottomRightRadius: "46px",
            }}
            variant="dark outline-light"
          >
            USDA
          </Button>
        </ButtonGroup>
        <Button className="text-white bg-dark rounded-pill" variant="default">
          Calculate Rewards
        </Button>
      </div>

      <div className="my-3 bg-white mx-2 rounded-4">
        <div className="d-flex justify-content-between">
          <div className="d-flex flex-grow-1 mx-3 mt-2">
            <Image src={usdc} />
            <div className="mx-2 mt-3">
              <h5 className="lh-sm">24% APR*</h5>
              <p className="fs-6 text-muted lh-sm">Polygon</p>
            </div>
          </div>
          <div className="d-flex m-4 gap-5 align-items-center">
            <a href="#" style={{ textDecoration: "none", fontWeight: "500" }}>
              View Contracts
            </a>
            <Button
              onClick={handleShow}
              style={{
                backgroundColor: "rgb(118,140,250",
                fontWeight: "700",
                minWidth: "150px",
              }}
              className="text-white rounded-pill"
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
                      <b>{convertMatictoUSDC(props.currentBalance)}</b>
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
                  <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check
                      type="checkbox"
                      label="Accept Terms and Conditions"
                    />
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="primary" onClick={handleSubmit}>
                  Lend
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
        <Container className="py-2">
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
                FirstText="3,75,481"
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
