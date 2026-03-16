"use client";
import { useEffect } from "react";
import Link from "next/link";

const HALVING = [
  { era: "Era 0 — Ano 1-2", emission: "100.000 GMND/dia", active: true },
  { era: "Era 1 — Ano 3-4", emission: "50.000 GMND/dia",  active: false },
  { era: "Era 2 — Ano 5-6", emission: "25.000 GMND/dia",  active: false },
  { era: "Era 3 — Ano 7-8", emission: "12.500 GMND/dia",  active: false },
];

export default function Home() {
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
    const bgTxt = document.querySelector(".hero-bg-text") as HTMLElement;
    const onScroll = () => { if (bgTxt) bgTxt.style.transform = `translateY(${window.scrollY * 0.3}px)`; };
    window.addEventListener("scroll", onScroll);
    return () => { observer.disconnect(); window.removeEventListener("scroll", onScroll); };
  }, []);

  return (
    <div style={{ background: "var(--bg)" }}>

      {/* HERO */}
      <section className="hero-section">
        <div className="hero-bg-text" style={{
          position: "absolute", bottom: "-2rem", right: "-1rem",
          fontFamily: "var(--font-serif), serif", fontSize: "22vw",
          color: "rgba(15,14,12,0.03)", lineHeight: 1,
          whiteSpace: "nowrap", pointerEvents: "none", userSelect: "none",
          letterSpacing: "-0.05em",
        }}>GMND</div>

        {/* Left */}
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.8rem", marginBottom: "2rem", flexWrap: "wrap" }}>
            <span style={{
              background: "var(--ink)", color: "var(--bg)",
              fontFamily: "var(--font-mono), monospace", fontSize: "0.65rem",
              padding: "0.35rem 0.8rem", borderRadius: "2px",
              letterSpacing: "0.12em", textTransform: "uppercase",
            }}>Protocolo v2.0</span>
            <span style={{
              fontFamily: "var(--font-mono), monospace", fontSize: "0.65rem",
              color: "var(--muted)", letterSpacing: "0.1em",
            }}>// Infraestrutura Descentralizada de IA</span>
          </div>

          <h1 style={{
            fontFamily: "var(--font-serif), serif",
            fontSize: "clamp(2.4rem, 5.5vw, 5.5rem)",
            lineHeight: 1.05, letterSpacing: "-0.02em",
            color: "var(--ink)", marginBottom: "1.5rem",
          }}>
            A primeira{" "}
            <em style={{ fontStyle: "italic", color: "var(--accent)" }}>rede neural</em>{" "}
            movida por hardware cotidiano
          </h1>

          <p style={{
            fontSize: "1rem", color: "var(--ink2)",
            lineHeight: 1.8, fontWeight: 300,
            marginBottom: "0.8rem",
          }}>
            GlobalMind transforma qualquer dispositivo conectado em um neurônio de validação global. Sem data centers. Sem monopólios. A inteligência pertence a quem a alimenta.
          </p>

          <p style={{
            fontSize: "0.82rem", color: "var(--muted)",
            lineHeight: 1.6, marginBottom: "2.5rem",
          }}>
            Parceiro ISP:{" "}
            <span style={{ color: "var(--ink)", fontWeight: 600 }}>Maranet Telecom</span>
            {" "}— mais de mil clientes ativos em Marabá, Pará 🇧🇷
          </p>

          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <Link href="/empresa" className="btn-fill">Postar Tarefas</Link>
            <Link href="/tarefas" className="btn-ghost">Começar a Validar</Link>
          </div>

          <div className="hero-stats">
            {[
              { val: "∞",    label: "Escalabilidade" },
              { val: "$0",   label: "CAPEX Próprio"  },
              { val: "PoEC", label: "Consenso Cego"  },
              { val: "1B",   label: "Supply GMND"    },
            ].map(m => (
              <div key={m.label} style={{ flex: "1 1 auto", minWidth: "70px" }}>
                <span style={{
                  fontFamily: "var(--font-serif), serif",
                  fontSize: "clamp(1.6rem, 4vw, 2.4rem)", color: "var(--accent)",
                  lineHeight: 1, display: "block", marginBottom: "0.3rem",
                }}>{m.val}</span>
                <div style={{
                  fontFamily: "var(--font-mono), monospace",
                  fontSize: "0.6rem", color: "var(--muted)",
                  textTransform: "uppercase", letterSpacing: "0.1em",
                }}>{m.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — device grid */}
        <div className="hero-cards" style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div style={{
              gridColumn: "span 2",
              background: "var(--ink)", borderRadius: "6px", padding: "1.8rem 1.5rem",
            }}>
              <span style={{ fontSize: "1.8rem", display: "block", marginBottom: "0.8rem" }}>📱</span>
              <div style={{ fontFamily: "var(--font-mono), monospace", fontSize: "0.65rem", color: "rgba(244,241,235,0.4)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.3rem" }}>One-Click Install</div>
              <div style={{ fontSize: "1rem", fontWeight: 700, color: "var(--bg)" }}>App Mobile — Android & iOS</div>
              <div style={{ fontSize: "0.8rem", color: "rgba(244,241,235,0.55)", marginTop: "0.4rem", lineHeight: 1.5 }}>Usuário leigo instala, toca em "Iniciar" e começa a ganhar $GMND em segundo plano.</div>
            </div>
            {[
              { icon: "💻", label: "Desktop",    name: "Windows / macOS", desc: "Usa apenas capacidade ociosa da CPU/GPU." },
              { icon: "📡", label: "Infra / ISP", name: "Roteador + OpenWrt", desc: "Firmware Rust para uptime 24/7." },
              { icon: "⚙️", label: "Server",     name: "Docker Container", desc: "Deploy em segundos para usuários tech." },
              { icon: "🔗", label: "Smart Contract", name: "Recompensas GMND", desc: "Pagamentos automáticos on-chain." },
            ].map(d => (
              <div key={d.name} className="card" style={{ padding: "1.5rem" }}>
                <span style={{ fontSize: "1.6rem", display: "block", marginBottom: "0.8rem" }}>{d.icon}</span>
                <div style={{ fontFamily: "var(--font-mono), monospace", fontSize: "0.6rem", color: "var(--muted)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.3rem" }}>{d.label}</div>
                <div style={{ fontSize: "0.9rem", fontWeight: 700 }}>{d.name}</div>
                <div style={{ fontSize: "0.78rem", color: "var(--muted)", marginTop: "0.3rem", lineHeight: 1.5 }}>{d.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ padding: "5rem 1.5rem", background: "var(--surface)", borderTop: "1px solid var(--border)" }}>
        <div style={{ marginBottom: "3rem" }}>
          <span className="section-num">// 01 — Como Funciona</span>
          <h2 className="section-title">Três participantes. <em>Um protocolo.</em></h2>
        </div>
        <div className="cards-grid">
          {[
            { badge: "Para Usuários", badgeColor: "var(--accent3)", icon: "👤", title: "Instale e Ganhe", desc: "Instale o app, conecte sua carteira e deixe seu dispositivo validar tarefas de IA enquanto você dorme. Cada resposta correta gera $GMND automaticamente.", tags: ["Mobile", "Desktop", "Roteador"] },
            { badge: "Para Provedores", badgeColor: "var(--accent2)", icon: "🌐", title: "Monetize sua Infraestrutura", desc: "ISPs e provedores de conectividade transformam capacidade ociosa de rede em receita tokenizada. Primeiro parceiro: Maranet Telecom, Marabá-PA.", tags: ["ISP", "Fibra", "DePIN"] },
            { badge: "Para Empresas", badgeColor: "var(--accent)", icon: "🏢", title: "Validação Auditável", desc: "Acesse uma rede global de validadores humanos on-chain. Pague por resultado, audite cada etapa. Substitua contratos opacos de anotação por transparência total.", tags: ["AI Training", "LLM", "Auditável"] },
          ].map(c => (
            <div key={c.title} className="card reveal" style={{ padding: "2rem 1.5rem" }}>
              <span style={{
                display: "inline-block",
                fontFamily: "var(--font-mono), monospace", fontSize: "0.6rem",
                letterSpacing: "0.12em", textTransform: "uppercase",
                padding: "0.25rem 0.7rem", borderRadius: "2px", marginBottom: "1.5rem",
                border: `1px solid ${c.badgeColor}`, color: c.badgeColor,
                background: `${c.badgeColor}0f`,
              }}>{c.badge}</span>
              <span style={{ fontSize: "2.5rem", display: "block", marginBottom: "1.2rem" }}>{c.icon}</span>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 800, marginBottom: "0.8rem" }}>{c.title}</h3>
              <p style={{ fontSize: "0.87rem", color: "var(--muted)", lineHeight: 1.7 }}>{c.desc}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginTop: "1.5rem" }}>
                {c.tags.map(t => (
                  <span key={t} style={{
                    fontFamily: "var(--font-mono), monospace", fontSize: "0.63rem",
                    background: "var(--bg2)", padding: "0.2rem 0.6rem",
                    borderRadius: "2px", color: "var(--ink2)", letterSpacing: "0.05em",
                  }}>{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TOKENOMICS + HALVING */}
      <section style={{ padding: "5rem 1.5rem", background: "var(--bg)" }}>
        <div style={{ marginBottom: "3rem" }}>
          <span className="section-num">// 02 — Tokenomics</span>
          <h2 className="section-title">$GMND: Deflação <em>Dupla</em></h2>
          <p style={{ color: "var(--ink2)", fontSize: "1rem", lineHeight: 1.8, fontWeight: 300, marginTop: "1rem" }}>
            Halving a cada 2 anos (inspirado no Bitcoin) + Burn automático de 20% por transação corporativa.
            Nenhum competidor combina os dois mecanismos simultaneamente.
          </p>
        </div>
        <div className="tokenomics-grid">
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {[
              { icon: "🏢", title: "Empresas de IA compram acesso", desc: "Clientes corporativos pagam Créditos de Validação em $GMND para acessar a rede de validadores humanos." },
              { icon: "🔥", title: "Burn — Oferta Diminui", desc: "20% dos tokens pagos são permanentemente destruídos. Oferta circulante cai com o crescimento da demanda." },
              { icon: "👥", title: "Distribuição aos Nós", desc: "70% é distribuído proporcionalmente aos nós com base no score PoEC. Quanto melhor a contribuição, maior a fatia." },
              { icon: "📈", title: "Efeito de Rede Composto", desc: "Mais usuários → mais confiável → mais clientes → mais burn → maior valor. Ciclo virtuoso autossustentado." },
            ].map((n, i) => (
              <div key={n.title} className="reveal" style={{ display: "flex", alignItems: "stretch", gap: "1rem", position: "relative" }}>
                {i < 3 && <div style={{ position: "absolute", left: "23px", top: "52px", width: "1px", bottom: "-24px", background: "var(--border)" }} />}
                <div style={{
                  width: "48px", height: "48px", borderRadius: "50%", flexShrink: 0,
                  background: "var(--surface)", border: "1px solid var(--border)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "1.1rem", position: "relative", zIndex: 1, alignSelf: "flex-start",
                }}>{n.icon}</div>
                <div style={{
                  background: "var(--surface)", border: "1px solid var(--border)",
                  borderRadius: "6px", padding: "1.2rem 1.4rem", flex: 1, marginBottom: "1.5rem",
                }}>
                  <h4 style={{ fontSize: "0.9rem", fontWeight: 800, marginBottom: "0.4rem" }}>{n.title}</h4>
                  <p style={{ fontSize: "0.83rem", color: "var(--muted)", lineHeight: 1.6 }}>{n.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            {[
              { val: "1B",    color: "var(--accent)",  key: "Supply Total GMND" },
              { val: "0,003", color: "var(--accent2)", key: "Preço Seed (USD)" },
              { val: "20%",   color: "var(--accent)",  key: "Burn por Transação" },
              { val: "70%",   color: "var(--accent3)", key: "Para Validadores" },
            ].map(s => (
              <div key={s.key} className="card reveal" style={{ padding: "1.5rem" }}>
                <span style={{ fontFamily: "var(--font-serif), serif", fontSize: "2rem", color: s.color, lineHeight: 1, display: "block" }}>{s.val}</span>
                <div style={{ fontFamily: "var(--font-mono), monospace", fontSize: "0.6rem", color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.1em", marginTop: "0.5rem" }}>{s.key}</div>
              </div>
            ))}
            <div style={{ gridColumn: "span 2", background: "var(--ink)", borderRadius: "6px", padding: "1.5rem", display: "flex", alignItems: "center", gap: "1rem" }} className="reveal">
              <span style={{ fontSize: "2rem" }}>🔥</span>
              <div>
                <h4 style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--bg)", marginBottom: "0.3rem" }}>Queima Automática On-Chain</h4>
                <p style={{ fontSize: "0.82rem", color: "rgba(244,241,235,0.5)", lineHeight: 1.5 }}>Cada batch finalizado queima 20% via smart contract. Imutável e auditável.</p>
              </div>
            </div>
          </div>
        </div>

        {/* HALVING TABLE */}
        <div style={{ marginTop: "4rem" }}>
          <span className="section-num">// 02.1 — Halving Schedule</span>
          <h3 style={{ fontFamily: "var(--font-serif), serif", fontSize: "1.8rem", color: "var(--ink)", margin: "1rem 0 0.5rem" }}>
            Calendário de <em>Emissão</em>
          </h3>
          <p style={{ color: "var(--ink2)", fontSize: "0.9rem", lineHeight: 1.8, fontWeight: 300, marginBottom: "2rem" }}>
            Inspirado no Bitcoin — a cada 2 anos a emissão de novos $GMND cai pela metade.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1rem" }} className="halving-grid">
            {HALVING.map(({ era, emission, active }) => (
              <div key={era} className="card reveal" style={{
                padding: "1.5rem",
                border: active ? "1px solid var(--accent)" : "1px solid var(--border)",
                background: active ? "rgba(200,82,42,0.05)" : "var(--surface)",
              }}>
                {active && (
                  <span style={{
                    fontFamily: "var(--font-mono), monospace", fontSize: "0.55rem",
                    color: "var(--accent)", letterSpacing: "0.1em", textTransform: "uppercase",
                    background: "rgba(200,82,42,0.1)", padding: "0.2rem 0.5rem",
                    borderRadius: "2px", display: "inline-block", marginBottom: "0.8rem",
                  }}>ATUAL</span>
                )}
                <div style={{ fontFamily: "var(--font-serif), serif", fontSize: "1.6rem", color: active ? "var(--accent)" : "var(--ink)", lineHeight: 1, marginBottom: "0.5rem" }}>
                  {emission.split(" ")[0]}
                </div>
                <div style={{ fontFamily: "var(--font-mono), monospace", fontSize: "0.6rem", color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.8rem" }}>
                  GMND/dia
                </div>
                <div style={{ fontSize: "0.78rem", color: "var(--ink2)" }}>{era}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MARANET PARTNER */}
      <section style={{ padding: "4rem 1.5rem", background: "var(--surface)", borderTop: "1px solid var(--border)" }}>
        <div style={{ marginBottom: "2rem" }}>
          <span className="section-num">// 03 — Primeiro Parceiro ISP</span>
          <h2 className="section-title">Maranet Telecom — <em>DePIN Real</em></h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", alignItems: "center" }} className="maranet-grid">
          <div className="reveal">
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
              <span style={{ fontSize: "2.5rem" }}>📡</span>
              <div>
                <h3 style={{ fontSize: "1.2rem", fontWeight: 800 }}>Maranet Telecom</h3>
                <p style={{ fontFamily: "var(--font-mono), monospace", fontSize: "0.65rem", color: "var(--muted)", letterSpacing: "0.08em" }}>MARABÁ, PARÁ — NORTE DO BRASIL 🇧🇷</p>
              </div>
            </div>
            <p style={{ fontSize: "0.9rem", color: "var(--ink2)", lineHeight: 1.8, marginBottom: "1.5rem" }}>
              Mais de mil clientes ativos se tornam nodes potenciais da rede GlobalMind.
              Primeiro DePIN de validação de IA do Norte do Brasil — provando que
              qualquer ISP do mundo pode replicar o modelo.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {["DePIN", "ISP Node", "Marabá-PA", "1.000+ Clientes", "Norte do Brasil"].map(tag => (
                <span key={tag} style={{
                  fontFamily: "var(--font-mono), monospace", fontSize: "0.63rem",
                  background: "rgba(26,58,143,0.08)", padding: "0.2rem 0.6rem",
                  borderRadius: "2px", color: "var(--accent2)", letterSpacing: "0.05em",
                  border: "1px solid rgba(26,58,143,0.15)",
                }}>{tag}</span>
              ))}
            </div>
          </div>
          <div className="card reveal" style={{ padding: "2rem" }}>
            <h4 style={{ fontFamily: "var(--font-mono), monospace", fontSize: "0.65rem", color: "var(--muted)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "1.5rem" }}>
              Como funciona
            </h4>
            {[
              "Cliente instala o app GlobalMind",
              "Dispositivo valida dados de IA em background",
              "Ganha $GMND automaticamente via smart contract",
              "Maranet se diferencia da concorrência",
            ].map((step, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.8rem", marginBottom: "1rem" }}>
                <span style={{
                  width: "24px", height: "24px", borderRadius: "50%",
                  background: "var(--accent)", color: "white",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "0.7rem", fontWeight: 700, flexShrink: 0,
                  fontFamily: "var(--font-mono), monospace",
                }}>{i + 1}</span>
                <span style={{ fontSize: "0.85rem", color: "var(--ink2)", lineHeight: 1.6 }}>{step}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRACTION */}
      <section style={{ padding: "4rem 1.5rem", background: "var(--bg)", borderTop: "1px solid var(--border)" }}>
        <div style={{ marginBottom: "2rem" }}>
          <span className="section-num">// 04 — Tração</span>
          <h2 className="section-title">Construído em <em>3 semanas.</em></h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.8rem" }} className="traction-grid">
          {[
            "✅ Smart Contracts V2 live na Sepolia",
            "✅ Token ERC-20 $GMND deployado",
            "✅ dApp em produção",
            "✅ App de validação Maranet",
            "✅ Contrato V3 + Halving desenvolvido",
            "✅ Open source no GitHub",
            "✅ Product Hunt lançado",
            "✅ DevHunt listado",
            "✅ Giveth — primeira doação recebida",
          ].map((item, i) => (
            <div key={i} className="card reveal" style={{ padding: "1rem 1.2rem", fontSize: "0.82rem", color: "var(--ink2)" }}>
              {item}
            </div>
          ))}
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
        }}>GMND</div>
        <h2 style={{
          fontFamily: "var(--font-serif), serif", fontStyle: "italic",
          fontSize: "clamp(2rem, 6vw, 6rem)", color: "var(--bg)",
          lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: "1.5rem",
          position: "relative",
        }}>
          A inteligência pertence<br/>a{" "}
          <em style={{ fontStyle: "normal", color: "var(--accent)" }}>todos</em>
        </h2>
        <p style={{ color: "rgba(244,241,235,0.45)", fontSize: "1rem", maxWidth: "520px", margin: "0 auto 0.8rem", lineHeight: 1.7, position: "relative" }}>
          Seja um dos primeiros a apoiar a infraestrutura descentralizada que vai remodelar o futuro global da IA.
        </p>
        <p style={{ color: "rgba(244,241,235,0.25)", fontSize: "0.82rem", marginBottom: "2.5rem", position: "relative", fontFamily: "var(--font-mono), monospace", letterSpacing: "0.05em" }}>
          Seed Round Aberto · $500K · 150M GMND · $0.003/token · Valuation $3.3M
        </p>
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap", position: "relative" }}>
          <Link href="/empresa" style={{
            background: "var(--accent)", color: "white",
            padding: "1rem 2rem", borderRadius: "2px",
            fontWeight: 700, fontSize: "0.85rem",
            letterSpacing: "0.08em", textTransform: "uppercase",
            textDecoration: "none", display: "inline-block",
          }}>Entrar no Protocolo</Link>
          <Link href="/dashboard" style={{
            background: "transparent", color: "rgba(244,241,235,0.6)",
            padding: "1rem 2rem", borderRadius: "2px",
            fontWeight: 700, fontSize: "0.85rem",
            letterSpacing: "0.08em", textTransform: "uppercase",
            textDecoration: "none", border: "1px solid rgba(244,241,235,0.15)",
            display: "inline-block",
          }}>Ver Dashboard</Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{
        background: "var(--ink2)", padding: "2rem 1.5rem",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        flexWrap: "wrap", gap: "1rem",
        borderTop: "1px solid rgba(244,241,235,0.06)",
      }}>
        <span style={{ fontFamily: "var(--font-serif), serif", fontSize: "1.2rem", color: "rgba(244,241,235,0.7)" }}>
          GlobalMind<sup style={{ fontFamily: "var(--font-mono), monospace", fontSize: "0.5rem", color: "var(--accent)", verticalAlign: "super" }}>GMND</sup>
        </span>
        <p style={{ fontFamily: "var(--font-mono), monospace", fontSize: "0.6rem", color: "rgba(244,241,235,0.3)", letterSpacing: "0.08em" }}>
          © 2026 GlobalMind Protocol · $GMND · Proof of Expertise & Connectivity
        </p>
        <p style={{ fontFamily: "var(--font-mono), monospace", fontSize: "0.6rem", color: "rgba(244,241,235,0.2)" }}>
          Rede Sepolia Testnet · Smart Contract Auditável
        </p>
      </footer>

      <style>{`
        .hero-section {
          min-height: 100vh;
          padding: 8rem 1.5rem 4rem;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
          position: relative;
          overflow: hidden;
        }
        .hero-stats {
          display: flex;
          gap: 1.5rem;
          margin-top: 2.5rem;
          padding-top: 2rem;
          border-top: 1px solid var(--border);
          flex-wrap: wrap;
        }
        .hero-cards { display: block; }
        .cards-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }
        .tokenomics-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: start;
        }
        .halving-grid {
          grid-template-columns: repeat(4, 1fr) !important;
        }
        .maranet-grid {
          grid-template-columns: 1fr 1fr !important;
        }
        .traction-grid {
          grid-template-columns: repeat(3, 1fr) !important;
        }
        @media (max-width: 900px) {
          .hero-section {
            grid-template-columns: 1fr;
            padding: 7rem 1.5rem 3rem;
            gap: 2rem;
          }
          .hero-cards { display: none; }
          .cards-grid { grid-template-columns: 1fr; }
          .tokenomics-grid { grid-template-columns: 1fr; gap: 2rem; }
          .halving-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .maranet-grid { grid-template-columns: 1fr !important; }
          .traction-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 480px) {
          .hero-section { padding: 6rem 1rem 2.5rem; }
          .hero-stats { gap: 1rem; }
          .halving-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .traction-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
