"use client";
import { Instrument_Serif, DM_Mono, Manrope } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Web3Provider from "@/components/Web3Provider";
import { useEffect, useRef, useState } from "react";

const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-serif",
});

const mono = DM_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-mono",
});

const sans = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700", "800"],
  variable: "--font-sans",
});

const METAMASK_DEEP_LINK = "https://metamask.app.link/dapp/globalmind-protocol.vercel.app";

/**
 * Banner fixo no topo — aparece SOMENTE em dispositivos mobile quando o usuário
 * NÃO está dentro do browser embutido do MetaMask (Safari/Chrome mobile).
 */
function MetaMaskBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const isMobile = /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(
      navigator.userAgent
    );
    if (!isMobile) return;

    // EIP-5749: checar no array providers também
    const eth = (window as any).ethereum;
    const providers: any[] | undefined = eth?.providers;
    const isMetaMaskInjected = providers
      ? providers.some((p: any) => p.isMetaMask)
      : !!eth?.isMetaMask;

    if (!isMetaMaskInjected) {
      setVisible(true);
    }
  }, []);

  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 2000,
        background: "#f6851b",
        color: "#fff",
        padding: "10px 16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "12px",
        fontFamily: "var(--font-sans)",
        fontSize: "14px",
        lineHeight: "1.4",
      }}
    >
      <span>Para validar tarefas, abra no MetaMask Browser</span>
      <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
        <a
          href={METAMASK_DEEP_LINK}
          style={{
            background: "#fff",
            color: "#f6851b",
            padding: "4px 12px",
            borderRadius: "6px",
            fontWeight: 700,
            textDecoration: "none",
            fontSize: "13px",
            whiteSpace: "nowrap",
          }}
        >
          Abrir
        </a>
        <button
          onClick={() => setVisible(false)}
          aria-label="Fechar aviso"
          style={{
            background: "transparent",
            border: "none",
            color: "#fff",
            fontSize: "20px",
            lineHeight: 1,
            cursor: "pointer",
            padding: "0 2px",
          }}
        >
          ×
        </button>
      </div>
    </div>
  );
}

function CursorEffect() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot  = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = 0, mouseY = 0;
    let ringX  = 0, ringY  = 0;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left = mouseX + "px";
      dot.style.top  = mouseY + "px";
    };

    const animate = () => {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      ring.style.left = ringX + "px";
      ring.style.top  = ringY + "px";
      requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMove);
    animate();
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <>
      <div ref={dotRef}  className="cursor-dot"  />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${serif.variable} ${mono.variable} ${sans.variable}`}>
      <body>
        <Web3Provider>
          <MetaMaskBanner />
          <CursorEffect />
          <Navbar />
          <main style={{ paddingTop: "64px" }}>
            {children}
          </main>
        </Web3Provider>
      </body>
    </html>
  );
}
