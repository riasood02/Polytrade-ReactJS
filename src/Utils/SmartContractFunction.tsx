import StableContract from "./Contracts/StableContract";
import RewardContract from "./Contracts/RewardContract";
import PoolLiquidityContract from "./Contracts/PoolLiquidityContract";
import { BigNumberish, ethers, formatUnits } from "ethers";
import {
  AddCommas,
  addDollar,
  formatAsPercent,
} from "./NumberFormattingFunctions";
import KYCContract from "./Contracts/KYCVerificationContract";
import GetDepositContract from "./Contracts/GetDepositContract";
import LenderPoolContract from "./Contracts/LenderPoolContract";

const toDecimal = (value: BigNumberish, decimal: number) =>
  Number(ethers.formatUnits(value, decimal));

export const getStableBalance = async () => {
  let response = await StableContract.methods.getReward().call();
  var balance = toDecimal(response, 2);
  const bal = formatAsPercent(balance);
  return bal;
};

export const getRewardBalance = async () => {
  let response = await RewardContract.methods.getReward().call();
  const balance = toDecimal(response, 4);
  const bal = formatAsPercent(balance * 2);
  return bal;
};

export const getCurrentPoolLiquidity = async () => {
  let response = await PoolLiquidityContract.methods.getBalance().call();
  formatUnits(response, 6);
  const balance = AddCommas(response);
  return balance;
};

export const getKYCValidation = async (address: string | null | undefined) => {
  let response = await KYCContract.methods.isValid(address).call();
  return response;
};

export const getDepositFunction = async (
  address: string | null | undefined
) => {
  let response = await GetDepositContract.methods.getDeposit(address).call();
  return addDollar(response);
};

export const getLenderPool = async (
  address: string | null | undefined,
  amount: Number
) => {
  let response = await LenderPoolContract.methods
    .deposit(amount)
    .send({ from: address });
};
