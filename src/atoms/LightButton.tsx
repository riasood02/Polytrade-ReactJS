import React from "react";
import { Button } from "react-bootstrap";

const LightButton = (props: { btnName: string; onClick?: () => void }) => {
  return (
    <Button
      onClick={props.onClick}
      className="button-light rounded-pill px-4 py-2"
      variant="default"
    >
      {props.btnName}
    </Button>
  );
};

export default LightButton;
