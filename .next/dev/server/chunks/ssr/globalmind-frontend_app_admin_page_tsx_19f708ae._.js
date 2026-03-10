module.exports = [
"[project]/globalmind-frontend/app/admin/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AdminPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/globalmind-frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/globalmind-frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$ethers$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__ethers$3e$__ = __turbopack_context__.i("[project]/globalmind-frontend/node_modules/ethers/lib.esm/ethers.js [app-ssr] (ecmascript) <export * as ethers>");
var __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$lib$2f$useWeb3$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/globalmind-frontend/lib/useWeb3.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$lib$2f$contract$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/globalmind-frontend/lib/contract.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
function AdminPage() {
    const { isConnected, connect, getContract } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$lib$2f$useWeb3$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useWeb3"])();
    const [batches, setBatches] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [finalizing, setFinalizing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({});
    const [results, setResults] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({});
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const load = (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async ()=>{
        const contract = getContract(false);
        if (!contract) return;
        setLoading(true);
        try {
            const count = await contract.batchCount();
            const list = [];
            for(let i = 0; i < Number(count); i++){
                const info = await contract.getBatchInfo(i);
                list.push({
                    id: i,
                    creator: info.creator,
                    reward: Number(__TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$ethers$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__ethers$3e$__["ethers"].formatUnits(info.reward, 18)).toFixed(0),
                    taskCount: Number(info.taskCount),
                    deadline: Number(info.deadline),
                    status: Number(info.status)
                });
            }
            setBatches(list.reverse());
        } catch (e) {
            setError(e.message);
        } finally{
            setLoading(false);
        }
    }, [
        getContract
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (isConnected) load();
    }, [
        isConnected,
        load
    ]);
    const finalize = async (batchId)=>{
        setFinalizing((f)=>({
                ...f,
                [batchId]: true
            }));
        setResults((r)=>({
                ...r,
                [batchId]: ""
            }));
        try {
            const contract = getContract(true);
            if (!contract) throw new Error("Contrato indisponível");
            const tx = await contract.finalizeBatch(batchId);
            await tx.wait();
            setResults((r)=>({
                    ...r,
                    [batchId]: "ok"
                }));
            load();
        } catch (e) {
            setResults((r)=>({
                    ...r,
                    [batchId]: e.reason || e.message || "Erro"
                }));
        } finally{
            setFinalizing((f)=>({
                    ...f,
                    [batchId]: false
                }));
        }
    };
    const timeLeft = (deadline)=>{
        const diff = deadline - Date.now() / 1000;
        if (diff <= 0) return "Expirado";
        const h = Math.floor(diff / 3600);
        const m = Math.floor(diff % 3600 / 60);
        return `${h}h ${m}m`;
    };
    const open = batches.filter((b)=>b.status === 0).length;
    const final = batches.filter((b)=>b.status === 1).length;
    const s = {
        page: {
            background: "var(--bg)",
            minHeight: "100vh",
            paddingTop: "7rem"
        },
        wrap: {
            maxWidth: "960px",
            margin: "0 auto",
            padding: "3rem 2rem 6rem"
        },
        eyebrow: {
            fontFamily: "var(--font-mono), monospace",
            fontSize: "0.65rem",
            color: "var(--muted)",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            marginBottom: "0.8rem",
            display: "block"
        },
        title: {
            fontFamily: "var(--font-serif), serif",
            fontSize: "clamp(2.5rem, 5vw, 4rem)",
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            color: "var(--ink)",
            marginBottom: "0.6rem"
        },
        subtitle: {
            color: "var(--ink2)",
            fontSize: "1rem",
            fontWeight: 300,
            lineHeight: 1.7,
            marginBottom: "2.5rem"
        },
        statsRow: {
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gap: "1rem",
            marginBottom: "2.5rem"
        },
        statCard: {
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: "6px",
            padding: "1.5rem 1.8rem"
        },
        statVal: {
            fontFamily: "var(--font-serif), serif",
            fontSize: "2.8rem",
            lineHeight: 1,
            color: "var(--accent)",
            display: "block"
        },
        statKey: {
            fontFamily: "var(--font-mono), monospace",
            fontSize: "0.62rem",
            color: "var(--muted)",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            marginTop: "0.4rem",
            display: "block"
        },
        topRow: {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "1.5rem"
        },
        tableLabel: {
            fontFamily: "var(--font-mono), monospace",
            fontSize: "0.65rem",
            color: "var(--muted)",
            letterSpacing: "0.15em",
            textTransform: "uppercase"
        },
        refreshBtn: {
            fontFamily: "var(--font-mono), monospace",
            fontSize: "0.7rem",
            color: "var(--muted)",
            background: "none",
            border: "1px solid var(--border)",
            borderRadius: "2px",
            padding: "0.4rem 0.9rem",
            cursor: "none",
            letterSpacing: "0.08em"
        },
        table: {
            width: "100%",
            borderCollapse: "collapse"
        },
        th: {
            fontFamily: "var(--font-mono), monospace",
            fontSize: "0.6rem",
            color: "var(--muted)",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            textAlign: "left",
            padding: "0 1rem 0.75rem",
            borderBottom: "1px solid var(--border)"
        },
        td: {
            padding: "1.2rem 1rem",
            borderBottom: "1px solid var(--border2)",
            fontSize: "0.85rem",
            verticalAlign: "middle"
        },
        mono: {
            fontFamily: "var(--font-mono), monospace",
            fontSize: "0.78rem"
        },
        finalizeBtn: {
            background: "var(--ink)",
            color: "var(--bg)",
            border: "none",
            borderRadius: "2px",
            padding: "0.5rem 1rem",
            fontWeight: 700,
            fontSize: "0.72rem",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            cursor: "none",
            fontFamily: "var(--font-sans), sans-serif",
            transition: "all 0.2s"
        },
        connectBox: {
            textAlign: "center",
            padding: "5rem 2rem"
        },
        connectBtn: {
            background: "var(--ink)",
            color: "var(--bg)",
            border: "none",
            borderRadius: "2px",
            padding: "0.95rem 2.2rem",
            fontWeight: 700,
            fontSize: "0.82rem",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            cursor: "none",
            fontFamily: "var(--font-sans), sans-serif"
        }
    };
    const statusBadge = (status)=>{
        const styles = {
            0: {
                color: "var(--accent3)",
                border: "1px solid rgba(45,138,78,0.25)",
                background: "rgba(45,138,78,0.06)"
            },
            1: {
                color: "var(--accent2)",
                border: "1px solid rgba(26,58,143,0.25)",
                background: "rgba(26,58,143,0.06)"
            },
            2: {
                color: "var(--muted)",
                border: "1px solid var(--border)",
                background: "var(--bg2)"
            }
        };
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            style: {
                fontFamily: "var(--font-mono), monospace",
                fontSize: "0.62rem",
                letterSpacing: "0.1em",
                padding: "0.25rem 0.6rem",
                borderRadius: "2px",
                ...styles[status]
            },
            children: __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$lib$2f$contract$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BATCH_STATUS"][status]
        }, void 0, false, {
            fileName: "[project]/globalmind-frontend/app/admin/page.tsx",
            lineNumber: 104,
            columnNumber: 7
        }, this);
    };
    if (!isConnected) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: s.page,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: s.wrap,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: s.connectBox,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            fontSize: "3rem",
                            display: "block",
                            marginBottom: "1.5rem"
                        },
                        children: "⚙️"
                    }, void 0, false, {
                        fileName: "[project]/globalmind-frontend/app/admin/page.tsx",
                        lineNumber: 114,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        style: {
                            fontFamily: "var(--font-serif), serif",
                            fontSize: "2rem",
                            color: "var(--ink)",
                            marginBottom: "0.5rem"
                        },
                        children: "Admin"
                    }, void 0, false, {
                        fileName: "[project]/globalmind-frontend/app/admin/page.tsx",
                        lineNumber: 115,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        style: {
                            color: "var(--ink2)",
                            fontSize: "0.9rem",
                            fontWeight: 300,
                            marginBottom: "2rem"
                        },
                        children: "Conecte sua carteira para monitorar e finalizar batches."
                    }, void 0, false, {
                        fileName: "[project]/globalmind-frontend/app/admin/page.tsx",
                        lineNumber: 116,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: connect,
                        style: s.connectBtn,
                        children: "Conectar Carteira"
                    }, void 0, false, {
                        fileName: "[project]/globalmind-frontend/app/admin/page.tsx",
                        lineNumber: 117,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/globalmind-frontend/app/admin/page.tsx",
                lineNumber: 113,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/globalmind-frontend/app/admin/page.tsx",
            lineNumber: 112,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/globalmind-frontend/app/admin/page.tsx",
        lineNumber: 111,
        columnNumber: 5
    }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: s.page,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: s.wrap,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    style: s.eyebrow,
                    children: "// Administração"
                }, void 0, false, {
                    fileName: "[project]/globalmind-frontend/app/admin/page.tsx",
                    lineNumber: 126,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                    style: s.title,
                    children: [
                        "Todos os ",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("em", {
                            style: {
                                fontStyle: "italic",
                                color: "var(--accent)"
                            },
                            children: "Batches"
                        }, void 0, false, {
                            fileName: "[project]/globalmind-frontend/app/admin/page.tsx",
                            lineNumber: 128,
                            columnNumber: 20
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/globalmind-frontend/app/admin/page.tsx",
                    lineNumber: 127,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    style: s.subtitle,
                    children: "Monitore a rede e finalize consensos para distribuir as recompensas GMND."
                }, void 0, false, {
                    fileName: "[project]/globalmind-frontend/app/admin/page.tsx",
                    lineNumber: 130,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: s.statsRow,
                    children: [
                        {
                            val: batches.length.toString(),
                            key: "Total de Batches"
                        },
                        {
                            val: open.toString(),
                            key: "Abertos"
                        },
                        {
                            val: final.toString(),
                            key: "Finalizados"
                        }
                    ].map((st)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: s.statCard,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: st.key === "Finalizados" ? {
                                        ...s.statVal,
                                        color: "var(--accent2)"
                                    } : s.statVal,
                                    children: st.val
                                }, void 0, false, {
                                    fileName: "[project]/globalmind-frontend/app/admin/page.tsx",
                                    lineNumber: 140,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: s.statKey,
                                    children: st.key
                                }, void 0, false, {
                                    fileName: "[project]/globalmind-frontend/app/admin/page.tsx",
                                    lineNumber: 141,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, st.key, true, {
                            fileName: "[project]/globalmind-frontend/app/admin/page.tsx",
                            lineNumber: 139,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/globalmind-frontend/app/admin/page.tsx",
                    lineNumber: 133,
                    columnNumber: 9
                }, this),
                error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        background: "rgba(185,28,28,0.05)",
                        border: "1px solid rgba(185,28,28,0.15)",
                        borderRadius: "4px",
                        padding: "0.85rem 1.2rem",
                        fontSize: "0.82rem",
                        color: "#b91c1c",
                        marginBottom: "1.5rem"
                    },
                    children: error
                }, void 0, false, {
                    fileName: "[project]/globalmind-frontend/app/admin/page.tsx",
                    lineNumber: 146,
                    columnNumber: 19
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: s.topRow,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            style: s.tableLabel,
                            children: "// Registro de Batches"
                        }, void 0, false, {
                            fileName: "[project]/globalmind-frontend/app/admin/page.tsx",
                            lineNumber: 149,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: load,
                            style: s.refreshBtn,
                            children: "↻ Atualizar"
                        }, void 0, false, {
                            fileName: "[project]/globalmind-frontend/app/admin/page.tsx",
                            lineNumber: 150,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/globalmind-frontend/app/admin/page.tsx",
                    lineNumber: 148,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        background: "var(--surface)",
                        border: "1px solid var(--border)",
                        borderRadius: "6px",
                        overflow: "hidden"
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                        style: s.table,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                    style: {
                                        background: "var(--bg2)"
                                    },
                                    children: [
                                        "Batch ID",
                                        "Criador",
                                        "Recompensa",
                                        "Tarefas",
                                        "Prazo",
                                        "Status",
                                        "Ação"
                                    ].map((h)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            style: s.th,
                                            children: h
                                        }, h, false, {
                                            fileName: "[project]/globalmind-frontend/app/admin/page.tsx",
                                            lineNumber: 158,
                                            columnNumber: 19
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/globalmind-frontend/app/admin/page.tsx",
                                    lineNumber: 156,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/globalmind-frontend/app/admin/page.tsx",
                                lineNumber: 155,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                children: loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        colSpan: 7,
                                        style: {
                                            ...s.td,
                                            textAlign: "center",
                                            color: "var(--muted)",
                                            fontFamily: "var(--font-mono), monospace",
                                            fontSize: "0.75rem"
                                        },
                                        children: "Carregando..."
                                    }, void 0, false, {
                                        fileName: "[project]/globalmind-frontend/app/admin/page.tsx",
                                        lineNumber: 164,
                                        columnNumber: 21
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/globalmind-frontend/app/admin/page.tsx",
                                    lineNumber: 164,
                                    columnNumber: 17
                                }, this) : batches.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        colSpan: 7,
                                        style: {
                                            ...s.td,
                                            textAlign: "center",
                                            color: "var(--muted)",
                                            fontStyle: "italic"
                                        },
                                        children: "Nenhum batch encontrado"
                                    }, void 0, false, {
                                        fileName: "[project]/globalmind-frontend/app/admin/page.tsx",
                                        lineNumber: 166,
                                        columnNumber: 21
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/globalmind-frontend/app/admin/page.tsx",
                                    lineNumber: 166,
                                    columnNumber: 17
                                }, this) : batches.map((b)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                        style: {
                                            transition: "background 0.2s"
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                style: s.td,
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        ...s.mono,
                                                        color: "var(--accent)"
                                                    },
                                                    children: [
                                                        "#",
                                                        b.id
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/globalmind-frontend/app/admin/page.tsx",
                                                    lineNumber: 169,
                                                    columnNumber: 36
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/globalmind-frontend/app/admin/page.tsx",
                                                lineNumber: 169,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                style: s.td,
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: s.mono,
                                                    children: [
                                                        b.creator.slice(0, 6),
                                                        "...",
                                                        b.creator.slice(-4)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/globalmind-frontend/app/admin/page.tsx",
                                                    lineNumber: 170,
                                                    columnNumber: 36
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/globalmind-frontend/app/admin/page.tsx",
                                                lineNumber: 170,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                style: s.td,
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        ...s.mono,
                                                        fontWeight: 600
                                                    },
                                                    children: [
                                                        b.reward,
                                                        " GMND"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/globalmind-frontend/app/admin/page.tsx",
                                                    lineNumber: 171,
                                                    columnNumber: 36
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/globalmind-frontend/app/admin/page.tsx",
                                                lineNumber: 171,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                style: {
                                                    ...s.td,
                                                    textAlign: "center"
                                                },
                                                children: b.taskCount
                                            }, void 0, false, {
                                                fileName: "[project]/globalmind-frontend/app/admin/page.tsx",
                                                lineNumber: 172,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                style: s.td,
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: s.mono,
                                                    children: timeLeft(b.deadline)
                                                }, void 0, false, {
                                                    fileName: "[project]/globalmind-frontend/app/admin/page.tsx",
                                                    lineNumber: 173,
                                                    columnNumber: 36
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/globalmind-frontend/app/admin/page.tsx",
                                                lineNumber: 173,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                style: s.td,
                                                children: statusBadge(b.status)
                                            }, void 0, false, {
                                                fileName: "[project]/globalmind-frontend/app/admin/page.tsx",
                                                lineNumber: 174,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                style: s.td,
                                                children: b.status === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: ()=>finalize(b.id),
                                                            disabled: finalizing[b.id],
                                                            style: {
                                                                ...s.finalizeBtn,
                                                                opacity: finalizing[b.id] ? 0.6 : 1
                                                            },
                                                            children: finalizing[b.id] ? "..." : "Finalizar"
                                                        }, void 0, false, {
                                                            fileName: "[project]/globalmind-frontend/app/admin/page.tsx",
                                                            lineNumber: 178,
                                                            columnNumber: 25
                                                        }, this),
                                                        results[b.id] && results[b.id] !== "ok" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            style: {
                                                                fontFamily: "var(--font-mono), monospace",
                                                                fontSize: "0.6rem",
                                                                color: "var(--accent)",
                                                                marginTop: "0.4rem",
                                                                maxWidth: "160px",
                                                                lineHeight: 1.4
                                                            },
                                                            children: results[b.id]
                                                        }, void 0, false, {
                                                            fileName: "[project]/globalmind-frontend/app/admin/page.tsx",
                                                            lineNumber: 186,
                                                            columnNumber: 27
                                                        }, this),
                                                        results[b.id] === "ok" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            style: {
                                                                fontFamily: "var(--font-mono), monospace",
                                                                fontSize: "0.6rem",
                                                                color: "var(--accent3)",
                                                                marginTop: "0.4rem"
                                                            },
                                                            children: "✓ Finalizado"
                                                        }, void 0, false, {
                                                            fileName: "[project]/globalmind-frontend/app/admin/page.tsx",
                                                            lineNumber: 191,
                                                            columnNumber: 27
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/globalmind-frontend/app/admin/page.tsx",
                                                    lineNumber: 177,
                                                    columnNumber: 23
                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        fontFamily: "var(--font-mono), monospace",
                                                        fontSize: "0.65rem",
                                                        color: "var(--muted)"
                                                    },
                                                    children: "—"
                                                }, void 0, false, {
                                                    fileName: "[project]/globalmind-frontend/app/admin/page.tsx",
                                                    lineNumber: 195,
                                                    columnNumber: 23
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/globalmind-frontend/app/admin/page.tsx",
                                                lineNumber: 175,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, b.id, true, {
                                        fileName: "[project]/globalmind-frontend/app/admin/page.tsx",
                                        lineNumber: 168,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/globalmind-frontend/app/admin/page.tsx",
                                lineNumber: 162,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/globalmind-frontend/app/admin/page.tsx",
                        lineNumber: 154,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/globalmind-frontend/app/admin/page.tsx",
                    lineNumber: 153,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/globalmind-frontend/app/admin/page.tsx",
            lineNumber: 125,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/globalmind-frontend/app/admin/page.tsx",
        lineNumber: 124,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=globalmind-frontend_app_admin_page_tsx_19f708ae._.js.map