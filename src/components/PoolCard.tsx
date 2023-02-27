import React from "react";
import Image from "react-bootstrap/Image";
import { Col } from "react-bootstrap";
import info from "../svgs/info.svg";
import "../style.css";
/**
 * Pool Cards
 * @param {object} props Component props
 * @param {string} props.image relative path for the image
 * @param {string} props.FirstText headline
 * @param {string} props.SecondText value
 */
const PoolCard = ({
  image,
  FirstText,
  SecondText,
}: {
  image: string;
  FirstText: string;
  SecondText: string;
}) => {
  return (
    <Col md={4} className="bg-light p-3 rounded-4">
      <div className="d-flex align-items-start">
        <Image className="circle-icon mt-2" src={image}></Image>
      </div>
      <div className="d-flex align-items-start">
        <h2 className="py-1 text-align-start">
          <b>{FirstText}</b>
        </h2>
      </div>

      <div className="d-flex gap-1 align-items-start">
        <p className="fs-6 mb-0 text-muted">{SecondText}</p>
        <Image src={info} />
      </div>
    </Col>
  );
};
export default PoolCard;
