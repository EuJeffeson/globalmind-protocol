"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function SeedPage() {
  const [copied, setCopied] = useState(false);

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

  const copyEmail = () => {
    navigator.clipboard.writeText("globalmindprotocol@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ background: "var(--bg)" }}>

      {/* HERO */}
      <section style={{ padding: "8rem 1.5rem 5rem", maxWidth: "860px", margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.8rem", marginBottom: "2rem", flexWrap: "wrap" }}>
          <span style={{
            background: "var(--accent)", color: "white",
            fontFamily: "var(--font-mono), monospace", fontSize: "0.65rem",
            padding: "0.35rem 0.8rem", borderRadius: "2px",
            letterSpacing: "0.12em", textTransform: "uppercase",
          }}>🔴 Seed Round Aberto</span>
          <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: "0.65rem", color: "var(--muted)", letterSpacing: "0.1em" }}>
            // $500K · 150M GMND · $0.003/token · Valuation $3.3M
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

        <p style={{ fontSize: "1rem", color: "var(--ink2)", lineHeight: 1.8, fontWeight: 300, maxWidth: "600px", marginBottom: "1rem" }}>
          O GlobalMind Protocol está com o Seed Round aberto. Valuation de $3.3M,
          com potencial de 3x–5x na Série A. Seja um dos primeiros investidores
          da infraestrutura descentralizada de validação de IA.
        </p>

        <p style={{ fontSize: "0.85rem", color: "var(--accent)", fontFamily: "var(--font-mono), monospace", marginBottom: "2.5rem" }}>
          ⚡ Primeiros $200K já em negociação — spots limitados para early believers.
        </p>

        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <a href="https://forms.gle/seed-globalmind" target="_blank" rel="noopener noreferrer" className="btn-fill">
            Quero Investir
          </a>
          <a href="https://twitter.com/GMNDProtocol" target="_blank" rel="noopener noreferrer" className="btn-ghost">
            DM @GMNDProtocol →
          </a>
        </div>
      </section>

      {/* STATS */}
      <section style={{ padding: "0 1.5rem 5rem", maxWidth: "860px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1rem" }} className="stats-grid">
          {[
            { val: "$500K",  label: "Meta da Rodada",     color: "var(--accent)"  },
            { val: "$0.003", label: "Preço por GMND",     color: "var(--accent2)" },
            { val: "$3.3M",  label: "Valuation",          color: "var(--accent3)" },
            { val: "150M",   label: "Tokens Disponíveis", color: "var(--accent)"  },
          ].map(s => (
            <div key={s.label} className="card reveal" style={{ padding: "1.5rem", textAlign: "center" }}>
              <span style={{ fontFamily: "var(--font-serif), serif", fontSize: "2rem", color: s.color, lineHeight: 1, display: "block" }}>{s.val}</span>
              <div style={{ fontFamily: "var(--font-mono), monospace", fontSize: "0.6rem", color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.1em", marginTop: "0.5rem" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* TRACTION AO VIVO */}
      <section style={{ padding: "5rem 1.5rem", background: "var(--ink)", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ maxWidth: "860px", margin: "0 auto" }}>
          <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: "0.65rem", color: "rgba(244,241,235,0.3)", letterSpacing: "0.15em", textTransform: "uppercase", display: "block", marginBottom: "1rem" }}>// Tração Real — Não é Demo</span>
          <h2 style={{ fontFamily: "var(--font-serif), serif", fontSize: "clamp(1.8rem, 4vw, 3rem)", color: "var(--bg)", lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: "3rem" }}>
            Construído em 3 semanas. <em style={{ color: "var(--accent)" }}>Live agora.</em>
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem", marginBottom: "2rem" }} className="traction-grid">
            {[
              { val: "2",        label: "Contratos on-chain",    color: "var(--accent)"  },
              { val: "1.000+",   label: "Nodes potenciais (ISP)", color: "var(--accent3)" },
              { val: "$17B",     label: "Mercado total (2030)",   color: "var(--accent2)" },
            ].map(s => (
              <div key={s.label} style={{ background: "rgba(244,241,235,0.04)", border: "1px solid rgba(244,241,235,0.08)", borderRadius: "6px", padding: "1.5rem", textAlign: "center" }}>
                <span style={{ fontFamily: "var(--font-serif), serif", fontSize: "2rem", color: s.color, lineHeight: 1, display: "block" }}>{s.val}</span>
                <div style={{ fontFamily: "var(--font-mono), monospace", fontSize: "0.6rem", color: "rgba(244,241,235,0.3)", textTransform: "uppercase", letterSpacing: "0.1em", marginTop: "0.5rem" }}>{s.label}</div>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
            {[
              { icon: "✅", text: "Smart Contracts V2 + V3 live na Ethereum Sepolia" },
              { icon: "✅", text: "Token $GMND ERC-20 com Halving deployado" },
              { icon: "✅", text: "dApp em produção — globalmind-protocol.vercel.app" },
              { icon: "✅", text: "Parceria Maranet Telecom — 1.000+ clientes, Marabá-PA" },
              { icon: "✅", text: "Primeiras validações on-chain confirmadas na blockchain" },
              { icon: "✅", text: "Open source — github.com/EuJeffeson/globalmind-protocol" },
              { icon: "✅", text: "Listado no Giveth como public good — primeira doação recebida" },
              { icon: "✅", text: "Product Hunt lançado · DevHunt listado" },
            ].map(({ icon, text }) => (
              <div key={text} style={{ display: "flex", alignItems: "center", gap: "0.8rem", padding: "0.6rem 0", borderBottom: "1px solid rgba(244,241,235,0.05)" }}>
                <span style={{ fontSize: "0.85rem" }}>{icon}</span>
                <span style={{ fontSize: "0.85rem", color: "rgba(244,241,235,0.6)", fontFamily: "var(--font-sans), sans-serif" }}>{text}</span>
              </div>
            ))}
          </div>

          {/* TX on-chain proof */}
          <div style={{ marginTop: "2rem", background: "rgba(200,82,42,0.08)", border: "1px solid rgba(200,82,42,0.2)", borderRadius: "6px", padding: "1.2rem" }}>
            <div style={{ fontFamily: "var(--font-mono), monospace", fontSize: "0.6rem", color: "var(--accent)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.5rem" }}>Primeira validação on-chain</div>
            <a href="https://sepolia.etherscan.io/tx/0xe68105a8faea2cad90aa0197f453a1f19cf6ece447efff65f1e4675b18726b6e" target="_blank" rel="noopener noreferrer"
              style={{ fontFamily: "var(--font-mono), monospace", fontSize: "0.75rem", color: "var(--accent)", wordBreak: "break-all" }}>
              0xe68105a8faea2cad90aa0197f453a1f19cf6ece447efff65f1e4675b18726b6e →
            </a>
            <div style={{ fontSize: "0.75rem", color: "rgba(244,241,235,0.3)", marginTop: "0.3rem" }}>Ethereum Sepolia · AnswerSubmitted · Confirmado</div>
          </div>
        </div>
      </section>

      {/* FOUNDER */}
      <section style={{ padding: "5rem 1.5rem", background: "var(--bg)", borderTop: "1px solid var(--border)" }}>
        <div style={{ maxWidth: "860px", margin: "0 auto" }}>
          <span className="section-num">// 01 — O Founder</span>
          <h2 className="section-title">De Marabá, Pará <em>para o mundo.</em></h2>

          <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "3rem", alignItems: "start", marginTop: "3rem" }} className="founder-grid">
            <div style={{ width: "120px", height: "120px", borderRadius: "50%", background: "var(--accent)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <span style={{ fontFamily: "var(--font-serif), serif", fontSize: "3rem", color: "white", fontStyle: "italic" }}>JR</span>
            </div>

            <div>
              <h3 style={{ fontFamily: "var(--font-serif), serif", fontSize: "1.5rem", marginBottom: "0.3rem" }}>Jeffeson Rocha</h3>
              <p style={{ fontFamily: "var(--font-mono), monospace", fontSize: "0.65rem", color: "var(--accent)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "1.5rem" }}>
                Founder & Lead Developer — GlobalMind Protocol · Marabá, Pará 🇧🇷
              </p>

              <div style={{ fontSize: "0.92rem", color: "var(--ink2)", lineHeight: 1.9, fontWeight: 300 }}>
                <p style={{ marginBottom: "1rem" }}>
                  Minha história não começou em Vale do Silício nem em startup de São Paulo. Começou no interior do Pará, vendendo móveis por 3 anos. Era um trabalho honesto, mas eu sempre soube que tecnologia era meu caminho.
                </p>
                <p style={{ marginBottom: "1rem" }}>
                  Tive a chance de entrar num provedor de internet local. Com dedicação total, fui subindo — aprendi rede, suporte, gestão — até ser chamado pra ser sócio em outro provedor. Hoje sou administrador, tocando operações reais de telecom no Norte do Brasil.
                </p>
                <p style={{ marginBottom: "1rem" }}>
                  Fiz um bootcamp de dev web e me apaixonei por código. Dali, entrei no Web3: estudei Ethereum, smart contracts, DePIN — tudo do zero, noites adentro. Estudando IA profundamente, vi o problema que ninguém estava resolvendo: o gargalo não é só compute, é <strong style={{ color: "var(--ink)" }}>validação humana confiável</strong>.
                </p>
                <p>
                  Decidi unir Web3 + IA + pessoas reais. Em poucas semanas: contratos live, dApp em produção, parceria ISP com 1.000+ nodes potenciais e seed round aberto. De vendedor de móveis em Marabá → solo founder construindo infraestrutura pública para a IA do futuro.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* POR QUE INVESTIR */}
      <section style={{ padding: "5rem 1.5rem", background: "var(--surface)", borderTop: "1px solid var(--border)" }}>
        <div style={{ maxWidth: "860px", margin: "0 auto" }}>
          <span className="section-num">// 02 — Por que Investir</span>
          <h2 className="section-title">O mercado certo. <em>Na hora certa.</em></h2>
          <p style={{ color: "var(--ink2)", fontSize: "1rem", lineHeight: 1.8, fontWeight: 300, marginTop: "1rem", marginBottom: "3rem", maxWidth: "600px" }}>
            O mercado de validação de dados de IA cresce 30-35% ao ano e deve atingir $17B até 2030. Nenhum protocolo descentralizado domina esse espaço ainda.
          </p>

          <div className="cards-grid">
            {[
              { icon: "📈", title: "Mercado de $17B", desc: "Validação de dados de IA cresce 30-35% ao ano. Empresas como Scale AI dominam de forma centralizada e opaca. Oportunidade enorme para um protocolo descentralizado." },
              { icon: "🔥", title: "Deflação Dupla", desc: "Halving a cada 2 anos + burn de 20% por transação corporativa. Nenhum competidor combina os dois mecanismos. Pressão deflacionária constante sobre o token." },
              { icon: "🌐", title: "Tração Real", desc: "Contratos live, dApp em produção, parceiro ISP com 1.000+ clientes. Primeiras validações on-chain confirmadas. Solo founder executando rápido." },
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
          <span className="section-num">// 03 — Potencial de Retorno</span>
          <h2 className="section-title">Bittensor começou em <em>$1M.</em></h2>
          <p style={{ color: "var(--ink2)", fontSize: "1rem", lineHeight: 1.8, fontWeight: 300, marginTop: "1rem", marginBottom: "3rem", maxWidth: "600px" }}>
            Hoje vale $2.2 bilhões. Entrada no GlobalMind a $3.3M de valuation representa upside assimétrico para investidores early-stage.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }} className="compare-grid">
            <div className="card reveal" style={{ padding: "2rem", background: "var(--surface)" }}>
              <div style={{ fontFamily: "var(--font-mono), monospace", fontSize: "0.6rem", color: "var(--muted)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "1rem" }}>Projeção Série A</div>
              {[
                { label: "Preço Seed",   val: "$0.003", color: "var(--ink)"    },
                { label: "Série A (3x)", val: "$0.009", color: "var(--accent3)" },
                { label: "Série A (5x)", val: "$0.015", color: "var(--accent)"  },
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
                { label: "Instrumento",   val: "SAFE / Token Warrant"  },
                { label: "Cliff",         val: "6 meses"               },
                { label: "Vesting",       val: "18 meses linear"       },
                { label: "Ticket mínimo", val: "$5.000"                },
                { label: "Aceita",        val: "ETH / USDC / BRL"      },
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
          <span className="section-num">// 04 — Como Participar</span>
          <h2 className="section-title">Processo <em>simples.</em></h2>

          <div style={{ marginTop: "3rem", display: "flex", flexDirection: "column", gap: 0 }}>
            {[
              { num: "01", title: "Entre em contato", desc: "Manda email ou DM no X (@GMNDProtocol). Respondo em até 24h." },
              { num: "02", title: "Receba o pitch deck", desc: "Envio o pitch deck completo com tokenomics, roadmap, tração e termos do seed." },
              { num: "03", title: "Due diligence", desc: "Todo o código é open source no GitHub. Contratos verificáveis no Etherscan. Transparência total." },
              { num: "04", title: "Assine o SAFE", desc: "Documento simples. Aceito ETH, USDC ou BRL via transferência." },
              { num: "05", title: "Receba os tokens", desc: "GMND alocados para sua carteira com vesting automático via smart contract no mainnet." },
            ].map((step, i) => (
              <div key={step.num} className="reveal" style={{ display: "flex", gap: "1.5rem", position: "relative", marginBottom: "1.5rem" }}>
                {i < 4 && <div style={{ position: "absolute", left: "23px", top: "48px", width: "1px", bottom: "-24px", background: "var(--border)" }} />}
                <div style={{ width: "48px", height: "48px", borderRadius: "50%", flexShrink: 0, background: "var(--ink)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-mono), monospace", fontSize: "0.65rem", color: "var(--accent)", position: "relative", zIndex: 1 }}>{step.num}</div>
                <div className="card" style={{ padding: "1.2rem 1.4rem", flex: 1 }}>
                  <h4 style={{ fontSize: "0.9rem", fontWeight: 800, marginBottom: "0.4rem" }}>{step.title}</h4>
                  <p style={{ fontSize: "0.83rem", color: "var(--muted)", lineHeight: 1.6 }}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DISCLAIMER */}
      <section style={{ padding: "2rem 1.5rem", background: "var(--bg)", borderTop: "1px solid var(--border)" }}>
        <div style={{ maxWidth: "860px", margin: "0 auto" }}>
          <p style={{ fontFamily: "var(--font-mono), monospace", fontSize: "0.62rem", color: "var(--muted)", lineHeight: 1.8, letterSpacing: "0.02em" }}>
            ⚠️ DISCLAIMER: Investimento em projetos early-stage crypto/DePIN envolve alto risco, incluindo potencial perda total do capital investido. Este conteúdo não constitui conselho financeiro, jurídico ou de investimento. DYOR (Do Your Own Research). Apenas invista o que você pode se dar ao luxo de perder. O GlobalMind Protocol está em fase de testnet — mainnet e funcionalidades completas ainda em desenvolvimento.
          </p>
        </div>
      </section>

      {/* CTA FINAL */}
      <section style={{ background: "var(--ink)", padding: "6rem 1.5rem", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", bottom: "-3rem", left: "50%", transform: "translateX(-50%)", fontFamily: "var(--font-serif), serif", fontSize: "30vw", color: "rgba(244,241,235,0.03)", pointerEvents: "none", whiteSpace: "nowrap", lineHeight: 1 }}>SEED</div>
        <h2 style={{ fontFamily: "var(--font-serif), serif", fontStyle: "italic", fontSize: "clamp(2rem, 6vw, 5rem)", color: "var(--bg)", lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: "1.5rem", position: "relative" }}>
          Entre cedo.<br/>
          <em style={{ fontStyle: "normal", color: "var(--accent)" }}>Ganhe muito.</em>
        </h2>
        <p style={{ color: "rgba(244,241,235,0.45)", fontSize: "1rem", maxWidth: "500px", margin: "0 auto 0.5rem", lineHeight: 1.7, position: "relative" }}>
          Valuation $3.3M. Ticket mínimo $5.000. ETH, USDC ou BRL.
        </p>
        <p style={{ color: "rgba(244,241,235,0.25)", fontSize: "0.8rem", maxWidth: "500px", margin: "0 auto 2.5rem", fontFamily: "var(--font-mono), monospace", position: "relative" }}>
          ⚡ Primeiros $200K em negociação — spots limitados
        </p>
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap", position: "relative", marginBottom: "1.5rem" }}>
          <a href="https://twitter.com/GMNDProtocol" target="_blank" rel="noopener noreferrer" style={{ background: "var(--accent)", color: "white", padding: "1rem 2rem", borderRadius: "2px", fontWeight: 700, fontSize: "0.85rem", letterSpacing: "0.08em", textTransform: "uppercase", textDecoration: "none", display: "inline-block" }}>
            DM @GMNDProtocol
          </a>
          <button onClick={copyEmail} style={{ background: "transparent", color: "rgba(244,241,235,0.6)", padding: "1rem 2rem", borderRadius: "2px", fontWeight: 700, fontSize: "0.85rem", letterSpacing: "0.08em", textTransform: "uppercase", border: "1px solid rgba(244,241,235,0.15)", cursor: "pointer", fontFamily: "var(--font-mono), monospace" }}>
            {copied ? "✅ Copiado!" : "globalmindprotocol@gmail.com"}
          </button>
        </div>
        <p style={{ fontFamily: "var(--font-mono), monospace", fontSize: "0.65rem", color: "rgba(244,241,235,0.2)", position: "relative" }}>
          People's AI — De Marabá, Pará para o mundo 🇧🇷
        </p>
      </section>

      <style>{`
        .stats-grid { grid-template-columns: repeat(4, 1fr); }
        .compare-grid { grid-template-columns: 1fr 1fr; }
        .founder-grid { grid-template-columns: auto 1fr; }
        .traction-grid { grid-template-columns: repeat(3, 1fr); }
        @media (max-width: 768px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .compare-grid { grid-template-columns: 1fr !important; }
          .founder-grid { grid-template-columns: 1fr !important; }
          .traction-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 480px) {
          .traction-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
