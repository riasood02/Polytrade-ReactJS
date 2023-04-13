import React from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import PrimaryButton from "../../atoms/PrimaryButton";

const RewardsCalculate = () => {
  return (
    <div className="d-flex justify-content-between">
      <ButtonGroup aria-label="Basic example">
        <Button
          className="radio-group-button-left p-3"
          variant="dark outline light"
        >
          USDC
        </Button>
        <Button className="p-3" variant="dark outline-light">
          USDT
        </Button>
        <Button
          className="radio-group-button-right p-3"
          variant="dark outline-light"
        >
          USDA
        </Button>
      </ButtonGroup>
      <PrimaryButton btnName="Calculate Rewards" />
    </div>
  );
};

export default RewardsCalculate;
