// Endereço do protocolo V2 (pagamentos em GMND)
export const CONTRACT_ADDRESS = "0x7Cb748160b81978Ef7B5a6C93f5415311f450994";

// Endereço do token GMND ERC-20
export const GMND_TOKEN_ADDRESS = "0x642799DA14BE72A9b8f5cF31fFbd7432CaFA97b3";

export const CONTRACT_ABI = [
  // createBatch — agora recebe rewardAmount em GMND (sem payable)
  {
    inputs: [
      { name: "taskIds",      type: "string[]" },
      { name: "contents",     type: "string[]" },
      { name: "taskTypes",    type: "uint8[]"  },
      { name: "deadlineIn",   type: "uint256"  },
      { name: "rewardAmount", type: "uint256"  },
    ],
    name: "createBatch",
    outputs: [{ name: "batchId", type: "uint256" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  // submitAnswer
  {
    inputs: [
      { name: "batchId",   type: "uint256" },
      { name: "taskIndex", type: "uint256" },
      { name: "answer",    type: "string"  },
    ],
    name: "submitAnswer",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  // finalizeBatch
  {
    inputs: [{ name: "batchId", type: "uint256" }],
    name: "finalizeBatch",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  // cancelBatch
  {
    inputs: [{ name: "batchId", type: "uint256" }],
    name: "cancelBatch",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  // getBatchInfo
  {
    inputs: [{ name: "batchId", type: "uint256" }],
    name: "getBatchInfo",
    outputs: [
      { name: "creator",   type: "address" },
      { name: "reward",    type: "uint256" },
      { name: "taskCount", type: "uint256" },
      { name: "deadline",  type: "uint256" },
      { name: "status",    type: "uint8"   },
    ],
    stateMutability: "view",
    type: "function",
  },
  // getTask
  {
    inputs: [
      { name: "batchId",   type: "uint256" },
      { name: "taskIndex", type: "uint256" },
    ],
    name: "getTask",
    outputs: [
      { name: "taskId",   type: "string" },
      { name: "content",  type: "string" },
      { name: "taskType", type: "uint8"  },
    ],
    stateMutability: "view",
    type: "function",
  },
  // getNodeProfile — agora retorna também earned
  {
    inputs: [{ name: "node", type: "address" }],
    name: "getNodeProfile",
    outputs: [
      { name: "score",      type: "uint256" },
      { name: "totalTasks", type: "uint256" },
      { name: "earned",     type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
  // getNetworkStats
  {
    inputs: [],
    name: "getNetworkStats",
    outputs: [
      { name: "_totalBatches",  type: "uint256" },
      { name: "_totalBurned",   type: "uint256" },
      { name: "_totalRewarded", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
  // batchCount
  {
    inputs: [],
    name: "batchCount",
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  // hasAnswered
  {
    inputs: [
      { name: "", type: "uint256" },
      { name: "", type: "uint256" },
      { name: "", type: "address" },
    ],
    name: "hasAnswered",
    outputs: [{ name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  // Events
  {
    anonymous: false,
    inputs: [
      { indexed: true,  name: "batchId",   type: "uint256" },
      { indexed: true,  name: "creator",   type: "address" },
      { indexed: false, name: "reward",    type: "uint256" },
      { indexed: false, name: "taskCount", type: "uint256" },
      { indexed: false, name: "deadline",  type: "uint256" },
    ],
    name: "BatchCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true,  name: "batchId",       type: "uint256" },
      { indexed: false, name: "rewardPerNode",  type: "uint256" },
      { indexed: false, name: "burned",         type: "uint256" },
      { indexed: false, name: "toTreasury",     type: "uint256" },
      { indexed: false, name: "validatorCount", type: "uint256" },
    ],
    name: "BatchFinalized",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, name: "amount",     type: "uint256" },
      { indexed: false, name: "totalBurned",type: "uint256" },
    ],
    name: "TokensBurned",
    type: "event",
  },
] as const;

// ABI mínimo do token GMND para approve
export const GMND_TOKEN_ABI = [
  {
    inputs: [
      { name: "spender", type: "address" },
      { name: "amount",  type: "uint256" },
    ],
    name: "approve",
    outputs: [{ name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ name: "account", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
] as const;

export const TASK_TYPES = [
  { value: 0, label: "Classificação de Texto" },
  { value: 1, label: "Verificação de Fatos"   },
  { value: 2, label: "Avaliação de LLM"       },
  { value: 3, label: "Rotulagem de Imagem"    },
];

export const BATCH_STATUS = ["Aberto", "Finalizado", "Cancelado"];

export const SEPOLIA_CHAIN_ID = 11155111;
