import { web3 } from '../clients/web3'

const address = process.env.REACT_APP_LOTTERY_CONTRACT_ADDRESS

const abi: Array<Record<string, unknown>> = [
  {
    inputs: [],
    stateMutability: 'nonpayable',
    type: 'constructor',
    signature: 'constructor',
  },
  {
    inputs: [],
    name: 'getJoiners',
    outputs: [
      {
        internalType: 'address payable[]',
        name: '',
        type: 'address[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
    signature: '0xdd938b32',
  },
  {
    inputs: [],
    name: 'getLotteryValue',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
    signature: '0xa680ea2e',
  },
  {
    inputs: [],
    name: 'gweiFee',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
    signature: '0x7f2137ba',
  },
  {
    inputs: [],
    name: 'join',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
    payable: true,
    signature: '0xb688a363',
  },
  {
    inputs: [],
    name: 'manager',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
    signature: '0x481c6a75',
  },
  {
    inputs: [],
    name: 'pickWinner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
    signature: '0x5d495aea',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'players',
    outputs: [
      {
        internalType: 'address payable',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
    signature: '0xf71d96cb',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_fee',
        type: 'uint256',
      },
    ],
    name: 'setFee',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
    signature: '0x69fe0e2d',
  },
]

export default new web3.eth.Contract(abi, address)
