"use client";
import { useState, useEffect, useCallback } from "react";
import { ethers } from "ethers";
import { useWeb3 } from "@/lib/useWeb3";
import { TASK_TYPES, BATCH_STATUS } from "@/lib/contract";

interface Task { batchId: number; taskIndex: number; content: string; taskType: number; batchReward: string; deadline: number; answered: boolean; }

export default function TarefasPage() {
  const { isConnected, connect, address, getContract, error: web3Error } = useWeb3();
  const [tasks,   setTasks]   = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [sending, setSending] = useState<Record<string, boolean>>({});
  const [done,    setDone]    = useState<Record<string, string>>({});
  const [fetched, setFetched] = useState(false);

  const fetchTasks = useCallback(async () => {
    const contract = getContract(false);
    if (!contract) return;
    setLoading(true);
    try {
      const count = Number(await contract.batchCount());
      const result: Task[] = [];
      for (let b = 0; b < count; b++) {
        const info = await contract.getBatchInfo(b);
        if (Number(info.status) !== 0) continue; // só OPEN
        const taskCount = Number(info.taskCount);
        for (let t = 0; t < taskCount; t++) {
          const task = await contract.getTask(b, t);
          const answered = address ? await contract.hasAnswered(b, t, address) : false;
          result.push({
            batchId: b, taskIndex: t,
            content: task.content, taskType: Number(task.taskType),
            batchReward: ethers.formatEther(info.reward),
            deadline: Number(info.deadline),
            answered,
          });
        }
      }
      setTasks(result);
      setFetched(true);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  }, [getContract, address]);

  useEffect(() => { if (isConnected) fetchTasks(); }, [isConnected, fetchTasks]);

  const submitAnswer = async (task: Task) => {
    const key = `${task.batchId}-${task.taskIndex}`;
    const answer = answers[key]?.trim();
    if (!answer) return;
    const contract = getContract(true);
    if (!contract) return;
    setSending(s => ({ ...s, [key]: true }));
    try {
      const tx = await contract.submitAnswer(task.batchId, task.taskIndex, answer);
      await tx.wait();
      setDone(d => ({ ...d, [key]: tx.hash }));
      setTasks(t => t.map(x => x.batchId === task.batchId && x.taskIndex === task.taskIndex ? { ...x, answered: true } : x));
    } catch (e: any) {
      alert(e.reason || e.message);
    } finally {
      setSending(s => ({ ...s, [key]: false }));
    }
  };

  const remaining = (deadline: number) => {
    const diff = deadline - Math.floor(Date.now() / 1000);
    if (diff <= 0) return "Expirado";
    const h = Math.floor(diff / 3600);
    const m = Math.floor((diff % 3600) / 60);
    return `${h}h ${m}m restantes`;
  };

  const pending = tasks.filter(t => !t.answered);
  const done_tasks = tasks.filter(t => t.answered);

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-4xl font-black mb-2">Validar Tarefas</h1>
          <p className="text-gray-400">Responda tarefas de IA e ganhe ETH automaticamente.</p>
        </div>
        {isConnected && (
          <button onClick={fetchTasks} disabled={loading} className="px-4 py-2 rounded-xl border border-white/10 text-sm text-gray-400 hover:text-white hover:border-white/20 transition">
            {loading ? "..." : "↻ Atualizar"}
          </button>
        )}
      </div>

      {!isConnected ? (
        <div className="text-center py-20">
          <div className="text-5xl mb-4">⚡</div>
          <h2 className="text-xl font-bold mb-3">Conecte sua carteira</h2>
          <p className="text-gray-400 mb-6 text-sm">Para ver e responder tarefas você precisa conectar o MetaMask.</p>
          <button onClick={connect} className="px-6 py-3 bg-[#c8522a] text-white font-bold rounded-xl hover:bg-[#c8522a]/90 transition">
            Conectar MetaMask
          </button>
        </div>
      ) : loading ? (
        <div className="text-center py-20 text-gray-500">Buscando tarefas na blockchain...</div>
      ) : fetched && tasks.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-5xl mb-4">🎉</div>
          <h2 className="text-xl font-bold mb-2">Nenhuma tarefa disponível</h2>
          <p className="text-gray-400 text-sm">Volte mais tarde ou peça para uma empresa postar um batch.</p>
        </div>
      ) : (
        <>
          {/* Pending tasks */}
          {pending.length > 0 && (
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2 h-2 rounded-full bg-[#c8522a] animate-pulse" />
                <h2 className="text-sm font-medium text-gray-300">{pending.length} tarefa{pending.length > 1 ? "s" : ""} disponível</h2>
              </div>
              <div className="space-y-4">
                {pending.map(task => {
                  const key = `${task.batchId}-${task.taskIndex}`;
                  return (
                    <div key={key} className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#c8522a]/20 transition">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded-md bg-white/5 text-xs font-mono text-gray-400">Batch #{task.batchId}</span>
                          <span className="px-2 py-0.5 rounded-md bg-blue-500/10 text-xs text-blue-400">
                            {TASK_TYPES.find(t => t.value === task.taskType)?.label}
                          </span>
                        </div>
                        <span className="text-xs text-gray-500">{remaining(task.deadline)}</span>
                      </div>
                      <p className="text-white mb-4 leading-relaxed">{task.content}</p>
                      <div className="flex gap-2">
                        <input
                          value={answers[key] || ""}
                          onChange={e => setAnswers(a => ({ ...a, [key]: e.target.value }))}
                          placeholder="Sua resposta..."
                          className="flex-1 bg-black/30 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#c8522a]/50"
                          onKeyDown={e => e.key === "Enter" && submitAnswer(task)}
                        />
                        <button
                          onClick={() => submitAnswer(task)}
                          disabled={sending[key] || !answers[key]?.trim()}
                          className="px-5 py-2.5 bg-[#c8522a] text-white font-bold rounded-xl hover:bg-[#c8522a]/90 transition disabled:opacity-40 text-sm"
                        >
                          {sending[key] ? "..." : "Enviar"}
                        </button>
                      </div>
                      {done[key] && (
                        <p className="mt-2 text-xs text-green-400">
                          ✅ Enviado!{" "}
                          <a href={`https://sepolia.etherscan.io/tx/${done[key]}`} target="_blank" rel="noopener noreferrer" className="underline">
                            Ver tx →
                          </a>
                        </p>
                      )}
                      <p className="mt-2 text-xs text-gray-600">Recompensa do batch: {task.batchReward} ETH (dividida entre validadores corretos)</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Answered */}
          {done_tasks.length > 0 && (
            <div>
              <h2 className="text-sm font-medium text-gray-500 mb-3">Já respondidas ({done_tasks.length})</h2>
              <div className="space-y-2">
                {done_tasks.map(task => (
                  <div key={`${task.batchId}-${task.taskIndex}`} className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
                    <span className="text-sm text-gray-500 truncate max-w-md">{task.content}</span>
                    <span className="text-xs text-green-500 ml-4 shrink-0">✓ Respondida</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
