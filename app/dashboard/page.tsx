"use client";
import { useState, useEffect, useCallback } from "react";
import { ethers } from "ethers";
import { useWeb3 } from "@/lib/useWeb3";

export default function DashboardPage() {
  const { isConnected, connect, address, getContract } = useWeb3();
  const [score,      setScore]      = useState<bigint>(0n);
  const [totalTasks, setTotalTasks] = useState<bigint>(0n);
  const [balance,    setBalance]    = useState("0");
  const [loading,    setLoading]    = useState(false);

  const fetchProfile = useCallback(async () => {
    if (!address) return;
    const contract = getContract(false);
    if (!contract) return;
    setLoading(true);
    try {
      const profile = await contract.getNodeProfile(address);
      setScore(profile.score);
      setTotalTasks(profile.totalTasks);
      if (window.ethereum) {
        const p = new ethers.BrowserProvider(window.ethereum);
        const bal = await p.getBalance(address);
        setBalance(Number(ethers.formatEther(bal)).toFixed(4));
      }
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  }, [address, getContract]);

  useEffect(() => { if (isConnected) fetchProfile(); }, [isConnected, fetchProfile]);

  const level = (score: bigint) => {
    const s = Number(score);
    if (s >= 500) return { label: "Expert",    color: "text-yellow-400",  bg: "bg-yellow-400/10" };
    if (s >= 200) return { label: "Avançado",  color: "text-purple-400",  bg: "bg-purple-400/10" };
    if (s >= 50)  return { label: "Validador", color: "text-blue-400",    bg: "bg-blue-400/10"   };
    return             { label: "Iniciante",   color: "text-gray-400",    bg: "bg-gray-400/10"   };
  };

  const lvl = level(score);
  const accuracy = totalTasks > 0n ? Math.min(100, Math.round((Number(score) / (Number(totalTasks) * 10)) * 100)) : 0;

  const STATS = [
    { label: "Score PoEC",       value: score.toString(),      suffix: "pts", color: "text-[#c8522a]" },
    { label: "Tarefas Totais",   value: totalTasks.toString(), suffix: "",    color: "text-white"     },
    { label: "Taxa de Acerto",   value: accuracy.toString(),   suffix: "%",   color: "text-blue-400"  },
    { label: "Saldo",            value: balance,               suffix: "ETH", color: "text-purple-400"},
  ];

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <div className="mb-10">
        <h1 className="text-4xl font-black mb-2">Dashboard do Nó</h1>
        <p className="text-gray-400">Seu perfil, score PoEC e recompensas acumuladas.</p>
      </div>

      {!isConnected ? (
        <div className="text-center py-20">
          <div className="text-5xl mb-4">📊</div>
          <h2 className="text-xl font-bold mb-3">Conecte sua carteira</h2>
          <p className="text-gray-400 mb-6 text-sm">Veja seu score PoEC, histórico e recompensas.</p>
          <button onClick={connect} className="px-6 py-3 bg-[#c8522a] text-black font-bold rounded-xl hover:bg-[#c8522a]/90 transition">
            Conectar MetaMask
          </button>
        </div>
      ) : loading ? (
        <div className="text-center py-20 text-gray-500">Carregando perfil...</div>
      ) : (
        <>
          {/* Profile card */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-[#c8522a]/5 to-transparent border border-[#c8522a]/10 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className={`px-2 py-0.5 rounded-md text-xs font-bold ${lvl.bg} ${lvl.color}`}>{lvl.label}</span>
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-xs text-gray-500">Online</span>
                </div>
                <p className="font-mono text-sm text-gray-400">{address}</p>
              </div>
              <button onClick={fetchProfile} className="text-xs text-gray-500 hover:text-white transition">↻</button>
            </div>

            {/* Score bar */}
            <div className="mb-2 flex justify-between text-xs text-gray-500">
              <span>Score PoEC</span>
              <span className="text-[#c8522a] font-mono">{score.toString()} / 500 pts</span>
            </div>
            <div className="h-2 rounded-full bg-white/5">
              <div
                className="h-2 rounded-full bg-gradient-to-r from-[#c8522a] to-blue-400 transition-all duration-700"
                style={{ width: `${Math.min(100, (Number(score) / 500) * 100)}%` }}
              />
            </div>
            <p className="text-xs text-gray-600 mt-1">
              {Number(score) < 50  ? `${50 - Number(score)} pts para Validador` :
               Number(score) < 200 ? `${200 - Number(score)} pts para Avançado` :
               Number(score) < 500 ? `${500 - Number(score)} pts para Expert` : "Nível máximo atingido!"}
            </p>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            {STATS.map(s => (
              <div key={s.label} className="p-5 rounded-xl bg-white/[0.03] border border-white/5">
                <div className={`text-3xl font-black font-mono mb-1 ${s.color}`}>{s.value}<span className="text-lg">{s.suffix}</span></div>
                <div className="text-xs text-gray-500">{s.label}</div>
              </div>
            ))}
          </div>

          {/* How score works */}
          <div className="p-5 rounded-xl bg-white/[0.02] border border-white/5">
            <h3 className="text-sm font-bold mb-3 text-gray-300">Como funciona o Score PoEC</h3>
            <div className="space-y-2 text-xs text-gray-500">
              <div className="flex justify-between">
                <span>+10 pts por resposta no consenso majoritário</span>
                <span className="text-[#c8522a]">Acurácia</span>
              </div>
              <div className="flex justify-between">
                <span>Score determina peso nas distribuições futuras</span>
                <span className="text-blue-400">Reputação</span>
              </div>
              <div className="flex justify-between">
                <span>Score alto = mais tarefas prioritárias</span>
                <span className="text-purple-400">Privilégio</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
