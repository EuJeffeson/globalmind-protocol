"use client";
import { useState } from "react";
import { ethers } from "ethers";
import { useWeb3 } from "@/lib/useWeb3";
import { TASK_TYPES } from "@/lib/contract";

interface TaskRow { id: string; content: string; taskType: number; }

export default function EmpresaPage() {
  const { isConnected, connect, address, getContract, error: web3Error } = useWeb3();
  const [tasks, setTasks]       = useState<TaskRow[]>([{ id: crypto.randomUUID(), content: "", taskType: 0 }]);
  const [reward, setReward]     = useState("0.01");
  const [deadline, setDeadline] = useState("24");
  const [loading, setLoading]   = useState(false);
  const [txHash, setTxHash]     = useState("");
  const [error, setError]       = useState("");

  const addTask = () => setTasks(t => [...t, { id: crypto.randomUUID(), content: "", taskType: 0 }]);
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

      const taskIds   = tasks.map((_, i) => `task-${Date.now()}-${i}`);
      const contents  = tasks.map(t => t.content.trim());
      const taskTypes = tasks.map(t => t.taskType);
      const deadlineSecs = BigInt(Number(deadline) * 3600);
      const rewardWei = ethers.parseEther(reward);

      const tx = await contract.createBatch(taskIds, contents, taskTypes, deadlineSecs, { value: rewardWei });
      setTxHash(tx.hash);
      await tx.wait();
    } catch (e: any) {
      setError(e.reason || e.message || "Erro ao enviar transação");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <div className="mb-10">
        <h1 className="text-4xl font-black mb-2">Postar Tarefas</h1>
        <p className="text-gray-400">Crie um lote de tarefas de validação e deposite ETH como recompensa.</p>
      </div>

      {!isConnected && (
        <div className="mb-8 p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-sm flex items-center justify-between">
          <span>Conecte sua carteira para criar um batch</span>
          <button onClick={connect} className="px-4 py-1.5 bg-yellow-500/20 rounded-lg hover:bg-yellow-500/30 transition">Conectar</button>
        </div>
      )}

      {/* Tasks */}
      <div className="space-y-3 mb-6">
        <label className="text-sm font-medium text-gray-300">Tarefas</label>
        {tasks.map((task, i) => (
          <div key={task.id} className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono text-gray-500">Tarefa #{i + 1}</span>
              {tasks.length > 1 && (
                <button onClick={() => removeTask(task.id)} className="text-xs text-red-400 hover:text-red-300">Remover</button>
              )}
            </div>
            <textarea
              value={task.content}
              onChange={e => updateTask(task.id, "content", e.target.value)}
              placeholder="Descreva a tarefa de validação..."
              className="w-full bg-transparent border border-white/10 rounded-lg p-3 text-sm text-white placeholder-gray-600 resize-none focus:outline-none focus:border-[#00f5c4]/50 h-20"
            />
            <select
              value={task.taskType}
              onChange={e => updateTask(task.id, "taskType", Number(e.target.value))}
              className="mt-2 w-full bg-[#0a0a0a] border border-white/10 rounded-lg p-2 text-sm text-gray-300 focus:outline-none focus:border-[#00f5c4]/50"
            >
              {TASK_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
            </select>
          </div>
        ))}
        <button onClick={addTask} className="w-full py-3 border border-dashed border-white/10 rounded-xl text-sm text-gray-500 hover:text-gray-300 hover:border-white/20 transition-all">
          + Adicionar tarefa
        </button>
      </div>

      {/* Config */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label className="text-sm font-medium text-gray-300 mb-2 block">Recompensa Total (ETH)</label>
          <input
            type="number" step="0.001" min="0.001"
            value={reward}
            onChange={e => setReward(e.target.value)}
            className="w-full bg-white/[0.03] border border-white/10 rounded-xl p-3 text-white font-mono focus:outline-none focus:border-[#00f5c4]/50"
          />
          <p className="text-xs text-gray-600 mt-1">70% para validadores · 20% queimado · 10% treasury</p>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-300 mb-2 block">Prazo (horas)</label>
          <input
            type="number" min="1" max="168"
            value={deadline}
            onChange={e => setDeadline(e.target.value)}
            className="w-full bg-white/[0.03] border border-white/10 rounded-xl p-3 text-white font-mono focus:outline-none focus:border-[#00f5c4]/50"
          />
          <p className="text-xs text-gray-600 mt-1">Mínimo 1 hora · Máximo 7 dias</p>
        </div>
      </div>

      {/* Summary */}
      <div className="p-4 rounded-xl bg-[#00f5c4]/5 border border-[#00f5c4]/10 mb-6 text-sm">
        <div className="flex justify-between text-gray-400 mb-1">
          <span>Tarefas</span><span className="text-white font-mono">{tasks.length}</span>
        </div>
        <div className="flex justify-between text-gray-400 mb-1">
          <span>Recompensa por validador</span>
          <span className="text-white font-mono">~{(Number(reward) * 0.7 / Math.max(tasks.length, 1)).toFixed(4)} ETH</span>
        </div>
        <div className="flex justify-between text-gray-400">
          <span>Total a depositar</span>
          <span className="text-[#00f5c4] font-mono font-bold">{reward} ETH</span>
        </div>
      </div>

      {error && <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">{error}</div>}
      {web3Error && <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">{web3Error}</div>}

      {txHash && (
        <div className="mb-4 p-3 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-sm">
          ✅ Batch criado!{" "}
          <a href={`https://sepolia.etherscan.io/tx/${txHash}`} target="_blank" rel="noopener noreferrer" className="underline">
            Ver no Etherscan →
          </a>
        </div>
      )}

      <button
        onClick={submit}
        disabled={loading}
        className="w-full py-4 bg-[#00f5c4] text-black font-bold rounded-xl hover:bg-[#00f5c4]/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-lg"
      >
        {loading ? "Enviando transação..." : isConnected ? `Criar Batch · ${reward} ETH` : "Conectar e Criar"}
      </button>
    </div>
  );
}
