import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import "../style.css";
/**
 * Connecting Metamask Wallet
 */
const ConnectWallet = () => {
  const [isMetamaskInstalled, setIsMetamaskInstalled] =
    useState<boolean>(false);
  const [ethereumAccount, setEthereumAccount] = useState<string | null>(null);

  useEffect(() => {
    if ((window as any).ethereum) {
      //check if Metamask wallet is installed
      setIsMetamaskInstalled(true);
    }
  }, []);

  //Does the User have an Ethereum wallet/account?
  async function connectMetamaskWallet(): Promise<void> {
    //to get around type checking
    (window as any).ethereum
      .request({
        method: "eth_requestAccounts",
      })
      .then((accounts: string[]) => {
        setEthereumAccount(accounts[0]);
      })
      .catch((error: any) => {
        alert(`Something went wrong: ${error}`);
      });
  }
  if (ethereumAccount === null) {
    return isMetamaskInstalled ? (
      <Button
        className="button-light rounded-pill"
        variant="default"
        onClick={connectMetamaskWallet}
      >
        Connect Your Metamask Wallet
      </Button>
    ) : (
      <p>Install Your Metamask wallet</p>
    );
  }
  return <p>{ethereumAccount}</p>;
};

export default ConnectWallet;
