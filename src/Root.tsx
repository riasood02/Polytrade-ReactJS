import React from "react";
import { Container, Row } from "react-bootstrap";
import LenderPool from "./components/Home/LenderPool";
import Pool from "./components/Home/Pool";
import OverviewPool from "./components/Home/OverviewPool";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";

const Root = () => {
  return (
    <div className="app d-flex">
      <Sidebar />
      <div className="flex-grow-1">
        <Topbar />
        <div className="main-body container-true p-4">
          <Pool />
          <Container fluid>
            <Row>
              <LenderPool />
              <OverviewPool />
            </Row>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default Root;
