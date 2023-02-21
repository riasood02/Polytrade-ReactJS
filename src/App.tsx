import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import Pool from "./components/Pool";
import FirstGrid from "./components/FirstGrid";
import ThirdGrid from "./components/ThirdGrid";
import { Container, Row } from "react-bootstrap";

function App() {
  return (
    <div className="App d-flex">
      <Sidebar />
      <div className="flex-grow-1">
        <Topbar />
        <div
          className="container-true p-4"
          style={{
            backgroundColor: "rgb(244,248,251)",
            minHeight: "calculateNewValue(100vh-115px)",
            color: "rgb(10,11,32)",
            borderTopLeftRadius: "46px",
          }}
        >
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
