export const launchpadABI = [
	{
	  anonymous: false,
	  inputs: [
		{
		  indexed: true,
		  internalType: "address",
		  name: "user",
		  type: "address",
		},
		{
		  indexed: false,
		  internalType: "uint256",
		  name: "amount",
		  type: "uint256",
		},
	  ],
	  name: "Deposited",
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
		  name: "token",
		  type: "address",
		},
		{
		  indexed: false,
		  internalType: "uint256",
		  name: "amount",
		  type: "uint256",
		},
	  ],
	  name: "Recovered",
	  type: "event",
	},
	{
	  inputs: [],
	  name: "FEE_PERCENT_DIVIDOR",
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
		  internalType: "address[]",
		  name: "accounts",
		  type: "address[]",
		},
	  ],
	  name: "addWhiteList",
	  outputs: [],
	  stateMutability: "nonpayable",
	  type: "function",
	},
	{
	  inputs: [],
	  name: "buyToken",
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
	  name: "buyToken_decimals",
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
	  name: "cancel",
	  outputs: [],
	  stateMutability: "nonpayable",
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
	  name: "claimable",
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
	  name: "claimed",
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
		  name: "amount",
		  type: "uint256",
		},
	  ],
	  name: "contribute",
	  outputs: [],
	  stateMutability: "nonpayable",
	  type: "function",
	},
	{
	  inputs: [],
	  name: "contribute",
	  outputs: [],
	  stateMutability: "payable",
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
	  name: "deposits",
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
	  name: "disableWhiteList",
	  outputs: [],
	  stateMutability: "nonpayable",
	  type: "function",
	},
	{
	  inputs: [],
	  name: "discord",
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
	  name: "emergencyWithdraw",
	  outputs: [],
	  stateMutability: "nonpayable",
	  type: "function",
	},
	{
	  inputs: [
		{
		  internalType: "uint256",
		  name: "_timeStamp",
		  type: "uint256",
		},
	  ],
	  name: "enableWhiteList",
	  outputs: [],
	  stateMutability: "nonpayable",
	  type: "function",
	},
	{
	  inputs: [],
	  name: "endInit",
	  outputs: [],
	  stateMutability: "nonpayable",
	  type: "function",
	},
	{
	  inputs: [],
	  name: "facebook",
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
	  name: "feeAddress",
	  outputs: [
		{
		  internalType: "address payable",
		  name: "",
		  type: "address",
		},
	  ],
	  stateMutability: "view",
	  type: "function",
	},
	{
	  inputs: [],
	  name: "finalize",
	  outputs: [],
	  stateMutability: "nonpayable",
	  type: "function",
	},
	{
	  inputs: [],
	  name: "getDepositAmount",
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
	  name: "getLeftTimeAmount",
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
		  name: "_user",
		  type: "address",
		},
	  ],
	  name: "getVestedAmount",
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
	  name: "getWhiteListLength",
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
		  name: "size",
		  type: "uint256",
		},
		{
		  internalType: "uint256",
		  name: "cursor",
		  type: "uint256",
		},
	  ],
	  name: "getWhiteLists",
	  outputs: [
		{
		  internalType: "address[]",
		  name: "",
		  type: "address[]",
		},
	  ],
	  stateMutability: "view",
	  type: "function",
	},
	{
	  inputs: [],
	  name: "github",
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
	  name: "hardCap",
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
	  name: "info",
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
	  name: "initOwner",
	  outputs: [],
	  stateMutability: "nonpayable",
	  type: "function",
	},
	{
	  inputs: [
		{
		  internalType: "uint256",
		  name: "_listingRate",
		  type: "uint256",
		},
		{
		  internalType: "uint256",
		  name: "_lockPeriod",
		  type: "uint256",
		},
		{
		  internalType: "uint256",
		  name: "_mainFee",
		  type: "uint256",
		},
		{
		  internalType: "uint256",
		  name: "_tokenFee",
		  type: "uint256",
		},
		{
		  internalType: "uint256",
		  name: "_liquidity",
		  type: "uint256",
		},
		{
		  internalType: "address",
		  name: "_router",
		  type: "address",
		},
		{
		  internalType: "address",
		  name: "_locker",
		  type: "address",
		},
		{
		  internalType: "address payable",
		  name: "_feeAddress",
		  type: "address",
		},
		{
		  internalType: "address",
		  name: "_tokenBackAddress",
		  type: "address",
		},
	  ],
	  name: "initializeLock",
	  outputs: [],
	  stateMutability: "nonpayable",
	  type: "function",
	},
	{
	  inputs: [
		{
		  internalType: "address",
		  name: "_token",
		  type: "address",
		},
		{
		  internalType: "address",
		  name: "_buyToken",
		  type: "address",
		},
		{
		  internalType: "uint256",
		  name: "_presaleStartTimestamp",
		  type: "uint256",
		},
		{
		  internalType: "uint256",
		  name: "_presaleEndTimestamp",
		  type: "uint256",
		},
		{
		  internalType: "uint256",
		  name: "_softCap",
		  type: "uint256",
		},
		{
		  internalType: "uint256",
		  name: "_hardCap",
		  type: "uint256",
		},
		{
		  internalType: "uint256",
		  name: "_minBuy",
		  type: "uint256",
		},
		{
		  internalType: "uint256",
		  name: "_maxBuy",
		  type: "uint256",
		},
		{
		  internalType: "uint256",
		  name: "_rate",
		  type: "uint256",
		},
	  ],
	  name: "initializePresale",
	  outputs: [],
	  stateMutability: "nonpayable",
	  type: "function",
	},
	{
	  inputs: [],
	  name: "initialized",
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
	  name: "instagram",
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
	  name: "investors",
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
	  name: "isLive",
	  outputs: [
		{
		  internalType: "bool",
		  name: "live",
		  type: "bool",
		},
	  ],
	  stateMutability: "view",
	  type: "function",
	},
	{
	  inputs: [],
	  name: "liquidity",
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
	  name: "listingRate",
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
	  name: "lockPeriod",
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
	  name: "locker",
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
	  name: "logoUrl",
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
	  name: "mainFee",
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
	  name: "maxBuy",
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
	  name: "minBuy",
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
	  name: "presaleEndTimestamp",
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
	  name: "presaleStartTimestamp",
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
	  name: "presaleType",
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
	  name: "rate",
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
	  name: "reddit",
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
	  name: "refundable",
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
		  internalType: "address[]",
		  name: "accounts",
		  type: "address[]",
		},
	  ],
	  name: "removeWhiteList",
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
	  name: "router",
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
	  name: "softCap",
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
	  name: "telegram",
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
	  name: "token",
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
	  name: "tokenBackAddress",
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
	  name: "tokenFee",
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
	  name: "total",
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
	  name: "totalClaimedAmount",
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
	  name: "totalDepositedBalance",
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
	  name: "twitter",
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
		  internalType: "string[]",
		  name: "strings",
		  type: "string[]",
		},
	  ],
	  name: "updateInfo",
	  outputs: [],
	  stateMutability: "nonpayable",
	  type: "function",
	},
	{
	  inputs: [],
	  name: "website",
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
		  internalType: "address",
		  name: "",
		  type: "address",
		},
	  ],
	  name: "whiteList",
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
	  name: "whiteListEnableTime",
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
		  name: "",
		  type: "uint256",
		},
	  ],
	  name: "whiteLists",
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
	  name: "whitelist",
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
	  name: "withdrawContribute",
	  outputs: [],
	  stateMutability: "nonpayable",
	  type: "function",
	},
	{
	  inputs: [],
	  name: "youtube",
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
  ] as const