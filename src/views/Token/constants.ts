// import { ChainId } from "config/chains"
// import { ChainMap } from "config/constants/types"

import { standardTokenABI } from "config/abi/standardToken"

// export const fee: ChainMap<string> = {
// 	[ChainId.MAINNET]: '10',
// 	[ChainId.TESTNET]: '0.001',
// }


// export const feeReceivers: ChainMap<string> = {
// 	[ChainId.MAINNET]: '0xBFe92b43b5d465A9193c8E200ec8C42434C8E113',
// 	[ChainId.TESTNET]: '0xD52c5455dFa0382C643eDb3D41c00799289A8a7f',
// }

export const tokenABI = {
	"standard": [
		{
		  inputs: [
			{
			  internalType: "string",
			  name: "name_",
			  type: "string",
			},
			{
			  internalType: "string",
			  name: "symbol_",
			  type: "string",
			},
			{
			  internalType: "uint8",
			  name: "decimals_",
			  type: "uint8",
			},
			{
			  internalType: "uint256",
			  name: "totalSupply_",
			  type: "uint256",
			},
		  ],
		  stateMutability: "nonpayable",
		  type: "constructor",
		},
		{
		  anonymous: false,
		  inputs: [
			{
			  indexed: true,
			  internalType: "address",
			  name: "owner",
			  type: "address",
			},
			{
			  indexed: true,
			  internalType: "address",
			  name: "spender",
			  type: "address",
			},
			{
			  indexed: false,
			  internalType: "uint256",
			  name: "value",
			  type: "uint256",
			},
		  ],
		  name: "Approval",
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
			  indexed: true,
			  internalType: "address",
			  name: "from",
			  type: "address",
			},
			{
			  indexed: true,
			  internalType: "address",
			  name: "to",
			  type: "address",
			},
			{
			  indexed: false,
			  internalType: "uint256",
			  name: "value",
			  type: "uint256",
			},
		  ],
		  name: "Transfer",
		  type: "event",
		},
		{
		  inputs: [
			{
			  internalType: "address",
			  name: "owner",
			  type: "address",
			},
			{
			  internalType: "address",
			  name: "spender",
			  type: "address",
			},
		  ],
		  name: "allowance",
		  outputs: [
			{
			  internalType: "uint256",
			  name: "",
			  type: "uint256",
			},
		  ],
		  stateMutability: "view",
		  type: "function",
		},
		{
		  inputs: [
			{
			  internalType: "address",
			  name: "spender",
			  type: "address",
			},
			{
			  internalType: "uint256",
			  name: "amount",
			  type: "uint256",
			},
		  ],
		  name: "approve",
		  outputs: [
			{
			  internalType: "bool",
			  name: "",
			  type: "bool",
			},
		  ],
		  stateMutability: "nonpayable",
		  type: "function",
		},
		{
		  inputs: [
			{
			  internalType: "address",
			  name: "account",
			  type: "address",
			},
		  ],
		  name: "balanceOf",
		  outputs: [
			{
			  internalType: "uint256",
			  name: "",
			  type: "uint256",
			},
		  ],
		  stateMutability: "view",
		  type: "function",
		},
		{
		  inputs: [],
		  name: "decimals",
		  outputs: [
			{
			  internalType: "uint8",
			  name: "",
			  type: "uint8",
			},
		  ],
		  stateMutability: "view",
		  type: "function",
		},
		{
		  inputs: [
			{
			  internalType: "address",
			  name: "spender",
			  type: "address",
			},
			{
			  internalType: "uint256",
			  name: "subtractedValue",
			  type: "uint256",
			},
		  ],
		  name: "decreaseAllowance",
		  outputs: [
			{
			  internalType: "bool",
			  name: "",
			  type: "bool",
			},
		  ],
		  stateMutability: "nonpayable",
		  type: "function",
		},
		{
		  inputs: [
			{
			  internalType: "address",
			  name: "spender",
			  type: "address",
			},
			{
			  internalType: "uint256",
			  name: "addedValue",
			  type: "uint256",
			},
		  ],
		  name: "increaseAllowance",
		  outputs: [
			{
			  internalType: "bool",
			  name: "",
			  type: "bool",
			},
		  ],
		  stateMutability: "nonpayable",
		  type: "function",
		},
		{
		  inputs: [],
		  name: "name",
		  outputs: [
			{
			  internalType: "string",
			  name: "",
			  type: "string",
			},
		  ],
		  stateMutability: "view",
		  type: "function",
		},
		{
		  inputs: [],
		  name: "owner",
		  outputs: [
			{
			  internalType: "address",
			  name: "",
			  type: "address",
			},
		  ],
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
		  inputs: [],
		  name: "symbol",
		  outputs: [
			{
			  internalType: "string",
			  name: "",
			  type: "string",
			},
		  ],
		  stateMutability: "view",
		  type: "function",
		},
		{
		  inputs: [],
		  name: "totalSupply",
		  outputs: [
			{
			  internalType: "uint256",
			  name: "",
			  type: "uint256",
			},
		  ],
		  stateMutability: "view",
		  type: "function",
		},
		{
		  inputs: [
			{
			  internalType: "address",
			  name: "recipient",
			  type: "address",
			},
			{
			  internalType: "uint256",
			  name: "amount",
			  type: "uint256",
			},
		  ],
		  name: "transfer",
		  outputs: [
			{
			  internalType: "bool",
			  name: "",
			  type: "bool",
			},
		  ],
		  stateMutability: "nonpayable",
		  type: "function",
		},
		{
		  inputs: [
			{
			  internalType: "address",
			  name: "sender",
			  type: "address",
			},
			{
			  internalType: "address",
			  name: "recipient",
			  type: "address",
			},
			{
			  internalType: "uint256",
			  name: "amount",
			  type: "uint256",
			},
		  ],
		  name: "transferFrom",
		  outputs: [
			{
			  internalType: "bool",
			  name: "",
			  type: "bool",
			},
		  ],
		  stateMutability: "nonpayable",
		  type: "function",
		},
		{
		  inputs: [
			{
			  internalType: "address",
			  name: "newOwner",
			  type: "address",
			},
		  ],
		  name: "transferOwnership",
		  outputs: [],
		  stateMutability: "nonpayable",
		  type: "function",
		},
	  ],
	"liquidityGen": [
		{
		  inputs: [
			{
			  internalType: "string",
			  name: "name_",
			  type: "string",
			},
			{
			  internalType: "string",
			  name: "symbol_",
			  type: "string",
			},
			{
			  internalType: "uint256",
			  name: "totalSupply_",
			  type: "uint256",
			},
			{
			  internalType: "address",
			  name: "router_",
			  type: "address",
			},
			{
			  internalType: "address",
			  name: "charityAddress_",
			  type: "address",
			},
			{
			  internalType: "uint16",
			  name: "taxFeeBps_",
			  type: "uint16",
			},
			{
			  internalType: "uint16",
			  name: "liquidityFeeBps_",
			  type: "uint16",
			},
			{
			  internalType: "uint16",
			  name: "charityFeeBps_",
			  type: "uint16",
			},
			{
			  internalType: "address",
			  name: "serviceFeeReceiver_",
			  type: "address",
			},
			{
			  internalType: "uint256",
			  name: "serviceFee_",
			  type: "uint256",
			},
		  ],
		  stateMutability: "payable",
		  type: "constructor",
		},
		{
		  anonymous: false,
		  inputs: [
			{
			  indexed: true,
			  internalType: "address",
			  name: "owner",
			  type: "address",
			},
			{
			  indexed: true,
			  internalType: "address",
			  name: "spender",
			  type: "address",
			},
			{
			  indexed: false,
			  internalType: "uint256",
			  name: "value",
			  type: "uint256",
			},
		  ],
		  name: "Approval",
		  type: "event",
		},
		{
		  anonymous: false,
		  inputs: [
			{
			  indexed: false,
			  internalType: "uint256",
			  name: "minTokensBeforeSwap",
			  type: "uint256",
			},
		  ],
		  name: "MinTokensBeforeSwapUpdated",
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
			  internalType: "uint256",
			  name: "tokensSwapped",
			  type: "uint256",
			},
			{
			  indexed: false,
			  internalType: "uint256",
			  name: "ethReceived",
			  type: "uint256",
			},
			{
			  indexed: false,
			  internalType: "uint256",
			  name: "tokensIntoLiqudity",
			  type: "uint256",
			},
		  ],
		  name: "SwapAndLiquify",
		  type: "event",
		},
		{
		  anonymous: false,
		  inputs: [
			{
			  indexed: false,
			  internalType: "bool",
			  name: "enabled",
			  type: "bool",
			},
		  ],
		  name: "SwapAndLiquifyEnabledUpdated",
		  type: "event",
		},
		{
		  anonymous: false,
		  inputs: [
			{
			  indexed: true,
			  internalType: "address",
			  name: "owner",
			  type: "address",
			},
			{
			  indexed: true,
			  internalType: "address",
			  name: "token",
			  type: "address",
			},
			{
			  indexed: false,
			  internalType: "enum TokenType",
			  name: "tokenType",
			  type: "uint8",
			},
			{
			  indexed: false,
			  internalType: "uint256",
			  name: "version",
			  type: "uint256",
			},
		  ],
		  name: "TokenCreated",
		  type: "event",
		},
		{
		  anonymous: false,
		  inputs: [
			{
			  indexed: true,
			  internalType: "address",
			  name: "from",
			  type: "address",
			},
			{
			  indexed: true,
			  internalType: "address",
			  name: "to",
			  type: "address",
			},
			{
			  indexed: false,
			  internalType: "uint256",
			  name: "value",
			  type: "uint256",
			},
		  ],
		  name: "Transfer",
		  type: "event",
		},
		{
		  inputs: [],
		  name: "VERSION",
		  outputs: [
			{
			  internalType: "uint256",
			  name: "",
			  type: "uint256",
			},
		  ],
		  stateMutability: "view",
		  type: "function",
		},
		{
		  inputs: [],
		  name: "_charityAddress",
		  outputs: [
			{
			  internalType: "address",
			  name: "",
			  type: "address",
			},
		  ],
		  stateMutability: "view",
		  type: "function",
		},
		{
		  inputs: [],
		  name: "_charityFee",
		  outputs: [
			{
			  internalType: "uint256",
			  name: "",
			  type: "uint256",
			},
		  ],
		  stateMutability: "view",
		  type: "function",
		},
		{
		  inputs: [],
		  name: "_liquidityFee",
		  outputs: [
			{
			  internalType: "uint256",
			  name: "",
			  type: "uint256",
			},
		  ],
		  stateMutability: "view",
		  type: "function",
		},
		{
		  inputs: [],
		  name: "_taxFee",
		  outputs: [
			{
			  internalType: "uint256",
			  name: "",
			  type: "uint256",
			},
		  ],
		  stateMutability: "view",
		  type: "function",
		},
		{
		  inputs: [
			{
			  internalType: "address",
			  name: "owner",
			  type: "address",
			},
			{
			  internalType: "address",
			  name: "spender",
			  type: "address",
			},
		  ],
		  name: "allowance",
		  outputs: [
			{
			  internalType: "uint256",
			  name: "",
			  type: "uint256",
			},
		  ],
		  stateMutability: "view",
		  type: "function",
		},
		{
		  inputs: [
			{
			  internalType: "address",
			  name: "spender",
			  type: "address",
			},
			{
			  internalType: "uint256",
			  name: "amount",
			  type: "uint256",
			},
		  ],
		  name: "approve",
		  outputs: [
			{
			  internalType: "bool",
			  name: "",
			  type: "bool",
			},
		  ],
		  stateMutability: "nonpayable",
		  type: "function",
		},
		{
		  inputs: [
			{
			  internalType: "address",
			  name: "account",
			  type: "address",
			},
		  ],
		  name: "balanceOf",
		  outputs: [
			{
			  internalType: "uint256",
			  name: "",
			  type: "uint256",
			},
		  ],
		  stateMutability: "view",
		  type: "function",
		},
		{
		  inputs: [],
		  name: "decimals",
		  outputs: [
			{
			  internalType: "uint8",
			  name: "",
			  type: "uint8",
			},
		  ],
		  stateMutability: "view",
		  type: "function",
		},
		{
		  inputs: [
			{
			  internalType: "address",
			  name: "spender",
			  type: "address",
			},
			{
			  internalType: "uint256",
			  name: "subtractedValue",
			  type: "uint256",
			},
		  ],
		  name: "decreaseAllowance",
		  outputs: [
			{
			  internalType: "bool",
			  name: "",
			  type: "bool",
			},
		  ],
		  stateMutability: "nonpayable",
		  type: "function",
		},
		{
		  inputs: [
			{
			  internalType: "uint256",
			  name: "tAmount",
			  type: "uint256",
			},
		  ],
		  name: "deliver",
		  outputs: [],
		  stateMutability: "nonpayable",
		  type: "function",
		},
		{
		  inputs: [
			{
			  internalType: "address",
			  name: "account",
			  type: "address",
			},
		  ],
		  name: "excludeFromFee",
		  outputs: [],
		  stateMutability: "nonpayable",
		  type: "function",
		},
		{
		  inputs: [
			{
			  internalType: "address",
			  name: "account",
			  type: "address",
			},
		  ],
		  name: "excludeFromReward",
		  outputs: [],
		  stateMutability: "nonpayable",
		  type: "function",
		},
		{
		  inputs: [
			{
			  internalType: "address",
			  name: "account",
			  type: "address",
			},
		  ],
		  name: "includeInFee",
		  outputs: [],
		  stateMutability: "nonpayable",
		  type: "function",
		},
		{
		  inputs: [
			{
			  internalType: "address",
			  name: "account",
			  type: "address",
			},
		  ],
		  name: "includeInReward",
		  outputs: [],
		  stateMutability: "nonpayable",
		  type: "function",
		},
		{
		  inputs: [
			{
			  internalType: "address",
			  name: "spender",
			  type: "address",
			},
			{
			  internalType: "uint256",
			  name: "addedValue",
			  type: "uint256",
			},
		  ],
		  name: "increaseAllowance",
		  outputs: [
			{
			  internalType: "bool",
			  name: "",
			  type: "bool",
			},
		  ],
		  stateMutability: "nonpayable",
		  type: "function",
		},
		{
		  inputs: [
			{
			  internalType: "address",
			  name: "account",
			  type: "address",
			},
		  ],
		  name: "isExcludedFromFee",
		  outputs: [
			{
			  internalType: "bool",
			  name: "",
			  type: "bool",
			},
		  ],
		  stateMutability: "view",
		  type: "function",
		},
		{
		  inputs: [
			{
			  internalType: "address",
			  name: "account",
			  type: "address",
			},
		  ],
		  name: "isExcludedFromReward",
		  outputs: [
			{
			  internalType: "bool",
			  name: "",
			  type: "bool",
			},
		  ],
		  stateMutability: "view",
		  type: "function",
		},
		{
		  inputs: [],
		  name: "name",
		  outputs: [
			{
			  internalType: "string",
			  name: "",
			  type: "string",
			},
		  ],
		  stateMutability: "view",
		  type: "function",
		},
		{
		  inputs: [],
		  name: "owner",
		  outputs: [
			{
			  internalType: "address",
			  name: "",
			  type: "address",
			},
		  ],
		  stateMutability: "view",
		  type: "function",
		},
		{
		  inputs: [
			{
			  internalType: "uint256",
			  name: "tAmount",
			  type: "uint256",
			},
			{
			  internalType: "bool",
			  name: "deductTransferFee",
			  type: "bool",
			},
		  ],
		  name: "reflectionFromToken",
		  outputs: [
			{
			  internalType: "uint256",
			  name: "",
			  type: "uint256",
			},
		  ],
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
			{
			  internalType: "uint256",
			  name: "liquidityFeeBps",
			  type: "uint256",
			},
		  ],
		  name: "setLiquidityFeePercent",
		  outputs: [],
		  stateMutability: "nonpayable",
		  type: "function",
		},
		{
		  inputs: [
			{
			  internalType: "bool",
			  name: "_enabled",
			  type: "bool",
			},
		  ],
		  name: "setSwapAndLiquifyEnabled",
		  outputs: [],
		  stateMutability: "nonpayable",
		  type: "function",
		},
		{
		  inputs: [
			{
			  internalType: "uint256",
			  name: "taxFeeBps",
			  type: "uint256",
			},
		  ],
		  name: "setTaxFeePercent",
		  outputs: [],
		  stateMutability: "nonpayable",
		  type: "function",
		},
		{
		  inputs: [],
		  name: "swapAndLiquifyEnabled",
		  outputs: [
			{
			  internalType: "bool",
			  name: "",
			  type: "bool",
			},
		  ],
		  stateMutability: "view",
		  type: "function",
		},
		{
		  inputs: [],
		  name: "symbol",
		  outputs: [
			{
			  internalType: "string",
			  name: "",
			  type: "string",
			},
		  ],
		  stateMutability: "view",
		  type: "function",
		},
		{
		  inputs: [
			{
			  internalType: "uint256",
			  name: "rAmount",
			  type: "uint256",
			},
		  ],
		  name: "tokenFromReflection",
		  outputs: [
			{
			  internalType: "uint256",
			  name: "",
			  type: "uint256",
			},
		  ],
		  stateMutability: "view",
		  type: "function",
		},
		{
		  inputs: [],
		  name: "totalFees",
		  outputs: [
			{
			  internalType: "uint256",
			  name: "",
			  type: "uint256",
			},
		  ],
		  stateMutability: "view",
		  type: "function",
		},
		{
		  inputs: [],
		  name: "totalSupply",
		  outputs: [
			{
			  internalType: "uint256",
			  name: "",
			  type: "uint256",
			},
		  ],
		  stateMutability: "view",
		  type: "function",
		},
		{
		  inputs: [
			{
			  internalType: "address",
			  name: "recipient",
			  type: "address",
			},
			{
			  internalType: "uint256",
			  name: "amount",
			  type: "uint256",
			},
		  ],
		  name: "transfer",
		  outputs: [
			{
			  internalType: "bool",
			  name: "",
			  type: "bool",
			},
		  ],
		  stateMutability: "nonpayable",
		  type: "function",
		},
		{
		  inputs: [
			{
			  internalType: "address",
			  name: "sender",
			  type: "address",
			},
			{
			  internalType: "address",
			  name: "recipient",
			  type: "address",
			},
			{
			  internalType: "uint256",
			  name: "amount",
			  type: "uint256",
			},
		  ],
		  name: "transferFrom",
		  outputs: [
			{
			  internalType: "bool",
			  name: "",
			  type: "bool",
			},
		  ],
		  stateMutability: "nonpayable",
		  type: "function",
		},
		{
		  inputs: [
			{
			  internalType: "address",
			  name: "newOwner",
			  type: "address",
			},
		  ],
		  name: "transferOwnership",
		  outputs: [],
		  stateMutability: "nonpayable",
		  type: "function",
		},
		{
		  inputs: [],
		  name: "uniswapV2Pair",
		  outputs: [
			{
			  internalType: "address",
			  name: "",
			  type: "address",
			},
		  ],
		  stateMutability: "view",
		  type: "function",
		},
		{
		  inputs: [],
		  name: "uniswapV2Router",
		  outputs: [
			{
			  internalType: "contract IUniswapV2Router02",
			  name: "",
			  type: "address",
			},
		  ],
		  stateMutability: "view",
		  type: "function",
		},
		{
		  stateMutability: "payable",
		  type: "receive",
		},
	  ],
	"baby": [
		{
		  inputs: [
			{
			  internalType: "string",
			  name: "name_",
			  type: "string",
			},
			{
			  internalType: "string",
			  name: "symbol_",
			  type: "string",
			},
			{
			  internalType: "uint256",
			  name: "totalSupply_",
			  type: "uint256",
			},
			{
			  internalType: "address[4]",
			  name: "addrs",
			  type: "address[4]",
			},
			{
			  internalType: "uint256[3]",
			  name: "feeSettings",
			  type: "uint256[3]",
			},
			{
			  internalType: "uint256",
			  name: "minimumTokenBalanceForDividends_",
			  type: "uint256",
			},
			{
			  internalType: "address",
			  name: "serviceFeeReceiver_",
			  type: "address",
			},
			{
			  internalType: "uint256",
			  name: "serviceFee_",
			  type: "uint256",
			},
		  ],
		  stateMutability: "payable",
		  type: "constructor",
		},
		{
		  anonymous: false,
		  inputs: [
			{
			  indexed: true,
			  internalType: "address",
			  name: "owner",
			  type: "address",
			},
			{
			  indexed: true,
			  internalType: "address",
			  name: "spender",
			  type: "address",
			},
			{
			  indexed: false,
			  internalType: "uint256",
			  name: "value",
			  type: "uint256",
			},
		  ],
		  name: "Approval",
		  type: "event",
		},
		{
		  anonymous: false,
		  inputs: [
			{
			  indexed: true,
			  internalType: "address",
			  name: "account",
			  type: "address",
			},
			{
			  indexed: false,
			  internalType: "bool",
			  name: "isExcluded",
			  type: "bool",
			},
		  ],
		  name: "ExcludeFromFees",
		  type: "event",
		},
		{
		  anonymous: false,
		  inputs: [
			{
			  indexed: false,
			  internalType: "address[]",
			  name: "accounts",
			  type: "address[]",
			},
			{
			  indexed: false,
			  internalType: "bool",
			  name: "isExcluded",
			  type: "bool",
			},
		  ],
		  name: "ExcludeMultipleAccountsFromFees",
		  type: "event",
		},
		{
		  anonymous: false,
		  inputs: [
			{
			  indexed: true,
			  internalType: "uint256",
			  name: "newValue",
			  type: "uint256",
			},
			{
			  indexed: true,
			  internalType: "uint256",
			  name: "oldValue",
			  type: "uint256",
			},
		  ],
		  name: "GasForProcessingUpdated",
		  type: "event",
		},
		{
		  anonymous: false,
		  inputs: [
			{
			  indexed: true,
			  internalType: "address",
			  name: "newLiquidityWallet",
			  type: "address",
			},
			{
			  indexed: true,
			  internalType: "address",
			  name: "oldLiquidityWallet",
			  type: "address",
			},
		  ],
		  name: "LiquidityWalletUpdated",
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
			  internalType: "uint256",
			  name: "iterations",
			  type: "uint256",
			},
			{
			  indexed: false,
			  internalType: "uint256",
			  name: "claims",
			  type: "uint256",
			},
			{
			  indexed: false,
			  internalType: "uint256",
			  name: "lastProcessedIndex",
			  type: "uint256",
			},
			{
			  indexed: true,
			  internalType: "bool",
			  name: "automatic",
			  type: "bool",
			},
			{
			  indexed: false,
			  internalType: "uint256",
			  name: "gas",
			  type: "uint256",
			},
			{
			  indexed: true,
			  internalType: "address",
			  name: "processor",
			  type: "address",
			},
		  ],
		  name: "ProcessedDividendTracker",
		  type: "event",
		},
		{
		  anonymous: false,
		  inputs: [
			{
			  indexed: false,
			  internalType: "uint256",
			  name: "tokensSwapped",
			  type: "uint256",
			},
			{
			  indexed: false,
			  internalType: "uint256",
			  name: "amount",
			  type: "uint256",
			},
		  ],
		  name: "SendDividends",
		  type: "event",
		},
		{
		  anonymous: false,
		  inputs: [
			{
			  indexed: true,
			  internalType: "address",
			  name: "pair",
			  type: "address",
			},
			{
			  indexed: true,
			  internalType: "bool",
			  name: "value",
			  type: "bool",
			},
		  ],
		  name: "SetAutomatedMarketMakerPair",
		  type: "event",
		},
		{
		  anonymous: false,
		  inputs: [
			{
			  indexed: false,
			  internalType: "uint256",
			  name: "tokensSwapped",
			  type: "uint256",
			},
			{
			  indexed: false,
			  internalType: "uint256",
			  name: "ethReceived",
			  type: "uint256",
			},
			{
			  indexed: false,
			  internalType: "uint256",
			  name: "tokensIntoLiqudity",
			  type: "uint256",
			},
		  ],
		  name: "SwapAndLiquify",
		  type: "event",
		},
		{
		  anonymous: false,
		  inputs: [
			{
			  indexed: true,
			  internalType: "address",
			  name: "owner",
			  type: "address",
			},
			{
			  indexed: true,
			  internalType: "address",
			  name: "token",
			  type: "address",
			},
			{
			  indexed: false,
			  internalType: "enum TokenType",
			  name: "tokenType",
			  type: "uint8",
			},
			{
			  indexed: false,
			  internalType: "uint256",
			  name: "version",
			  type: "uint256",
			},
		  ],
		  name: "TokenCreated",
		  type: "event",
		},
		{
		  anonymous: false,
		  inputs: [
			{
			  indexed: true,
			  internalType: "address",
			  name: "from",
			  type: "address",
			},
			{
			  indexed: true,
			  internalType: "address",
			  name: "to",
			  type: "address",
			},
			{
			  indexed: false,
			  internalType: "uint256",
			  name: "value",
			  type: "uint256",
			},
		  ],
		  name: "Transfer",
		  type: "event",
		},
		{
		  anonymous: false,
		  inputs: [
			{
			  indexed: true,
			  internalType: "address",
			  name: "newAddress",
			  type: "address",
			},
			{
			  indexed: true,
			  internalType: "address",
			  name: "oldAddress",
			  type: "address",
			},
		  ],
		  name: "UpdateDividendTracker",
		  type: "event",
		},
		{
		  anonymous: false,
		  inputs: [
			{
			  indexed: true,
			  internalType: "address",
			  name: "newAddress",
			  type: "address",
			},
			{
			  indexed: true,
			  internalType: "address",
			  name: "oldAddress",
			  type: "address",
			},
		  ],
		  name: "UpdateUniswapV2Router",
		  type: "event",
		},
		{
		  inputs: [],
		  name: "VERSION",
		  outputs: [
			{
			  internalType: "uint256",
			  name: "",
			  type: "uint256",
			},
		  ],
		  stateMutability: "view",
		  type: "function",
		},
		{
		  inputs: [],
		  name: "_marketingWalletAddress",
		  outputs: [
			{
			  internalType: "address",
			  name: "",
			  type: "address",
			},
		  ],
		  stateMutability: "view",
		  type: "function",
		},
		{
		  inputs: [
			{
			  internalType: "address",
			  name: "owner",
			  type: "address",
			},
			{
			  internalType: "address",
			  name: "spender",
			  type: "address",
			},
		  ],
		  name: "allowance",
		  outputs: [
			{
			  internalType: "uint256",
			  name: "",
			  type: "uint256",
			},
		  ],
		  stateMutability: "view",
		  type: "function",
		},
		{
		  inputs: [
			{
			  internalType: "address",
			  name: "spender",
			  type: "address",
			},
			{
			  internalType: "uint256",
			  name: "amount",
			  type: "uint256",
			},
		  ],
		  name: "approve",
		  outputs: [
			{
			  internalType: "bool",
			  name: "",
			  type: "bool",
			},
		  ],
		  stateMutability: "nonpayable",
		  type: "function",
		},
		{
		  inputs: [
			{
			  internalType: "address",
			  name: "",
			  type: "address",
			},
		  ],
		  name: "automatedMarketMakerPairs",
		  outputs: [
			{
			  internalType: "bool",
			  name: "",
			  type: "bool",
			},
		  ],
		  stateMutability: "view",
		  type: "function",
		},
		{
		  inputs: [
			{
			  internalType: "address",
			  name: "account",
			  type: "address",
			},
		  ],
		  name: "balanceOf",
		  outputs: [
			{
			  internalType: "uint256",
			  name: "",
			  type: "uint256",
			},
		  ],
		  stateMutability: "view",
		  type: "function",
		},
		{
		  inputs: [],
		  name: "claim",
		  outputs: [],
		  stateMutability: "nonpayable",
		  type: "function",
		},
		{
		  inputs: [],
		  name: "decimals",
		  outputs: [
			{
			  internalType: "uint8",
			  name: "",
			  type: "uint8",
			},
		  ],
		  stateMutability: "view",
		  type: "function",
		},
		{
		  inputs: [
			{
			  internalType: "address",
			  name: "spender",
			  type: "address",
			},
			{
			  internalType: "uint256",
			  name: "subtractedValue",
			  type: "uint256",
			},
		  ],
		  name: "decreaseAllowance",
		  outputs: [
			{
			  internalType: "bool",
			  name: "",
			  type: "bool",
			},
		  ],
		  stateMutability: "nonpayable",
		  type: "function",
		},
		{
		  inputs: [
			{
			  internalType: "address",
			  name: "account",
			  type: "address",
			},
		  ],
		  name: "dividendTokenBalanceOf",
		  outputs: [
			{
			  internalType: "uint256",
			  name: "",
			  type: "uint256",
			},
		  ],
		  stateMutability: "view",
		  type: "function",
		},
		{
		  inputs: [],
		  name: "dividendTracker",
		  outputs: [
			{
			  internalType: "contract BABYTOKENDividendTracker",
			  name: "",
			  type: "address",
			},
		  ],
		  stateMutability: "view",
		  type: "function",
		},
		{
		  inputs: [
			{
			  internalType: "address",
			  name: "account",
			  type: "address",
			},
		  ],
		  name: "excludeFromDividends",
		  outputs: [],
		  stateMutability: "nonpayable",
		  type: "function",
		},
		{
		  inputs: [
			{
			  internalType: "address",
			  name: "account",
			  type: "address",
			},
			{
			  internalType: "bool",
			  name: "excluded",
			  type: "bool",
			},
		  ],
		  name: "excludeFromFees",
		  outputs: [],
		  stateMutability: "nonpayable",
		  type: "function",
		},
		{
		  inputs: [
			{
			  internalType: "address[]",
			  name: "accounts",
			  type: "address[]",
			},
			{
			  internalType: "bool",
			  name: "excluded",
			  type: "bool",
			},
		  ],
		  name: "excludeMultipleAccountsFromFees",
		  outputs: [],
		  stateMutability: "nonpayable",
		  type: "function",
		},
		{
		  inputs: [],
		  name: "gasForProcessing",
		  outputs: [
			{
			  internalType: "uint256",
			  name: "",
			  type: "uint256",
			},
		  ],
		  stateMutability: "view",
		  type: "function",
		},
		{
		  inputs: [
			{
			  internalType: "address",
			  name: "account",
			  type: "address",
			},
		  ],
		  name: "getAccountDividendsInfo",
		  outputs: [
			{
			  internalType: "address",
			  name: "",
			  type: "address",
			},
			{
			  internalType: "int256",
			  name: "",
			  type: "int256",
			},
			{
			  internalType: "int256",
			  name: "",
			  type: "int256",
			},
			{
			  internalType: "uint256",
			  name: "",
			  type: "uint256",
			},
			{
			  internalType: "uint256",
			  name: "",
			  type: "uint256",
			},
			{
			  internalType: "uint256",
			  name: "",
			  type: "uint256",
			},
			{
			  internalType: "uint256",
			  name: "",
			  type: "uint256",
			},
			{
			  internalType: "uint256",
			  name: "",
			  type: "uint256",
			},
		  ],
		  stateMutability: "view",
		  type: "function",
		},
		{
		  inputs: [
			{
			  internalType: "uint256",
			  name: "index",
			  type: "uint256",
			},
		  ],
		  name: "getAccountDividendsInfoAtIndex",
		  outputs: [
			{
			  internalType: "address",
			  name: "",
			  type: "address",
			},
			{
			  internalType: "int256",
			  name: "",
			  type: "int256",
			},
			{
			  internalType: "int256",
			  name: "",
			  type: "int256",
			},
			{
			  internalType: "uint256",
			  name: "",
			  type: "uint256",
			},
			{
			  internalType: "uint256",
			  name: "",
			  type: "uint256",
			},
			{
			  internalType: "uint256",
			  name: "",
			  type: "uint256",
			},
			{
			  internalType: "uint256",
			  name: "",
			  type: "uint256",
			},
			{
			  internalType: "uint256",
			  name: "",
			  type: "uint256",
			},
		  ],
		  stateMutability: "view",
		  type: "function",
		},
		{
		  inputs: [],
		  name: "getClaimWait",
		  outputs: [
			{
			  internalType: "uint256",
			  name: "",
			  type: "uint256",
			},
		  ],
		  stateMutability: "view",
		  type: "function",
		},
		{
		  inputs: [],
		  name: "getLastProcessedIndex",
		  outputs: [
			{
			  internalType: "uint256",
			  name: "",
			  type: "uint256",
			},
		  ],
		  stateMutability: "view",
		  type: "function",
		},
		{
		  inputs: [],
		  name: "getMinimumTokenBalanceForDividends",
		  outputs: [
			{
			  internalType: "uint256",
			  name: "",
			  type: "uint256",
			},
		  ],
		  stateMutability: "view",
		  type: "function",
		},
		{
		  inputs: [],
		  name: "getNumberOfDividendTokenHolders",
		  outputs: [
			{
			  internalType: "uint256",
			  name: "",
			  type: "uint256",
			},
		  ],
		  stateMutability: "view",
		  type: "function",
		},
		{
		  inputs: [],
		  name: "getTotalDividendsDistributed",
		  outputs: [
			{
			  internalType: "uint256",
			  name: "",
			  type: "uint256",
			},
		  ],
		  stateMutability: "view",
		  type: "function",
		},
		{
		  inputs: [
			{
			  internalType: "address",
			  name: "spender",
			  type: "address",
			},
			{
			  internalType: "uint256",
			  name: "addedValue",
			  type: "uint256",
			},
		  ],
		  name: "increaseAllowance",
		  outputs: [
			{
			  internalType: "bool",
			  name: "",
			  type: "bool",
			},
		  ],
		  stateMutability: "nonpayable",
		  type: "function",
		},
		{
		  inputs: [
			{
			  internalType: "address",
			  name: "account",
			  type: "address",
			},
		  ],
		  name: "isExcludedFromDividends",
		  outputs: [
			{
			  internalType: "bool",
			  name: "",
			  type: "bool",
			},
		  ],
		  stateMutability: "view",
		  type: "function",
		},
		{
		  inputs: [
			{
			  internalType: "address",
			  name: "account",
			  type: "address",
			},
		  ],
		  name: "isExcludedFromFees",
		  outputs: [
			{
			  internalType: "bool",
			  name: "",
			  type: "bool",
			},
		  ],
		  stateMutability: "view",
		  type: "function",
		},
		{
		  inputs: [],
		  name: "liquidityFee",
		  outputs: [
			{
			  internalType: "uint256",
			  name: "",
			  type: "uint256",
			},
		  ],
		  stateMutability: "view",
		  type: "function",
		},
		{
		  inputs: [],
		  name: "marketingFee",
		  outputs: [
			{
			  internalType: "uint256",
			  name: "",
			  type: "uint256",
			},
		  ],
		  stateMutability: "view",
		  type: "function",
		},
		{
		  inputs: [],
		  name: "name",
		  outputs: [
			{
			  internalType: "string",
			  name: "",
			  type: "string",
			},
		  ],
		  stateMutability: "view",
		  type: "function",
		},
		{
		  inputs: [],
		  name: "owner",
		  outputs: [
			{
			  internalType: "address",
			  name: "",
			  type: "address",
			},
		  ],
		  stateMutability: "view",
		  type: "function",
		},
		{
		  inputs: [
			{
			  internalType: "uint256",
			  name: "gas",
			  type: "uint256",
			},
		  ],
		  name: "processDividendTracker",
		  outputs: [],
		  stateMutability: "nonpayable",
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
		  inputs: [],
		  name: "rewardToken",
		  outputs: [
			{
			  internalType: "address",
			  name: "",
			  type: "address",
			},
		  ],
		  stateMutability: "view",
		  type: "function",
		},
		{
		  inputs: [
			{
			  internalType: "address",
			  name: "pair",
			  type: "address",
			},
			{
			  internalType: "bool",
			  name: "value",
			  type: "bool",
			},
		  ],
		  name: "setAutomatedMarketMakerPair",
		  outputs: [],
		  stateMutability: "nonpayable",
		  type: "function",
		},
		{
		  inputs: [
			{
			  internalType: "uint256",
			  name: "value",
			  type: "uint256",
			},
		  ],
		  name: "setLiquiditFee",
		  outputs: [],
		  stateMutability: "nonpayable",
		  type: "function",
		},
		{
		  inputs: [
			{
			  internalType: "uint256",
			  name: "value",
			  type: "uint256",
			},
		  ],
		  name: "setMarketingFee",
		  outputs: [],
		  stateMutability: "nonpayable",
		  type: "function",
		},
		{
		  inputs: [
			{
			  internalType: "address payable",
			  name: "wallet",
			  type: "address",
			},
		  ],
		  name: "setMarketingWallet",
		  outputs: [],
		  stateMutability: "nonpayable",
		  type: "function",
		},
		{
		  inputs: [
			{
			  internalType: "uint256",
			  name: "amount",
			  type: "uint256",
			},
		  ],
		  name: "setSwapTokensAtAmount",
		  outputs: [],
		  stateMutability: "nonpayable",
		  type: "function",
		},
		{
		  inputs: [
			{
			  internalType: "uint256",
			  name: "value",
			  type: "uint256",
			},
		  ],
		  name: "setTokenRewardsFee",
		  outputs: [],
		  stateMutability: "nonpayable",
		  type: "function",
		},
		{
		  inputs: [],
		  name: "swapTokensAtAmount",
		  outputs: [
			{
			  internalType: "uint256",
			  name: "",
			  type: "uint256",
			},
		  ],
		  stateMutability: "view",
		  type: "function",
		},
		{
		  inputs: [],
		  name: "symbol",
		  outputs: [
			{
			  internalType: "string",
			  name: "",
			  type: "string",
			},
		  ],
		  stateMutability: "view",
		  type: "function",
		},
		{
		  inputs: [],
		  name: "tokenRewardsFee",
		  outputs: [
			{
			  internalType: "uint256",
			  name: "",
			  type: "uint256",
			},
		  ],
		  stateMutability: "view",
		  type: "function",
		},
		{
		  inputs: [],
		  name: "totalFees",
		  outputs: [
			{
			  internalType: "uint256",
			  name: "",
			  type: "uint256",
			},
		  ],
		  stateMutability: "view",
		  type: "function",
		},
		{
		  inputs: [],
		  name: "totalSupply",
		  outputs: [
			{
			  internalType: "uint256",
			  name: "",
			  type: "uint256",
			},
		  ],
		  stateMutability: "view",
		  type: "function",
		},
		{
		  inputs: [
			{
			  internalType: "address",
			  name: "recipient",
			  type: "address",
			},
			{
			  internalType: "uint256",
			  name: "amount",
			  type: "uint256",
			},
		  ],
		  name: "transfer",
		  outputs: [
			{
			  internalType: "bool",
			  name: "",
			  type: "bool",
			},
		  ],
		  stateMutability: "nonpayable",
		  type: "function",
		},
		{
		  inputs: [
			{
			  internalType: "address",
			  name: "sender",
			  type: "address",
			},
			{
			  internalType: "address",
			  name: "recipient",
			  type: "address",
			},
			{
			  internalType: "uint256",
			  name: "amount",
			  type: "uint256",
			},
		  ],
		  name: "transferFrom",
		  outputs: [
			{
			  internalType: "bool",
			  name: "",
			  type: "bool",
			},
		  ],
		  stateMutability: "nonpayable",
		  type: "function",
		},
		{
		  inputs: [
			{
			  internalType: "address",
			  name: "newOwner",
			  type: "address",
			},
		  ],
		  name: "transferOwnership",
		  outputs: [],
		  stateMutability: "nonpayable",
		  type: "function",
		},
		{
		  inputs: [],
		  name: "uniswapV2Pair",
		  outputs: [
			{
			  internalType: "address",
			  name: "",
			  type: "address",
			},
		  ],
		  stateMutability: "view",
		  type: "function",
		},
		{
		  inputs: [],
		  name: "uniswapV2Router",
		  outputs: [
			{
			  internalType: "contract IUniswapV2Router02",
			  name: "",
			  type: "address",
			},
		  ],
		  stateMutability: "view",
		  type: "function",
		},
		{
		  inputs: [
			{
			  internalType: "uint256",
			  name: "claimWait",
			  type: "uint256",
			},
		  ],
		  name: "updateClaimWait",
		  outputs: [],
		  stateMutability: "nonpayable",
		  type: "function",
		},
		{
		  inputs: [
			{
			  internalType: "address",
			  name: "newAddress",
			  type: "address",
			},
		  ],
		  name: "updateDividendTracker",
		  outputs: [],
		  stateMutability: "nonpayable",
		  type: "function",
		},
		{
		  inputs: [
			{
			  internalType: "uint256",
			  name: "newValue",
			  type: "uint256",
			},
		  ],
		  name: "updateGasForProcessing",
		  outputs: [],
		  stateMutability: "nonpayable",
		  type: "function",
		},
		{
		  inputs: [
			{
			  internalType: "uint256",
			  name: "amount",
			  type: "uint256",
			},
		  ],
		  name: "updateMinimumTokenBalanceForDividends",
		  outputs: [],
		  stateMutability: "nonpayable",
		  type: "function",
		},
		{
		  inputs: [
			{
			  internalType: "address",
			  name: "newAddress",
			  type: "address",
			},
		  ],
		  name: "updateUniswapV2Router",
		  outputs: [],
		  stateMutability: "nonpayable",
		  type: "function",
		},
		{
		  inputs: [
			{
			  internalType: "address",
			  name: "account",
			  type: "address",
			},
		  ],
		  name: "withdrawableDividendOf",
		  outputs: [
			{
			  internalType: "uint256",
			  name: "",
			  type: "uint256",
			},
		  ],
		  stateMutability: "view",
		  type: "function",
		},
		{
		  stateMutability: "payable",
		  type: "receive",
		},
	  ],
	"buyBackBaby": [
		{
		  inputs: [
			{
			  internalType: "string",
			  name: "name_",
			  type: "string",
			},
			{
			  internalType: "string",
			  name: "symbol_",
			  type: "string",
			},
			{
			  internalType: "uint256",
			  name: "totalSupply_",
			  type: "uint256",
			},
			{
			  internalType: "address",
			  name: "rewardToken_",
			  type: "address",
			},
			{
			  internalType: "address",
			  name: "router_",
			  type: "address",
			},
			{
			  internalType: "uint256[5]",
			  name: "feeSettings_",
			  type: "uint256[5]",
			},
			{
			  internalType: "address",
			  name: "serviceFeeReceiver_",
			  type: "address",
			},
			{
			  internalType: "uint256",
			  name: "serviceFee_",
			  type: "uint256",
			},
		  ],
		  stateMutability: "payable",
		  type: "constructor",
		},
		{
		  anonymous: false,
		  inputs: [
			{
			  indexed: true,
			  internalType: "address",
			  name: "owner",
			  type: "address",
			},
			{
			  indexed: true,
			  internalType: "address",
			  name: "spender",
			  type: "address",
			},
			{
			  indexed: false,
			  internalType: "uint256",
			  name: "value",
			  type: "uint256",
			},
		  ],
		  name: "Approval",
		  type: "event",
		},
		{
		  anonymous: false,
		  inputs: [
			{
			  indexed: false,
			  internalType: "uint256",
			  name: "amountBNB",
			  type: "uint256",
			},
			{
			  indexed: false,
			  internalType: "uint256",
			  name: "amountBOG",
			  type: "uint256",
			},
		  ],
		  name: "AutoLiquify",
		  type: "event",
		},
		{
		  anonymous: false,
		  inputs: [
			{
			  indexed: false,
			  internalType: "uint256",
			  name: "duration",
			  type: "uint256",
			},
		  ],
		  name: "BuybackMultiplierActive",
		  type: "event",
		},
		{
		  anonymous: false,
		  inputs: [
			{
			  indexed: false,
			  internalType: "address",
			  name: "owner",
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
			  indexed: true,
			  internalType: "address",
			  name: "owner",
			  type: "address",
			},
			{
			  indexed: true,
			  internalType: "address",
			  name: "token",
			  type: "address",
			},
			{
			  indexed: false,
			  internalType: "enum TokenType",
			  name: "tokenType",
			  type: "uint8",
			},
			{
			  indexed: false,
			  internalType: "uint256",
			  name: "version",
			  type: "uint256",
			},
		  ],
		  name: "TokenCreated",
		  type: "event",
		},
		{
		  anonymous: false,
		  inputs: [
			{
			  indexed: true,
			  internalType: "address",
			  name: "from",
			  type: "address",
			},
			{
			  indexed: true,
			  internalType: "address",
			  name: "to",
			  type: "address",
			},
			{
			  indexed: false,
			  internalType: "uint256",
			  name: "value",
			  type: "uint256",
			},
		  ],
		  name: "Transfer",
		  type: "event",
		},
		{
		  inputs: [],
		  name: "VERSION",
		  outputs: [
			{
			  internalType: "uint256",
			  name: "",
			  type: "uint256",
			},
		  ],
		  stateMutability: "view",
		  type: "function",
		},
		{
		  inputs: [
			{
			  internalType: "address",
			  name: "holder",
			  type: "address",
			},
			{
			  internalType: "address",
			  name: "spender",
			  type: "address",
			},
		  ],
		  name: "allowance",
		  outputs: [
			{
			  internalType: "uint256",
			  name: "",
			  type: "uint256",
			},
		  ],
		  stateMutability: "view",
		  type: "function",
		},
		{
		  inputs: [
			{
			  internalType: "address",
			  name: "spender",
			  type: "address",
			},
			{
			  internalType: "uint256",
			  name: "amount",
			  type: "uint256",
			},
		  ],
		  name: "approve",
		  outputs: [
			{
			  internalType: "bool",
			  name: "",
			  type: "bool",
			},
		  ],
		  stateMutability: "nonpayable",
		  type: "function",
		},
		{
		  inputs: [
			{
			  internalType: "address",
			  name: "spender",
			  type: "address",
			},
		  ],
		  name: "approveMax",
		  outputs: [
			{
			  internalType: "bool",
			  name: "",
			  type: "bool",
			},
		  ],
		  stateMutability: "nonpayable",
		  type: "function",
		},
		{
		  inputs: [
			{
			  internalType: "address",
			  name: "adr",
			  type: "address",
			},
		  ],
		  name: "authorize",
		  outputs: [],
		  stateMutability: "nonpayable",
		  type: "function",
		},
		{
		  inputs: [],
		  name: "autoBuybackAccumulator",
		  outputs: [
			{
			  internalType: "uint256",
			  name: "",
			  type: "uint256",
			},
		  ],
		  stateMutability: "view",
		  type: "function",
		},
		{
		  inputs: [],
		  name: "autoBuybackAmount",
		  outputs: [
			{
			  internalType: "uint256",
			  name: "",
			  type: "uint256",
			},
		  ],
		  stateMutability: "view",
		  type: "function",
		},
		{
		  inputs: [],
		  name: "autoBuybackBlockLast",
		  outputs: [
			{
			  internalType: "uint256",
			  name: "",
			  type: "uint256",
			},
		  ],
		  stateMutability: "view",
		  type: "function",
		},
		{
		  inputs: [],
		  name: "autoBuybackBlockPeriod",
		  outputs: [
			{
			  internalType: "uint256",
			  name: "",
			  type: "uint256",
			},
		  ],
		  stateMutability: "view",
		  type: "function",
		},
		{
		  inputs: [],
		  name: "autoBuybackCap",
		  outputs: [
			{
			  internalType: "uint256",
			  name: "",
			  type: "uint256",
			},
		  ],
		  stateMutability: "view",
		  type: "function",
		},
		{
		  inputs: [],
		  name: "autoBuybackEnabled",
		  outputs: [
			{
			  internalType: "bool",
			  name: "",
			  type: "bool",
			},
		  ],
		  stateMutability: "view",
		  type: "function",
		},
		{
		  inputs: [],
		  name: "autoLiquidityReceiver",
		  outputs: [
			{
			  internalType: "address",
			  name: "",
			  type: "address",
			},
		  ],
		  stateMutability: "view",
		  type: "function",
		},
		{
		  inputs: [
			{
			  internalType: "address",
			  name: "account",
			  type: "address",
			},
		  ],
		  name: "balanceOf",
		  outputs: [
			{
			  internalType: "uint256",
			  name: "",
			  type: "uint256",
			},
		  ],
		  stateMutability: "view",
		  type: "function",
		},
		{
		  inputs: [
			{
			  internalType: "address",
			  name: "",
			  type: "address",
			},
		  ],
		  name: "buyBacker",
		  outputs: [
			{
			  internalType: "bool",
			  name: "",
			  type: "bool",
			},
		  ],
		  stateMutability: "view",
		  type: "function",
		},
		{
		  inputs: [],
		  name: "buybackFee",
		  outputs: [
			{
			  internalType: "uint256",
			  name: "",
			  type: "uint256",
			},
		  ],
		  stateMutability: "view",
		  type: "function",
		},
		{
		  inputs: [],
		  name: "buybackMultiplierDenominator",
		  outputs: [
			{
			  internalType: "uint256",
			  name: "",
			  type: "uint256",
			},
		  ],
		  stateMutability: "view",
		  type: "function",
		},
		{
		  inputs: [],
		  name: "buybackMultiplierLength",
		  outputs: [
			{
			  internalType: "uint256",
			  name: "",
			  type: "uint256",
			},
		  ],
		  stateMutability: "view",
		  type: "function",
		},
		{
		  inputs: [],
		  name: "buybackMultiplierNumerator",
		  outputs: [
			{
			  internalType: "uint256",
			  name: "",
			  type: "uint256",
			},
		  ],
		  stateMutability: "view",
		  type: "function",
		},
		{
		  inputs: [],
		  name: "buybackMultiplierTriggeredAt",
		  outputs: [
			{
			  internalType: "uint256",
			  name: "",
			  type: "uint256",
			},
		  ],
		  stateMutability: "view",
		  type: "function",
		},
		{
		  inputs: [],
		  name: "clearBuybackMultiplier",
		  outputs: [],
		  stateMutability: "nonpayable",
		  type: "function",
		},
		{
		  inputs: [],
		  name: "decimals",
		  outputs: [
			{
			  internalType: "uint8",
			  name: "",
			  type: "uint8",
			},
		  ],
		  stateMutability: "pure",
		  type: "function",
		},
		{
		  inputs: [],
		  name: "distributor",
		  outputs: [
			{
			  internalType: "contract DividendDistributor",
			  name: "",
			  type: "address",
			},
		  ],
		  stateMutability: "view",
		  type: "function",
		},
		{
		  inputs: [],
		  name: "distributorGas",
		  outputs: [
			{
			  internalType: "uint256",
			  name: "",
			  type: "uint256",
			},
		  ],
		  stateMutability: "view",
		  type: "function",
		},
		{
		  inputs: [],
		  name: "feeDenominator",
		  outputs: [
			{
			  internalType: "uint256",
			  name: "",
			  type: "uint256",
			},
		  ],
		  stateMutability: "view",
		  type: "function",
		},
		{
		  inputs: [],
		  name: "getCirculatingSupply",
		  outputs: [
			{
			  internalType: "uint256",
			  name: "",
			  type: "uint256",
			},
		  ],
		  stateMutability: "view",
		  type: "function",
		},
		{
		  inputs: [
			{
			  internalType: "uint256",
			  name: "accuracy",
			  type: "uint256",
			},
		  ],
		  name: "getLiquidityBacking",
		  outputs: [
			{
			  internalType: "uint256",
			  name: "",
			  type: "uint256",
			},
		  ],
		  stateMutability: "view",
		  type: "function",
		},
		{
		  inputs: [],
		  name: "getMultipliedFee",
		  outputs: [
			{
			  internalType: "uint256",
			  name: "",
			  type: "uint256",
			},
		  ],
		  stateMutability: "view",
		  type: "function",
		},
		{
		  inputs: [
			{
			  internalType: "bool",
			  name: "selling",
			  type: "bool",
			},
		  ],
		  name: "getTotalFee",
		  outputs: [
			{
			  internalType: "uint256",
			  name: "",
			  type: "uint256",
			},
		  ],
		  stateMutability: "view",
		  type: "function",
		},
		{
		  inputs: [
			{
			  internalType: "address",
			  name: "adr",
			  type: "address",
			},
		  ],
		  name: "isAuthorized",
		  outputs: [
			{
			  internalType: "bool",
			  name: "",
			  type: "bool",
			},
		  ],
		  stateMutability: "view",
		  type: "function",
		},
		{
		  inputs: [
			{
			  internalType: "address",
			  name: "",
			  type: "address",
			},
		  ],
		  name: "isDividendExempt",
		  outputs: [
			{
			  internalType: "bool",
			  name: "",
			  type: "bool",
			},
		  ],
		  stateMutability: "view",
		  type: "function",
		},
		{
		  inputs: [
			{
			  internalType: "address",
			  name: "",
			  type: "address",
			},
		  ],
		  name: "isFeeExempt",
		  outputs: [
			{
			  internalType: "bool",
			  name: "",
			  type: "bool",
			},
		  ],
		  stateMutability: "view",
		  type: "function",
		},
		{
		  inputs: [
			{
			  internalType: "uint256",
			  name: "target",
			  type: "uint256",
			},
			{
			  internalType: "uint256",
			  name: "accuracy",
			  type: "uint256",
			},
		  ],
		  name: "isOverLiquified",
		  outputs: [
			{
			  internalType: "bool",
			  name: "",
			  type: "bool",
			},
		  ],
		  stateMutability: "view",
		  type: "function",
		},
		{
		  inputs: [
			{
			  internalType: "address",
			  name: "account",
			  type: "address",
			},
		  ],
		  name: "isOwner",
		  outputs: [
			{
			  internalType: "bool",
			  name: "",
			  type: "bool",
			},
		  ],
		  stateMutability: "view",
		  type: "function",
		},
		{
		  inputs: [],
		  name: "liquidityFee",
		  outputs: [
			{
			  internalType: "uint256",
			  name: "",
			  type: "uint256",
			},
		  ],
		  stateMutability: "view",
		  type: "function",
		},
		{
		  inputs: [],
		  name: "marketingFee",
		  outputs: [
			{
			  internalType: "uint256",
			  name: "",
			  type: "uint256",
			},
		  ],
		  stateMutability: "view",
		  type: "function",
		},
		{
		  inputs: [],
		  name: "marketingFeeReceiver",
		  outputs: [
			{
			  internalType: "address",
			  name: "",
			  type: "address",
			},
		  ],
		  stateMutability: "view",
		  type: "function",
		},
		{
		  inputs: [],
		  name: "name",
		  outputs: [
			{
			  internalType: "string",
			  name: "",
			  type: "string",
			},
		  ],
		  stateMutability: "view",
		  type: "function",
		},
		{
		  inputs: [],
		  name: "pair",
		  outputs: [
			{
			  internalType: "address",
			  name: "",
			  type: "address",
			},
		  ],
		  stateMutability: "view",
		  type: "function",
		},
		{
		  inputs: [],
		  name: "reflectionFee",
		  outputs: [
			{
			  internalType: "uint256",
			  name: "",
			  type: "uint256",
			},
		  ],
		  stateMutability: "view",
		  type: "function",
		},
		{
		  inputs: [],
		  name: "rewardToken",
		  outputs: [
			{
			  internalType: "address",
			  name: "",
			  type: "address",
			},
		  ],
		  stateMutability: "view",
		  type: "function",
		},
		{
		  inputs: [],
		  name: "router",
		  outputs: [
			{
			  internalType: "contract IUniswapV2Router02",
			  name: "",
			  type: "address",
			},
		  ],
		  stateMutability: "view",
		  type: "function",
		},
		{
		  inputs: [
			{
			  internalType: "bool",
			  name: "_enabled",
			  type: "bool",
			},
			{
			  internalType: "uint256",
			  name: "_cap",
			  type: "uint256",
			},
			{
			  internalType: "uint256",
			  name: "_amount",
			  type: "uint256",
			},
			{
			  internalType: "uint256",
			  name: "_period",
			  type: "uint256",
			},
		  ],
		  name: "setAutoBuybackSettings",
		  outputs: [],
		  stateMutability: "nonpayable",
		  type: "function",
		},
		{
		  inputs: [
			{
			  internalType: "address",
			  name: "acc",
			  type: "address",
			},
			{
			  internalType: "bool",
			  name: "add",
			  type: "bool",
			},
		  ],
		  name: "setBuyBacker",
		  outputs: [],
		  stateMutability: "nonpayable",
		  type: "function",
		},
		{
		  inputs: [
			{
			  internalType: "uint256",
			  name: "numerator",
			  type: "uint256",
			},
			{
			  internalType: "uint256",
			  name: "denominator",
			  type: "uint256",
			},
			{
			  internalType: "uint256",
			  name: "length",
			  type: "uint256",
			},
		  ],
		  name: "setBuybackMultiplierSettings",
		  outputs: [],
		  stateMutability: "nonpayable",
		  type: "function",
		},
		{
		  inputs: [
			{
			  internalType: "uint256",
			  name: "_minPeriod",
			  type: "uint256",
			},
			{
			  internalType: "uint256",
			  name: "_minDistribution",
			  type: "uint256",
			},
		  ],
		  name: "setDistributionCriteria",
		  outputs: [],
		  stateMutability: "nonpayable",
		  type: "function",
		},
		{
		  inputs: [
			{
			  internalType: "uint256",
			  name: "gas",
			  type: "uint256",
			},
		  ],
		  name: "setDistributorSettings",
		  outputs: [],
		  stateMutability: "nonpayable",
		  type: "function",
		},
		{
		  inputs: [
			{
			  internalType: "address",
			  name: "_autoLiquidityReceiver",
			  type: "address",
			},
			{
			  internalType: "address",
			  name: "_marketingFeeReceiver",
			  type: "address",
			},
		  ],
		  name: "setFeeReceivers",
		  outputs: [],
		  stateMutability: "nonpayable",
		  type: "function",
		},
		{
		  inputs: [
			{
			  internalType: "uint256",
			  name: "_liquidityFee",
			  type: "uint256",
			},
			{
			  internalType: "uint256",
			  name: "_buybackFee",
			  type: "uint256",
			},
			{
			  internalType: "uint256",
			  name: "_reflectionFee",
			  type: "uint256",
			},
			{
			  internalType: "uint256",
			  name: "_marketingFee",
			  type: "uint256",
			},
			{
			  internalType: "uint256",
			  name: "_feeDenominator",
			  type: "uint256",
			},
		  ],
		  name: "setFees",
		  outputs: [],
		  stateMutability: "nonpayable",
		  type: "function",
		},
		{
		  inputs: [
			{
			  internalType: "address",
			  name: "holder",
			  type: "address",
			},
			{
			  internalType: "bool",
			  name: "exempt",
			  type: "bool",
			},
		  ],
		  name: "setIsDividendExempt",
		  outputs: [],
		  stateMutability: "nonpayable",
		  type: "function",
		},
		{
		  inputs: [
			{
			  internalType: "address",
			  name: "holder",
			  type: "address",
			},
			{
			  internalType: "bool",
			  name: "exempt",
			  type: "bool",
			},
		  ],
		  name: "setIsFeeExempt",
		  outputs: [],
		  stateMutability: "nonpayable",
		  type: "function",
		},
		{
		  inputs: [
			{
			  internalType: "bool",
			  name: "_enabled",
			  type: "bool",
			},
			{
			  internalType: "uint256",
			  name: "_amount",
			  type: "uint256",
			},
		  ],
		  name: "setSwapBackSettings",
		  outputs: [],
		  stateMutability: "nonpayable",
		  type: "function",
		},
		{
		  inputs: [
			{
			  internalType: "uint256",
			  name: "_target",
			  type: "uint256",
			},
			{
			  internalType: "uint256",
			  name: "_denominator",
			  type: "uint256",
			},
		  ],
		  name: "setTargetLiquidity",
		  outputs: [],
		  stateMutability: "nonpayable",
		  type: "function",
		},
		{
		  inputs: [],
		  name: "swapEnabled",
		  outputs: [
			{
			  internalType: "bool",
			  name: "",
			  type: "bool",
			},
		  ],
		  stateMutability: "view",
		  type: "function",
		},
		{
		  inputs: [],
		  name: "swapThreshold",
		  outputs: [
			{
			  internalType: "uint256",
			  name: "",
			  type: "uint256",
			},
		  ],
		  stateMutability: "view",
		  type: "function",
		},
		{
		  inputs: [],
		  name: "symbol",
		  outputs: [
			{
			  internalType: "string",
			  name: "",
			  type: "string",
			},
		  ],
		  stateMutability: "view",
		  type: "function",
		},
		{
		  inputs: [],
		  name: "targetLiquidity",
		  outputs: [
			{
			  internalType: "uint256",
			  name: "",
			  type: "uint256",
			},
		  ],
		  stateMutability: "view",
		  type: "function",
		},
		{
		  inputs: [],
		  name: "targetLiquidityDenominator",
		  outputs: [
			{
			  internalType: "uint256",
			  name: "",
			  type: "uint256",
			},
		  ],
		  stateMutability: "view",
		  type: "function",
		},
		{
		  inputs: [],
		  name: "totalFee",
		  outputs: [
			{
			  internalType: "uint256",
			  name: "",
			  type: "uint256",
			},
		  ],
		  stateMutability: "view",
		  type: "function",
		},
		{
		  inputs: [],
		  name: "totalSupply",
		  outputs: [
			{
			  internalType: "uint256",
			  name: "",
			  type: "uint256",
			},
		  ],
		  stateMutability: "view",
		  type: "function",
		},
		{
		  inputs: [
			{
			  internalType: "address",
			  name: "recipient",
			  type: "address",
			},
			{
			  internalType: "uint256",
			  name: "amount",
			  type: "uint256",
			},
		  ],
		  name: "transfer",
		  outputs: [
			{
			  internalType: "bool",
			  name: "",
			  type: "bool",
			},
		  ],
		  stateMutability: "nonpayable",
		  type: "function",
		},
		{
		  inputs: [
			{
			  internalType: "address",
			  name: "sender",
			  type: "address",
			},
			{
			  internalType: "address",
			  name: "recipient",
			  type: "address",
			},
			{
			  internalType: "uint256",
			  name: "amount",
			  type: "uint256",
			},
		  ],
		  name: "transferFrom",
		  outputs: [
			{
			  internalType: "bool",
			  name: "",
			  type: "bool",
			},
		  ],
		  stateMutability: "nonpayable",
		  type: "function",
		},
		{
		  inputs: [
			{
			  internalType: "address payable",
			  name: "adr",
			  type: "address",
			},
		  ],
		  name: "transferOwnership",
		  outputs: [],
		  stateMutability: "nonpayable",
		  type: "function",
		},
		{
		  inputs: [
			{
			  internalType: "uint256",
			  name: "amount",
			  type: "uint256",
			},
			{
			  internalType: "bool",
			  name: "triggerBuybackMultiplier",
			  type: "bool",
			},
		  ],
		  name: "triggerZeusBuyback",
		  outputs: [],
		  stateMutability: "nonpayable",
		  type: "function",
		},
		{
		  inputs: [
			{
			  internalType: "address",
			  name: "adr",
			  type: "address",
			},
		  ],
		  name: "unauthorize",
		  outputs: [],
		  stateMutability: "nonpayable",
		  type: "function",
		},
		{
		  stateMutability: "payable",
		  type: "receive",
		},
	  ]
}

