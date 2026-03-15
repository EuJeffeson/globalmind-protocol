"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useWeb3 } from "@/lib/useWeb3";

const NAV = [
  { href: "/empresa",   label: "Postar Tarefas" },
  { href: "/tarefas",   label: "Validar"         },
  { href: "/dashboard", label: "Dashboard"       },
  { href: "/admin",     label: "Admin"           },
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
          <div className="w-8 h-8 rounded-lg bg-[#c8522a] flex items-center justify-center">
            <span className="text-white font-black text-sm">GM</span>
          </div>
          <span className="font-bold text-white tracking-tight">GlobalMind</span>
          <span className="text-[#c8522a] text-xs font-mono ml-1">GMND</span>
        </Link>

        {/* Nav links */}
        <div className="hidden md:flex items-center gap-1">
          {NAV.map(n => (
            <Link
              key={n.href}
              href={n.href}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                path.startsWith(n.href)
                  ? "bg-[#c8522a]/10 text-[#c8522a]"
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
              ? "bg-[#c8522a]/10 text-[#c8522a] border border-[#c8522a]/20"
              : "bg-[#c8522a] text-white hover:bg-[#c8522a]/90"
          }`}
        >
          {loading ? "..." : isConnected ? short(address) : "Conectar Carteira"}
        </button>
      </div>
    </nav>
  );
}
