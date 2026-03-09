"use client";
import { useState, useEffect, useCallback } from "react";
import { ethers } from "ethers";
import { useWeb3 } from "@/lib/useWeb3";
import { BATCH_STATUS } from "@/lib/contract";

interface Batch { id: number; creator: string; reward: string; taskCount: number; deadline: number; status: number; }

export default function AdminPage() {
  const { isConnected, connect, getContract } = useWeb3();
  const [batches, setBatches]     = useState<Batch[]>([]);
  const [loading, setLoading]     = useState(false);
  const [finalizing, setFinalizing] = useState<Record<number, boolean>>({});
  const [results, setResults]     = useState<Record<number, string>>({});
  const [error, setError]         = useState("");

  const load = useCallback(async () => {
    const contract = getContract(false);
    if (!contract) return;
    setLoading(true);
    try {
      const count = await contract.batchCount();
      const list: Batch[] = [];
      for (let i = 0; i < Number(count); i++) {
        const info = await contract.getBatchInfo(i);
        list.push({
          id: i,
          creator: info.creator,
          reward: Number(ethers.formatUnits(info.reward, 18)).toFixed(0),
          taskCount: Number(info.taskCount),
          deadline: Number(info.deadline),
          status: Number(info.status),
        });
      }
      setBatches(list.reverse());
    } catch (e: any) { setError(e.message); }
    finally { setLoading(false); }
  }, [getContract]);

  useEffect(() => { if (isConnected) load(); }, [isConnected, load]);

  const finalize = async (batchId: number) => {
    setFinalizing(f => ({ ...f, [batchId]: true }));
    setResults(r => ({ ...r, [batchId]: "" }));
    try {
      const contract = getContract(true);
      if (!contract) throw new Error("Contrato indisponível");
      const tx = await contract.finalizeBatch(batchId);
      await tx.wait();
      setResults(r => ({ ...r, [batchId]: "ok" }));
      load();
    } catch (e: any) {
      setResults(r => ({ ...r, [batchId]: e.reason || e.message || "Erro" }));
    } finally {
      setFinalizing(f => ({ ...f, [batchId]: false }));
    }
  };

  const timeLeft = (deadline: number) => {
    const diff = deadline - Date.now() / 1000;
    if (diff <= 0) return "Expirado";
    const h = Math.floor(diff / 3600);
    const m = Math.floor((diff % 3600) / 60);
    return `${h}h ${m}m`;
  };

  const open = batches.filter(b => b.status === 0).length;
  const final = batches.filter(b => b.status === 1).length;

  const s = {
    page: { background: "var(--bg)", minHeight: "100vh", paddingTop: "7rem" } as React.CSSProperties,
    wrap: { maxWidth: "960px", margin: "0 auto", padding: "3rem 2rem 6rem" } as React.CSSProperties,
    eyebrow: { fontFamily: "var(--font-mono), monospace", fontSize: "0.65rem", color: "var(--muted)", letterSpacing: "0.15em", textTransform: "uppercase" as const, marginBottom: "0.8rem", display: "block" },
    title: { fontFamily: "var(--font-serif), serif", fontSize: "clamp(2.5rem, 5vw, 4rem)", lineHeight: 1.05, letterSpacing: "-0.02em", color: "var(--ink)", marginBottom: "0.6rem" } as React.CSSProperties,
    subtitle: { color: "var(--ink2)", fontSize: "1rem", fontWeight: 300, lineHeight: 1.7, marginBottom: "2.5rem" } as React.CSSProperties,

    statsRow: { display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1rem", marginBottom: "2.5rem" } as React.CSSProperties,
    statCard: { background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "6px", padding: "1.5rem 1.8rem" } as React.CSSProperties,
    statVal: { fontFamily: "var(--font-serif), serif", fontSize: "2.8rem", lineHeight: 1, color: "var(--accent)", display: "block" } as React.CSSProperties,
    statKey: { fontFamily: "var(--font-mono), monospace", fontSize: "0.62rem", color: "var(--muted)", textTransform: "uppercase" as const, letterSpacing: "0.1em", marginTop: "0.4rem", display: "block" },

    topRow: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem" } as React.CSSProperties,
    tableLabel: { fontFamily: "var(--font-mono), monospace", fontSize: "0.65rem", color: "var(--muted)", letterSpacing: "0.15em", textTransform: "uppercase" as const },
    refreshBtn: { fontFamily: "var(--font-mono), monospace", fontSize: "0.7rem", color: "var(--muted)", background: "none", border: "1px solid var(--border)", borderRadius: "2px", padding: "0.4rem 0.9rem", cursor: "none", letterSpacing: "0.08em" } as React.CSSProperties,

    table: { width: "100%", borderCollapse: "collapse" as const },
    th: { fontFamily: "var(--font-mono), monospace", fontSize: "0.6rem", color: "var(--muted)", letterSpacing: "0.1em", textTransform: "uppercase" as const, textAlign: "left" as const, padding: "0 1rem 0.75rem", borderBottom: "1px solid var(--border)" },
    td: { padding: "1.2rem 1rem", borderBottom: "1px solid var(--border2)", fontSize: "0.85rem", verticalAlign: "middle" as const },
    mono: { fontFamily: "var(--font-mono), monospace", fontSize: "0.78rem" } as React.CSSProperties,

    finalizeBtn: { background: "var(--ink)", color: "var(--bg)", border: "none", borderRadius: "2px", padding: "0.5rem 1rem", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.08em", textTransform: "uppercase" as const, cursor: "none", fontFamily: "var(--font-sans), sans-serif", transition: "all 0.2s" } as React.CSSProperties,

    connectBox: { textAlign: "center" as const, padding: "5rem 2rem" },
    connectBtn: { background: "var(--ink)", color: "var(--bg)", border: "none", borderRadius: "2px", padding: "0.95rem 2.2rem", fontWeight: 700, fontSize: "0.82rem", letterSpacing: "0.08em", textTransform: "uppercase" as const, cursor: "none", fontFamily: "var(--font-sans), sans-serif" } as React.CSSProperties,
  };

  const statusBadge = (status: number) => {
    const styles: Record<number, React.CSSProperties> = {
      0: { color: "var(--accent3)", border: "1px solid rgba(45,138,78,0.25)", background: "rgba(45,138,78,0.06)" },
      1: { color: "var(--accent2)", border: "1px solid rgba(26,58,143,0.25)", background: "rgba(26,58,143,0.06)" },
      2: { color: "var(--muted)",   border: "1px solid var(--border)",         background: "var(--bg2)" },
    };
    return (
      <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: "0.62rem", letterSpacing: "0.1em", padding: "0.25rem 0.6rem", borderRadius: "2px", ...styles[status] }}>
        {BATCH_STATUS[status]}
      </span>
    );
  };

  if (!isConnected) return (
    <div style={s.page}>
      <div style={s.wrap}>
        <div style={s.connectBox}>
          <span style={{ fontSize: "3rem", display: "block", marginBottom: "1.5rem" }}>⚙️</span>
          <h2 style={{ fontFamily: "var(--font-serif), serif", fontSize: "2rem", color: "var(--ink)", marginBottom: "0.5rem" }}>Admin</h2>
          <p style={{ color: "var(--ink2)", fontSize: "0.9rem", fontWeight: 300, marginBottom: "2rem" }}>Conecte sua carteira para monitorar e finalizar batches.</p>
          <button onClick={connect} style={s.connectBtn}>Conectar Carteira</button>
        </div>
      </div>
    </div>
  );

  return (
    <div style={s.page}>
      <div style={s.wrap}>
        <span style={s.eyebrow}>// Administração</span>
        <h1 style={s.title}>
          Todos os <em style={{ fontStyle: "italic", color: "var(--accent)" }}>Batches</em>
        </h1>
        <p style={s.subtitle}>Monitore a rede e finalize consensos para distribuir as recompensas GMND.</p>

        {/* Stats */}
        <div style={s.statsRow}>
          {[
            { val: batches.length.toString(), key: "Total de Batches" },
            { val: open.toString(),           key: "Abertos"          },
            { val: final.toString(),          key: "Finalizados"      },
          ].map(st => (
            <div key={st.key} style={s.statCard}>
              <span style={st.key === "Finalizados" ? { ...s.statVal, color: "var(--accent2)" } : s.statVal}>{st.val}</span>
              <span style={s.statKey}>{st.key}</span>
            </div>
          ))}
        </div>

        {error && <div style={{ background: "rgba(185,28,28,0.05)", border: "1px solid rgba(185,28,28,0.15)", borderRadius: "4px", padding: "0.85rem 1.2rem", fontSize: "0.82rem", color: "#b91c1c", marginBottom: "1.5rem" }}>{error}</div>}

        <div style={s.topRow}>
          <span style={s.tableLabel}>// Registro de Batches</span>
          <button onClick={load} style={s.refreshBtn}>↻ Atualizar</button>
        </div>

        <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "6px", overflow: "hidden" }}>
          <table style={s.table}>
            <thead>
              <tr style={{ background: "var(--bg2)" }}>
                {["Batch ID", "Criador", "Recompensa", "Tarefas", "Prazo", "Status", "Ação"].map(h => (
                  <th key={h} style={s.th}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={7} style={{ ...s.td, textAlign: "center", color: "var(--muted)", fontFamily: "var(--font-mono), monospace", fontSize: "0.75rem" }}>Carregando...</td></tr>
              ) : batches.length === 0 ? (
                <tr><td colSpan={7} style={{ ...s.td, textAlign: "center", color: "var(--muted)", fontStyle: "italic" }}>Nenhum batch encontrado</td></tr>
              ) : batches.map(b => (
                <tr key={b.id} style={{ transition: "background 0.2s" }}>
                  <td style={s.td}><span style={{ ...s.mono, color: "var(--accent)" }}>#{b.id}</span></td>
                  <td style={s.td}><span style={s.mono}>{b.creator.slice(0,6)}...{b.creator.slice(-4)}</span></td>
                  <td style={s.td}><span style={{ ...s.mono, fontWeight: 600 }}>{b.reward} GMND</span></td>
                  <td style={{ ...s.td, textAlign: "center" as const }}>{b.taskCount}</td>
                  <td style={s.td}><span style={s.mono}>{timeLeft(b.deadline)}</span></td>
                  <td style={s.td}>{statusBadge(b.status)}</td>
                  <td style={s.td}>
                    {b.status === 0 ? (
                      <div>
                        <button
                          onClick={() => finalize(b.id)}
                          disabled={finalizing[b.id]}
                          style={{ ...s.finalizeBtn, opacity: finalizing[b.id] ? 0.6 : 1 }}
                        >
                          {finalizing[b.id] ? "..." : "Finalizar"}
                        </button>
                        {results[b.id] && results[b.id] !== "ok" && (
                          <p style={{ fontFamily: "var(--font-mono), monospace", fontSize: "0.6rem", color: "var(--accent)", marginTop: "0.4rem", maxWidth: "160px", lineHeight: 1.4 }}>
                            {results[b.id]}
                          </p>
                        )}
                        {results[b.id] === "ok" && (
                          <p style={{ fontFamily: "var(--font-mono), monospace", fontSize: "0.6rem", color: "var(--accent3)", marginTop: "0.4rem" }}>✓ Finalizado</p>
                        )}
                      </div>
                    ) : (
                      <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: "0.65rem", color: "var(--muted)" }}>—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
