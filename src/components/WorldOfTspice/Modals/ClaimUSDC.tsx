import React, { useEffect, useState } from "react";
import PrimaryButton from "../../../atoms/PrimaryButton";
import { Button, Form, Modal, Spinner } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import tstable from "../../../svgs/T-Stable.svg";
import { toDecimal } from "../../../Utils/NumberFormattingFunctions";
import {
  approveTspiceSpendingLimit,
  claimUSDC,
  getTUSDCBalance,
} from "../../../Utils/SmartContractFunction";
import { TUSDCEthers } from "../../../Utils/Contracts/TUSDCContract";
import {
  ALERT_MESSAGES,
  ALERT_TYPE,
  APPROVAL,
  APPROVE_SPENDING_LIMIT,
  BALANCE,
  BUTTONS,
  ENTER_AMOUNT,
  INPUT_VALIDATION,
  TC,
  TOKEN_ADDRESS,
} from "../../../Data/Constants";

/**
 * Claim USDC
 * @param {object} props Component props
 * @param {string | null | undefined} props.currentAccount current wallet address
 * @param {(message: string, type:string) => void} props.notify displays alert dialogue box
 * @param {boolean} props.redeemDone is redeem done
 * @param {(b:boolean) => void} props.setredeemDone sets bool to the redeem done variable
 * @param {boolean} props.claimDone is claim done
 * @param {(b:boolean) => void} props.setclaimDone sets bool to the claim done variable
 */
const ClaimUSDC = (props: {
  currentAccount: string | null | undefined;
  notify: (message: string, type: any) => void;
  redeemDone: boolean;
  setredeemDone: (b: boolean) => void;
  claimDone: boolean;
  setclaimDone: (b: boolean) => void;
}) => {
  const [spin, setspin] = useState<boolean>(false);
  const [show, setShow] = useState(false);
  const [TUSDCBalance, setTUSDCBalance] = useState<number>(0);
  const [amount, setAmount] = useState<number>(0);
  const [isError, setisError] = useState<boolean>(false);
  const [errors, setErrors] = useState<any>({});
  const [isLend, setisLend] = useState<number>(0);
  const [approvalAmount, setapprovalAmount] = useState<number>(0);
  const [isDisableLend, setisDisableLend] = useState<boolean>(true);
  const [isDisableApprove, setisDisableApprove] = useState<boolean>(true);

  /**
   * closes the modal
   */
  const handleClose = () => {
    setShow(false);
    props.setclaimDone(false);
  };

  /**
   * opens the modal
   */
  const handleShow = () => setShow(true);

  /**
   * when the input box values is changed
   */
  const handleInputAmount = (event: any) => {
    setAmount(event.target.value);
    if (event.target.value === " ") {
      setisError(true);
      setErrors({ ...errors, amount: INPUT_VALIDATION.NOT_EMPTY });
    } else if (event.target.value > TUSDCBalance) {
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
      setisDisableApprove(false);
      setisLend(1);
    } else {
      setisDisableApprove(true);
      setisDisableLend(false);
      setisLend(0);
    }
  };

  /**
   * calling the approve function when button clicked
   */
  const onApprove = async (e: any) => {
    await approveTspiceSpendingLimit(amount);
    setisDisableApprove(true);
    setspin(true);
  };

  /**
   * calls the claimusdc function when button clicked
   */
  const handleSubmit = async (e: any) => {
    if (!isError && isLend === 1) {
      setErrors({ ...errors, checkbox: null });
      await claimUSDC(amount);
      props.notify(ALERT_MESSAGES.CLAIM_USDC, ALERT_TYPE.SUCCESS);
      props.setclaimDone(true);
    } else {
      setErrors({ ...errors, checkbox: "Cant be empty" });
    }
  };

  /**
   * This detects the approval event when approval transaction is processed
   */
  useEffect(() => {
    TUSDCEthers.on(APPROVAL, (owner: any, spender: any, value: number) => {
      let ApprovalEvent = {
        from: owner,
        to: spender,
        value: value,
      };
      if (
        ApprovalEvent.from === props.currentAccount &&
        ApprovalEvent.to === TOKEN_ADDRESS.TUSDC &&
        toDecimal(ApprovalEvent.value, 6) >= Number(amount)
      ) {
        setapprovalAmount(toDecimal(ApprovalEvent.value, 0));
        setisDisableLend(false);
        setisDisableApprove(true);
        props.notify(ALERT_MESSAGES.APPROVE, ALERT_TYPE.INFO);
        setspin(false);
      }
    });
  }, [props.currentAccount]);

  /**
   * this gets the Tspice balance
   */
  const callgetTUSDCBalance = async () => {
    if (props.currentAccount !== undefined || null) {
      var response = await getTUSDCBalance(props.currentAccount);
      setTUSDCBalance(response);
    }
  };

  useEffect(() => {
    callgetTUSDCBalance();
  }, [props.currentAccount, props.redeemDone, props.claimDone]);

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
    <>
      <div>
        <PrimaryButton btnName="Claim USDC" onClick={handleShow} />
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header className="border-0" closeButton>
          <Modal.Title className="modalHeader mt-4">
            <div className="d-flex align-items-center bg-light p-2  rounded-pill">
              <Image src={tstable} />
              <h1 className="mb-0">TSPICE</h1>
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
                    {BALANCE.TSPICE}
                  </Form.Label>

                  <Form.Text>
                    <b>{TUSDCBalance}</b>
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
            {BUTTONS.REDEEM}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ClaimUSDC;
