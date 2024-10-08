import React from "react";
import { Button, Col } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import info from "../../svgs/info.svg";
import "../../style.css";
import LightButton from "../../atoms/LightButton";
/**
 * Trade Card
 * @param {object} props Component props
 * @param {string} props.FirstText headline
 * @param {string} props.SecondText value
 */
const TradeCard = ({
  FirstText,
  SecondText,
}: {
  FirstText: string;
  SecondText: string;
}) => {
  return (
    <Col md={6} className="p-4 bg-white rounded-5 ">
      <div className="d-flex align-items-start">
        <div className="flex-grow-1">
          <div className="d-flex align-items-start">
            <h1>
              <b>{FirstText}</b>
            </h1>
          </div>

          <div className="d-flex gap-1 align-items-center">
            <p className="fs-5 mb-0 text-muted">{SecondText}</p>
            <Image src={info} />
          </div>
        </div>
        <div className="d-flex align-items-center">
          <LightButton btnName="Claim" />
        </div>
      </div>
    </Col>
  );
};

export default TradeCard;
