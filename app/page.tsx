"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

const CARDS = [
  {
    href: "/empresa",
    icon: "🏢",
    title: "Empresa",
    desc: "Poste lotes de tarefas de validação de IA e pague automaticamente via smart contract. Auditável on-chain.",
    cta: "Postar tarefas →",
    color: "from-blue-500/10 to-transparent border-blue-500/20",
  },
  {
    href: "/tarefas",
    icon: "⚡",
    title: "Validar",
    desc: "Responda micro-tarefas de validação de IA e ganhe $GMND automaticamente. Sem intermediário.",
    cta: "Começar a validar →",
    color: "from-[#c8522a]/10 to-transparent border-[#c8522a]/20",
  },
  {
    href: "/dashboard",
    icon: "📊",
    title: "Dashboard",
    desc: "Acompanhe seu score PoEC, saldo $GMND, precisão e histórico de validações on-chain.",
    cta: "Ver dashboard →",
    color: "from-purple-500/10 to-transparent border-purple-500/20",
  },
  {
    href: "/admin",
    icon: "🔧",
    title: "Admin",
    desc: "Visualize todos os batches ativos, finalize consensos e monitore a rede de validação.",
    cta: "Painel admin →",
    color: "from-orange-500/10 to-transparent border-orange-500/20",
  },
];

