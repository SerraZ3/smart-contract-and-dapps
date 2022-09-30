// importa o web3
import web3 from "../utils/web3";
// Endereço do contrato gerado no deploy
const address = "0x4A3AC142A990487652888dC03c4F7CB0E9B347Fa";
// Abi gerada no deploy do contrato
const abi = [
  {
    inputs: [
      {
        components: [
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "uint64",
            name: "cpf",
            type: "uint64",
          },
          {
            internalType: "uint32",
            name: "birthdate",
            type: "uint32",
          },
        ],
        internalType: "struct Person",
        name: "person",
        type: "tuple",
      },
    ],
    name: "registry",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "uint64",
        name: "cpf",
        type: "uint64",
      },
    ],
    name: "findByCpf",
    outputs: [
      {
        components: [
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "uint64",
            name: "cpf",
            type: "uint64",
          },
          {
            internalType: "uint32",
            name: "birthdate",
            type: "uint32",
          },
        ],
        internalType: "struct Person",
        name: "_people",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getAllPeople",
    outputs: [
      {
        components: [
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "uint64",
            name: "cpf",
            type: "uint64",
          },
          {
            internalType: "uint32",
            name: "birthdate",
            type: "uint32",
          },
        ],
        internalType: "struct Person[]",
        name: "_people",
        type: "tuple[]",
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
        name: "",
        type: "uint256",
      },
    ],
    name: "people",
    outputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "uint64",
        name: "cpf",
        type: "uint64",
      },
      {
        internalType: "uint32",
        name: "birthdate",
        type: "uint32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

//exporte o contrato
export default new web3.eth.Contract(abi, address);
