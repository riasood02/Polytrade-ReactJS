import lock from "../svgs/Lock.svg";
import filled from "../svgs/filled_amount_2.svg";
import stable from "../svgs/stable.svg";
import bonus from "../svgs/bonus.svg";
import total from "../svgs/Total.svg";
import tstable from "../svgs/T-Stable.svg";
import usdc from "../svgs/usdc.svg";
import info from "../svgs/info.svg";
import Image from "react-bootstrap/Image";
import { Button, ButtonGroup, Col, Container, Row } from "react-bootstrap";
import SecondGrid from "./SecondGrid";
import PoolCard from "./PoolCard";
import React from "react";
import "../style.css";
/**
 * First Pool Grid
 */
const FirstGrid = () => {
  return (
    <Col sm={12} md={8} className="mt-3">
      <div className="d-flex justify-content-between">
        <ButtonGroup aria-label="Basic example">
          <Button className="radio-group-button" variant="dark outline light">
            USDC
          </Button>
          <Button variant="dark outline-light">USDT</Button>
          <Button className="radio-group-button" variant="dark outline-light">
            USDA
          </Button>
        </ButtonGroup>
        <Button className="text-white bg-dark rounded-pill" variant="default">
          Calculate Rewards
        </Button>
      </div>

      <div className="my-3 bg-white mx-2 rounded-4">
        <div className="d-flex justify-content-between">
          <div className="d-flex flex-grow-1 mx-3 mt-2">
            <Image src={usdc} />
            <div className="mx-2 mt-3">
              <h5 className="lh-sm">24% APR*</h5>
              <p className="fs-6 text-muted lh-sm">Polygon</p>
            </div>
          </div>
          <div className="d-flex m-4 gap-5 align-items-center">
            <a href="#" className="link-style">
              View Contracts
            </a>
            <Button
              className="button-dark text-white rounded-pill"
              variant="default"
            >
              Lend Now
            </Button>
          </div>
        </div>
        <Container className="py-2">
          <Row className="gy-3 gx-3 mx-1">
            <div className="d-md-flex gap-3 justify-content-evenly">
              <PoolCard
                image={lock}
                FirstText="100 USDC"
                SecondText="Min Locked Amount"
              />
              <PoolCard
                image={filled}
                FirstText="9,876,543 USDC"
                SecondText="Current Pool Liquidity"
              />
              <PoolCard image={stable} FirstText="12%" SecondText="Fixed APR" />
            </div>
            <div className="d-md-flex gap-3 justify-content-evenly">
              <PoolCard
                image={bonus}
                FirstText="12%"
                SecondText="Bonus Rewards"
              />
              <PoolCard
                image={total}
                FirstText="1"
                SecondText="Total numer of invoices funded"
              />
              <PoolCard
                image={tstable}
                FirstText="375,481"
                SecondText="T-Stable Balance"
              />
            </div>
          </Row>
          <div className="d-flex gap-1 align-items-center m-3">
            <Image src={info} />
            <p className="fs-6 mb-0">
              Deposit limit will be 1000 USDT if you didn't verify KYC
            </p>
          </div>
        </Container>
      </div>
      <SecondGrid />
    </Col>
  );
};

export default FirstGrid;
