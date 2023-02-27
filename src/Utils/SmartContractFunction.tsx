import StableContract from "./StableContract";
export const getStableBalance = async () => {
  let response = await StableContract.methods.getReward().call();
  return response / 100;
};
