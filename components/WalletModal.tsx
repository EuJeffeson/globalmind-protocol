"use client";
import { useWeb3 } from "@/lib/useWeb3";

export default function WalletModal() {
  const { showMobileModal, setShowMobileModal, openInPhantom, openInMetaMask, openInTrustWallet } = useWeb3();

  if (!showMobileModal) return null;

  const wallets = [
    {
      name: "Phantom",
      desc: "Recomendado — carteira do projeto",
      icon: "👻",
      color: "#ab9ff2",
      action: openInPhantom,
    },
    {
      name: "MetaMask",
      desc: "A mais popular do mercado",
      icon: "🦊",
      color: "#f6851b",
      action: openInMetaMask,
    },
    {
      name: "Trust Wallet",
      desc: "Fácil para iniciantes",
      icon: "🛡️",
      color: "#3375bb",
      action: openInTrustWallet,
    },
  ];

  return (
    <>
      {/* Overlay */}
      <div
        onClick={() => setShowMobileModal(false)}
        style={{
          position: "fixed", inset: 0, zIndex: 998,
          background: "rgba(15,14,12,0.7)",
          backdropFilter: "blur(4px)",
        }}
      />

      {/* Modal */}
      <div style={{
        position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 999,
        background: "var(--bg)",
        borderRadius: "16px 16px 0 0",
        padding: "2rem 1.5rem 3rem",
        boxShadow: "0 -20px 60px rgba(15,14,12,0.15)",
      }}>
        {/* Handle */}
        <div style={{
          width: "40px", height: "4px",
          background: "var(--border)",
          borderRadius: "2px",
          margin: "0 auto 2rem",
        }} />

        <h3 style={{
          fontFamily: "var(--font-serif), serif",
          fontSize: "1.5rem", letterSpacing: "-0.01em",
          marginBottom: "0.5rem", color: "var(--ink)",
        }}>Conectar Carteira</h3>

        <p style={{
          fontSize: "0.85rem", color: "var(--muted)",
          marginBottom: "1.5rem", lineHeight: 1.6,
        }}>
          Escolha sua carteira para entrar no protocolo. O site vai abrir dentro do app.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {wallets.map(w => (
            <button
              key={w.name}
              onClick={w.action}
              style={{
                display: "flex", alignItems: "center", gap: "1rem",
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "8px", padding: "1rem 1.2rem",
                cursor: "pointer", transition: "all 0.2s",
                textAlign: "left", width: "100%",
              }}
            >
              <span style={{ fontSize: "1.8rem" }}>{w.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{
                  fontWeight: 700, fontSize: "0.95rem",
                  color: "var(--ink)", marginBottom: "0.15rem",
                }}>{w.name}</div>
                <div style={{
                  fontSize: "0.75rem", color: "var(--muted)",
                }}>{w.desc}</div>
              </div>
              <span style={{
                fontFamily: "var(--font-mono), monospace",
                fontSize: "0.65rem", color: w.color,
                border: `1px solid ${w.color}`,
                padding: "0.2rem 0.5rem", borderRadius: "2px",
              }}>Abrir</span>
            </button>
          ))}
        </div>

        {/* Não tem carteira */}
        <div style={{
          marginTop: "1.5rem", padding: "1rem",
          background: "var(--bg2)", borderRadius: "6px",
          textAlign: "center",
        }}>
          <p style={{ fontSize: "0.8rem", color: "var(--muted)", marginBottom: "0.5rem" }}>
            Não tem carteira ainda?
          </p>
          <a
            href="https://phantom.app"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "var(--font-mono), monospace",
              fontSize: "0.75rem", color: "var(--accent)",
              textDecoration: "none", fontWeight: 600,
              letterSpacing: "0.05em",
            }}
          >
            Instalar Phantom gratuitamente →
          </a>
        </div>

        <button
          onClick={() => setShowMobileModal(false)}
          style={{
            width: "100%", marginTop: "1rem",
            background: "none", border: "none",
            color: "var(--muted)", fontSize: "0.85rem",
            cursor: "pointer", padding: "0.5rem",
          }}
        >
          Cancelar
        </button>
      </div>
    </>
  );
}
