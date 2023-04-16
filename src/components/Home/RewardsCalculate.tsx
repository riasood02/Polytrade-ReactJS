import React from "react";
import PrimaryButton from "../../atoms/PrimaryButton";
import { POOL } from "../../Data/Constants";

const RewardsCalculate = () => {
  return (
    <div className="d-flex justify-content-between">
      <div className="d-flex">
        <div className="d-flex align-items-center radio-group-button-left bg-white">
          <h5 className="mx-4">{POOL}</h5>
          <PrimaryButton btnName="USDC" />
        </div>
      </div>

      <PrimaryButton btnName="Calculate Rewards" />
    </div>
  );
};

export default RewardsCalculate;
