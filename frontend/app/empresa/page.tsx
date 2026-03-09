"use client";
import { useState } from "react";
import { ethers } from "ethers";
import { useWeb3 } from "@/lib/useWeb3";
import { TASK_TYPES, GMND_TOKEN_ADDRESS, GMND_TOKEN_ABI, CONTRACT_ADDRESS } from "@/lib/contract";

interface TaskRow { id: string; content: string; taskType: number; }

export default function EmpresaPage() {
  const { isConnected, connect, getContract } = useWeb3();
  const [tasks, setTasks]       = useState<TaskRow[]>([{ id: crypto.randomUUID(), content: "", taskType: 0 }]);
  const [reward, setReward]     = useState("100");
  const [deadline, setDeadline] = useState("24");
  const [loading, setLoading]   = useState(false);
  const [step, setStep]         = useState<"idle"|"approving"|"creating"|"done">("idle");
  const [txHash, setTxHash]     = useState("");
  const [error, setError]       = useState("");

  const addTask    = () => setTasks(t => [...t, { id: crypto.randomUUID(), content: "", taskType: 0 }]);
  const removeTask = (id: string) => setTasks(t => t.filter(x => x.id !== id));
  const updateTask = (id: string, field: keyof TaskRow, value: string | number) =>
    setTasks(t => t.map(x => x.id === id ? { ...x, [field]: value } : x));

  const submit = async () => {
    if (!isConnected) { connect(); return; }
    if (tasks.some(t => !t.content.trim())) { setError("Preencha o conteúdo de todas as tarefas"); return; }
    setLoading(true); setError(""); setTxHash("");
    try {
      const contract = getContract(true);
      if (!contract) throw new Error("Contrato não disponível");
      const rewardWei = ethers.parseUnits(reward, 18);

      setStep("approving");
      const token = new ethers.Contract(GMND_TOKEN_ADDRESS, GMND_TOKEN_ABI, (contract as any).runner);
      const approveTx = await token.approve(CONTRACT_ADDRESS, rewardWei);
      await approveTx.wait();

      setStep("creating");
      const taskIds   = tasks.map((_, i) => `task-${Date.now()}-${i}`);
      const contents  = tasks.map(t => t.content.trim());
      const taskTypes = tasks.map(t => t.taskType);
      const deadlineSecs = BigInt(Number(deadline) * 3600);
      const tx = await contract.createBatch(taskIds, contents, taskTypes, deadlineSecs, rewardWei);
      setTxHash(tx.hash);
      await tx.wait();
      setStep("done");
    } catch (e: any) {
      setError(e.reason || e.message || "Erro ao enviar transação");
      setStep("idle");
    } finally {
      setLoading(false);
    }
  };

  const stepLabel = {
    idle:      isConnected ? `Criar Batch · ${reward} GMND` : "Conectar Carteira",
    approving: "1/2 — Aprovando GMND...",
    creating:  "2/2 — Criando batch...",
    done:      "✅ Batch criado com sucesso!",
  }[step];

  const s = {
    page: { background: "var(--bg)", minHeight: "100vh", paddingTop: "7rem" } as React.CSSProperties,
    wrap: { maxWidth: "760px", margin: "0 auto", padding: "3rem 2rem 6rem" } as React.CSSProperties,

    // Header
    eyebrow: { fontFamily: "var(--font-mono), monospace", fontSize: "0.65rem", color: "var(--muted)", letterSpacing: "0.15em", textTransform: "uppercase" as const, marginBottom: "0.8rem", display: "block" },
    title: { fontFamily: "var(--font-serif), serif", fontSize: "clamp(2.5rem, 5vw, 4rem)", lineHeight: 1.05, letterSpacing: "-0.02em", color: "var(--ink)", marginBottom: "0.6rem" } as React.CSSProperties,
    subtitle: { color: "var(--ink2)", fontSize: "1rem", fontWeight: 300, lineHeight: 1.7, marginBottom: "3rem" } as React.CSSProperties,

    // Section label
    label: { fontFamily: "var(--font-mono), monospace", fontSize: "0.68rem", color: "var(--muted)", letterSpacing: "0.1em", textTransform: "uppercase" as const, marginBottom: "1rem", display: "block" },

    // Task card
    taskCard: { background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "6px", padding: "1.8rem", marginBottom: "0.75rem" } as React.CSSProperties,
    taskHeader: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" } as React.CSSProperties,
    taskNum: { fontFamily: "var(--font-mono), monospace", fontSize: "0.65rem", color: "var(--muted)", letterSpacing: "0.1em" } as React.CSSProperties,
    removeBtn: { fontFamily: "var(--font-mono), monospace", fontSize: "0.65rem", color: "var(--accent)", background: "none", border: "none", cursor: "none", letterSpacing: "0.05em" } as React.CSSProperties,

    textarea: { width: "100%", background: "var(--bg)", border: "1px solid var(--border)", borderRadius: "4px", padding: "0.85rem 1rem", fontSize: "0.9rem", color: "var(--ink)", fontFamily: "var(--font-sans), sans-serif", lineHeight: 1.6, resize: "none" as const, outline: "none", height: "90px", marginBottom: "0.75rem" },
    select: { width: "100%", background: "var(--bg)", border: "1px solid var(--border)", borderRadius: "4px", padding: "0.75rem 1rem", fontSize: "0.85rem", color: "var(--ink)", fontFamily: "var(--font-sans), sans-serif", outline: "none" } as React.CSSProperties,

    addBtn: { width: "100%", padding: "1rem", border: "1px dashed var(--border)", borderRadius: "6px", background: "none", color: "var(--muted)", fontSize: "0.85rem", fontFamily: "var(--font-sans), sans-serif", cursor: "none", marginBottom: "2rem", transition: "all 0.2s", letterSpacing: "0.05em" } as React.CSSProperties,

    // Grid
    grid2: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.2rem", marginBottom: "2rem" } as React.CSSProperties,
    inputWrap: { display: "flex", flexDirection: "column" as const },
    inputLabel: { fontFamily: "var(--font-mono), monospace", fontSize: "0.65rem", color: "var(--muted)", letterSpacing: "0.1em", textTransform: "uppercase" as const, marginBottom: "0.5rem" },
    input: { background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "4px", padding: "0.85rem 1rem", fontSize: "0.95rem", color: "var(--ink)", fontFamily: "var(--font-mono), monospace", outline: "none" } as React.CSSProperties,
    inputHint: { fontFamily: "var(--font-mono), monospace", fontSize: "0.6rem", color: "var(--muted)", marginTop: "0.4rem", letterSpacing: "0.05em" } as React.CSSProperties,

    // Summary
    summary: { background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "6px", padding: "1.8rem", marginBottom: "1.5rem" } as React.CSSProperties,
    summaryRow: { display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: "0.75rem", marginBottom: "0.75rem", borderBottom: "1px solid var(--border2)" } as React.CSSProperties,
    summaryLast: { display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "0.5rem" } as React.CSSProperties,
    summaryKey: { fontSize: "0.85rem", color: "var(--ink2)" } as React.CSSProperties,
    summaryVal: { fontFamily: "var(--font-mono), monospace", fontSize: "0.85rem", color: "var(--ink)", fontWeight: 500 } as React.CSSProperties,

    // Alerts
    alertWarn: { background: "rgba(26,58,143,0.06)", border: "1px solid rgba(26,58,143,0.15)", borderRadius: "4px", padding: "0.85rem 1.2rem", fontSize: "0.82rem", color: "var(--accent2)", fontFamily: "var(--font-sans), sans-serif", marginBottom: "1rem", lineHeight: 1.5 } as React.CSSProperties,
    alertErr:  { background: "rgba(185,28,28,0.05)", border: "1px solid rgba(185,28,28,0.15)", borderRadius: "4px", padding: "0.85rem 1.2rem", fontSize: "0.82rem", color: "#b91c1c", marginBottom: "1rem" } as React.CSSProperties,
    alertOk:   { background: "rgba(45,138,78,0.06)", border: "1px solid rgba(45,138,78,0.2)", borderRadius: "4px", padding: "0.85rem 1.2rem", fontSize: "0.82rem", color: "var(--accent3)", marginBottom: "1rem" } as React.CSSProperties,
    alertNoWallet: { background: "rgba(200,82,42,0.06)", border: "1px solid rgba(200,82,42,0.15)", borderRadius: "4px", padding: "1rem 1.2rem", fontSize: "0.85rem", color: "var(--accent)", display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2rem" } as React.CSSProperties,

    // CTA
    ctaBtn: { width: "100%", padding: "1.1rem", borderRadius: "2px", background: step === "done" ? "var(--accent3)" : "var(--ink)", color: "var(--bg)", fontWeight: 700, fontSize: "0.85rem", letterSpacing: "0.1em", textTransform: "uppercase" as const, border: "none", cursor: loading ? "not-allowed" : "none", opacity: loading ? 0.7 : 1, transition: "all 0.25s", fontFamily: "var(--font-sans), sans-serif" } as React.CSSProperties,
    connectBtn: { background: "var(--accent)", color: "white", border: "none", borderRadius: "2px", padding: "0.5rem 1.2rem", fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" as const, cursor: "none", fontFamily: "var(--font-sans), sans-serif" } as React.CSSProperties,
  };

  return (
    <div style={s.page}>
      <div style={s.wrap}>

        {/* Header */}
        <span style={s.eyebrow}>// Postar Tarefas</span>
        <h1 style={s.title}>
          Criar um <em style={{ fontStyle: "italic", color: "var(--accent)" }}>Batch</em> de Validação
        </h1>
        <p style={s.subtitle}>
          Defina as tarefas, deposite a recompensa em GMND e a rede global valida automaticamente.
        </p>

        {/* Wallet alert */}
        {!isConnected && (
          <div style={s.alertNoWallet}>
            <span>Conecte sua carteira para criar um batch</span>
            <button onClick={connect} style={s.connectBtn}>Conectar</button>
          </div>
        )}

        {/* Tasks */}
        <span style={s.label}>Tarefas de Validação</span>

        {tasks.map((task, i) => (
          <div key={task.id} style={s.taskCard}>
            <div style={s.taskHeader}>
              <span style={s.taskNum}>TAREFA #{i + 1}</span>
              {tasks.length > 1 && (
                <button onClick={() => removeTask(task.id)} style={s.removeBtn}>— remover</button>
              )}
            </div>
            <textarea
              value={task.content}
              onChange={e => updateTask(task.id, "content", e.target.value)}
              placeholder="Descreva a tarefa de validação..."
              style={s.textarea}
            />
            <select
              value={task.taskType}
              onChange={e => updateTask(task.id, "taskType", Number(e.target.value))}
              style={s.select}
            >
              {TASK_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
            </select>
          </div>
        ))}

        <button onClick={addTask} style={s.addBtn}>+ Adicionar tarefa</button>

        {/* Config */}
        <div style={s.grid2}>
          <div style={s.inputWrap}>
            <span style={s.inputLabel}>Recompensa Total (GMND)</span>
            <input type="number" min="1" value={reward} onChange={e => setReward(e.target.value)} style={s.input} />
            <span style={s.inputHint}>70% validadores · 20% burn · 10% treasury</span>
          </div>
          <div style={s.inputWrap}>
            <span style={s.inputLabel}>Prazo (horas)</span>
            <input type="number" min="1" max="168" value={deadline} onChange={e => setDeadline(e.target.value)} style={s.input} />
            <span style={s.inputHint}>Mínimo 1h · Máximo 7 dias</span>
          </div>
        </div>

        {/* Summary */}
        <div style={s.summary}>
          <div style={s.summaryRow}>
            <span style={s.summaryKey}>Tarefas</span>
            <span style={s.summaryVal}>{tasks.length}</span>
          </div>
          <div style={s.summaryRow}>
            <span style={s.summaryKey}>Para validadores (70%)</span>
            <span style={s.summaryVal}>{(Number(reward) * 0.7).toFixed(0)} GMND</span>
          </div>
          <div style={s.summaryRow}>
            <span style={s.summaryKey}>🔥 Queimado (20%)</span>
            <span style={{ ...s.summaryVal, color: "var(--accent)" }}>{(Number(reward) * 0.2).toFixed(0)} GMND</span>
          </div>
          <div style={s.summaryRow}>
            <span style={s.summaryKey}>Treasury (10%)</span>
            <span style={s.summaryVal}>{(Number(reward) * 0.1).toFixed(0)} GMND</span>
          </div>
          <div style={s.summaryLast}>
            <span style={{ ...s.summaryKey, fontWeight: 700, color: "var(--ink)" }}>Total a depositar</span>
            <span style={{ ...s.summaryVal, fontSize: "1.1rem", color: "var(--ink)", fontWeight: 700 }}>{reward} GMND</span>
          </div>
        </div>

        {/* Info */}
        {isConnected && step === "idle" && (
          <div style={s.alertWarn}>
            ℹ️ Serão 2 transações: primeiro você aprova o gasto de GMND, depois cria o batch.
          </div>
        )}

        {error && <div style={s.alertErr}>{error}</div>}

        {txHash && step === "done" && (
          <div style={s.alertOk}>
            ✅ Batch criado!{" "}
            <a href={`https://sepolia.etherscan.io/tx/${txHash}`} target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent3)", textDecoration: "underline" }}>
              Ver no Etherscan →
            </a>
          </div>
        )}

        <button onClick={submit} disabled={loading || step === "done"} style={s.ctaBtn}>
          {stepLabel}
        </button>
      </div>
    </div>
  );
}
