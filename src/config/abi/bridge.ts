export const bridgeABI = [
  {
      "inputs": [
          {
              "internalType": "address",
              "name": "_operator",
              "type": "address"
          },
          {
              "internalType": "uint256",
              "name": "_fee",
              "type": "uint256"
          },
          {
              "internalType": "address",
              "name": "_feeReceiver",
              "type": "address"
          }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
  },
  {
      "anonymous": false,
      "inputs": [
          {
              "indexed": false,
              "internalType": "uint256",
              "name": "pid",
              "type": "uint256"
          },
          {
              "indexed": true,
              "internalType": "address",
              "name": "from",
              "type": "address"
          },
          {
              "indexed": true,
              "internalType": "address",
              "name": "to",
              "type": "address"
          },
          {
              "indexed": false,
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256"
          },
          {
              "indexed": false,
              "internalType": "uint256",
              "name": "nonce",
              "type": "uint256"
          }
      ],
      "name": "Burn",
      "type": "event"
  },
  {
      "anonymous": false,
      "inputs": [
          {
              "indexed": false,
              "internalType": "uint256",
              "name": "pid",
              "type": "uint256"
          },
          {
              "indexed": true,
              "internalType": "address",
              "name": "from",
              "type": "address"
          },
          {
              "indexed": true,
              "internalType": "address",
              "name": "to",
              "type": "address"
          },
          {
              "indexed": false,
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256"
          },
          {
              "indexed": false,
              "internalType": "uint256",
              "name": "nonce",
              "type": "uint256"
          }
      ],
      "name": "Mint",
      "type": "event"
  },
  {
      "inputs": [
          {
              "internalType": "address",
              "name": "_token",
              "type": "address"
          },
          {
              "internalType": "uint256",
              "name": "_min",
              "type": "uint256"
          }
      ],
      "name": "addPool",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "uint256",
              "name": "_pid",
              "type": "uint256"
          },
          {
              "internalType": "uint256",
              "name": "_amount",
              "type": "uint256"
          }
      ],
      "name": "burn",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "uint256",
              "name": "_pid",
              "type": "uint256"
          }
      ],
      "name": "burnETH",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
  },
  {
      "inputs": [],
      "name": "fee",
      "outputs": [
          {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [],
      "name": "feeReceiver",
      "outputs": [
          {
              "internalType": "address",
              "name": "",
              "type": "address"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
          }
      ],
      "name": "isNonceProcessed",
      "outputs": [
          {
              "internalType": "bool",
              "name": "",
              "type": "bool"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "uint256",
              "name": "_pid",
              "type": "uint256"
          },
          {
              "internalType": "uint256",
              "name": "_amount",
              "type": "uint256"
          },
          {
              "internalType": "address",
              "name": "_reciever",
              "type": "address"
          },
          {
              "internalType": "uint256",
              "name": "_nonce",
              "type": "uint256"
          }
      ],
      "name": "mint",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "uint256",
              "name": "_pid",
              "type": "uint256"
          },
          {
              "internalType": "uint256",
              "name": "_amount",
              "type": "uint256"
          },
          {
              "internalType": "address",
              "name": "_reciever",
              "type": "address"
          },
          {
              "internalType": "uint256",
              "name": "_nonce",
              "type": "uint256"
          }
      ],
      "name": "mintETH",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "inputs": [],
      "name": "nonce",
      "outputs": [
          {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [],
      "name": "operator",
      "outputs": [
          {
              "internalType": "address",
              "name": "",
              "type": "address"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
          }
      ],
      "name": "poolInfo",
      "outputs": [
          {
              "internalType": "contract IERC20",
              "name": "token",
              "type": "address"
          },
          {
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256"
          },
          {
              "internalType": "uint256",
              "name": "min",
              "type": "uint256"
          },
          {
              "internalType": "bool",
              "name": "enabled",
              "type": "bool"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "uint256",
              "name": "_fee",
              "type": "uint256"
          }
      ],
      "name": "updateFee",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "address",
              "name": "_feeReceiver",
              "type": "address"
          }
      ],
      "name": "updateFeeReceiver",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "address",
              "name": "_operator",
              "type": "address"
          }
      ],
      "name": "updateOperator",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "uint256",
              "name": "_pid",
              "type": "uint256"
          },
          {
              "internalType": "uint256",
              "name": "_min",
              "type": "uint256"
          },
          {
              "internalType": "bool",
              "name": "_enabled",
              "type": "bool"
          }
      ],
      "name": "updatePool",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "uint256",
              "name": "_pid",
              "type": "uint256"
          }
      ],
      "name": "updatePoolAmount",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
  }
] as const