import React, { useEffect, useState } from "react";
import usdc from "../../svgs/usdc.svg";
import PrimaryButton from "../../atoms/PrimaryButton";
import { Button, Form, Modal, Spinner } from "react-bootstrap";
import { addUSDC, toDecimal } from "../../Utils/NumberFormattingFunctions";
import Image from "react-bootstrap/Image";
import {
  approveSpendingLimit,
  getUSDCBalance,
  sendUSDCtoLenderPool,
} from "../../Utils/SmartContractFunction";
import { USDCContractEthers } from "../../Utils/Contracts/USDCTokenContract";
import "../../style.css";
import {
  ALERT_MESSAGES,
  ALERT_TYPE,
  APPROVAL,
  APPROVE_SPENDING_LIMIT,
  APR_VALUE,
  ENTER_AMOUNT,
  INPUT_VALIDATION,
  POLYGON,
  TC,
  USDC,
  TOKEN_ADDRESS,
  VIEW_CONTRACT,
  BALANCE,
  BUTTONS,
} from "../../Data/Constants";

const LendToken = (props: {
  currentAccount: string | null | undefined;
  notify: (message: string, type: string) => void;
}) => {
  const [spin, setspin] = useState<boolean>(false);
  const [isDisableLend, setisDisableLend] = useState<boolean>(true);
  const [isDisableApprove, setisDisableApprove] = useState<boolean>(true);
  const [show, setShow] = useState(false);
  const [isError, setisError] = useState<boolean>(false);
  const [errors, setErrors] = useState<any>({});
  const [amount, setAmount] = useState<number>(0);
  const [isLend, setisLend] = useState<number>(0);
  const [USDCbal, setUSDCbal] = useState<Number>(0);
  const [approvalAmount, setapprovalAmount] = useState<number>(0);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  /**
   * calling the approve function when button clicked
   */
  const onApprove = async () => {
    await approveSpendingLimit(amount);
    setisDisableApprove(true);
    setspin(true);
  };

  /**
   * handles the value when changed
   */
  const handleChange = (event: any) => {
    if (event.target.checked) {
      setisDisableApprove(false);
      setisLend(1);
    } else {
      setisDisableApprove(true);
      setisDisableLend(false);
      setisLend(0);
    }
  };

  /**
   * gets the TSpice balance of the user
   */
  useEffect(() => {
    const callgetUSDCBalance = async () => {
      if (props.currentAccount !== undefined || null) {
        var response = await getUSDCBalance(props.currentAccount);
        setUSDCbal(response);
      }
    };
    callgetUSDCBalance();
  }, [props.currentAccount]);

  /**
   * calls the send USDC to Lender Pool function when button clicked
   */
  const handleSubmit = async () => {
    if (!isError && isLend === 1) {
      setErrors({ ...errors, checkbox: null });
      await sendUSDCtoLenderPool(amount);
      props.notify(ALERT_MESSAGES.DEPOSIT, ALERT_TYPE.INFO);
    } else {
      setErrors({ ...errors, checkbox: "Cant be empty" });
    }
  };

  /**
   * when the input box values is changed
   */
  const handleInputAmount = (event: any) => {
    setAmount(event.target.value);
    if (event.target.value === " ") {
      setisError(true);
      setErrors({ ...errors, amount: INPUT_VALIDATION.NOT_EMPTY });
    } else if (event.target.value < Number(100)) {
      setisError(true);
      setErrors({ ...errors, amount: INPUT_VALIDATION.GREATER_THAN });
    } else if (event.target.value > Number(USDCbal)) {
      setisError(true);
      setErrors({ ...errors, amount: INPUT_VALIDATION.NOT_LOWER });
    } else {
      setisError(false);
      setErrors({ ...errors, amount: null });
    }
  };

  /**
   * This detects the approval event when approval transaction is processed
   */
  useEffect(() => {
    USDCContractEthers.on(
      APPROVAL,
      (owner: any, spender: any, value: number) => {
        let ApprovalEvent = {
          from: owner,
          to: spender,
          value: value,
        };
        if (
          ApprovalEvent.from === props.currentAccount &&
          ApprovalEvent.to === TOKEN_ADDRESS.USDC &&
          toDecimal(ApprovalEvent.value, 0) >= Number(amount)
        ) {
          setapprovalAmount(toDecimal(ApprovalEvent.value, 0));
          setisDisableLend(false);
          setisDisableApprove(true);
          props.notify(ALERT_MESSAGES.APPROVE, ALERT_TYPE.INFO);
          setspin(false);
        }
      }
    );
  }, [props.currentAccount]);

  useEffect(() => {
    if (approvalAmount) {
      if (Number(amount) <= approvalAmount) {
        setisDisableApprove(true);
        setisDisableLend(false);
      } else {
        setisDisableApprove(false);
        setisDisableLend(true);
      }
    }
  }, [amount, props.currentAccount]);

  return (
    <div className="d-flex justify-content-between">
      <div className="d-flex flex-grow-1 mx-3 mt-2">
        <Image height={120} src={usdc} />
        <div className="mx-2 mt-3">
          <h1 className="lh-sm">
            <b>{APR_VALUE}</b>
          </h1>
          <p className="fs-5 text-muted lh-sm">{POLYGON}</p>
        </div>
      </div>
      <div className="d-flex m-4 gap-5 align-items-center">
        <a href="#" className="link-style">
          <h4>{VIEW_CONTRACT}</h4>
        </a>
        <PrimaryButton btnName="Lend Now" onClick={handleShow} />

        <Modal show={show} onHide={handleClose}>
          <Modal.Header className="border-0" closeButton>
            <Modal.Title className="modalHeader mt-4">
              <div className="d-flex align-items-center bg-light p-2  rounded-pill">
                <Image src={usdc} />
                <h1 className="mb-0">{USDC}</h1>
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
                      <b>{addUSDC(USDCbal)}</b>
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
              className="mr-auto button-light rounded-pill px-4 py-2"
              variant="default"
              onClick={onApprove}
              disabled={isDisableApprove}
            >
              {spin && (
                <Spinner
                  className="mx-1"
                  as="span"
                  variant="dark"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                  animation="border"
                />
              )}
              {APPROVE_SPENDING_LIMIT}
            </Button>
            <Button
              className="flex-fill button-dark rounded-pill px-4 py-1 fs-4"
              variant="default"
              disabled={isDisableLend}
              onClick={handleSubmit}
            >
              {BUTTONS.LEND}
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default LendToken;
