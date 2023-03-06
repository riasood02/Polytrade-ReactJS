import StableContract from "./StableContract";
import RewardContract from "./RewardContract";
import PoolLiquidityContract from "./PoolLiquidityContract";
import { BigNumberish, ethers, formatUnits } from "ethers";
import BigNumber from "bignumber.js";
const toDecimal = (value: BigNumberish, decimal: number) =>
  Number(ethers.formatUnits(value, decimal));
export const getStableBalance = async () => {
  let response = await StableContract.methods.getReward().call();
  //console.log(response);
  const balance = toDecimal(response, 2);
  //const val: BigNumberish = "12680783466460604484";
  //const bal = toDecimal(value, 3);
  //formatUnits(val, 6);
  //console.log(val);
  return balance;
};

export const getRewardBalance = async () => {
  let response = await RewardContract.methods.getReward().call();
  //console.log(response);
  const balance = toDecimal(response, 2);
  return balance;
};

export const getCurrentPoolLiquidity = async () => {
  let response = await PoolLiquidityContract.methods.getBalance().call();
  console.log(response);
  formatUnits(response, 6);
  //const balance = toDecimal(response, 2);
  return response;
};
