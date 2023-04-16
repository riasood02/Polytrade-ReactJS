import React, { useEffect, useState } from "react";
import Image from "react-bootstrap/Image";
import arrow from "../../svgs/keyboard_arrow_right.svg";
import { APIFetcher } from "../../Utils/FetchAPI";
import { BasecoinAPI } from "../../Data/Urls";
import { POOL } from "../../Data/Constants";
/**
 * Pool line Component
 */
const Pool = () => {
  const [currentPrice, setcurrentPrice] = useState<number>();
  const [imageURL, setimageURL] = useState<string>();
  const [symbol, setSymbol] = useState<string>();

  /**
   * This gets the current price of the Polytrade Coin and its symbol
   * displays on the web page
   */
  useEffect(() => {
    APIFetcher(
      `${BasecoinAPI}coins/markets?vs_currency=usd&ids=polytrade`
    ).then((res) => {
      setcurrentPrice(res[0].current_price);
      setimageURL(res[0].image);
      setSymbol(res[0].symbol);
    });
  }, []);
  return (
    <div className="d-flex justify-content-between p-1">
      <b className="fs-5">{POOL}</b>
      <div className="d-flex align-items-center gap-2">
        <Image src={imageURL} alt="logo" height={20} />
        <p className="mb-0">
          <b className="fs-5">
            {currentPrice} {symbol?.toUpperCase()}
          </b>
        </p>
        <Image src={arrow} alt="arrow" />
      </div>
    </div>
  );
};

export default Pool;
