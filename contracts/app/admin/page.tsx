"use client";
import { useState, useEffect, useCallback } from "react";
import { ethers } from "ethers";
import { useWeb3 } from "@/lib/useWeb3";
import { BATCH_STATUS } from "@/lib/contract";

interface Batch { id: number; creator: string; reward: string; taskCount: number; deadline: number; status: number; }

const STATUS_COLOR = ["text-green-400 bg-green-400/10", "text-gray-400 bg-gray-400/10", "text-red-400 bg-red-400/10"];

export default function AdminPage() {
  const { isConnected, connect, address, getContract } = useWeb3();
  const [batches,    setBatches]    = useState<Batch[]>([]);
  const [loading,    setLoading]    = useState(false);
  const [finalizing, setFinalizing] = useState<Record<number, boolean>>({});
  const [done,       setDone]       = useState<Record<number, string>>({});
  const [error,      setError]      = useState<Record<number, string>>({});

  const fetchBatches = useCallback(async () => {
    const contract = getContract(false);
    if (!contract) return;
    setLoading(true);
    try {
      const count = Number(await contract.batchCount());
      const result: Batch[] = [];
      for (let i = 0; i < count; i++) {
        const info = await contract.getBatchInfo(i);
        result.push({
          id: i,
          creator:   info.creator,
          reward:    ethers.formatEther(info.reward),
          taskCount: Number(info.taskCount),
          deadline:  Number(info.deadline),
          status:    Number(info.status),
        });
      }
      setBatches(result.reverse()); // newest first
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  }, [getContract]);

  useEffect(() => { if (isConnected) fetchBatches(); }, [isConnected, fetchBatches]);

  const finalize = async (batchId: number) => {
    const contract = getContract(true);
    if (!contract) return;
    setFinalizing(f => ({ ...f, [batchId]: true }));
    setError(e => ({ ...e, [batchId]: "" }));
    try {
      const tx = await contract.finalizeBatch(batchId);
      await tx.wait();
      setDone(d => ({ ...d, [batchId]: tx.hash }));
      fetchBatches();
    } catch (e: any) {
      setError(err => ({ ...err, [batchId]: e.reason || e.message }));
    } finally {
      setFinalizing(f => ({ ...f, [batchId]: false }));
    }
  };

  const timeStr = (ts: number) => {
    const diff = ts - Math.floor(Date.now() / 1000);
    if (diff <= 0) return "Expirado";
    const h = Math.floor(diff / 3600);
    return diff < 0 ? "Expirado" : `${h}h restantes`;
  };

  const short = (addr: string) => `${addr.slice(0,6)}...${addr.slice(-4)}`;

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-4xl font-black mb-2">Admin — Todos os Batches</h1>
          <p className="text-gray-400">Monitore a rede e finalize consensos.</p>
        </div>
        {isConnected && (
          <button onClick={fetchBatches} disabled={loading} className="px-4 py-2 rounded-xl border border-white/10 text-sm text-gray-400 hover:text-white hover:border-white/20 transition">
            {loading ? "..." : "↻ Atualizar"}
          </button>
        )}
      </div>

      {!isConnected ? (
        <div className="text-center py-20">
          <div className="text-5xl mb-4">🔧</div>
          <h2 className="text-xl font-bold mb-3">Conecte sua carteira</h2>
          <button onClick={connect} className="px-6 py-3 bg-[#00f5c4] text-black font-bold rounded-xl hover:bg-[#00f5c4]/90 transition">
            Conectar MetaMask
          </button>
        </div>
      ) : loading ? (
        <div className="text-center py-20 text-gray-500">Buscando dados da blockchain...</div>
      ) : batches.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-5xl mb-4">📭</div>
          <p className="text-gray-400">Nenhum batch encontrado. Crie o primeiro!</p>
        </div>
      ) : (
        <>
          {/* Summary */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            {[
              { label: "Total de Batches", value: batches.length },
              { label: "Abertos",          value: batches.filter(b => b.status === 0).length },
              { label: "Finalizados",      value: batches.filter(b => b.status === 1).length },
            ].map(s => (
              <div key={s.label} className="p-4 rounded-xl bg-white/[0.03] border border-white/5 text-center">
                <div className="text-3xl font-black font-mono text-[#00f5c4]">{s.value}</div>
                <div className="text-xs text-gray-500 mt-1">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Table */}
          <div className="rounded-2xl border border-white/10 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/5 bg-white/[0.02]">
                  {["Batch ID", "Criador", "Recompensa", "Tarefas", "Prazo", "Status", "Ação"].map(h => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {batches.map((batch, i) => (
                  <tr key={batch.id} className={`border-b border-white/5 hover:bg-white/[0.02] transition ${i % 2 === 0 ? "" : "bg-white/[0.01]"}`}>
                    <td className="px-4 py-3 font-mono text-sm text-[#00f5c4]">#{batch.id}</td>
                    <td className="px-4 py-3 font-mono text-xs text-gray-400">
                      <a href={`https://sepolia.etherscan.io/address/${batch.creator}`} target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
                        {short(batch.creator)}
                      </a>
                    </td>
                    <td className="px-4 py-3 font-mono text-sm text-white">{batch.reward} ETH</td>
                    <td className="px-4 py-3 text-sm text-gray-300">{batch.taskCount}</td>
                    <td className="px-4 py-3 text-xs text-gray-500">{timeStr(batch.deadline)}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded-md text-xs font-medium ${STATUS_COLOR[batch.status]}`}>
                        {BATCH_STATUS[batch.status]}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {batch.status === 0 ? (
                        <div>
                          <button
                            onClick={() => finalize(batch.id)}
                            disabled={finalizing[batch.id]}
                            className="px-3 py-1.5 bg-[#00f5c4]/10 text-[#00f5c4] text-xs font-medium rounded-lg hover:bg-[#00f5c4]/20 transition disabled:opacity-40"
                          >
                            {finalizing[batch.id] ? "..." : "Finalizar"}
                          </button>
                          {error[batch.id] && <p className="text-xs text-red-400 mt-1 max-w-32">{error[batch.id].slice(0, 50)}</p>}
                          {done[batch.id] && (
                            <a href={`https://sepolia.etherscan.io/tx/${done[batch.id]}`} target="_blank" rel="noopener noreferrer" className="text-xs text-green-400 mt-1 block hover:underline">✅ Ver tx →</a>
                          )}
                        </div>
                      ) : (
                        <span className="text-xs text-gray-600">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
