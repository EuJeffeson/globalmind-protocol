(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/globalmind-frontend/lib/contract.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Endereço do protocolo V2 (pagamentos em GMND)
__turbopack_context__.s([
    "BATCH_STATUS",
    ()=>BATCH_STATUS,
    "CONTRACT_ABI",
    ()=>CONTRACT_ABI,
    "CONTRACT_ADDRESS",
    ()=>CONTRACT_ADDRESS,
    "GMND_TOKEN_ABI",
    ()=>GMND_TOKEN_ABI,
    "GMND_TOKEN_ADDRESS",
    ()=>GMND_TOKEN_ADDRESS,
    "SEPOLIA_CHAIN_ID",
    ()=>SEPOLIA_CHAIN_ID,
    "TASK_TYPES",
    ()=>TASK_TYPES
]);
const CONTRACT_ADDRESS = "0x7Cb748160b81978Ef7B5a6C93f5415311f450994";
const GMND_TOKEN_ADDRESS = "0x642799DA14BE72A9b8f5cF31fFbd7432CaFA97b3";
const CONTRACT_ABI = [
    // createBatch — agora recebe rewardAmount em GMND (sem payable)
    {
        inputs: [
            {
                name: "taskIds",
                type: "string[]"
            },
            {
                name: "contents",
                type: "string[]"
            },
            {
                name: "taskTypes",
                type: "uint8[]"
            },
            {
                name: "deadlineIn",
                type: "uint256"
            },
            {
                name: "rewardAmount",
                type: "uint256"
            }
        ],
        name: "createBatch",
        outputs: [
            {
                name: "batchId",
                type: "uint256"
            }
        ],
        stateMutability: "nonpayable",
        type: "function"
    },
    // submitAnswer
    {
        inputs: [
            {
                name: "batchId",
                type: "uint256"
            },
            {
                name: "taskIndex",
                type: "uint256"
            },
            {
                name: "answer",
                type: "string"
            }
        ],
        name: "submitAnswer",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    // finalizeBatch
    {
        inputs: [
            {
                name: "batchId",
                type: "uint256"
            }
        ],
        name: "finalizeBatch",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    // cancelBatch
    {
        inputs: [
            {
                name: "batchId",
                type: "uint256"
            }
        ],
        name: "cancelBatch",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    // getBatchInfo
    {
        inputs: [
            {
                name: "batchId",
                type: "uint256"
            }
        ],
        name: "getBatchInfo",
        outputs: [
            {
                name: "creator",
                type: "address"
            },
            {
                name: "reward",
                type: "uint256"
            },
            {
                name: "taskCount",
                type: "uint256"
            },
            {
                name: "deadline",
                type: "uint256"
            },
            {
                name: "status",
                type: "uint8"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    // getTask
    {
        inputs: [
            {
                name: "batchId",
                type: "uint256"
            },
            {
                name: "taskIndex",
                type: "uint256"
            }
        ],
        name: "getTask",
        outputs: [
            {
                name: "taskId",
                type: "string"
            },
            {
                name: "content",
                type: "string"
            },
            {
                name: "taskType",
                type: "uint8"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    // getNodeProfile — agora retorna também earned
    {
        inputs: [
            {
                name: "node",
                type: "address"
            }
        ],
        name: "getNodeProfile",
        outputs: [
            {
                name: "score",
                type: "uint256"
            },
            {
                name: "totalTasks",
                type: "uint256"
            },
            {
                name: "earned",
                type: "uint256"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    // getNetworkStats
    {
        inputs: [],
        name: "getNetworkStats",
        outputs: [
            {
                name: "_totalBatches",
                type: "uint256"
            },
            {
                name: "_totalBurned",
                type: "uint256"
            },
            {
                name: "_totalRewarded",
                type: "uint256"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    // batchCount
    {
        inputs: [],
        name: "batchCount",
        outputs: [
            {
                name: "",
                type: "uint256"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    // hasAnswered
    {
        inputs: [
            {
                name: "",
                type: "uint256"
            },
            {
                name: "",
                type: "uint256"
            },
            {
                name: "",
                type: "address"
            }
        ],
        name: "hasAnswered",
        outputs: [
            {
                name: "",
                type: "bool"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    // Events
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                name: "batchId",
                type: "uint256"
            },
            {
                indexed: true,
                name: "creator",
                type: "address"
            },
            {
                indexed: false,
                name: "reward",
                type: "uint256"
            },
            {
                indexed: false,
                name: "taskCount",
                type: "uint256"
            },
            {
                indexed: false,
                name: "deadline",
                type: "uint256"
            }
        ],
        name: "BatchCreated",
        type: "event"
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                name: "batchId",
                type: "uint256"
            },
            {
                indexed: false,
                name: "rewardPerNode",
                type: "uint256"
            },
            {
                indexed: false,
                name: "burned",
                type: "uint256"
            },
            {
                indexed: false,
                name: "toTreasury",
                type: "uint256"
            },
            {
                indexed: false,
                name: "validatorCount",
                type: "uint256"
            }
        ],
        name: "BatchFinalized",
        type: "event"
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                name: "amount",
                type: "uint256"
            },
            {
                indexed: false,
                name: "totalBurned",
                type: "uint256"
            }
        ],
        name: "TokensBurned",
        type: "event"
    }
];
const GMND_TOKEN_ABI = [
    {
        inputs: [
            {
                name: "spender",
                type: "address"
            },
            {
                name: "amount",
                type: "uint256"
            }
        ],
        name: "approve",
        outputs: [
            {
                name: "",
                type: "bool"
            }
        ],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
            {
                name: "account",
                type: "address"
            }
        ],
        name: "balanceOf",
        outputs: [
            {
                name: "",
                type: "uint256"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [],
        name: "totalSupply",
        outputs: [
            {
                name: "",
                type: "uint256"
            }
        ],
        stateMutability: "view",
        type: "function"
    }
];
const TASK_TYPES = [
    {
        value: 0,
        label: "Classificação de Texto"
    },
    {
        value: 1,
        label: "Verificação de Fatos"
    },
    {
        value: 2,
        label: "Avaliação de LLM"
    },
    {
        value: 3,
        label: "Rotulagem de Imagem"
    }
];
const BATCH_STATUS = [
    "Aberto",
    "Finalizado",
    "Cancelado"
];
const SEPOLIA_CHAIN_ID = 11155111;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/globalmind-frontend/lib/useWeb3.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useWeb3",
    ()=>useWeb3
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/globalmind-frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$ethers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__ethers$3e$__ = __turbopack_context__.i("[project]/globalmind-frontend/node_modules/ethers/lib.esm/ethers.js [app-client] (ecmascript) <export * as ethers>");
var __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$lib$2f$contract$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/globalmind-frontend/lib/contract.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function useWeb3() {
    _s();
    const [provider, setProvider] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [signer, setSigner] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [address, setAddress] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [chainId, setChainId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const connect = (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useWeb3.useCallback[connect]": async ()=>{
            // Garante que só roda no browser
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
            if (!window.ethereum) {
                setError("MetaMask não encontrado. Instale em metamask.io");
                return;
            }
            setLoading(true);
            setError("");
            try {
                // Pede acesso às contas
                await window.ethereum.request({
                    method: "eth_requestAccounts"
                });
                const p = new __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$ethers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__ethers$3e$__["ethers"].BrowserProvider(window.ethereum);
                const s = await p.getSigner();
                const addr = await s.getAddress();
                const net = await p.getNetwork();
                const cid = Number(net.chainId);
                setProvider(p);
                setSigner(s);
                setAddress(addr);
                setChainId(cid);
                if (cid !== __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$lib$2f$contract$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SEPOLIA_CHAIN_ID"]) {
                    // Tenta trocar automaticamente para Sepolia
                    try {
                        await window.ethereum.request({
                            method: "wallet_switchEthereumChain",
                            params: [
                                {
                                    chainId: "0xaa36a7"
                                }
                            ]
                        });
                        // Após trocar, reconecta
                        const p2 = new __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$ethers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__ethers$3e$__["ethers"].BrowserProvider(window.ethereum);
                        const s2 = await p2.getSigner();
                        setProvider(p2);
                        setSigner(s2);
                        setChainId(__TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$lib$2f$contract$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SEPOLIA_CHAIN_ID"]);
                    } catch  {
                        setError("Troque para a rede Sepolia no MetaMask");
                    }
                }
            } catch (e) {
                if (e.code === 4001) {
                    setError("Conexão rejeitada pelo usuário");
                } else {
                    setError(e.message || "Erro ao conectar");
                }
            } finally{
                setLoading(false);
            }
        }
    }["useWeb3.useCallback[connect]"], []);
    const getContract = (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useWeb3.useCallback[getContract]": (write = false)=>{
            if (write && signer) return new __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$ethers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__ethers$3e$__["ethers"].Contract(__TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$lib$2f$contract$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CONTRACT_ADDRESS"], __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$lib$2f$contract$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CONTRACT_ABI"], signer);
            if (!write && provider) return new __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$ethers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__ethers$3e$__["ethers"].Contract(__TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$lib$2f$contract$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CONTRACT_ADDRESS"], __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$lib$2f$contract$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CONTRACT_ABI"], provider);
            return null;
        }
    }["useWeb3.useCallback[getContract]"], [
        provider,
        signer
    ]);
    // Escuta mudanças de conta e rede
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useWeb3.useEffect": ()=>{
            if (("TURBOPACK compile-time value", "object") === "undefined" || !window.ethereum) return;
            const onAccountsChanged = {
                "useWeb3.useEffect.onAccountsChanged": ()=>connect()
            }["useWeb3.useEffect.onAccountsChanged"];
            const onChainChanged = {
                "useWeb3.useEffect.onChainChanged": ()=>connect()
            }["useWeb3.useEffect.onChainChanged"];
            window.ethereum.on("accountsChanged", onAccountsChanged);
            window.ethereum.on("chainChanged", onChainChanged);
            return ({
                "useWeb3.useEffect": ()=>{
                    window.ethereum.removeListener("accountsChanged", onAccountsChanged);
                    window.ethereum.removeListener("chainChanged", onChainChanged);
                }
            })["useWeb3.useEffect"];
        }
    }["useWeb3.useEffect"], [
        connect
    ]);
    return {
        provider,
        signer,
        address,
        chainId,
        loading,
        error,
        connect,
        getContract,
        isConnected: !!address && chainId === __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$lib$2f$contract$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SEPOLIA_CHAIN_ID"]
    };
}
_s(useWeb3, "RUZdpdUAYA9od8pp54rMEFrtXDM=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/globalmind-frontend/components/Navbar.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Navbar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/globalmind-frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/globalmind-frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/globalmind-frontend/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/globalmind-frontend/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$lib$2f$useWeb3$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/globalmind-frontend/lib/useWeb3.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
function Navbar() {
    _s();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const { address, connect, isConnected, loading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$lib$2f$useWeb3$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWeb3"])();
    const curRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const ringRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [scrolled, setScrolled] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Custom cursor
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Navbar.useEffect": ()=>{
            let mx = 0, my = 0, rx = 0, ry = 0;
            const move = {
                "Navbar.useEffect.move": (e)=>{
                    mx = e.clientX;
                    my = e.clientY;
                }
            }["Navbar.useEffect.move"];
            document.addEventListener("mousemove", move);
            let raf;
            const tick = {
                "Navbar.useEffect.tick": ()=>{
                    if (curRef.current) {
                        curRef.current.style.left = mx + "px";
                        curRef.current.style.top = my + "px";
                    }
                    rx += (mx - rx) * 0.12;
                    ry += (my - ry) * 0.12;
                    if (ringRef.current) {
                        ringRef.current.style.left = rx + "px";
                        ringRef.current.style.top = ry + "px";
                    }
                    raf = requestAnimationFrame(tick);
                }
            }["Navbar.useEffect.tick"];
            tick();
            // Hover effect
            const grow = {
                "Navbar.useEffect.grow": ()=>{
                    if (curRef.current) {
                        curRef.current.style.width = "20px";
                        curRef.current.style.height = "20px";
                        curRef.current.style.background = "var(--accent2)";
                    }
                }
            }["Navbar.useEffect.grow"];
            const shrink = {
                "Navbar.useEffect.shrink": ()=>{
                    if (curRef.current) {
                        curRef.current.style.width = "10px";
                        curRef.current.style.height = "10px";
                        curRef.current.style.background = "var(--accent)";
                    }
                }
            }["Navbar.useEffect.shrink"];
            const addHover = {
                "Navbar.useEffect.addHover": ()=>{
                    document.querySelectorAll("a, button, .card, input, select, textarea").forEach({
                        "Navbar.useEffect.addHover": (el)=>{
                            el.addEventListener("mouseenter", grow);
                            el.addEventListener("mouseleave", shrink);
                        }
                    }["Navbar.useEffect.addHover"]);
                }
            }["Navbar.useEffect.addHover"];
            addHover();
            const obs = new MutationObserver(addHover);
            obs.observe(document.body, {
                childList: true,
                subtree: true
            });
            const onScroll = {
                "Navbar.useEffect.onScroll": ()=>setScrolled(window.scrollY > 20)
            }["Navbar.useEffect.onScroll"];
            window.addEventListener("scroll", onScroll);
            return ({
                "Navbar.useEffect": ()=>{
                    document.removeEventListener("mousemove", move);
                    cancelAnimationFrame(raf);
                    window.removeEventListener("scroll", onScroll);
                    obs.disconnect();
                }
            })["Navbar.useEffect"];
        }
    }["Navbar.useEffect"], []);
    const links = [
        {
            href: "/empresa",
            label: "Postar Tarefas"
        },
        {
            href: "/tarefas",
            label: "Validar"
        },
        {
            href: "/dashboard",
            label: "Dashboard"
        },
        {
            href: "/admin",
            label: "Admin"
        }
    ];
    const shortAddr = address ? address.slice(0, 6) + "..." + address.slice(-4) : "";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "cursor",
                ref: curRef
            }, void 0, false, {
                fileName: "[project]/globalmind-frontend/components/Navbar.tsx",
                lineNumber: 60,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "cursor-ring",
                ref: ringRef
            }, void 0, false, {
                fileName: "[project]/globalmind-frontend/components/Navbar.tsx",
                lineNumber: 61,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                style: {
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    zIndex: 200,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "1.2rem 4rem",
                    background: scrolled ? "rgba(244,241,235,0.95)" : "rgba(244,241,235,0.92)",
                    backdropFilter: "blur(20px)",
                    borderBottom: "1px solid var(--border)",
                    transition: "background 0.3s"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: "/",
                        style: {
                            textDecoration: "none"
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            style: {
                                fontFamily: "var(--font-serif), 'Instrument Serif', serif",
                                fontSize: "1.4rem",
                                letterSpacing: "-0.01em",
                                color: "var(--ink)"
                            },
                            children: [
                                "GlobalMind",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("sup", {
                                    style: {
                                        fontFamily: "var(--font-mono), monospace",
                                        fontSize: "0.55rem",
                                        color: "var(--accent)",
                                        verticalAlign: "super",
                                        letterSpacing: "0.05em",
                                        marginLeft: "2px"
                                    },
                                    children: "GMND"
                                }, void 0, false, {
                                    fileName: "[project]/globalmind-frontend/components/Navbar.tsx",
                                    lineNumber: 78,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/globalmind-frontend/components/Navbar.tsx",
                            lineNumber: 73,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/globalmind-frontend/components/Navbar.tsx",
                        lineNumber: 72,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                        style: {
                            listStyle: "none",
                            display: "flex",
                            gap: "2.5rem",
                            alignItems: "center"
                        },
                        children: [
                            links.map((l)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: l.href,
                                        style: {
                                            color: pathname === l.href ? "var(--ink)" : "var(--muted)",
                                            textDecoration: "none",
                                            fontSize: "0.78rem",
                                            fontWeight: 600,
                                            letterSpacing: "0.06em",
                                            textTransform: "uppercase",
                                            transition: "color 0.2s",
                                            borderBottom: pathname === l.href ? "1px solid var(--accent)" : "1px solid transparent",
                                            paddingBottom: "2px"
                                        },
                                        children: l.label
                                    }, void 0, false, {
                                        fileName: "[project]/globalmind-frontend/components/Navbar.tsx",
                                        lineNumber: 89,
                                        columnNumber: 15
                                    }, this)
                                }, l.href, false, {
                                    fileName: "[project]/globalmind-frontend/components/Navbar.tsx",
                                    lineNumber: 88,
                                    columnNumber: 13
                                }, this)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: connect,
                                    disabled: loading,
                                    style: {
                                        fontFamily: "var(--font-mono), monospace",
                                        fontSize: "0.72rem",
                                        color: isConnected ? "var(--accent3)" : "var(--accent)",
                                        border: `1px solid ${isConnected ? "var(--accent3)" : "var(--accent)"}`,
                                        padding: "0.5rem 1.2rem",
                                        borderRadius: "2px",
                                        background: "transparent",
                                        cursor: "none",
                                        transition: "all 0.2s",
                                        letterSpacing: "0.05em"
                                    },
                                    onMouseEnter: (e)=>{
                                        e.target.style.background = isConnected ? "var(--accent3)" : "var(--accent)";
                                        e.target.style.color = "white";
                                    },
                                    onMouseLeave: (e)=>{
                                        e.target.style.background = "transparent";
                                        e.target.style.color = isConnected ? "var(--accent3)" : "var(--accent)";
                                    },
                                    children: loading ? "..." : isConnected ? shortAddr : "$GMND — Conectar"
                                }, void 0, false, {
                                    fileName: "[project]/globalmind-frontend/components/Navbar.tsx",
                                    lineNumber: 101,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/globalmind-frontend/components/Navbar.tsx",
                                lineNumber: 100,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/globalmind-frontend/components/Navbar.tsx",
                        lineNumber: 86,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/globalmind-frontend/components/Navbar.tsx",
                lineNumber: 63,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
_s(Navbar, "dajmOZHInbBvCNuXKJj2BH+fji0=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"],
        __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$lib$2f$useWeb3$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWeb3"]
    ];
});
_c = Navbar;
var _c;
__turbopack_context__.k.register(_c, "Navbar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=globalmind-frontend_968b7825._.js.map