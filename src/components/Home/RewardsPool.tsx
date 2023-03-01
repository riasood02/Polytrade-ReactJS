import React from "react";
import { Container, Row } from "react-bootstrap";
import TradeCard from "./TradeCard";
/**
 * second grid
 */
const RewardsPool = () => {
  return (
    <div className="my-4 bg-transparent">
      <Container>
        <Row className="gx-4 justify-content-between">
          <div className="d-md-flex gap-3 justify-content-around">
            <TradeCard FirstText="9,582 USDC" SecondText="My Stable Interest" />
            <TradeCard FirstText="884 TRADE" SecondText="My Bonus Rewards" />
          </div>
        </Row>
      </Container>
    </div>
  );
};
export default RewardsPool;
