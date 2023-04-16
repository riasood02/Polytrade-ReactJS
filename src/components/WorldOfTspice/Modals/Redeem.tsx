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
import {
  ALERT_MESSAGES,
  ALERT_TYPE,
  BALANCE,
  BUTTONS,
  ENTER_AMOUNT,
  INPUT_VALIDATION,
  TC,
} from "../../../Data/Constants";

/**
 * Redeem
 * @param {object} props Component props
 * @param {string | null | undefined} props.currentAccount current wallet address
 * @param {(message: string, type:string) => void} props.notify displays alert dialogue box
 * @param {boolean} props.redeemDone is redeem done
 * @param {(b:boolean) => void} props.setredeemDone sets bool to the redeem done variable
 */
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

  /**
   * closes the modal
   */
  const handleClose = () => {
    setShow(false);
    props.setredeemDone(false);
    setAmount(0);
  };

  /**
   * opens the modal
   */
  const handleShow = () => setShow(true);
  const callGetDeposit = async () => {
    const result = await getDepositFunction(props.currentAccount);
    const response = toDecimal(result, 6);
    setmyDeposit(response);
    console.log(myDeposit);
  };

  /**
   * when the input box values is changed
   */
  const handleInputAmount = (event: any) => {
    setAmount(event.target.value);
    if (event.target.value === 0) {
      setisError(true);
      setErrors({ ...errors, amount: INPUT_VALIDATION.NOT_EMPTY });
    } else if (event.target.value > Number(myDeposit)) {
      setisError(true);
      setErrors({ ...errors, amount: INPUT_VALIDATION.NOT_LOWER });
    } else {
      setisError(false);
      setErrors({ ...errors, amount: null });
    }
  };

  /**
   * handles the value when changed
   */
  const handleChange = (event: any) => {
    if (event.target.checked) {
      setisDisableRedeem(false);
      setisLend(1);
    } else {
      setisDisableRedeem(true);
      setisLend(0);
    }
  };

  /**
   * calls the claimusdc function when button clicked
   */
  const handleSubmit = async (e: any) => {
    if (!isError && isLend === 1) {
      setErrors({ ...errors, checkbox: null });
      await redeemTSpiceBalance(amount * 1000000);
      props.setredeemDone(true);
      props.notify(ALERT_MESSAGES.WITHDRAW, ALERT_TYPE.INFO);
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
        <PrimaryButton btnName={BUTTONS.REDEEM} onClick={handleShow} />
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
                <Form.Label>{ENTER_AMOUNT}</Form.Label>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label className="text-muted">
                    {BALANCE.WALLET}
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
                {TC}
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
            {BUTTONS.REDEEM}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Redeem;
