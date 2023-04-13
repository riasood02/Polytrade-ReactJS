import React, { useEffect, useState } from "react";
import PrimaryButton from "../../../atoms/PrimaryButton";
import { Button, Form, Modal, Spinner } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import tstable from "../../../svgs/T-Stable.svg";
import { addUSDC, toDecimal } from "../../../Utils/NumberFormattingFunctions";
import {
  approveTspiceSpendingLimit,
  claimUSDC,
  getTUSDCBalance,
} from "../../../Utils/SmartContractFunction";
import { TUSDCEthers } from "../../../Utils/Contracts/TUSDCContract";
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
  const handleClose = () => {
    setShow(false);
    props.setclaimDone(false);
  };
  const handleShow = () => setShow(true);

  const handleInputAmount = (event: any) => {
    setAmount(event.target.value);
    if (event.target.value === " ") {
      setisError(true);
      setErrors({ ...errors, amount: "Cant be empty" });
    } else if (event.target.value > TUSDCBalance) {
      setisError(true);
      setErrors({ ...errors, amount: "must be lower than balance" });
    } else {
      setisError(false);
      setErrors({ ...errors, amount: null });
    }
  };
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
  const onApprove = async (e: any) => {
    await approveTspiceSpendingLimit(props.currentAccount, amount);
    setisDisableApprove(true);
    setspin(true);
  };

  const handleSubmit = async (e: any) => {
    if (!isError && isLend === 1) {
      setErrors({ ...errors, checkbox: null });
      await claimUSDC(amount);
      props.notify("claimed USDC successfully", "success");
      props.setclaimDone(true);
    } else {
      setErrors({ ...errors, checkbox: "Cant be empty" });
    }
  };

  useEffect(() => {
    TUSDCEthers.on("Approval", (owner: any, spender: any, value: number) => {
      let ApprovalEvent = {
        from: owner,
        to: spender,
        value: value,
      };
      // console.log(ApprovalEvent);
      // console.log(
      //   props.currentAccount,
      //   Number(amount),
      //   toDecimal(ApprovalEvent.value, 6)
      // );
      if (
        ApprovalEvent.from === props.currentAccount &&
        ApprovalEvent.to === "0xA72AfE1Ac88fB999AeF61FBB866F8C4Ad6B25dDb" &&
        toDecimal(ApprovalEvent.value, 6) >= Number(amount)
      ) {
        setapprovalAmount(toDecimal(ApprovalEvent.value, 0));
        setisDisableLend(false);
        setisDisableApprove(true);
        props.notify("approve transaction submitted", "info");
        setspin(false);
      }
    });
  }, [amount, props.currentAccount]);
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
                <Form.Label>Enter Amount</Form.Label>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label className="text-muted">
                    TSpice Balance:
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
            Approve Spending Limit
          </Button>
          <Button
            className="flex-fill button-dark rounded-pill px-4 py-1 fs-4"
            variant="default"
            disabled={isDisableLend}
            onClick={handleSubmit}
          >
            Redeem
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ClaimUSDC;
