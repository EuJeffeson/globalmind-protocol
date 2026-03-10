module.exports = [
"[project]/globalmind-frontend/app/empresa/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>EmpresaPage
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
function EmpresaPage() {
    const { isConnected, connect, getContract } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$lib$2f$useWeb3$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useWeb3"])();
    const [tasks, setTasks] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([
        {
            id: crypto.randomUUID(),
            content: "",
            taskType: 0
        }
    ]);
    const [reward, setReward] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("100");
    const [deadline, setDeadline] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("24");
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [step, setStep] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("idle");
    const [txHash, setTxHash] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const addTask = ()=>setTasks((t)=>[
                ...t,
                {
                    id: crypto.randomUUID(),
                    content: "",
                    taskType: 0
                }
            ]);
    const removeTask = (id)=>setTasks((t)=>t.filter((x)=>x.id !== id));
    const updateTask = (id, field, value)=>setTasks((t)=>t.map((x)=>x.id === id ? {
                    ...x,
                    [field]: value
                } : x));
    const submit = async ()=>{
        if (!isConnected) {
            connect();
            return;
        }
        if (tasks.some((t)=>!t.content.trim())) {
            setError("Preencha o conteúdo de todas as tarefas");
            return;
        }
        setLoading(true);
        setError("");
        setTxHash("");
        try {
            const contract = getContract(true);
            if (!contract) throw new Error("Contrato não disponível");
            const rewardWei = __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$ethers$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__ethers$3e$__["ethers"].parseUnits(reward, 18);
            setStep("approving");
            const token = new __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$ethers$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__ethers$3e$__["ethers"].Contract(__TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$lib$2f$contract$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GMND_TOKEN_ADDRESS"], __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$lib$2f$contract$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GMND_TOKEN_ABI"], contract.runner);
            const approveTx = await token.approve(__TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$lib$2f$contract$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CONTRACT_ADDRESS"], rewardWei);
            await approveTx.wait();
            setStep("creating");
            const taskIds = tasks.map((_, i)=>`task-${Date.now()}-${i}`);
            const contents = tasks.map((t)=>t.content.trim());
            const taskTypes = tasks.map((t)=>t.taskType);
            const deadlineSecs = BigInt(Number(deadline) * 3600);
            const tx = await contract.createBatch(taskIds, contents, taskTypes, deadlineSecs, rewardWei);
            setTxHash(tx.hash);
            await tx.wait();
            setStep("done");
        } catch (e) {
            setError(e.reason || e.message || "Erro ao enviar transação");
            setStep("idle");
        } finally{
            setLoading(false);
        }
    };
    const stepLabel = {
        idle: isConnected ? `Criar Batch · ${reward} GMND` : "Conectar Carteira",
        approving: "1/2 — Aprovando GMND...",
        creating: "2/2 — Criando batch...",
        done: "✅ Batch criado com sucesso!"
    }[step];
    const s = {
        page: {
            background: "var(--bg)",
            minHeight: "100vh",
            paddingTop: "7rem"
        },
        wrap: {
            maxWidth: "760px",
            margin: "0 auto",
            padding: "3rem 2rem 6rem"
        },
        // Header
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
            marginBottom: "3rem"
        },
        // Section label
        label: {
            fontFamily: "var(--font-mono), monospace",
            fontSize: "0.68rem",
            color: "var(--muted)",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            marginBottom: "1rem",
            display: "block"
        },
        // Task card
        taskCard: {
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: "6px",
            padding: "1.8rem",
            marginBottom: "0.75rem"
        },
        taskHeader: {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "1rem"
        },
        taskNum: {
            fontFamily: "var(--font-mono), monospace",
            fontSize: "0.65rem",
            color: "var(--muted)",
            letterSpacing: "0.1em"
        },
        removeBtn: {
            fontFamily: "var(--font-mono), monospace",
            fontSize: "0.65rem",
            color: "var(--accent)",
            background: "none",
            border: "none",
            cursor: "none",
            letterSpacing: "0.05em"
        },
        textarea: {
            width: "100%",
            background: "var(--bg)",
            border: "1px solid var(--border)",
            borderRadius: "4px",
            padding: "0.85rem 1rem",
            fontSize: "0.9rem",
            color: "var(--ink)",
            fontFamily: "var(--font-sans), sans-serif",
            lineHeight: 1.6,
            resize: "none",
            outline: "none",
            height: "90px",
            marginBottom: "0.75rem"
        },
        select: {
            width: "100%",
            background: "var(--bg)",
            border: "1px solid var(--border)",
            borderRadius: "4px",
            padding: "0.75rem 1rem",
            fontSize: "0.85rem",
            color: "var(--ink)",
            fontFamily: "var(--font-sans), sans-serif",
            outline: "none"
        },
        addBtn: {
            width: "100%",
            padding: "1rem",
            border: "1px dashed var(--border)",
            borderRadius: "6px",
            background: "none",
            color: "var(--muted)",
            fontSize: "0.85rem",
            fontFamily: "var(--font-sans), sans-serif",
            cursor: "none",
            marginBottom: "2rem",
            transition: "all 0.2s",
            letterSpacing: "0.05em"
        },
        // Grid
        grid2: {
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1.2rem",
            marginBottom: "2rem"
        },
        inputWrap: {
            display: "flex",
            flexDirection: "column"
        },
        inputLabel: {
            fontFamily: "var(--font-mono), monospace",
            fontSize: "0.65rem",
            color: "var(--muted)",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            marginBottom: "0.5rem"
        },
        input: {
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: "4px",
            padding: "0.85rem 1rem",
            fontSize: "0.95rem",
            color: "var(--ink)",
            fontFamily: "var(--font-mono), monospace",
            outline: "none"
        },
        inputHint: {
            fontFamily: "var(--font-mono), monospace",
            fontSize: "0.6rem",
            color: "var(--muted)",
            marginTop: "0.4rem",
            letterSpacing: "0.05em"
        },
        // Summary
        summary: {
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: "6px",
            padding: "1.8rem",
            marginBottom: "1.5rem"
        },
        summaryRow: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingBottom: "0.75rem",
            marginBottom: "0.75rem",
            borderBottom: "1px solid var(--border2)"
        },
        summaryLast: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: "0.5rem"
        },
        summaryKey: {
            fontSize: "0.85rem",
            color: "var(--ink2)"
        },
        summaryVal: {
            fontFamily: "var(--font-mono), monospace",
            fontSize: "0.85rem",
            color: "var(--ink)",
            fontWeight: 500
        },
        // Alerts
        alertWarn: {
            background: "rgba(26,58,143,0.06)",
            border: "1px solid rgba(26,58,143,0.15)",
            borderRadius: "4px",
            padding: "0.85rem 1.2rem",
            fontSize: "0.82rem",
            color: "var(--accent2)",
            fontFamily: "var(--font-sans), sans-serif",
            marginBottom: "1rem",
            lineHeight: 1.5
        },
        alertErr: {
            background: "rgba(185,28,28,0.05)",
            border: "1px solid rgba(185,28,28,0.15)",
            borderRadius: "4px",
            padding: "0.85rem 1.2rem",
            fontSize: "0.82rem",
            color: "#b91c1c",
            marginBottom: "1rem"
        },
        alertOk: {
            background: "rgba(45,138,78,0.06)",
            border: "1px solid rgba(45,138,78,0.2)",
            borderRadius: "4px",
            padding: "0.85rem 1.2rem",
            fontSize: "0.82rem",
            color: "var(--accent3)",
            marginBottom: "1rem"
        },
        alertNoWallet: {
            background: "rgba(200,82,42,0.06)",
            border: "1px solid rgba(200,82,42,0.15)",
            borderRadius: "4px",
            padding: "1rem 1.2rem",
            fontSize: "0.85rem",
            color: "var(--accent)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "2rem"
        },
        // CTA
        ctaBtn: {
            width: "100%",
            padding: "1.1rem",
            borderRadius: "2px",
            background: step === "done" ? "var(--accent3)" : "var(--ink)",
            color: "var(--bg)",
            fontWeight: 700,
            fontSize: "0.85rem",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            border: "none",
            cursor: loading ? "not-allowed" : "none",
            opacity: loading ? 0.7 : 1,
            transition: "all 0.25s",
            fontFamily: "var(--font-sans), sans-serif"
        },
        connectBtn: {
            background: "var(--accent)",
            color: "white",
            border: "none",
            borderRadius: "2px",
            padding: "0.5rem 1.2rem",
            fontSize: "0.78rem",
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            cursor: "none",
            fontFamily: "var(--font-sans), sans-serif"
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: s.page,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: s.wrap,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    style: s.eyebrow,
                    children: "// Postar Tarefas"
                }, void 0, false, {
                    fileName: "[project]/globalmind-frontend/app/empresa/page.tsx",
                    lineNumber: 115,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                    style: s.title,
                    children: [
                        "Criar um ",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("em", {
                            style: {
                                fontStyle: "italic",
                                color: "var(--accent)"
                            },
                            children: "Batch"
                        }, void 0, false, {
                            fileName: "[project]/globalmind-frontend/app/empresa/page.tsx",
                            lineNumber: 117,
                            columnNumber: 20
                        }, this),
                        " de Validação"
                    ]
                }, void 0, true, {
                    fileName: "[project]/globalmind-frontend/app/empresa/page.tsx",
                    lineNumber: 116,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    style: s.subtitle,
                    children: "Defina as tarefas, deposite a recompensa em GMND e a rede global valida automaticamente."
                }, void 0, false, {
                    fileName: "[project]/globalmind-frontend/app/empresa/page.tsx",
                    lineNumber: 119,
                    columnNumber: 9
                }, this),
                !isConnected && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: s.alertNoWallet,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            children: "Conecte sua carteira para criar um batch"
                        }, void 0, false, {
                            fileName: "[project]/globalmind-frontend/app/empresa/page.tsx",
                            lineNumber: 126,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: connect,
                            style: s.connectBtn,
                            children: "Conectar"
                        }, void 0, false, {
                            fileName: "[project]/globalmind-frontend/app/empresa/page.tsx",
                            lineNumber: 127,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/globalmind-frontend/app/empresa/page.tsx",
                    lineNumber: 125,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    style: s.label,
                    children: "Tarefas de Validação"
                }, void 0, false, {
                    fileName: "[project]/globalmind-frontend/app/empresa/page.tsx",
                    lineNumber: 132,
                    columnNumber: 9
                }, this),
                tasks.map((task, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: s.taskCard,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: s.taskHeader,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: s.taskNum,
                                        children: [
                                            "TAREFA #",
                                            i + 1
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/globalmind-frontend/app/empresa/page.tsx",
                                        lineNumber: 137,
                                        columnNumber: 15
                                    }, this),
                                    tasks.length > 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>removeTask(task.id),
                                        style: s.removeBtn,
                                        children: "— remover"
                                    }, void 0, false, {
                                        fileName: "[project]/globalmind-frontend/app/empresa/page.tsx",
                                        lineNumber: 139,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/globalmind-frontend/app/empresa/page.tsx",
                                lineNumber: 136,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                value: task.content,
                                onChange: (e)=>updateTask(task.id, "content", e.target.value),
                                placeholder: "Descreva a tarefa de validação...",
                                style: s.textarea
                            }, void 0, false, {
                                fileName: "[project]/globalmind-frontend/app/empresa/page.tsx",
                                lineNumber: 142,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                value: task.taskType,
                                onChange: (e)=>updateTask(task.id, "taskType", Number(e.target.value)),
                                style: s.select,
                                children: __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$lib$2f$contract$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TASK_TYPES"].map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: t.value,
                                        children: t.label
                                    }, t.value, false, {
                                        fileName: "[project]/globalmind-frontend/app/empresa/page.tsx",
                                        lineNumber: 153,
                                        columnNumber: 36
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/globalmind-frontend/app/empresa/page.tsx",
                                lineNumber: 148,
                                columnNumber: 13
                            }, this)
                        ]
                    }, task.id, true, {
                        fileName: "[project]/globalmind-frontend/app/empresa/page.tsx",
                        lineNumber: 135,
                        columnNumber: 11
                    }, this)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: addTask,
                    style: s.addBtn,
                    children: "+ Adicionar tarefa"
                }, void 0, false, {
                    fileName: "[project]/globalmind-frontend/app/empresa/page.tsx",
                    lineNumber: 158,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: s.grid2,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: s.inputWrap,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: s.inputLabel,
                                    children: "Recompensa Total (GMND)"
                                }, void 0, false, {
                                    fileName: "[project]/globalmind-frontend/app/empresa/page.tsx",
                                    lineNumber: 163,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "number",
                                    min: "1",
                                    value: reward,
                                    onChange: (e)=>setReward(e.target.value),
                                    style: s.input
                                }, void 0, false, {
                                    fileName: "[project]/globalmind-frontend/app/empresa/page.tsx",
                                    lineNumber: 164,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: s.inputHint,
                                    children: "70% validadores · 20% burn · 10% treasury"
                                }, void 0, false, {
                                    fileName: "[project]/globalmind-frontend/app/empresa/page.tsx",
                                    lineNumber: 165,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/globalmind-frontend/app/empresa/page.tsx",
                            lineNumber: 162,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: s.inputWrap,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: s.inputLabel,
                                    children: "Prazo (horas)"
                                }, void 0, false, {
                                    fileName: "[project]/globalmind-frontend/app/empresa/page.tsx",
                                    lineNumber: 168,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "number",
                                    min: "1",
                                    max: "168",
                                    value: deadline,
                                    onChange: (e)=>setDeadline(e.target.value),
                                    style: s.input
                                }, void 0, false, {
                                    fileName: "[project]/globalmind-frontend/app/empresa/page.tsx",
                                    lineNumber: 169,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: s.inputHint,
                                    children: "Mínimo 1h · Máximo 7 dias"
                                }, void 0, false, {
                                    fileName: "[project]/globalmind-frontend/app/empresa/page.tsx",
                                    lineNumber: 170,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/globalmind-frontend/app/empresa/page.tsx",
                            lineNumber: 167,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/globalmind-frontend/app/empresa/page.tsx",
                    lineNumber: 161,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: s.summary,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: s.summaryRow,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: s.summaryKey,
                                    children: "Tarefas"
                                }, void 0, false, {
                                    fileName: "[project]/globalmind-frontend/app/empresa/page.tsx",
                                    lineNumber: 177,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: s.summaryVal,
                                    children: tasks.length
                                }, void 0, false, {
                                    fileName: "[project]/globalmind-frontend/app/empresa/page.tsx",
                                    lineNumber: 178,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/globalmind-frontend/app/empresa/page.tsx",
                            lineNumber: 176,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: s.summaryRow,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: s.summaryKey,
                                    children: "Para validadores (70%)"
                                }, void 0, false, {
                                    fileName: "[project]/globalmind-frontend/app/empresa/page.tsx",
                                    lineNumber: 181,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: s.summaryVal,
                                    children: [
                                        (Number(reward) * 0.7).toFixed(0),
                                        " GMND"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/globalmind-frontend/app/empresa/page.tsx",
                                    lineNumber: 182,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/globalmind-frontend/app/empresa/page.tsx",
                            lineNumber: 180,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: s.summaryRow,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: s.summaryKey,
                                    children: "🔥 Queimado (20%)"
                                }, void 0, false, {
                                    fileName: "[project]/globalmind-frontend/app/empresa/page.tsx",
                                    lineNumber: 185,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        ...s.summaryVal,
                                        color: "var(--accent)"
                                    },
                                    children: [
                                        (Number(reward) * 0.2).toFixed(0),
                                        " GMND"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/globalmind-frontend/app/empresa/page.tsx",
                                    lineNumber: 186,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/globalmind-frontend/app/empresa/page.tsx",
                            lineNumber: 184,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: s.summaryRow,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: s.summaryKey,
                                    children: "Treasury (10%)"
                                }, void 0, false, {
                                    fileName: "[project]/globalmind-frontend/app/empresa/page.tsx",
                                    lineNumber: 189,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: s.summaryVal,
                                    children: [
                                        (Number(reward) * 0.1).toFixed(0),
                                        " GMND"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/globalmind-frontend/app/empresa/page.tsx",
                                    lineNumber: 190,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/globalmind-frontend/app/empresa/page.tsx",
                            lineNumber: 188,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: s.summaryLast,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        ...s.summaryKey,
                                        fontWeight: 700,
                                        color: "var(--ink)"
                                    },
                                    children: "Total a depositar"
                                }, void 0, false, {
                                    fileName: "[project]/globalmind-frontend/app/empresa/page.tsx",
                                    lineNumber: 193,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        ...s.summaryVal,
                                        fontSize: "1.1rem",
                                        color: "var(--ink)",
                                        fontWeight: 700
                                    },
                                    children: [
                                        reward,
                                        " GMND"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/globalmind-frontend/app/empresa/page.tsx",
                                    lineNumber: 194,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/globalmind-frontend/app/empresa/page.tsx",
                            lineNumber: 192,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/globalmind-frontend/app/empresa/page.tsx",
                    lineNumber: 175,
                    columnNumber: 9
                }, this),
                isConnected && step === "idle" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: s.alertWarn,
                    children: "ℹ️ Serão 2 transações: primeiro você aprova o gasto de GMND, depois cria o batch."
                }, void 0, false, {
                    fileName: "[project]/globalmind-frontend/app/empresa/page.tsx",
                    lineNumber: 200,
                    columnNumber: 11
                }, this),
                error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: s.alertErr,
                    children: error
                }, void 0, false, {
                    fileName: "[project]/globalmind-frontend/app/empresa/page.tsx",
                    lineNumber: 205,
                    columnNumber: 19
                }, this),
                txHash && step === "done" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: s.alertOk,
                    children: [
                        "✅ Batch criado!",
                        " ",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                            href: `https://sepolia.etherscan.io/tx/${txHash}`,
                            target: "_blank",
                            rel: "noopener noreferrer",
                            style: {
                                color: "var(--accent3)",
                                textDecoration: "underline"
                            },
                            children: "Ver no Etherscan →"
                        }, void 0, false, {
                            fileName: "[project]/globalmind-frontend/app/empresa/page.tsx",
                            lineNumber: 210,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/globalmind-frontend/app/empresa/page.tsx",
                    lineNumber: 208,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: submit,
                    disabled: loading || step === "done",
                    style: s.ctaBtn,
                    children: stepLabel
                }, void 0, false, {
                    fileName: "[project]/globalmind-frontend/app/empresa/page.tsx",
                    lineNumber: 216,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/globalmind-frontend/app/empresa/page.tsx",
            lineNumber: 112,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/globalmind-frontend/app/empresa/page.tsx",
        lineNumber: 111,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=globalmind-frontend_app_empresa_page_tsx_b2bcc74c._.js.map