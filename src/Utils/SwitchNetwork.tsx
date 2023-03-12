import Web3 from "web3";

const web3 = new Web3((window as any).ethereum);
const getNetworkId = async () => {
  const currentChainId = await web3!.eth.net.getId();
  return currentChainId;
};
export const switchNetwork = async (chainId: number) => {
  const currentChainId = await getNetworkId();

  if (currentChainId !== chainId) {
    try {
      await (window as any).ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: Web3.utils.toHex(chainId) }],
      });
    } catch (switchError: any) {
      // This error code indicates that the chain has not been added to MetaMask.
      if (switchError.code === 4902) {
        alert("add this chain id");
      }
    }
  }
};
