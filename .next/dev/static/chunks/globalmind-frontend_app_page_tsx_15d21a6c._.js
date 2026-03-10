(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/globalmind-frontend/app/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Home
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/globalmind-frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/globalmind-frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/globalmind-frontend/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function Home() {
    _s();
    const revealRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Home.useEffect": ()=>{
            const observer = new IntersectionObserver({
                "Home.useEffect": (entries)=>{
                    entries.forEach({
                        "Home.useEffect": (e, i)=>{
                            if (e.isIntersecting) {
                                const el = e.target;
                                const siblings = Array.from(el.parentElement?.children || []).filter({
                                    "Home.useEffect.siblings": (c)=>c.classList.contains("reveal")
                                }["Home.useEffect.siblings"]);
                                const idx = siblings.indexOf(el);
                                el.style.transitionDelay = idx * 100 + "ms";
                                el.classList.add("in");
                            }
                        }
                    }["Home.useEffect"]);
                }
            }["Home.useEffect"], {
                threshold: 0.1
            });
            document.querySelectorAll(".reveal").forEach({
                "Home.useEffect": (el)=>observer.observe(el)
            }["Home.useEffect"]);
            // Hero parallax
            const bgTxt = document.querySelector(".hero-bg-text");
            const onScroll = {
                "Home.useEffect.onScroll": ()=>{
                    if (bgTxt) bgTxt.style.transform = `translateY(${window.scrollY * 0.3}px)`;
                }
            }["Home.useEffect.onScroll"];
            window.addEventListener("scroll", onScroll);
            return ({
                "Home.useEffect": ()=>{
                    observer.disconnect();
                    window.removeEventListener("scroll", onScroll);
                }
            })["Home.useEffect"];
        }
    }["Home.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            background: "var(--bg)"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                style: {
                    minHeight: "100vh",
                    padding: "9rem 4rem 5rem",
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "4rem",
                    alignItems: "center",
                    position: "relative",
                    overflow: "hidden"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "hero-bg-text",
                        style: {
                            position: "absolute",
                            bottom: "-2rem",
                            right: "-1rem",
                            fontFamily: "var(--font-serif), serif",
                            fontSize: "22vw",
                            color: "rgba(15,14,12,0.03)",
                            lineHeight: 1,
                            whiteSpace: "nowrap",
                            pointerEvents: "none",
                            userSelect: "none",
                            letterSpacing: "-0.05em"
                        },
                        children: "GMND"
                    }, void 0, false, {
                        fileName: "[project]/globalmind-frontend/app/page.tsx",
                        lineNumber: 40,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            position: "relative",
                            zIndex: 1
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "0.8rem",
                                    marginBottom: "2rem"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            background: "var(--ink)",
                                            color: "var(--bg)",
                                            fontFamily: "var(--font-mono), monospace",
                                            fontSize: "0.65rem",
                                            padding: "0.35rem 0.8rem",
                                            borderRadius: "2px",
                                            letterSpacing: "0.12em",
                                            textTransform: "uppercase"
                                        },
                                        children: "Protocolo v2.0"
                                    }, void 0, false, {
                                        fileName: "[project]/globalmind-frontend/app/page.tsx",
                                        lineNumber: 51,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            fontFamily: "var(--font-mono), monospace",
                                            fontSize: "0.65rem",
                                            color: "var(--muted)",
                                            letterSpacing: "0.1em"
                                        },
                                        children: "// Infraestrutura Descentralizada de IA"
                                    }, void 0, false, {
                                        fileName: "[project]/globalmind-frontend/app/page.tsx",
                                        lineNumber: 57,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/globalmind-frontend/app/page.tsx",
                                lineNumber: 50,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                style: {
                                    fontFamily: "var(--font-serif), serif",
                                    fontSize: "clamp(3.2rem, 5.5vw, 5.5rem)",
                                    lineHeight: 1.05,
                                    letterSpacing: "-0.02em",
                                    color: "var(--ink)",
                                    marginBottom: "1.5rem"
                                },
                                children: [
                                    "A primeira",
                                    " ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("em", {
                                        style: {
                                            fontStyle: "italic",
                                            color: "var(--accent)"
                                        },
                                        children: "rede neural"
                                    }, void 0, false, {
                                        fileName: "[project]/globalmind-frontend/app/page.tsx",
                                        lineNumber: 70,
                                        columnNumber: 13
                                    }, this),
                                    " ",
                                    "movida por hardware cotidiano"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/globalmind-frontend/app/page.tsx",
                                lineNumber: 63,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    fontSize: "1.05rem",
                                    color: "var(--ink2)",
                                    lineHeight: 1.8,
                                    fontWeight: 300,
                                    maxWidth: "480px",
                                    marginBottom: "3rem"
                                },
                                children: "GlobalMind transforma qualquer dispositivo conectado em um neurônio de validação global. Sem data centers. Sem monopólios. A inteligência pertence a quem a alimenta."
                            }, void 0, false, {
                                fileName: "[project]/globalmind-frontend/app/page.tsx",
                                lineNumber: 74,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: "flex",
                                    gap: "1rem",
                                    flexWrap: "wrap"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/empresa",
                                        className: "btn-fill",
                                        children: "Postar Tarefas"
                                    }, void 0, false, {
                                        fileName: "[project]/globalmind-frontend/app/page.tsx",
                                        lineNumber: 83,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/tarefas",
                                        className: "btn-ghost",
                                        children: "Começar a Validar"
                                    }, void 0, false, {
                                        fileName: "[project]/globalmind-frontend/app/page.tsx",
                                        lineNumber: 84,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/globalmind-frontend/app/page.tsx",
                                lineNumber: 82,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: "flex",
                                    gap: "2rem",
                                    marginTop: "3rem",
                                    paddingTop: "2.5rem",
                                    borderTop: "1px solid var(--border)"
                                },
                                children: [
                                    {
                                        val: "∞",
                                        label: "Escalabilidade"
                                    },
                                    {
                                        val: "$0",
                                        label: "CAPEX Próprio"
                                    },
                                    {
                                        val: "PoEC",
                                        label: "Consenso Cego"
                                    },
                                    {
                                        val: "1B",
                                        label: "Supply GMND"
                                    }
                                ].map((m)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            flex: 1
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    fontFamily: "var(--font-serif), serif",
                                                    fontSize: "2.4rem",
                                                    color: "var(--accent)",
                                                    lineHeight: 1,
                                                    display: "block",
                                                    marginBottom: "0.3rem"
                                                },
                                                children: m.val
                                            }, void 0, false, {
                                                fileName: "[project]/globalmind-frontend/app/page.tsx",
                                                lineNumber: 98,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    fontFamily: "var(--font-mono), monospace",
                                                    fontSize: "0.65rem",
                                                    color: "var(--muted)",
                                                    textTransform: "uppercase",
                                                    letterSpacing: "0.1em"
                                                },
                                                children: m.label
                                            }, void 0, false, {
                                                fileName: "[project]/globalmind-frontend/app/page.tsx",
                                                lineNumber: 103,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, m.label, true, {
                                        fileName: "[project]/globalmind-frontend/app/page.tsx",
                                        lineNumber: 97,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/globalmind-frontend/app/page.tsx",
                                lineNumber: 87,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/globalmind-frontend/app/page.tsx",
                        lineNumber: 49,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            position: "relative",
                            zIndex: 1
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: "grid",
                                gridTemplateColumns: "1fr 1fr",
                                gap: "1rem"
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        gridColumn: "span 2",
                                        background: "var(--ink)",
                                        borderRadius: "6px",
                                        padding: "1.8rem 1.5rem",
                                        position: "relative",
                                        overflow: "hidden"
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                fontSize: "1.8rem",
                                                display: "block",
                                                marginBottom: "0.8rem"
                                            },
                                            children: "📱"
                                        }, void 0, false, {
                                            fileName: "[project]/globalmind-frontend/app/page.tsx",
                                            lineNumber: 122,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                fontFamily: "var(--font-mono), monospace",
                                                fontSize: "0.65rem",
                                                color: "rgba(244,241,235,0.4)",
                                                letterSpacing: "0.12em",
                                                textTransform: "uppercase",
                                                marginBottom: "0.3rem"
                                            },
                                            children: "One-Click Install"
                                        }, void 0, false, {
                                            fileName: "[project]/globalmind-frontend/app/page.tsx",
                                            lineNumber: 123,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                fontSize: "1rem",
                                                fontWeight: 700,
                                                color: "var(--bg)"
                                            },
                                            children: "App Mobile — Android & iOS"
                                        }, void 0, false, {
                                            fileName: "[project]/globalmind-frontend/app/page.tsx",
                                            lineNumber: 124,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                fontSize: "0.8rem",
                                                color: "rgba(244,241,235,0.55)",
                                                marginTop: "0.4rem",
                                                lineHeight: 1.5
                                            },
                                            children: 'Usuário leigo instala, toca em "Iniciar" e começa a ganhar $GMND em segundo plano.'
                                        }, void 0, false, {
                                            fileName: "[project]/globalmind-frontend/app/page.tsx",
                                            lineNumber: 125,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/globalmind-frontend/app/page.tsx",
                                    lineNumber: 117,
                                    columnNumber: 13
                                }, this),
                                [
                                    {
                                        icon: "💻",
                                        label: "Desktop",
                                        name: "Windows / macOS",
                                        desc: "Usa apenas capacidade ociosa da CPU/GPU."
                                    },
                                    {
                                        icon: "📡",
                                        label: "Infra / ISP",
                                        name: "Roteador + OpenWrt",
                                        desc: "Firmware Rust para uptime 24/7."
                                    },
                                    {
                                        icon: "⚙️",
                                        label: "Server",
                                        name: "Docker Container",
                                        desc: "Deploy em segundos para usuários tech."
                                    },
                                    {
                                        icon: "🔗",
                                        label: "Smart Contract",
                                        name: "Recompensas GMND",
                                        desc: "Pagamentos automáticos on-chain."
                                    }
                                ].map((d)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "card",
                                        style: {
                                            padding: "1.5rem"
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    fontSize: "1.6rem",
                                                    display: "block",
                                                    marginBottom: "0.8rem"
                                                },
                                                children: d.icon
                                            }, void 0, false, {
                                                fileName: "[project]/globalmind-frontend/app/page.tsx",
                                                lineNumber: 134,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    fontFamily: "var(--font-mono), monospace",
                                                    fontSize: "0.6rem",
                                                    color: "var(--muted)",
                                                    letterSpacing: "0.12em",
                                                    textTransform: "uppercase",
                                                    marginBottom: "0.3rem"
                                                },
                                                children: d.label
                                            }, void 0, false, {
                                                fileName: "[project]/globalmind-frontend/app/page.tsx",
                                                lineNumber: 135,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    fontSize: "0.9rem",
                                                    fontWeight: 700
                                                },
                                                children: d.name
                                            }, void 0, false, {
                                                fileName: "[project]/globalmind-frontend/app/page.tsx",
                                                lineNumber: 136,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    fontSize: "0.78rem",
                                                    color: "var(--muted)",
                                                    marginTop: "0.3rem",
                                                    lineHeight: 1.5
                                                },
                                                children: d.desc
                                            }, void 0, false, {
                                                fileName: "[project]/globalmind-frontend/app/page.tsx",
                                                lineNumber: 137,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, d.name, true, {
                                        fileName: "[project]/globalmind-frontend/app/page.tsx",
                                        lineNumber: 133,
                                        columnNumber: 15
                                    }, this))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/globalmind-frontend/app/page.tsx",
                            lineNumber: 115,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/globalmind-frontend/app/page.tsx",
                        lineNumber: 114,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/globalmind-frontend/app/page.tsx",
                lineNumber: 34,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    height: "1px",
                    background: "var(--border)",
                    margin: "0 4rem"
                }
            }, void 0, false, {
                fileName: "[project]/globalmind-frontend/app/page.tsx",
                lineNumber: 144,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                style: {
                    padding: "7rem 4rem",
                    background: "var(--bg2)"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            marginBottom: "4rem"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "section-num",
                                children: "// 01 — Acessibilidade Total"
                            }, void 0, false, {
                                fileName: "[project]/globalmind-frontend/app/page.tsx",
                                lineNumber: 149,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "section-title",
                                children: [
                                    "Software ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("em", {
                                        children: "Agnóstico"
                                    }, void 0, false, {
                                        fileName: "[project]/globalmind-frontend/app/page.tsx",
                                        lineNumber: 150,
                                        columnNumber: 50
                                    }, this),
                                    ",",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                        fileName: "[project]/globalmind-frontend/app/page.tsx",
                                        lineNumber: 150,
                                        columnNumber: 69
                                    }, this),
                                    "Rede Universal"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/globalmind-frontend/app/page.tsx",
                                lineNumber: 150,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    color: "var(--ink2)",
                                    fontSize: "1rem",
                                    lineHeight: 1.8,
                                    fontWeight: 300,
                                    maxWidth: "560px",
                                    marginTop: "1rem"
                                },
                                children: "Para garantir a maior rede do mundo, o GlobalMind remove todas as barreiras técnicas. Qualquer dispositivo, qualquer usuário."
                            }, void 0, false, {
                                fileName: "[project]/globalmind-frontend/app/page.tsx",
                                lineNumber: 151,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/globalmind-frontend/app/page.tsx",
                        lineNumber: 148,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: "grid",
                            gridTemplateColumns: "repeat(3,1fr)",
                            gap: "1.5rem"
                        },
                        children: [
                            {
                                badge: "Usuário Leigo",
                                badgeColor: "var(--accent2)",
                                icon: "📱",
                                title: "App One-Click",
                                desc: "Android, iOS e Windows. Instale, toque em iniciar e deixe rodando. O sistema gerencia recursos automaticamente.",
                                tags: [
                                    "Android",
                                    "iOS",
                                    "Windows",
                                    "Battery Safe"
                                ]
                            },
                            {
                                badge: "Usuário Tech",
                                badgeColor: "var(--accent3)",
                                icon: "🐳",
                                title: "Docker + Firmware",
                                desc: "Pacote Docker para servidores. Firmware leve para roteadores OpenWrt. Conexão estável 24/7.",
                                tags: [
                                    "Docker",
                                    "OpenWrt",
                                    "Rust",
                                    "24/7"
                                ]
                            },
                            {
                                badge: "ISP / Provedor",
                                badgeColor: "var(--accent)",
                                icon: "🌐",
                                title: "Nó Agregador",
                                desc: "Provedores atuam como super-nós regionais e recebem percentual de cada recompensa distribuída.",
                                tags: [
                                    "ISP Layer",
                                    "Aggregator",
                                    "Revenue Share"
                                ]
                            }
                        ].map((c)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "card reveal",
                                style: {
                                    padding: "2.5rem 2rem"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            display: "inline-block",
                                            fontFamily: "var(--font-mono), monospace",
                                            fontSize: "0.6rem",
                                            letterSpacing: "0.12em",
                                            textTransform: "uppercase",
                                            padding: "0.25rem 0.7rem",
                                            borderRadius: "2px",
                                            marginBottom: "1.5rem",
                                            border: `1px solid ${c.badgeColor}`,
                                            color: c.badgeColor,
                                            background: `${c.badgeColor}0f`
                                        },
                                        children: c.badge
                                    }, void 0, false, {
                                        fileName: "[project]/globalmind-frontend/app/page.tsx",
                                        lineNumber: 162,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            fontSize: "2.5rem",
                                            display: "block",
                                            marginBottom: "1.2rem"
                                        },
                                        children: c.icon
                                    }, void 0, false, {
                                        fileName: "[project]/globalmind-frontend/app/page.tsx",
                                        lineNumber: 170,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        style: {
                                            fontSize: "1.1rem",
                                            fontWeight: 800,
                                            marginBottom: "0.8rem"
                                        },
                                        children: c.title
                                    }, void 0, false, {
                                        fileName: "[project]/globalmind-frontend/app/page.tsx",
                                        lineNumber: 171,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        style: {
                                            fontSize: "0.87rem",
                                            color: "var(--muted)",
                                            lineHeight: 1.7
                                        },
                                        children: c.desc
                                    }, void 0, false, {
                                        fileName: "[project]/globalmind-frontend/app/page.tsx",
                                        lineNumber: 172,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: "flex",
                                            flexWrap: "wrap",
                                            gap: "0.5rem",
                                            marginTop: "1.5rem"
                                        },
                                        children: c.tags.map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    fontFamily: "var(--font-mono), monospace",
                                                    fontSize: "0.63rem",
                                                    background: "var(--bg2)",
                                                    padding: "0.2rem 0.6rem",
                                                    borderRadius: "2px",
                                                    color: "var(--ink2)",
                                                    letterSpacing: "0.05em"
                                                },
                                                children: t
                                            }, t, false, {
                                                fileName: "[project]/globalmind-frontend/app/page.tsx",
                                                lineNumber: 175,
                                                columnNumber: 19
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/globalmind-frontend/app/page.tsx",
                                        lineNumber: 173,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, c.title, true, {
                                fileName: "[project]/globalmind-frontend/app/page.tsx",
                                lineNumber: 161,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/globalmind-frontend/app/page.tsx",
                        lineNumber: 155,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/globalmind-frontend/app/page.tsx",
                lineNumber: 147,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                style: {
                    padding: "7rem 4rem",
                    background: "var(--bg)"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            marginBottom: "4rem"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "section-num",
                                children: "// 02 — Tokenomics"
                            }, void 0, false, {
                                fileName: "[project]/globalmind-frontend/app/page.tsx",
                                lineNumber: 190,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "section-title",
                                children: [
                                    "$GMND: Mecanismo de ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("em", {
                                        children: "Valorização"
                                    }, void 0, false, {
                                        fileName: "[project]/globalmind-frontend/app/page.tsx",
                                        lineNumber: 191,
                                        columnNumber: 61
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/globalmind-frontend/app/page.tsx",
                                lineNumber: 191,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    color: "var(--ink2)",
                                    fontSize: "1rem",
                                    lineHeight: 1.8,
                                    fontWeight: 300,
                                    maxWidth: "560px",
                                    marginTop: "1rem"
                                },
                                children: "Não é apenas uma moeda. É o combustível deflacionário que alinha o incentivo de todos os participantes."
                            }, void 0, false, {
                                fileName: "[project]/globalmind-frontend/app/page.tsx",
                                lineNumber: 192,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/globalmind-frontend/app/page.tsx",
                        lineNumber: 189,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr",
                            gap: "5rem",
                            alignItems: "center"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 0
                                },
                                children: [
                                    {
                                        icon: "🏢",
                                        title: "Empresas de IA compram acesso",
                                        desc: "Clientes corporativos pagam Créditos de Validação em $GMND para acessar a rede de validadores humanos."
                                    },
                                    {
                                        icon: "🔥",
                                        title: "Burn — Oferta Diminui",
                                        desc: "20% dos tokens pagos são permanentemente destruídos. Oferta circulante cai com o crescimento da demanda."
                                    },
                                    {
                                        icon: "👥",
                                        title: "Distribuição aos Nós",
                                        desc: "70% é distribuído proporcionalmente aos nós com base no score PoEC. Quanto melhor a contribuição, maior a fatia."
                                    },
                                    {
                                        icon: "📈",
                                        title: "Efeito de Rede Composto",
                                        desc: "Mais usuários → mais confiável → mais clientes → mais burn → maior valor. Ciclo virtuoso autossustentado."
                                    }
                                ].map((n, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "reveal",
                                        style: {
                                            display: "flex",
                                            alignItems: "stretch",
                                            gap: "1.5rem",
                                            position: "relative"
                                        },
                                        children: [
                                            i < 3 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    position: "absolute",
                                                    left: "23px",
                                                    top: "52px",
                                                    width: "1px",
                                                    bottom: "-24px",
                                                    background: "var(--border)"
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/globalmind-frontend/app/page.tsx",
                                                lineNumber: 205,
                                                columnNumber: 27
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    width: "48px",
                                                    height: "48px",
                                                    borderRadius: "50%",
                                                    flexShrink: 0,
                                                    background: "var(--surface)",
                                                    border: "1px solid var(--border)",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    fontSize: "1.1rem",
                                                    position: "relative",
                                                    zIndex: 1,
                                                    alignSelf: "flex-start"
                                                },
                                                children: n.icon
                                            }, void 0, false, {
                                                fileName: "[project]/globalmind-frontend/app/page.tsx",
                                                lineNumber: 206,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    background: "var(--surface)",
                                                    border: "1px solid var(--border)",
                                                    borderRadius: "6px",
                                                    padding: "1.5rem 1.8rem",
                                                    flex: 1,
                                                    marginBottom: "1.5rem"
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                        style: {
                                                            fontSize: "0.9rem",
                                                            fontWeight: 800,
                                                            marginBottom: "0.4rem"
                                                        },
                                                        children: n.title
                                                    }, void 0, false, {
                                                        fileName: "[project]/globalmind-frontend/app/page.tsx",
                                                        lineNumber: 216,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        style: {
                                                            fontSize: "0.83rem",
                                                            color: "var(--muted)",
                                                            lineHeight: 1.6
                                                        },
                                                        children: n.desc
                                                    }, void 0, false, {
                                                        fileName: "[project]/globalmind-frontend/app/page.tsx",
                                                        lineNumber: 217,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/globalmind-frontend/app/page.tsx",
                                                lineNumber: 212,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, n.title, true, {
                                        fileName: "[project]/globalmind-frontend/app/page.tsx",
                                        lineNumber: 204,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/globalmind-frontend/app/page.tsx",
                                lineNumber: 197,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: "grid",
                                    gridTemplateColumns: "1fr 1fr",
                                    gap: "1.2rem"
                                },
                                children: [
                                    [
                                        {
                                            val: "1B",
                                            color: "var(--accent)",
                                            key: "Supply Total GMND"
                                        },
                                        {
                                            val: "0,003",
                                            color: "var(--accent2)",
                                            key: "Preço Seed (USD)"
                                        },
                                        {
                                            val: "20%",
                                            color: "var(--accent)",
                                            key: "Burn por Transação"
                                        },
                                        {
                                            val: "70%",
                                            color: "var(--accent3)",
                                            key: "Para Validadores"
                                        }
                                    ].map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "card reveal",
                                            style: {
                                                padding: "1.8rem 1.5rem"
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        fontFamily: "var(--font-serif), serif",
                                                        fontSize: "2.2rem",
                                                        color: s.color,
                                                        lineHeight: 1,
                                                        display: "block"
                                                    },
                                                    children: s.val
                                                }, void 0, false, {
                                                    fileName: "[project]/globalmind-frontend/app/page.tsx",
                                                    lineNumber: 230,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        fontFamily: "var(--font-mono), monospace",
                                                        fontSize: "0.65rem",
                                                        color: "var(--muted)",
                                                        textTransform: "uppercase",
                                                        letterSpacing: "0.1em",
                                                        marginTop: "0.5rem"
                                                    },
                                                    children: s.key
                                                }, void 0, false, {
                                                    fileName: "[project]/globalmind-frontend/app/page.tsx",
                                                    lineNumber: 231,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, s.key, true, {
                                            fileName: "[project]/globalmind-frontend/app/page.tsx",
                                            lineNumber: 229,
                                            columnNumber: 15
                                        }, this)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            gridColumn: "span 2",
                                            background: "var(--ink)",
                                            borderRadius: "6px",
                                            padding: "1.8rem",
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "1rem"
                                        },
                                        className: "reveal",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    fontSize: "2rem"
                                                },
                                                children: "🔥"
                                            }, void 0, false, {
                                                fileName: "[project]/globalmind-frontend/app/page.tsx",
                                                lineNumber: 235,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                        style: {
                                                            fontSize: "0.95rem",
                                                            fontWeight: 700,
                                                            color: "var(--bg)",
                                                            marginBottom: "0.3rem"
                                                        },
                                                        children: "Queima Automática On-Chain"
                                                    }, void 0, false, {
                                                        fileName: "[project]/globalmind-frontend/app/page.tsx",
                                                        lineNumber: 237,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        style: {
                                                            fontSize: "0.82rem",
                                                            color: "rgba(244,241,235,0.5)",
                                                            lineHeight: 1.5
                                                        },
                                                        children: "Cada batch finalizado queima 20% via smart contract. Imutável e auditável."
                                                    }, void 0, false, {
                                                        fileName: "[project]/globalmind-frontend/app/page.tsx",
                                                        lineNumber: 238,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/globalmind-frontend/app/page.tsx",
                                                lineNumber: 236,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/globalmind-frontend/app/page.tsx",
                                        lineNumber: 234,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/globalmind-frontend/app/page.tsx",
                                lineNumber: 222,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/globalmind-frontend/app/page.tsx",
                        lineNumber: 196,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/globalmind-frontend/app/page.tsx",
                lineNumber: 188,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                style: {
                    background: "var(--ink)",
                    padding: "8rem 4rem",
                    textAlign: "center",
                    position: "relative",
                    overflow: "hidden"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            position: "absolute",
                            bottom: "-3rem",
                            left: "50%",
                            transform: "translateX(-50%)",
                            fontFamily: "var(--font-serif), serif",
                            fontSize: "30vw",
                            color: "rgba(244,241,235,0.03)",
                            pointerEvents: "none",
                            whiteSpace: "nowrap",
                            lineHeight: 1
                        },
                        children: "GMND"
                    }, void 0, false, {
                        fileName: "[project]/globalmind-frontend/app/page.tsx",
                        lineNumber: 250,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        style: {
                            fontFamily: "var(--font-serif), serif",
                            fontStyle: "italic",
                            fontSize: "clamp(2.8rem, 6vw, 6rem)",
                            color: "var(--bg)",
                            lineHeight: 1.1,
                            letterSpacing: "-0.02em",
                            marginBottom: "1.5rem",
                            position: "relative"
                        },
                        children: [
                            "A inteligência pertence",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                fileName: "[project]/globalmind-frontend/app/page.tsx",
                                lineNumber: 261,
                                columnNumber: 34
                            }, this),
                            "a",
                            " ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("em", {
                                style: {
                                    fontStyle: "normal",
                                    color: "var(--accent)"
                                },
                                children: "todos"
                            }, void 0, false, {
                                fileName: "[project]/globalmind-frontend/app/page.tsx",
                                lineNumber: 262,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/globalmind-frontend/app/page.tsx",
                        lineNumber: 255,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        style: {
                            color: "rgba(244,241,235,0.45)",
                            fontSize: "1.05rem",
                            maxWidth: "520px",
                            margin: "0 auto 3rem",
                            lineHeight: 1.7,
                            position: "relative"
                        },
                        children: "Seja um dos primeiros a apoiar a infraestrutura descentralizada que vai remodelar o futuro global da IA."
                    }, void 0, false, {
                        fileName: "[project]/globalmind-frontend/app/page.tsx",
                        lineNumber: 264,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: "flex",
                            gap: "1rem",
                            justifyContent: "center",
                            flexWrap: "wrap",
                            position: "relative"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/empresa",
                                style: {
                                    background: "var(--accent)",
                                    color: "white",
                                    padding: "1.1rem 2.8rem",
                                    borderRadius: "2px",
                                    fontWeight: 700,
                                    fontSize: "0.85rem",
                                    letterSpacing: "0.08em",
                                    textTransform: "uppercase",
                                    textDecoration: "none",
                                    transition: "all 0.25s",
                                    display: "inline-block"
                                },
                                children: "Entrar no Protocolo"
                            }, void 0, false, {
                                fileName: "[project]/globalmind-frontend/app/page.tsx",
                                lineNumber: 268,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/dashboard",
                                style: {
                                    background: "transparent",
                                    color: "rgba(244,241,235,0.6)",
                                    padding: "1.1rem 2.8rem",
                                    borderRadius: "2px",
                                    fontWeight: 700,
                                    fontSize: "0.85rem",
                                    letterSpacing: "0.08em",
                                    textTransform: "uppercase",
                                    textDecoration: "none",
                                    border: "1px solid rgba(244,241,235,0.15)",
                                    transition: "all 0.25s",
                                    display: "inline-block"
                                },
                                children: "Ver Dashboard"
                            }, void 0, false, {
                                fileName: "[project]/globalmind-frontend/app/page.tsx",
                                lineNumber: 275,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/globalmind-frontend/app/page.tsx",
                        lineNumber: 267,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/globalmind-frontend/app/page.tsx",
                lineNumber: 246,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
                style: {
                    background: "var(--ink2)",
                    padding: "2rem 4rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    gap: "1rem",
                    borderTop: "1px solid rgba(244,241,235,0.06)"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            fontFamily: "var(--font-serif), serif",
                            fontSize: "1.2rem",
                            color: "rgba(244,241,235,0.7)"
                        },
                        children: [
                            "GlobalMind",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("sup", {
                                style: {
                                    fontFamily: "var(--font-mono), monospace",
                                    fontSize: "0.5rem",
                                    color: "var(--accent)",
                                    verticalAlign: "super"
                                },
                                children: "GMND"
                            }, void 0, false, {
                                fileName: "[project]/globalmind-frontend/app/page.tsx",
                                lineNumber: 294,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/globalmind-frontend/app/page.tsx",
                        lineNumber: 293,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        style: {
                            fontFamily: "var(--font-mono), monospace",
                            fontSize: "0.65rem",
                            color: "rgba(244,241,235,0.3)",
                            letterSpacing: "0.08em"
                        },
                        children: "© 2025 GlobalMind Protocol · $GMND · Proof of Expertise & Connectivity"
                    }, void 0, false, {
                        fileName: "[project]/globalmind-frontend/app/page.tsx",
                        lineNumber: 296,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$globalmind$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        style: {
                            fontFamily: "var(--font-mono), monospace",
                            fontSize: "0.6rem",
                            color: "rgba(244,241,235,0.2)"
                        },
                        children: "Rede Sepolia Testnet · Smart Contract Auditável"
                    }, void 0, false, {
                        fileName: "[project]/globalmind-frontend/app/page.tsx",
                        lineNumber: 299,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/globalmind-frontend/app/page.tsx",
                lineNumber: 287,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/globalmind-frontend/app/page.tsx",
        lineNumber: 31,
        columnNumber: 5
    }, this);
}
_s(Home, "UNnF7M9JaPTn+Mm2ddEl4UMwkSk=");
_c = Home;
var _c;
__turbopack_context__.k.register(_c, "Home");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=globalmind-frontend_app_page_tsx_15d21a6c._.js.map