import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import Pool from "./components/Pool";
import FirstGrid from "./components/FirstGrid";
import ThirdGrid from "./components/ThirdGrid";
import { Container, Row } from "react-bootstrap";
import Alert from "./components/Alert";

function App() {
  const [alert, setAlert] = useState<{
    message: string | null;
    type: string | null;
  }>({ message: null, type: null });

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
    <div className="App d-flex">
      <Sidebar />
      <div className="flex-grow-1">
        <Topbar alert={alert} showAlert={showAlert} />

        <div
          className="container-true p-4"
          style={{
            backgroundColor: "rgb(244,248,251)",
            minHeight: "calculateNewValue(100vh-115px)",
            color: "rgb(10,11,32)",
            borderTopLeftRadius: "46px",
          }}
        >
          {alert.message !== null && (
            <Alert alert={alert} showAlert={showAlert} />
          )}
          <Pool />
          <Container fluid>
            <Row>
              <FirstGrid />
              <ThirdGrid />
            </Row>
          </Container>
        </div>
      </div>
    </div>
  );
}

export default App;
