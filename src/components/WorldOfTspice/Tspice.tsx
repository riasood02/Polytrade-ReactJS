import React, { useState } from "react";
import RedeemPool from "./RedeemPool";
import PoolHistory from "../history/PoolHistory";
import { ToastContainer, toast } from "react-toastify";
import { getDepositFunction } from "../../Utils/SmartContractFunction";
import { addDollar, toDecimal } from "../../Utils/NumberFormattingFunctions";

const Tspice = (props: {
  currentAccount: string | null | undefined;
  notify: (message: string, type: string) => void;
}) => {
  return (
    <div className="main-body container-true p-4 h-100">
      <RedeemPool currentAccount={props.currentAccount} notify={props.notify} />
    </div>
  );
};

export default Tspice;
