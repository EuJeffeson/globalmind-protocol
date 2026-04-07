"use client";
import { useState } from "react";
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { formatUnits } from "viem";

const CONTRACT_ADDRESS = "0xEbfA7a4Cb124Fc7592C18d6cAE7B3bD15f404404" as `0x${string}`;
const TOKEN_ADDRESS    = "0x658719E24649F727C3608118bFA33A9Bac3f18F0" as `0x${string}`;

const TOKEN_ABI = [
  { name: "balanceOf", type: "function", stateMutability: "view", inputs: [{ name: "account", type: "address" }], outputs: [{ type: "uint256" }] },
  { name: "decimals",  type: "function", stateMutability: "view", inputs: [], outputs: [{ type: "uint8" }] },
] as const;

const PROTOCOL_ABI = [
  { name: "batchValidate", type: "function", stateMutability: "nonpayable", inputs: [{ name: "batchId", type: "uint256" }, { name: "taskIndexes", type: "uint256[]" }, { name: "answerList", type: "string[]" }], outputs: [] },
  { name: "isRegisteredValidator", type: "function", stateMutability: "view", inputs: [{ name: "account", type: "address" }], outputs: [{ type: "bool" }] },
  { name: "nodeGmndCredits", type: "function", stateMutability: "view", inputs: [{ name: "account", type: "address" }], outputs: [{ type: "uint256" }] },
  { name: "nodeScore", type: "function", stateMutability: "view", inputs: [{ name: "account", type: "address" }], outputs: [{ type: "uint256" }] },
  { name: "nodeTaskCount", type: "function", stateMutability: "view", inputs: [{ name: "account", type: "address" }], outputs: [{ type: "uint256" }] },
] as const;

const TASKS = [
  { id: 0, type: "Classificação de Texto", question: "Esta notícia é verdadeira, falsa ou não verificável?", context: '"Pesquisadores da USP desenvolveram uma IA capaz de diagnosticar dengue com 98% de precisão a partir de exames de sangue simples."', options: ["Verdadeira", "Falsa", "Não verificável"] },
  { id: 1, type: "Avaliação de Resposta IA", question: "Esta resposta de IA está correta e útil?", context: 'Pergunta: "Qual a capital do Pará?"\nResposta: "A capital do Pará é Belém, localizada na região Norte do Brasil."', options: ["Correta e útil", "Parcialmente correta", "Incorreta"] },
  { id: 2, type: "Verificação de Fato", question: "Este dado estatístico parece plausível?", context: '"A China instalou 295.000 novos robôs industriais em 2024, mais que todos os outros países combinados."', options: ["Plausível e verificável", "Improvável", "Impossível verificar"] },
];

// Batch fixo para demo — Batch 1 na Sepolia
const DEMO_BATCH_ID = BigInt(0);

