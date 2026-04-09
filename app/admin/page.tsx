"use client";
import { useState, useEffect, useCallback } from "react";
import { ethers } from "ethers";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "@/lib/contract";

interface Batch {
  id: number;
  creator: string;
  usdcAmount: string;
  taskCount: number;
  deadline: number;
  status: number;
  answerCount: number;
}

interface Task {
  taskId: string;
  content: string;
  taskType: number;
}

interface Answer {
  node: string;
  answer: string;
  submittedAt: number;
}

const STATUS = ["🟢 Aberto", "✅ Finalizado", "❌ Cancelado"];
const TASK_TYPE = ["Classificação", "Verificação", "Avaliação LLM", "Rotulagem"];

export default function AdminPage() {
  const [provider, setProvider]     = useState<any>(null);
  const [address, setAddress]       = useState("");
  const [batches, setBatches]       = useState<Batch[]>([]);
  const [tasks, setTasks]           = useState<Record<number, Task[]>>({});
  const [answers, setAnswers]       = useState<Record<string, Answer[]>>({});
  const [expanded, setExpanded]     = useState<number | null>(null);
  const [loading, setLoading]       = useState(false);
  const [finalizing, setFinalizing] = useState<number | null>(null);
  const [error, setError]           = useState("");

  const connect = async () => {
    if (!(window as any).ethereum) { setError("MetaMask não encontrado"); return; }
    const p = new ethers.BrowserProvider((window as any).ethereum);
    const signer = await p.getSigner();
    setProvider(p);
    setAddress(await signer.getAddress());
  };

  const loadBatches = useCallback(async () => {
    if (!provider) return;
    setLoading(true);
    try {
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
      const count = Number(await contract.batchCount());
      const found: Batch[] = [];
      for (let i = count - 1; i >= Math.max(0, count - 50); i--) {
        const info = await contract.getBatchInfo(i);
        found.push({
          id: i,
          creator: info.creator,
          usdcAmount: ethers.formatUnits(info.usdcAmount, 6),
          taskCount: Number(info.taskCount),
          deadline: Number(info.deadline),
          status: Number(info.status),
          answerCount: Number(info.answerCount),
        });
      }
      setBatches(found);
    } catch (e: any) { setError(e.message); }
    finally { setLoading(false); }
  }, [provider]);

  useEffect(() => { if (provider) loadBatches(); }, [provider, loadBatches]);

  const loadBatchDetail = async (batchId: number) => {
    if (expanded === batchId) { setExpanded(null); return; }
    setExpanded(batchId);
    if (tasks[batchId]) return;
    try {
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
      const batch = batches.find(b => b.id === batchId)!;

      // Carrega tarefas
      const batchTasks: Task[] = [];
      for (let j = 0; j < batch.taskCount; j++) {
        const t = await contract.getTask(batchId, j);
        batchTasks.push({ taskId: t.taskId, content: t.content, taskType: Number(t.taskType) });
      }
      setTasks(prev => ({ ...prev, [batchId]: batchTasks }));

      // Carrega respostas por tarefa
      const batchAnswers: Record<string, Answer[]> = {};
      for (let j = 0; j < batch.taskCount; j++) {
        const ans = await contract.getAnswers(batchId, j);
        batchAnswers[`${batchId}-${j}`] = ans.map((a: any) => ({
          node: a.node,
          answer: a.answer,
          submittedAt: Number(a.submittedAt),
        }));
      }
      setAnswers(prev => ({ ...prev, ...batchAnswers }));
    } catch (e: any) { setError(e.message); }
  };

  const finalizeBatch = async (batchId: number) => {
    try {
      setFinalizing(batchId);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
      const tx = await contract.finalizeBatch(batchId);
      await tx.wait();
      await loadBatches();
    } catch (e: any) { setError(e.reason || e.message); }
    finally { setFinalizing(null); }
  };

  const exportCSV = () => {
    const rows = [["BatchID", "Tarefa", "Conteúdo", "Validador", "Resposta", "Timestamp"]];
    Object.entries(answers).forEach(([key, ans]) => {
      const [batchId, taskIdx] = key.split("-").map(Number);
      const task = tasks[batchId]?.[taskIdx];
      ans.forEach(a => {
        rows.push([
          batchId.toString(), taskIdx.toString(),
          task?.content || "", a.node, a.answer,
          new Date(a.submittedAt * 1000).toISOString()
        ]);
      });
    });
    const csv = rows.map(r => r.map(c => `"${c}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "globalmind-respostas.csv"; a.click();
  };

  const timeLeft = (deadline: number) => {
    const d = deadline - Date.now() / 1000;
    if (d <= 0) return "Expirado";
    return `${Math.floor(d / 3600)}h ${Math.floor((d % 3600) / 60)}m`;
  };

  const shortAddr = (addr: string) => addr ? addr.slice(0,6) + "..." + addr.slice(-4) : "";

  // Calcula consenso para uma tarefa
  const getConsensus = (ans: Answer[]) => {
    if (!ans || ans.length === 0) return null;
    const counts: Record<string, number> = {};
    ans.forEach(a => counts[a.answer] = (counts[a.answer] || 0) + 1);
    const max = Math.max(...Object.values(counts));
    const winner = Object.entries(counts).find(([, v]) => v === max);
    return { answer: winner?.[0], count: max, total: ans.length };
  };

  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh", paddingTop: "7rem" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "3rem 2rem 6rem" }}>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "2.5rem", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: "0.6rem", color: "var(--muted)", letterSpacing: "0.15em", textTransform: "uppercase", display: "block", marginBottom: "0.5rem" }}>// Admin</span>
            <h1 style={{ fontFamily: "var(--font-serif), serif", fontSize: "2.5rem", color: "var(--ink)", letterSpacing: "-0.02em" }}>
              Dashboard <em style={{ color: "var(--accent)", fontStyle: "italic" }}>de Validações</em>
            </h1>
          </div>
          <div style={{ display: "flex", gap: "0.8rem", flexWrap: "wrap" }}>
            {Object.keys(answers).length > 0 && (
              <button onClick={exportCSV} className="btn-ghost" style={{ fontSize: "0.75rem" }}>
                Exportar CSV
              </button>
            )}
            {!address ? (
              <button onClick={connect} className="btn-fill">Conectar MetaMask</button>
            ) : (
              <div style={{ fontFamily: "var(--font-mono), monospace", fontSize: "0.72rem", color: "var(--accent3)", border: "1px solid var(--accent3)", padding: "0.5rem 1rem", borderRadius: "4px" }}>
                {shortAddr(address)}
              </div>
            )}
          </div>
        </div>

        {error && (
          <div style={{ background: "rgba(200,82,42,0.08)", border: "1px solid rgba(200,82,42,0.2)", borderRadius: "4px", padding: "0.8rem 1rem", fontFamily: "var(--font-mono), monospace", fontSize: "0.75rem", color: "var(--accent)", marginBottom: "1.5rem" }}>
            ⚠️ {error}
          </div>
        )}

        {!address ? (
          <div style={{ textAlign: "center", padding: "4rem 0" }}>
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🔐</div>
            <p style={{ color: "var(--muted)", fontSize: "0.9rem" }}>Conecte sua carteira para ver os dados de validação</p>
          </div>
        ) : loading ? (
          <div style={{ textAlign: "center", padding: "4rem 0", fontFamily: "var(--font-mono), monospace", fontSize: "0.8rem", color: "var(--muted)" }}>
            Carregando batches on-chain...
          </div>
        ) : (
          <>
            {/* Stats */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1rem", marginBottom: "2.5rem" }}>
              {[
                { val: batches.length.toString(), label: "Batches carregados" },
                { val: batches.filter(b => b.status === 0).length.toString(), label: "Abertos" },
                { val: batches.reduce((s, b) => s + b.answerCount, 0).toString(), label: "Respostas totais" },
                { val: `$${batches.reduce((s, b) => s + parseFloat(b.usdcAmount), 0).toFixed(2)}`, label: "USDC depositado" },
              ].map(s => (
                <div key={s.label} className="card" style={{ padding: "1.2rem", textAlign: "center" }}>
                  <div style={{ fontFamily: "var(--font-serif), serif", fontSize: "1.8rem", color: "var(--accent)", lineHeight: 1 }}>{s.val}</div>
                  <div style={{ fontFamily: "var(--font-mono), monospace", fontSize: "0.58rem", color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.1em", marginTop: "0.4rem" }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* Lista de batches */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
              {batches.map(batch => (
                <div key={batch.id} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "8px", overflow: "hidden" }}>

                  {/* Batch header */}
                  <div
                    onClick={() => loadBatchDetail(batch.id)}
                    style={{ padding: "1.2rem 1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer", flexWrap: "wrap", gap: "0.5rem" }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
                      <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: "0.7rem", color: "var(--muted)" }}>#{batch.id}</span>
                      <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: "0.72rem", color: batch.status === 0 ? "#2d8a4e" : "var(--muted)" }}>
                        {STATUS[batch.status]}
                      </span>
                      <span style={{ fontSize: "0.8rem", color: "var(--ink2)" }}>{batch.taskCount} tarefas</span>
                      <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: "0.72rem", color: "var(--accent2)" }}>${batch.usdcAmount} USDC</span>
                      <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: "0.7rem", color: "var(--muted)" }}>{batch.answerCount} respostas</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
                      {batch.status === 0 && (
                        <>
                          <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: "0.65rem", color: "var(--muted)" }}>{timeLeft(batch.deadline)}</span>
                          <button
                            onClick={e => { e.stopPropagation(); finalizeBatch(batch.id); }}
                            disabled={finalizing === batch.id}
                            style={{ fontFamily: "var(--font-mono), monospace", fontSize: "0.65rem", background: "var(--accent)", color: "white", border: "none", borderRadius: "4px", padding: "0.4rem 0.8rem", cursor: "pointer", opacity: finalizing === batch.id ? 0.6 : 1 }}
                          >
                            {finalizing === batch.id ? "..." : "Finalizar"}
                          </button>
                        </>
                      )}
                      <span style={{ color: "var(--muted)", fontSize: "0.8rem" }}>{expanded === batch.id ? "▲" : "▼"}</span>
                    </div>
                  </div>

                  {/* Batch detail */}
                  {expanded === batch.id && tasks[batch.id] && (
                    <div style={{ borderTop: "1px solid var(--border)", padding: "1.5rem" }}>
                      {tasks[batch.id].map((task, j) => {
                        const key = `${batch.id}-${j}`;
                        const taskAnswers = answers[key] || [];
                        const consensus = getConsensus(taskAnswers);
                        return (
                          <div key={j} style={{ marginBottom: "1.5rem", background: "var(--bg)", border: "1px solid var(--border)", borderRadius: "6px", padding: "1.2rem" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "0.8rem", marginBottom: "0.8rem", flexWrap: "wrap" }}>
                              <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: "0.58rem", color: "var(--accent)", border: "1px solid var(--accent)", padding: "0.2rem 0.5rem", borderRadius: "2px" }}>
                                {TASK_TYPE[task.taskType]}
                              </span>
                              <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: "0.65rem", color: "var(--muted)" }}>Tarefa {j + 1}</span>
                              {consensus && (
                                <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: "0.65rem", color: "#2d8a4e", background: "rgba(45,138,78,0.08)", border: "1px solid rgba(45,138,78,0.2)", padding: "0.2rem 0.6rem", borderRadius: "2px" }}>
                                  Consenso: {consensus.answer} ({consensus.count}/{consensus.total})
                                </span>
                              )}
                            </div>
                            <p style={{ fontSize: "0.85rem", color: "var(--ink)", lineHeight: 1.6, marginBottom: "1rem" }}>{task.content}</p>

                            {taskAnswers.length === 0 ? (
                              <p style={{ fontFamily: "var(--font-mono), monospace", fontSize: "0.7rem", color: "var(--muted)" }}>Sem respostas ainda</p>
                            ) : (
                              <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                                {taskAnswers.map((ans, k) => (
                                  <div key={k} style={{ display: "flex", alignItems: "center", gap: "0.8rem", padding: "0.5rem 0.8rem", background: ans.answer === consensus?.answer ? "rgba(45,138,78,0.06)" : "transparent", border: `1px solid ${ans.answer === consensus?.answer ? "rgba(45,138,78,0.2)" : "var(--border)"}`, borderRadius: "4px" }}>
                                    <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: "0.65rem", color: "var(--muted)" }}>{shortAddr(ans.node)}</span>
                                    <span style={{ fontSize: "0.82rem", color: ans.answer === consensus?.answer ? "#2d8a4e" : "var(--ink)", fontWeight: ans.answer === consensus?.answer ? 600 : 400 }}>{ans.answer}</span>
                                    <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: "0.6rem", color: "var(--muted)", marginLeft: "auto" }}>
                                      {new Date(ans.submittedAt * 1000).toLocaleTimeString("pt-BR")}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
