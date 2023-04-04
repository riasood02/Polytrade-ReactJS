import StableContract from "./Contracts/StableContract";
import RewardContract from "./Contracts/RewardContract";
import PoolLiquidityContract from "./Contracts/PoolLiquidityContract";
import { BigNumberish, ethers } from "ethers";
import {
  AddCommas,
  addDollar,
  formatAsPercent,
} from "./NumberFormattingFunctions";
import KYCContract from "./Contracts/KYCVerificationContract";
import GetDepositContract from "./Contracts/GetDepositContract";
import { LenderPoolContract, blehLender } from "./Contracts/LenderPoolContract";
import { USDCContract, bleh } from "./Contracts/USDCTokenContract";
import { formatUnits } from "ethers/lib/utils";

const toDecimal = (value: BigNumberish, decimal: number) =>
  Number(formatUnits(value, decimal));

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
export const getKYCProviderInfo = async (
  address: string | null | undefined
) => {
  let response = await KYCContract.methods.getUserProvider(address).call();
  return response.toString();
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
  let approval = await bleh.approve(
    "0x5AaA4e76cEbAbf2119fD88d86ec423ab01196d5A",
    amount
  );
  // console.log(approval);
  //console.log(approval.events);
};
export const sendUSDCtoLenderPool = async (
  address: string | null | undefined,
  amount: number
) => {
  let response = await blehLender.deposit(amount);
  // console.log(response);
  blehLender.on("Deposit", (from: any, to: any, value: number, event: any) => {
    let transferEvent = {
      from: from,
      to: to,
      value: value,
      eventData: event,
    };

    console.log(JSON.stringify(transferEvent, null, 4));
  });
};
export const checkEvents = () => {
  // let options = {
  //   fromBlock: 0,
  // };

  USDCContract.events
    .Approval()
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