function MaranetContent() {
  const { address, isConnected } = useAccount();
  const { open } = useWeb3Modal();
  const [selected, setSelected] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [toast, setToast]   = useState("");
  const [dark, setDark]     = useState(true);
  const [nodeActive, setNodeActive] = useState(true);

  const T = dark ? {
    bg: "#0a0a08", surface: "#111110", surface2: "#1a1a16",
    border: "rgba(255,255,255,0.07)", ink: "#f4f1eb",
    ink2: "#a8a49c", muted: "#5a5650", hbg: "rgba(10,10,8,0.97)",
  } : {
    bg: "#f4f1eb", surface: "#ffffff", surface2: "#f9f7f2",
    border: "rgba(15,14,12,0.08)", ink: "#0f0e0c",
    ink2: "#3a3730", muted: "#8c8880", hbg: "rgba(244,241,235,0.97)",
  };

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(""), 3500); };

  // Lê saldo GMND
  const { data: balanceRaw } = useReadContract({
    address: TOKEN_ADDRESS, abi: TOKEN_ABI,
    functionName: "balanceOf", args: address ? [address] : undefined,
    query: { enabled: !!address },
  });
  const { data: decimals } = useReadContract({ address: TOKEN_ADDRESS, abi: TOKEN_ABI, functionName: "decimals" });
  const balance = balanceRaw && decimals ? parseFloat(formatUnits(balanceRaw as bigint, decimals as number)) : 0;

  // Lê créditos GMND
  const { data: creditsRaw } = useReadContract({
    address: CONTRACT_ADDRESS, abi: PROTOCOL_ABI,
    functionName: "nodeGmndCredits", args: address ? [address] : undefined,
    query: { enabled: !!address },
  });
  const credits = creditsRaw ? Number(creditsRaw).toString() : "0";

  const { data: scoreRaw } = useReadContract({
    address: CONTRACT_ADDRESS, abi: PROTOCOL_ABI,
    functionName: "nodeScore", args: address ? [address] : undefined,
    query: { enabled: !!address },
  });
  const { data: taskCountRaw } = useReadContract({
    address: CONTRACT_ADDRESS, abi: PROTOCOL_ABI,
    functionName: "nodeTaskCount", args: address ? [address] : undefined,
    query: { enabled: !!address },
  });
  const scoreVal = Number(scoreRaw || 0);
  const taskCount = Number(taskCountRaw || 0);
  const accuracy = taskCount > 0 ? Math.round((scoreVal / (taskCount * 10)) * 100) : 0;
  const poecMultiplier = accuracy >= 90 ? "1.5x" : accuracy >= 70 ? "1.2x" : accuracy >= 50 ? "1.0x" : "0.8x";
  const ranking = scoreVal >= 100 ? "Elite" : scoreVal >= 50 ? "Avançado" : scoreVal >= 20 ? "Regular" : "Iniciante";

  // Verifica se está registrado como validador
  const { data: isValidator } = useReadContract({
    address: CONTRACT_ADDRESS, abi: PROTOCOL_ABI,
    functionName: "isRegisteredValidator", args: address ? [address] : undefined,
    query: { enabled: !!address },
  });

  // batchValidate — 1 única TX com todas as respostas
  const { writeContract, data: txHash, isPending } = useWriteContract();
  const { isSuccess } = useWaitForTransactionReceipt({ hash: txHash });

  if (isSuccess && txHash && !submitted) {
    setSubmitted(true);
    showToast("✅ Respostas enviadas! Créditos GMND acumulados.");
  }

  const answeredCount = Object.keys(selected).length;

  const submitAll = () => {
    if (!isConnected) { open(); return; }
    if (answeredCount === 0) return;

    const taskIndexes = Object.keys(selected).map(k => BigInt(k));
    const answerList  = Object.entries(selected).map(([taskId, optIdx]) =>
      TASKS.find(t => t.id === Number(taskId))?.options[optIdx] ?? ""
    );

    writeContract({
      address: CONTRACT_ADDRESS,
      abi: PROTOCOL_ABI,
      functionName: "batchValidate",
      args: [DEMO_BATCH_ID, taskIndexes, answerList],
    });
  };

  const shortAddr = address ? address.slice(0,6) + "..." + address.slice(-4) : "";
  const sx = (x: React.CSSProperties) => x;

  return (
    <div style={sx({ background: T.bg, minHeight: "100vh", fontFamily: "var(--font-sans), sans-serif", color: T.ink, paddingBottom: "5rem", transition: "background 0.3s, color 0.3s" })}>

      {toast && <div style={sx({ position: "fixed", top: "80px", left: "50%", transform: "translateX(-50%)", background: "#2d8a4e", color: "white", padding: "0.7rem 1.5rem", borderRadius: "30px", fontFamily: "var(--font-mono), monospace", fontSize: "0.85rem", zIndex: 200, whiteSpace: "nowrap" })}>{toast}</div>}

      {/* Header */}
      <div style={sx({ padding: "1.2rem 1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: `1px solid ${T.border}`, position: "sticky", top: 0, background: T.hbg, backdropFilter: "blur(12px)", zIndex: 100 })}>
        <div style={sx({ display: "flex", alignItems: "center", gap: "0.6rem" })}>
          <div style={sx({ width: "32px", height: "32px", background: "#c8522a", borderRadius: "7px", display: "flex", alignItems: "center", justifyContent: "center", fontStyle: "italic", fontSize: "1.1rem", color: "white", fontFamily: "var(--font-serif), serif" })}>G</div>
          <span style={sx({ fontFamily: "var(--font-serif), serif", fontSize: "1.1rem", color: T.ink })}>
            GlobalMind<sup style={sx({ fontFamily: "var(--font-mono), monospace", fontSize: "0.55rem", color: "#c8522a", marginLeft: "2px" })}>GMND</sup>
          </span>
        </div>
        <div style={sx({ display: "flex", alignItems: "center", gap: "0.6rem" })}>
          <button onClick={() => setDark(d => !d)} style={sx({ background: T.surface, border: `1px solid ${T.border}`, borderRadius: "20px", padding: "0.3rem 0.7rem", cursor: "pointer", fontSize: "0.9rem" })}>
            {dark ? "☀️" : "🌙"}
          </button>
          <button onClick={() => open()} style={{ background: isConnected ? "rgba(45,138,78,0.1)" : "#c8522a", border: isConnected ? "1px solid rgba(45,138,78,0.3)" : "none", color: isConnected ? "#2d8a4e" : "white", padding: "0.4rem 1rem", borderRadius: "20px", fontFamily: "var(--font-mono), monospace", fontSize: "0.65rem", cursor: "pointer" }}>
            {isConnected ? shortAddr : "Conectar"}
          </button>
        </div>
      </div>

      <div style={sx({ maxWidth: "480px", margin: "0 auto", padding: "1.5rem 1rem" })}>

        {/* Maranet badge */}
        <div style={sx({ display: "flex", alignItems: "center", gap: "0.5rem", background: "rgba(26,58,143,0.1)", border: "1px solid rgba(26,58,143,0.25)", borderRadius: "8px", padding: "0.7rem 1rem", marginBottom: "1rem" })}>
          <span>📡</span>
          <span style={sx({ fontSize: "0.78rem", color: T.ink2 })}>Cliente <strong style={sx({ color: T.ink })}>Maranet Telecom</strong> — Código ISP: <strong style={sx({ color: "#c8522a" })}>901 451</strong></span>
        </div>

        {/* Balance card */}
        <div style={sx({ background: T.surface, border: `1px solid ${T.border}`, borderRadius: "16px", padding: "1.8rem", marginBottom: "1rem", position: "relative", overflow: "hidden" })}>
          <div style={sx({ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: "linear-gradient(90deg, #c8522a, #1a3a8f, #2d8a4e)" })} />
          <div style={sx({ fontFamily: "var(--font-mono), monospace", fontSize: "0.6rem", color: T.muted, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "0.5rem" })}>Seu saldo $GMND</div>
          <div style={sx({ fontFamily: "var(--font-serif), serif", fontSize: "3rem", lineHeight: 1, marginBottom: "0.3rem", color: T.ink })}>
            {balance.toFixed(1)} <span style={sx({ fontSize: "1.2rem", color: "#c8522a", fontFamily: "var(--font-mono), monospace" })}>GMND</span>
          </div>
          <div style={sx({ fontSize: "0.8rem", color: T.ink2, marginBottom: "1.5rem" })}>Créditos acumulados: <strong style={sx({ color: "#c8522a" })}>{credits}</strong> GMND → convertem 1:1 no TGE</div>
          <div style={sx({ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.6rem" })}>
            {[
              { val: isValidator ? "✓" : "—", key: "Validador" },
              { val: credits, key: "Créditos GMND" },
              { val: isConnected ? shortAddr : "—", key: "Carteira" },
              { val: `${accuracy}%`, key: "Acurácia" },
              { val: poecMultiplier, key: "Mult. PoEC" },
              { val: ranking, key: "Ranking" }
            ].map(({ val, key }) => (
              <div key={key} style={sx({ background: T.surface2, borderRadius: "8px", padding: "0.8rem", textAlign: "center" })}>
                <span style={sx({ fontFamily: "var(--font-serif), serif", fontSize: "1rem", color: "#c8522a", display: "block" })}>{val}</span>
                <span style={sx({ fontFamily: "var(--font-mono), monospace", fontSize: "0.5rem", color: T.muted, textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginTop: "0.2rem" })}>{key}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Node toggle */}
        <div style={sx({ background: T.surface, border: `1px solid ${T.border}`, borderRadius: "16px", padding: "1.5rem", marginBottom: "1rem", display: "flex", alignItems: "center", justifyContent: "space-between" })}>
          <div>
            <div style={sx({ fontSize: "0.95rem", fontWeight: 700, marginBottom: "0.2rem", color: T.ink })}>Node em background</div>
            <div style={sx({ fontSize: "0.75rem", color: T.ink2, lineHeight: 1.5 })}>Seu dispositivo valida dados<br/>automaticamente e acumula créditos GMND.</div>
          </div>
          <div onClick={() => setNodeActive(n => !n)} style={sx({ width: "52px", height: "28px", background: nodeActive ? "#2d8a4e" : T.surface2, borderRadius: "14px", border: nodeActive ? "1px solid #2d8a4e" : `1px solid ${T.border}`, cursor: "pointer", position: "relative", transition: "background 0.3s", flexShrink: 0 })}>
            <div style={sx({ position: "absolute", width: "22px", height: "22px", background: "white", borderRadius: "50%", top: "2px", left: nodeActive ? "27px" : "3px", transition: "left 0.3s", boxShadow: "0 2px 6px rgba(0,0,0,0.3)" })} />
          </div>
        </div>

        {/* Connect prompt */}
        {!isConnected && (
          <div style={sx({ background: T.surface, border: `1px solid ${T.border}`, borderRadius: "16px", padding: "2rem", marginBottom: "1rem", textAlign: "center" })}>
            <div style={sx({ fontSize: "2.5rem", marginBottom: "1rem" })}>🔗</div>
            <div style={sx({ fontFamily: "var(--font-serif), serif", fontSize: "1.4rem", marginBottom: "0.5rem", color: T.ink })}>Conecte sua carteira</div>
            <div style={sx({ fontSize: "0.82rem", color: T.ink2, marginBottom: "1.5rem", lineHeight: 1.6 })}>Para validar dados de IA e acumular créditos GMND.</div>
            <button onClick={() => open()} style={sx({ width: "100%", background: "#c8522a", border: "none", borderRadius: "10px", padding: "1rem", color: "white", fontSize: "0.95rem", fontWeight: 700, cursor: "pointer" })}>
              Conectar Carteira
            </button>
          </div>
        )}

        {/* Aviso não registrado */}
        {isConnected && isValidator === false && (
          <div style={sx({ background: "rgba(200,82,42,0.08)", border: "1px solid rgba(200,82,42,0.2)", borderRadius: "12px", padding: "1.2rem", marginBottom: "1rem", fontSize: "0.82rem", color: T.ink2, lineHeight: 1.6 })}>
            ⚠️ Sua carteira não está registrada como validadora.<br/>
            <strong style={sx({ color: T.ink })}>Use o código 901 451</strong> em <a href="/validador" style={sx({ color: "#c8522a" })}>globalmind.vercel.app/validador</a> para se registrar primeiro.
          </div>
        )}

        {/* Tarefas */}
        {(!isConnected || isValidator !== false) && (
          <>
            <div style={sx({ fontFamily: "var(--font-mono), monospace", fontSize: "0.62rem", color: T.muted, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "0.8rem", marginTop: "1.5rem" })}>
              Tarefas disponíveis · {answeredCount}/{TASKS.length} respondidas
            </div>

            {submitted ? (
              <div style={sx({ background: T.surface, border: "1px solid #2d8a4e", borderRadius: "16px", padding: "2.5rem", textAlign: "center" })}>
                <div style={sx({ fontSize: "3rem", marginBottom: "1rem" })}>✅</div>
                <div style={sx({ fontFamily: "var(--font-serif), serif", fontSize: "1.5rem", color: "#2d8a4e", marginBottom: "0.5rem" })}>Respostas enviadas!</div>
                <div style={sx({ fontSize: "0.82rem", color: T.ink2, marginBottom: "1rem" })}>Créditos GMND acumulados on-chain. Convertem 1:1 no TGE.</div>
                <a href={`https://sepolia.etherscan.io/tx/${txHash}`} target="_blank" rel="noopener noreferrer" style={sx({ fontFamily: "var(--font-mono), monospace", fontSize: "0.62rem", color: "#c8522a", wordBreak: "break-all" })}>
                  Ver TX no Etherscan →
                </a>
              </div>
            ) : (
              <>
                {TASKS.map(task => (
                  <div key={task.id} style={sx({ background: T.surface, border: selected[task.id] !== undefined ? "1px solid #c8522a" : `1px solid ${T.border}`, borderRadius: "16px", padding: "1.5rem", marginBottom: "0.8rem", transition: "border-color 0.2s" })}>
                    <div style={sx({ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "1rem" })}>
                      <span style={sx({ fontFamily: "var(--font-mono), monospace", fontSize: "0.58rem", color: "#c8522a", letterSpacing: "0.12em", textTransform: "uppercase", background: "rgba(200,82,42,0.1)", border: "1px solid rgba(200,82,42,0.2)", borderRadius: "4px", padding: "0.2rem 0.5rem" })}>{task.type}</span>
                      {selected[task.id] !== undefined && <span style={sx({ color: "#2d8a4e", fontSize: "0.75rem", fontFamily: "var(--font-mono), monospace" })}>✓ respondida</span>}
                    </div>
                    <div style={sx({ fontSize: "0.95rem", lineHeight: 1.6, color: T.ink, marginBottom: "1.2rem" })}>
                      {task.question}<br/><br/>
                      <em style={sx({ color: T.ink2, fontSize: "0.88rem" })}>{task.context}</em>
                    </div>
                    <div style={sx({ display: "flex", flexDirection: "column", gap: "0.5rem" })}>
                      {task.options.map((opt, idx) => (
                        <button key={idx} onClick={() => setSelected(s => ({ ...s, [task.id]: idx }))}
                          style={sx({ background: selected[task.id] === idx ? "rgba(200,82,42,0.1)" : T.surface2, border: selected[task.id] === idx ? "1px solid #c8522a" : `1px solid ${T.border}`, borderRadius: "8px", padding: "0.8rem 1rem", color: selected[task.id] === idx ? T.ink : T.ink2, fontSize: "0.85rem", cursor: "pointer", textAlign: "left", display: "flex", alignItems: "center", gap: "0.6rem", transition: "all 0.2s" })}>
                          <span style={sx({ width: "22px", height: "22px", borderRadius: "50%", background: selected[task.id] === idx ? "#c8522a" : T.border, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-mono), monospace", fontSize: "0.65rem", flexShrink: 0, color: selected[task.id] === idx ? "white" : T.muted })}>
                            {String.fromCharCode(65 + idx)}
                          </span>
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}

                {/* Botão único */}
                <button
                  disabled={answeredCount === 0 || isPending}
                  onClick={submitAll}
                  style={sx({ width: "100%", marginTop: "0.5rem", background: answeredCount === 0 ? "rgba(200,82,42,0.3)" : "#c8522a", border: "none", borderRadius: "10px", padding: "1.1rem", color: "white", fontSize: "0.95rem", fontWeight: 700, cursor: answeredCount === 0 ? "not-allowed" : "pointer", opacity: isPending ? 0.7 : 1 })}>
                  {isPending ? "⏳ Enviando para blockchain..." : `Enviar ${answeredCount} resposta${answeredCount !== 1 ? "s" : ""} — 1 única transação →`}
                </button>
                <p style={sx({ fontFamily: "var(--font-mono), monospace", fontSize: "0.6rem", color: T.muted, textAlign: "center", marginTop: "0.6rem" })}>
                  Todas as respostas em 1 TX via batchValidate() — economia de gas
                </p>
              </>
            )}
          </>
        )}

        {/* Contract info */}
        <div style={sx({ background: T.surface, border: `1px solid ${T.border}`, borderRadius: "12px", padding: "1.2rem", marginTop: "1.5rem" })}>
          {[
            { label: "Protocol V4", val: "0xEbfA...4404", url: `https://sepolia.etherscan.io/address/${CONTRACT_ADDRESS}` },
            { label: "$GMND Token", val: "0x6587...18F0", url: `https://sepolia.etherscan.io/address/${TOKEN_ADDRESS}` },
            { label: "Rede", val: "Ethereum Sepolia", url: null },
          ].map(({ label, val, url }) => (
            <div key={label} style={sx({ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.5rem 0", borderBottom: `1px solid ${T.border}` })}>
              <span style={sx({ fontFamily: "var(--font-mono), monospace", fontSize: "0.6rem", color: T.muted, textTransform: "uppercase", letterSpacing: "0.08em" })}>{label}</span>
              {url ? <a href={url} target="_blank" rel="noopener noreferrer" style={sx({ fontFamily: "var(--font-mono), monospace", fontSize: "0.65rem", color: "#c8522a", textDecoration: "none" })}>{val}</a>
                   : <span style={sx({ fontFamily: "var(--font-mono), monospace", fontSize: "0.65rem", color: "#2d8a4e" })}>{val}</span>}
            </div>
          ))}
        </div>

      </div>
      <style>{`@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }`}</style>
    </div>
  );
}

export default function MaranetPage() {
  return <MaranetContent />;
}
