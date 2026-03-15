"use client";
import { useState } from "react";
import { ethers } from "ethers";

const CONTRACT_ADDRESS = "0x7Cb748160b81978Ef7B5a6C93f5415311f450994";
const TOKEN_ADDRESS    = "0x658719E24649F727C3608118bFA33A9Bac3f18F0";
const SEPOLIA_CHAIN_ID = 11155111;

const TOKEN_ABI = [
  "function balanceOf(address) view returns (uint256)",
  "function decimals() view returns (uint8)",
];

const PROTOCOL_ABI = [
  "function submitValidation(uint256 taskId, uint8 response) external",
];

const TASKS = [
  { id: 0, type: "Classificação de Texto", reward: 2.5, question: "Esta notícia é verdadeira, falsa ou não verificável?", context: '"Pesquisadores da USP desenvolveram uma IA capaz de diagnosticar dengue com 98% de precisão a partir de exames de sangue simples."', options: ["Verdadeira", "Falsa", "Não verificável"] },
  { id: 1, type: "Avaliação de Resposta IA", reward: 3.0, question: "Esta resposta de IA está correta e útil?", context: 'Pergunta: "Qual a capital do Pará?"\nResposta: "A capital do Pará é Belém, localizada na região Norte do Brasil."', options: ["Correta e útil", "Parcialmente correta", "Incorreta"] },
  { id: 2, type: "Verificação de Fato", reward: 2.0, question: "Este dado estatístico parece plausível?", context: '"A China instalou 295.000 novos robôs industriais em 2024, mais que todos os outros países combinados."', options: ["Plausível e verificável", "Improvável", "Impossível verificar"] },
];

