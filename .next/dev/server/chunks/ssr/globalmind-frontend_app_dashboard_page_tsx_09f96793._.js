module.exports = [
"[project]/globalmind-frontend/app/dashboard/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DashboardPage
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
function DashboardPage() {
    const { isConnected, connect, address, getContract, provider } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$lib$2f$useWeb3$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useWeb3"])();
    const [profile, setProfile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        score: 0,
        totalTasks: 0,
        earned: "0"
    });
    const [gmndBal, setGmndBal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("0");
    const [ethBal, setEthBal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("0");
    const [netStats, setNetStats] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        batches: 0,
        burned: "0",
        rewarded: "0"
    });
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const load = (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async ()=>{
        if (!address) return;
        setLoading(true);
        try {
            const contract = getContract(false);
            if (!contract) return;
            const [p, ns] = await Promise.all([
                contract.getNodeProfile(address),
                contract.getNetworkStats()
            ]);
            setProfile({
                score: Number(p.score),
                totalTasks: Number(p.totalTasks),
                earned: __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$ethers$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__ethers$3e$__["ethers"].formatUnits(p.earned, 18)
            });
            setNetStats({
                batches: Number(ns._totalBatches),
                burned: Number(__TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$ethers$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__ethers$3e$__["ethers"].formatUnits(ns._totalBurned, 18)).toFixed(0),
                rewarded: Number(__TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$ethers$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__ethers$3e$__["ethers"].formatUnits(ns._totalRewarded, 18)).toFixed(0)
            });
            if (provider) {
                const eth = await provider.getBalance(address);
                setEthBal(Number(__TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$ethers$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__ethers$3e$__["ethers"].formatEther(eth)).toFixed(4));
                const token = new __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$ethers$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__ethers$3e$__["ethers"].Contract(__TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$lib$2f$contract$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GMND_TOKEN_ADDRESS"], __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$lib$2f$contract$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GMND_TOKEN_ABI"], provider);
                const gmnd = await token.balanceOf(address);
                setGmndBal(Number(__TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$ethers$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__ethers$3e$__["ethers"].formatUnits(gmnd, 18)).toLocaleString());
            }
        } catch (e) {
            console.error(e);
        } finally{
            setLoading(false);
        }
    }, [
        address,
        getContract,
        provider
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (isConnected) load();
    }, [
        isConnected,
        load
    ]);
    const level = profile.score >= 200 ? "Expert" : profile.score >= 50 ? "Validador" : "Iniciante";
    const levelColor = profile.score >= 200 ? "var(--accent)" : profile.score >= 50 ? "var(--accent2)" : "var(--muted)";
    const progress = Math.min(profile.score / 500 * 100, 100);
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
            marginBottom: "2.5rem"
        },
        profileCard: {
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: "6px",
            padding: "2rem",
            marginBottom: "1.5rem"
        },
        profileTop: {
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            marginBottom: "1.5rem"
        },
        levelBadge: {
            fontFamily: "var(--font-mono), monospace",
            fontSize: "0.65rem",
            letterSpacing: "0.1em",
            padding: "0.3rem 0.75rem",
            borderRadius: "2px",
            border: `1px solid ${levelColor}`,
            color: levelColor,
            background: `${levelColor}15`
        },
        onlineDot: {
            display: "flex",
            alignItems: "center",
            gap: "0.4rem",
            fontFamily: "var(--font-mono), monospace",
            fontSize: "0.65rem",
            color: "var(--accent3)"
        },
        addr: {
            fontFamily: "var(--font-mono), monospace",
            fontSize: "0.75rem",
            color: "var(--ink2)",
            marginBottom: "1.2rem",
            wordBreak: "break-all"
        },
        progressBar: {
            height: "4px",
            background: "var(--bg2)",
            borderRadius: "2px",
            overflow: "hidden",
            marginBottom: "0.5rem"
        },
        progressFill: {
            height: "100%",
            width: `${progress}%`,
            background: "var(--accent)",
            borderRadius: "2px",
            transition: "width 1s ease"
        },
        progressLabel: {
            display: "flex",
            justifyContent: "space-between",
            fontFamily: "var(--font-mono), monospace",
            fontSize: "0.62rem",
            color: "var(--muted)"
        },
        grid4: {
            display: "grid",
            gridTemplateColumns: "repeat(4,1fr)",
            gap: "1rem",
            marginBottom: "1.5rem"
        },
        grid2: {
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1rem",
            marginBottom: "1.5rem"
        },
        statCard: {
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: "6px",
            padding: "1.5rem",
            transition: "all 0.3s"
        },
        statVal: {
            fontFamily: "var(--font-serif), serif",
            fontSize: "2.2rem",
            lineHeight: 1,
            color: "var(--accent)",
            display: "block",
            marginBottom: "0.4rem"
        },
        statKey: {
            fontFamily: "var(--font-mono), monospace",
            fontSize: "0.62rem",
            color: "var(--muted)",
            textTransform: "uppercase",
            letterSpacing: "0.1em"
        },
        sectionTitle: {
            fontFamily: "var(--font-mono), monospace",
            fontSize: "0.65rem",
            color: "var(--muted)",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            marginBottom: "1rem",
            display: "block",
            marginTop: "0.5rem"
        },
        netCard: {
            background: "var(--ink)",
            borderRadius: "6px",
            padding: "2rem",
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gap: "1.5rem"
        },
        netVal: {
            fontFamily: "var(--font-serif), serif",
            fontSize: "2rem",
            color: "var(--bg)",
            display: "block",
            marginBottom: "0.3rem"
        },
        netKey: {
            fontFamily: "var(--font-mono), monospace",
            fontSize: "0.6rem",
            color: "rgba(244,241,235,0.4)",
            textTransform: "uppercase",
            letterSpacing: "0.1em"
        },
        howCard: {
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: "6px",
            padding: "2rem"
        },
        howTitle: {
            fontSize: "0.9rem",
            fontWeight: 800,
            marginBottom: "1.2rem",
            color: "var(--ink)"
        },
        howRow: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingBottom: "0.75rem",
            marginBottom: "0.75rem",
            borderBottom: "1px solid var(--border2)",
            fontSize: "0.83rem"
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
                        children: "📊"
                    }, void 0, false, {
                        fileName: "[project]/globalmind-frontend/app/dashboard/page.tsx",
                        lineNumber: 95,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        style: {
                            fontFamily: "var(--font-serif), serif",
                            fontSize: "2rem",
                            color: "var(--ink)",
                            marginBottom: "0.5rem"
                        },
                        children: "Dashboard do Nó"
                    }, void 0, false, {
                        fileName: "[project]/globalmind-frontend/app/dashboard/page.tsx",
                        lineNumber: 96,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        style: {
                            color: "var(--ink2)",
                            fontSize: "0.9rem",
                            fontWeight: 300,
                            marginBottom: "2rem"
                        },
                        children: "Conecte sua carteira para ver seu perfil PoEC."
                    }, void 0, false, {
                        fileName: "[project]/globalmind-frontend/app/dashboard/page.tsx",
                        lineNumber: 97,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: connect,
                        style: s.connectBtn,
                        children: "Conectar Carteira"
                    }, void 0, false, {
                        fileName: "[project]/globalmind-frontend/app/dashboard/page.tsx",
                        lineNumber: 98,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/globalmind-frontend/app/dashboard/page.tsx",
                lineNumber: 94,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/globalmind-frontend/app/dashboard/page.tsx",
            lineNumber: 93,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/globalmind-frontend/app/dashboard/page.tsx",
        lineNumber: 92,
        columnNumber: 5
    }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: s.page,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: s.wrap,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    style: s.eyebrow,
                    children: "// Dashboard do Nó"
                }, void 0, false, {
                    fileName: "[project]/globalmind-frontend/app/dashboard/page.tsx",
                    lineNumber: 107,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                    style: s.title,
                    children: [
                        "Seu ",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("em", {
                            style: {
                                fontStyle: "italic",
                                color: "var(--accent)"
                            },
                            children: "Score PoEC"
                        }, void 0, false, {
                            fileName: "[project]/globalmind-frontend/app/dashboard/page.tsx",
                            lineNumber: 109,
                            columnNumber: 15
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/globalmind-frontend/app/dashboard/page.tsx",
                    lineNumber: 108,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    style: s.subtitle,
                    children: "Perfil, recompensas acumuladas e estatísticas da rede global."
                }, void 0, false, {
                    fileName: "[project]/globalmind-frontend/app/dashboard/page.tsx",
                    lineNumber: 111,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: s.profileCard,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: s.profileTop,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: "flex",
                                        gap: "0.75rem",
                                        alignItems: "center"
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: s.levelBadge,
                                            children: level
                                        }, void 0, false, {
                                            fileName: "[project]/globalmind-frontend/app/dashboard/page.tsx",
                                            lineNumber: 117,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: s.onlineDot,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        width: "6px",
                                                        height: "6px",
                                                        borderRadius: "50%",
                                                        background: "var(--accent3)",
                                                        display: "inline-block"
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/globalmind-frontend/app/dashboard/page.tsx",
                                                    lineNumber: 118,
                                                    columnNumber: 41
                                                }, this),
                                                "Online"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/globalmind-frontend/app/dashboard/page.tsx",
                                            lineNumber: 118,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/globalmind-frontend/app/dashboard/page.tsx",
                                    lineNumber: 116,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: load,
                                    style: {
                                        background: "none",
                                        border: "none",
                                        color: "var(--muted)",
                                        cursor: "none",
                                        fontSize: "0.85rem"
                                    },
                                    children: loading ? "⟳" : "↻"
                                }, void 0, false, {
                                    fileName: "[project]/globalmind-frontend/app/dashboard/page.tsx",
                                    lineNumber: 120,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/globalmind-frontend/app/dashboard/page.tsx",
                            lineNumber: 115,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            style: s.addr,
                            children: address
                        }, void 0, false, {
                            fileName: "[project]/globalmind-frontend/app/dashboard/page.tsx",
                            lineNumber: 124,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: s.progressBar,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: s.progressFill
                            }, void 0, false, {
                                fileName: "[project]/globalmind-frontend/app/dashboard/page.tsx",
                                lineNumber: 125,
                                columnNumber: 38
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/globalmind-frontend/app/dashboard/page.tsx",
                            lineNumber: 125,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: s.progressLabel,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: [
                                        "Score PoEC: ",
                                        profile.score,
                                        " pts"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/globalmind-frontend/app/dashboard/page.tsx",
                                    lineNumber: 127,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: 500 - profile.score > 0 ? `${500 - profile.score} pts para Expert` : "Expert ✓"
                                }, void 0, false, {
                                    fileName: "[project]/globalmind-frontend/app/dashboard/page.tsx",
                                    lineNumber: 128,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/globalmind-frontend/app/dashboard/page.tsx",
                            lineNumber: 126,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/globalmind-frontend/app/dashboard/page.tsx",
                    lineNumber: 114,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: s.grid4,
                    children: [
                        {
                            val: `${profile.score}`,
                            key: "Score PoEC",
                            color: "var(--accent)"
                        },
                        {
                            val: `${profile.totalTasks}`,
                            key: "Tarefas Totais",
                            color: "var(--ink)"
                        },
                        {
                            val: `${Number(profile.earned).toFixed(0)}`,
                            key: "GMND Ganho",
                            color: "var(--accent2)"
                        },
                        {
                            val: `${Number(gmndBal).toLocaleString()}`,
                            key: "Saldo GMND",
                            color: "var(--accent3)"
                        }
                    ].map((s2)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: s.statCard,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        ...s.statVal,
                                        color: s2.color
                                    },
                                    children: s2.val
                                }, void 0, false, {
                                    fileName: "[project]/globalmind-frontend/app/dashboard/page.tsx",
                                    lineNumber: 141,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: s.statKey,
                                    children: s2.key
                                }, void 0, false, {
                                    fileName: "[project]/globalmind-frontend/app/dashboard/page.tsx",
                                    lineNumber: 142,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, s2.key, true, {
                            fileName: "[project]/globalmind-frontend/app/dashboard/page.tsx",
                            lineNumber: 140,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/globalmind-frontend/app/dashboard/page.tsx",
                    lineNumber: 133,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        ...s.statCard,
                        marginBottom: "1.5rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between"
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            style: {
                                fontSize: "0.9rem",
                                color: "var(--ink2)"
                            },
                            children: "Saldo ETH (gas)"
                        }, void 0, false, {
                            fileName: "[project]/globalmind-frontend/app/dashboard/page.tsx",
                            lineNumber: 149,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            style: {
                                fontFamily: "var(--font-mono), monospace",
                                fontSize: "1rem",
                                color: "var(--ink)",
                                fontWeight: 600
                            },
                            children: [
                                ethBal,
                                " ETH"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/globalmind-frontend/app/dashboard/page.tsx",
                            lineNumber: 150,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/globalmind-frontend/app/dashboard/page.tsx",
                    lineNumber: 148,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    style: s.sectionTitle,
                    children: "// Estatísticas da Rede"
                }, void 0, false, {
                    fileName: "[project]/globalmind-frontend/app/dashboard/page.tsx",
                    lineNumber: 154,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: s.netCard,
                    children: [
                        {
                            val: netStats.batches.toString(),
                            key: "Total de Batches"
                        },
                        {
                            val: `🔥 ${netStats.burned}`,
                            key: "GMND Queimado"
                        },
                        {
                            val: netStats.rewarded,
                            key: "GMND Distribuído"
                        }
                    ].map((n)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: s.netVal,
                                    children: n.val
                                }, void 0, false, {
                                    fileName: "[project]/globalmind-frontend/app/dashboard/page.tsx",
                                    lineNumber: 162,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: s.netKey,
                                    children: n.key
                                }, void 0, false, {
                                    fileName: "[project]/globalmind-frontend/app/dashboard/page.tsx",
                                    lineNumber: 163,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, n.key, true, {
                            fileName: "[project]/globalmind-frontend/app/dashboard/page.tsx",
                            lineNumber: 161,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/globalmind-frontend/app/dashboard/page.tsx",
                    lineNumber: 155,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    style: {
                        ...s.sectionTitle,
                        marginTop: "1.5rem"
                    },
                    children: "// Como funciona o Score PoEC"
                }, void 0, false, {
                    fileName: "[project]/globalmind-frontend/app/dashboard/page.tsx",
                    lineNumber: 169,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: s.howCard,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: s.howRow,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        color: "var(--ink2)"
                                    },
                                    children: "+10 pts por resposta no consenso majoritário"
                                }, void 0, false, {
                                    fileName: "[project]/globalmind-frontend/app/dashboard/page.tsx",
                                    lineNumber: 172,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        fontFamily: "var(--font-mono), monospace",
                                        fontSize: "0.72rem",
                                        color: "var(--accent)"
                                    },
                                    children: "Acurácia"
                                }, void 0, false, {
                                    fileName: "[project]/globalmind-frontend/app/dashboard/page.tsx",
                                    lineNumber: 173,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/globalmind-frontend/app/dashboard/page.tsx",
                            lineNumber: 171,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: s.howRow,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        color: "var(--ink2)"
                                    },
                                    children: "Score determina peso nas distribuições futuras"
                                }, void 0, false, {
                                    fileName: "[project]/globalmind-frontend/app/dashboard/page.tsx",
                                    lineNumber: 176,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        fontFamily: "var(--font-mono), monospace",
                                        fontSize: "0.72rem",
                                        color: "var(--accent2)"
                                    },
                                    children: "Reputação"
                                }, void 0, false, {
                                    fileName: "[project]/globalmind-frontend/app/dashboard/page.tsx",
                                    lineNumber: 177,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/globalmind-frontend/app/dashboard/page.tsx",
                            lineNumber: 175,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                fontSize: "0.83rem"
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        color: "var(--ink2)"
                                    },
                                    children: "Score alto = acesso a tarefas prioritárias"
                                }, void 0, false, {
                                    fileName: "[project]/globalmind-frontend/app/dashboard/page.tsx",
                                    lineNumber: 180,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        fontFamily: "var(--font-mono), monospace",
                                        fontSize: "0.72rem",
                                        color: "var(--accent3)"
                                    },
                                    children: "Privilégio"
                                }, void 0, false, {
                                    fileName: "[project]/globalmind-frontend/app/dashboard/page.tsx",
                                    lineNumber: 181,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/globalmind-frontend/app/dashboard/page.tsx",
                            lineNumber: 179,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/globalmind-frontend/app/dashboard/page.tsx",
                    lineNumber: 170,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/globalmind-frontend/app/dashboard/page.tsx",
            lineNumber: 106,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/globalmind-frontend/app/dashboard/page.tsx",
        lineNumber: 105,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=globalmind-frontend_app_dashboard_page_tsx_09f96793._.js.map