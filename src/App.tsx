import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Root from "./Root";
import ErrorPage from "./components/ErrorPage";
import Sidebar from "./components/Sidebar";
import home from "./components/home/Home";
import Tspice from "./components/WorldOfTspice/Tspice";
import Topbar from "./components/Topbar";
import { ToastContainer, toast } from "react-toastify";
import PoolHistory from "./components/history/PoolHistory";
// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Root />,
//     errorElement: <ErrorPage />,
//   },
//   {
//     path: "/Activity",
//     element: <Root />,
//     errorElement: <ErrorPage />,
//   },
// ]);

function App() {
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
    <Router>
      <div className="App d-flex">
        <Sidebar />
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
        <div className="flex-grow-1">
          <Topbar
            showCurrentAccount={showCurrentAccount}
            meta={metamaskConnected}
            showMeta={showmetamaskConnected}
            showcurrentBalance={showcurrentBalance}
            notify={notify}
          />
          <Routes>
            <Route path="/" Component={home}></Route>
            <Route path="/Activity" Component={Tspice}></Route>
            <Route path="/history" Component={PoolHistory}></Route>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
