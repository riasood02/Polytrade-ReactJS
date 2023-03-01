import StableContract from "./StableContract";
import RewardContract from "./RewardContract";
const hexToDecimal = (hex: string) => parseInt(hex, 16);
export const getStableBalance = async () => {
  let response = await StableContract.methods.getReward().call();
  console.log(response);
  const balance = hexToDecimal(response.toString());
  return balance;
};

export const getRewardBalance = async () => {
  let response = await RewardContract.methods.getReward().call();
  console.log(response);
  const balance = hexToDecimal(response.toString());
  return balance;
};
