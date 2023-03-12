export const AddCommas = (number: Number) => {
  const decimalNumber = Number(number).toFixed(2);
  const splitNumber = decimalNumber.split(".");
  const result = `${Number(splitNumber[0]).toLocaleString("en-US")}`;
  return result + " USDC";
};

export const formatAsPercent = (num: number) => {
  return new Intl.NumberFormat("default", {
    style: "percent",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(num / 100);
};

export const addDollar = (number: Number) => {
  const num = number.toString();
  return "$" + num;
};

export const convertMatictoUSDC = (balance: string | undefined) => {
  const numberBalance = Number(balance);
  const decimalNumber = Number(numberBalance).toFixed(2);
  const splitNumber = decimalNumber.split(".");
  const balanceUSDC = Number(splitNumber[0]) * 0.97;
  return AddCommas(balanceUSDC);
};
