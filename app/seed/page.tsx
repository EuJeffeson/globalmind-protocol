"use client";
import { useEffect } from "react";
import Link from "next/link";

export default function SeedPage() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const el = e.target as HTMLElement;
          const siblings = Array.from(el.parentElement?.children || []).filter(c => c.classList.contains("reveal"));
          const idx = siblings.indexOf(el);
          el.style.transitionDelay = idx * 100 + "ms";
          el.classList.add("in");
        }
      });
    }, { threshold: 0.1 });
    document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div style={{ background: "var(--bg)" }}>

      {/* HERO */}
      <section style={{ padding: "8rem 1.5rem 5rem", maxWidth: "860px", margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.8rem", marginBottom: "2rem", flexWrap: "wrap" }}>
          <span style={{
            background: "var(--ink)", color: "var(--bg)",
            fontFamily: "var(--font-mono), monospace", fontSize: "0.65rem",
            padding: "0.35rem 0.8rem", borderRadius: "2px",
            letterSpacing: "0.12em", textTransform: "uppercase",
          }}>Seed Round Aberto</span>
          <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: "0.65rem", color: "var(--muted)", letterSpacing: "0.1em" }}>
            // $500K · 150M GMND · $0.003/token
          </span>
        </div>

        <h1 style={{
          fontFamily: "var(--font-serif), serif",
          fontSize: "clamp(2.4rem, 5.5vw, 5rem)",
          lineHeight: 1.05, letterSpacing: "-0.02em",
          color: "var(--ink)", marginBottom: "1.5rem",
        }}>
          Participe do{" "}
          <em style={{ fontStyle: "italic", color: "var(--accent)" }}>futuro</em>{" "}
          da validação de IA
        </h1>

        <p style={{ fontSize: "1rem", color: "var(--ink2)", lineHeight: 1.8, fontWeight: 300, maxWidth: "600px", marginBottom: "2.5rem" }}>
          O GlobalMind Protocol está com o Seed Round aberto. Valuation de $3.3M,
          com potencial de 3x–5x na Série A. Seja um dos primeiros investidores
          da infraestrutura descentralizada de validação de IA.
        </p>

        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <a href="mailto:jeffeson@globalmind-protocol.vercel.app?subject=Interesse no Seed Round GlobalMind" className="btn-fill">
            Quero Investir
          </a>
          <a href="https://twitter.com/GMNDProtocol" target="_blank" rel="noopener noreferrer" className="btn-ghost">
            Falar com o Founder →
          </a>
        </div>
      </section>

      {/* STATS */}
      <section style={{ padding: "0 1.5rem 5rem", maxWidth: "860px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1rem" }} className="stats-grid">
          {[
            { val: "$500K",  label: "Meta da Rodada",    color: "var(--accent)"  },
            { val: "$0.003", label: "Preço por GMND",    color: "var(--accent2)" },
            { val: "$3.3M",  label: "Valuation",         color: "var(--accent3)" },
            { val: "150M",   label: "Tokens Disponíveis", color: "var(--accent)" },
          ].map(s => (
            <div key={s.label} className="card reveal" style={{ padding: "1.5rem", textAlign: "center" }}>
              <span style={{ fontFamily: "var(--font-serif), serif", fontSize: "2rem", color: s.color, lineHeight: 1, display: "block" }}>{s.val}</span>
              <div style={{ fontFamily: "var(--font-mono), monospace", fontSize: "0.6rem", color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.1em", marginTop: "0.5rem" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* POR QUE INVESTIR */}
      <section style={{ padding: "5rem 1.5rem", background: "var(--surface)", borderTop: "1px solid var(--border)" }}>
        <div style={{ maxWidth: "860px", margin: "0 auto" }}>
          <span className="section-num">// 01 — Por que Investir</span>
          <h2 className="section-title">O mercado certo. <em>Na hora certa.</em></h2>
          <p style={{ color: "var(--ink2)", fontSize: "1rem", lineHeight: 1.8, fontWeight: 300, marginTop: "1rem", marginBottom: "3rem", maxWidth: "600px" }}>
            O mercado de validação de dados de IA cresce 30-35% ao ano e deve atingir $17B até 2030. Nenhum protocolo descentralizado domina esse espaço ainda.
          </p>

          <div className="cards-grid">
            {[
              { icon: "📈", title: "Mercado de $17B", desc: "Validação de dados de IA cresce 30-35% ao ano. Empresas como Scale AI dominam de forma centralizada e opaca. Oportunidade enorme para um protocolo descentralizado." },
              { icon: "🔥", title: "Deflação Dupla", desc: "Halving a cada 2 anos + burn de 20% por transação corporativa. Nenhum competidor combina os dois mecanismos. Pressão deflacionária constante sobre o token." },
              { icon: "🌐", title: "Tração Real", desc: "Contratos live na Ethereum, dApp em produção, parceiro ISP com 1.000+ clientes em Marabá-PA. Primeiras validações on-chain já realizadas." },
            ].map(c => (
              <div key={c.title} className="card reveal" style={{ padding: "2rem 1.5rem" }}>
                <span style={{ fontSize: "2.5rem", display: "block", marginBottom: "1.2rem" }}>{c.icon}</span>
                <h3 style={{ fontSize: "1.1rem", fontWeight: 800, marginBottom: "0.8rem" }}>{c.title}</h3>
                <p style={{ fontSize: "0.87rem", color: "var(--muted)", lineHeight: 1.7 }}>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMPARATIVO */}
      <section style={{ padding: "5rem 1.5rem", background: "var(--bg)" }}>
        <div style={{ maxWidth: "860px", margin: "0 auto" }}>
          <span className="section-num">// 02 — Potencial de Retorno</span>
          <h2 className="section-title">Bittensor começou em <em>$1M.</em></h2>
          <p style={{ color: "var(--ink2)", fontSize: "1rem", lineHeight: 1.8, fontWeight: 300, marginTop: "1rem", marginBottom: "3rem", maxWidth: "600px" }}>
            Hoje vale $2.2 bilhões. Entrada no GlobalMind a $3.3M de valuation representa upside assimétrico para investidores early-stage.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }} className="compare-grid">
            <div className="card reveal" style={{ padding: "2rem", background: "var(--surface)" }}>
              <div style={{ fontFamily: "var(--font-mono), monospace", fontSize: "0.6rem", color: "var(--muted)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "1rem" }}>Projeção Série A</div>
              {[
                { label: "Preço Seed",   val: "$0.003", color: "var(--ink)" },
                { label: "Série A (3x)", val: "$0.009", color: "var(--accent3)" },
                { label: "Série A (5x)", val: "$0.015", color: "var(--accent)" },
              ].map(({ label, val, color }) => (
                <div key={label} style={{ display: "flex", justifyContent: "space-between", padding: "0.8rem 0", borderBottom: "1px solid var(--border)" }}>
                  <span style={{ fontSize: "0.85rem", color: "var(--ink2)" }}>{label}</span>
                  <span style={{ fontFamily: "var(--font-serif), serif", fontSize: "1.1rem", color, fontWeight: 700 }}>{val}</span>
                </div>
              ))}
            </div>

            <div className="card reveal" style={{ padding: "2rem", background: "var(--surface)" }}>
              <div style={{ fontFamily: "var(--font-mono), monospace", fontSize: "0.6rem", color: "var(--muted)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "1rem" }}>Termos do Seed</div>
              {[
                { label: "Instrumento",    val: "SAFE / Token Warrant" },
                { label: "Cliff",          val: "6 meses"              },
                { label: "Vesting",        val: "18 meses linear"      },
                { label: "Ticket mínimo",  val: "$5.000"               },
                { label: "Aceita",         val: "ETH / USDC / BRL"     },
              ].map(({ label, val }) => (
                <div key={label} style={{ display: "flex", justifyContent: "space-between", padding: "0.8rem 0", borderBottom: "1px solid var(--border)" }}>
                  <span style={{ fontSize: "0.85rem", color: "var(--ink2)" }}>{label}</span>
                  <span style={{ fontSize: "0.85rem", color: "var(--ink)", fontWeight: 600 }}>{val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* COMO PARTICIPAR */}
      <section style={{ padding: "5rem 1.5rem", background: "var(--surface)", borderTop: "1px solid var(--border)" }}>
        <div style={{ maxWidth: "860px", margin: "0 auto" }}>
          <span className="section-num">// 03 — Como Participar</span>
          <h2 className="section-title">Processo <em>simples.</em></h2>

          <div style={{ marginTop: "3rem", display: "flex", flexDirection: "column", gap: 0 }}>
            {[
              { num: "01", title: "Entre em contato", desc: "Manda um email ou DM no X (@GMNDProtocol) com interesse. Respondo em até 24h." },
              { num: "02", title: "Receba o pitch deck", desc: "Envio o pitch deck completo com tokenomics, roadmap, tração e termos do seed." },
              { num: "03", title: "Due diligence", desc: "Todo o código é open source no GitHub. Contratos verificáveis no Etherscan. Transparência total." },
              { num: "04", title: "Assine o SAFE", desc: "Documento simples de 2 páginas. Aceito ETH, USDC ou BRL via transferência." },
              { num: "05", title: "Receba os tokens", desc: "GMND alocados para sua carteira com vesting automático via smart contract no mainnet." },
            ].map((step, i) => (
              <div key={step.num} className="reveal" style={{ display: "flex", gap: "1.5rem", position: "relative", marginBottom: "1.5rem" }}>
                {i < 4 && <div style={{ position: "absolute", left: "23px", top: "48px", width: "1px", bottom: "-24px", background: "var(--border)" }} />}
                <div style={{
                  width: "48px", height: "48px", borderRadius: "50%", flexShrink: 0,
                  background: "var(--ink)", display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: "var(--font-mono), monospace", fontSize: "0.65rem", color: "var(--accent)",
                  position: "relative", zIndex: 1,
                }}>{step.num}</div>
                <div className="card" style={{ padding: "1.2rem 1.4rem", flex: 1 }}>
                  <h4 style={{ fontSize: "0.9rem", fontWeight: 800, marginBottom: "0.4rem" }}>{step.title}</h4>
                  <p style={{ fontSize: "0.83rem", color: "var(--muted)", lineHeight: 1.6 }}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{
        background: "var(--ink)", padding: "6rem 1.5rem",
        textAlign: "center", position: "relative", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", bottom: "-3rem", left: "50%", transform: "translateX(-50%)",
          fontFamily: "var(--font-serif), serif", fontSize: "30vw", color: "rgba(244,241,235,0.03)",
          pointerEvents: "none", whiteSpace: "nowrap", lineHeight: 1,
        }}>SEED</div>
        <h2 style={{
          fontFamily: "var(--font-serif), serif", fontStyle: "italic",
          fontSize: "clamp(2rem, 6vw, 5rem)", color: "var(--bg)",
          lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: "1.5rem", position: "relative",
        }}>
          Entre cedo.<br/>
          <em style={{ fontStyle: "normal", color: "var(--accent)" }}>Ganhe muito.</em>
        </h2>
        <p style={{ color: "rgba(244,241,235,0.45)", fontSize: "1rem", maxWidth: "500px", margin: "0 auto 2.5rem", lineHeight: 1.7, position: "relative" }}>
          Valuation $3.3M. Ticket mínimo $5.000. Aceito ETH, USDC ou BRL.
          Processo 100% transparente e open source.
        </p>
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap", position: "relative" }}>
          <a href="mailto:jeffeson@globalmind-protocol.vercel.app?subject=Interesse no Seed Round GlobalMind" style={{
            background: "var(--accent)", color: "white",
            padding: "1rem 2rem", borderRadius: "2px",
            fontWeight: 700, fontSize: "0.85rem",
            letterSpacing: "0.08em", textTransform: "uppercase",
            textDecoration: "none", display: "inline-block",
          }}>Quero Investir</a>
          <a href="https://twitter.com/GMNDProtocol" target="_blank" rel="noopener noreferrer" style={{
            background: "transparent", color: "rgba(244,241,235,0.6)",
            padding: "1rem 2rem", borderRadius: "2px",
            fontWeight: 700, fontSize: "0.85rem",
            letterSpacing: "0.08em", textTransform: "uppercase",
            textDecoration: "none", border: "1px solid rgba(244,241,235,0.15)",
            display: "inline-block",
          }}>@GMNDProtocol →</a>
        </div>
      </section>

      <style>{`
        .stats-grid { grid-template-columns: repeat(4, 1fr); }
        .compare-grid { grid-template-columns: 1fr 1fr; }
        @media (max-width: 768px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .compare-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 480px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </div>
  );
}
