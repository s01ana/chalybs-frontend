export const smartRouterABI = [
	{
	  inputs: [
		{
		  internalType: "address",
		  name: "_router",
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
		{
		  internalType: "address",
		  name: "_user",
		  type: "address",
		},
	  ],
	  name: "addLiquidity",
	  outputs: [
		{
		  internalType: "uint256",
		  name: "amountA",
		  type: "uint256",
		},
		{
		  internalType: "uint256",
		  name: "amountB",
		  type: "uint256",
		},
		{
		  internalType: "uint256",
		  name: "liquidity",
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
		  name: "_token",
		  type: "address",
		},
		{
		  internalType: "uint256",
		  name: "_amount",
		  type: "uint256",
		},
		{
		  internalType: "address",
		  name: "_user",
		  type: "address",
		},
	  ],
	  name: "addLiquidityETH",
	  outputs: [
		{
		  internalType: "uint256",
		  name: "amountToken",
		  type: "uint256",
		},
		{
		  internalType: "uint256",
		  name: "amountETH",
		  type: "uint256",
		},
		{
		  internalType: "uint256",
		  name: "liquidity",
		  type: "uint256",
		},
	  ],
	  stateMutability: "payable",
	  type: "function",
	},
	{
	  inputs: [],
	  name: "factory",
	  outputs: [
		{
		  internalType: "address",
		  name: "_factory",
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
	  inputs: [
		{
		  internalType: "address",
		  name: "_pair",
		  type: "address",
		},
		{
		  internalType: "uint256",
		  name: "_amount",
		  type: "uint256",
		},
		{
		  internalType: "address",
		  name: "_user",
		  type: "address",
		},
	  ],
	  name: "removeLiquidity",
	  outputs: [
		{
		  internalType: "uint256",
		  name: "amountA",
		  type: "uint256",
		},
		{
		  internalType: "uint256",
		  name: "amountB",
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
		  name: "_pair",
		  type: "address",
		},
		{
		  internalType: "uint256",
		  name: "_amount",
		  type: "uint256",
		},
		{
		  internalType: "address",
		  name: "_user",
		  type: "address",
		},
	  ],
	  name: "removeLiquidityETH",
	  outputs: [
		{
		  internalType: "uint256",
		  name: "amountA",
		  type: "uint256",
		},
		{
		  internalType: "uint256",
		  name: "amountB",
		  type: "uint256",
		},
	  ],
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
	  inputs: [
		{
		  internalType: "address",
		  name: "_router",
		  type: "address",
		},
	  ],
	  name: "setRouter",
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
		  name: "_oracle",
		  type: "address",
		},
	  ],
	  name: "setTokenPriceOracle",
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
	  ],
	  name: "tokenPrice",
	  outputs: [
		{
		  internalType: "uint256",
		  name: "decimals",
		  type: "uint256",
		},
		{
		  internalType: "int256",
		  name: "price",
		  type: "int256",
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
	  name: "tokenPriceOracle",
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
	  stateMutability: "payable",
	  type: "receive",
	},
  ] as const