export default function MaranetPage() {
  const [wallet, setWallet]       = useState<string | null>(null);
  const [balance, setBalance]     = useState(0);
  const [tasksDone, setTasksDone] = useState(0);
  const [nodeActive, setNodeActive] = useState(true);
  const [selected, setSelected]   = useState<Record<number, number>>({});
  const [done, setDone]           = useState<Record<number, string>>({});
  const [loading, setLoading]     = useState<Record<number, boolean>>({});
  const [toast, setToast]         = useState("");
  const [network, setNetwork]     = useState(false);
  const [dark, setDark]           = useState(true);

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

  const connectWallet = async () => {
    if (!window.ethereum) { showToast("Instale a MetaMask para continuar"); return; }
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      const net = await provider.getNetwork();
      if (Number(net.chainId) !== SEPOLIA_CHAIN_ID) {
        showToast("Troque para Sepolia Testnet!");
        await window.ethereum.request({ method: "wallet_switchEthereumChain", params: [{ chainId: "0xaa36a7" }] });
        return;
      }
      setWallet(accounts[0]); setNetwork(true);
      const token = new ethers.Contract(TOKEN_ADDRESS, TOKEN_ABI, provider);
      const bal = await token.balanceOf(accounts[0]);
      const dec = await token.decimals();
      setBalance(parseFloat(ethers.formatUnits(bal, dec)));
    } catch (e: any) { showToast("Erro: " + (e.message?.slice(0, 40) || "Tente novamente")); }
  };

  const submitTask = async (taskId: number, optionIdx: number, reward: number) => {
    if (!wallet) { showToast("Conecte sua carteira!"); return; }
    setLoading(l => ({ ...l, [taskId]: true }));
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, PROTOCOL_ABI, signer);
      const tx = await contract.submitValidation(taskId, optionIdx);
      await tx.wait();
      setDone(d => ({ ...d, [taskId]: tx.hash }));
      setTasksDone(t => t + 1);
      setBalance(b => b + reward);
      showToast("+" + reward + " GMND ganhos! 🎉");
    } catch (e: any) {
      if (e.code === 4001) showToast("Transação cancelada");
      else showToast("Erro: " + (e.reason || e.message?.slice(0, 40) || "Tente novamente"));
    } finally { setLoading(l => ({ ...l, [taskId]: false })); }
  };

  const shortAddr = wallet ? wallet.slice(0,6) + "..." + wallet.slice(-4) : "";
  const s = (x: React.CSSProperties): React.CSSProperties => x;

  return (
    <div style={s({ background: T.bg, minHeight: "100vh", fontFamily: "var(--font-sans), sans-serif", color: T.ink, paddingBottom: "5rem", transition: "background 0.3s, color 0.3s" })}>

      {toast && <div style={s({ position: "fixed", top: "80px", left: "50%", transform: "translateX(-50%)", background: "#2d8a4e", color: "white", padding: "0.7rem 1.5rem", borderRadius: "30px", fontFamily: "var(--font-mono), monospace", fontSize: "0.85rem", zIndex: 200, whiteSpace: "nowrap" })}>{toast}</div>}

      {/* Header */}
      <div style={s({ padding: "1.2rem 1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: `1px solid ${T.border}`, position: "sticky", top: 0, background: T.hbg, backdropFilter: "blur(12px)", zIndex: 100, transition: "background 0.3s" })}>
        <div style={s({ display: "flex", alignItems: "center", gap: "0.6rem" })}>
          <div style={s({ width: "32px", height: "32px", background: "#c8522a", borderRadius: "7px", display: "flex", alignItems: "center", justifyContent: "center", fontStyle: "italic", fontSize: "1.1rem", color: "white", fontFamily: "var(--font-serif), serif" })}>G</div>
          <span style={s({ fontFamily: "var(--font-serif), serif", fontSize: "1.1rem", color: T.ink })}>
            GlobalMind<sup style={s({ fontFamily: "var(--font-mono), monospace", fontSize: "0.55rem", color: "#c8522a", marginLeft: "2px" })}>GMND</sup>
          </span>
        </div>
        <div style={s({ display: "flex", alignItems: "center", gap: "0.6rem" })}>
          {/* Theme toggle */}
          <button onClick={() => setDark(d => !d)} title={dark ? "Modo claro" : "Modo escuro"}
            style={s({ background: T.surface, border: `1px solid ${T.border}`, borderRadius: "20px", padding: "0.3rem 0.7rem", cursor: "pointer", fontSize: "0.9rem", transition: "all 0.2s" })}>
            {dark ? "☀️" : "🌙"}
          </button>
          {network && (
            <div style={s({ display: "flex", alignItems: "center", gap: "0.4rem", background: "rgba(45,138,78,0.12)", border: "1px solid rgba(45,138,78,0.3)", borderRadius: "20px", padding: "0.3rem 0.8rem", fontFamily: "var(--font-mono), monospace", fontSize: "0.62rem", color: "#2d8a4e" })}>
              <span style={s({ width: "6px", height: "6px", borderRadius: "50%", background: "#2d8a4e", display: "inline-block", animation: "pulse 2s infinite" })} />
              SEPOLIA
            </div>
          )}
          <button onClick={connectWallet} style={s({ background: wallet ? "rgba(45,138,78,0.1)" : "#c8522a", border: wallet ? "1px solid rgba(45,138,78,0.3)" : "none", color: wallet ? "#2d8a4e" : "white", padding: "0.4rem 1rem", borderRadius: "20px", fontFamily: "var(--font-mono), monospace", fontSize: "0.65rem", cursor: "pointer" })}>
            {wallet ? shortAddr : "Conectar"}
          </button>
        </div>
      </div>

      <div style={s({ maxWidth: "480px", margin: "0 auto", padding: "1.5rem 1rem" })}>

        {/* Maranet badge */}
        <div style={s({ display: "flex", alignItems: "center", gap: "0.5rem", background: "rgba(26,58,143,0.1)", border: "1px solid rgba(26,58,143,0.25)", borderRadius: "8px", padding: "0.7rem 1rem", marginBottom: "1rem" })}>
          <span>📡</span>
          <span style={s({ fontSize: "0.78rem", color: T.ink2 })}>Cliente <strong style={s({ color: T.ink })}>Maranet Telecom</strong> — Marabá, PA 🇧🇷</span>
        </div>

        {/* Balance */}
        <div style={s({ background: T.surface, border: `1px solid ${T.border}`, borderRadius: "16px", padding: "1.8rem", marginBottom: "1rem", position: "relative", overflow: "hidden", transition: "background 0.3s" })}>
          <div style={s({ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: "linear-gradient(90deg, #c8522a, #1a3a8f, #2d8a4e)" })} />
          <div style={s({ fontFamily: "var(--font-mono), monospace", fontSize: "0.6rem", color: T.muted, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "0.5rem" })}>Seu saldo $GMND</div>
          <div style={s({ fontFamily: "var(--font-serif), serif", fontSize: "3rem", lineHeight: 1, marginBottom: "0.3rem", color: T.ink })}>
            {balance.toFixed(1)} <span style={s({ fontSize: "1.2rem", color: "#c8522a", fontFamily: "var(--font-mono), monospace" })}>GMND</span>
          </div>
          <div style={s({ fontSize: "0.8rem", color: T.ink2, marginBottom: "1.5rem" })}>≈ ${(balance * 0.003).toFixed(4)} USD · preço seed $0.003</div>
          <div style={s({ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.8rem" })}>
            {[{ val: tasksDone.toString(), key: "Tarefas" }, { val: wallet ? "94%" : "—", key: "Precisão" }, { val: wallet ? shortAddr : "—", key: "Carteira" }].map(({ val, key }) => (
              <div key={key} style={s({ background: T.surface2, borderRadius: "8px", padding: "0.8rem", textAlign: "center", transition: "background 0.3s" })}>
                <span style={s({ fontFamily: "var(--font-serif), serif", fontSize: "1rem", color: "#c8522a", display: "block" })}>{val}</span>
                <span style={s({ fontFamily: "var(--font-mono), monospace", fontSize: "0.5rem", color: T.muted, textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginTop: "0.2rem" })}>{key}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Node toggle */}
        <div style={s({ background: T.surface, border: `1px solid ${T.border}`, borderRadius: "16px", padding: "1.5rem", marginBottom: "1rem", display: "flex", alignItems: "center", justifyContent: "space-between", transition: "background 0.3s" })}>
          <div>
            <div style={s({ fontSize: "0.95rem", fontWeight: 700, marginBottom: "0.2rem", color: T.ink })}>Node em background</div>
            <div style={s({ fontSize: "0.75rem", color: T.ink2, lineHeight: 1.5 })}>Seu dispositivo valida dados<br/>automaticamente e ganha GMND.</div>
          </div>
          <div onClick={() => setNodeActive(n => !n)} style={s({ width: "52px", height: "28px", background: nodeActive ? "#2d8a4e" : T.surface2, borderRadius: "14px", border: nodeActive ? "1px solid #2d8a4e" : `1px solid ${T.border}`, cursor: "pointer", position: "relative", transition: "background 0.3s", flexShrink: 0 })}>
            <div style={s({ position: "absolute", width: "22px", height: "22px", background: "white", borderRadius: "50%", top: "2px", left: nodeActive ? "27px" : "3px", transition: "left 0.3s", boxShadow: "0 2px 6px rgba(0,0,0,0.3)" })} />
          </div>
        </div>

        {/* Connect prompt */}
        {!wallet && (
          <div style={s({ background: T.surface, border: `1px solid ${T.border}`, borderRadius: "16px", padding: "2rem", marginBottom: "1rem", textAlign: "center", transition: "background 0.3s" })}>
            <div style={s({ fontSize: "2.5rem", marginBottom: "1rem" })}>🔗</div>
            <div style={s({ fontFamily: "var(--font-serif), serif", fontSize: "1.4rem", marginBottom: "0.5rem", color: T.ink })}>Conecte sua carteira</div>
            <div style={s({ fontSize: "0.82rem", color: T.ink2, marginBottom: "1.5rem", lineHeight: 1.6 })}>Conecte MetaMask na rede Sepolia para submeter validações on-chain e ganhar $GMND.</div>
            <button onClick={connectWallet} style={s({ width: "100%", background: "#c8522a", border: "none", borderRadius: "10px", padding: "1rem", color: "white", fontSize: "0.95rem", fontWeight: 700, cursor: "pointer", fontFamily: "var(--font-sans), sans-serif" })}>Conectar MetaMask</button>
            <div style={s({ marginTop: "0.8rem", fontSize: "0.72rem", color: T.muted, fontFamily: "var(--font-mono), monospace" })}>Rede: Ethereum Sepolia Testnet</div>
          </div>
        )}

        {/* Tasks */}
        <div style={s({ fontFamily: "var(--font-mono), monospace", fontSize: "0.62rem", color: T.muted, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "0.8rem", marginTop: "1.5rem" })}>Tarefas disponíveis · on-chain</div>

        {TASKS.map(task => (
          <div key={task.id} style={s({ background: T.surface, border: done[task.id] ? "1px solid #2d8a4e" : `1px solid ${T.border}`, borderRadius: "16px", padding: "1.5rem", marginBottom: "0.8rem", transition: "border-color 0.2s, background 0.3s" })}>
            <div style={s({ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "1rem" })}>
              <span style={s({ fontFamily: "var(--font-mono), monospace", fontSize: "0.58rem", color: "#c8522a", letterSpacing: "0.12em", textTransform: "uppercase", background: "rgba(200,82,42,0.1)", border: "1px solid rgba(200,82,42,0.2)", borderRadius: "4px", padding: "0.2rem 0.5rem" })}>{task.type}</span>
              <span style={s({ fontFamily: "var(--font-mono), monospace", fontSize: "0.75rem", color: "#2d8a4e", fontWeight: 500 })}>+{task.reward} GMND</span>
            </div>
            {done[task.id] ? (
              <div style={s({ textAlign: "center", padding: "1rem 0" })}>
                <div style={s({ fontSize: "2.5rem", marginBottom: "0.5rem" })}>✅</div>
                <div style={s({ fontFamily: "var(--font-serif), serif", fontSize: "1.3rem", color: "#2d8a4e", marginBottom: "0.2rem" })}>+{task.reward} GMND ganhos!</div>
                <div style={s({ fontSize: "0.8rem", color: T.ink2, marginBottom: "0.5rem" })}>Transação enviada para a blockchain</div>
                <a href={`https://sepolia.etherscan.io/tx/${done[task.id]}`} target="_blank" rel="noopener noreferrer" style={s({ fontFamily: "var(--font-mono), monospace", fontSize: "0.62rem", color: "#c8522a", textDecoration: "none", wordBreak: "break-all" })}>
                  {done[task.id].slice(0,20)}... → Etherscan
                </a>
              </div>
            ) : (
              <>
                <div style={s({ fontSize: "0.95rem", lineHeight: 1.6, color: T.ink, marginBottom: "1.2rem" })}>
                  {task.question}<br/><br/>
                  <em style={s({ color: T.ink2, fontSize: "0.88rem" })}>{task.context}</em>
                </div>
                <div style={s({ display: "flex", flexDirection: "column", gap: "0.5rem" })}>
                  {task.options.map((opt, idx) => (
                    <button key={idx} onClick={() => setSelected(s2 => ({ ...s2, [task.id]: idx }))}
                      style={s({ background: selected[task.id] === idx ? "rgba(200,82,42,0.1)" : T.surface2, border: selected[task.id] === idx ? "1px solid #c8522a" : `1px solid ${T.border}`, borderRadius: "8px", padding: "0.8rem 1rem", color: selected[task.id] === idx ? T.ink : T.ink2, fontSize: "0.85rem", fontFamily: "var(--font-sans), sans-serif", cursor: "pointer", textAlign: "left", display: "flex", alignItems: "center", gap: "0.6rem", transition: "all 0.2s" })}>
                      <span style={s({ width: "22px", height: "22px", borderRadius: "50%", background: selected[task.id] === idx ? "#c8522a" : T.border, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-mono), monospace", fontSize: "0.65rem", flexShrink: 0, color: selected[task.id] === idx ? "white" : T.muted })}>
                        {String.fromCharCode(65 + idx)}
                      </span>
                      {opt}
                    </button>
                  ))}
                </div>
                <button disabled={selected[task.id] === undefined || loading[task.id]}
                  onClick={() => submitTask(task.id, selected[task.id], task.reward)}
                  style={s({ width: "100%", marginTop: "1rem", background: selected[task.id] === undefined ? "rgba(200,82,42,0.3)" : "#c8522a", border: "none", borderRadius: "8px", padding: "0.9rem", color: "white", fontFamily: "var(--font-sans), sans-serif", fontSize: "0.9rem", fontWeight: 700, cursor: selected[task.id] === undefined ? "not-allowed" : "pointer", opacity: loading[task.id] ? 0.7 : 1, transition: "opacity 0.2s" })}>
                  {loading[task.id] ? "⟳ Enviando para blockchain..." : "Confirmar e Submeter On-Chain"}
                </button>
              </>
            )}
          </div>
        ))}

        {/* Contract info */}
        <div style={s({ background: T.surface, border: `1px solid ${T.border}`, borderRadius: "12px", padding: "1.2rem", marginTop: "1rem", transition: "background 0.3s" })}>
          {[
            { label: "Protocol V2", val: "0x7Cb7...0994", url: `https://sepolia.etherscan.io/address/${CONTRACT_ADDRESS}` },
            { label: "$GMND Token V3", val: "0x6587...18F0", url: `https://sepolia.etherscan.io/address/${TOKEN_ADDRESS}` },
            { label: "Rede", val: "Ethereum Sepolia", url: null },
          ].map(({ label, val, url }) => (
            <div key={label} style={s({ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.5rem 0", borderBottom: `1px solid ${T.border}` })}>
              <span style={s({ fontFamily: "var(--font-mono), monospace", fontSize: "0.6rem", color: T.muted, textTransform: "uppercase", letterSpacing: "0.08em" })}>{label}</span>
              {url ? <a href={url} target="_blank" rel="noopener noreferrer" style={s({ fontFamily: "var(--font-mono), monospace", fontSize: "0.65rem", color: "#c8522a", textDecoration: "none" })}>{val}</a> : <span style={s({ fontFamily: "var(--font-mono), monospace", fontSize: "0.65rem", color: "#2d8a4e" })}>{val}</span>}
            </div>
          ))}
        </div>

      </div>
      <style>{`@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }`}</style>
    </div>
  );
}