const HALVING = [
  { era: "Era 0 — Ano 1-2", emission: "100.000 GMND/dia", active: true },
  { era: "Era 1 — Ano 3-4", emission: "50.000 GMND/dia",  active: false },
  { era: "Era 2 — Ano 5-6", emission: "25.000 GMND/dia",  active: false },
  { era: "Era 3 — Ano 7-8", emission: "12.500 GMND/dia",  active: false },
];

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-16">

      {/* Hero */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c8522a]/10 border border-[#c8522a]/20 text-[#c8522a] text-xs font-mono mb-6">
          <span className="w-2 h-2 rounded-full bg-[#c8522a] animate-pulse" />
          Sepolia Testnet — Contratos V2 Ativos · V3 + Halving em Deploy
        </div>

        <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6">
          A infraestrutura de<br />
          <span className="text-[#c8522a]">validação de IA</span><br />
          do futuro
        </h1>

        <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-4">
          O GlobalMind Protocol conecta empresas de IA com uma rede global de validadores humanos.
          Dados melhores. Custos menores. Recompensas automáticas via blockchain.
        </p>

        <p className="text-gray-500 text-sm max-w-xl mx-auto mb-10">
          Parceiro ISP: <span className="text-white font-medium">Maranet Telecom</span> — mais de mil clientes ativos em Marabá, Pará 🇧🇷
        </p>

        <div className="flex items-center justify-center gap-4 flex-wrap">
          <Link href="/tarefas" className="px-6 py-3 bg-[#c8522a] text-white font-bold rounded-xl hover:bg-[#c8522a]/90 transition-all">
            Começar a validar
          </Link>
          <Link href="/empresa" className="px-6 py-3 border border-white/10 text-white rounded-xl hover:bg-white/5 transition-all">
            Sou empresa →
          </Link>
          <a href="https://github.com/EuJeffeson/globalmind-protocol" target="_blank" rel="noopener noreferrer"
            className="px-6 py-3 border border-white/10 text-gray-400 rounded-xl hover:bg-white/5 transition-all text-sm">
            GitHub →
          </a>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
        {[
          { val: "1B",     label: "Supply $GMND",     color: "text-[#c8522a]" },
          { val: "$0.003", label: "Preco Seed",        color: "text-blue-400"  },
          { val: "20%",    label: "Auto Burn",         color: "text-red-400"   },
          { val: "$3.3M",  label: "Valuation",         color: "text-green-400" },
        ].map(({ val, label, color }) => (
          <div key={label} className="text-center p-4 rounded-xl bg-white/[0.03] border border-white/5">
            <div className={`text-2xl font-black font-mono ${color}`}>{val}</div>
            <div className="text-xs text-gray-500 mt-1">{label}</div>
          </div>
        ))}
      </div>

      {/* Cards */}
      <div className="grid md:grid-cols-2 gap-4 mb-16">
        {CARDS.map(c => (
          <Link key={c.href} href={c.href}
            className={`group p-6 rounded-2xl bg-gradient-to-br border ${c.color} hover:scale-[1.01] transition-all`}>
            <div className="text-3xl mb-3">{c.icon}</div>
            <h2 className="text-xl font-bold mb-2">{c.title}</h2>
            <p className="text-gray-400 text-sm mb-4">{c.desc}</p>
            <span className="text-[#c8522a] text-sm font-medium group-hover:underline">{c.cta}</span>
          </Link>
        ))}
      </div>

      {/* Halving */}
      <div className="mb-16">
        <div className="text-center mb-8">
          <span className="text-xs font-mono text-[#c8522a] tracking-widest uppercase">Tokenomics</span>
          <h2 className="text-3xl font-black mt-2">Deflacao Dupla — $GMND</h2>
          <p className="text-gray-400 text-sm mt-2 max-w-lg mx-auto">
            Halving a cada 2 anos (inspirado no Bitcoin) + Burn automatico de 20% por transacao corporativa.
            Nenhum competidor combina os dois mecanismos.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-lg">🔥</span>
              <h3 className="font-bold text-white">Calendario de Halving</h3>
            </div>
            <div className="space-y-2">
              {HALVING.map(({ era, emission, active }) => (
                <div key={era} className={`flex items-center justify-between p-3 rounded-lg ${active ? "bg-[#c8522a]/10 border border-[#c8522a]/20" : "bg-white/[0.02] border border-white/5"}`}>
                  <span className={`text-sm ${active ? "text-white font-bold" : "text-gray-400"}`}>{era}</span>
                  <div className="flex items-center gap-2">
                    <span className={`text-sm font-mono ${active ? "text-[#c8522a] font-bold" : "text-gray-500"}`}>{emission}</span>
                    {active && <span className="text-xs bg-[#c8522a]/20 text-[#c8522a] px-2 py-0.5 rounded-full">ATUAL</span>}
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-600 mt-3 italic">Inspirado no modelo de escassez do Bitcoin</p>
          </div>

          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-lg">📊</span>
              <h3 className="font-bold text-white">Distribuicao do Token</h3>
            </div>
            <div className="space-y-2">
              {[
                { label: "Recompensas de Rede",  pct: "40%", color: "bg-[#c8522a]" },
                { label: "Venda Seed",            pct: "15%", color: "bg-blue-500"  },
                { label: "Equipe (vesting)",      pct: "15%", color: "bg-green-500" },
                { label: "Ecossistema",           pct: "15%", color: "bg-purple-500"},
                { label: "Reserva",               pct: "10%", color: "bg-yellow-500"},
                { label: "Liquidez Inicial",      pct: "5%",  color: "bg-gray-500"  },
              ].map(({ label, pct, color }) => (
                <div key={label} className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${color} flex-shrink-0`} />
                  <span className="text-sm text-gray-400 flex-1">{label}</span>
                  <span className="text-sm font-mono text-white font-bold">{pct}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 rounded-lg bg-[#c8522a]/10 border border-[#c8522a]/20 text-xs text-[#c8522a]">
              Seed: 150M GMND · $0.003/token · Valuation $3.3M
            </div>
          </div>
        </div>
      </div>

      {/* ISP Partner */}
      <div className="mb-16 p-6 rounded-2xl bg-white/[0.03] border border-white/10">
        <div className="flex items-start gap-4">
          <span className="text-3xl">📡</span>
          <div>
            <h3 className="font-bold text-white text-lg mb-1">Primeiro Parceiro ISP — Maranet Telecom</h3>
            <p className="text-gray-400 text-sm mb-3">
              Mais de mil clientes ativos em Maraba, Para 🇧🇷 — primeiro DePIN de validacao de IA do Norte do Brasil.
              Cada cliente Maranet e um node potencial da rede GlobalMind.
            </p>
            <div className="flex flex-wrap gap-2">
              {["DePIN", "ISP Node", "Maraba-PA", "1.000+ Clientes", "Norte do Brasil"].map(tag => (
                <span key={tag} className="text-xs px-2 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400">{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Traction */}
      <div className="mb-16">
        <h2 className="text-2xl font-black mb-6 text-center">Tracao Atual</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {[
            "✅ Smart Contracts V2 live na Sepolia",
            "✅ Token ERC-20 $GMND deployado",
            "✅ dApp em producao",
            "✅ App de validacao Maranet",
            "✅ Contrato V3 + Halving desenvolvido",
            "✅ Open source no GitHub",
            "✅ Product Hunt lancado",
            "✅ DevHunt listado",
            "✅ Giveth — primeira doacao recebida",
          ].map(item => (
            <div key={item} className="p-3 rounded-xl bg-white/[0.02] border border-white/5 text-sm text-gray-400">
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-[#c8522a]/10 to-transparent border border-[#c8522a]/20">
        <p className="text-2xl font-black mb-2 italic">A inteligencia pertence a quem a alimenta.</p>
        <p className="text-gray-400 text-sm mb-6">Seed Round Aberto · $500K · 150M GMND · $0.003/token</p>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <Link href="/tarefas" className="px-6 py-3 bg-[#c8522a] text-white font-bold rounded-xl hover:bg-[#c8522a]/90 transition-all">
            Comecar a validar
          </Link>
          <a href="https://github.com/EuJeffeson/globalmind-protocol" target="_blank" rel="noopener noreferrer"
            className="px-6 py-3 border border-white/10 text-gray-400 rounded-xl hover:bg-white/5 transition-all text-sm">
            Ver GitHub →
          </a>
        </div>
      </div>

    </div>
  );
}
