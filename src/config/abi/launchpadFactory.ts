export const launchpadFactoryABI = [
	{
	  inputs: [
		{
		  internalType: "address payable",
		  name: "_feeAddress",
		  type: "address",
		},
		{
		  internalType: "address",
		  name: "_presale",
		  type: "address",
		},
		{
		  internalType: "address",
		  name: "_fairPresale",
		  type: "address",
		},
		{
		  internalType: "address",
		  name: "_locker",
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
		  internalType: "address",
		  name: "launchpad",
		  type: "address",
		},
	  ],
	  name: "NewLaunchpadCreated",
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
	  name: "DEFAULT_MAIN_FEE_OPTION_1",
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
	  name: "DEFAULT_MAIN_FEE_OPTION_2",
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
	  name: "DEFAULT_TOKEN_FEE_OPTION_1",
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
	  name: "DEFAULT_TOKEN_FEE_OPTION_2",
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
	  inputs: [],
	  name: "VESTING_PERCENT_DIVIDOR",
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
	  name: "contributions",
	  outputs: [
		{
		  internalType: "address",
		  name: "addr",
		  type: "address",
		},
		{
		  internalType: "address",
		  name: "owner",
		  type: "address",
		},
		{
		  internalType: "address",
		  name: "token",
		  type: "address",
		},
		{
		  internalType: "uint256",
		  name: "createTime",
		  type: "uint256",
		},
		{
		  internalType: "bool",
		  name: "isLaunchpad",
		  type: "bool",
		},
	  ],
	  stateMutability: "view",
	  type: "function",
	},
	{
	  inputs: [
		{
		  internalType: "uint256[]",
		  name: "_values",
		  type: "uint256[]",
		},
		{
		  internalType: "address[]",
		  name: "_addresses",
		  type: "address[]",
		},
		{
		  internalType: "string[]",
		  name: "_strings",
		  type: "string[]",
		},
		{
		  internalType: "bool[]",
		  name: "options",
		  type: "bool[]",
		},
	  ],
	  name: "createNewFairLaunch",
	  outputs: [
		{
		  internalType: "address",
		  name: "",
		  type: "address",
		},
	  ],
	  stateMutability: "payable",
	  type: "function",
	},
	{
	  inputs: [
		{
		  internalType: "uint256[]",
		  name: "_values",
		  type: "uint256[]",
		},
		{
		  internalType: "address[]",
		  name: "_addresses",
		  type: "address[]",
		},
		{
		  internalType: "string[]",
		  name: "_strings",
		  type: "string[]",
		},
		{
		  internalType: "bool[]",
		  name: "_options",
		  type: "bool[]",
		},
	  ],
	  name: "createNewLaunchpad",
	  outputs: [
		{
		  internalType: "address",
		  name: "",
		  type: "address",
		},
	  ],
	  stateMutability: "payable",
	  type: "function",
	},
	{
	  inputs: [],
	  name: "fairPresale",
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
	  name: "getContributionsLength",
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
	  name: "getLaunchpads",
	  outputs: [
		{
		  components: [
			{
			  internalType: "string",
			  name: "presaleType",
			  type: "string",
			},
			{
			  internalType: "address",
			  name: "addr",
			  type: "address",
			},
			{
			  internalType: "string",
			  name: "logoUrl",
			  type: "string",
			},
			{
			  internalType: "address",
			  name: "token",
			  type: "address",
			},
			{
			  internalType: "address",
			  name: "buyToken",
			  type: "address",
			},
			{
			  internalType: "uint256",
			  name: "total",
			  type: "uint256",
			},
			{
			  internalType: "uint256",
			  name: "rate",
			  type: "uint256",
			},
			{
			  internalType: "uint256",
			  name: "softCap",
			  type: "uint256",
			},
			{
			  internalType: "uint256",
			  name: "hardCap",
			  type: "uint256",
			},
			{
			  internalType: "uint256",
			  name: "maxBuy",
			  type: "uint256",
			},
			{
			  internalType: "uint256",
			  name: "amount",
			  type: "uint256",
			},
			{
			  internalType: "uint256",
			  name: "liquidity",
			  type: "uint256",
			},
			{
			  internalType: "uint256",
			  name: "lockTime",
			  type: "uint256",
			},
			{
			  internalType: "uint256",
			  name: "startTime",
			  type: "uint256",
			},
			{
			  internalType: "uint256",
			  name: "endTime",
			  type: "uint256",
			},
			{
			  internalType: "string",
			  name: "whitelist",
			  type: "string",
			},
			{
			  internalType: "uint256",
			  name: "whiteListEnableTime",
			  type: "uint256",
			},
			{
			  internalType: "bool",
			  name: "refundable",
			  type: "bool",
			},
			{
			  internalType: "bool",
			  name: "claimable",
			  type: "bool",
			},
		  ],
		  internalType: "struct Manager.LaunchpadInfo[]",
		  name: "",
		  type: "tuple[]",
		},
	  ],
	  stateMutability: "view",
	  type: "function",
	},
	{
	  inputs: [
		{
		  internalType: "address",
		  name: "user",
		  type: "address",
		},
	  ],
	  name: "getUserContributionsLength",
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
	  name: "presale",
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
	  inputs: [
		{
		  internalType: "address",
		  name: "",
		  type: "address",
		},
	  ],
	  name: "routers",
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
	  name: "serviceFee",
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
		  name: "_fairPresale",
		  type: "address",
		},
	  ],
	  name: "setFairPresaleAddress",
	  outputs: [],
	  stateMutability: "nonpayable",
	  type: "function",
	},
	{
	  inputs: [
		{
		  internalType: "address payable",
		  name: "_addr",
		  type: "address",
		},
	  ],
	  name: "setFeeAddress",
	  outputs: [],
	  stateMutability: "nonpayable",
	  type: "function",
	},
	{
	  inputs: [
		{
		  internalType: "address",
		  name: "_addr",
		  type: "address",
		},
	  ],
	  name: "setLockerAddress",
	  outputs: [],
	  stateMutability: "nonpayable",
	  type: "function",
	},
	{
	  inputs: [
		{
		  internalType: "address",
		  name: "_presale",
		  type: "address",
		},
	  ],
	  name: "setPresaleAddress",
	  outputs: [],
	  stateMutability: "nonpayable",
	  type: "function",
	},
	{
	  inputs: [
		{
		  internalType: "address",
		  name: "_addr",
		  type: "address",
		},
		{
		  internalType: "bool",
		  name: "_en",
		  type: "bool",
		},
	  ],
	  name: "setRouterAddress",
	  outputs: [],
	  stateMutability: "nonpayable",
	  type: "function",
	},
	{
	  inputs: [
		{
		  internalType: "uint256",
		  name: "_fee",
		  type: "uint256",
		},
	  ],
	  name: "setServiceFee",
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
	  inputs: [
		{
		  internalType: "uint256",
		  name: "mainFee_1",
		  type: "uint256",
		},
		{
		  internalType: "uint256",
		  name: "mainFee_2",
		  type: "uint256",
		},
		{
		  internalType: "uint256",
		  name: "tokenFee_1",
		  type: "uint256",
		},
		{
		  internalType: "uint256",
		  name: "tokenFee_2",
		  type: "uint256",
		},
	  ],
	  name: "updateConfig",
	  outputs: [],
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
		{
		  internalType: "uint256",
		  name: "",
		  type: "uint256",
		},
	  ],
	  name: "userContributions",
	  outputs: [
		{
		  internalType: "address",
		  name: "addr",
		  type: "address",
		},
		{
		  internalType: "address",
		  name: "owner",
		  type: "address",
		},
		{
		  internalType: "address",
		  name: "token",
		  type: "address",
		},
		{
		  internalType: "uint256",
		  name: "createTime",
		  type: "uint256",
		},
		{
		  internalType: "bool",
		  name: "isLaunchpad",
		  type: "bool",
		},
	  ],
	  stateMutability: "view",
	  type: "function",
	},
  ] as const