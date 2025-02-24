export const contributionABI = [
	{
	  inputs: [
		{
		  internalType: "uint256",
		  name: "_id",
		  type: "uint256",
		},
	  ],
	  name: "claim",
	  outputs: [],
	  stateMutability: "nonpayable",
	  type: "function",
	},
	{
	  inputs: [
		{
		  internalType: "address",
		  name: "_token0",
		  type: "address",
		},
		{
		  internalType: "address",
		  name: "_token1",
		  type: "address",
		},
		{
		  internalType: "uint256",
		  name: "_amount0",
		  type: "uint256",
		},
		{
		  internalType: "uint256",
		  name: "_amount1",
		  type: "uint256",
		},
	  ],
	  name: "createNewLock",
	  outputs: [
		{
		  internalType: "uint256",
		  name: "id",
		  type: "uint256",
		},
	  ],
	  stateMutability: "nonpayable",
	  type: "function",
	},
	{
	  inputs: [
		{
		  internalType: "address",
		  name: "_smartRouter",
		  type: "address",
		},
		{
		  internalType: "address",
		  name: "_team",
		  type: "address",
		},
		{
		  internalType: "address",
		  name: "_WETH",
		  type: "address",
		},
		{
		  internalType: "address",
		  name: "_resource",
		  type: "address",
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
		  name: "user",
		  type: "address",
		},
		{
		  indexed: true,
		  internalType: "uint256",
		  name: "id",
		  type: "uint256",
		},
		{
		  indexed: false,
		  internalType: "uint256",
		  name: "amount",
		  type: "uint256",
		},
	  ],
	  name: "Claim",
	  type: "event",
	},
	{
	  inputs: [
		{
		  internalType: "address",
		  name: "_token",
		  type: "address",
		},
		{
		  internalType: "uint256",
		  name: "_amount",
		  type: "uint256",
		},
	  ],
	  name: "createNewLockWithETH",
	  outputs: [
		{
		  internalType: "uint256",
		  name: "id",
		  type: "uint256",
		},
	  ],
	  stateMutability: "payable",
	  type: "function",
	},
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
		  indexed: true,
		  internalType: "uint256",
		  name: "id",
		  type: "uint256",
		},
		{
		  indexed: false,
		  internalType: "uint256",
		  name: "amount",
		  type: "uint256",
		},
	  ],
	  name: "Lock",
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
	  inputs: [],
	  name: "renounceOwnership",
	  outputs: [],
	  stateMutability: "nonpayable",
	  type: "function",
	},
	{
	  inputs: [
		{
		  internalType: "address",
		  name: "_pair",
		  type: "address",
		},
		{
		  internalType: "bool",
		  name: "_set",
		  type: "bool",
		},
	  ],
	  name: "setavailablePairs",
	  outputs: [],
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
	  anonymous: false,
	  inputs: [
		{
		  indexed: true,
		  internalType: "address",
		  name: "user",
		  type: "address",
		},
		{
		  indexed: true,
		  internalType: "uint256",
		  name: "id",
		  type: "uint256",
		},
		{
		  indexed: false,
		  internalType: "uint256",
		  name: "amount",
		  type: "uint256",
		},
	  ],
	  name: "Unlock",
	  type: "event",
	},
	{
	  inputs: [
		{
		  internalType: "uint256",
		  name: "_id",
		  type: "uint256",
		},
		{
		  internalType: "uint256",
		  name: "_amount",
		  type: "uint256",
		},
	  ],
	  name: "unlockLiquidity",
	  outputs: [],
	  stateMutability: "nonpayable",
	  type: "function",
	},
	{
	  inputs: [
		{
		  internalType: "uint256",
		  name: "_id",
		  type: "uint256",
		},
		{
		  internalType: "uint256",
		  name: "_amount",
		  type: "uint256",
		},
	  ],
	  name: "unlockLiquidityETH",
	  outputs: [],
	  stateMutability: "nonpayable",
	  type: "function",
	},
	{
	  stateMutability: "payable",
	  type: "receive",
	},
	{
	  inputs: [
		{
		  internalType: "address",
		  name: "",
		  type: "address",
		},
	  ],
	  name: "availablePairs",
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
		  name: "_id",
		  type: "uint256",
		},
	  ],
	  name: "calculateUnlockInformation",
	  outputs: [
		{
		  internalType: "uint256",
		  name: "withdrawableAmount",
		  type: "uint256",
		},
		{
		  internalType: "uint256",
		  name: "penaltyFee",
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
		  name: "_id",
		  type: "uint256",
		},
	  ],
	  name: "getContributionById",
	  outputs: [
		{
		  internalType: "uint256",
		  name: "contribution",
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
	  name: "getContributionByUser",
	  outputs: [
		{
		  internalType: "uint256",
		  name: "contribution",
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
	  name: "getLockIdsOfUser",
	  outputs: [
		{
		  internalType: "uint256[]",
		  name: "",
		  type: "uint256[]",
		},
	  ],
	  stateMutability: "view",
	  type: "function",
	},
	{
	  inputs: [],
	  name: "getTotalContrubution",
	  outputs: [
		{
		  internalType: "uint256",
		  name: "contribution",
		  type: "uint256",
		},
	  ],
	  stateMutability: "view",
	  type: "function",
	},
	{
	  inputs: [],
	  name: "getTotalLockCount",
	  outputs: [
		{
		  internalType: "uint256",
		  name: "length",
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
	  name: "lockInfo",
	  outputs: [
		{
		  internalType: "uint256",
		  name: "id",
		  type: "uint256",
		},
		{
		  internalType: "address",
		  name: "pair",
		  type: "address",
		},
		{
		  internalType: "address",
		  name: "owner",
		  type: "address",
		},
		{
		  internalType: "uint256",
		  name: "locked",
		  type: "uint256",
		},
		{
		  internalType: "uint256",
		  name: "lockDate",
		  type: "uint256",
		},
		{
		  internalType: "uint256",
		  name: "vested",
		  type: "uint256",
		},
		{
		  internalType: "bool",
		  name: "claimed",
		  type: "bool",
		},
	  ],
	  stateMutability: "view",
	  type: "function",
	},
	{
	  inputs: [],
	  name: "minimumContributed",
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
	  name: "resource",
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
	  name: "SECONDS_OF_3_MONTHES",
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
	  name: "SECONDS_OF_6_MONTHES",
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
	  name: "SECONDS_OF_9_MONTHES",
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
	  name: "SECONDS_OF_YEAR",
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
	  name: "smartRouter",
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
	  name: "team",
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
	  name: "WETH",
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
  ] as const