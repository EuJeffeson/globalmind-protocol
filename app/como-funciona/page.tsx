"use client";
import Link from "next/link";

export default function ComoFuncionaPage() {
  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh", paddingTop: "7rem" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "3rem 2rem 6rem" }}>

        {/* Header */}
        <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: "0.6rem", color: "var(--muted)", letterSpacing: "0.15em", textTransform: "uppercase", display: "block", marginBottom: "0.8rem" }}>
          // Como Funciona
        </span>
        <h1 style={{ fontFamily: "var(--font-serif), serif", fontSize: "clamp(2rem, 5vw, 3.5rem)", lineHeight: 1.05, letterSpacing: "-0.02em", color: "var(--ink)", marginBottom: "1rem" }}>
          Validation-in-the-Loop.<br/>
          <em style={{ fontStyle: "italic", color: "var(--accent)" }}>Do USDC ao GMND.</em>
        </h1>
        <p style={{ fontSize: "1rem", color: "var(--ink2)", lineHeight: 1.8, fontWeight: 300, maxWidth: "640px", marginBottom: "3rem" }}>
          Uma empresa deposita USDC. O protocolo distribui automaticamente para validadores, ISP parceiro, burn reserve e treasury — tudo on-chain, auditável no Etherscan, sem intermediários.
        </p>

        {/* Diagrama SVG */}
        <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "8px", padding: "2rem", marginBottom: "3rem" }}>
          <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: "0.6rem", color: "var(--muted)", letterSpacing: "0.15em", textTransform: "uppercase", display: "block", marginBottom: "1.5rem" }}>
            // Fluxo econômico por batch
          </span>
          <svg width="100%" viewBox="0 0 680 520" role="img" aria-label="Fluxo econômico do GlobalMind Protocol">
            <defs>
              <marker id="arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </marker>
            </defs>

            {/* Empresa */}
            <rect x="240" y="20" width="200" height="56" rx="8" fill="rgba(26,86,219,0.08)" stroke="rgba(26,86,219,0.3)" strokeWidth="0.5"/>
            <text x="340" y="42" textAnchor="middle" dominantBaseline="central" style={{ fontSize: "14px", fontWeight: 500, fill: "var(--ink)", fontFamily: "var(--font-sans)" }}>Empresa / AI Lab</text>
            <text x="340" y="60" textAnchor="middle" dominantBaseline="central" style={{ fontSize: "11px", fill: "var(--muted)", fontFamily: "var(--font-mono)" }}>Deposita USDC via createBatch()</text>

            {/* Seta → Contrato */}
            <line x1="340" y1="76" x2="340" y2="108" stroke="#378ADD" strokeWidth="1.5" markerEnd="url(#arr)"/>
            <text x="356" y="96" style={{ fontSize: "11px", fill: "#378ADD", fontFamily: "var(--font-mono)", fontWeight: 500 }}>USDC</text>

            {/* Contrato V4 */}
            <rect x="215" y="108" width="250" height="56" rx="8" fill="var(--surface)" stroke="var(--border)" strokeWidth="1"/>
            <text x="340" y="130" textAnchor="middle" dominantBaseline="central" style={{ fontSize: "14px", fontWeight: 500, fill: "var(--ink)", fontFamily: "var(--font-sans)" }}>Contrato V4</text>
            <text x="340" y="148" textAnchor="middle" dominantBaseline="central" style={{ fontSize: "11px", fill: "var(--muted)", fontFamily: "var(--font-mono)" }}>finalizeBatch() — distribui automaticamente</text>

            {/* Setas distribuição */}
            <path d="M255 164 L110 228" fill="none" stroke="#1D9E75" strokeWidth="1.5" markerEnd="url(#arr)"/>
            <text x="162" y="194" textAnchor="middle" style={{ fontSize: "13px", fontWeight: 700, fill: "#1D9E75", fontFamily: "var(--font-mono)" }}>65%</text>

            <path d="M315 164 L240 228" fill="none" stroke="#0F6E56" strokeWidth="1.5" markerEnd="url(#arr)"/>
            <text x="270" y="202" textAnchor="middle" style={{ fontSize: "13px", fontWeight: 700, fill: "#0F6E56", fontFamily: "var(--font-mono)" }}>5%</text>

            <path d="M365 164 L440 228" fill="none" stroke="#D85A30" strokeWidth="1.5" markerEnd="url(#arr)"/>
            <text x="410" y="198" textAnchor="middle" style={{ fontSize: "13px", fontWeight: 700, fill: "#D85A30", fontFamily: "var(--font-mono)" }}>20%</text>

            <path d="M425 164 L560 228" fill="none" stroke="#888780" strokeWidth="1.5" markerEnd="url(#arr)"/>
            <text x="506" y="194" textAnchor="middle" style={{ fontSize: "13px", fontWeight: 700, fill: "var(--muted)", fontFamily: "var(--font-mono)" }}>10%</text>

            {/* Box Validadores */}
            <rect x="30" y="228" width="160" height="68" rx="8" fill="rgba(29,158,117,0.08)" stroke="rgba(29,158,117,0.3)" strokeWidth="0.5"/>
            <text x="110" y="250" textAnchor="middle" dominantBaseline="central" style={{ fontSize: "13px", fontWeight: 500, fill: "var(--ink)", fontFamily: "var(--font-sans)" }}>Validadores</text>
            <text x="110" y="266" textAnchor="middle" dominantBaseline="central" style={{ fontSize: "10px", fill: "var(--muted)", fontFamily: "var(--font-mono)" }}>USDC direto na wallet</text>
            <text x="110" y="281" textAnchor="middle" dominantBaseline="central" style={{ fontSize: "10px", fill: "#1D9E75", fontFamily: "var(--font-mono)" }}>+ créditos GMND</text>

            {/* Box ISP */}
            <rect x="160" y="228" width="130" height="68" rx="8" fill="rgba(15,110,86,0.07)" stroke="rgba(15,110,86,0.25)" strokeWidth="0.5"/>
            <text x="225" y="250" textAnchor="middle" dominantBaseline="central" style={{ fontSize: "13px", fontWeight: 500, fill: "var(--ink)", fontFamily: "var(--font-sans)" }}>ISP Parceiro</text>
            <text x="225" y="266" textAnchor="middle" dominantBaseline="central" style={{ fontSize: "10px", fill: "var(--muted)", fontFamily: "var(--font-mono)" }}>USDC automático</text>
            <text x="225" y="281" textAnchor="middle" dominantBaseline="central" style={{ fontSize: "10px", fill: "var(--muted)", fontFamily: "var(--font-mono)" }}>ex: Maranet 901 451</text>

            {/* Box Burn Reserve */}
            <rect x="360" y="228" width="160" height="68" rx="8" fill="rgba(216,90,48,0.08)" stroke="rgba(216,90,48,0.3)" strokeWidth="0.5"/>
            <text x="440" y="250" textAnchor="middle" dominantBaseline="central" style={{ fontSize: "13px", fontWeight: 500, fill: "var(--ink)", fontFamily: "var(--font-sans)" }}>Burn Reserve</text>
            <text x="440" y="266" textAnchor="middle" dominantBaseline="central" style={{ fontSize: "10px", fill: "var(--muted)", fontFamily: "var(--font-mono)" }}>USDC acumulado</text>
            <text x="440" y="281" textAnchor="middle" dominantBaseline="central" style={{ fontSize: "10px", fill: "#D85A30", fontFamily: "var(--font-mono)" }}>burn DEX na V5</text>

            {/* Box Treasury */}
            <rect x="490" y="228" width="160" height="68" rx="8" fill="var(--surface)" stroke="var(--border)" strokeWidth="0.5"/>
            <text x="570" y="250" textAnchor="middle" dominantBaseline="central" style={{ fontSize: "13px", fontWeight: 500, fill: "var(--ink)", fontFamily: "var(--font-sans)" }}>Treasury</text>
            <text x="570" y="266" textAnchor="middle" dominantBaseline="central" style={{ fontSize: "10px", fill: "var(--muted)", fontFamily: "var(--font-mono)" }}>USDC operacional</text>
            <text x="570" y="281" textAnchor="middle" dominantBaseline="central" style={{ fontSize: "10px", fill: "var(--muted)", fontFamily: "var(--font-mono)" }}>infraestrutura</text>

            {/* Validadores → Créditos GMND */}
            <line x1="110" y1="296" x2="110" y2="356" stroke="#1D9E75" strokeWidth="1.5" markerEnd="url(#arr)"/>

            {/* Box Créditos GMND */}
            <rect x="30" y="356" width="160" height="56" rx="8" fill="rgba(99,153,34,0.08)" stroke="rgba(99,153,34,0.3)" strokeWidth="0.5"/>
            <text x="110" y="376" textAnchor="middle" dominantBaseline="central" style={{ fontSize: "13px", fontWeight: 500, fill: "var(--ink)", fontFamily: "var(--font-sans)" }}>Créditos GMND</text>
            <text x="110" y="394" textAnchor="middle" dominantBaseline="central" style={{ fontSize: "10px", fill: "var(--muted)", fontFamily: "var(--font-mono)" }}>score PoEC on-chain</text>

            {/* Créditos → TGE */}
            <path d="M190 384 L290 420" fill="none" stroke="#639922" strokeWidth="1.5" markerEnd="url(#arr)"/>
            <text x="234" y="400" textAnchor="middle" style={{ fontSize: "12px", fontWeight: 700, fill: "#639922", fontFamily: "var(--font-mono)" }}>1:1</text>

            {/* Box TGE */}
            <rect x="290" y="406" width="200" height="56" rx="8" fill="rgba(186,117,23,0.08)" stroke="rgba(186,117,23,0.35)" strokeWidth="0.5"/>
            <text x="390" y="426" textAnchor="middle" dominantBaseline="central" style={{ fontSize: "13px", fontWeight: 500, fill: "var(--ink)", fontFamily: "var(--font-sans)" }}>TGE — Token Generation</text>
            <text x="390" y="444" textAnchor="middle" dominantBaseline="central" style={{ fontSize: "10px", fill: "var(--muted)", fontFamily: "var(--font-mono)" }}>créditos convertem em GMND real 1:1</text>

            {/* Legenda */}
            <line x1="510" y1="464" x2="540" y2="464" stroke="#D85A30" strokeWidth="1.5" strokeDasharray="4 3"/>
            <text x="546" y="468" style={{ fontSize: "10px", fill: "var(--muted)", fontFamily: "var(--font-mono)" }}>futuro (V5)</text>
            <line x1="510" y1="482" x2="540" y2="482" stroke="var(--muted)" strokeWidth="1.5"/>
            <text x="546" y="486" style={{ fontSize: "10px", fill: "var(--muted)", fontFamily: "var(--font-mono)" }}>ativo agora</text>
          </svg>
        </div>

        {/* Explicação passo a passo */}
        <div style={{ display: "flex", flexDirection: "column", gap: "2rem", marginBottom: "4rem" }}>
          {[
            {
              num: "01",
              title: "Empresa cria um batch",
              desc: "A empresa chama createBatch() depositando USDC diretamente no contrato. Zero fricção — sem comprar token volátil, sem KYC de token nativo. Só USDC e um approve() no MetaMask.",
              detail: "Cada batch contém N tarefas de validação: classificação de texto, avaliação de LLM, verificação de fatos, rotulagem de imagem.",
              color: "rgba(26,86,219,0.08)",
              border: "rgba(26,86,219,0.2)",
            },
            {
              num: "02",
              title: "ISP distribui o código para seus clientes",
              desc: "O ISP parceiro recebeu um código numérico de 6 dígitos gerado automaticamente on-chain. Ele distribui esse código para seus clientes via WhatsApp ou SMS.",
              detail: "Exemplo: Maranet Telecom → código 901 451 → 1.000+ clientes em Marabá, PA.",
              color: "rgba(29,158,117,0.06)",
              border: "rgba(29,158,117,0.2)",
            },
            {
              num: "03",
              title: "Validador entra na rede com o código",
              desc: "O cliente digita o código no dApp e chama registerValidator(901451) on-chain. Sua wallet fica vinculada ao ISP permanentemente — rastreável e auditável.",
              detail: "Sem código ISP válido = sem acesso à rede. Anti-Sybil by design.",
              color: "rgba(29,158,117,0.06)",
              border: "rgba(29,158,117,0.2)",
            },
            {
              num: "04",
              title: "Validadores respondem as tarefas",
              desc: "Validadores veem as tarefas do batch e respondem. O segredo: todas as respostas são enviadas em 1 única transação via batchValidate() — não uma TX por tarefa.",
              detail: "Blind Consensus: validadores não veem as respostas dos outros. Isso elimina viés de conformidade.",
              color: "rgba(99,153,34,0.06)",
              border: "rgba(99,153,34,0.2)",
            },
            {
              num: "05",
              title: "finalizeBatch() distribui tudo automaticamente",
              desc: "Quando o prazo encerra ou todos responderam, finalizeBatch() calcula o consenso e distribui automaticamente: 65% USDC para validadores vencedores + 5% USDC para o ISP + 20% burn reserve + 10% treasury.",
              detail: "Tudo on-chain. Verificável no Etherscan. Sem intermediário. Sem manual.",
              color: "rgba(216,90,48,0.06)",
              border: "rgba(216,90,48,0.2)",
            },
            {
              num: "06",
              title: "Créditos GMND acumulam — TGE converte 1:1",
              desc: "Cada validação correta gera créditos GMND proporcionais ao score PoEC do validador. No TGE, esses créditos convertem automaticamente em tokens GMND reais — 1 crédito = 1 GMND.",
              detail: "Validadores que entraram cedo (agora, na Sepolia) acumulam mais créditos antes do TGE.",
              color: "rgba(186,117,23,0.06)",
              border: "rgba(186,117,23,0.2)",
            },
          ].map((step) => (
            <div key={step.num} style={{ background: step.color, border: `1px solid ${step.border}`, borderRadius: "8px", padding: "1.8rem", position: "relative" }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "1.2rem" }}>
                <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: "0.65rem", color: "var(--muted)", letterSpacing: "0.1em", flexShrink: 0, paddingTop: "0.2rem" }}>{step.num}</span>
                <div>
                  <h3 style={{ fontFamily: "var(--font-serif), serif", fontSize: "1.2rem", color: "var(--ink)", marginBottom: "0.5rem", letterSpacing: "-0.01em" }}>{step.title}</h3>
                  <p style={{ fontSize: "0.9rem", color: "var(--ink2)", lineHeight: 1.7, marginBottom: "0.6rem" }}>{step.desc}</p>
                  <p style={{ fontFamily: "var(--font-mono), monospace", fontSize: "0.75rem", color: "var(--muted)", lineHeight: 1.6 }}>{step.detail}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Score PoEC */}
        <div style={{ marginBottom: "4rem" }}>
          <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: "0.6rem", color: "var(--muted)", letterSpacing: "0.15em", textTransform: "uppercase", display: "block", marginBottom: "0.8rem" }}>// Score PoEC</span>
          <h2 style={{ fontFamily: "var(--font-serif), serif", fontSize: "2rem", color: "var(--ink)", marginBottom: "1rem", letterSpacing: "-0.02em" }}>
            Proof of Expertise & Connectivity
          </h2>
          <p style={{ fontSize: "0.95rem", color: "var(--ink2)", lineHeight: 1.8, marginBottom: "2rem" }}>
            Validadores não são iguais. O score PoEC diferencia quem valida com qualidade — e amplifica as recompensas proporcionalmente.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem" }}>
            {[
              { val: "≥90%", mult: "1.5×", rank: "Elite", color: "var(--accent3)" },
              { val: "≥70%", mult: "1.2×", rank: "Avançado", color: "var(--accent2)" },
              { val: "≥50%", mult: "1.0×", rank: "Regular", color: "var(--muted)" },
            ].map(s => (
              <div key={s.rank} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "8px", padding: "1.5rem", textAlign: "center" }}>
                <div style={{ fontFamily: "var(--font-serif), serif", fontSize: "2rem", color: s.color, lineHeight: 1, marginBottom: "0.3rem" }}>{s.val}</div>
                <div style={{ fontFamily: "var(--font-mono), monospace", fontSize: "0.7rem", color: "var(--muted)", marginBottom: "0.5rem" }}>acurácia</div>
                <div style={{ fontFamily: "var(--font-serif), serif", fontSize: "1.4rem", color: "var(--ink)", marginBottom: "0.2rem" }}>{s.mult}</div>
                <div style={{ fontFamily: "var(--font-mono), monospace", fontSize: "0.65rem", color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.08em" }}>{s.rank}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CTAs */}
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", paddingTop: "2rem", borderTop: "1px solid var(--border)" }}>
          <Link href="/validador" className="btn-fill">Entrar como validador →</Link>
          <Link href="/empresa" className="btn-ghost">Postar tarefas como empresa →</Link>
          <Link href="/seed" className="btn-ghost">Ver o Seed Round →</Link>
        </div>

      </div>
    </div>
  );
}
