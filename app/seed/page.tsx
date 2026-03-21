"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

const PROTOCOL = "0xA605b8092A4f7833799CcFaAE7C914771bdB5D36";

export default function SeedPage() {
  const [copied, setCopied] = useState(false);
  const [liveStats, setLiveStats] = useState({
    batches: "-", burned: "-", rewarded: "-", loading: true,
  });

  const fetchChainData = async () => {
    // getNetworkStats() selector = 0x9ec9cda9
    const RPCS = [
      "https://ethereum-sepolia-rpc.publicnode.com",
      "https://sepolia.drpc.org",
      "https://rpc.sepolia.org",
    ];

    const fromWei = (hex: string) => {
      try {
        const val = BigInt(hex);
        return (Number(val) / 1e18).toFixed(0);
      } catch { return "0"; }
    };

    for (const rpc of RPCS) {
      try {
        const res = await fetch(rpc, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            jsonrpc: "2.0", id: 1, method: "eth_call",
            params: [{ to: PROTOCOL, data: "0x9ec9cda9" }, "latest"],
          }),
        });
        const data = await res.json();
        if (!data.result || data.result === "0x") continue;

        // Decode 3 uint256 values (32 bytes each)
        const raw = data.result.slice(2); // remove 0x
        const batches  = parseInt(raw.slice(0,   64), 16);
        const burned   = "0x" + raw.slice(64,  128);
        const rewarded = "0x" + raw.slice(128, 192);

        setLiveStats({
          batches:  batches.toString(),
          burned:   fromWei(burned) + " GMND",
          rewarded: fromWei(rewarded) + " GMND",
          loading: false,
        });
        return; // sucesso — para aqui
      } catch { continue; }
    }
    // Todos os RPCs falharam — mostra erro
    setLiveStats(prev => ({ ...prev, loading: false }));
  };

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

    fetchChainData();
    const interval = setInterval(fetchChainData, 30000);

    return () => { observer.disconnect(); clearInterval(interval); };
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
          <span style={{ background: "var(--accent)", color: "white", fontFamily: "var(--font-mono), monospace", fontSize: "0.65rem", padding: "0.35rem 0.8rem", borderRadius: "2px", letterSpacing: "0.12em", textTransform: "uppercase" }}>🔴 Seed Round Aberto</span>
          <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: "0.65rem", color: "var(--muted)", letterSpacing: "0.1em" }}>
            // $500K · 150M GMND · $0.003/token · Valuation $3.3M
          </span>
        </div>

        <h1 style={{ fontFamily: "var(--font-serif), serif", fontSize: "clamp(2.4rem, 5.5vw, 5rem)", lineHeight: 1.05, letterSpacing: "-0.02em", color: "var(--ink)", marginBottom: "1.5rem" }}>
          Quem controla os dados{" "}
          <em style={{ fontStyle: "italic", color: "var(--accent)" }}>controla o futuro</em>{" "}
          da inteligência
        </h1>

        <p style={{ fontSize: "1rem", color: "var(--ink2)", lineHeight: 1.8, fontWeight: 300, maxWidth: "600px", marginBottom: "1rem" }}>
          Bittensor confirmou com $2.6B de market cap que validação descentralizada de IA é a próxima camada crítica.
          GlobalMind é o protocolo especializado em validação humana de dados — já rodando — a $3.3M de valuation.
          Mesma tese. <strong style={{ color: "var(--ink)" }}>800x mais upside.</strong>
        </p>

        <p style={{ fontSize: "0.85rem", color: "var(--accent)", fontFamily: "var(--font-mono), monospace", marginBottom: "2.5rem" }}>
          ⚡ Primeiros $200K já em negociação — spots limitados para early believers.
        </p>

        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <a href="https://docs.google.com/forms/d/e/1FAIpQLSe7A0bAoQ4IjRvK0JKkqXeeJcnFXS0_HhpFFrNFvOhcBrO_xQ/viewform" target="_blank" rel="noopener noreferrer" className="btn-fill">
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
            { val: "$500K",  label: "Meta da Rodada",      color: "var(--accent)"  },
            { val: "$0.003", label: "Preço por GMND",      color: "var(--accent2)" },
            { val: "$3.3M",  label: "Valuation",           color: "var(--accent3)" },
            { val: "800x",   label: "Upside vs Bittensor", color: "var(--accent)"  },
          ].map(s => (
            <div key={s.label} className="card reveal" style={{ padding: "1.5rem", textAlign: "center" }}>
              <span style={{ fontFamily: "var(--font-serif), serif", fontSize: "2rem", color: s.color, lineHeight: 1, display: "block" }}>{s.val}</span>
              <div style={{ fontFamily: "var(--font-mono), monospace", fontSize: "0.6rem", color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.1em", marginTop: "0.5rem" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* LIVE CHAIN STATS */}
      <section style={{ padding: "3rem 1.5rem", background: "var(--surface)", borderTop: "1px solid var(--border)" }}>
        <div style={{ maxWidth: "860px", margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem", flexWrap: "wrap", gap: "0.5rem" }}>
            <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: "0.65rem", color: "var(--muted)", letterSpacing: "0.15em", textTransform: "uppercase" }}>
              // Dados ao vivo — Ethereum Sepolia
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontFamily: "var(--font-mono), monospace", fontSize: "0.6rem", color: liveStats.loading ? "var(--muted)" : "#2d8a4e" }}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: liveStats.loading ? "var(--muted)" : "#2d8a4e", display: "inline-block", animation: liveStats.loading ? "none" : "pulse 2s infinite" }} />
              {liveStats.loading ? "Carregando..." : "Atualizado agora"}
            </span>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1rem" }} className="stats-grid">
            {[
              { val: liveStats.batches,  label: "Total de Batches",   icon: "⛓️", color: "var(--accent)"  },
              { val: liveStats.burned,   label: "GMND Queimado",      icon: "🔥", color: "var(--accent)"  },
              { val: liveStats.rewarded, label: "GMND Distribuído",   icon: "💰", color: "#2d8a4e"        },
              { val: "1.000+",           label: "Nodes potenciais",   icon: "📡", color: "var(--accent2)" },
            ].map(s => (
              <div key={s.label} className="card" style={{ padding: "1.5rem", textAlign: "center", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: "0.8rem", right: "0.8rem", fontSize: "1rem", opacity: 0.4 }}>{s.icon}</div>
                <span style={{ fontFamily: "var(--font-serif), serif", fontSize: "1.8rem", color: s.color, lineHeight: 1, display: "block", opacity: liveStats.loading ? 0.4 : 1 }}>
                  {liveStats.loading ? "..." : s.val}
                </span>
                <div style={{ fontFamily: "var(--font-mono), monospace", fontSize: "0.58rem", color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.1em", marginTop: "0.5rem" }}>{s.label}</div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: "1rem", display: "flex", alignItems: "center", gap: "0.6rem" }}>
            <a href={`https://sepolia.etherscan.io/address/${PROTOCOL}`} target="_blank" rel="noopener noreferrer"
              style={{ fontFamily: "var(--font-mono), monospace", fontSize: "0.62rem", color: "var(--accent)", textDecoration: "none" }}>
              Ver contrato no Etherscan →
            </a>
            <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: "0.55rem", color: "var(--muted)" }}>
              · Atualiza automaticamente a cada 30s
            </span>
          </div>
        </div>
      </section>

      {/* TRACTION */}
      <section style={{ padding: "5rem 1.5rem", background: "var(--ink)", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ maxWidth: "860px", margin: "0 auto" }}>
          <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: "0.65rem", color: "rgba(244,241,235,0.3)", letterSpacing: "0.15em", textTransform: "uppercase", display: "block", marginBottom: "1rem" }}>// Tração Real — Não é Demo</span>
          <h2 style={{ fontFamily: "var(--font-serif), serif", fontSize: "clamp(1.8rem, 4vw, 3rem)", color: "var(--bg)", lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: "3rem" }}>
            Construído em 3 semanas. <em style={{ color: "var(--accent)" }}>Live agora.</em>
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
            {[
              { icon: "✅", text: "Smart Contracts V2 + V3 live na Ethereum Sepolia" },
              { icon: "✅", text: "Token $GMND ERC-20 com Halving + 20% auto-burn deployado" },
              { icon: "✅", text: "dApp em produção — globalmind-protocol.vercel.app" },
              { icon: "✅", text: "Parceria Maranet Telecom — 1.000+ clientes, Marabá-PA" },
              { icon: "✅", text: "Clientes Maranet testando o protocolo agora" },
              { icon: "✅", text: "Primeira validação on-chain confirmada — +2.5 GMND ganhos automaticamente" },
              { icon: "✅", text: "Painel admin — criar e finalizar batches pelo browser" },
              { icon: "✅", text: "Open source — github.com/EuJeffeson/globalmind-protocol" },
              { icon: "✅", text: "Listado no Giveth como public good — primeira doação recebida" },
              { icon: "✅", text: "Product Hunt lançado · DevHunt listado" },
              { icon: "✅", text: "Co-founders: Jeffeson Rocha + David Coelho" },
            ].map(({ icon, text }) => (
              <div key={text} style={{ display: "flex", alignItems: "center", gap: "0.8rem", padding: "0.6rem 0", borderBottom: "1px solid rgba(244,241,235,0.05)" }}>
                <span style={{ fontSize: "0.85rem" }}>{icon}</span>
                <span style={{ fontSize: "0.85rem", color: "rgba(244,241,235,0.6)" }}>{text}</span>
              </div>
            ))}
          </div>

          {/* TX proof */}
          <div style={{ marginTop: "2rem", background: "rgba(200,82,42,0.08)", border: "1px solid rgba(200,82,42,0.2)", borderRadius: "6px", padding: "1.2rem" }}>
            <div style={{ fontFamily: "var(--font-mono), monospace", fontSize: "0.6rem", color: "var(--accent)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.5rem" }}>Primeira validação on-chain</div>
            <a href="https://sepolia.etherscan.io/tx/0xe68105a8faea2cad90aa0197f453a1f19cf6ece447efff65f1e4675b18726b6e" target="_blank" rel="noopener noreferrer"
              style={{ fontFamily: "var(--font-mono), monospace", fontSize: "0.72rem", color: "var(--accent)", wordBreak: "break-all" }}>
              0xe68105a8faea2cad90aa0197f453a1f19cf6ece447efff65f1e4675b18726b6e →
            </a>
            <div style={{ fontSize: "0.75rem", color: "rgba(244,241,235,0.3)", marginTop: "0.3rem" }}>Ethereum Sepolia · AnswerSubmitted · Confirmado</div>
          </div>
        </div>
      </section>

      {/* FOUNDERS */}
      <section style={{ padding: "5rem 1.5rem", background: "var(--bg)", borderTop: "1px solid var(--border)" }}>
        <div style={{ maxWidth: "860px", margin: "0 auto" }}>
          <span className="section-num">// 01 — Os Founders</span>
          <h2 className="section-title">Do interior do Brasil <em>para o mundo.</em></h2>

          {/* Jeffeson */}
          <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "3rem", alignItems: "start", marginTop: "3rem", marginBottom: "3rem" }} className="founder-grid">
            <div style={{ width: "120px", height: "120px", borderRadius: "50%", background: "var(--accent)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <span style={{ fontFamily: "var(--font-serif), serif", fontSize: "3rem", color: "white", fontStyle: "italic" }}>JR</span>
            </div>
            <div>
              <h3 style={{ fontFamily: "var(--font-serif), serif", fontSize: "1.5rem", marginBottom: "0.3rem" }}>Jeffeson Rocha</h3>
              <p style={{ fontFamily: "var(--font-mono), monospace", fontSize: "0.65rem", color: "var(--accent)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "1.5rem" }}>
                Co-Founder & Lead Developer · Marabá, Pará 🇧🇷
              </p>
              <div style={{ fontSize: "0.92rem", color: "var(--ink2)", lineHeight: 1.9, fontWeight: 300 }}>
                <p style={{ marginBottom: "1rem" }}>De vendedor de móveis no interior do Pará a solo developer de smart contracts na Ethereum em 3 semanas. Co-administrador da Maranet Telecom com 1.000+ clientes.</p>
                <p>Fez bootcamp de dev web, entrou no Web3 do zero, estudou Ethereum e smart contracts noites adentro. Viu o problema que ninguém resolvia: <strong style={{ color: "var(--ink)" }}>validação humana confiável para IA</strong>. Decidiu construir.</p>
              </div>
            </div>
          </div>

          {/* David */}
          <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "3rem", alignItems: "start", paddingTop: "3rem", borderTop: "1px solid var(--border)" }} className="founder-grid">
            <div style={{ width: "120px", height: "120px", borderRadius: "50%", background: "var(--accent2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <span style={{ fontFamily: "var(--font-serif), serif", fontSize: "3rem", color: "white", fontStyle: "italic" }}>DC</span>
            </div>
            <div>
              <h3 style={{ fontFamily: "var(--font-serif), serif", fontSize: "1.5rem", marginBottom: "0.3rem" }}>David Coelho</h3>
              <p style={{ fontFamily: "var(--font-mono), monospace", fontSize: "0.65rem", color: "var(--accent2)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "1.5rem" }}>
                Co-Founder & Chief Business Officer · Brasil 🇧🇷
              </p>
              <div style={{ fontSize: "0.92rem", color: "var(--ink2)", lineHeight: 1.9, fontWeight: 300 }}>
                <p style={{ marginBottom: "1rem" }}>Empresário do agronegócio brasileiro especializado em operações de pulverização com drones. Responsável pelo financiamento inicial do protocolo e pela estratégia de negócios.</p>
                <p>Experiência com drones conecta diretamente à visão de <strong style={{ color: "var(--ink)" }}>Real-World Data Network</strong> do GlobalMind — dados do mundo real coletados e validados on-chain.</p>
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
            Bittensor confirmou com $2.6B de market cap que validação descentralizada de IA é a próxima camada crítica. GlobalMind é o protocolo especializado nisso, já rodando, a $3.3M de FDV.
          </p>
          <div className="cards-grid">
            {[
              { icon: "⛓️", title: "Bittensor = $2.6B", desc: "TAO lançou em ~$1M e chegou a $2.6B validando modelos de IA. GlobalMind valida os dados que treinam esses modelos. Camada complementar. Mesma tese — 800x mais upside." },
              { icon: "🔥", title: "Deflação Dupla", desc: "Halving a cada 2 anos + burn de 20% por transação corporativa. Nenhum competidor combina os dois mecanismos. Pressão deflacionária constante." },
              { icon: "🌐", title: "Tração Real", desc: "Contratos live, dApp em produção, clientes Maranet testando agora. Dados ao vivo na blockchain. Co-founders executando do interior do Brasil." },
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
            Hoje vale $2.6 bilhões. Entrada no GlobalMind a $3.3M de valuation representa upside assimétrico para investidores early-stage. Mesma tese — 800x mais upside.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }} className="compare-grid">
            <div className="card reveal" style={{ padding: "2rem", background: "var(--surface)" }}>
              <div style={{ fontFamily: "var(--font-mono), monospace", fontSize: "0.6rem", color: "var(--muted)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "1rem" }}>Projeção Série A</div>
              {[
                { label: "Preço Seed",   val: "$0.003", color: "var(--ink)"     },
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
                { label: "Instrumento",   val: "SAFE / Token Warrant" },
                { label: "Cliff",         val: "6 meses"              },
                { label: "Vesting",       val: "18 meses linear"      },
                { label: "Ticket mínimo", val: "$5.000"               },
                { label: "Aceita",        val: "ETH / USDC / BRL"     },
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
              { num: "01", title: "Entre em contato", desc: "Manda email ou DM no X (@GMNDProtocol). Respondemos em até 24h." },
              { num: "02", title: "Receba o pitch deck", desc: "Enviamos o pitch deck completo com tokenomics, roadmap, tração e termos do seed." },
              { num: "03", title: "Due diligence", desc: "Todo código open source no GitHub. Contratos verificáveis no Etherscan. Dados ao vivo na blockchain." },
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
          <p style={{ fontFamily: "var(--font-mono), monospace", fontSize: "0.62rem", color: "var(--muted)", lineHeight: 1.8 }}>
            ⚠️ DISCLAIMER: Investimento em projetos early-stage crypto/DePIN envolve alto risco, incluindo potencial perda total do capital investido. Este conteúdo não constitui conselho financeiro, jurídico ou de investimento. DYOR. Apenas invista o que você pode se dar ao luxo de perder. O GlobalMind Protocol está em fase de testnet — mainnet e funcionalidades completas ainda em desenvolvimento.
          </p>
        </div>
      </section>

      {/* CTA FINAL */}
      <section style={{ background: "var(--ink)", padding: "6rem 1.5rem", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", bottom: "-3rem", left: "50%", transform: "translateX(-50%)", fontFamily: "var(--font-serif), serif", fontSize: "30vw", color: "rgba(244,241,235,0.03)", pointerEvents: "none", whiteSpace: "nowrap", lineHeight: 1 }}>SEED</div>
        <p style={{ fontFamily: "var(--font-mono), monospace", fontSize: "0.65rem", color: "rgba(244,241,235,0.3)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "1rem", position: "relative" }}>
          // Mesma tese do Bittensor — 800x mais upside
        </p>
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
          <a href="https://docs.google.com/forms/d/e/1FAIpQLSe7A0bAoQ4IjRvK0JKkqXeeJcnFXS0_HhpFFrNFvOhcBrO_xQ/viewform" target="_blank" rel="noopener noreferrer"
            style={{ background: "var(--accent)", color: "white", padding: "1rem 2rem", borderRadius: "2px", fontWeight: 700, fontSize: "0.85rem", letterSpacing: "0.08em", textTransform: "uppercase", textDecoration: "none", display: "inline-block" }}>
            Quero Investir
          </a>
          <button onClick={copyEmail}
            style={{ background: "transparent", color: "rgba(244,241,235,0.6)", padding: "1rem 2rem", borderRadius: "2px", fontWeight: 700, fontSize: "0.85rem", letterSpacing: "0.08em", textTransform: "uppercase", border: "1px solid rgba(244,241,235,0.15)", cursor: "pointer", fontFamily: "var(--font-mono), monospace" }}>
            {copied ? "✅ Copiado!" : "globalmindprotocol@gmail.com"}
          </button>
        </div>
        <p style={{ fontFamily: "var(--font-mono), monospace", fontSize: "0.65rem", color: "rgba(244,241,235,0.2)", position: "relative" }}>
          Jeffeson Rocha + David Coelho — De Marabá, Pará para o mundo 🇧🇷
        </p>
      </section>

      <style>{`
        .stats-grid { grid-template-columns: repeat(4, 1fr); }
        .compare-grid { grid-template-columns: 1fr 1fr; }
        .founder-grid { grid-template-columns: auto 1fr; }
        .cards-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
        @media (max-width: 768px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .compare-grid { grid-template-columns: 1fr !important; }
          .founder-grid { grid-template-columns: 1fr !important; }
          .cards-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
