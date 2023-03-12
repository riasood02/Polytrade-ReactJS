import React from "react";
import Image from "react-bootstrap/Image";
import logoIcon from "../../svgs/logo_icon.svg";
import arrow from "../../svgs/keyboard_arrow_right.svg";
/**
 * Pool line Component
 */
const Pool = () => {
  return (
    <div className="d-flex justify-content-between">
      <b>Pool</b>
      <div className="d-flex align-items-center gap-2">
        <Image src={logoIcon} alt="logo" />
        <p className="mb-0">$0.324 TRADE</p>
        <Image src={arrow} alt="arrow" />
      </div>
    </div>
  );
};

export default Pool;
