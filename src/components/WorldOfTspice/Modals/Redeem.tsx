import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import tstable from "../../../svgs/T-Stable.svg";
import PrimaryButton from "../../../atoms/PrimaryButton";
import {
  getDepositFunction,
  redeemTSpiceBalance,
} from "../../../Utils/SmartContractFunction";
import "../../../style.css";
import { addDollar, toDecimal } from "../../../Utils/NumberFormattingFunctions";
const Redeem = (props: {
  currentAccount: string | null | undefined;
  notify: (message: string, type: any) => void;
  redeemDone: boolean;
  setredeemDone: (b: boolean) => void;
}) => {
  const [myDeposit, setmyDeposit] = useState<number>(0);
  const [show, setShow] = useState(false);
  const [amount, setAmount] = useState<number>(0);
  const [isError, setisError] = useState<boolean>(false);
  const [errors, setErrors] = useState<any>({});
  const [isLend, setisLend] = useState<number>(0);
  const [isDisableRedeem, setisDisableRedeem] = useState<boolean>(true);
  const handleClose = () => {
    setShow(false);
    props.setredeemDone(false);
    setAmount(0);
  };
  const handleShow = () => setShow(true);
  const callGetDeposit = async () => {
    const result = await getDepositFunction(props.currentAccount);
    const response = toDecimal(result, 6);
    setmyDeposit(response);
    console.log(myDeposit);
  };
  const handleInputAmount = (event: any) => {
    setAmount(event.target.value);
    if (event.target.value === 0) {
      setisError(true);
      setErrors({ ...errors, amount: "Cant be zero" });
    } else if (event.target.value > Number(myDeposit)) {
      setisError(true);
      setErrors({ ...errors, amount: "must be lower than balance" });
    } else {
      setisError(false);
      setErrors({ ...errors, amount: null });
    }
  };
  const handleChange = (event: any) => {
    if (event.target.checked) {
      setisDisableRedeem(false);
      setisLend(1);
    } else {
      setisDisableRedeem(true);
      setisLend(0);
    }
  };
  const handleSubmit = async (e: any) => {
    if (!isError && isLend === 1) {
      setErrors({ ...errors, checkbox: null });
      await redeemTSpiceBalance(amount * 1000000);
      props.setredeemDone(true);
      props.notify("Withdrawn transaction submitted", "info");
    } else {
      setErrors({ ...errors, checkbox: "Cant be empty" });
    }
  };

  useEffect(() => {
    callGetDeposit();
  }, [props.currentAccount, props.redeemDone]);

  return (
    <>
      <div>
        <PrimaryButton btnName="Redeem" onClick={handleShow} />
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header className="border-0" closeButton>
          <Modal.Title className="modalHeader mt-4">
            <div className="d-flex align-items-center bg-light p-2  rounded-pill">
              <Image className="circle-icon" src={tstable} />
              <h1 className="mb-0">SPICE</h1>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="mx-3 modal-dialogue">
          <Form>
            <Form.Group className="mb-3" controlId="Amount">
              <div className="d-flex justify-content-between">
                <Form.Label>Enter Amount</Form.Label>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label className="text-muted">
                    Wallet Balance:
                  </Form.Label>

                  <Form.Text>
                    <b>{addDollar(myDeposit)}</b>
                  </Form.Text>
                </Form.Group>
              </div>

              <Form.Control
                className="rounded-4"
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
              className="p-3 d-flex justify-content-center"
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
        <Modal.Footer className="d-flex border-0 mb-3">
          <Button
            className="flex-fill button-dark rounded-pill px-4 py-1 fs-4"
            variant="default"
            disabled={isDisableRedeem}
            onClick={handleSubmit}
          >
            Redeem
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Redeem;
