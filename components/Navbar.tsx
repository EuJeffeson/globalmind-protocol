"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useWeb3 } from "@/lib/useWeb3";

function isMobile() {
  if (typeof window === "undefined") return false;
  return /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(navigator.userAgent);
}

export default function Navbar() {
  const pathname = usePathname();
  const { address, connect, isConnected, loading } = useWeb3();
  const curRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [walletModal, setWalletModal] = useState(false);

  useEffect(() => {
    if (window.innerWidth < 768) return;
    let mx = 0, my = 0, rx = 0, ry = 0;
    const move = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; };
    document.addEventListener("mousemove", move);
    let raf: number;
    const tick = () => {
      if (curRef.current)  { curRef.current.style.left = mx + "px"; curRef.current.style.top = my + "px"; }
      rx += (mx - rx) * 0.12; ry += (my - ry) * 0.12;
      if (ringRef.current) { ringRef.current.style.left = rx + "px"; ringRef.current.style.top = ry + "px"; }
      raf = requestAnimationFrame(tick);
    };
    tick();
    const grow = () => { if (curRef.current) { curRef.current.style.width = "20px"; curRef.current.style.height = "20px"; curRef.current.style.background = "var(--accent2)"; } };
    const shrink = () => { if (curRef.current) { curRef.current.style.width = "10px"; curRef.current.style.height = "10px"; curRef.current.style.background = "var(--accent)"; } };
    const addHover = () => {
      document.querySelectorAll("a, button, .card, input, select, textarea").forEach(el => {
        el.addEventListener("mouseenter", grow);
        el.addEventListener("mouseleave", shrink);
      });
    };
    addHover();
    const obs = new MutationObserver(addHover);
    obs.observe(document.body, { childList: true, subtree: true });
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => {
      document.removeEventListener("mousemove", move);
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      obs.disconnect();
    };
  }, []);

  const handleConnect = useCallback(() => {
    if (typeof window === "undefined") return;
    if (window.ethereum) {
      connect();
      return;
    }
    if (isMobile()) {
      setWalletModal(true);
      setMenuOpen(false);
      return;
    }
    alert("Instale MetaMask em metamask.io para conectar.");
  }, [connect]);

  const openInPhantom = () => {
    const url = encodeURIComponent(window.location.href);
    window.location.href = `https://phantom.app/ul/browse/${url}`;
  };
  const openInMetaMask = () => {
    const url = window.location.href.replace("https://", "").replace("http://", "");
    window.location.href = `https://metamask.app.link/dapp/${url}`;
  };
  const openInTrustWallet = () => {
    const url = encodeURIComponent(window.location.href);
    window.location.href = `https://link.trustwallet.com/open_url?coin_id=60&url=${url}`;
  };

  const links = [
    { href: "/empresa",   label: "Postar Tarefas" },
    { href: "/tarefas",   label: "Validar"         },
    { href: "/dashboard", label: "Dashboard"       },
  ];

  const wallets = [
    { name: "Phantom",      desc: "Recomendado",           icon: "👻", color: "#ab9ff2", action: openInPhantom },
    { name: "MetaMask",     desc: "A mais popular",        icon: "🦊", color: "#f6851b", action: openInMetaMask },
    { name: "Trust Wallet", desc: "Fácil para iniciantes", icon: "🛡️", color: "#3375bb", action: openInTrustWallet },
  ];

  const shortAddr = address ? address.slice(0,6) + "..." + address.slice(-4) : "";

  return (
    <>
      <div className="cursor" ref={curRef} />
      <div className="cursor-ring" ref={ringRef} />

      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "1rem 1.5rem",
        background: scrolled ? "rgba(244,241,235,0.97)" : "rgba(244,241,235,0.92)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid var(--border)",
        transition: "background 0.3s",
      }}>
        <Link href="/" style={{ textDecoration: "none" }}>
          <span style={{
            fontFamily: "var(--font-serif), 'Instrument Serif', serif",
            fontSize: "1.4rem", letterSpacing: "-0.01em", color: "var(--ink)",
          }}>
            GlobalMind
            <sup style={{
              fontFamily: "var(--font-mono), monospace",
              fontSize: "0.55rem", color: "var(--accent)",
              verticalAlign: "super", letterSpacing: "0.05em", marginLeft: "2px",
            }}>GMND</sup>
          </span>
        </Link>

        {/* Desktop */}
        <ul className="nav-desktop" style={{ listStyle: "none", display: "flex", gap: "2.5rem", alignItems: "center", margin: 0, padding: 0 }}>
          {links.map(l => (
            <li key={l.href}>
              <Link href={l.href} style={{
                color: pathname === l.href ? "var(--ink)" : "var(--muted)",
                textDecoration: "none", fontSize: "0.78rem", fontWeight: 600,
                letterSpacing: "0.06em", textTransform: "uppercase", transition: "color 0.2s",
                borderBottom: pathname === l.href ? "1px solid var(--accent)" : "1px solid transparent",
                paddingBottom: "2px",
              }}>{l.label}</Link>
            </li>
          ))}
          <li>
            <button onClick={handleConnect} disabled={loading} style={{
              fontFamily: "var(--font-mono), monospace", fontSize: "0.72rem",
              color: isConnected ? "var(--accent3)" : "var(--accent)",
              border: `1px solid ${isConnected ? "var(--accent3)" : "var(--accent)"}`,
              padding: "0.5rem 1.2rem", borderRadius: "2px",
              background: "transparent", cursor: "pointer",
              transition: "all 0.2s", letterSpacing: "0.05em",
            }}>
              {loading ? "..." : isConnected ? shortAddr : "$GMND — Conectar"}
            </button>
          </li>
        </ul>

        {/* Hamburger */}
        <button className="nav-hamburger" onClick={() => setMenuOpen(!menuOpen)} style={{
          background: "none", border: "none", cursor: "pointer",
          padding: "0.5rem", display: "flex", flexDirection: "column",
          gap: "5px", alignItems: "center", justifyContent: "center",
        }}>
          <span style={{ width: "22px", height: "2px", background: "var(--ink)", display: "block", transition: "all 0.3s", transform: menuOpen ? "rotate(45deg) translate(5px, 5px)" : "none" }} />
          <span style={{ width: "22px", height: "2px", background: "var(--ink)", display: "block", transition: "all 0.3s", opacity: menuOpen ? 0 : 1 }} />
          <span style={{ width: "22px", height: "2px", background: "var(--ink)", display: "block", transition: "all 0.3s", transform: menuOpen ? "rotate(-45deg) translate(5px, -5px)" : "none" }} />
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          position: "fixed", top: "60px", left: 0, right: 0, zIndex: 199,
          background: "rgba(244,241,235,0.98)", backdropFilter: "blur(20px)",
          borderBottom: "1px solid var(--border)",
          padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1rem",
        }}>
          {links.map(l => (
            <Link key={l.href} href={l.href} onClick={() => setMenuOpen(false)} style={{
              color: pathname === l.href ? "var(--accent)" : "var(--ink)",
              textDecoration: "none", fontSize: "1rem", fontWeight: 600,
              letterSpacing: "0.04em", textTransform: "uppercase",
              padding: "0.8rem 0", borderBottom: "1px solid var(--border)",
            }}>{l.label}</Link>
          ))}
          <button onClick={handleConnect} disabled={loading} style={{
            fontFamily: "var(--font-mono), monospace", fontSize: "0.85rem",
            color: "white", background: "var(--accent)",
            border: "none", padding: "1rem", borderRadius: "2px",
            cursor: "pointer", fontWeight: 700, letterSpacing: "0.05em", marginTop: "0.5rem",
          }}>
            {loading ? "..." : isConnected ? shortAddr : "$GMND — Conectar Carteira"}
          </button>
        </div>
      )}

      {/* Wallet Modal */}
      {walletModal && (
        <>
          <div onClick={() => setWalletModal(false)} style={{
            position: "fixed", inset: 0, zIndex: 998,
            background: "rgba(15,14,12,0.7)", backdropFilter: "blur(4px)",
          }} />
          <div style={{
            position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 999,
            background: "var(--bg)", borderRadius: "16px 16px 0 0",
            padding: "2rem 1.5rem 3rem",
            boxShadow: "0 -20px 60px rgba(15,14,12,0.15)",
          }}>
            <div style={{ width: "40px", height: "4px", background: "var(--border)", borderRadius: "2px", margin: "0 auto 2rem" }} />
            <h3 style={{ fontFamily: "var(--font-serif), serif", fontSize: "1.5rem", marginBottom: "0.5rem", color: "var(--ink)" }}>
              Conectar Carteira
            </h3>
            <p style={{ fontSize: "0.85rem", color: "var(--muted)", marginBottom: "1.5rem", lineHeight: 1.6 }}>
              Escolha sua carteira. O site vai abrir dentro do app automaticamente.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {wallets.map(w => (
                <button key={w.name} onClick={w.action} style={{
                  display: "flex", alignItems: "center", gap: "1rem",
                  background: "var(--surface)", border: "1px solid var(--border)",
                  borderRadius: "8px", padding: "1rem 1.2rem",
                  cursor: "pointer", textAlign: "left", width: "100%",
                }}>
                  <span style={{ fontSize: "1.8rem" }}>{w.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: "0.95rem", color: "var(--ink)", marginBottom: "0.15rem" }}>{w.name}</div>
                    <div style={{ fontSize: "0.75rem", color: "var(--muted)" }}>{w.desc}</div>
                  </div>
                  <span style={{
                    fontFamily: "var(--font-mono), monospace", fontSize: "0.65rem",
                    color: w.color, border: `1px solid ${w.color}`,
                    padding: "0.2rem 0.5rem", borderRadius: "2px",
                  }}>Abrir</span>
                </button>
              ))}
            </div>
            <div style={{ marginTop: "1.5rem", padding: "1rem", background: "var(--bg2)", borderRadius: "6px", textAlign: "center" }}>
              <p style={{ fontSize: "0.8rem", color: "var(--muted)", marginBottom: "0.5rem" }}>Não tem carteira ainda?</p>
              <a href="https://phantom.app" target="_blank" rel="noopener noreferrer" style={{
                fontFamily: "var(--font-mono), monospace", fontSize: "0.75rem",
                color: "var(--accent)", textDecoration: "none", fontWeight: 600,
              }}>Instalar Phantom gratuitamente →</a>
            </div>
            <button onClick={() => setWalletModal(false)} style={{
              width: "100%", marginTop: "1rem", background: "none", border: "none",
              color: "var(--muted)", fontSize: "0.85rem", cursor: "pointer", padding: "0.5rem",
            }}>Cancelar</button>
          </div>
        </>
      )}

      <style>{`
        .nav-hamburger { display: none; }
        .nav-desktop { display: flex !important; }
        @media (max-width: 768px) {
          .nav-hamburger { display: flex !important; }
          .nav-desktop { display: none !important; }
        }
      `}</style>
    </>
  );
}
