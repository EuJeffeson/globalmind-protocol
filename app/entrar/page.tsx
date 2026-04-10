"use client";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import Link from "next/link";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "@/lib/contract";

const RPC = "https://ethereum-sepolia-rpc.publicnode.com";

export default function EntrarPage() {
  const [validacoes, setValidacoes] = useState(0);
  const [batches, setBatches] = useState(0);
  const [validadores, setValidadores] = useState(0);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);

  useEffect(() => {
    async function load() {
      try {
        const provider = new ethers.JsonRpcProvider(RPC);
        const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
        const batchCount = Number(await contract.batchCount());
        let totalAnswers = 0;
        let uniqueValidators = new Set<string>();
        for (let i = 0; i < Math.min(batchCount, 50); i++) {
          const info = await contract.getBatchInfo(i);
          totalAnswers += Number(info.answerCount);
          for (let j = 0; j < Number(info.taskCount); j++) {
            try {
              const answers = await contract.getAnswers(i, j);
              answers.forEach((a: any) => uniqueValidators.add(a.node));
            } catch {}
          }
        }
        setBatches(batchCount);
        setValidacoes(totalAnswers);
        setValidadores(uniqueValidators.size);
      } catch {}
      setLoading(false);
    }
    load();
  }, []);

  // Contador animado
  useEffect(() => {
    if (loading) return;
    const target = validacoes;
    let current = 0;
    const step = Math.ceil(target / 60);
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      setCount(current);
      if (current >= target) clearInterval(timer);
    }, 30);
    return () => clearInterval(timer);
  }, [loading, validacoes]);

  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "2rem", paddingTop: "7rem" }}>

      {/* Eyebrow */}
      <div style={{ fontFamily: "var(--font-mono), monospace", fontSize: "0.65rem", color: "var(--accent)", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--accent)", display: "inline-block", animation: "pulse 1.5s infinite" }} />
        Rede ativa agora — Ethereum Sepolia
      </div>

      {/* Headline */}
      <h1 style={{ fontFamily: "var(--font-serif), serif", fontSize: "clamp(2.2rem, 6vw, 4.5rem)", lineHeight: 1.05, letterSpacing: "-0.03em", color: "var(--ink)", textAlign: "center", maxWidth: "800px", marginBottom: "1.5rem" }}>
        Enquanto você lê isso,<br/>
        <em style={{ color: "var(--accent)", fontStyle: "italic" }}>pessoas estão sendo pagas</em><br/>
        para treinar IA.
      </h1>

      <p style={{ fontSize: "1.1rem", color: "var(--ink2)", lineHeight: 1.8, textAlign: "center", maxWidth: "560px", marginBottom: "3rem", fontWeight: 300 }}>
        Validadores do Brasil inteiro verificam dados de inteligência artificial e recebem USDC automaticamente — registrado na blockchain, auditável por qualquer pessoa.
      </p>

      {/* Contador ao vivo */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem", marginBottom: "3.5rem", width: "100%", maxWidth: "600px" }}>
        {[
          { val: loading ? "..." : count.toString(), label: "Validações on-chain", color: "var(--accent)" },
          { val: loading ? "..." : batches.toString(), label: "Batches ativos", color: "var(--accent2)" },
          { val: loading ? "..." : validadores.toString(), label: "Validadores únicos", color: "var(--accent3)" },
        ].map(s => (
          <div key={s.label} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "8px", padding: "1.5rem", textAlign: "center" }}>
            <div style={{ fontFamily: "var(--font-serif), serif", fontSize: "2.8rem", color: s.color, lineHeight: 1, marginBottom: "0.4rem", transition: "all 0.3s" }}>{s.val}</div>
            <div style={{ fontFamily: "var(--font-mono), monospace", fontSize: "0.58rem", color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.1em" }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Urgência */}
      <div style={{ background: "rgba(200,82,42,0.06)", border: "1px solid rgba(200,82,42,0.2)", borderRadius: "8px", padding: "1.2rem 2rem", marginBottom: "2.5rem", textAlign: "center", maxWidth: "560px" }}>
        <p style={{ fontFamily: "var(--font-mono), monospace", fontSize: "0.8rem", color: "var(--accent)", lineHeight: 1.7, margin: 0 }}>
          Quem entra agora acumula créditos GMND antes do token lançar.<br/>
          <strong>Depois que o mainnet abrir, essa janela fecha.</strong>
        </p>
      </div>

      {/* CTAs */}
      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center", marginBottom: "3rem" }}>
        <Link href="/validador" className="btn-fill" style={{ fontSize: "1rem", padding: "1rem 2.5rem" }}>
          Quero entrar agora
        </Link>
        <Link href="/como-funciona" className="btn-ghost" style={{ fontSize: "1rem", padding: "1rem 2rem" }}>
          Como funciona?
        </Link>
      </div>

      {/* Social proof */}
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem", maxWidth: "500px", width: "100%" }}>
        {[
          { code: "901 451", isp: "Maranet Telecom", local: "Norte do Brasil", status: "Ativo" },
        ].map(isp => (
          <div key={isp.code} style={{ display: "flex", alignItems: "center", gap: "1rem", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "8px", padding: "1rem 1.2rem" }}>
            <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#10B981", flexShrink: 0 }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: "0.85rem", color: "var(--ink)", fontWeight: 600 }}>{isp.isp}</div>
              <div style={{ fontFamily: "var(--font-mono), monospace", fontSize: "0.65rem", color: "var(--muted)" }}>{isp.local} · código {isp.code}</div>
            </div>
            <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: "0.6rem", color: "#10B981", background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.2)", padding: "0.2rem 0.6rem", borderRadius: "2px" }}>
              {isp.status}
            </span>
          </div>
        ))}
        <p style={{ textAlign: "center", fontFamily: "var(--font-mono), monospace", fontSize: "0.65rem", color: "var(--muted)", margin: 0 }}>
          Seu provedor de internet pode ser o próximo parceiro →{" "}
          <Link href="/empresa" style={{ color: "var(--accent)", textDecoration: "none" }}>saiba como</Link>
        </p>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.8); }
        }
      `}</style>
    </div>
  );
}
