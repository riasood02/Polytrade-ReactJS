import { useEffect, useLayoutEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Web3 from "web3";

const ConnectWallet = (props: {
  onConnecting: (provider: any) => void;
  onDisconnecting: () => void;
}) => {
  const [provider, setProvider] = useState((window as any).ethereum);
  const [isMetaMaskInstalled, setisMetaMaskInstalled] = useState(false);
  useEffect(() => {
    setProvider(detectProvider());
  }, []);
  useEffect(() => {
    if (provider) {
      if (provider !== (window as any).ethereum) {
        console.error(
          "Not window.ethereum provider. Do you have multiple wallets installed ?"
        );
      }
      setisMetaMaskInstalled(true);
    }
  }, [provider]);
  const detectProvider = () => {
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
  const web3 = new Web3((window as any).ethereum);
  const getNetworkId = async () => {
    const currentChainId = await web3!.eth.net.getId();
    return currentChainId;
  };
  const switchNetwork = async (chainId: number) => {
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
  const onConnectWallet = async () => {
    await provider.request({
      method: "eth_requestAccounts",
    });
    switchNetwork(80001);
    props.onConnecting(provider);
  };
  return (
    <>
      {isMetaMaskInstalled && (
        <Button
          style={{
            color: "rgb(10,11,32)",
            backgroundColor: "rgb(244,248,251)",
            fontWeight: "500",
          }}
          className="rounded-pill"
          onClick={onConnectWallet}
          variant="default"
        >
          connect
        </Button>
      )}
      {!isMetaMaskInstalled && (
        <p>
          <a href="/">Install MetaMask</a>
        </p>
      )}
    </>
  );
};
export default ConnectWallet;
