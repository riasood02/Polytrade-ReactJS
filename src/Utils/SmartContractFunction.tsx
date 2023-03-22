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
import USDCContract from "./Contracts/USDCTokenContract";

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
  return response;
};
export const approveSpendingLimit = async (
  address: string | null | undefined,
  amount: number
) => {
  let approval = await USDCContract.methods
    .approve("0x5AaA4e76cEbAbf2119fD88d86ec423ab01196d5A", amount)
    .send({ from: address });
  // console.log(approval);
  console.log(approval.events);
};
export const sendUSDCtoLenderPool = async (
  address: string | null | undefined,
  amount: number
) => {
  let response = await LenderPoolContract.methods
    .deposit(amount)
    .send({ from: address });
  // console.log(response);
  checkEvents();
};
export const checkEvents = () => {
  let options = {
    fromBlock: 0,
  };

  USDCContract.events
    .Transfer(options)
    .on("data", (event: any) => console.log("event", event))
    .on("changed", (changed: any) => console.log("changed", changed))
    .on("error", (err: any) => console.log("err", err))
    .on("connected", (str: any) => console.log("str", str));
};
export const getUSDCBalance = async (address: string | null | undefined) => {
  let response = await USDCContract.methods.balanceOf(address).call();
  const USDCBalance = toDecimal(response, 6);
  return USDCBalance;
};

export const validationLimit = async () => {
  let response = await KYCContract.methods.validationLimit().call();
  const validateLimit = toDecimal(response, 6);
  return "$ " + validateLimit.toString();
};
