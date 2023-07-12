import Web3 from "web3";
import { Contract } from "web3-eth-contract";
let KYCDetails;
KYCDetails = {
  contractAddress: "0x174ed496CBBabC840DA5F3eAC2258a1122af9E7D",
  abi: [
    {
      inputs: [
        { internalType: "address", name: "_lenderPool", type: "address" },
      ],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "address",
          name: "agent",
          type: "address",
        },
        { indexed: false, internalType: "bool", name: "status", type: "bool" },
      ],
      name: "AgentSet",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "previousOwner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "newOwner",
          type: "address",
        },
      ],
      name: "OwnershipTransferred",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "address",
          name: "user",
          type: "address",
        },
        {
          indexed: false,
          internalType: "bytes2",
          name: "provider",
          type: "bytes2",
        },
        { indexed: false, internalType: "bool", name: "status", type: "bool" },
      ],
      name: "UserValidation",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "uint256",
          name: "kycLimit",
          type: "uint256",
        },
      ],
      name: "ValidationLimitUpdated",
      type: "event",
    },
    {
      inputs: [{ internalType: "address", name: "", type: "address" }],
      name: "agents",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "user", type: "address" }],
      name: "getUserProvider",
      outputs: [{ internalType: "bytes2", name: "", type: "bytes2" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "user", type: "address" }],
      name: "isValid",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "user", type: "address" },
        { internalType: "uint256", name: "amount", type: "uint256" },
      ],
      name: "isValidationRequired",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "lenderPool",
      outputs: [
        { internalType: "contract ILenderPool", name: "", type: "address" },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "owner",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "renounceOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "agent", type: "address" },
        { internalType: "bool", name: "status", type: "bool" },
      ],
      name: "setAgent",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "user", type: "address" },
        { internalType: "bytes2", name: "provider", type: "bytes2" },
        { internalType: "bool", name: "status", type: "bool" },
      ],
      name: "setValidation",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
      name: "transferOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "uint256", name: "_validationLimit", type: "uint256" },
      ],
      name: "updateValidationLimit",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "", type: "address" }],
      name: "userValidation",
      outputs: [
        { internalType: "bytes2", name: "provider", type: "bytes2" },
        { internalType: "bool", name: "status", type: "bool" },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "validationLimit",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
  ],
};

var web3 = new Web3((window as any).ethereum);

var KYCContract: Contract = new web3.eth.Contract(
  KYCDetails.abi as any[],
  KYCDetails.contractAddress
);

export default KYCContract;
