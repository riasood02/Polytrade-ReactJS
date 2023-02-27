import React from "react";
import Image from "react-bootstrap/Image";
import { Col } from "react-bootstrap";
import info from "../svgs/info.svg";
/**
 * Pool Cards
 * @param {object} props Component props
 * @param {string} props.im relative path for the image
 * @param {number} props.txt1 headline
 * @param {string} props.txt2 value
 */
const PoolCard = ({
  im,
  txt1,
  txt2,
}: {
  im: string;
  txt1: number | undefined;
  txt2: string;
}) => {
  return (
    <Col md={4} className="bg-light p-3 rounded-4">
      <div className="d-flex align-items-start">
        <Image
          className="mt-2"
          style={{
            background:
              "linear-gradient(46.48deg, #EDDDEB -2.88%, #A2A5F4 52.25%, #98B8EF 105.13%)",
            padding: "10px",
            borderRadius: "45px",
            alignItems: "start",
          }}
          src={im}
        ></Image>
      </div>
      <div className="d-flex align-items-start">
        <h2 className="py-1 text-align-start">
          <b>{txt1}</b>
        </h2>
      </div>

      <div className="d-flex gap-1 align-items-start">
        <p className="fs-6 mb-0 text-muted">{txt2}</p>
        <Image src={info} />
      </div>
    </Col>
  );
};
export default PoolCard;
