import StableContract from "./Contracts/StableContract";
import RewardContract from "./Contracts/RewardContract";
import PoolLiquidityContract from "./Contracts/PoolLiquidityContract";
import {
  AddCommas,
  formatAsPercent,
  toDecimal,
} from "./NumberFormattingFunctions";
import KYCContract from "./Contracts/KYCVerificationContract";
import GetDepositContract from "./Contracts/GetDepositContract";
import { blehLender } from "./Contracts/LenderPoolContract";
import {
  USDCContract,
  USDCContractEthers,
} from "./Contracts/USDCTokenContract";
import { formatUnits } from "ethers/lib/utils";
import { TUSDCContract, TUSDCEthers } from "./Contracts/TUSDCContract";
import { RedeemPoolEthers } from "./Contracts/RedeemPoolContract";

/**
 * gets the stable balance
 */
export const getStableBalance = async () => {
  let response = await StableContract.methods.getReward().call();
  var balance = toDecimal(response, 2);
  const bal = formatAsPercent(balance);
  return bal;
};

/**
 * gets the reward balance
 */
export const getRewardBalance = async () => {
  let response = await RewardContract.methods.getReward().call();
  const balance = toDecimal(response, 4);
  const bal = formatAsPercent(balance * 2);
  return bal;
};

/**
 * gets the current pool liquidity value from the smart contract
 */
export const getCurrentPoolLiquidity = async () => {
  let response = await PoolLiquidityContract.methods.getBalance().call();
  formatUnits(response, 6);
  const balance = AddCommas(response);
  return balance;
};

/**
 * checks if user is KYC Verified or not
 * @param {string} address wallet address
 */
export const getKYCValidation = async (address: string | null | undefined) => {
  let response = await KYCContract.methods.isValid(address).call();
  return response;
};

/**
 * gets the KYC provider for the user
 * @param {string} address wallet address
 */
export const getKYCProviderInfo = async (
  address: string | null | undefined
) => {
  let response = await KYCContract.methods.getUserProvider(address).call();
  return response.toString();
};

/**
 * gets my deposits for the user
 * @param {string} address wallet address
 */
export const getDepositFunction = async (
  address: string | null | undefined
) => {
  let response = await GetDepositContract.methods.getDeposit(address).call();
  return response;
};

/**
 * calls the approval function to set the approval limit for spending token money
 * @param {number} amount wallet address
 */
export const approveSpendingLimit = async (amount: number) => {
  let approval = await USDCContractEthers.approve(
    "0x5AaA4e76cEbAbf2119fD88d86ec423ab01196d5A",
    amount
  );
};

/**
 * write function to lend the usdc token money to the lender pool
 * @param {number} amount wallet address
 */
export const sendUSDCtoLenderPool = async (amount: number) => {
  let response = await blehLender.deposit(amount);
};

/**
 * gets the value of the usdc token for a user
 * @param {string} address wallet address
 */
export const getUSDCBalance = async (address: string | null | undefined) => {
  let response = await USDCContract.methods.balanceOf(address).call();
  const USDCBalance = toDecimal(response, 6);
  return USDCBalance;
};

/**
 * returns the validation limit
 */
export const validationLimit = async () => {
  let response = await KYCContract.methods.validationLimit().call();
  const validateLimit = toDecimal(response, 6);
  return "$ " + validateLimit.toString();
};

/**
 * write function to redeem tspice to our wallet account
 * @param {number} amount wallet address
 */
export const redeemTSpiceBalance = async (amount: number) => {
  let response = await blehLender.withdrawDeposit(amount);
};

/**
 * returns the Tspice balance of the user
 * @param {string} address wallet address
 */
export const getTUSDCBalance = async (address: string | null | undefined) => {
  let response = await TUSDCContract.methods.balanceOf(address).call();
  const USDCBalance = toDecimal(response, 6);
  return USDCBalance;
};

/**
 * write function to get the stable money for the tsoice balance in users wallet
 * @param {amount} amount wallet address
 */
export const claimUSDC = async (amount: number) => {
  let response = await RedeemPoolEthers.redeemStable(amount * 1000000);
  console.log(response);
};

/**
 * calls the approval function to set the approval limit for spending Tspice balance
 * @param {number} amount wallet address
 */
export const approveTspiceSpendingLimit = async (amount: number) => {
  let approval = await TUSDCEthers.approve(
    "0xA72AfE1Ac88fB999AeF61FBB866F8C4Ad6B25dDb",
    amount * 1000000
  );
};
