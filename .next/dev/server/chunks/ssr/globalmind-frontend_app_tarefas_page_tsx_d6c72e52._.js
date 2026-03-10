module.exports = [
"[project]/globalmind-frontend/app/tarefas/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>TarefasPage
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
function TarefasPage() {
    const { isConnected, connect, address, getContract } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$lib$2f$useWeb3$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useWeb3"])();
    const [tasks, setTasks] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [answers, setAnswers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({});
    const [sending, setSending] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({});
    const [done, setDone] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({});
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const loadTasks = (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async ()=>{
        const contract = getContract(false);
        if (!contract) return;
        setLoading(true);
        try {
            const count = await contract.batchCount();
            const found = [];
            for(let i = 0; i < Number(count); i++){
                const info = await contract.getBatchInfo(i);
                if (Number(info.status) !== 0) continue;
                if (Number(info.deadline) < Date.now() / 1000) continue;
                for(let j = 0; j < Number(info.taskCount); j++){
                    const already = address ? await contract.hasAnswered(i, j, address) : false;
                    const isCreator = address?.toLowerCase() === info.creator.toLowerCase();
                    if (already || isCreator) continue;
                    const task = await contract.getTask(i, j);
                    found.push({
                        batchId: i,
                        taskIndex: j,
                        content: task.content,
                        taskType: Number(task.taskType),
                        reward: __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$ethers$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__ethers$3e$__["ethers"].formatUnits(info.reward, 18),
                        deadline: Number(info.deadline)
                    });
                }
            }
            setTasks(found);
        } catch (e) {
            setError(e.message);
        } finally{
            setLoading(false);
        }
    }, [
        getContract,
        address
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (isConnected) loadTasks();
    }, [
        isConnected,
        loadTasks
    ]);
    const submitAnswer = async (task)=>{
        const key = `${task.batchId}-${task.taskIndex}`;
        const ans = answers[key]?.trim();
        if (!ans) return;
        setSending((s)=>({
                ...s,
                [key]: true
            }));
        try {
            const contract = getContract(true);
            if (!contract) throw new Error("Contrato indisponível");
            const tx = await contract.submitAnswer(task.batchId, task.taskIndex, ans);
            await tx.wait();
            setDone((d)=>({
                    ...d,
                    [key]: true
                }));
        } catch (e) {
            setError(e.reason || e.message);
        } finally{
            setSending((s)=>({
                    ...s,
                    [key]: false
                }));
        }
    };
    const timeLeft = (deadline)=>{
        const diff = deadline - Date.now() / 1000;
        if (diff <= 0) return "Expirado";
        const h = Math.floor(diff / 3600);
        const m = Math.floor(diff % 3600 / 60);
        return `${h}h ${m}m restantes`;
    };
    const s = {
        page: {
            background: "var(--bg)",
            minHeight: "100vh",
            paddingTop: "7rem"
        },
        wrap: {
            maxWidth: "800px",
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
            marginBottom: "2rem"
        },
        topRow: {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "2.5rem",
            paddingBottom: "1.5rem",
            borderBottom: "1px solid var(--border)"
        },
        countBadge: {
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            fontFamily: "var(--font-mono), monospace",
            fontSize: "0.75rem",
            color: tasks.length > 0 ? "var(--accent3)" : "var(--muted)"
        },
        dot: {
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            background: tasks.length > 0 ? "var(--accent3)" : "var(--muted)"
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
            letterSpacing: "0.08em",
            transition: "all 0.2s"
        },
        taskCard: {
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: "6px",
            padding: "2rem",
            marginBottom: "1rem",
            position: "relative",
            overflow: "hidden",
            transition: "all 0.3s"
        },
        cardTop: {
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            marginBottom: "1.2rem"
        },
        badges: {
            display: "flex",
            gap: "0.5rem",
            flexWrap: "wrap"
        },
        batchBadge: {
            fontFamily: "var(--font-mono), monospace",
            fontSize: "0.62rem",
            letterSpacing: "0.1em",
            padding: "0.25rem 0.6rem",
            borderRadius: "2px",
            background: "var(--bg2)",
            color: "var(--ink2)",
            border: "1px solid var(--border)"
        },
        typeBadge: {
            fontFamily: "var(--font-mono), monospace",
            fontSize: "0.62rem",
            letterSpacing: "0.1em",
            padding: "0.25rem 0.6rem",
            borderRadius: "2px",
            color: "var(--accent2)",
            border: "1px solid rgba(26,58,143,0.2)",
            background: "rgba(26,58,143,0.06)"
        },
        time: {
            fontFamily: "var(--font-mono), monospace",
            fontSize: "0.65rem",
            color: "var(--muted)"
        },
        content: {
            fontSize: "0.95rem",
            color: "var(--ink)",
            lineHeight: 1.7,
            marginBottom: "1.5rem",
            fontWeight: 400
        },
        reward: {
            fontFamily: "var(--font-mono), monospace",
            fontSize: "0.72rem",
            color: "var(--muted)",
            marginBottom: "1.2rem"
        },
        inputRow: {
            display: "flex",
            gap: "0.75rem"
        },
        input: {
            flex: 1,
            background: "var(--bg)",
            border: "1px solid var(--border)",
            borderRadius: "4px",
            padding: "0.75rem 1rem",
            fontSize: "0.9rem",
            color: "var(--ink)",
            fontFamily: "var(--font-sans), sans-serif",
            outline: "none"
        },
        sendBtn: {
            background: "var(--ink)",
            color: "var(--bg)",
            border: "none",
            borderRadius: "2px",
            padding: "0.75rem 1.5rem",
            fontWeight: 700,
            fontSize: "0.78rem",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            cursor: "none",
            fontFamily: "var(--font-sans), sans-serif",
            transition: "all 0.2s",
            whiteSpace: "nowrap"
        },
        doneBadge: {
            background: "rgba(45,138,78,0.08)",
            border: "1px solid rgba(45,138,78,0.2)",
            borderRadius: "4px",
            padding: "0.75rem 1rem",
            fontFamily: "var(--font-mono), monospace",
            fontSize: "0.75rem",
            color: "var(--accent3)",
            textAlign: "center"
        },
        connectBox: {
            textAlign: "center",
            padding: "5rem 2rem"
        },
        connectIcon: {
            fontSize: "3rem",
            marginBottom: "1.5rem",
            display: "block"
        },
        connectTitle: {
            fontFamily: "var(--font-serif), serif",
            fontSize: "2rem",
            color: "var(--ink)",
            marginBottom: "0.5rem"
        },
        connectSub: {
            color: "var(--ink2)",
            fontSize: "0.9rem",
            fontWeight: 300,
            marginBottom: "2rem"
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
        },
        emptyBox: {
            textAlign: "center",
            padding: "4rem 2rem",
            border: "1px dashed var(--border)",
            borderRadius: "6px"
        },
        emptyText: {
            fontFamily: "var(--font-serif), serif",
            fontSize: "1.5rem",
            color: "var(--muted)",
            fontStyle: "italic"
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: s.page,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: s.wrap,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    style: s.eyebrow,
                    children: "// Validar Tarefas"
                }, void 0, false, {
                    fileName: "[project]/globalmind-frontend/app/tarefas/page.tsx",
                    lineNumber: 114,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                    style: s.title,
                    children: [
                        "Responda e ",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("em", {
                            style: {
                                fontStyle: "italic",
                                color: "var(--accent)"
                            },
                            children: "ganhe GMND"
                        }, void 0, false, {
                            fileName: "[project]/globalmind-frontend/app/tarefas/page.tsx",
                            lineNumber: 116,
                            columnNumber: 22
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/globalmind-frontend/app/tarefas/page.tsx",
                    lineNumber: 115,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    style: s.subtitle,
                    children: "Valide tarefas de IA e receba recompensas automáticas em GMND ao acertar o consenso."
                }, void 0, false, {
                    fileName: "[project]/globalmind-frontend/app/tarefas/page.tsx",
                    lineNumber: 118,
                    columnNumber: 9
                }, this),
                !isConnected ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: s.connectBox,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            style: s.connectIcon,
                            children: "⚡"
                        }, void 0, false, {
                            fileName: "[project]/globalmind-frontend/app/tarefas/page.tsx",
                            lineNumber: 122,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            style: s.connectTitle,
                            children: "Conecte sua carteira"
                        }, void 0, false, {
                            fileName: "[project]/globalmind-frontend/app/tarefas/page.tsx",
                            lineNumber: 123,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            style: s.connectSub,
                            children: "Para ver e responder tarefas você precisa conectar uma carteira."
                        }, void 0, false, {
                            fileName: "[project]/globalmind-frontend/app/tarefas/page.tsx",
                            lineNumber: 124,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: connect,
                            style: s.connectBtn,
                            children: "Conectar Carteira"
                        }, void 0, false, {
                            fileName: "[project]/globalmind-frontend/app/tarefas/page.tsx",
                            lineNumber: 125,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/globalmind-frontend/app/tarefas/page.tsx",
                    lineNumber: 121,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: s.topRow,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: s.countBadge,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: s.dot
                                        }, void 0, false, {
                                            fileName: "[project]/globalmind-frontend/app/tarefas/page.tsx",
                                            lineNumber: 131,
                                            columnNumber: 17
                                        }, this),
                                        loading ? "Carregando..." : `${tasks.length} tarefa${tasks.length !== 1 ? "s" : ""} disponível`
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/globalmind-frontend/app/tarefas/page.tsx",
                                    lineNumber: 130,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: loadTasks,
                                    style: s.refreshBtn,
                                    children: "↻ Atualizar"
                                }, void 0, false, {
                                    fileName: "[project]/globalmind-frontend/app/tarefas/page.tsx",
                                    lineNumber: 134,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/globalmind-frontend/app/tarefas/page.tsx",
                            lineNumber: 129,
                            columnNumber: 13
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
                            fileName: "[project]/globalmind-frontend/app/tarefas/page.tsx",
                            lineNumber: 137,
                            columnNumber: 23
                        }, this),
                        tasks.length === 0 && !loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: s.emptyBox,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: s.emptyText,
                                children: "Nenhuma tarefa disponível no momento."
                            }, void 0, false, {
                                fileName: "[project]/globalmind-frontend/app/tarefas/page.tsx",
                                lineNumber: 141,
                                columnNumber: 17
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/globalmind-frontend/app/tarefas/page.tsx",
                            lineNumber: 140,
                            columnNumber: 15
                        }, this) : tasks.map((task)=>{
                            const key = `${task.batchId}-${task.taskIndex}`;
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: s.taskCard,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            position: "absolute",
                                            bottom: 0,
                                            left: 0,
                                            right: 0,
                                            height: "2px",
                                            background: "var(--accent)",
                                            transform: done[key] ? "scaleX(1)" : "scaleX(0)",
                                            transformOrigin: "left",
                                            transition: "transform 0.35s"
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/globalmind-frontend/app/tarefas/page.tsx",
                                        lineNumber: 148,
                                        columnNumber: 21
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: s.cardTop,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: s.badges,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        style: s.batchBadge,
                                                        children: [
                                                            "Batch #",
                                                            task.batchId
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/globalmind-frontend/app/tarefas/page.tsx",
                                                        lineNumber: 151,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        style: s.typeBadge,
                                                        children: __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$lib$2f$contract$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TASK_TYPES"].find((t)=>t.value === task.taskType)?.label
                                                    }, void 0, false, {
                                                        fileName: "[project]/globalmind-frontend/app/tarefas/page.tsx",
                                                        lineNumber: 152,
                                                        columnNumber: 25
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/globalmind-frontend/app/tarefas/page.tsx",
                                                lineNumber: 150,
                                                columnNumber: 23
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: s.time,
                                                children: timeLeft(task.deadline)
                                            }, void 0, false, {
                                                fileName: "[project]/globalmind-frontend/app/tarefas/page.tsx",
                                                lineNumber: 154,
                                                columnNumber: 23
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/globalmind-frontend/app/tarefas/page.tsx",
                                        lineNumber: 149,
                                        columnNumber: 21
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        style: s.content,
                                        children: task.content
                                    }, void 0, false, {
                                        fileName: "[project]/globalmind-frontend/app/tarefas/page.tsx",
                                        lineNumber: 156,
                                        columnNumber: 21
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        style: s.reward,
                                        children: [
                                            "Recompensa do batch: ",
                                            Number(task.reward).toFixed(0),
                                            " GMND (dividida entre validadores corretos)"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/globalmind-frontend/app/tarefas/page.tsx",
                                        lineNumber: 157,
                                        columnNumber: 21
                                    }, this),
                                    done[key] ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: s.doneBadge,
                                        children: "✓ Resposta enviada — aguardando consenso"
                                    }, void 0, false, {
                                        fileName: "[project]/globalmind-frontend/app/tarefas/page.tsx",
                                        lineNumber: 159,
                                        columnNumber: 23
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: s.inputRow,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                value: answers[key] || "",
                                                onChange: (e)=>setAnswers((a)=>({
                                                            ...a,
                                                            [key]: e.target.value
                                                        })),
                                                placeholder: "Sua resposta...",
                                                style: s.input,
                                                onKeyDown: (e)=>e.key === "Enter" && submitAnswer(task)
                                            }, void 0, false, {
                                                fileName: "[project]/globalmind-frontend/app/tarefas/page.tsx",
                                                lineNumber: 162,
                                                columnNumber: 25
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>submitAnswer(task),
                                                disabled: sending[key],
                                                style: {
                                                    ...s.sendBtn,
                                                    opacity: sending[key] ? 0.6 : 1
                                                },
                                                children: sending[key] ? "..." : "Enviar"
                                            }, void 0, false, {
                                                fileName: "[project]/globalmind-frontend/app/tarefas/page.tsx",
                                                lineNumber: 169,
                                                columnNumber: 25
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/globalmind-frontend/app/tarefas/page.tsx",
                                        lineNumber: 161,
                                        columnNumber: 23
                                    }, this)
                                ]
                            }, key, true, {
                                fileName: "[project]/globalmind-frontend/app/tarefas/page.tsx",
                                lineNumber: 147,
                                columnNumber: 19
                            }, this);
                        })
                    ]
                }, void 0, true)
            ]
        }, void 0, true, {
            fileName: "[project]/globalmind-frontend/app/tarefas/page.tsx",
            lineNumber: 113,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/globalmind-frontend/app/tarefas/page.tsx",
        lineNumber: 112,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=globalmind-frontend_app_tarefas_page_tsx_d6c72e52._.js.map