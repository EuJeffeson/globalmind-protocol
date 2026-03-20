"use client";
import { useState, useEffect, useCallback } from "react";
import { ethers } from "ethers";
import { CONTRACT_ADDRESS, CONTRACT_ABI, GMND_TOKEN_ADDRESS, GMND_TOKEN_ABI as TOKEN_ABI } from "@/lib/contract";

const PROTOCOL = CONTRACT_ADDRESS;
const TOKEN    = GMND_TOKEN_ADDRESS;

interface Batch {
  id: number; creator: string; reward: string;
  taskCount: number; deadline: number; status: number;
}

const STATUS_LABEL = ["ATIVO ✅", "Finalizado", "Cancelado"];
const STATUS_COLOR = [
  { bg: "rgba(45,138,78,0.08)", border: "rgba(45,138,78,0.25)", text: "#2d8a4e" },
  { bg: "rgba(15,14,12,0.04)",  border: "var(--border)",        text: "var(--muted)" },
  { bg: "rgba(200,82,42,0.08)", border: "rgba(200,82,42,0.25)", text: "var(--accent)" },
];

export default function AdminPage() {
  const [address, setAddress]       = useState("");
  const [isConnected, setConnected] = useState(false);
  const [batches, setBatches]       = useState<Batch[]>([]);
  const [loading, setLoading]       = useState(false);
  const [finalizing, setFinalizing] = useState<Record<number, boolean>>({});
  const [done, setDone]             = useState<Record<number, string>>({});
  const [error, setError]           = useState<Record<number, string>>({});
  const [activeBatch, setActiveBatch] = useState<number | null>(null);
  const [gmndBalance, setGmndBalance] = useState("0");

  // Create batch form
  const [creating, setCreating]     = useState(false);
  const [createTx, setCreateTx]     = useState("");
  const [createError, setCreateError] = useState("");
  const [reward, setReward]         = useState("10");

  const getProvider = () => {
    if (typeof window === "undefined" || !window.ethereum) return null;
    return new ethers.BrowserProvider(window.ethereum);
  };

  const getContract = async (write: boolean) => {
    const provider = getProvider();
    if (!provider) return null;
    if (write) {
      const signer = await provider.getSigner();
      return new ethers.Contract(PROTOCOL, CONTRACT_ABI, signer);
    }
    return new ethers.Contract(PROTOCOL, CONTRACT_ABI, provider);
  };

  const getToken = async (write: boolean) => {
    const provider = getProvider();
    if (!provider) return null;
    if (write) {
      const signer = await provider.getSigner();
      return new ethers.Contract(TOKEN, TOKEN_ABI, signer);
    }
    return new ethers.Contract(TOKEN, TOKEN_ABI, provider);
  };

  const connect = async () => {
    if (!window.ethereum) { alert("Instale MetaMask!"); return; }
    const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
    setAddress(accounts[0]);

    // Ensure we're on Sepolia before allowing any writes
    const chainId = await window.ethereum.request({ method: "eth_chainId" });
    if (chainId !== "0xaa36a7") {
      try {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "0xaa36a7" }],
        });
      } catch {
        alert("Por favor, troque para a rede Sepolia na sua carteira.");
        return;
      }
    }

    setConnected(true);
  };

  const fetchBatches = useCallback(async () => {
    const contract = await getContract(false);
    if (!contract) return;
    setLoading(true);
    try {
      const count = Number(await contract.batchCount());
      const result: Batch[] = [];
      let active = null;
      for (let i = 0; i < count; i++) {
        const info = await contract.getBatchInfo(i);
        const status = Number(info[4]);
        if (status === 0) active = i;
        result.push({
          id: i,
          creator:   info[0],
          reward:    ethers.formatEther(info[1]),
          taskCount: Number(info[2]),
          deadline:  Number(info[3]),
          status,
        });
      }
      setBatches(result.reverse());
      setActiveBatch(active);

      // GMND balance
      if (address) {
        const token = await getToken(false);
        if (token) {
          const bal = await token.balanceOf(address);
          const dec = await token.decimals();
          setGmndBalance(Number(ethers.formatUnits(bal, dec)).toLocaleString());
        }
      }
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  }, [address]);

  useEffect(() => { if (isConnected) fetchBatches(); }, [isConnected, fetchBatches]);

  const finalize = async (batchId: number) => {
    const contract = await getContract(true);
    if (!contract) return;
    setFinalizing(f => ({ ...f, [batchId]: true }));
    setError(e => ({ ...e, [batchId]: "" }));
    try {
      let gasLimit = 300000n;
      try {
        const est = await contract.finalizeBatch.estimateGas(batchId);
        gasLimit = est * 130n / 100n;
      } catch { /* use fallback */ }
      const tx = await contract.finalizeBatch(batchId, { gasLimit });
      await tx.wait();
      setDone(d => ({ ...d, [batchId]: tx.hash }));
      fetchBatches();
    } catch (e: any) {
      setError(er => ({ ...er, [batchId]: e.reason || e.message?.slice(0, 60) || "Erro" }));
    } finally {
      setFinalizing(f => ({ ...f, [batchId]: false }));
    }
  };

  const createBatch = async () => {
    setCreating(true);
    setCreateError("");
    setCreateTx("");
    try {
      const provider = getProvider();
      if (!provider) throw new Error("MetaMask não encontrado");
      const signer = await provider.getSigner();

      const rewardWei = ethers.parseUnits(reward, 18);

      // Approve token
      const token = new ethers.Contract(TOKEN, TOKEN_ABI, signer);
      const approveTx = await token.approve(PROTOCOL, rewardWei);
      await approveTx.wait();

      // Create batch
      const contract = new ethers.Contract(PROTOCOL, CONTRACT_ABI, signer);
      const taskIds    = ["task-0", "task-1", "task-2"];
      const contents   = [
        "Esta notícia é verdadeira, falsa ou não verificável? Pesquisadores da USP desenvolveram IA para diagnosticar dengue.",
        "Esta resposta de IA está correta? Qual a capital do Pará? Resposta: Belém.",
        "Este dado é plausível? China instalou 295.000 robôs industriais em 2024.",
      ];
      const taskTypes  = [0, 0, 0];
      const deadlineIn = BigInt(48 * 3600);

      let gasLimit = 600000n;
      try {
        const est = await contract.createBatch.estimateGas(taskIds, contents, taskTypes, deadlineIn, rewardWei);
        gasLimit = est * 130n / 100n;
      } catch { /* use fallback */ }

      const tx = await contract.createBatch(
        taskIds, contents, taskTypes, deadlineIn, rewardWei,
        { gasLimit }
      );
      await tx.wait();
      setCreateTx(tx.hash);
      fetchBatches();
    } catch (e: any) {
      setCreateError(e.reason || e.message?.slice(0, 80) || "Erro ao criar batch");
    } finally {
      setCreating(false);
    }
  };

  const shortAddr = address ? address.slice(0,6) + "..." + address.slice(-4) : "";
  const deadline = (ts: number) => new Date(ts * 1000).toLocaleString("pt-BR");

  if (!isConnected) return (
    <div style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
      <div style={{ textAlign: "center", maxWidth: "400px" }}>
        <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🔧</div>
        <h1 style={{ fontFamily: "var(--font-serif), serif", fontSize: "2rem", marginBottom: "0.5rem" }}>Admin</h1>
        <p style={{ color: "var(--ink2)", fontSize: "0.9rem", fontWeight: 300, marginBottom: "2rem" }}>
          Conecte sua carteira para gerenciar batches do protocolo.
        </p>
        <button onClick={connect} style={{ background: "var(--ink)", color: "var(--bg)", border: "none", padding: "0.9rem 2rem", borderRadius: "2px", fontWeight: 700, fontSize: "0.85rem", letterSpacing: "0.08em", textTransform: "uppercase", cursor: "pointer" }}>
          Conectar Carteira
        </button>
      </div>
    </div>
  );

  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "3rem 1.5rem" }}>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2rem", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <h1 style={{ fontFamily: "var(--font-serif), serif", fontSize: "2.5rem", marginBottom: "0.3rem" }}>Painel Admin</h1>
          <p style={{ fontFamily: "var(--font-mono), monospace", fontSize: "0.65rem", color: "var(--muted)", letterSpacing: "0.08em" }}>
            {shortAddr} · {gmndBalance} GMND
          </p>
        </div>
        <button onClick={fetchBatches} style={{ background: "var(--surface)", border: "1px solid var(--border)", padding: "0.5rem 1rem", borderRadius: "2px", fontSize: "0.8rem", cursor: "pointer", fontFamily: "var(--font-mono), monospace" }}>
          {loading ? "⟳ Carregando..." : "↻ Atualizar"}
        </button>
      </div>

      {/* Status atual */}
      <div style={{ background: activeBatch !== null ? "rgba(45,138,78,0.06)" : "rgba(200,82,42,0.06)", border: `1px solid ${activeBatch !== null ? "rgba(45,138,78,0.2)" : "rgba(200,82,42,0.2)"}`, borderRadius: "6px", padding: "1rem 1.2rem", marginBottom: "2rem", display: "flex", alignItems: "center", gap: "0.8rem" }}>
        <span style={{ fontSize: "1.2rem" }}>{activeBatch !== null ? "✅" : "⚠️"}</span>
        <div>
          <div style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--ink)" }}>
            {activeBatch !== null ? `Batch ${activeBatch} ativo — clientes podem validar agora` : "Nenhum batch ativo — crie um novo abaixo"}
          </div>
          <div style={{ fontFamily: "var(--font-mono), monospace", fontSize: "0.6rem", color: "var(--muted)", marginTop: "0.2rem" }}>
            batchId atual para o frontend: <strong>{activeBatch !== null ? activeBatch : "—"}</strong>
          </div>
        </div>
      </div>

      {/* Criar novo batch */}
      <div className="card" style={{ padding: "1.5rem", marginBottom: "2rem" }}>
        <h2 style={{ fontFamily: "var(--font-serif), serif", fontSize: "1.3rem", marginBottom: "1rem" }}>Criar Novo Batch</h2>

        <div style={{ display: "flex", gap: "1rem", alignItems: "flex-end", flexWrap: "wrap" }}>
          <div>
            <label style={{ fontFamily: "var(--font-mono), monospace", fontSize: "0.6rem", color: "var(--muted)", letterSpacing: "0.1em", textTransform: "uppercase", display: "block", marginBottom: "0.4rem" }}>
              Recompensa (GMND)
            </label>
            <input
              type="number" value={reward}
              onChange={e => setReward(e.target.value)}
              style={{ background: "var(--bg)", border: "1px solid var(--border)", borderRadius: "2px", padding: "0.6rem 0.8rem", fontFamily: "var(--font-mono), monospace", fontSize: "0.85rem", width: "120px", color: "var(--ink)" }}
            />
          </div>
          <button
            onClick={createBatch}
            disabled={creating}
            style={{ background: creating ? "var(--muted)" : "var(--ink)", color: "var(--bg)", border: "none", padding: "0.7rem 1.5rem", borderRadius: "2px", fontWeight: 700, fontSize: "0.8rem", letterSpacing: "0.08em", textTransform: "uppercase", cursor: creating ? "not-allowed" : "pointer" }}>
            {creating ? "⟳ Criando..." : "+ Criar Batch"}
          </button>
        </div>

        {createTx && (
          <div style={{ marginTop: "1rem", padding: "0.8rem", background: "rgba(45,138,78,0.06)", border: "1px solid rgba(45,138,78,0.2)", borderRadius: "4px" }}>
            <div style={{ fontSize: "0.85rem", color: "#2d8a4e", marginBottom: "0.3rem" }}>✅ Batch criado com sucesso!</div>
            <a href={`https://sepolia.etherscan.io/tx/${createTx}`} target="_blank" rel="noopener noreferrer"
              style={{ fontFamily: "var(--font-mono), monospace", fontSize: "0.65rem", color: "var(--accent)", wordBreak: "break-all" }}>
              {createTx} → Etherscan
            </a>
          </div>
        )}

        {createError && (
          <div style={{ marginTop: "1rem", padding: "0.8rem", background: "rgba(200,82,42,0.06)", border: "1px solid rgba(200,82,42,0.2)", borderRadius: "4px", fontSize: "0.82rem", color: "var(--accent)" }}>
            ❌ {createError}
          </div>
        )}
      </div>

      {/* Lista de batches */}
      <h2 style={{ fontFamily: "var(--font-serif), serif", fontSize: "1.3rem", marginBottom: "1rem" }}>
        Todos os Batches ({batches.length})
      </h2>

      {loading && <p style={{ color: "var(--muted)", fontFamily: "var(--font-mono), monospace", fontSize: "0.8rem" }}>Carregando...</p>}

      <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
        {batches.map(b => {
          const sc = STATUS_COLOR[b.status] || STATUS_COLOR[1];
          return (
            <div key={b.id} className="card" style={{ padding: "1.2rem 1.5rem", background: sc.bg, border: `1px solid ${sc.border}` }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "0.8rem" }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.8rem", marginBottom: "0.4rem" }}>
                    <span style={{ fontFamily: "var(--font-serif), serif", fontSize: "1.2rem", color: "var(--ink)" }}>Batch #{b.id}</span>
                    <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: "0.6rem", color: sc.text, background: sc.bg, border: `1px solid ${sc.border}`, borderRadius: "2px", padding: "0.15rem 0.5rem" }}>
                      {STATUS_LABEL[b.status]}
                    </span>
                  </div>
                  <div style={{ fontFamily: "var(--font-mono), monospace", fontSize: "0.65rem", color: "var(--muted)", display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
                    <span>💰 {b.reward} GMND</span>
                    <span>📋 {b.taskCount} tarefas</span>
                    <span>⏰ {deadline(b.deadline)}</span>
                  </div>
                </div>

                {b.status === 0 && (
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "0.4rem" }}>
                    {done[b.id] ? (
                      <a href={`https://sepolia.etherscan.io/tx/${done[b.id]}`} target="_blank" rel="noopener noreferrer"
                        style={{ fontFamily: "var(--font-mono), monospace", fontSize: "0.62rem", color: "#2d8a4e" }}>
                        ✅ Finalizado → Etherscan
                      </a>
                    ) : (
                      <button
                        onClick={() => finalize(b.id)}
                        disabled={finalizing[b.id]}
                        style={{ background: "var(--ink)", color: "var(--bg)", border: "none", padding: "0.5rem 1rem", borderRadius: "2px", fontWeight: 700, fontSize: "0.75rem", letterSpacing: "0.06em", textTransform: "uppercase", cursor: finalizing[b.id] ? "not-allowed" : "pointer" }}>
                        {finalizing[b.id] ? "⟳ Finalizando..." : "Finalizar Batch"}
                      </button>
                    )}
                    {error[b.id] && (
                      <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: "0.6rem", color: "var(--accent)" }}>
                        ❌ {error[b.id]}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
