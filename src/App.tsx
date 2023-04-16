import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Home from "./components/home/Home";
import Tspice from "./components/WorldOfTspice/Tspice";
import Topbar from "./components/Topbar";
import PoolHistory from "./components/history/PoolHistory";
import AlertBox from "./atoms/AlertBox";
import { notify } from "./atoms/AlertType";

const App = () => {
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

  return (
    <Router>
      <div className="App d-flex">
        <Sidebar />
        <div className="flex-grow-1">
          <Topbar
            showCurrentAccount={showCurrentAccount}
            meta={metamaskConnected}
            showMeta={showmetamaskConnected}
            showcurrentBalance={showcurrentBalance}
            notify={notify}
          />
          <AlertBox />
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  currentAccount={currentAccount}
                  metamaskConnected={metamaskConnected}
                  notify={notify}
                />
              }
            />
            <Route
              path="/Activity"
              element={
                <Tspice currentAccount={currentAccount} notify={notify} />
              }
            />
            <Route path="/history" Component={PoolHistory}></Route>
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
