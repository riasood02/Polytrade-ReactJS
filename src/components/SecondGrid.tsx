import React from "react";
import { Container, Row } from "react-bootstrap";
import TradeCard from "./TradeCard";
/**
 * second grid
 */
const SecondGrid = () => {
  return (
    <div className="my-4 bg-transparent">
      <Container>
        <Row className="gx-4 justify-content-between">
          <div className="d-md-flex gap-3 justify-content-around">
            <TradeCard txt1="9,582 USDC" txt2="My Stable Interest" />
            <TradeCard txt1="884 TRADE" txt2="My Bonus Rewards" />
          </div>
        </Row>
      </Container>
    </div>
  );
};
export default SecondGrid;
