import React, { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import LenderPool from "./components/Home/LenderPool";
import Pool from "./components/Home/Pool";
import OverviewPool from "./components/Home/OverviewPool";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Root = () => {
  const [alert, setAlert] = useState<{
    message: string | null;
    type: string | null;
  }>({ message: null, type: null });
  const [currentAccount, setcurrentAccount] = useState<
    string | null | undefined
  >();
  const showCurrentAccount = (address: string | null | undefined) => {
    setcurrentAccount(address);
  };
  const [currentBalance, setcurrentBalance] = useState<string>();
  const showcurrentBalance = (bal: string | undefined) => {
    setcurrentBalance(bal);
  };
  const [metamaskConnected, setmetamaskConnected] = useState<boolean>(false);
  const showmetamaskConnected = (b: boolean) => {
    setmetamaskConnected(b);
  };
  const showAlert = (message: string | null, type: string | null) => {
    setAlert({
      message: message,
      type: type,
    });
    setTimeout(() => {
      setAlert({ message: null, type: null });
    }, 3000);
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
    <div className="app d-flex">
      <Sidebar />
      <div className="flex-grow-1">
        <Topbar
          showCurrentAccount={showCurrentAccount}
          meta={metamaskConnected}
          showMeta={showmetamaskConnected}
          showcurrentBalance={showcurrentBalance}
          notify={notify}
        />
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
        <div className="main-body container-true p-4">
          <Pool />
          <Container fluid>
            <Row>
              <LenderPool
                currentBalance={currentBalance}
                currentAccount={currentAccount}
                notify={notify}
              />
              <OverviewPool
                meta={metamaskConnected}
                currentAccount={currentAccount}
              />
            </Row>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default Root;
