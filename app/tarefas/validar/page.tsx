"use client";
import { useState, useEffect, useCallback } from "react";
import { ethers } from "ethers";
import { useWeb3 } from "@/lib/useWeb3";

const CONTRACT_ADDRESS = "0xEbfA7a4Cb124Fc7592C18d6cAE7B3bD15f404404";

interface Task {
  batchId: number;
  taskIndex: number;
  content: string;
  taskType: number;
  deadline: number;
}

export default function ValidarPage() {
  const { isConnected, connect, address, getContract } = useWeb3();
  const [tasks, setTasks]       = useState<Task[]>([]);
  const [loading, setLoading]   = useState(false);
  const [answers, setAnswers]   = useState<Record<string, string>>({});
  const [sending, setSending]   = useState(false);
  const [done, setDone]         = useState(false);
  const [error, setError]       = useState("");
  const [credits, setCredits]   = useState("0");

  const loadTasks = useCallback(async () => {
    const contract = getContract(false);
    if (!contract) return;
    setLoading(true);
    try {
      const count = await contract.batchCount();
      const found: Task[] = [];
      for (let i = 0; i < Math.min(Number(count), 10); i++) {
        const info = await contract.getBatchInfo(i);
        if (Number(info.status) !== 0) continue;
        if (Number(info.deadline) < Date.now() / 1000) continue;
        for (let j = 0; j < Number(info.taskCount); j++) {
          const already = address ? await contract.hasUserAnswered(i, j, address) : false;
          const isCreator = address?.toLowerCase() === info.creator.toLowerCase();
          if (already || isCreator) continue;
          const task = await contract.getTask(i, j);
          found.push({ batchId: i, taskIndex: j, content: task.content, taskType: Number(task.taskType), deadline: Number(info.deadline) });
        }
      }
      setTasks(found);

      // Carrega créditos do validador
      if (address) {
        const profile = await contract.getValidatorProfile(address);
        setCredits(profile.gmndCredits.toString());
      }
    } catch (e: any) { setError(e.message); }
    finally { setLoading(false); }
  }, [getContract, address]);

  useEffect(() => { if (isConnected) loadTasks(); }, [isConnected, loadTasks]);

  // Envia TODAS as respostas em 1 única TX usando batchValidate
  const submitAll = async () => {
    const taskIndexes: number[] = [];
    const answerList: string[]  = [];

    // Agrupa por batchId
    const byBatch: Record<number, { indexes: number[]; answers: string[] }> = {};

    tasks.forEach(task => {
      const key = `${task.batchId}-${task.taskIndex}`;
      const ans = answers[key];
      if (!ans) return;
      if (!byBatch[task.batchId]) byBatch[task.batchId] = { indexes: [], answers: [] };
      byBatch[task.batchId].indexes.push(task.taskIndex);
      byBatch[task.batchId].answers.push(ans);
    });

    const batchIds = Object.keys(byBatch);
    if (batchIds.length === 0) { setError("Responda pelo menos uma tarefa antes de enviar."); return; }

    setSending(true);
    setError("");

    try {
      const contract = getContract(true);
      if (!contract) throw new Error("Conecte sua carteira primeiro.");

      // 1 TX por batch (batchValidate agrupa todas as tarefas do batch)
      for (const batchId of batchIds) {
        const { indexes, answers: ans } = byBatch[Number(batchId)];
        const tx = await contract.batchValidate(Number(batchId), indexes, ans);
        await tx.wait();
      }

      setDone(true);
      loadTasks();
    } catch (e: any) {
      setError(e.reason || e.message || "Erro ao enviar respostas.");
    } finally {
      setSending(false);
    }
  };

  const taskLabel = (type: number) => ["CLASSIFICAÇÃO", "VERIFICAÇÃO", "AVALIAÇÃO LLM", "ROTULAGEM"][type] || "TAREFA";
  const timeLeft  = (deadline: number) => { const d = deadline - Date.now() / 1000; if (d <= 0) return "Expirado"; return `${Math.floor(d / 3600)}h ${Math.floor((d % 3600) / 60)}m`; };
  const answered  = Object.values(answers).filter(Boolean).length;

  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh", paddingTop: "7rem" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "3rem 2rem 6rem" }}>

        <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: "0.65rem", color: "var(--muted)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "0.8rem", display: "block" }}>
          // Validar Tarefas
        </span>

        <h1 style={{ fontFamily: "var(--font-serif), serif", fontSize: "clamp(2rem, 5vw, 3.5rem)", lineHeight: 1.05, letterSpacing: "-0.02em", color: "var(--ink)", marginBottom: "0.6rem" }}>
          Responda e acumule <em style={{ fontStyle: "italic", color: "var(--accent)" }}>créditos GMND</em>
        </h1>

        <p style={{ color: "var(--ink2)", fontSize: "1rem", fontWeight: 300, lineHeight: 1.7, marginBottom: "2rem" }}>
          Responda todas as tarefas abaixo e envie em <strong style={{ color: "var(--ink)" }}>1 única transação</strong>. Mais barato, mais rápido.
        </p>

        {!isConnected ? (
          <div style={{ textAlign: "center", padding: "4rem 0" }}>
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>⚡</div>
            <h2 style={{ fontFamily: "var(--font-serif), serif", fontSize: "1.5rem", marginBottom: "1rem" }}>Conecte sua carteira</h2>
            <p style={{ color: "var(--muted)", marginBottom: "1.5rem" }}>Para ver e responder tarefas você precisa conectar uma carteira.</p>
            <button onClick={connect} className="btn-fill">CONECTAR CARTEIRA</button>
          </div>
        ) : loading ? (
          <div style={{ textAlign: "center", padding: "4rem 0", color: "var(--muted)", fontFamily: "var(--font-mono), monospace", fontSize: "0.8rem" }}>
            Carregando tarefas on-chain...
          </div>
        ) : tasks.length === 0 ? (
          <div style={{ textAlign: "center", padding: "4rem 0" }}>
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>✅</div>
            <h2 style={{ fontFamily: "var(--font-serif), serif", fontSize: "1.5rem", marginBottom: "0.5rem" }}>Sem tarefas disponíveis</h2>
            <p style={{ color: "var(--muted)" }}>Você respondeu tudo ou não há batches abertos no momento.</p>
            <p style={{ fontFamily: "var(--font-mono), monospace", fontSize: "0.75rem", color: "var(--accent)", marginTop: "1rem" }}>Créditos GMND acumulados: {credits}</p>
          </div>
        ) : (
          <>
            {/* Barra de progresso */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2rem", padding: "1rem 1.5rem", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "6px" }}>
              <div style={{ fontFamily: "var(--font-mono), monospace", fontSize: "0.72rem", color: "var(--muted)" }}>
                {answered}/{tasks.length} tarefas respondidas
              </div>
              <div style={{ fontFamily: "var(--font-mono), monospace", fontSize: "0.72rem", color: "var(--accent)" }}>
                Créditos acumulados: {credits} GMND
              </div>
            </div>

            {/* Lista de tarefas */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", marginBottom: "2.5rem" }}>
              {tasks.map(task => {
                const key = `${task.batchId}-${task.taskIndex}`;
                return (
                  <div key={key} className="card" style={{ padding: "2rem", position: "relative" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
                      <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: "0.6rem", letterSpacing: "0.12em", padding: "0.25rem 0.7rem", borderRadius: "2px", border: "1px solid var(--accent)", color: "var(--accent)", background: "rgba(200,82,42,0.06)" }}>
                        {taskLabel(task.taskType)}
                      </span>
                      <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: "0.6rem", color: "var(--muted)" }}>
                        {timeLeft(task.deadline)}
                      </span>
                    </div>

                    <p style={{ fontSize: "1rem", color: "var(--ink)", lineHeight: 1.7, marginBottom: "1.5rem" }}>
                      {task.content}
                    </p>

                    <textarea
                      value={answers[key] || ""}
                      onChange={e => setAnswers(a => ({ ...a, [key]: e.target.value }))}
                      placeholder="Digite sua resposta..."
                      rows={3}
                      style={{ width: "100%", background: "var(--bg)", border: `1px solid ${answers[key] ? "var(--accent)" : "var(--border)"}`, borderRadius: "4px", padding: "0.8rem", color: "var(--ink)", fontFamily: "var(--font-mono), monospace", fontSize: "0.82rem", resize: "vertical", outline: "none", transition: "border-color 0.15s" }}
                    />

                    {answers[key] && (
                      <div style={{ marginTop: "0.5rem", fontFamily: "var(--font-mono), monospace", fontSize: "0.6rem", color: "var(--accent3)" }}>
                        ✓ Resposta salva — será enviada junto com as outras
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {error && (
              <div style={{ background: "rgba(200,82,42,0.08)", border: "1px solid rgba(200,82,42,0.2)", borderRadius: "4px", padding: "0.8rem 1rem", fontFamily: "var(--font-mono), monospace", fontSize: "0.75rem", color: "var(--accent)", marginBottom: "1.5rem" }}>
                ⚠️ {error}
              </div>
            )}

            {done && (
              <div style={{ background: "rgba(45,138,78,0.08)", border: "1px solid rgba(45,138,78,0.2)", borderRadius: "4px", padding: "0.8rem 1rem", fontFamily: "var(--font-mono), monospace", fontSize: "0.75rem", color: "#2d8a4e", marginBottom: "1.5rem" }}>
                ✅ Respostas enviadas com sucesso! Créditos GMND acumulados.
              </div>
            )}

            {/* Botão único de envio */}
            <button
              onClick={submitAll}
              disabled={sending || answered === 0}
              className="btn-fill"
              style={{ width: "100%", fontSize: "0.9rem", padding: "1.2rem", opacity: answered === 0 ? 0.4 : 1, cursor: answered === 0 ? "not-allowed" : "pointer" }}
            >
              {sending ? "⏳ Enviando para blockchain..." : `Enviar ${answered} resposta${answered !== 1 ? "s" : ""} — 1 única transação →`}
            </button>

            <p style={{ fontFamily: "var(--font-mono), monospace", fontSize: "0.62rem", color: "var(--muted)", textAlign: "center", marginTop: "0.8rem" }}>
              Todas as respostas são enviadas em 1 transação via batchValidate() — economia máxima de gas.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
