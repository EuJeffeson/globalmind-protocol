"use client";
import { useState, useEffect, useCallback } from "react";
import { ethers } from "ethers";
import { useWeb3 } from "@/lib/useWeb3";
import { GMND_TOKEN_ADDRESS, GMND_TOKEN_ABI } from "@/lib/contract";

export default function DashboardPage() {
  const { isConnected, connect, address, getContract, provider } = useWeb3();
  const [profile, setProfile] = useState({ score: 0, totalTasks: 0, earned: "0" });
  const [gmndBal, setGmndBal] = useState("0");
  const [ethBal,  setEthBal]  = useState("0");
  const [netStats, setNetStats] = useState({ batches: 0, burned: "0", rewarded: "0" });
  const [loading, setLoading]  = useState(false);

  const load = useCallback(async () => {
    if (!address) return;
    setLoading(true);
    try {
      const contract = getContract(false);
      if (!contract) return;

      const [p, ns] = await Promise.all([
        contract.getNodeProfile(address),
        contract.getNetworkStats(),
      ]);
      setProfile({
        score: Number(p.score),
        totalTasks: Number(p.totalTasks),
        earned: ethers.formatUnits(p.earned, 18),
      });
      setNetStats({
        batches: Number(ns._totalBatches),
        burned: Number(ethers.formatUnits(ns._totalBurned, 18)).toFixed(0),
        rewarded: Number(ethers.formatUnits(ns._totalRewarded, 18)).toFixed(0),
      });

      if (provider) {
        const eth = await provider.getBalance(address);
        setEthBal(Number(ethers.formatEther(eth)).toFixed(4));
        const token = new ethers.Contract(GMND_TOKEN_ADDRESS, GMND_TOKEN_ABI, provider);
        const gmnd = await token.balanceOf(address);
        if (gmnd != null) {
          setGmndBal(Number(ethers.formatUnits(gmnd, 18)).toLocaleString());
        }
      }
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  }, [address, getContract, provider]);

  useEffect(() => { if (isConnected) load(); }, [isConnected, load]);

  const level = profile.score >= 200 ? "Expert" : profile.score >= 50 ? "Validador" : "Iniciante";
  const levelColor = profile.score >= 200 ? "var(--accent)" : profile.score >= 50 ? "var(--accent2)" : "var(--muted)";
  const progress = Math.min((profile.score / 500) * 100, 100);

  const s = {
    page: { background: "var(--bg)", minHeight: "100vh", paddingTop: "7rem" } as React.CSSProperties,
    wrap: { maxWidth: "800px", margin: "0 auto", padding: "3rem 2rem 6rem" } as React.CSSProperties,
    eyebrow: { fontFamily: "var(--font-mono), monospace", fontSize: "0.65rem", color: "var(--muted)", letterSpacing: "0.15em", textTransform: "uppercase" as const, marginBottom: "0.8rem", display: "block" },
    title: { fontFamily: "var(--font-serif), serif", fontSize: "clamp(2.5rem, 5vw, 4rem)", lineHeight: 1.05, letterSpacing: "-0.02em", color: "var(--ink)", marginBottom: "0.6rem" } as React.CSSProperties,
    subtitle: { color: "var(--ink2)", fontSize: "1rem", fontWeight: 300, lineHeight: 1.7, marginBottom: "2.5rem" } as React.CSSProperties,

    profileCard: { background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "6px", padding: "2rem", marginBottom: "1.5rem" } as React.CSSProperties,
    profileTop: { display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "1.5rem" } as React.CSSProperties,
    levelBadge: { fontFamily: "var(--font-mono), monospace", fontSize: "0.65rem", letterSpacing: "0.1em", padding: "0.3rem 0.75rem", borderRadius: "2px", border: `1px solid ${levelColor}`, color: levelColor, background: `${levelColor}15` },
    onlineDot: { display: "flex", alignItems: "center", gap: "0.4rem", fontFamily: "var(--font-mono), monospace", fontSize: "0.65rem", color: "var(--accent3)" },
    addr: { fontFamily: "var(--font-mono), monospace", fontSize: "0.75rem", color: "var(--ink2)", marginBottom: "1.2rem", wordBreak: "break-all" as const },
    progressBar: { height: "4px", background: "var(--bg2)", borderRadius: "2px", overflow: "hidden", marginBottom: "0.5rem" } as React.CSSProperties,
    progressFill: { height: "100%", width: `${progress}%`, background: "var(--accent)", borderRadius: "2px", transition: "width 1s ease" } as React.CSSProperties,
    progressLabel: { display: "flex", justifyContent: "space-between", fontFamily: "var(--font-mono), monospace", fontSize: "0.62rem", color: "var(--muted)" } as React.CSSProperties,

    grid4: { display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "1rem", marginBottom: "1.5rem" } as React.CSSProperties,
    grid2: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1.5rem" } as React.CSSProperties,

    statCard: { background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "6px", padding: "1.5rem", transition: "all 0.3s" } as React.CSSProperties,
    statVal: { fontFamily: "var(--font-serif), serif", fontSize: "2.2rem", lineHeight: 1, color: "var(--accent)", display: "block", marginBottom: "0.4rem" } as React.CSSProperties,
    statKey: { fontFamily: "var(--font-mono), monospace", fontSize: "0.62rem", color: "var(--muted)", textTransform: "uppercase" as const, letterSpacing: "0.1em" },

    sectionTitle: { fontFamily: "var(--font-mono), monospace", fontSize: "0.65rem", color: "var(--muted)", letterSpacing: "0.15em", textTransform: "uppercase" as const, marginBottom: "1rem", display: "block", marginTop: "0.5rem" },

    netCard: { background: "var(--ink)", borderRadius: "6px", padding: "2rem", display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1.5rem" } as React.CSSProperties,
    netVal: { fontFamily: "var(--font-serif), serif", fontSize: "2rem", color: "var(--bg)", display: "block", marginBottom: "0.3rem" } as React.CSSProperties,
    netKey: { fontFamily: "var(--font-mono), monospace", fontSize: "0.6rem", color: "rgba(244,241,235,0.4)", textTransform: "uppercase" as const, letterSpacing: "0.1em" },

    howCard: { background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "6px", padding: "2rem" } as React.CSSProperties,
    howTitle: { fontSize: "0.9rem", fontWeight: 800, marginBottom: "1.2rem", color: "var(--ink)" },
    howRow: { display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: "0.75rem", marginBottom: "0.75rem", borderBottom: "1px solid var(--border2)", fontSize: "0.83rem" } as React.CSSProperties,

    connectBox: { textAlign: "center" as const, padding: "5rem 2rem" },
    connectBtn: { background: "var(--ink)", color: "var(--bg)", border: "none", borderRadius: "2px", padding: "0.95rem 2.2rem", fontWeight: 700, fontSize: "0.82rem", letterSpacing: "0.08em", textTransform: "uppercase" as const, cursor: "none", fontFamily: "var(--font-sans), sans-serif" } as React.CSSProperties,
  };

  if (!isConnected) return (
    <div style={s.page}>
      <div style={s.wrap}>
        <div style={s.connectBox}>
          <span style={{ fontSize: "3rem", display: "block", marginBottom: "1.5rem" }}>📊</span>
          <h2 style={{ fontFamily: "var(--font-serif), serif", fontSize: "2rem", color: "var(--ink)", marginBottom: "0.5rem" }}>Dashboard do Nó</h2>
          <p style={{ color: "var(--ink2)", fontSize: "0.9rem", fontWeight: 300, marginBottom: "2rem" }}>Conecte sua carteira para ver seu perfil PoEC.</p>
          <button onClick={connect} style={s.connectBtn}>Conectar Carteira</button>
        </div>
      </div>
    </div>
  );

  return (
    <div style={s.page}>
      <div style={s.wrap}>
        <span style={s.eyebrow}>// Dashboard do Nó</span>
        <h1 style={s.title}>
          Seu <em style={{ fontStyle: "italic", color: "var(--accent)" }}>Score PoEC</em>
        </h1>
        <p style={s.subtitle}>Perfil, recompensas acumuladas e estatísticas da rede global.</p>

        {/* Profile card */}
        <div style={s.profileCard}>
          <div style={s.profileTop}>
            <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
              <span style={s.levelBadge}>{level}</span>
              <span style={s.onlineDot}><span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--accent3)", display: "inline-block" }} />Online</span>
            </div>
            <button onClick={load} style={{ background: "none", border: "none", color: "var(--muted)", cursor: "none", fontSize: "0.85rem" }}>
              {loading ? "⟳" : "↻"}
            </button>
          </div>
          <p style={s.addr}>{address}</p>
          <div style={s.progressBar}><div style={s.progressFill} /></div>
          <div style={s.progressLabel}>
            <span>Score PoEC: {profile.score} pts</span>
            <span>{500 - profile.score > 0 ? `${500 - profile.score} pts para Expert` : "Expert ✓"}</span>
          </div>
        </div>

        {/* Stats */}
        <div style={s.grid4}>
          {[
            { val: `${profile.score}`, key: "Score PoEC", color: "var(--accent)" },
            { val: `${profile.totalTasks}`, key: "Tarefas Totais", color: "var(--ink)" },
            { val: `${Number(profile.earned).toFixed(0)}`, key: "GMND Ganho", color: "var(--accent2)" },
            { val: gmndBal, key: "Saldo GMND", color: "var(--accent3)" },
          ].map(s2 => (
            <div key={s2.key} style={s.statCard}>
              <span style={{ ...s.statVal, color: s2.color }}>{s2.val}</span>
              <span style={s.statKey}>{s2.key}</span>
            </div>
          ))}
        </div>

        {/* ETH balance */}
        <div style={{ ...s.statCard, marginBottom: "1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontSize: "0.9rem", color: "var(--ink2)" }}>Saldo ETH (gas)</span>
          <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: "1rem", color: "var(--ink)", fontWeight: 600 }}>{ethBal} ETH</span>
        </div>

        {/* Network stats */}
        <span style={s.sectionTitle}>// Estatísticas da Rede</span>
        <div style={s.netCard}>
          {[
            { val: netStats.batches.toString(), key: "Total de Batches" },
            { val: `🔥 ${netStats.burned}`, key: "GMND Queimado" },
            { val: netStats.rewarded, key: "GMND Distribuído" },
          ].map(n => (
            <div key={n.key}>
              <span style={s.netVal}>{n.val}</span>
              <span style={s.netKey}>{n.key}</span>
            </div>
          ))}
        </div>

        {/* How it works */}
        <span style={{ ...s.sectionTitle, marginTop: "1.5rem" }}>// Como funciona o Score PoEC</span>
        <div style={s.howCard}>
          <div style={s.howRow}>
            <span style={{ color: "var(--ink2)" }}>+10 pts por resposta no consenso majoritário</span>
            <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: "0.72rem", color: "var(--accent)" }}>Acurácia</span>
          </div>
          <div style={s.howRow}>
            <span style={{ color: "var(--ink2)" }}>Score determina peso nas distribuições futuras</span>
            <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: "0.72rem", color: "var(--accent2)" }}>Reputação</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.83rem" }}>
            <span style={{ color: "var(--ink2)" }}>Score alto = acesso a tarefas prioritárias</span>
            <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: "0.72rem", color: "var(--accent3)" }}>Privilégio</span>
          </div>
        </div>
      </div>
    </div>
  );
}
