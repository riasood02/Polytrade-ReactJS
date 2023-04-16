import React from "react";
import { Button } from "react-bootstrap";

const PrimaryButton = (props: { btnName: string; onClick?: () => void }) => {
  return (
    <Button
      onClick={props.onClick}
      className=" button-dark rounded-pill px-5 py-3 fs-6"
      variant="default"
    >
      {props.btnName}
    </Button>
  );
};

export default PrimaryButton;