export const byteCodes = {
	"standard": "0x60806040523480156200001157600080fd5b5060405162000f5638038062000f568339810160408190526200003491620002b5565b6200003f3362000094565b60036200004d8582620003ce565b5060046200005c8482620003ce565b506005805460ff191660ff84161790556200008a620000836000546001600160a01b031690565b82620000e4565b50505050620004bc565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b6001600160a01b0382166200013f5760405162461bcd60e51b815260206004820152601f60248201527f45524332303a206d696e7420746f20746865207a65726f206164647265737300604482015260640160405180910390fd5b6006546200014e9082620001d9565b6006556001600160a01b038216600090815260016020526040902054620001769082620001d9565b6001600160a01b0383166000818152600160205260408082209390935591519091907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef90620001c89085815260200190565b60405180910390a35050565b505050565b6000620001e782846200049a565b90505b92915050565b634e487b7160e01b600052604160045260246000fd5b600082601f8301126200021857600080fd5b81516001600160401b0380821115620002355762000235620001f0565b604051601f8301601f19908116603f01168101908282118183101715620002605762000260620001f0565b816040528381526020925086838588010111156200027d57600080fd5b600091505b83821015620002a1578582018301518183018401529082019062000282565b600093810190920192909252949350505050565b60008060008060808587031215620002cc57600080fd5b84516001600160401b0380821115620002e457600080fd5b620002f28883890162000206565b955060208701519150808211156200030957600080fd5b50620003188782880162000206565b935050604085015160ff811681146200033057600080fd5b6060959095015193969295505050565b600181811c908216806200035557607f821691505b6020821081036200037657634e487b7160e01b600052602260045260246000fd5b50919050565b601f821115620001d457600081815260208120601f850160051c81016020861015620003a55750805b601f850160051c820191505b81811015620003c657828155600101620003b1565b505050505050565b81516001600160401b03811115620003ea57620003ea620001f0565b6200040281620003fb845462000340565b846200037c565b602080601f8311600181146200043a5760008415620004215750858301515b600019600386901b1c1916600185901b178555620003c6565b600085815260208120601f198616915b828110156200046b578886015182559484019460019091019084016200044a565b50858210156200048a5787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b80820180821115620001ea57634e487b7160e01b600052601160045260246000fd5b610a8a80620004cc6000396000f3fe608060405234801561001057600080fd5b50600436106100ea5760003560e01c8063715018a61161008c578063a457c2d711610066578063a457c2d7146101d3578063a9059cbb146101e6578063dd62ed3e146101f9578063f2fde38b1461023257600080fd5b8063715018a6146101a65780638da5cb5b146101b057806395d89b41146101cb57600080fd5b806323b872dd116100c857806323b872dd14610142578063313ce56714610155578063395093511461016a57806370a082311461017d57600080fd5b806306fdde03146100ef578063095ea7b31461010d57806318160ddd14610130575b600080fd5b6100f7610245565b6040516101049190610868565b60405180910390f35b61012061011b3660046108d2565b6102d7565b6040519015158152602001610104565b6006545b604051908152602001610104565b6101206101503660046108fc565b6102ee565b60055460405160ff9091168152602001610104565b6101206101783660046108d2565b610357565b61013461018b366004610938565b6001600160a01b031660009081526001602052604090205490565b6101ae61038d565b005b6000546040516001600160a01b039091168152602001610104565b6100f76103f8565b6101206101e13660046108d2565b610407565b6101206101f43660046108d2565b610456565b610134610207366004610953565b6001600160a01b03918216600090815260026020908152604080832093909416825291909152205490565b6101ae610240366004610938565b610463565b60606003805461025490610986565b80601f016020809104026020016040519081016040528092919081815260200182805461028090610986565b80156102cd5780601f106102a2576101008083540402835291602001916102cd565b820191906000526020600020905b8154815290600101906020018083116102b057829003601f168201915b5050505050905090565b60006102e433848461052e565b5060015b92915050565b60006102fb848484610653565b61034d843361034885604051806060016040528060288152602001610a08602891396001600160a01b038a16600090815260026020908152604080832033845290915290205491906107d9565b61052e565b5060019392505050565b3360008181526002602090815260408083206001600160a01b038716845290915281205490916102e49185906103489086610805565b6000546001600160a01b031633146103ec5760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260448201526064015b60405180910390fd5b6103f66000610818565b565b60606004805461025490610986565b60006102e4338461034885604051806060016040528060258152602001610a30602591393360009081526002602090815260408083206001600160a01b038d16845290915290205491906107d9565b60006102e4338484610653565b6000546001600160a01b031633146104bd5760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260448201526064016103e3565b6001600160a01b0381166105225760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b60648201526084016103e3565b61052b81610818565b50565b6001600160a01b0383166105905760405162461bcd60e51b8152602060048201526024808201527f45524332303a20617070726f76652066726f6d20746865207a65726f206164646044820152637265737360e01b60648201526084016103e3565b6001600160a01b0382166105f15760405162461bcd60e51b815260206004820152602260248201527f45524332303a20617070726f766520746f20746865207a65726f206164647265604482015261737360f01b60648201526084016103e3565b6001600160a01b0383811660008181526002602090815260408083209487168084529482529182902085905590518481527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92591015b60405180910390a3505050565b6001600160a01b0383166106b75760405162461bcd60e51b815260206004820152602560248201527f45524332303a207472616e736665722066726f6d20746865207a65726f206164604482015264647265737360d81b60648201526084016103e3565b6001600160a01b0382166107195760405162461bcd60e51b815260206004820152602360248201527f45524332303a207472616e7366657220746f20746865207a65726f206164647260448201526265737360e81b60648201526084016103e3565b610756816040518060600160405280602681526020016109e2602691396001600160a01b03861660009081526001602052604090205491906107d9565b6001600160a01b0380851660009081526001602052604080822093909355908416815220546107859082610805565b6001600160a01b0380841660008181526001602052604090819020939093559151908516907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef906106469085815260200190565b600081848411156107fd5760405162461bcd60e51b81526004016103e39190610868565b505050900390565b600061081182846109c0565b9392505050565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b600060208083528351808285015260005b8181101561089557858101830151858201604001528201610879565b506000604082860101526040601f19601f8301168501019250505092915050565b80356001600160a01b03811681146108cd57600080fd5b919050565b600080604083850312156108e557600080fd5b6108ee836108b6565b946020939093013593505050565b60008060006060848603121561091157600080fd5b61091a846108b6565b9250610928602085016108b6565b9150604084013590509250925092565b60006020828403121561094a57600080fd5b610811826108b6565b6000806040838503121561096657600080fd5b61096f836108b6565b915061097d602084016108b6565b90509250929050565b600181811c9082168061099a57607f821691505b6020821081036109ba57634e487b7160e01b600052602260045260246000fd5b50919050565b808201808211156102e857634e487b7160e01b600052601160045260246000fdfe45524332303a207472616e7366657220616d6f756e7420657863656564732062616c616e636545524332303a207472616e7366657220616d6f756e74206578636565647320616c6c6f77616e636545524332303a2064656372656173656420616c6c6f77616e63652062656c6f77207a65726fa26469706673582212207bd4be41b543dd491741dec0fbc5e483495b63f91e659d38ed6cbe18223f54ee64736f6c63430008130033",
	"liquidityGen": "0x6080604052600d54600e55600f5460105560115460125560405162002fe338038062002fe3833981016040819052620000389162000854565b620000433362000619565b62000052565b60405180910390fd5b6001600160a01b038616620000ee5761ffff831615620000ee5760405162461bcd60e51b815260206004820152604a60248201527f43616e742073657420626f74682063686172697479206164647265737320746f60448201527f2061646472657373203020616e6420636861726974792070657263656e74206d60648201526906f7265207468616e20360b41b608482015260a40162000049565b6109c483620000fe86886200096d565b6200010a91906200096d565b61ffff1611156200015e5760405162461bcd60e51b815260206004820152601560248201527f546f74616c20666565206973206f766572203235250000000000000000000000604482015260640162000049565b89516200017390600a9060208d01906200068c565b5088516200018990600b9060208c01906200068c565b50600c805460ff191660091790556007889055620001aa8860001962000a26565b620001b890600019620009cf565b60085561ffff858116600d819055600e55848116600f819055601055601580546001600160a01b0319166001600160a01b038916179055831660118190556012556200022d612710620002198a600562000669602090811b620010d817901c565b6200067e60201b620010e41790919060201c565b6016556015805460ff60a81b1916600160a81b179055600854600160006200025d6000546001600160a01b031690565b6001600160a01b03166001600160a01b03168152602001908152602001600020819055506000879050806001600160a01b031663c45a01556040518163ffffffff1660e01b815260040160206040518083038186803b158015620002c057600080fd5b505afa158015620002d5573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190620002fb919062000815565b6001600160a01b031663c9c6539630836001600160a01b031663ad5c46486040518163ffffffff1660e01b815260040160206040518083038186803b1580156200034457600080fd5b505afa15801562000359573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906200037f919062000815565b6040516001600160e01b031960e085901b1681526001600160a01b03928316600482015291166024820152604401602060405180830381600087803b158015620003c857600080fd5b505af1158015620003dd573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019062000403919062000815565b601480546001600160a01b03199081166001600160a01b0393841617909155601380549091169183169190911790556001600460006200044b6000546001600160a01b031690565b6001600160a01b0316815260208082019290925260409081016000908120805494151560ff1995861617905530815260049092529020805490911660011790556200049e6000546001600160a01b031690565b6001600160a01b031660006001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef600754604051620004e691815260200190565b60405180910390a330620005026000546001600160a01b031690565b6001600160a01b03167f56358b41df5fa59f5639228f0930994cbdde383c8a8fd74e06c04e1deebe3562600260016040516200054092919062000940565b60405180910390a36000836001600160a01b0316637022b58e846040518263ffffffff1660e01b81526004016020604051808303818588803b1580156200058657600080fd5b505af11580156200059b573d6000803e3d6000fd5b50505050506040513d601f19601f82011682018060405250810190620005c2919062000832565b905080620006075760405162461bcd60e51b8152602060048201526011602482015270696e76616c6964206665652076616c756560781b604482015260640162000049565b50505050505050505050505062000a7f565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b6000620006778284620009ad565b9392505050565b600062000677828462000996565b8280546200069a90620009e9565b90600052602060002090601f016020900481019282620006be576000855562000709565b82601f10620006d957805160ff191683800117855562000709565b8280016001018555821562000709579182015b8281111562000709578251825591602001919060010190620006ec565b50620007179291506200071b565b5090565b5b808211156200071757600081556001016200071c565b80516001600160a01b03811681146200074a57600080fd5b919050565b600082601f83011262000760578081fd5b81516001600160401b03808211156200077d576200077d62000a69565b604051601f8301601f19908116603f01168101908282118183101715620007a857620007a862000a69565b81604052838152602092508683858801011115620007c4578485fd5b8491505b83821015620007e75785820183015181830184015290820190620007c8565b83821115620007f857848385830101525b9695505050505050565b805161ffff811681146200074a57600080fd5b60006020828403121562000827578081fd5b620006778262000732565b60006020828403121562000844578081fd5b8151801515811462000677578182fd5b6000806000806000806000806000806101408b8d03121562000874578586fd5b8a516001600160401b03808211156200088b578788fd5b620008998e838f016200074f565b9b5060208d0151915080821115620008af578788fd5b50620008be8d828e016200074f565b99505060408b01519750620008d660608c0162000732565b9650620008e660808c0162000732565b9550620008f660a08c0162000802565b94506200090660c08c0162000802565b93506200091660e08c0162000802565b9250620009276101008c0162000732565b91506101208b015190509295989b9194979a5092959850565b60408101600884106200096357634e487b7160e01b600052602160045260246000fd5b9281526020015290565b600061ffff8083168185168083038211156200098d576200098d62000a3d565b01949350505050565b600082620009a857620009a862000a53565b500490565b6000816000190483118215151615620009ca57620009ca62000a3d565b500290565b600082821015620009e457620009e462000a3d565b500390565b600181811c90821680620009fe57607f821691505b6020821081141562000a2057634e487b7160e01b600052602260045260246000fd5b50919050565b60008262000a385762000a3862000a53565b500690565b634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052601260045260246000fd5b634e487b7160e01b600052604160045260246000fd5b6125548062000a8f6000396000f3fe6080604052600436106102085760003560e01c806349bd5a5e116101185780638ee88c53116100a0578063c49b9a801161006f578063c49b9a80146105fc578063dd62ed3e1461061c578063ea2f0b3714610662578063f2fde38b14610682578063ffa1ad74146106a257600080fd5b80638ee88c531461058757806395d89b41146105a7578063a457c2d7146105bc578063a9059cbb146105dc57600080fd5b80636bc87c3a116100e75780636bc87c3a146104e557806370a08231146104fb578063715018a61461051b57806388f82020146105305780638da5cb5b1461056957600080fd5b806349bd5a5e1461044b5780634a74bb021461046b57806352390c021461048c5780635342acb4146104ac57600080fd5b80632d8381191161019b5780633b124fe71161016a5780633b124fe7146103bf5780633bd5d173146103d557806340f8007a146103f5578063437823ec1461040b5780634549b0391461042b57600080fd5b80632d8381191461033d578063313ce5671461035d5780633685d4191461037f578063395093511461039f57600080fd5b80631694505e116101d75780631694505e146102b057806318160ddd146102e857806319a8ac9e146102fd57806323b872dd1461031d57600080fd5b8063061c82d01461021457806306fdde0314610236578063095ea7b31461026157806313114a9d1461029157600080fd5b3661020f57005b600080fd5b34801561022057600080fd5b5061023461022f36600461227a565b6106b7565b005b34801561024257600080fd5b5061024b610757565b60405161025891906122ea565b60405180910390f35b34801561026d57600080fd5b5061028161027c366004612235565b6107e9565b6040519015158152602001610258565b34801561029d57600080fd5b506009545b604051908152602001610258565b3480156102bc57600080fd5b506013546102d0906001600160a01b031681565b6040516001600160a01b039091168152602001610258565b3480156102f457600080fd5b506007546102a2565b34801561030957600080fd5b506015546102d0906001600160a01b031681565b34801561032957600080fd5b506102816103383660046121f5565b610800565b34801561034957600080fd5b506102a261035836600461227a565b610869565b34801561036957600080fd5b50600c5460405160ff9091168152602001610258565b34801561038b57600080fd5b5061023461039a366004612185565b6108ed565b3480156103ab57600080fd5b506102816103ba366004612235565b610adc565b3480156103cb57600080fd5b506102a2600d5481565b3480156103e157600080fd5b506102346103f036600461227a565b610b12565b34801561040157600080fd5b506102a260115481565b34801561041757600080fd5b50610234610426366004612185565b610bfe565b34801561043757600080fd5b506102a2610446366004612292565b610c4c565b34801561045757600080fd5b506014546102d0906001600160a01b031681565b34801561047757600080fd5b5060155461028190600160a81b900460ff1681565b34801561049857600080fd5b506102346104a7366004612185565b610cdb565b3480156104b857600080fd5b506102816104c7366004612185565b6001600160a01b031660009081526004602052604090205460ff1690565b3480156104f157600080fd5b506102a2600f5481565b34801561050757600080fd5b506102a2610516366004612185565b610e2e565b34801561052757600080fd5b50610234610e8d565b34801561053c57600080fd5b5061028161054b366004612185565b6001600160a01b031660009081526005602052604090205460ff1690565b34801561057557600080fd5b506000546001600160a01b03166102d0565b34801561059357600080fd5b506102346105a236600461227a565b610ec3565b3480156105b357600080fd5b5061024b610f08565b3480156105c857600080fd5b506102816105d7366004612235565b610f17565b3480156105e857600080fd5b506102816105f7366004612235565b610f66565b34801561060857600080fd5b50610234610617366004612260565b610f73565b34801561062857600080fd5b506102a26106373660046121bd565b6001600160a01b03918216600090815260036020908152604080832093909416825291909152205490565b34801561066e57600080fd5b5061023461067d366004612185565b610ff5565b34801561068e57600080fd5b5061023461069d366004612185565b611040565b3480156106ae57600080fd5b506102a2600181565b6000546001600160a01b031633146106ea5760405162461bcd60e51b81526004016106e19061233d565b60405180910390fd5b600d819055601154600f546109c4919061070490846123e2565b61070e91906123e2565b11156107545760405162461bcd60e51b8152602060048201526015602482015274546f74616c20666565206973206f7665722032352560581b60448201526064016106e1565b50565b6060600a805461076690612450565b80601f016020809104026020016040519081016040528092919081815260200182805461079290612450565b80156107df5780601f106107b4576101008083540402835291602001916107df565b820191906000526020600020905b8154815290600101906020018083116107c257829003601f168201915b5050505050905090565b60006107f63384846110f0565b5060015b92915050565b600061080d848484611215565b61085f843361085a856040518060600160405280602881526020016124d2602891396001600160a01b038a166000908152600360209081526040808320338452909152902054919061140a565b6110f0565b5060019392505050565b60006008548211156108d05760405162461bcd60e51b815260206004820152602a60248201527f416d6f756e74206d757374206265206c657373207468616e20746f74616c207260448201526965666c656374696f6e7360b01b60648201526084016106e1565b60006108da611436565b90506108e683826110e4565b9392505050565b6000546001600160a01b031633146109175760405162461bcd60e51b81526004016106e19061233d565b6001600160a01b03811660009081526005602052604090205460ff1661097f5760405162461bcd60e51b815260206004820152601b60248201527f4163636f756e7420697320616c7265616479206578636c75646564000000000060448201526064016106e1565b60005b600654811015610ad857816001600160a01b0316600682815481106109b757634e487b7160e01b600052603260045260246000fd5b6000918252602090912001546001600160a01b03161415610ac657600680546109e290600190612439565b81548110610a0057634e487b7160e01b600052603260045260246000fd5b600091825260209091200154600680546001600160a01b039092169183908110610a3a57634e487b7160e01b600052603260045260246000fd5b600091825260208083209190910180546001600160a01b0319166001600160a01b039485161790559184168152600282526040808220829055600590925220805460ff191690556006805480610aa057634e487b7160e01b600052603160045260246000fd5b600082815260209020810160001990810180546001600160a01b03191690550190555050565b80610ad08161248b565b915050610982565b5050565b3360008181526003602090815260408083206001600160a01b038716845290915281205490916107f691859061085a9086611459565b3360008181526005602052604090205460ff1615610b875760405162461bcd60e51b815260206004820152602c60248201527f4578636c75646564206164647265737365732063616e6e6f742063616c6c207460448201526b3434b990333ab731ba34b7b760a11b60648201526084016106e1565b6000610b9283611465565b5050506001600160a01b038616600090815260016020526040902054939450610bc0939250849150506114c0565b6001600160a01b038316600090815260016020526040902055600854610be690826114c0565b600855600954610bf69084611459565b600955505050565b6000546001600160a01b03163314610c285760405162461bcd60e51b81526004016106e19061233d565b6001600160a01b03166000908152600460205260409020805460ff19166001179055565b6000600754831115610ca05760405162461bcd60e51b815260206004820152601f60248201527f416d6f756e74206d757374206265206c657373207468616e20737570706c790060448201526064016106e1565b81610cc0576000610cb084611465565b509496506107fa95505050505050565b6000610ccb84611465565b509396506107fa95505050505050565b6000546001600160a01b03163314610d055760405162461bcd60e51b81526004016106e19061233d565b6001600160a01b03811660009081526005602052604090205460ff1615610d6e5760405162461bcd60e51b815260206004820152601b60248201527f4163636f756e7420697320616c7265616479206578636c75646564000000000060448201526064016106e1565b6001600160a01b03811660009081526001602052604090205415610dc8576001600160a01b038116600090815260016020526040902054610dae90610869565b6001600160a01b0382166000908152600260205260409020555b6001600160a01b03166000818152600560205260408120805460ff191660019081179091556006805491820181559091527ff652222313e28459528d920b65115c16c04f3efc82aaedc97be59f3f377c0d3f0180546001600160a01b0319169091179055565b6001600160a01b03811660009081526005602052604081205460ff1615610e6b57506001600160a01b031660009081526002602052604090205490565b6001600160a01b0382166000908152600160205260409020546107fa90610869565b6000546001600160a01b03163314610eb75760405162461bcd60e51b81526004016106e19061233d565b610ec160006114cc565b565b6000546001600160a01b03163314610eed5760405162461bcd60e51b81526004016106e19061233d565b600f819055601154600d546109c491906107049084906123e2565b6060600b805461076690612450565b60006107f6338461085a856040518060600160405280602581526020016124fa602591393360009081526003602090815260408083206001600160a01b038d168452909152902054919061140a565b60006107f6338484611215565b6000546001600160a01b03163314610f9d5760405162461bcd60e51b81526004016106e19061233d565b60158054821515600160a81b0260ff60a81b199091161790556040517f53726dfcaf90650aa7eb35524f4d3220f07413c8d6cb404cc8c18bf5591bc15990610fea90831515815260200190565b60405180910390a150565b6000546001600160a01b0316331461101f5760405162461bcd60e51b81526004016106e19061233d565b6001600160a01b03166000908152600460205260409020805460ff19169055565b6000546001600160a01b0316331461106a5760405162461bcd60e51b81526004016106e19061233d565b6001600160a01b0381166110cf5760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b60648201526084016106e1565b610754816114cc565b60006108e6828461241a565b60006108e682846123fa565b6001600160a01b0383166111525760405162461bcd60e51b8152602060048201526024808201527f45524332303a20617070726f76652066726f6d20746865207a65726f206164646044820152637265737360e01b60648201526084016106e1565b6001600160a01b0382166111b35760405162461bcd60e51b815260206004820152602260248201527f45524332303a20617070726f766520746f20746865207a65726f206164647265604482015261737360f01b60648201526084016106e1565b6001600160a01b0383811660008181526003602090815260408083209487168084529482529182902085905590518481527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92591015b60405180910390a3505050565b6001600160a01b0383166112795760405162461bcd60e51b815260206004820152602560248201527f45524332303a207472616e736665722066726f6d20746865207a65726f206164604482015264647265737360d81b60648201526084016106e1565b6001600160a01b0382166112db5760405162461bcd60e51b815260206004820152602360248201527f45524332303a207472616e7366657220746f20746865207a65726f206164647260448201526265737360e81b60648201526084016106e1565b6000811161133d5760405162461bcd60e51b815260206004820152602960248201527f5472616e7366657220616d6f756e74206d7573742062652067726561746572206044820152687468616e207a65726f60b81b60648201526084016106e1565b600061134830610e2e565b601654909150811080159081906113695750601554600160a01b900460ff16155b801561138357506014546001600160a01b03868116911614155b80156113985750601554600160a81b900460ff165b156113ab5760165491506113ab8261151c565b6001600160a01b03851660009081526004602052604090205460019060ff16806113ed57506001600160a01b03851660009081526004602052604090205460ff165b156113f6575060005b611402868686846115c3565b505050505050565b6000818484111561142e5760405162461bcd60e51b81526004016106e191906122ea565b505050900390565b6000806000611443611746565b909250905061145282826110e4565b9250505090565b60006108e682846123e2565b600080600080600080600080600080600061147f8c611900565b935093509350935060008060006114a08f87878761149b611436565b611955565b919f509d509b509599509397509195509350505050919395979092949650565b60006108e68284612439565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b6015805460ff60a01b1916600160a01b179055600061153c8260026110e4565b9050600061154a83836114c0565b905047611556836119b7565b600061156247836114c0565b905061156e8382611b34565b60408051858152602081018390529081018490527f17bbfb9a6069321b6ded73bd96327c9e6b7212a5cd51ff219cd61370acafb5619060600160405180910390a150506015805460ff60a01b19169055505050565b806115d0576115d0611c18565b6001600160a01b03841660009081526005602052604090205460ff16801561161157506001600160a01b03831660009081526005602052604090205460ff16155b1561162657611621848484611c5d565b611724565b6001600160a01b03841660009081526005602052604090205460ff1615801561166757506001600160a01b03831660009081526005602052604090205460ff165b1561167757611621848484611da3565b6001600160a01b03841660009081526005602052604090205460ff161580156116b957506001600160a01b03831660009081526005602052604090205460ff16155b156116c957611621848484611e62565b6001600160a01b03841660009081526005602052604090205460ff16801561170957506001600160a01b03831660009081526005602052604090205460ff165b1561171957611621848484611ebc565b611724848484611e62565b8061174057611740600e54600d55601054600f55601254601155565b50505050565b6008546007546000918291825b6006548110156118d05782600160006006848154811061178357634e487b7160e01b600052603260045260246000fd5b60009182526020808320909101546001600160a01b0316835282019290925260400190205411806117fc57508160026000600684815481106117d557634e487b7160e01b600052603260045260246000fd5b60009182526020808320909101546001600160a01b03168352820192909252604001902054115b1561181257600854600754945094505050509091565b611866600160006006848154811061183a57634e487b7160e01b600052603260045260246000fd5b60009182526020808320909101546001600160a01b0316835282019290925260400190205484906114c0565b92506118bc600260006006848154811061189057634e487b7160e01b600052603260045260246000fd5b60009182526020808320909101546001600160a01b0316835282019290925260400190205483906114c0565b9150806118c88161248b565b915050611753565b506007546008546118e0916110e4565b8210156118f7576008546007549350935050509091565b90939092509050565b600080600080600061191186611f45565b9050600061191e87611f68565b9050600061192b88611f85565b905060006119458261193f85818d896114c0565b906114c0565b9993985091965094509092505050565b600080808061196489866110d8565b9050600061197289876110d8565b9050600061198089886110d8565b9050600061198e89896110d8565b905060006119a28261193f858189896114c0565b949d949c50929a509298505050505050505050565b60408051600280825260608201835260009260208301908036833701905050905030816000815181106119fa57634e487b7160e01b600052603260045260246000fd5b6001600160a01b03928316602091820292909201810191909152601354604080516315ab88c960e31b81529051919093169263ad5c4648926004808301939192829003018186803b158015611a4e57600080fd5b505afa158015611a62573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611a8691906121a1565b81600181518110611aa757634e487b7160e01b600052603260045260246000fd5b6001600160a01b039283166020918202929092010152601354611acd91309116846110f0565b60135460405163791ac94760e01b81526001600160a01b039091169063791ac94790611b06908590600090869030904290600401612372565b600060405180830381600087803b158015611b2057600080fd5b505af1158015611402573d6000803e3d6000fd5b601354611b4c9030906001600160a01b0316846110f0565b6013546001600160a01b031663f305d719823085600080611b756000546001600160a01b031690565b60405160e088901b6001600160e01b03191681526001600160a01b03958616600482015260248101949094526044840192909252606483015290911660848201524260a482015260c4016060604051808303818588803b158015611bd857600080fd5b505af1158015611bec573d6000803e3d6000fd5b50505050506040513d601f19601f82011682018060405250810190611c1191906122bd565b5050505050565b600d54158015611c285750600f54155b8015611c345750601154155b15611c3b57565b600d8054600e55600f8054601055601180546012556000928390559082905555565b6000806000806000806000611c7188611465565b9650965096509650965096509650611cb788600260008d6001600160a01b03166001600160a01b03168152602001908152602001600020546114c090919063ffffffff16565b6001600160a01b038b16600090815260026020908152604080832093909355600190522054611ce690886114c0565b6001600160a01b03808c1660009081526001602052604080822093909355908b1681522054611d159087611459565b6001600160a01b038a16600090815260016020526040902055611d3782611fbb565b611d4081612044565b611d4a858461214c565b886001600160a01b03168a6001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef86604051611d8f91815260200190565b60405180910390a350505050505050505050565b6000806000806000806000611db788611465565b9650965096509650965096509650611dfd87600160008d6001600160a01b03166001600160a01b03168152602001908152602001600020546114c090919063ffffffff16565b6001600160a01b03808c16600090815260016020908152604080832094909455918c16815260029091522054611e339085611459565b6001600160a01b038a16600090815260026020908152604080832093909355600190522054611d159087611459565b6000806000806000806000611e7688611465565b9650965096509650965096509650611ce687600160008d6001600160a01b03166001600160a01b03168152602001908152602001600020546114c090919063ffffffff16565b6000806000806000806000611ed088611465565b9650965096509650965096509650611f1688600260008d6001600160a01b03166001600160a01b03168152602001908152602001600020546114c090919063ffffffff16565b6001600160a01b038b16600090815260026020908152604080832093909355600190522054611dfd90886114c0565b60006107fa612710611f62600d54856110d890919063ffffffff16565b906110e4565b60006107fa612710611f62600f54856110d890919063ffffffff16565b6015546000906001600160a01b0316611fa057506000919050565b6107fa612710611f62601154856110d890919063ffffffff16565b6000611fc5611436565b90506000611fd383836110d8565b30600090815260016020526040902054909150611ff09082611459565b3060009081526001602090815260408083209390935560059052205460ff161561203f573060009081526002602052604090205461202e9084611459565b306000908152600260205260409020555b505050565b8015610754576000612054611436565b9050600061206283836110d8565b6015546001600160a01b031660009081526001602052604090205490915061208a9082611459565b601580546001600160a01b03908116600090815260016020908152604080832095909555925490911681526005909152205460ff1615612105576015546001600160a01b03166000908152600260205260409020546120e99084611459565b6015546001600160a01b03166000908152600260205260409020555b6015546001600160a01b0316336001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef8560405161120891815260200190565b60085461215990836114c0565b6008556009546121699082611459565b6009555050565b8035801515811461218057600080fd5b919050565b600060208284031215612196578081fd5b81356108e6816124bc565b6000602082840312156121b2578081fd5b81516108e6816124bc565b600080604083850312156121cf578081fd5b82356121da816124bc565b915060208301356121ea816124bc565b809150509250929050565b600080600060608486031215612209578081fd5b8335612214816124bc565b92506020840135612224816124bc565b929592945050506040919091013590565b60008060408385031215612247578182fd5b8235612252816124bc565b946020939093013593505050565b600060208284031215612271578081fd5b6108e682612170565b60006020828403121561228b578081fd5b5035919050565b600080604083850312156122a4578182fd5b823591506122b460208401612170565b90509250929050565b6000806000606084860312156122d1578283fd5b8351925060208401519150604084015190509250925092565b6000602080835283518082850152825b81811015612316578581018301518582016040015282016122fa565b818111156123275783604083870101525b50601f01601f1916929092016040019392505050565b6020808252818101527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604082015260600190565b600060a082018783526020878185015260a0604085015281875180845260c0860191508289019350845b818110156123c15784516001600160a01b03168352938301939183019160010161239c565b50506001600160a01b03969096166060850152505050608001529392505050565b600082198211156123f5576123f56124a6565b500190565b60008261241557634e487b7160e01b81526012600452602481fd5b500490565b6000816000190483118215151615612434576124346124a6565b500290565b60008282101561244b5761244b6124a6565b500390565b600181811c9082168061246457607f821691505b6020821081141561248557634e487b7160e01b600052602260045260246000fd5b50919050565b600060001982141561249f5761249f6124a6565b5060010190565b634e487b7160e01b600052601160045260246000fd5b6001600160a01b038116811461075457600080fdfe45524332303a207472616e7366657220616d6f756e74206578636565647320616c6c6f77616e636545524332303a2064656372656173656420616c6c6f77616e63652062656c6f77207a65726fa2646970667358221220cc73fad184af5b1bd50a06b20ff9062dec3861e9f3aeed8bc491e465616537ba64736f6c63430008040033",
	"baby": "0x6080604052604051620047af380380620047af833981016040819052620000269162000ef4565b8751889088906200003f90600390602085019062000ced565b5080516200005590600490602084019062000ced565b505050620000726200006c6200080260201b60201c565b62000806565b8451600980546001600160a01b03199081166001600160a01b03938416179091556040870151600f805490921692169182179055331415620001115760405162461bcd60e51b815260206004820152602d60248201527f4f776e657220616e64206d61726b6574696e672077616c6c65742063616e6e6f60448201526c74206265207468652073616d6560981b60648201526084015b60405180910390fd5b8351600b819055602080860151600c8190556040870151600d8190556200015d93909262000149929062001fde62000858821b17901c565b6200085860201b62001fde1790919060201c565b600e81905560191015620001b45760405162461bcd60e51b815260206004820152601560248201527f546f74616c20666565206973206f766572203235250000000000000000000000604482015260640162000108565b620001eb620f4240620001d76002896200086d60201b62001ff11790919060201c565b6200087b60201b62001ffd1790919060201c565b600a55620493e06010556200021285600360200201516200088960201b620020091760201c565b600880546001600160a01b0319166001600160a01b0392831690811790915560095460405163cd6dc68760e01b815292166004830152602482018590529063cd6dc68790604401600060405180830381600087803b1580156200027457600080fd5b505af115801562000289573d6000803e3d6000fd5b50505050600085600160048110620002b157634e487b7160e01b600052603260045260246000fd5b602002015190506000816001600160a01b031663c45a01556040518163ffffffff1660e01b815260040160206040518083038186803b158015620002f457600080fd5b505afa15801562000309573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906200032f919062000eb5565b6001600160a01b031663c9c6539630846001600160a01b031663ad5c46486040518163ffffffff1660e01b815260040160206040518083038186803b1580156200037857600080fd5b505afa1580156200038d573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190620003b3919062000eb5565b6040516001600160e01b031960e085901b1681526001600160a01b03928316600482015291166024820152604401602060405180830381600087803b158015620003fc57600080fd5b505af115801562000411573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019062000437919062000eb5565b600680546001600160a01b038086166001600160a01b031992831617909255600780549284169290911691909117905590506200047681600162000938565b60085460405163031e79db60e41b81526001600160a01b0390911660048201819052906331e79db090602401600060405180830381600087803b158015620004bd57600080fd5b505af1158015620004d2573d6000803e3d6000fd5b505060085460405163031e79db60e41b81523060048201526001600160a01b0390911692506331e79db09150602401600060405180830381600087803b1580156200051c57600080fd5b505af115801562000531573d6000803e3d6000fd5b50506008546001600160a01b031691506331e79db090506200055b6005546001600160a01b031690565b6040516001600160e01b031960e084901b1681526001600160a01b039091166004820152602401600060405180830381600087803b1580156200059d57600080fd5b505af1158015620005b2573d6000803e3d6000fd5b505060085460405163031e79db60e41b815261dead60048201526001600160a01b0390911692506331e79db09150602401600060405180830381600087803b158015620005fe57600080fd5b505af115801562000613573d6000803e3d6000fd5b505060085460405163031e79db60e41b81526001600160a01b03868116600483015290911692506331e79db09150602401600060405180830381600087803b1580156200065f57600080fd5b505af115801562000674573d6000803e3d6000fd5b50505050620006946200068c62000aa760201b60201c565b600162000ab6565b600f54620006ad906001600160a01b0316600162000ab6565b620006ba30600162000ab6565b620006d8620006d16005546001600160a01b031690565b8962000c08565b30620006ec6005546001600160a01b031690565b6001600160a01b03167f56358b41df5fa59f5639228f0930994cbdde383c8a8fd74e06c04e1deebe3562600460016040516200072a92919062001004565b60405180910390a36000846001600160a01b0316637022b58e856040518263ffffffff1660e01b81526004016020604051808303818588803b1580156200077057600080fd5b505af115801562000785573d6000803e3d6000fd5b50505050506040513d601f19601f82011682018060405250810190620007ac919062000ed2565b905080620007f15760405162461bcd60e51b8152602060048201526011602482015270696e76616c6964206665652076616c756560781b604482015260640162000108565b505050505050505050505062001156565b3390565b600580546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b60006200086682846200108f565b9392505050565b6000620008668284620010cb565b6000620008668284620010aa565b60006040517f3d602d80600a3d3981f3363d3d373d3d3d363d7300000000000000000000000081528260601b60148201526e5af43d82803e903d91602b57fd5bf360881b60288201526037816000f09150506001600160a01b038116620009335760405162461bcd60e51b815260206004820152601660248201527f455243313136373a20637265617465206661696c656400000000000000000000604482015260640162000108565b919050565b6001600160a01b03821660009081526012602052604090205460ff1615158115151415620009db5760405162461bcd60e51b815260206004820152604360248201527f42414259544f4b454e3a204175746f6d61746564206d61726b6574206d616b6560448201527f72207061697220697320616c72656164792073657420746f20746861742076616064820152626c756560e81b608482015260a40162000108565b6001600160a01b0382166000908152601260205260409020805460ff1916821580159190911790915562000a6b5760085460405163031e79db60e41b81526001600160a01b038481166004830152909116906331e79db090602401600060405180830381600087803b15801562000a5157600080fd5b505af115801562000a66573d6000803e3d6000fd5b505050505b604051811515906001600160a01b038416907fffa9187bf1f18bf477bd0ea1bcbb64e93b6a98132473929edfce215cd9b16fab90600090a35050565b6005546001600160a01b031690565b6005546001600160a01b0316331462000b125760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015260640162000108565b6001600160a01b03821660009081526011602052604090205460ff161515811515141562000ba95760405162461bcd60e51b815260206004820152603560248201527f42414259544f4b454e3a204163636f756e7420697320616c726561647920746860448201527f652076616c7565206f6620276578636c75646564270000000000000000000000606482015260840162000108565b6001600160a01b038216600081815260116020908152604091829020805460ff191685151590811790915591519182527f9d8f7706ea1113d1a167b526eca956215946dd36cc7df39eb16180222d8b5df7910160405180910390a25050565b6001600160a01b03821662000c605760405162461bcd60e51b815260206004820152601f60248201527f45524332303a206d696e7420746f20746865207a65726f206164647265737300604482015260640162000108565b806002600082825462000c7491906200108f565b90915550506001600160a01b0382166000908152602081905260408120805483929062000ca39084906200108f565b90915550506040518181526001600160a01b038316906000907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9060200160405180910390a35050565b82805462000cfb90620010ed565b90600052602060002090601f01602090048101928262000d1f576000855562000d6a565b82601f1062000d3a57805160ff191683800117855562000d6a565b8280016001018555821562000d6a579182015b8281111562000d6a57825182559160200191906001019062000d4d565b5062000d7892915062000d7c565b5090565b5b8082111562000d78576000815560010162000d7d565b80516001600160a01b03811681146200093357600080fd5b600082601f83011262000dbc578081fd5b604051606081016001600160401b038111828210171562000de15762000de162001140565b60405280836060810186101562000df6578384fd5b835b600381101562000e1957815183526020928301929091019060010162000df8565b509195945050505050565b600082601f83011262000e35578081fd5b81516001600160401b0381111562000e515762000e5162001140565b602062000e67601f8301601f191682016200105c565b828152858284870101111562000e7b578384fd5b835b8381101562000e9a57858101830151828201840152820162000e7d565b8381111562000eab57848385840101525b5095945050505050565b60006020828403121562000ec7578081fd5b620008668262000d93565b60006020828403121562000ee4578081fd5b8151801515811462000866578182fd5b6000806000806000806000806101a0898b03121562000f11578384fd5b88516001600160401b038082111562000f28578586fd5b62000f368c838d0162000e24565b995060209150818b01518181111562000f4d578687fd5b62000f5b8d828e0162000e24565b9950505060408a015196508a607f8b011262000f75578485fd5b62000f7f62001031565b8060608c0160e08d018e81111562000f95578889fd5b885b600481101562000fbf5762000fac8362000d93565b8552938501939185019160010162000f97565b5082995062000fcf8f8262000dab565b98505050505050610140890151925062000fed6101608a0162000d93565b915061018089015190509295985092959890939650565b60408101600884106200102757634e487b7160e01b600052602160045260246000fd5b9281526020015290565b604051608081016001600160401b038111828210171562001056576200105662001140565b60405290565b604051601f8201601f191681016001600160401b038111828210171562001087576200108762001140565b604052919050565b60008219821115620010a557620010a56200112a565b500190565b600082620010c657634e487b7160e01b81526012600452602481fd5b500490565b6000816000190483118215151615620010e857620010e86200112a565b500290565b600181811c908216806200110257607f821691505b602082108114156200112457634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052604160045260246000fd5b61364980620011666000396000f3fe6080604052600436106103395760003560e01c806388bdd9be116101ab578063b62496f5116100f7578063e708a0f911610095578063f27fd2541161006f578063f27fd254146109cd578063f2fde38b146109ed578063f7c618c114610a0d578063ffa1ad7414610a2d57600080fd5b8063e708a0f914610982578063e7841ec014610998578063e98030c7146109ad57600080fd5b8063c492f046116100d1578063c492f046146108e6578063c705c56914610906578063dd62ed3e14610926578063e2f456051461096c57600080fd5b8063b62496f514610881578063bdd4f29f146108b1578063c0246668146108c657600080fd5b8063a26579ad11610164578063a9059cbb1161013e578063a9059cbb146107bc578063ad56c13c146107dc578063adefd90c14610841578063afa4f3b21461086157600080fd5b8063a26579ad14610767578063a457c2d71461077c578063a8b9d2401461079c57600080fd5b806388bdd9be146106c85780638da5cb5b146106e857806395d89b411461070657806398118cb41461071b5780639a7a23d6146107315780639c1b8af51461075157600080fd5b806349bd5a5e1161028557806365b8dbc011610223578063700bb191116101fd578063700bb1911461063d57806370a082311461065d578063715018a614610693578063871c128d146106a857600080fd5b806365b8dbc0146105e75780636843cd84146106075780636b67c4df1461062757600080fd5b80634fbee1931161025f5780634fbee193146105595780635d098b3814610592578063625e764c146105b257806364b0f653146105d257600080fd5b806349bd5a5e146105045780634e71d92d146105245780634ed080c71461053957600080fd5b806323b872dd116102f2578063313ce567116102cc578063313ce5671461048857806331e79db0146104a457806339509351146104c45780634144d9e4146104e457600080fd5b806323b872dd146104335780632c1f52161461045357806330bb4cff1461047357600080fd5b806306fdde0314610345578063095ea7b3146103705780630dcb2e89146103a057806313114a9d146103c25780631694505e146103e657806318160ddd1461041e57600080fd5b3661034057005b600080fd5b34801561035157600080fd5b5061035a610a42565b6040516103679190613396565b60405180910390f35b34801561037c57600080fd5b5061039061038b366004613218565b610ad4565b6040519015158152602001610367565b3480156103ac57600080fd5b506103c06103bb3660046132e0565b610aea565b005b3480156103ce57600080fd5b506103d8600e5481565b604051908152602001610367565b3480156103f257600080fd5b50600654610406906001600160a01b031681565b6040516001600160a01b039091168152602001610367565b34801561042a57600080fd5b506002546103d8565b34801561043f57600080fd5b5061039061044e366004613142565b610b7f565b34801561045f57600080fd5b50600854610406906001600160a01b031681565b34801561047f57600080fd5b506103d8610c29565b34801561049457600080fd5b5060405160128152602001610367565b3480156104b057600080fd5b506103c06104bf3660046130d2565b610cab565b3480156104d057600080fd5b506103906104df366004613218565b610d07565b3480156104f057600080fd5b50600f54610406906001600160a01b031681565b34801561051057600080fd5b50600754610406906001600160a01b031681565b34801561053057600080fd5b506103c0610d43565b34801561054557600080fd5b506103c06105543660046132e0565b610dca565b34801561056557600080fd5b506103906105743660046130d2565b6001600160a01b031660009081526011602052604090205460ff1690565b34801561059e57600080fd5b506103c06105ad3660046130d2565b610e62565b3480156105be57600080fd5b506103c06105cd3660046132e0565b610eae565b3480156105de57600080fd5b506103d8610ef2565b3480156105f357600080fd5b506103c06106023660046130d2565b610f37565b34801561061357600080fd5b506103d86106223660046130d2565b6111d9565b34801561063357600080fd5b506103d8600d5481565b34801561064957600080fd5b506103c06106583660046132e0565b61125e565b34801561066957600080fd5b506103d86106783660046130d2565b6001600160a01b031660009081526020819052604090205490565b34801561069f57600080fd5b506103c0611340565b3480156106b457600080fd5b506103c06106c33660046132e0565b611376565b3480156106d457600080fd5b506103c06106e33660046130d2565b6114d3565b3480156106f457600080fd5b506005546001600160a01b0316610406565b34801561071257600080fd5b5061035a611882565b34801561072757600080fd5b506103d8600c5481565b34801561073d57600080fd5b506103c061074c366004613182565b611891565b34801561075d57600080fd5b506103d860105481565b34801561077357600080fd5b506103d8611966565b34801561078857600080fd5b50610390610797366004613218565b6119ab565b3480156107a857600080fd5b506103d86107b73660046130d2565b611a44565b3480156107c857600080fd5b506103906107d7366004613218565b611a77565b3480156107e857600080fd5b506107fc6107f73660046130d2565b611a84565b604080516001600160a01b0390991689526020890197909752958701949094526060860192909252608085015260a084015260c083015260e082015261010001610367565b34801561084d57600080fd5b506103c061085c3660046132e0565b611b2e565b34801561086d57600080fd5b506103c061087c3660046132e0565b611b72565b34801561088d57600080fd5b5061039061089c3660046130d2565b60126020526000908152604090205460ff1681565b3480156108bd57600080fd5b506103d8611ba1565b3480156108d257600080fd5b506103c06108e1366004613182565b611be6565b3480156108f257600080fd5b506103c0610901366004613243565b611cfc565b34801561091257600080fd5b506103906109213660046130d2565b611de6565b34801561093257600080fd5b506103d861094136600461310a565b6001600160a01b03918216600090815260016020908152604080832093909416825291909152205490565b34801561097857600080fd5b506103d8600a5481565b34801561098e57600080fd5b506103d8600b5481565b3480156109a457600080fd5b506103d8611e64565b3480156109b957600080fd5b506103c06109c83660046132e0565b611ea9565b3480156109d957600080fd5b506107fc6109e83660046132e0565b611f04565b3480156109f957600080fd5b506103c0610a083660046130d2565b611f46565b348015610a1957600080fd5b50600954610406906001600160a01b031681565b348015610a3957600080fd5b506103d8600181565b606060038054610a5190613584565b80601f0160208091040260200160405190810160405280929190818152602001828054610a7d90613584565b8015610aca5780601f10610a9f57610100808354040283529160200191610aca565b820191906000526020600020905b815481529060010190602001808311610aad57829003601f168201915b5050505050905090565b6000610ae13384846120a6565b50600192915050565b6005546001600160a01b03163314610b1d5760405162461bcd60e51b8152600401610b149061342c565b60405180910390fd5b600854604051630dcb2e8960e01b8152600481018390526001600160a01b0390911690630dcb2e89906024015b600060405180830381600087803b158015610b6457600080fd5b505af1158015610b78573d6000803e3d6000fd5b5050505050565b6000610b8c8484846121ca565b6001600160a01b038416600090815260016020908152604080832033845290915290205482811015610c115760405162461bcd60e51b815260206004820152602860248201527f45524332303a207472616e7366657220616d6f756e74206578636565647320616044820152676c6c6f77616e636560c01b6064820152608401610b14565b610c1e85338584036120a6565b506001949350505050565b600854604080516342d359d760e11b815290516000926001600160a01b0316916385a6b3ae916004808301926020929190829003018186803b158015610c6e57600080fd5b505afa158015610c82573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610ca691906132f8565b905090565b6005546001600160a01b03163314610cd55760405162461bcd60e51b8152600401610b149061342c565b60085460405163031e79db60e41b81526001600160a01b038381166004830152909116906331e79db090602401610b4a565b3360008181526001602090815260408083206001600160a01b03871684529091528120549091610ae1918590610d3e908690613516565b6120a6565b60085460405163bc4c4b3760e01b8152336004820152600060248201526001600160a01b039091169063bc4c4b3790604401602060405180830381600087803b158015610d8f57600080fd5b505af1158015610da3573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610dc791906132c4565b50565b6005546001600160a01b03163314610df45760405162461bcd60e51b8152600401610b149061342c565b600b819055600d54600c54610e159190610e0f908490611fde565b90611fde565b600e81905560191015610dc75760405162461bcd60e51b8152602060048201526015602482015274546f74616c20666565206973206f7665722032352560581b6044820152606401610b14565b6005546001600160a01b03163314610e8c5760405162461bcd60e51b8152600401610b149061342c565b600f80546001600160a01b0319166001600160a01b0392909216919091179055565b6005546001600160a01b03163314610ed85760405162461bcd60e51b8152600401610b149061342c565b600d819055600c54600b54610e15918391610e0f91611fde565b600854604080516304ddf6ef60e11b815290516000926001600160a01b0316916309bbedde916004808301926020929190829003018186803b158015610c6e57600080fd5b6005546001600160a01b03163314610f615760405162461bcd60e51b8152600401610b149061342c565b6006546001600160a01b0382811691161415610fd65760405162461bcd60e51b815260206004820152602e60248201527f42414259544f4b454e3a2054686520726f7574657220616c726561647920686160448201526d732074686174206164647265737360901b6064820152608401610b14565b6006546040516001600160a01b03918216918316907f8fc842bbd331dfa973645f4ed48b11683d501ebf1352708d77a5da2ab49a576e90600090a3600680546001600160a01b0319166001600160a01b0383169081179091556040805163c45a015560e01b815290516000929163c45a0155916004808301926020929190829003018186803b15801561106857600080fd5b505afa15801561107c573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906110a091906130ee565b6001600160a01b031663c9c6539630600660009054906101000a90046001600160a01b03166001600160a01b031663ad5c46486040518163ffffffff1660e01b815260040160206040518083038186803b1580156110fd57600080fd5b505afa158015611111573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061113591906130ee565b6040516001600160e01b031960e085901b1681526001600160a01b03928316600482015291166024820152604401602060405180830381600087803b15801561117d57600080fd5b505af1158015611191573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906111b591906130ee565b600780546001600160a01b0319166001600160a01b03929092169190911790555050565b6008546040516370a0823160e01b81526001600160a01b03838116600483015260009216906370a08231906024015b60206040518083038186803b15801561122057600080fd5b505afa158015611234573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061125891906132f8565b92915050565b6008546040516001624d3b8760e01b0319815260048101839052600091829182916001600160a01b03169063ffb2c47990602401606060405180830381600087803b1580156112ac57600080fd5b505af11580156112c0573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906112e49190613310565b604080518481526020810184905290810182905260608101889052929550909350915032906000907fc864333d6121033635ab41b29ae52f10a22cf4438c3e4f1c4c68518feb2f8a98906080015b60405180910390a350505050565b6005546001600160a01b0316331461136a5760405162461bcd60e51b8152600401610b149061342c565b6113746000612627565b565b6005546001600160a01b031633146113a05760405162461bcd60e51b8152600401610b149061342c565b62030d4081101580156113b657506207a1208111155b6114285760405162461bcd60e51b815260206004820152603f60248201527f42414259544f4b454e3a20676173466f7250726f63657373696e67206d75737460448201527f206265206265747765656e203230302c30303020616e64203530302c303030006064820152608401610b14565b6010548114156114a05760405162461bcd60e51b815260206004820152603760248201527f42414259544f4b454e3a2043616e6e6f742075706461746520676173466f725060448201527f726f63657373696e6720746f2073616d652076616c75650000000000000000006064820152608401610b14565b60105460405182907f40d7e40e79af4e8e5a9b3c57030d8ea93f13d669c06d448c4d631d4ae7d23db790600090a3601055565b6005546001600160a01b031633146114fd5760405162461bcd60e51b8152600401610b149061342c565b6008546001600160a01b03828116911614156115815760405162461bcd60e51b815260206004820152603860248201527f42414259544f4b454e3a20546865206469766964656e6420747261636b65722060448201527f616c7265616479206861732074686174206164647265737300000000000000006064820152608401610b14565b6000819050306001600160a01b0316816001600160a01b0316638da5cb5b6040518163ffffffff1660e01b815260040160206040518083038186803b1580156115c957600080fd5b505afa1580156115dd573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061160191906130ee565b6001600160a01b0316146116975760405162461bcd60e51b815260206004820152605160248201527f42414259544f4b454e3a20546865206e6577206469766964656e64207472616360448201527f6b6572206d757374206265206f776e6564206279207468652042414259544f4b6064820152701153881d1bdad95b8818dbdb9d1c9858dd607a1b608482015260a401610b14565b60405163031e79db60e41b81526001600160a01b03821660048201819052906331e79db090602401600060405180830381600087803b1580156116d957600080fd5b505af11580156116ed573d6000803e3d6000fd5b505060405163031e79db60e41b81523060048201526001600160a01b03841692506331e79db09150602401600060405180830381600087803b15801561173257600080fd5b505af1158015611746573d6000803e3d6000fd5b50505050806001600160a01b03166331e79db061176b6005546001600160a01b031690565b6040516001600160e01b031960e084901b1681526001600160a01b039091166004820152602401600060405180830381600087803b1580156117ac57600080fd5b505af11580156117c0573d6000803e3d6000fd5b505060065460405163031e79db60e41b81526001600160a01b03918216600482015290841692506331e79db09150602401600060405180830381600087803b15801561180b57600080fd5b505af115801561181f573d6000803e3d6000fd5b50506008546040516001600160a01b03918216935090851691507f90c7d74461c613da5efa97d90740869367d74ab3aa5837aa4ae9a975f954b7a890600090a3600880546001600160a01b0319166001600160a01b039290921691909117905550565b606060048054610a5190613584565b6005546001600160a01b031633146118bb5760405162461bcd60e51b8152600401610b149061342c565b6007546001600160a01b03838116911614156119585760405162461bcd60e51b815260206004820152605060248201527f42414259544f4b454e3a205468652050616e63616b655377617020706169722060448201527f63616e6e6f742062652072656d6f7665642066726f6d206175746f6d6174656460648201526f4d61726b65744d616b6572506169727360801b608482015260a401610b14565b6119628282612679565b5050565b60085460408051631bc9e27b60e21b815290516000926001600160a01b031691636f2789ec916004808301926020929190829003018186803b158015610c6e57600080fd5b3360009081526001602090815260408083206001600160a01b038616845290915281205482811015611a2d5760405162461bcd60e51b815260206004820152602560248201527f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f77604482015264207a65726f60d81b6064820152608401610b14565b611a3a33858584036120a6565b5060019392505050565b6008546040516302a2e74960e61b81526001600160a01b038381166004830152600092169063a8b9d24090602401611208565b6000610ae13384846121ca565b60085460405163fbcbc0f160e01b81526001600160a01b038381166004830152600092839283928392839283928392839291169063fbcbc0f1906024015b6101006040518083038186803b158015611adb57600080fd5b505afa158015611aef573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611b1391906131af565b97509750975097509750975097509750919395975091939597565b6005546001600160a01b03163314611b585760405162461bcd60e51b8152600401610b149061342c565b600c819055600d54600b54610e159190610e0f9084611fde565b6005546001600160a01b03163314611b9c5760405162461bcd60e51b8152600401610b149061342c565b600a55565b60085460408051632f842d8560e21b815290516000926001600160a01b03169163be10b614916004808301926020929190829003018186803b158015610c6e57600080fd5b6005546001600160a01b03163314611c105760405162461bcd60e51b8152600401610b149061342c565b6001600160a01b03821660009081526011602052604090205460ff1615158115151415611c9d5760405162461bcd60e51b815260206004820152603560248201527f42414259544f4b454e3a204163636f756e7420697320616c7265616479207468604482015274652076616c7565206f6620276578636c756465642760581b6064820152608401610b14565b6001600160a01b038216600081815260116020908152604091829020805460ff191685151590811790915591519182527f9d8f7706ea1113d1a167b526eca956215946dd36cc7df39eb16180222d8b5df7910160405180910390a25050565b6005546001600160a01b03163314611d265760405162461bcd60e51b8152600401610b149061342c565b60005b82811015611da5578160116000868685818110611d5657634e487b7160e01b600052603260045260246000fd5b9050602002016020810190611d6b91906130d2565b6001600160a01b031681526020810191909152604001600020805460ff191691151591909117905580611d9d816135bf565b915050611d29565b507f7fdaf542373fa84f4ee8d662c642f44e4c2276a217d7d29e548b6eb29a233b35838383604051611dd99392919061333d565b60405180910390a1505050565b60085460405163c705c56960e01b81526001600160a01b038381166004830152600092169063c705c5699060240160206040518083038186803b158015611e2c57600080fd5b505afa158015611e40573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061125891906132c4565b6008546040805163039e107b60e61b815290516000926001600160a01b03169163e7841ec0916004808301926020929190829003018186803b158015610c6e57600080fd5b6005546001600160a01b03163314611ed35760405162461bcd60e51b8152600401610b149061342c565b60085460405163e98030c760e01b8152600481018390526001600160a01b039091169063e98030c790602401610b4a565b600854604051635183d6fd60e01b81526004810183905260009182918291829182918291829182916001600160a01b0390911690635183d6fd90602401611ac2565b6005546001600160a01b03163314611f705760405162461bcd60e51b8152600401610b149061342c565b6001600160a01b038116611fd55760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b6064820152608401610b14565b610dc781612627565b6000611fea8284613516565b9392505050565b6000611fea828461354e565b6000611fea828461352e565b6000604051733d602d80600a3d3981f3363d3d373d3d3d363d7360601b81528260601b60148201526e5af43d82803e903d91602b57fd5bf360881b60288201526037816000f09150506001600160a01b0381166120a15760405162461bcd60e51b8152602060048201526016602482015275115490cc4c4d8dce8818dc99585d194819985a5b195960521b6044820152606401610b14565b919050565b6001600160a01b0383166121085760405162461bcd60e51b8152602060048201526024808201527f45524332303a20617070726f76652066726f6d20746865207a65726f206164646044820152637265737360e01b6064820152608401610b14565b6001600160a01b0382166121695760405162461bcd60e51b815260206004820152602260248201527f45524332303a20617070726f766520746f20746865207a65726f206164647265604482015261737360f01b6064820152608401610b14565b6001600160a01b0383811660008181526001602090815260408083209487168084529482529182902085905590518481527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925910160405180910390a3505050565b6001600160a01b0383166121f05760405162461bcd60e51b8152600401610b1490613461565b6001600160a01b0382166122165760405162461bcd60e51b8152600401610b14906133e9565b8061222c57612227838360006127e3565b505050565b30600090815260208190526040902054600a548110801590819061225a5750600754600160a01b900460ff16155b801561227f57506001600160a01b03851660009081526012602052604090205460ff16155b801561229957506005546001600160a01b03868116911614155b80156122b357506005546001600160a01b03858116911614155b15612346576007805460ff60a01b1916600160a01b179055600e54600d546000916122e9916122e3908690611ff1565b90611ffd565b90506122f481612930565b6000612311600e546122e3600c5487611ff190919063ffffffff16565b905061231c81612ac9565b3060009081526020819052604090205461233581612b50565b50506007805460ff60a01b19169055505b6007546001600160a01b03861660009081526011602052604090205460ff600160a01b90920482161591168061239457506001600160a01b03851660009081526011602052604090205460ff165b1561239d575060005b80156124195760006123bf60646122e3600e5488611ff190919063ffffffff16565b6001600160a01b03871660009081526012602052604090205490915060ff1615612400576123f360646122e3876001611ff1565b6123fd9082613516565b90505b61240a8582612d00565b94506124178730836127e3565b505b6124248686866127e3565b6008546001600160a01b031663e30443bc87612455816001600160a01b031660009081526020819052604090205490565b6040516001600160e01b031960e085901b1681526001600160a01b0390921660048301526024820152604401600060405180830381600087803b15801561249b57600080fd5b505af19250505080156124ac575060015b506008546001600160a01b031663e30443bc866124de816001600160a01b031660009081526020819052604090205490565b6040516001600160e01b031960e085901b1681526001600160a01b0390921660048301526024820152604401600060405180830381600087803b15801561252457600080fd5b505af1925050508015612535575060015b50600754600160a01b900460ff1661261f576010546008546040516001624d3b8760e01b03198152600481018390526001600160a01b039091169063ffb2c47990602401606060405180830381600087803b15801561259357600080fd5b505af19250505080156125c3575060408051601f3d908101601f191682019092526125c091810190613310565b60015b6125cc5761261d565b60408051848152602081018490529081018290526060810185905232906001907fc864333d6121033635ab41b29ae52f10a22cf4438c3e4f1c4c68518feb2f8a989060800160405180910390a35050505b505b505050505050565b600580546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b6001600160a01b03821660009081526012602052604090205460ff161515811515141561271a5760405162461bcd60e51b815260206004820152604360248201527f42414259544f4b454e3a204175746f6d61746564206d61726b6574206d616b6560448201527f72207061697220697320616c72656164792073657420746f20746861742076616064820152626c756560e81b608482015260a401610b14565b6001600160a01b0382166000908152601260205260409020805460ff191682158015919091179091556127a75760085460405163031e79db60e41b81526001600160a01b038481166004830152909116906331e79db090602401600060405180830381600087803b15801561278e57600080fd5b505af11580156127a2573d6000803e3d6000fd5b505050505b604051811515906001600160a01b038416907fffa9187bf1f18bf477bd0ea1bcbb64e93b6a98132473929edfce215cd9b16fab90600090a35050565b6001600160a01b0383166128095760405162461bcd60e51b8152600401610b1490613461565b6001600160a01b03821661282f5760405162461bcd60e51b8152600401610b14906133e9565b6001600160a01b038316600090815260208190526040902054818110156128a75760405162461bcd60e51b815260206004820152602660248201527f45524332303a207472616e7366657220616d6f756e7420657863656564732062604482015265616c616e636560d01b6064820152608401610b14565b6001600160a01b038085166000908152602081905260408082208585039055918516815290812080548492906128de908490613516565b92505081905550826001600160a01b0316846001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef8460405161133291815260200190565b50505050565b6009546040516370a0823160e01b81523060048201526000916001600160a01b0316906370a082319060240160206040518083038186803b15801561297457600080fd5b505afa158015612988573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906129ac91906132f8565b90506129b782612d0c565b6009546040516370a0823160e01b8152306004820152600091612a3f9184916001600160a01b0316906370a082319060240160206040518083038186803b158015612a0157600080fd5b505afa158015612a15573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190612a3991906132f8565b90612d00565b600954600f5460405163a9059cbb60e01b81526001600160a01b03918216600482015260248101849052929350169063a9059cbb90604401602060405180830381600087803b158015612a9157600080fd5b505af1158015612aa5573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061292a91906132c4565b6000612ad6826002611ffd565b90506000612ae48383612d00565b905047612af083612eca565b6000612afc4783612d00565b9050612b088382613019565b60408051858152602081018390529081018490527f17bbfb9a6069321b6ded73bd96327c9e6b7212a5cd51ff219cd61370acafb5619060600160405180910390a15050505050565b612b5981612d0c565b6009546040516370a0823160e01b81523060048201526000916001600160a01b0316906370a082319060240160206040518083038186803b158015612b9d57600080fd5b505afa158015612bb1573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190612bd591906132f8565b60095460085460405163a9059cbb60e01b81526001600160a01b0391821660048201526024810184905292935060009291169063a9059cbb90604401602060405180830381600087803b158015612c2b57600080fd5b505af1158015612c3f573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190612c6391906132c4565b905080156122275760085460405163ba72a95560e01b8152600481018490526001600160a01b039091169063ba72a95590602401600060405180830381600087803b158015612cb157600080fd5b505af1158015612cc5573d6000803e3d6000fd5b505060408051868152602081018690527f80195cc573b02cc48460cbca6e6e4cc85ddb91959d946e1c3025ea3d87942dc39350019050611dd9565b6000611fea828461356d565b60408051600380825260808201909252600091602082016060803683370190505090503081600081518110612d5157634e487b7160e01b600052603260045260246000fd5b6001600160a01b03928316602091820292909201810191909152600654604080516315ab88c960e31b81529051919093169263ad5c4648926004808301939192829003018186803b158015612da557600080fd5b505afa158015612db9573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190612ddd91906130ee565b81600181518110612dfe57634e487b7160e01b600052603260045260246000fd5b6001600160a01b039283166020918202929092010152600954825191169082906002908110612e3d57634e487b7160e01b600052603260045260246000fd5b6001600160a01b039283166020918202929092010152600654612e6391309116846120a6565b600654604051635c11d79560e01b81526001600160a01b0390911690635c11d79590612e9c9085906000908690309042906004016134a6565b600060405180830381600087803b158015612eb657600080fd5b505af115801561261f573d6000803e3d6000fd5b6040805160028082526060820183526000926020830190803683370190505090503081600081518110612f0d57634e487b7160e01b600052603260045260246000fd5b6001600160a01b03928316602091820292909201810191909152600654604080516315ab88c960e31b81529051919093169263ad5c4648926004808301939192829003018186803b158015612f6157600080fd5b505afa158015612f75573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190612f9991906130ee565b81600181518110612fba57634e487b7160e01b600052603260045260246000fd5b6001600160a01b039283166020918202929092010152600654612fe091309116846120a6565b60065460405163791ac94760e01b81526001600160a01b039091169063791ac94790612e9c9085906000908690309042906004016134a6565b6006546130319030906001600160a01b0316846120a6565b60065460405163f305d71960e01b8152306004820152602481018490526000604482018190526064820181905260848201524260a48201526001600160a01b039091169063f305d71990839060c4016060604051808303818588803b15801561309957600080fd5b505af11580156130ad573d6000803e3d6000fd5b50505050506040513d601f19601f82011682018060405250810190610b789190613310565b6000602082840312156130e3578081fd5b8135611fea816135f0565b6000602082840312156130ff578081fd5b8151611fea816135f0565b6000806040838503121561311c578081fd5b8235613127816135f0565b91506020830135613137816135f0565b809150509250929050565b600080600060608486031215613156578081fd5b8335613161816135f0565b92506020840135613171816135f0565b929592945050506040919091013590565b60008060408385031215613194578182fd5b823561319f816135f0565b9150602083013561313781613605565b600080600080600080600080610100898b0312156131cb578384fd5b88516131d6816135f0565b809850506020890151965060408901519550606089015194506080890151935060a0890151925060c0890151915060e089015190509295985092959890939650565b6000806040838503121561322a578182fd5b8235613235816135f0565b946020939093013593505050565b600080600060408486031215613257578283fd5b833567ffffffffffffffff8082111561326e578485fd5b818601915086601f830112613281578485fd5b81358181111561328f578586fd5b8760208260051b85010111156132a3578586fd5b602092830195509350508401356132b981613605565b809150509250925092565b6000602082840312156132d5578081fd5b8151611fea81613605565b6000602082840312156132f1578081fd5b5035919050565b600060208284031215613309578081fd5b5051919050565b600080600060608486031215613324578283fd5b8351925060208401519150604084015190509250925092565b6040808252810183905260008460608301825b86811015613380578235613363816135f0565b6001600160a01b0316825260209283019290910190600101613350565b5080925050508215156020830152949350505050565b6000602080835283518082850152825b818110156133c2578581018301518582016040015282016133a6565b818111156133d35783604083870101525b50601f01601f1916929092016040019392505050565b60208082526023908201527f45524332303a207472616e7366657220746f20746865207a65726f206164647260408201526265737360e81b606082015260800190565b6020808252818101527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604082015260600190565b60208082526025908201527f45524332303a207472616e736665722066726f6d20746865207a65726f206164604082015264647265737360d81b606082015260800190565b600060a082018783526020878185015260a0604085015281875180845260c0860191508289019350845b818110156134f55784516001600160a01b0316835293830193918301916001016134d0565b50506001600160a01b03969096166060850152505050608001529392505050565b60008219821115613529576135296135da565b500190565b60008261354957634e487b7160e01b81526012600452602481fd5b500490565b6000816000190483118215151615613568576135686135da565b500290565b60008282101561357f5761357f6135da565b500390565b600181811c9082168061359857607f821691505b602082108114156135b957634e487b7160e01b600052602260045260246000fd5b50919050565b60006000198214156135d3576135d36135da565b5060010190565b634e487b7160e01b600052601160045260246000fd5b6001600160a01b0381168114610dc757600080fd5b8015158114610dc757600080fdfea2646970667358221220ab198a3dbe4eb946635e6e8c2465fdf44d0fb345c212102fa230e3656d5e5e5a64736f6c63430008040033",
	"buyBackBaby": "0x60806040526040516200426a3803806200426a8339810160408190526200002691620007fa565b600080546001600160a01b0319163390811782558152600160208181526040909220805460ff1916909117905588516200006791600291908b019062000659565b5086516200007d9060039060208a019062000659565b506004868155600580546001600160a01b038089166001600160a01b0319928316179092556006805492881692909116821790556040805163c45a015560e01b81529051919263c45a0155928282019260209290829003018186803b158015620000e657600080fd5b505afa158015620000fb573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190620001219190620007bb565b6001600160a01b031663c9c6539630600660009054906101000a90046001600160a01b03166001600160a01b031663ad5c46486040518163ffffffff1660e01b815260040160206040518083038186803b1580156200017f57600080fd5b505afa15801562000194573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190620001ba9190620007bb565b6040516001600160e01b031960e085901b1681526001600160a01b03928316600482015291166024820152604401602060405180830381600087803b1580156200020357600080fd5b505af115801562000218573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906200023e9190620007bb565b600760006101000a8154816001600160a01b0302191690836001600160a01b0316021790555084846040516200027490620006e8565b6001600160a01b03928316815291166020820152604001604051809103906000f080158015620002a8573d6000803e3d6000fd5b50601c80546001600160a01b0319166001600160a01b0392909216919091179055620002d48362000541565b620002f460196010556064601181905560c8601255601355610708601555565b6207a120601d55601e805460ff191660011790556004546200031a90614e2090620009b8565b601f553360008181526023602090815260408083208054600160ff199182168117909255600780546001600160a01b0390811687526024865284872080548416851790553080885285882080548516861790557fc85df64b997460f9ebf6929eca33c1ed2309802ac6ba41eea1e539280d5c25008054851686179055888852602287528588208054909416909417909255600880546001600160a01b031990811689179091556009805490911688179055600454928652602185528386206006548316875285528386208390555416845281842081905584845282805281842081905590519081527fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef910160405180910390a3604051309033907f56358b41df5fa59f5639228f0930994cbdde383c8a8fd74e06c04e1deebe356290620004679060069060019062000908565b60405180910390a36000826001600160a01b0316637022b58e836040518263ffffffff1660e01b81526004016020604051808303818588803b158015620004ad57600080fd5b505af1158015620004c2573d6000803e3d6000fd5b50505050506040513d601f19601f82011682018060405250810190620004e99190620007d8565b905080620005325760405162461bcd60e51b8152602060048201526011602482015270696e76616c6964206665652076616c756560781b60448201526064015b60405180910390fd5b50505050505050505062000a2c565b8051602082015160408301516060840151608085015162000566949392919062000569565b50565b600a859055600b849055600c839055600d829055620005b0826200059c8581898962000644602090811b6200152a17901c565b6200064460201b6200152a1790919060201c565b600e55600f819055620005c5600482620009b8565b600e54106200063d5760405162461bcd60e51b815260206004820152603b60248201527f546f74616c206665652073686f756c64206e6f7420626520677265617465722060448201527f7468616e20312f34206f66206665652064656e6f6d696e61746f720000000000606482015260840162000529565b5050505050565b600062000652828462000993565b9392505050565b8280546200066790620009d9565b90600052602060002090601f0160209004810192826200068b5760008555620006d6565b82601f10620006a657805160ff1916838001178555620006d6565b82800160010185558215620006d6579182015b82811115620006d6578251825591602001919060010190620006b9565b50620006e4929150620006f6565b5090565b611236806200303483390190565b5b80821115620006e45760008155600101620006f7565b80516001600160a01b03811681146200072557600080fd5b919050565b600082601f8301126200073b578081fd5b81516001600160401b0381111562000757576200075762000a16565b60206200076d601f8301601f1916820162000960565b828152858284870101111562000781578384fd5b835b83811015620007a057858101830151828201840152820162000783565b83811115620007b157848385840101525b5095945050505050565b600060208284031215620007cd578081fd5b62000652826200070d565b600060208284031215620007ea578081fd5b8151801515811462000652578182fd5b600080600080600080600080610180898b03121562000817578384fd5b88516001600160401b03808211156200082e578586fd5b6200083c8c838d016200072a565b995060209150818b01518181111562000853578687fd5b620008618d828e016200072a565b9950505060408a015196506200087a60608b016200070d565b95506200088a60808b016200070d565b94508a60bf8b01126200089b578384fd5b620008a562000935565b8060a08c016101408d018e811115620008bc578788fd5b875b6005811015620008dd57825185529385019391850191600101620008be565b50829750620008ec816200070d565b9650505050505061016089015190509295985092959890939650565b60408101600884106200092b57634e487b7160e01b600052602160045260246000fd5b9281526020015290565b60405160a081016001600160401b03811182821017156200095a576200095a62000a16565b60405290565b604051601f8201601f191681016001600160401b03811182821017156200098b576200098b62000a16565b604052919050565b60008219821115620009b357634e487b7160e01b81526011600452602481fd5b500190565b600082620009d457634e487b7160e01b81526012600452602481fd5b500490565b600181811c90821680620009ee57607f821691505b6020821081141562000a1057634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052604160045260246000fd5b6125f88062000a3c6000396000f3fe6080604052600436106103c75760003560e01c806370a08231116101f2578063d51ed1c81161010d578063f1f3bca3116100a0578063f7c618c11161006f578063f7c618c114610b07578063f887ea4014610b27578063fe9fbb8014610b47578063ffa1ad7414610b6757600080fd5b8063f1f3bca314610a87578063f2fde38b14610aa7578063f5cfec0a14610ac7578063f708a64f14610ae757600080fd5b8063e96fada2116100dc578063e96fada214610a01578063ecbf666f14610a21578063eff0dc2214610a37578063f0b37c0414610a6757600080fd5b8063d51ed1c814610966578063d806d12f14610986578063dd62ed3e1461099b578063df20fd49146109e157600080fd5b8063a4b45c0011610185578063b6a5d7de11610154578063b6a5d7de146108f0578063b91854f414610910578063bfe1092814610926578063ca33e64c1461094657600080fd5b8063a4b45c0014610863578063a8aa1b3114610883578063a9059cbb146108bb578063b210b06d146108db57600080fd5b806392258ec8116101c157806392258ec81461080257806395d89b411461081857806398118cb41461082d5780639d1944f51461084357600080fd5b806370a082311461078b57806383ad7994146107c05780638ab6ffc7146107d6578063921250d1146107ec57600080fd5b80632d48e896116102e2578063571ac8b011610275578063658d4b7f11610244578063658d4b7f146107255780636b67c4df146107455780636ddd17131461075b5780636e78eb491461077557600080fd5b8063571ac8b0146106c3578063591cf08d146106e35780635a53c1fb146106f957806360e719621461070f57600080fd5b80633bb8a8d4116102b15780633bb8a8d4146106335780633f4218e01461064d5780634355855a1461067d5780634896a632146106ad57600080fd5b80632d48e896146105b25780632f54bf6e146105d2578063313ce567146106015780633b2d081c1461061d57600080fd5b8063180b0d7e1161035a578063201e799111610329578063201e79911461053d5780632375ce401461055d57806323b872dd1461057d5780632b112e491461059d57600080fd5b8063180b0d7e146104e657806318160ddd146104fc57806319be947b146105115780631df4ccfc1461052757600080fd5b8063095ea7b311610396578063095ea7b3146104605780631023d5d4146104905780631161ae39146104a657806317d43583146104c657600080fd5b80630445b667146103d3578063048c7baf146103fc57806304a66b481461041e57806306fdde031461043e57600080fd5b366103ce57005b600080fd5b3480156103df57600080fd5b506103e9601f5481565b6040519081526020015b60405180910390f35b34801561040857600080fd5b5061041c61041736600461227a565b610b7c565b005b34801561042a57600080fd5b5061041c610439366004612365565b610bd3565b34801561044a57600080fd5b50610453610c0c565b6040516103f39190612417565b34801561046c57600080fd5b5061048061047b36600461221a565b610c9e565b60405190151581526020016103f3565b34801561049c57600080fd5b506103e960155481565b3480156104b257600080fd5b506104806104c13660046122ec565b610d0a565b3480156104d257600080fd5b5061041c6104e13660046121e6565b610d1e565b3480156104f257600080fd5b506103e9600f5481565b34801561050857600080fd5b506004546103e9565b34801561051d57600080fd5b506103e960145481565b34801561053357600080fd5b506103e9600e5481565b34801561054957600080fd5b5061041c6105583660046122ec565b610d6e565b34801561056957600080fd5b5061041c61057836600461230d565b610d9e565b34801561058957600080fd5b506104806105983660046121a6565b610df3565b3480156105a957600080fd5b506103e9610eb7565b3480156105be57600080fd5b5061041c6105cd3660046122ec565b610f27565b3480156105de57600080fd5b506104806105ed366004612136565b6000546001600160a01b0391821691161490565b34801561060d57600080fd5b50604051600981526020016103f3565b34801561062957600080fd5b506103e9600b5481565b34801561063f57600080fd5b506016546104809060ff1681565b34801561065957600080fd5b50610480610668366004612136565b60236020526000908152604090205460ff1681565b34801561068957600080fd5b50610480610698366004612136565b60246020526000908152604090205460ff1681565b3480156106b957600080fd5b506103e960195481565b3480156106cf57600080fd5b506104806106de366004612136565b610fb6565b3480156106ef57600080fd5b506103e960175481565b34801561070557600080fd5b506103e9601a5481565b34801561071b57600080fd5b506103e9601d5481565b34801561073157600080fd5b5061041c6107403660046121e6565b610fca565b34801561075157600080fd5b506103e9600d5481565b34801561076757600080fd5b50601e546104809060ff1681565b34801561078157600080fd5b506103e960185481565b34801561079757600080fd5b506103e96107a6366004612136565b6001600160a01b0316600090815260208052604090205490565b3480156107cc57600080fd5b506103e9600c5481565b3480156107e257600080fd5b506103e960115481565b3480156107f857600080fd5b506103e960125481565b34801561080e57600080fd5b506103e960105481565b34801561082457600080fd5b5061045361101a565b34801561083957600080fd5b506103e9600a5481565b34801561084f57600080fd5b5061041c61085e3660046122b2565b611029565b34801561086f57600080fd5b5061041c61087e36600461216e565b6110a5565b34801561088f57600080fd5b506007546108a3906001600160a01b031681565b6040516001600160a01b0390911681526020016103f3565b3480156108c757600080fd5b506104806108d636600461221a565b6110f8565b3480156108e757600080fd5b5061041c611105565b3480156108fc57600080fd5b5061041c61090b366004612136565b611131565b34801561091c57600080fd5b506103e9601b5481565b34801561093257600080fd5b50601c546108a3906001600160a01b031681565b34801561095257600080fd5b506008546108a3906001600160a01b031681565b34801561097257600080fd5b506103e96109813660046122b2565b611182565b34801561099257600080fd5b506103e96111c5565b3480156109a757600080fd5b506103e96109b636600461216e565b6001600160a01b03918216600090815260216020908152604080832093909416825291909152205490565b3480156109ed57600080fd5b5061041c6109fc36600461225f565b61125e565b348015610a0d57600080fd5b506009546108a3906001600160a01b031681565b348015610a2d57600080fd5b506103e960135481565b348015610a4357600080fd5b50610480610a52366004612136565b60226020526000908152604090205460ff1681565b348015610a7357600080fd5b5061041c610a82366004612136565b61129a565b348015610a9357600080fd5b506103e9610aa2366004612245565b6112e5565b348015610ab357600080fd5b5061041c610ac2366004612136565b6112fd565b348015610ad357600080fd5b5061041c610ae23660046122ca565b611393565b348015610af357600080fd5b5061041c610b023660046121e6565b611409565b348015610b1357600080fd5b506005546108a3906001600160a01b031681565b348015610b3357600080fd5b506006546108a3906001600160a01b031681565b348015610b5357600080fd5b50610480610b62366004612136565b61150c565b348015610b7357600080fd5b506103e9600181565b610b853361150c565b610baa5760405162461bcd60e51b8152600401610ba19061248a565b60405180910390fd5b6016805460ff1916941515949094179093556017919091556000601855601955601a5543601b55565b610bdc3361150c565b610bf85760405162461bcd60e51b8152600401610ba19061248a565b610c058585858585611536565b5050505050565b606060028054610c1b90612559565b80601f0160208091040260200160405190810160405280929190818152602001828054610c4790612559565b8015610c945780601f10610c6957610100808354040283529160200191610c94565b820191906000526020600020905b815481529060010190602001808311610c7757829003601f168201915b5050505050905090565b3360008181526021602090815260408083206001600160a01b038716808552925280832085905551919290917f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92590610cf99086815260200190565b60405180910390a350600192915050565b600082610d1683611182565b119392505050565b610d273361150c565b610d435760405162461bcd60e51b8152600401610ba19061248a565b6001600160a01b03919091166000908152602260205260409020805460ff1916911515919091179055565b610d773361150c565b610d935760405162461bcd60e51b8152600401610ba19061248a565b601091909155601155565b610da73361150c565b610dc35760405162461bcd60e51b8152600401610ba19061248a565b6002610dcf8385612503565b11158015610ddc57508183115b610de557600080fd5b601292909255601355601555565b6004546001600160a01b0384166000908152602160209081526040808320338452909152812054909114610ea2576040805180820182526016815275496e73756666696369656e7420416c6c6f77616e636560501b6020808301919091526001600160a01b0387166000908152602182528381203382529091529190912054610e7d9184906115e9565b6001600160a01b03851660009081526021602090815260408083203384529091529020555b610ead848484611615565b90505b9392505050565b602080527f29ab76e7ca72530a8284597fb76b039d796325740b21528d71ade454c6f2dbe95461dead60009081527fcbaad361c71be11fa6bdbe0e740c6259be964b32182da2da47b54472477c6a17546004549192610f22929091610f1c91906118ff565b906118ff565b905090565b610f303361150c565b610f4c5760405162461bcd60e51b8152600401610ba19061248a565b601c546040516316a4744b60e11b815260048101849052602481018390526001600160a01b0390911690632d48e896906044015b600060405180830381600087803b158015610f9a57600080fd5b505af1158015610fae573d6000803e3d6000fd5b505050505050565b6000610fc482600454610c9e565b92915050565b610fd33361150c565b610fef5760405162461bcd60e51b8152600401610ba19061248a565b6001600160a01b03919091166000908152602360205260409020805460ff1916911515919091179055565b606060038054610c1b90612559565b6110323361150c565b61104e5760405162461bcd60e51b8152600401610ba19061248a565b620b71b081106110a05760405162461bcd60e51b815260206004820152601d60248201527f476173206d757374206265206c6f776572207468616e203735303030300000006044820152606401610ba1565b601d55565b6110ae3361150c565b6110ca5760405162461bcd60e51b8152600401610ba19061248a565b600880546001600160a01b039384166001600160a01b03199182161790915560098054929093169116179055565b6000610eb0338484611615565b61110e3361150c565b61112a5760405162461bcd60e51b8152600401610ba19061248a565b6000601455565b6000546001600160a01b0316331461115b5760405162461bcd60e51b8152600401610ba19061246a565b6001600160a01b03166000908152600160208190526040909120805460ff19169091179055565b6000610fc461118f610eb7565b6007546001600160a01b031660009081526020805260409020546111bf906111b890600261190b565b859061190b565b90611917565b6000426111df60155460145461152a90919063ffffffff16565b111561125757600061120242610f1c60155460145461152a90919063ffffffff16565b90506000611229600e54610f1c6013546111bf601254600e5461190b90919063ffffffff16565b90506112506112476015546111bf858561190b90919063ffffffff16565b600e549061152a565b9250505090565b50600e5490565b6112673361150c565b6112835760405162461bcd60e51b8152600401610ba19061248a565b601e805460ff191692151592909217909155601f55565b6000546001600160a01b031633146112c45760405162461bcd60e51b8152600401610ba19061246a565b6001600160a01b03166000908152600160205260409020805460ff19169055565b600081156112f557610fc46111c5565b5050600e5490565b6000546001600160a01b031633146113275760405162461bcd60e51b8152600401610ba19061246a565b600080546001600160a01b0319166001600160a01b038316908117825580825260016020818152604093849020805460ff191690921790915591519081527f04dba622d284ed0014ee4b9a6a68386be1a4c08a4913ae272de89199cc686163910160405180910390a150565b61139c3361150c565b6113b85760405162461bcd60e51b8152600401610ba19061248a565b6113c48261dead611923565b801561140557426014556015546040519081527f39d2389ec5c1fa77b2c0d374bc61b6d7bd97ccba280fcdeb4e9c7644898d7c3a9060200160405180910390a15b5050565b6114123361150c565b61142e5760405162461bcd60e51b8152600401610ba19061248a565b6001600160a01b038216301480159061145557506007546001600160a01b03838116911614155b61145e57600080fd5b6001600160a01b0382166000908152602460205260409020805460ff191682158015919091179091556114c457601c54604051630a5b654b60e11b81526001600160a01b03848116600483015260006024830152909116906314b6ca9690604401610f80565b601c546001600160a01b03838116600081815260208052604090819020549051630a5b654b60e11b8152600481019290925260248201529116906314b6ca9690604401610f80565b6001600160a01b031660009081526001602052604090205460ff1690565b6000610eb082846124eb565b600a859055600b849055600c839055600d8290556115608261155a8581898961152a565b9061152a565b600e55600f819055611573600482612503565b600e5410610c055760405162461bcd60e51b815260206004820152603b60248201527f546f74616c206665652073686f756c64206e6f7420626520677265617465722060448201527f7468616e20312f34206f66206665652064656e6f6d696e61746f7200000000006064820152608401610ba1565b6000818484111561160d5760405162461bcd60e51b8152600401610ba19190612417565b505050900390565b60255460009060ff16156116355761162e848484611ab7565b9050610eb0565b61163d611b92565b1561164a5761164a611be0565b611652611fd8565b1561165f5761165f612033565b6040805180820182526014815273496e73756666696369656e742042616c616e636560601b6020808301919091526001600160a01b038716600090815290805291909120546116af9184906115e9565b6001600160a01b03851660009081526020808052604080832093909355602390529081205460ff16156116e257826116ed565b6116ed85858561206f565b6001600160a01b0385166000908152602080526040902054909150611712908261152a565b6001600160a01b038086166000908152602080805260408083209490945591881681526024909152205460ff166117b357601c546001600160a01b03868116600081815260208052604090819020549051630a5b654b60e11b8152600481019290925260248201529116906314b6ca9690604401600060405180830381600087803b1580156117a057600080fd5b505af19250505080156117b1575060015b505b6001600160a01b03841660009081526024602052604090205460ff1661184357601c546001600160a01b03858116600081815260208052604090819020549051630a5b654b60e11b8152600481019290925260248201529116906314b6ca9690604401600060405180830381600087803b15801561183057600080fd5b505af1925050508015611841575060015b505b601c54601d546040516001624d3b8760e01b031981526001600160a01b039092169163ffb2c4799161187b9160040190815260200190565b600060405180830381600087803b15801561189557600080fd5b505af19250505080156118a6575060015b50836001600160a01b0316856001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef836040516118ec91815260200190565b60405180910390a3506001949350505050565b6000610eb08284612542565b6000610eb08284612523565b6000610eb08284612503565b6025805460ff191660011790556040805160028082526060820183526000926020830190803683375050600654604080516315ab88c960e31b815290519394506001600160a01b039091169263ad5c464892506004808301926020929190829003018186803b15801561199557600080fd5b505afa1580156119a9573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906119cd9190612152565b816000815181106119ee57634e487b7160e01b600052603260045260246000fd5b60200260200101906001600160a01b031690816001600160a01b0316815250503081600181518110611a3057634e487b7160e01b600052603260045260246000fd5b6001600160a01b03928316602091820292909201015260065460405163b6f9de9560e01b815291169063b6f9de95908590611a76906000908690889042906004016123e2565b6000604051808303818588803b158015611a8f57600080fd5b505af1158015611aa3573d6000803e3d6000fd5b50506025805460ff19169055505050505050565b6040805180820182526014815273496e73756666696369656e742042616c616e636560601b6020808301919091526001600160a01b038616600090815290805291822054611b069184906115e9565b6001600160a01b0380861660009081526020805260408082209390935590851681522054611b34908361152a565b6001600160a01b038481166000818152602080805260409182902094909455518581529092918716917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef910160405180910390a35060019392505050565b6007546000906001600160a01b03163314801590611bb3575060255460ff16155b8015611bc15750601e5460ff165b8015610f22575050601f54306000908152602080526040902054101590565b6025805460ff19166001179055601054601154600091611bff91610d0a565b611c0b57600a54611c0e565b60005b90506000611c3260026111bf600e546111bf86601f5461190b90919063ffffffff16565b90506000611c4b82601f546118ff90919063ffffffff16565b60408051600280825260608201835292935060009290916020830190803683370190505090503081600081518110611c9357634e487b7160e01b600052603260045260246000fd5b6001600160a01b03928316602091820292909201810191909152600654604080516315ab88c960e31b81529051919093169263ad5c4648926004808301939192829003018186803b158015611ce757600080fd5b505afa158015611cfb573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611d1f9190612152565b81600181518110611d4057634e487b7160e01b600052603260045260246000fd5b6001600160a01b03928316602091820292909201015260065460405163791ac94760e01b81524792919091169063791ac94790611d8a9086906000908790309042906004016124af565b600060405180830381600087803b158015611da457600080fd5b505af1158015611db8573d6000803e3d6000fd5b505050506000611dd182476118ff90919063ffffffff16565b90506000611dec611de3886002611917565b600e54906118ff565b90506000611e0160026111bf8481878d61190b565b90506000611e1e836111bf600c548761190b90919063ffffffff16565b90506000611e3b846111bf600d548861190b90919063ffffffff16565b9050601c60009054906101000a90046001600160a01b03166001600160a01b031663d0e30db0836040518263ffffffff1660e01b81526004016000604051808303818588803b158015611e8d57600080fd5b505af193505050508015611e9f575060015b506009546040516001600160a01b039091169082156108fc029083906000818181858888f19350505050158015611eda573d6000803e3d6000fd5b508815611fc25760065460085460405163f305d71960e01b8152306004820152602481018c905260006044820181905260648201526001600160a01b0391821660848201524260a482015291169063f305d71990859060c4016060604051808303818588803b158015611f4c57600080fd5b505af1158015611f60573d6000803e3d6000fd5b50505050506040513d601f19601f82011682018060405250810190611f859190612338565b505060408051858152602081018c90527f424db2872186fa7e7afa7a5e902ed3b49a2ef19c2f5431e672462495dd6b450692500160405180910390a15b50506025805460ff191690555050505050505050565b6007546000906001600160a01b03163314801590611ff9575060255460ff16155b8015612007575060165460ff165b8015612022575043601a54601b5461201f91906124eb565b11155b8015610f2257505060195447101590565b61204160195461dead611923565b43601b556019546018546120549161152a565b6018819055601754101561206d576016805460ff191690555b565b600f5460075460009182916120a191906111bf9061209a906001600160a01b038981169116146112e5565b869061190b565b3060009081526020805260409020549091506120bd908261152a565b3060008181526020808052604091829020939093555183815290916001600160a01b038816917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef910160405180910390a361211883826118ff565b95945050505050565b8035801515811461213157600080fd5b919050565b600060208284031215612147578081fd5b8135610eb0816125aa565b600060208284031215612163578081fd5b8151610eb0816125aa565b60008060408385031215612180578081fd5b823561218b816125aa565b9150602083013561219b816125aa565b809150509250929050565b6000806000606084860312156121ba578081fd5b83356121c5816125aa565b925060208401356121d5816125aa565b929592945050506040919091013590565b600080604083850312156121f8578182fd5b8235612203816125aa565b915061221160208401612121565b90509250929050565b6000806040838503121561222c578182fd5b8235612237816125aa565b946020939093013593505050565b600060208284031215612256578081fd5b610eb082612121565b60008060408385031215612271578182fd5b61223783612121565b6000806000806080858703121561228f578081fd5b61229885612121565b966020860135965060408601359560600135945092505050565b6000602082840312156122c3578081fd5b5035919050565b600080604083850312156122dc578182fd5b8235915061221160208401612121565b600080604083850312156122fe578182fd5b50508035926020909101359150565b600080600060608486031215612321578283fd5b505081359360208301359350604090920135919050565b60008060006060848603121561234c578283fd5b8351925060208401519150604084015190509250925092565b600080600080600060a0868803121561237c578283fd5b505083359560208501359550604085013594606081013594506080013592509050565b6000815180845260208085019450808401835b838110156123d75781516001600160a01b0316875295820195908201906001016123b2565b509495945050505050565b8481526080602082015260006123fb608083018661239f565b6001600160a01b03949094166040830152506060015292915050565b6000602080835283518082850152825b8181101561244357858101830151858201604001528201612427565b818111156124545783604083870101525b50601f01601f1916929092016040019392505050565b60208082526006908201526510a7aba722a960d11b604082015260600190565b6020808252600b908201526a085055551213d49256915160aa1b604082015260600190565b85815284602082015260a0604082015260006124ce60a083018661239f565b6001600160a01b0394909416606083015250608001529392505050565b600082198211156124fe576124fe612594565b500190565b60008261251e57634e487b7160e01b81526012600452602481fd5b500490565b600081600019048311821515161561253d5761253d612594565b500290565b60008282101561255457612554612594565b500390565b600181811c9082168061256d57607f821691505b6020821081141561258e57634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052601160045260246000fd5b6001600160a01b03811681146125bf57600080fd5b5056fea264697066735822122017aadcc13fc1761a8d22906c84c70e586ac764b840f9b3ab89506ed77228770164736f6c6343000804003360806040523480156200001157600080fd5b50604051620012363803806200123683398101604081905262000034916200013f565b60008054336001600160a01b0319918216179091556001805482166001600160a01b0385811691821790925560028054909316918416919091179091556ec097ce7bc90715b34b9f1000000000600b55610e10600c556040805163313ce56760e01b8152905163313ce56791600480820192602092909190829003018186803b158015620000c157600080fd5b505afa158015620000d6573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190620000fc919062000176565b6200010990600a620001e9565b62000116906001620002aa565b600d5550620002e29050565b80516001600160a01b03811681146200013a57600080fd5b919050565b6000806040838503121562000152578182fd5b6200015d8362000122565b91506200016d6020840162000122565b90509250929050565b60006020828403121562000188578081fd5b815160ff8116811462000199578182fd5b9392505050565b600181815b80851115620001e1578160001904821115620001c557620001c5620002cc565b80851615620001d357918102915b93841c9390800290620001a5565b509250929050565b60006200019960ff8416836000826200020557506001620002a4565b816200021457506000620002a4565b81600181146200022d5760028114620002385762000258565b6001915050620002a4565b60ff8411156200024c576200024c620002cc565b50506001821b620002a4565b5060208310610133831016604e8410600b84101617156200027d575081810a620002a4565b620002898383620001a0565b8060001904821115620002a057620002a0620002cc565b0290505b92915050565b6000816000190483118215151615620002c757620002c7620002cc565b500290565b634e487b7160e01b600052601160045260246000fd5b610f4480620002f26000396000f3fe60806040526004361061011f5760003560e01c8063d0e30db0116100a0578063f0fc6bca11610064578063f0fc6bca1461032e578063f7c618c114610343578063f887ea4014610363578063ffb2c47914610383578063ffd49c84146103a357600080fd5b8063d0e30db0146102ad578063d4fda1f2146102b5578063e2d2e219146102e2578063ecd0c0c3146102f8578063efca2eed1461031857600080fd5b80634fab0ae8116100e75780634fab0ae8146101c557806366817df5146101db578063997664d714610208578063ab377daa1461021e578063ce7c2ac21461025657600080fd5b806311ce023d1461012457806314b6ca961461014d57806328fd31981461016f5780632d48e8961461018f5780633a98ef39146101af575b600080fd5b34801561013057600080fd5b5061013a600b5481565b6040519081526020015b60405180910390f35b34801561015957600080fd5b5061016d610168366004610d55565b6103b9565b005b34801561017b57600080fd5b5061013a61018a366004610d1d565b610531565b34801561019b57600080fd5b5061016d6101aa366004610dd0565b6105ba565b3480156101bb57600080fd5b5061013a60075481565b3480156101d157600080fd5b5061013a600d5481565b3480156101e757600080fd5b5061013a6101f6366004610d1d565b60056020526000908152604090205481565b34801561021457600080fd5b5061013a60085481565b34801561022a57600080fd5b5061023e610239366004610da0565b6105dc565b6040516001600160a01b039091168152602001610144565b34801561026257600080fd5b50610292610271366004610d1d565b60066020526000908152604090208054600182015460029092015490919083565b60408051938452602084019290925290820152606001610144565b61016d610606565b3480156102c157600080fd5b5061013a6102d0366004610d1d565b60046020526000908152604090205481565b3480156102ee57600080fd5b5061013a600a5481565b34801561030457600080fd5b5060005461023e906001600160a01b031681565b34801561032457600080fd5b5061013a60095481565b34801561033a57600080fd5b5061016d6108de565b34801561034f57600080fd5b5060015461023e906001600160a01b031681565b34801561036f57600080fd5b5060025461023e906001600160a01b031681565b34801561038f57600080fd5b5061016d61039e366004610da0565b6108e9565b3480156103af57600080fd5b5061013a600c5481565b6000546001600160a01b031633146103d057600080fd5b6001600160a01b038216600090815260066020526040902054156103f7576103f782610a06565b60008111801561041d57506001600160a01b038216600090815260066020526040902054155b1561048357600380546001600160a01b0384166000818152600460205260408120839055600183018455929092527fc2575a0e9e593c00f959f8c92f12db2869c3395a3b0502d05e2516446f71f85b0180546001600160a01b03191690911790556104b6565b801580156104a857506001600160a01b03821660009081526006602052604090205415155b156104b6576104b682610b31565b6001600160a01b0382166000908152600660205260409020546007546104e79183916104e191610c7e565b90610c91565b6007556001600160a01b038216600090815260066020526040902081905561050e81610c9d565b6001600160a01b0390921660009081526006602052604090206001019190915550565b6001600160a01b03811660009081526006602052604081205461055657506000919050565b6001600160a01b03821660009081526006602052604081205461057890610c9d565b6001600160a01b0384166000908152600660205260409020600101549091508082116105a8575060009392505050565b6105b28282610c7e565b949350505050565b6000546001600160a01b031633146105d157600080fd5b600c91909155600d55565b600381815481106105ec57600080fd5b6000918252602090912001546001600160a01b0316905081565b6000546001600160a01b0316331461061d57600080fd5b6001546040516370a0823160e01b81523060048201526000916001600160a01b0316906370a082319060240160206040518083038186803b15801561066157600080fd5b505afa158015610675573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106999190610db8565b60408051600280825260608201835292935060009290916020830190803683375050600254604080516315ab88c960e31b815290519394506001600160a01b039091169263ad5c464892506004808301926020929190829003018186803b15801561070357600080fd5b505afa158015610717573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061073b9190610d39565b8160008151811061075c57634e487b7160e01b600052603260045260246000fd5b6001600160a01b039283166020918202929092010152600180548351921691839190811061079a57634e487b7160e01b600052603260045260246000fd5b6001600160a01b03928316602091820292909201015260025460405163b6f9de9560e01b815291169063b6f9de959034906107e090600090869030904290600401610df1565b6000604051808303818588803b1580156107f957600080fd5b505af115801561080d573d6000803e3d6000fd5b50506001546040516370a0823160e01b81523060048201526000945061089c93508692506001600160a01b03909116906370a082319060240160206040518083038186803b15801561085e57600080fd5b505afa158015610872573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108969190610db8565b90610c7e565b6008549091506108ac9082610c91565b600855600754600b546108d6916108cd916108c79085610cc0565b90610ccc565b600a5490610c91565b600a55505050565b6108e733610a06565b565b6000546001600160a01b0316331461090057600080fd5b6003548061090c575050565b6000805a905060005b848310801561092357508381105b156109fe5783600e5410610937576000600e555b6109776003600e548154811061095d57634e487b7160e01b600052603260045260246000fd5b6000918252602090912001546001600160a01b0316610cd8565b156109bc576109bc6003600e54815481106109a257634e487b7160e01b600052603260045260246000fd5b6000918252602090912001546001600160a01b0316610a06565b6109d16109ca5a8490610c7e565b8490610c91565b92505a600e805491935060006109e683610ec8565b919050555080806109f690610ec8565b915050610915565b505050505b50565b6001600160a01b038116600090815260066020526040902054610a265750565b6000610a3182610531565b90508015610b2d57600954610a469082610c91565b60095560015460405163a9059cbb60e01b81526001600160a01b038481166004830152602482018490529091169063a9059cbb90604401602060405180830381600087803b158015610a9757600080fd5b505af1158015610aab573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610acf9190610d80565b506001600160a01b03821660009081526005602090815260408083204290556006909152902060020154610b039082610c91565b6001600160a01b038316600090815260066020526040902060028101919091555461050e90610c9d565b5050565b60038054610b4190600190610eb1565b81548110610b5f57634e487b7160e01b600052603260045260246000fd5b60009182526020808320909101546001600160a01b0384811684526004909252604090922054600380549290931692918110610bab57634e487b7160e01b600052603260045260246000fd5b600091825260208083209190910180546001600160a01b0319166001600160a01b03948516179055918316815260049182905260408120546003805491939291610bf790600190610eb1565b81548110610c1557634e487b7160e01b600052603260045260246000fd5b60009182526020808320909101546001600160a01b031683528201929092526040019020556003805480610c5957634e487b7160e01b600052603160045260246000fd5b600082815260209020810160001990810180546001600160a01b031916905501905550565b6000610c8a8284610eb1565b9392505050565b6000610c8a8284610e5a565b6000610cba600b546108c7600a5485610cc090919063ffffffff16565b92915050565b6000610c8a8284610e92565b6000610c8a8284610e72565b600c546001600160a01b03821660009081526005602052604081205490914291610d029190610e5a565b108015610cba5750600d54610d1683610531565b1192915050565b600060208284031215610d2e578081fd5b8135610c8a81610ef9565b600060208284031215610d4a578081fd5b8151610c8a81610ef9565b60008060408385031215610d67578081fd5b8235610d7281610ef9565b946020939093013593505050565b600060208284031215610d91578081fd5b81518015158114610c8a578182fd5b600060208284031215610db1578081fd5b5035919050565b600060208284031215610dc9578081fd5b5051919050565b60008060408385031215610de2578182fd5b50508035926020909101359150565b600060808201868352602060808185015281875180845260a0860191508289019350845b81811015610e3a5784516001600160a01b031683529383019391830191600101610e15565b50506001600160a01b039690961660408501525050506060015292915050565b60008219821115610e6d57610e6d610ee3565b500190565b600082610e8d57634e487b7160e01b81526012600452602481fd5b500490565b6000816000190483118215151615610eac57610eac610ee3565b500290565b600082821015610ec357610ec3610ee3565b500390565b6000600019821415610edc57610edc610ee3565b5060010190565b634e487b7160e01b600052601160045260246000fd5b6001600160a01b0381168114610a0357600080fdfea2646970667358221220f00b68d1096aa0cc5f0ed95a31e198d49c5ff672d34813c179585dce90df22b164736f6c63430008040033"
}

