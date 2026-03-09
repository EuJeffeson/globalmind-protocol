import Link from "next/link";

const CARDS = [
  {
    href: "/empresa",
    icon: "🏢",
    title: "Empresa",
    desc: "Poste lotes de tarefas de rotulagem e pague automaticamente via smart contract.",
    cta: "Postar tarefas →",
    color: "from-blue-500/10 to-transparent border-blue-500/20",
  },
  {
    href: "/tarefas",
    icon: "⚡",
    title: "Validar",
    desc: "Responda micro-tarefas de validação de IA e acumule tokens GMND.",
    cta: "Começar a validar →",
    color: "from-[#00f5c4]/10 to-transparent border-[#00f5c4]/20",
  },
  {
    href: "/dashboard",
    icon: "📊",
    title: "Dashboard",
    desc: "Acompanhe seu score PoEC, recompensas acumuladas e histórico de tarefas.",
    cta: "Ver dashboard →",
    color: "from-purple-500/10 to-transparent border-purple-500/20",
  },
  {
    href: "/admin",
    icon: "🔧",
    title: "Admin",
    desc: "Visualize todos os batches ativos, finalize consensos e monitore a rede.",
    cta: "Painel admin →",
    color: "from-orange-500/10 to-transparent border-orange-500/20",
  },
];

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      {/* Hero */}
      <div className="text-center mb-20">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00f5c4]/10 border border-[#00f5c4]/20 text-[#00f5c4] text-xs font-mono mb-6">
          <span className="w-2 h-2 rounded-full bg-[#00f5c4] animate-pulse" />
          Sepolia Testnet — Contrato Ativo
        </div>
        <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6">
          A infraestrutura de<br />
          <span className="text-[#00f5c4]">validação de IA</span><br />
          do futuro
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-10">
          O GlobalMind Protocol conecta empresas de IA com uma rede global de validadores humanos.
          Dados melhores. Custos menores. Recompensas automáticas via blockchain.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link href="/tarefas" className="px-6 py-3 bg-[#00f5c4] text-black font-bold rounded-xl hover:bg-[#00f5c4]/90 transition-all">
            Começar a validar
          </Link>
          <Link href="/empresa" className="px-6 py-3 border border-white/10 text-white rounded-xl hover:bg-white/5 transition-all">
            Sou empresa →
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-20 max-w-2xl mx-auto">
        {[
          ["0.150", "ETH Disponível"],
          ["Sepolia", "Rede Ativa"],
          ["v0.1", "MVP"],
        ].map(([val, label]) => (
          <div key={label} className="text-center p-4 rounded-xl bg-white/[0.03] border border-white/5">
            <div className="text-2xl font-black text-[#00f5c4] font-mono">{val}</div>
            <div className="text-xs text-gray-500 mt-1">{label}</div>
          </div>
        ))}
      </div>

      {/* Cards */}
      <div className="grid md:grid-cols-2 gap-4">
        {CARDS.map(c => (
          <Link key={c.href} href={c.href}
            className={`group p-6 rounded-2xl bg-gradient-to-br border ${c.color} hover:scale-[1.01] transition-all`}>
            <div className="text-3xl mb-3">{c.icon}</div>
            <h2 className="text-xl font-bold mb-2">{c.title}</h2>
            <p className="text-gray-400 text-sm mb-4">{c.desc}</p>
            <span className="text-[#00f5c4] text-sm font-medium group-hover:underline">{c.cta}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
