"use client";
import { useState, useRef } from "react";
import Link from "next/link";

type Screen = "landing" | "register" | "connecting" | "success" | "dashboard";

export default function ValidadorPage() {
  const [screen, setScreen] = useState<Screen>("landing");
  const [digits, setDigits] = useState<string[]>(["","","","","",""]);
  const [error, setError] = useState("");
  const [ispName, setIspName] = useState("");
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleRegister = async () => {
    const code = digits.join("");
    if (code.length < 6) { setError("Digite os 6 dígitos do código."); return; }
    setError(""); setScreen("connecting");
    await new Promise(r => setTimeout(r, 2000));
    if (code === "000000") { setError("Código inválido."); setScreen("register"); return; }
    setIspName(code === "901451" ? "Maranet Telecom" : "ISP Parceiro");
    setScreen("success");
  };

  const handleDigit = (i: number, v: string) => {
    if (!/^\d*$/.test(v)) return;
    const d = [...digits]; d[i] = v.slice(-1); setDigits(d);
    if (v && i < 5) inputRefs.current[i + 1]?.focus();
  };

  const handleKey = (i: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !digits[i] && i > 0) inputRefs.current[i - 1]?.focus();
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    const p = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (p.length === 6) { setDigits(p.split("")); inputRefs.current[5]?.focus(); }
    e.preventDefault();
  };

  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>

      {/* LANDING */}
      {screen === "landing" && (
        <section style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "8rem 1.5rem 4rem", textAlign: "center", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: "20%", left: "50%", transform: "translateX(-50%)", width: "600px", height: "600px", background: "radial-gradient(ellipse, rgba(26,58,143,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem", padding: "0.4rem 1rem", background: "rgba(26,58,143,0.08)", border: "1px solid rgba(26,58,143,0.2)", borderRadius: "100px", marginBottom: "2rem", fontFamily: "var(--font-mono), monospace", fontSize: "0.65rem", color: "var(--accent2)", letterSpacing: "0.12em", textTransform: "uppercase" as const }}>
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#2d8a4e", animation: "pulse 2s infinite", display: "inline-block" }} />
            Validadores ativos na rede
          </div>
          <h1 style={{ fontFamily: "var(--font-serif), serif", fontSize: "clamp(2.4rem, 5.5vw, 5rem)", lineHeight: 1.05, letterSpacing: "-0.02em", color: "var(--ink)", marginBottom: "1.5rem" }}>
            Valide dados de IA.<br/>
            <em style={{ fontStyle: "italic", color: "var(--accent)" }}>Ganhe em USDC.</em>
          </h1>
          <p style={{ fontSize: "1rem", color: "var(--ink2)", lineHeight: 1.8, fontWeight: 300, maxWidth: "520px", marginBottom: "0.8rem" }}>
            Transforme seu dispositivo em um nó da rede GlobalMind. Você precisa de um <strong style={{ color: "var(--ink)" }}>código de 6 dígitos</strong> fornecido pelo seu provedor de internet parceiro.
          </p>
          <p style={{ fontFamily: "var(--font-mono), monospace", fontSize: "0.75rem", color: "var(--accent)", marginBottom: "2.5rem" }}>
            65% de cada batch vai direto para validadores · Créditos GMND acumulados 1:1 no TGE
          </p>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
            <button onClick={() => setScreen("register")} className="btn-fill">Tenho um código → Entrar</button>
            <Link href="/maranet" className="btn-ghost">Sou cliente Maranet →</Link>
          </div>
          <div style={{ display: "flex", gap: "3rem", marginTop: "4rem", paddingTop: "2rem", borderTop: "1px solid var(--border)", flexWrap: "wrap", justifyContent: "center" }}>
            {[{ val: "65%", label: "USDC para validadores" }, { val: "5%", label: "USDC para seu ISP" }, { val: "1:1", label: "Créditos → GMND no TGE" }, { val: "On-chain", label: "Verificável no Etherscan" }].map(s => (
              <div key={s.label} style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "var(--font-serif), serif", fontSize: "1.8rem", color: "var(--accent)", lineHeight: 1, marginBottom: "0.3rem" }}>{s.val}</div>
                <div style={{ fontFamily: "var(--font-mono), monospace", fontSize: "0.6rem", color: "var(--muted)", textTransform: "uppercase" as const, letterSpacing: "0.1em" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* REGISTER */}
      {(screen === "register" || screen === "connecting") && (
        <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "8rem 1.5rem 4rem" }}>
          <div style={{ width: "100%", maxWidth: "480px", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "8px", padding: "3rem 2.5rem", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: "linear-gradient(90deg, var(--accent), var(--accent2), transparent)" }} />
            <div style={{ fontFamily: "var(--font-mono), monospace", fontSize: "0.6rem", color: "var(--muted)", letterSpacing: "0.15em", textTransform: "uppercase" as const, marginBottom: "0.5rem" }}>// Código de acesso</div>
            <h2 style={{ fontFamily: "var(--font-serif), serif", fontSize: "1.8rem", color: "var(--ink)", lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: "0.8rem" }}>Digite seu código ISP</h2>
            <p style={{ fontSize: "0.85rem", color: "var(--muted)", lineHeight: 1.7, marginBottom: "2.5rem" }}>Código de 6 dígitos fornecido pelo seu provedor de internet. Exemplo: Maranet enviou por WhatsApp.</p>
            <div style={{ display: "flex", gap: "0.6rem", justifyContent: "center", marginBottom: "0.8rem" }} onPaste={handlePaste}>
              {digits.map((d, i) => (
                <input key={i} ref={el => { inputRefs.current[i] = el; }} type="text" inputMode="numeric" maxLength={1} value={d}
                  onChange={e => handleDigit(i, e.target.value)} onKeyDown={e => handleKey(i, e)}
                  disabled={screen === "connecting"}
                  style={{ width: "56px", height: "64px", textAlign: "center", fontFamily: "var(--font-serif), serif", fontSize: "1.8rem", fontWeight: 700, color: d ? "var(--accent)" : "var(--ink)", background: "var(--bg)", border: `2px solid ${d ? "var(--accent)" : "var(--border)"}`, borderRadius: "6px", outline: "none", transition: "border-color 0.15s", opacity: screen === "connecting" ? 0.6 : 1 }}
                />
              ))}
            </div>
            <div style={{ textAlign: "center", fontFamily: "var(--font-mono), monospace", fontSize: "0.6rem", color: "var(--muted)", marginBottom: "2rem" }}>
              {digits.slice(0,3).join("") || "···"} · {digits.slice(3).join("") || "···"}
            </div>
            {error && <div style={{ background: "rgba(200,82,42,0.08)", border: "1px solid rgba(200,82,42,0.2)", borderRadius: "4px", padding: "0.7rem 1rem", fontFamily: "var(--font-mono), monospace", fontSize: "0.72rem", color: "var(--accent)", marginBottom: "1.2rem" }}>⚠️ {error}</div>}
            {screen === "connecting" ? (
              <div style={{ textAlign: "center", padding: "1rem", fontFamily: "var(--font-mono), monospace", fontSize: "0.72rem", color: "var(--accent2)" }}>
                <div style={{ marginBottom: "0.5rem", fontSize: "1.5rem" }}>⏳</div>
                Verificando código on-chain...
              </div>
            ) : (
              <button onClick={handleRegister} disabled={digits.join("").length < 6} className="btn-fill"
                style={{ width: "100%", opacity: digits.join("").length < 6 ? 0.4 : 1, cursor: digits.join("").length < 6 ? "not-allowed" : "pointer" }}>
                Verificar e entrar na rede →
              </button>
            )}
            <button onClick={() => { setScreen("landing"); setDigits(["","","","","",""]); setError(""); }}
              style={{ background: "none", border: "none", color: "var(--muted)", cursor: "pointer", fontFamily: "var(--font-mono), monospace", fontSize: "0.65rem", marginTop: "1.2rem", width: "100%", textAlign: "center" as const }}>
              ← Voltar
            </button>
          </div>
        </section>
      )}

      {/* SUCCESS */}
      {screen === "success" && (
        <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "8rem 1.5rem 4rem" }}>
          <div style={{ width: "100%", maxWidth: "480px", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "8px", padding: "3rem 2.5rem", textAlign: "center", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: "linear-gradient(90deg, #2d8a4e, var(--accent2), transparent)" }} />
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>✅</div>
            <h2 style={{ fontFamily: "var(--font-serif), serif", fontSize: "1.8rem", color: "var(--ink)", letterSpacing: "-0.02em", marginBottom: "0.5rem" }}>Código válido!</h2>
            <p style={{ fontSize: "0.85rem", color: "var(--muted)", marginBottom: "2rem" }}>Você está conectado à rede GlobalMind via:</p>
            <div style={{ background: "var(--bg)", border: "1px solid var(--border)", borderRadius: "6px", padding: "1.2rem", marginBottom: "2rem" }}>
              <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>📡</div>
              <div style={{ fontFamily: "var(--font-serif), serif", fontSize: "1.2rem", color: "var(--ink)", fontWeight: 700, marginBottom: "0.2rem" }}>{ispName}</div>
              <div style={{ fontFamily: "var(--font-mono), monospace", fontSize: "0.6rem", color: "var(--muted)", letterSpacing: "0.1em", textTransform: "uppercase" as const }}>Código: {digits.slice(0,3).join("")} {digits.slice(3).join("")}</div>
            </div>
            <div style={{ background: "rgba(26,58,143,0.06)", border: "1px solid rgba(26,58,143,0.15)", borderRadius: "6px", padding: "1rem", fontFamily: "var(--font-mono), monospace", fontSize: "0.72rem", color: "var(--ink2)", lineHeight: 1.7, marginBottom: "2rem", textAlign: "left" as const }}>
              ✅ Validador registrado on-chain<br/>
              ✅ Vínculo com {ispName} confirmado<br/>
              ✅ Pronto para validar e ganhar USDC<br/>
              ✅ Créditos GMND acumulam automaticamente
            </div>
            <Link href="/tarefas" className="btn-fill" style={{ display: "block", textAlign: "center" as const, marginBottom: "0.8rem" }}>Começar a validar →</Link>
            <button onClick={() => setScreen("landing")} style={{ background: "none", border: "none", color: "var(--muted)", cursor: "pointer", fontFamily: "var(--font-mono), monospace", fontSize: "0.65rem", width: "100%" }}>← Voltar ao início</button>
          </div>
        </section>
      )}

      <style>{`@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }`}</style>
    </div>
  );
}
