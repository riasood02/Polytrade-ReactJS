import React, { useState } from "react";
import RedeemPool from "./RedeemPool";
import PoolHistory from "../history/PoolHistory";
import { ToastContainer, toast } from "react-toastify";

const Tspice = () => {
  const [currentAccount, setcurrentAccount] = useState<
    string | null | undefined
  >();
  const showCurrentAccount = (address: string | null | undefined) => {
    setcurrentAccount(address);
  };
  const notify = (message: string, type?: any) => {
    if (type === "success")
      toast.success(message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: false,
        progress: undefined,
        theme: "light",
      });
    else if (type === "info")
      toast.info(message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: false,
        progress: undefined,
        theme: "light",
      });
    else if (type === "warn")
      toast.warn(message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: false,
        progress: undefined,
        theme: "light",
      });
    else if (type === "error")
      toast.error(message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: false,
        progress: undefined,
        theme: "light",
      });
    else
      toast(message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: false,
        progress: undefined,
        theme: "light",
      });
  };
  return (
    <div className="main-body container-true p-4">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
        theme="light"
      />
      <RedeemPool currentAccount={currentAccount} notify={notify} />
    </div>
  );
};

export default Tspice;
