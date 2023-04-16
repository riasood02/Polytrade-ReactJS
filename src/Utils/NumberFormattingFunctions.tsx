import { BigNumberish, ethers } from "ethers";
import { formatUnits } from "ethers/lib/utils";

/**
 * Metamask wallet address shortener
 * @param {string} address wallet address
 */
export const addressShortener = (address: string) => {
  return (
    address.substring(0, 5) + "..." + address.substring(address.length - 4)
  );
};

/**
 * add unit USDC to the end
 * @param {Number} number balance for matic or any other token value
 */
export const addUSDC = (number: Number | string) => {
  return number.toString() + " USDC";
};

/**
 * converts hex value to decimal with decimal point
 * @param {BigNumberish} value balance for matic or any other token value
 * @param {number} decimal decimal point for that token
 */
export const toDecimal = (value: BigNumberish, decimal: number) =>
  Number(formatUnits(value, decimal));

/**
 * converts the value to percentage and adds percentage symbol
 * @param {number} num number to be converted to percentage
 */
export const formatAsPercent = (num: number) => {
  return new Intl.NumberFormat("default", {
    style: "percent",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(num / 100);
};

/**
 * adds commas according to decimal places
 * @param {Number} number
 */
export const AddCommas = (number: Number) => {
  const decimalNumber = Number(number).toFixed(2);
  const splitNumber = decimalNumber.split(".");
  const result = `${Number(splitNumber[0]).toLocaleString("en-US")}`;
  return addUSDC(result);
};

/**
 * adds "$" before the number
 * @param {number} number
 */
export const addDollar = (number: number | undefined) => {
  const decimalNumber = Number(number).toFixed(2);
  const result = `${Number(decimalNumber).toLocaleString("en-US")}`;
  return "$" + result;
};
