"use client";
import { useState, useEffect, useCallback } from "react";
import { ethers } from "ethers";
import { useWeb3 } from "@/lib/useWeb3";
import { TASK_TYPES, BATCH_STATUS } from "@/lib/contract";

interface Task { batchId: number; taskIndex: number; content: string; taskType: number; reward: string; deadline: number; }

export default function TarefasPage() {
  const { isConnected, connect, address, getContract } = useWeb3();
  const [tasks, setTasks]     = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [sending, setSending] = useState<Record<string, boolean>>({});
  const [done, setDone]       = useState<Record<string, boolean>>({});
  const [error, setError]     = useState("");

  const loadTasks = useCallback(async () => {
    const contract = getContract(false);
    if (!contract) return;
    setLoading(true);
    try {
      const count = await contract.batchCount();
      const found: Task[] = [];
      for (let i = 0; i < Number(count); i++) {
        const info = await contract.getBatchInfo(i);
        if (Number(info.status) !== 0) continue;
        if (Number(info.deadline) < Date.now() / 1000) continue;
        for (let j = 0; j < Number(info.taskCount); j++) {
          const already = address ? await contract.hasAnswered(i, j, address) : false;
          const isCreator = address?.toLowerCase() === info.creator.toLowerCase();
          if (already || isCreator) continue;
          const task = await contract.getTask(i, j);
          found.push({
            batchId: i, taskIndex: j,
            content: task.content, taskType: Number(task.taskType),
            reward: ethers.formatUnits(info.reward, 18),
            deadline: Number(info.deadline),
          });
        }
      }
      setTasks(found);
    } catch (e: any) { setError(e.message); }
    finally { setLoading(false); }
  }, [getContract, address]);

  useEffect(() => { if (isConnected) loadTasks(); }, [isConnected, loadTasks]);

  const submitAnswer = async (task: Task) => {
    const key = `${task.batchId}-${task.taskIndex}`;
    const ans = answers[key]?.trim();
    if (!ans) return;
    setSending(s => ({ ...s, [key]: true }));
    try {
      const contract = getContract(true);
      if (!contract) throw new Error("Contrato indisponível");
      let gasLimit = 150000n;
      try {
        const est = await contract.submitAnswer.estimateGas(task.batchId, task.taskIndex, ans);
        gasLimit = est * 130n / 100n;
      } catch { /* use fallback */ }
      const tx = await contract.submitAnswer(task.batchId, task.taskIndex, ans, { gasLimit });
      await tx.wait();
      setDone(d => ({ ...d, [key]: true }));
    } catch (e: any) { setError(e.reason || e.message); }
    finally { setSending(s => ({ ...s, [key]: false })); }
  };

  const timeLeft = (deadline: number) => {
    const diff = deadline - Date.now() / 1000;
    if (diff <= 0) return "Expirado";
    const h = Math.floor(diff / 3600);
    const m = Math.floor((diff % 3600) / 60);
    return `${h}h ${m}m restantes`;
  };

  const s = {
    page: { background: "var(--bg)", minHeight: "100vh", paddingTop: "7rem" } as React.CSSProperties,
    wrap: { maxWidth: "800px", margin: "0 auto", padding: "3rem 2rem 6rem" } as React.CSSProperties,
    eyebrow: { fontFamily: "var(--font-mono), monospace", fontSize: "0.65rem", color: "var(--muted)", letterSpacing: "0.15em", textTransform: "uppercase" as const, marginBottom: "0.8rem", display: "block" },
    title: { fontFamily: "var(--font-serif), serif", fontSize: "clamp(2.5rem, 5vw, 4rem)", lineHeight: 1.05, letterSpacing: "-0.02em", color: "var(--ink)", marginBottom: "0.6rem" } as React.CSSProperties,
    subtitle: { color: "var(--ink2)", fontSize: "1rem", fontWeight: 300, lineHeight: 1.7, marginBottom: "2rem" } as React.CSSProperties,

    topRow: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2.5rem", paddingBottom: "1.5rem", borderBottom: "1px solid var(--border)" } as React.CSSProperties,
    countBadge: { display: "flex", alignItems: "center", gap: "0.5rem", fontFamily: "var(--font-mono), monospace", fontSize: "0.75rem", color: tasks.length > 0 ? "var(--accent3)" : "var(--muted)" } as React.CSSProperties,
    dot: { width: "8px", height: "8px", borderRadius: "50%", background: tasks.length > 0 ? "var(--accent3)" : "var(--muted)" } as React.CSSProperties,
    refreshBtn: { fontFamily: "var(--font-mono), monospace", fontSize: "0.7rem", color: "var(--muted)", background: "none", border: "1px solid var(--border)", borderRadius: "2px", padding: "0.4rem 0.9rem", cursor: "none", letterSpacing: "0.08em", transition: "all 0.2s" } as React.CSSProperties,

    taskCard: { background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "6px", padding: "2rem", marginBottom: "1rem", position: "relative", overflow: "hidden", transition: "all 0.3s" } as React.CSSProperties,

    cardTop: { display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "1.2rem" } as React.CSSProperties,
    badges: { display: "flex", gap: "0.5rem", flexWrap: "wrap" as const },
    batchBadge: { fontFamily: "var(--font-mono), monospace", fontSize: "0.62rem", letterSpacing: "0.1em", padding: "0.25rem 0.6rem", borderRadius: "2px", background: "var(--bg2)", color: "var(--ink2)", border: "1px solid var(--border)" },
    typeBadge: { fontFamily: "var(--font-mono), monospace", fontSize: "0.62rem", letterSpacing: "0.1em", padding: "0.25rem 0.6rem", borderRadius: "2px", color: "var(--accent2)", border: "1px solid rgba(26,58,143,0.2)", background: "rgba(26,58,143,0.06)" },
    time: { fontFamily: "var(--font-mono), monospace", fontSize: "0.65rem", color: "var(--muted)" },

    content: { fontSize: "0.95rem", color: "var(--ink)", lineHeight: 1.7, marginBottom: "1.5rem", fontWeight: 400 } as React.CSSProperties,
    reward: { fontFamily: "var(--font-mono), monospace", fontSize: "0.72rem", color: "var(--muted)", marginBottom: "1.2rem" } as React.CSSProperties,

    inputRow: { display: "flex", gap: "0.75rem" } as React.CSSProperties,
    input: { flex: 1, background: "var(--bg)", border: "1px solid var(--border)", borderRadius: "4px", padding: "0.75rem 1rem", fontSize: "0.9rem", color: "var(--ink)", fontFamily: "var(--font-sans), sans-serif", outline: "none" } as React.CSSProperties,
    sendBtn: { background: "var(--ink)", color: "var(--bg)", border: "none", borderRadius: "2px", padding: "0.75rem 1.5rem", fontWeight: 700, fontSize: "0.78rem", letterSpacing: "0.08em", textTransform: "uppercase" as const, cursor: "none", fontFamily: "var(--font-sans), sans-serif", transition: "all 0.2s", whiteSpace: "nowrap" as const } as React.CSSProperties,

    doneBadge: { background: "rgba(45,138,78,0.08)", border: "1px solid rgba(45,138,78,0.2)", borderRadius: "4px", padding: "0.75rem 1rem", fontFamily: "var(--font-mono), monospace", fontSize: "0.75rem", color: "var(--accent3)", textAlign: "center" as const } as React.CSSProperties,

    connectBox: { textAlign: "center" as const, padding: "5rem 2rem" },
    connectIcon: { fontSize: "3rem", marginBottom: "1.5rem", display: "block" },
    connectTitle: { fontFamily: "var(--font-serif), serif", fontSize: "2rem", color: "var(--ink)", marginBottom: "0.5rem" },
    connectSub: { color: "var(--ink2)", fontSize: "0.9rem", fontWeight: 300, marginBottom: "2rem" },
    connectBtn: { background: "var(--ink)", color: "var(--bg)", border: "none", borderRadius: "2px", padding: "0.95rem 2.2rem", fontWeight: 700, fontSize: "0.82rem", letterSpacing: "0.08em", textTransform: "uppercase" as const, cursor: "none", fontFamily: "var(--font-sans), sans-serif" } as React.CSSProperties,

    emptyBox: { textAlign: "center" as const, padding: "4rem 2rem", border: "1px dashed var(--border)", borderRadius: "6px" },
    emptyText: { fontFamily: "var(--font-serif), serif", fontSize: "1.5rem", color: "var(--muted)", fontStyle: "italic" },
  };

  return (
    <div style={s.page}>
      <div style={s.wrap}>
        <span style={s.eyebrow}>// Validar Tarefas</span>
        <h1 style={s.title}>
          Responda e <em style={{ fontStyle: "italic", color: "var(--accent)" }}>ganhe GMND</em>
        </h1>
        <p style={s.subtitle}>Valide tarefas de IA e receba recompensas automáticas em GMND ao acertar o consenso.</p>

        {!isConnected ? (
          <div style={s.connectBox}>
            <span style={s.connectIcon}>⚡</span>
            <h2 style={s.connectTitle}>Conecte sua carteira</h2>
            <p style={s.connectSub}>Para ver e responder tarefas você precisa conectar uma carteira.</p>
            <button onClick={connect} style={s.connectBtn}>Conectar Carteira</button>
          </div>
        ) : (
          <>
            <div style={s.topRow}>
              <div style={s.countBadge}>
                <div style={s.dot} />
                {loading ? "Carregando..." : `${tasks.length} tarefa${tasks.length !== 1 ? "s" : ""} disponível`}
              </div>
              <button onClick={loadTasks} style={s.refreshBtn}>↻ Atualizar</button>
            </div>

            {error && <div style={{ background: "rgba(185,28,28,0.05)", border: "1px solid rgba(185,28,28,0.15)", borderRadius: "4px", padding: "0.85rem 1.2rem", fontSize: "0.82rem", color: "#b91c1c", marginBottom: "1.5rem" }}>{error}</div>}

            {tasks.length === 0 && !loading ? (
              <div style={s.emptyBox}>
                <p style={s.emptyText}>Nenhuma tarefa disponível no momento.</p>
              </div>
            ) : (
              tasks.map(task => {
                const key = `${task.batchId}-${task.taskIndex}`;
                return (
                  <div key={key} style={s.taskCard}>
                    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "2px", background: "var(--accent)", transform: done[key] ? "scaleX(1)" : "scaleX(0)", transformOrigin: "left", transition: "transform 0.35s" }} />
                    <div style={s.cardTop}>
                      <div style={s.badges}>
                        <span style={s.batchBadge}>Batch #{task.batchId}</span>
                        <span style={s.typeBadge}>{TASK_TYPES.find(t => t.value === task.taskType)?.label}</span>
                      </div>
                      <span style={s.time}>{timeLeft(task.deadline)}</span>
                    </div>
                    <p style={s.content}>{task.content}</p>
                    <p style={s.reward}>Recompensa do batch: {Number(task.reward).toFixed(0)} GMND (dividida entre validadores corretos)</p>
                    {done[key] ? (
                      <div style={s.doneBadge}>✓ Resposta enviada — aguardando consenso</div>
                    ) : (
                      <div style={s.inputRow}>
                        <input
                          value={answers[key] || ""}
                          onChange={e => setAnswers(a => ({ ...a, [key]: e.target.value }))}
                          placeholder="Sua resposta..."
                          style={s.input}
                          onKeyDown={e => e.key === "Enter" && submitAnswer(task)}
                        />
                        <button
                          onClick={() => submitAnswer(task)}
                          disabled={sending[key]}
                          style={{ ...s.sendBtn, opacity: sending[key] ? 0.6 : 1 }}
                        >
                          {sending[key] ? "..." : "Enviar"}
                        </button>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </>
        )}
      </div>
    </div>
  );
}
