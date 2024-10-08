import { useEffect, useLayoutEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { detectProvider } from "../Utils/GetProvider";
import { switchNetwork } from "../Utils/SwitchNetwork";
import "../style.css";
import PrimaryButton from "../atoms/PrimaryButton";
import { BUTTONS, INSTALL_METAMASK } from "../Data/Constants";

/**
 * Wallet Connect
 * @param {object} props Component props
 * @param {(provider: any) => void} props.onConnecting function to provide provider
 * @param {() => void} props.onDisconnecting function to set state disconnected
 */
const ConnectWallet = (props: {
  onConnecting: (provider: any) => void;
  onDisconnecting: () => void;
}) => {
  const [provider, setProvider] = useState((window as any).ethereum);
  const [isMetaMaskInstalled, setisMetaMaskInstalled] = useState(false);

  /**
   * This detects the provider and then sets it
   */
  useEffect(() => {
    setProvider(detectProvider());
  }, []);

  /**
   * Checks if metamask already installed
   */
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

  /**
   * using provider to connect to metamask wallet
   */
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
        <PrimaryButton
          btnName={BUTTONS.CONNECT_TO_WALLET}
          onClick={onConnectWallet}
        />
      )}
      {!isMetaMaskInstalled && (
        <p>
          <a href="/">{INSTALL_METAMASK}</a>
        </p>
      )}
    </>
  );
};
export default ConnectWallet;
