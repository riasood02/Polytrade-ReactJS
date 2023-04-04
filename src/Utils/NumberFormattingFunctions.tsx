import { BigNumberish, ethers } from "ethers";
import { formatUnits } from "ethers/lib/utils";

export const AddCommas = (number: Number) => {
  const decimalNumber = Number(number).toFixed(2);
  const splitNumber = decimalNumber.split(".");
  const result = `${Number(splitNumber[0]).toLocaleString("en-US")}`;
  return result + " USDC";
};
export const addUSDC = (number: Number) => {
  return number.toString() + " USDC";
};

export const addressShortener = (address: string) => {
  return (
    address.substring(0, 5) + "..." + address.substring(address.length - 4)
  );
};
export const toDecimal = (value: BigNumberish, decimal: number) =>
  Number(formatUnits(value, decimal));
export const formatAsPercent = (num: number) => {
  return new Intl.NumberFormat("default", {
    style: "percent",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(num / 100);
};

export const addDollar = (number: number | undefined) => {
  const decimalNumber = Number(number).toFixed(2);
  const result = `${Number(decimalNumber).toLocaleString("en-US")}`;
  return "$" + result;
};

export const convertMatictoUSDC = (balance: string | undefined) => {
  const numberBalance = Number(balance);
  const decimalNumber = Number(numberBalance).toFixed(2);
  const splitNumber = decimalNumber.split(".");
  const balanceUSDC = Number(splitNumber[0]) * 0.97;
  return AddCommas(balanceUSDC);
};
