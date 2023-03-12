export const detectProvider = () => {
  let provider;
  if ((window as any).ethereum) {
    provider = (window as any).ethereum;
  } else if ((window as any).web3) {
    provider = (window as any).web3.currentProvider;
  } else {
    console.warn("No Ethereum browser detected! check out Metamask");
  }
  return provider;
};
