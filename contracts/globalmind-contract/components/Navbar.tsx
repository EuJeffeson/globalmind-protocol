"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useWeb3 } from "@/lib/useWeb3";

const NAV = [
  { href: "/empresa",   label: "Postar Tarefas" },
  { href: "/tarefas",   label: "Validar"         },
  { href: "/dashboard", label: "Dashboard"       },
];

export default function Navbar() {
  const path = usePathname();
  const { address, connect, loading, isConnected } = useWeb3();

  const short = (a: string) => a ? `${a.slice(0,6)}...${a.slice(-4)}` : "";

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[#1a1a1a] bg-[#030303]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-[#00f5c4] flex items-center justify-center">
            <span className="text-black font-black text-sm">GM</span>
          </div>
          <span className="font-bold text-white tracking-tight">GlobalMind</span>
          <span className="text-[#00f5c4] text-xs font-mono ml-1">GMND</span>
        </Link>

        {/* Nav links */}
        <div className="hidden md:flex items-center gap-1">
          {NAV.map(n => (
            <Link
              key={n.href}
              href={n.href}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                path.startsWith(n.href)
                  ? "bg-[#00f5c4]/10 text-[#00f5c4]"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              {n.label}
            </Link>
          ))}
        </div>

        {/* Wallet */}
        <button
          onClick={connect}
          disabled={loading}
          className={`px-4 py-2 rounded-lg text-sm font-mono font-medium transition-all ${
            isConnected
              ? "bg-[#00f5c4]/10 text-[#00f5c4] border border-[#00f5c4]/20"
              : "bg-[#00f5c4] text-black hover:bg-[#00f5c4]/90"
          }`}
        >
          {loading ? "..." : isConnected ? short(address) : "Conectar Carteira"}
        </button>
      </div>
    </nav>
  );
}
