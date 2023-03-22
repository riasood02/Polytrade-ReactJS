import React, { useEffect, useState } from "react";
import Image from "react-bootstrap/Image";
import logoIcon from "../../svgs/logo_icon.svg";
import arrow from "../../svgs/keyboard_arrow_right.svg";
import { PolytradeCurrentPrice } from "../../Utils/FetchAPI";
/**
 * Pool line Component
 */
const Pool = () => {
  const [currentPrice, setcurrentPrice] = useState<number>();
  const [imageURL, setimageURL] = useState<string>();
  const [symbol, setSymbol] = useState<string>();
  useEffect(() => {
    PolytradeCurrentPrice.then((res) => {
      setcurrentPrice(res[0].current_price);
      setimageURL(res[0].image);
      setSymbol(res[0].symbol);
    });
  }, []);
  return (
    <div className="d-flex justify-content-between p-3">
      <b className="fs-3">Pool</b>
      <div className="d-flex align-items-center gap-2">
        <Image src={imageURL} alt="logo" height={30} />
        <p className="mb-0">
          <b className="fs-4">
            {currentPrice} {symbol?.toUpperCase()}
          </b>
        </p>
        <Image src={arrow} alt="arrow" />
      </div>
    </div>
  );
};

export default Pool;
