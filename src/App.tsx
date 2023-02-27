import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import Pool from "./components/Pool";
import FirstGrid from "./components/FirstGrid";
import ThirdGrid from "./components/ThirdGrid";
import { Container, Row } from "react-bootstrap";
import "./style.css";

function App() {
  return (
    <div className="App d-flex">
      <Sidebar />
      <div className="flex-grow-1">
        <Topbar />
        <div className="main-body container-true p-4">
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
