import React, { useState } from "react";
import { Container, Row } from "react-bootstrap";
import LenderPool from "./components/Home/LenderPool";
import Pool from "./components/Home/Pool";
import OverviewPool from "./components/Home/OverviewPool";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import Alert from "./components/Alert";

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

  return (
    <div className="app d-flex">
      <Sidebar />
      <div className="flex-grow-1">
        <Topbar
          showCurrentAccount={showCurrentAccount}
          meta={metamaskConnected}
          showMeta={showmetamaskConnected}
          alert={alert}
          showAlert={showAlert}
          showcurrentBalance={showcurrentBalance}
        />
        <div className="main-body container-true p-4">
          {alert.message !== null && (
            <Alert alert={alert} showAlert={showAlert} />
          )}
          <Pool />
          <Container fluid>
            <Row>
              <LenderPool currentBalance={currentBalance} />
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
