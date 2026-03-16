"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAccount } from "wagmi";
import { useWeb3Modal } from "@web3modal/wagmi/react";

export default function Navbar() {
  const pathname = usePathname();
  const { address, isConnected } = useAccount();
  const { open } = useWeb3Modal();
  const curRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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

  const links = [
    { href: "/empresa",   label: "Postar Tarefas" },
    { href: "/tarefas",   label: "Validar"         },
    { href: "/dashboard", label: "Dashboard"       },
    { href: "/seed",      label: "Seed Round"      },
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
        {/* Logo */}
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

        {/* Desktop menu */}
        <ul style={{ listStyle: "none", display: "flex", gap: "2.5rem", alignItems: "center", margin: 0, padding: 0 }}
          className="nav-desktop">
          {links.map(l => (
            <li key={l.href}>
              <Link href={l.href} style={{
                color: pathname === l.href ? "var(--ink)" : "var(--muted)",
                textDecoration: "none",
                fontSize: "0.78rem", fontWeight: 600,
                letterSpacing: "0.06em", textTransform: "uppercase",
                transition: "color 0.2s",
                borderBottom: pathname === l.href ? "1px solid var(--accent)" : "1px solid transparent",
                paddingBottom: "2px",
              }}>{l.label}</Link>
            </li>
          ))}
          <li>
            <button onClick={() => open()} style={{
              fontFamily: "var(--font-mono), monospace", fontSize: "0.72rem",
              color: isConnected ? "var(--accent3)" : "var(--accent)",
              border: `1px solid ${isConnected ? "var(--accent3)" : "var(--accent)"}`,
              padding: "0.5rem 1.2rem", borderRadius: "2px",
              background: "transparent", cursor: "pointer",
              transition: "all 0.2s", letterSpacing: "0.05em",
            }}>
              {isConnected ? shortAddr : "$GMND — Conectar"}
            </button>
          </li>
        </ul>

        {/* Mobile hamburger */}
        <button
          className="nav-hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            background: "none", border: "none", cursor: "pointer",
            padding: "0.5rem", display: "flex", flexDirection: "column",
            gap: "5px", alignItems: "center", justifyContent: "center",
          }}>
          <span style={{ width: "22px", height: "2px", background: "var(--ink)", display: "block", transition: "all 0.3s", transform: menuOpen ? "rotate(45deg) translate(5px, 5px)" : "none" }} />
          <span style={{ width: "22px", height: "2px", background: "var(--ink)", display: "block", transition: "all 0.3s", opacity: menuOpen ? 0 : 1 }} />
          <span style={{ width: "22px", height: "2px", background: "var(--ink)", display: "block", transition: "all 0.3s", transform: menuOpen ? "rotate(-45deg) translate(5px, -5px)" : "none" }} />
        </button>
      </nav>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="nav-mobile-menu" style={{
          position: "fixed", top: "60px", left: 0, right: 0, zIndex: 199,
          background: "rgba(244,241,235,0.98)", backdropFilter: "blur(20px)",
          borderBottom: "1px solid var(--border)",
          padding: "1.5rem",
          display: "flex", flexDirection: "column", gap: "1rem",
        }}>
          {links.map(l => (
            <Link key={l.href} href={l.href} onClick={() => setMenuOpen(false)} style={{
              color: pathname === l.href ? "var(--accent)" : "var(--ink)",
              textDecoration: "none",
              fontSize: "1rem", fontWeight: 600,
              letterSpacing: "0.04em", textTransform: "uppercase",
              padding: "0.8rem 0",
              borderBottom: "1px solid var(--border)",
            }}>{l.label}</Link>
          ))}
          <button onClick={() => { open(); setMenuOpen(false); }} style={{
            fontFamily: "var(--font-mono), monospace", fontSize: "0.85rem",
            color: "white", background: "var(--accent)",
            border: "none", padding: "1rem", borderRadius: "2px",
            cursor: "pointer", fontWeight: 700, letterSpacing: "0.05em",
            marginTop: "0.5rem",
          }}>
            {isConnected ? shortAddr : "$GMND — Conectar Carteira"}
          </button>
        </div>
      )}

      <style>{`
        .cursor {
          position: fixed; top: 0; left: 0; z-index: 9999;
          width: 10px; height: 10px;
          background: var(--accent); border-radius: 50%;
          pointer-events: none;
          transform: translate(-50%, -50%);
          transition: width 0.2s, height 0.2s, background 0.2s;
        }
        .cursor-ring {
          position: fixed; top: 0; left: 0; z-index: 9998;
          width: 36px; height: 36px;
          border: 1.5px solid var(--accent); border-radius: 50%;
          pointer-events: none; opacity: 0.4;
          transform: translate(-50%, -50%);
          transition: width 0.3s, height 0.3s, opacity 0.3s;
        }
        body { cursor: none; }
        .nav-hamburger { display: none; }
        .nav-desktop { display: flex !important; }
        @media (max-width: 768px) {
          body { cursor: auto; }
          .cursor, .cursor-ring { display: none; }
          .nav-hamburger { display: flex !important; }
          .nav-desktop { display: none !important; }
        }
      `}</style>
    </>
  );
}
