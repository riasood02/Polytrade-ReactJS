import React, { useState } from "react";
import Pool from "./Pool";
import { Container, Row } from "react-bootstrap";
import LenderPool from "./LenderPool";
import OverviewPool from "./OverviewPool";
import RedeemPool from "../WorldOfTspice/RedeemPool";
import PoolHistory from "../history/PoolHistory";
import { toast, ToastContainer } from "react-toastify";

const Home = () => {
  const [currentAccount, setcurrentAccount] = useState<
    string | null | undefined
  >();
  const showCurrentAccount = (address: string | null | undefined) => {
    setcurrentAccount(address);
  };
  const [metamaskConnected, setmetamaskConnected] = useState<boolean>(false);
  const showmetamaskConnected = (b: boolean) => {
    setmetamaskConnected(b);
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
      <Pool />
      <Container fluid>
        <Row>
          <LenderPool currentAccount={currentAccount} notify={notify} />
          <OverviewPool
            meta={metamaskConnected}
            currentAccount={currentAccount}
          />
        </Row>
      </Container>
    </div>
  );
};

export default Home;
