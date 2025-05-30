export const lockerABI = [
	{
	  inputs: [
		{
		  internalType: "uint256",
		  name: "lockId",
		  type: "uint256",
		},
		{
		  internalType: "uint256",
		  name: "newAmount",
		  type: "uint256",
		},
		{
		  internalType: "uint256",
		  name: "newUnlockDate",
		  type: "uint256",
		},
	  ],
	  name: "editLock",
	  outputs: [],
	  stateMutability: "nonpayable",
	  type: "function",
	},
	{
	  inputs: [
		{
		  internalType: "uint256",
		  name: "lockId",
		  type: "uint256",
		},
		{
		  internalType: "string",
		  name: "description",
		  type: "string",
		},
	  ],
	  name: "editLockDescription",
	  outputs: [],
	  stateMutability: "nonpayable",
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
		  name: "token",
		  type: "address",
		},
		{
		  internalType: "bool",
		  name: "isLpToken",
		  type: "bool",
		},
		{
		  internalType: "uint256",
		  name: "amount",
		  type: "uint256",
		},
		{
		  internalType: "uint256",
		  name: "unlockDate",
		  type: "uint256",
		},
		{
		  internalType: "string",
		  name: "description",
		  type: "string",
		},
	  ],
	  name: "lock",
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
	  anonymous: false,
	  inputs: [
		{
		  indexed: true,
		  internalType: "uint256",
		  name: "id",
		  type: "uint256",
		},
		{
		  indexed: false,
		  internalType: "address",
		  name: "token",
		  type: "address",
		},
		{
		  indexed: false,
		  internalType: "address",
		  name: "owner",
		  type: "address",
		},
		{
		  indexed: false,
		  internalType: "uint256",
		  name: "amount",
		  type: "uint256",
		},
		{
		  indexed: false,
		  internalType: "uint256",
		  name: "unlockDate",
		  type: "uint256",
		},
	  ],
	  name: "LockAdded",
	  type: "event",
	},
	{
	  anonymous: false,
	  inputs: [
		{
		  indexed: false,
		  internalType: "uint256",
		  name: "lockId",
		  type: "uint256",
		},
	  ],
	  name: "LockDescriptionChanged",
	  type: "event",
	},
	{
	  anonymous: false,
	  inputs: [
		{
		  indexed: false,
		  internalType: "uint256",
		  name: "lockId",
		  type: "uint256",
		},
		{
		  indexed: false,
		  internalType: "address",
		  name: "owner",
		  type: "address",
		},
		{
		  indexed: false,
		  internalType: "address",
		  name: "newOwner",
		  type: "address",
		},
	  ],
	  name: "LockOwnerChanged",
	  type: "event",
	},
	{
	  anonymous: false,
	  inputs: [
		{
		  indexed: true,
		  internalType: "uint256",
		  name: "id",
		  type: "uint256",
		},
		{
		  indexed: false,
		  internalType: "address",
		  name: "token",
		  type: "address",
		},
		{
		  indexed: false,
		  internalType: "address",
		  name: "owner",
		  type: "address",
		},
		{
		  indexed: false,
		  internalType: "uint256",
		  name: "amount",
		  type: "uint256",
		},
		{
		  indexed: false,
		  internalType: "uint256",
		  name: "unlockedAt",
		  type: "uint256",
		},
	  ],
	  name: "LockRemoved",
	  type: "event",
	},
	{
	  anonymous: false,
	  inputs: [
		{
		  indexed: true,
		  internalType: "uint256",
		  name: "id",
		  type: "uint256",
		},
		{
		  indexed: false,
		  internalType: "address",
		  name: "token",
		  type: "address",
		},
		{
		  indexed: false,
		  internalType: "address",
		  name: "owner",
		  type: "address",
		},
		{
		  indexed: false,
		  internalType: "uint256",
		  name: "newAmount",
		  type: "uint256",
		},
		{
		  indexed: false,
		  internalType: "uint256",
		  name: "newUnlockDate",
		  type: "uint256",
		},
	  ],
	  name: "LockUpdated",
	  type: "event",
	},
	{
	  anonymous: false,
	  inputs: [
		{
		  indexed: true,
		  internalType: "uint256",
		  name: "id",
		  type: "uint256",
		},
		{
		  indexed: false,
		  internalType: "address",
		  name: "token",
		  type: "address",
		},
		{
		  indexed: false,
		  internalType: "address",
		  name: "owner",
		  type: "address",
		},
		{
		  indexed: false,
		  internalType: "uint256",
		  name: "amount",
		  type: "uint256",
		},
		{
		  indexed: false,
		  internalType: "uint256",
		  name: "total",
		  type: "uint256",
		},
		{
		  indexed: false,
		  internalType: "uint256",
		  name: "timestamp",
		  type: "uint256",
		},
	  ],
	  name: "LockVested",
	  type: "event",
	},
	{
	  inputs: [
		{
		  internalType: "address[]",
		  name: "owners",
		  type: "address[]",
		},
		{
		  internalType: "uint256[]",
		  name: "amounts",
		  type: "uint256[]",
		},
		{
		  internalType: "address",
		  name: "token",
		  type: "address",
		},
		{
		  internalType: "bool",
		  name: "isLpToken",
		  type: "bool",
		},
		{
		  internalType: "uint256",
		  name: "tgeDate",
		  type: "uint256",
		},
		{
		  internalType: "uint256",
		  name: "tgeBps",
		  type: "uint256",
		},
		{
		  internalType: "uint256",
		  name: "cycle",
		  type: "uint256",
		},
		{
		  internalType: "uint256",
		  name: "cycleBps",
		  type: "uint256",
		},
		{
		  internalType: "string",
		  name: "description",
		  type: "string",
		},
	  ],
	  name: "multipleVestingLock",
	  outputs: [
		{
		  internalType: "uint256[]",
		  name: "",
		  type: "uint256[]",
		},
	  ],
	  stateMutability: "nonpayable",
	  type: "function",
	},
	{
	  anonymous: false,
	  inputs: [
		{
		  indexed: false,
		  internalType: "address",
		  name: "account",
		  type: "address",
		},
	  ],
	  name: "Paused",
	  type: "event",
	},
	{
	  inputs: [
		{
		  internalType: "uint256",
		  name: "lockId",
		  type: "uint256",
		},
	  ],
	  name: "renounceLockOwnership",
	  outputs: [],
	  stateMutability: "nonpayable",
	  type: "function",
	},
	{
	  inputs: [
		{
		  internalType: "uint256",
		  name: "lockId",
		  type: "uint256",
		},
		{
		  internalType: "address",
		  name: "newOwner",
		  type: "address",
		},
	  ],
	  name: "transferLockOwnership",
	  outputs: [],
	  stateMutability: "nonpayable",
	  type: "function",
	},
	{
	  inputs: [
		{
		  internalType: "uint256",
		  name: "lockId",
		  type: "uint256",
		},
	  ],
	  name: "unlock",
	  outputs: [],
	  stateMutability: "nonpayable",
	  type: "function",
	},
	{
	  anonymous: false,
	  inputs: [
		{
		  indexed: false,
		  internalType: "address",
		  name: "account",
		  type: "address",
		},
	  ],
	  name: "Unpaused",
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
		  name: "token",
		  type: "address",
		},
		{
		  internalType: "bool",
		  name: "isLpToken",
		  type: "bool",
		},
		{
		  internalType: "uint256",
		  name: "amount",
		  type: "uint256",
		},
		{
		  internalType: "uint256",
		  name: "tgeDate",
		  type: "uint256",
		},
		{
		  internalType: "uint256",
		  name: "tgeBps",
		  type: "uint256",
		},
		{
		  internalType: "uint256",
		  name: "cycle",
		  type: "uint256",
		},
		{
		  internalType: "uint256",
		  name: "cycleBps",
		  type: "uint256",
		},
		{
		  internalType: "string",
		  name: "description",
		  type: "string",
		},
	  ],
	  name: "vestingLock",
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
	  inputs: [],
	  name: "allLpTokenLockedCount",
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
	  name: "allNormalTokenLockedCount",
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
	  name: "cumulativeLockInfo",
	  outputs: [
		{
		  internalType: "address",
		  name: "token",
		  type: "address",
		},
		{
		  internalType: "address",
		  name: "factory",
		  type: "address",
		},
		{
		  internalType: "uint256",
		  name: "amount",
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
		  name: "start",
		  type: "uint256",
		},
		{
		  internalType: "uint256",
		  name: "end",
		  type: "uint256",
		},
	  ],
	  name: "getCumulativeLpTokenLockInfo",
	  outputs: [
		{
		  components: [
			{
			  internalType: "address",
			  name: "token",
			  type: "address",
			},
			{
			  internalType: "address",
			  name: "factory",
			  type: "address",
			},
			{
			  internalType: "uint256",
			  name: "amount",
			  type: "uint256",
			},
		  ],
		  internalType: "struct TokenLock.CumulativeLockInfo[]",
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
		  internalType: "uint256",
		  name: "index",
		  type: "uint256",
		},
	  ],
	  name: "getCumulativeLpTokenLockInfoAt",
	  outputs: [
		{
		  components: [
			{
			  internalType: "address",
			  name: "token",
			  type: "address",
			},
			{
			  internalType: "address",
			  name: "factory",
			  type: "address",
			},
			{
			  internalType: "uint256",
			  name: "amount",
			  type: "uint256",
			},
		  ],
		  internalType: "struct TokenLock.CumulativeLockInfo",
		  name: "",
		  type: "tuple",
		},
	  ],
	  stateMutability: "view",
	  type: "function",
	},
	{
	  inputs: [
		{
		  internalType: "uint256",
		  name: "start",
		  type: "uint256",
		},
		{
		  internalType: "uint256",
		  name: "end",
		  type: "uint256",
		},
	  ],
	  name: "getCumulativeNormalTokenLockInfo",
	  outputs: [
		{
		  components: [
			{
			  internalType: "address",
			  name: "token",
			  type: "address",
			},
			{
			  internalType: "address",
			  name: "factory",
			  type: "address",
			},
			{
			  internalType: "uint256",
			  name: "amount",
			  type: "uint256",
			},
		  ],
		  internalType: "struct TokenLock.CumulativeLockInfo[]",
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
		  internalType: "uint256",
		  name: "index",
		  type: "uint256",
		},
	  ],
	  name: "getCumulativeNormalTokenLockInfoAt",
	  outputs: [
		{
		  components: [
			{
			  internalType: "address",
			  name: "token",
			  type: "address",
			},
			{
			  internalType: "address",
			  name: "factory",
			  type: "address",
			},
			{
			  internalType: "uint256",
			  name: "amount",
			  type: "uint256",
			},
		  ],
		  internalType: "struct TokenLock.CumulativeLockInfo",
		  name: "",
		  type: "tuple",
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
	  name: "getLockAt",
	  outputs: [
		{
		  components: [
			{
			  internalType: "uint256",
			  name: "id",
			  type: "uint256",
			},
			{
			  internalType: "address",
			  name: "token",
			  type: "address",
			},
			{
			  internalType: "address",
			  name: "owner",
			  type: "address",
			},
			{
			  internalType: "uint256",
			  name: "amount",
			  type: "uint256",
			},
			{
			  internalType: "uint256",
			  name: "lockDate",
			  type: "uint256",
			},
			{
			  internalType: "uint256",
			  name: "tgeDate",
			  type: "uint256",
			},
			{
			  internalType: "uint256",
			  name: "tgeBps",
			  type: "uint256",
			},
			{
			  internalType: "uint256",
			  name: "cycle",
			  type: "uint256",
			},
			{
			  internalType: "uint256",
			  name: "cycleBps",
			  type: "uint256",
			},
			{
			  internalType: "uint256",
			  name: "unlockedAmount",
			  type: "uint256",
			},
			{
			  internalType: "string",
			  name: "description",
			  type: "string",
			},
		  ],
		  internalType: "struct TokenLock.Lock",
		  name: "",
		  type: "tuple",
		},
	  ],
	  stateMutability: "view",
	  type: "function",
	},
	{
	  inputs: [
		{
		  internalType: "uint256",
		  name: "lockId",
		  type: "uint256",
		},
	  ],
	  name: "getLockById",
	  outputs: [
		{
		  components: [
			{
			  internalType: "uint256",
			  name: "id",
			  type: "uint256",
			},
			{
			  internalType: "address",
			  name: "token",
			  type: "address",
			},
			{
			  internalType: "address",
			  name: "owner",
			  type: "address",
			},
			{
			  internalType: "uint256",
			  name: "amount",
			  type: "uint256",
			},
			{
			  internalType: "uint256",
			  name: "lockDate",
			  type: "uint256",
			},
			{
			  internalType: "uint256",
			  name: "tgeDate",
			  type: "uint256",
			},
			{
			  internalType: "uint256",
			  name: "tgeBps",
			  type: "uint256",
			},
			{
			  internalType: "uint256",
			  name: "cycle",
			  type: "uint256",
			},
			{
			  internalType: "uint256",
			  name: "cycleBps",
			  type: "uint256",
			},
			{
			  internalType: "uint256",
			  name: "unlockedAmount",
			  type: "uint256",
			},
			{
			  internalType: "string",
			  name: "description",
			  type: "string",
			},
		  ],
		  internalType: "struct TokenLock.Lock",
		  name: "",
		  type: "tuple",
		},
	  ],
	  stateMutability: "view",
	  type: "function",
	},
	{
	  inputs: [
		{
		  internalType: "address",
		  name: "token",
		  type: "address",
		},
		{
		  internalType: "uint256",
		  name: "start",
		  type: "uint256",
		},
		{
		  internalType: "uint256",
		  name: "end",
		  type: "uint256",
		},
	  ],
	  name: "getLocksForToken",
	  outputs: [
		{
		  components: [
			{
			  internalType: "uint256",
			  name: "id",
			  type: "uint256",
			},
			{
			  internalType: "address",
			  name: "token",
			  type: "address",
			},
			{
			  internalType: "address",
			  name: "owner",
			  type: "address",
			},
			{
			  internalType: "uint256",
			  name: "amount",
			  type: "uint256",
			},
			{
			  internalType: "uint256",
			  name: "lockDate",
			  type: "uint256",
			},
			{
			  internalType: "uint256",
			  name: "tgeDate",
			  type: "uint256",
			},
			{
			  internalType: "uint256",
			  name: "tgeBps",
			  type: "uint256",
			},
			{
			  internalType: "uint256",
			  name: "cycle",
			  type: "uint256",
			},
			{
			  internalType: "uint256",
			  name: "cycleBps",
			  type: "uint256",
			},
			{
			  internalType: "uint256",
			  name: "unlockedAmount",
			  type: "uint256",
			},
			{
			  internalType: "string",
			  name: "description",
			  type: "string",
			},
		  ],
		  internalType: "struct TokenLock.Lock[]",
		  name: "",
		  type: "tuple[]",
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
		  name: "user",
		  type: "address",
		},
	  ],
	  name: "lpLockCountForUser",
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
		  name: "user",
		  type: "address",
		},
		{
		  internalType: "uint256",
		  name: "index",
		  type: "uint256",
		},
	  ],
	  name: "lpLockForUserAtIndex",
	  outputs: [
		{
		  components: [
			{
			  internalType: "uint256",
			  name: "id",
			  type: "uint256",
			},
			{
			  internalType: "address",
			  name: "token",
			  type: "address",
			},
			{
			  internalType: "address",
			  name: "owner",
			  type: "address",
			},
			{
			  internalType: "uint256",
			  name: "amount",
			  type: "uint256",
			},
			{
			  internalType: "uint256",
			  name: "lockDate",
			  type: "uint256",
			},
			{
			  internalType: "uint256",
			  name: "tgeDate",
			  type: "uint256",
			},
			{
			  internalType: "uint256",
			  name: "tgeBps",
			  type: "uint256",
			},
			{
			  internalType: "uint256",
			  name: "cycle",
			  type: "uint256",
			},
			{
			  internalType: "uint256",
			  name: "cycleBps",
			  type: "uint256",
			},
			{
			  internalType: "uint256",
			  name: "unlockedAmount",
			  type: "uint256",
			},
			{
			  internalType: "string",
			  name: "description",
			  type: "string",
			},
		  ],
		  internalType: "struct TokenLock.Lock",
		  name: "",
		  type: "tuple",
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
	  name: "lpLocksForUser",
	  outputs: [
		{
		  components: [
			{
			  internalType: "uint256",
			  name: "id",
			  type: "uint256",
			},
			{
			  internalType: "address",
			  name: "token",
			  type: "address",
			},
			{
			  internalType: "address",
			  name: "owner",
			  type: "address",
			},
			{
			  internalType: "uint256",
			  name: "amount",
			  type: "uint256",
			},
			{
			  internalType: "uint256",
			  name: "lockDate",
			  type: "uint256",
			},
			{
			  internalType: "uint256",
			  name: "tgeDate",
			  type: "uint256",
			},
			{
			  internalType: "uint256",
			  name: "tgeBps",
			  type: "uint256",
			},
			{
			  internalType: "uint256",
			  name: "cycle",
			  type: "uint256",
			},
			{
			  internalType: "uint256",
			  name: "cycleBps",
			  type: "uint256",
			},
			{
			  internalType: "uint256",
			  name: "unlockedAmount",
			  type: "uint256",
			},
			{
			  internalType: "string",
			  name: "description",
			  type: "string",
			},
		  ],
		  internalType: "struct TokenLock.Lock[]",
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
	  name: "normalLockCountForUser",
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
		  name: "user",
		  type: "address",
		},
		{
		  internalType: "uint256",
		  name: "index",
		  type: "uint256",
		},
	  ],
	  name: "normalLockForUserAtIndex",
	  outputs: [
		{
		  components: [
			{
			  internalType: "uint256",
			  name: "id",
			  type: "uint256",
			},
			{
			  internalType: "address",
			  name: "token",
			  type: "address",
			},
			{
			  internalType: "address",
			  name: "owner",
			  type: "address",
			},
			{
			  internalType: "uint256",
			  name: "amount",
			  type: "uint256",
			},
			{
			  internalType: "uint256",
			  name: "lockDate",
			  type: "uint256",
			},
			{
			  internalType: "uint256",
			  name: "tgeDate",
			  type: "uint256",
			},
			{
			  internalType: "uint256",
			  name: "tgeBps",
			  type: "uint256",
			},
			{
			  internalType: "uint256",
			  name: "cycle",
			  type: "uint256",
			},
			{
			  internalType: "uint256",
			  name: "cycleBps",
			  type: "uint256",
			},
			{
			  internalType: "uint256",
			  name: "unlockedAmount",
			  type: "uint256",
			},
			{
			  internalType: "string",
			  name: "description",
			  type: "string",
			},
		  ],
		  internalType: "struct TokenLock.Lock",
		  name: "",
		  type: "tuple",
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
	  name: "normalLocksForUser",
	  outputs: [
		{
		  components: [
			{
			  internalType: "uint256",
			  name: "id",
			  type: "uint256",
			},
			{
			  internalType: "address",
			  name: "token",
			  type: "address",
			},
			{
			  internalType: "address",
			  name: "owner",
			  type: "address",
			},
			{
			  internalType: "uint256",
			  name: "amount",
			  type: "uint256",
			},
			{
			  internalType: "uint256",
			  name: "lockDate",
			  type: "uint256",
			},
			{
			  internalType: "uint256",
			  name: "tgeDate",
			  type: "uint256",
			},
			{
			  internalType: "uint256",
			  name: "tgeBps",
			  type: "uint256",
			},
			{
			  internalType: "uint256",
			  name: "cycle",
			  type: "uint256",
			},
			{
			  internalType: "uint256",
			  name: "cycleBps",
			  type: "uint256",
			},
			{
			  internalType: "uint256",
			  name: "unlockedAmount",
			  type: "uint256",
			},
			{
			  internalType: "string",
			  name: "description",
			  type: "string",
			},
		  ],
		  internalType: "struct TokenLock.Lock[]",
		  name: "",
		  type: "tuple[]",
		},
	  ],
	  stateMutability: "view",
	  type: "function",
	},
	{
	  inputs: [],
	  name: "paused",
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
		  name: "token",
		  type: "address",
		},
	  ],
	  name: "totalLockCountForToken",
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
		  name: "user",
		  type: "address",
		},
	  ],
	  name: "totalLockCountForUser",
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
	  name: "totalTokenLockedCount",
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
		  name: "lockId",
		  type: "uint256",
		},
	  ],
	  name: "withdrawableTokens",
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
  ] as const