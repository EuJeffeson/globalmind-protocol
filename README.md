<p align="center">
  <img src="public/logo.png" alt="GlobalMind Protocol" width="120" />
</p>

<h1 align="center">GlobalMind Protocol</h1>

<p align="center">
  <strong>Decentralized AI Data Validation Network</strong>
</p>

<p align="center">
  <a href="https://globalmind-protocol.vercel.app">Website</a> ·
  <a href="#architecture">Architecture</a> ·
  <a href="#tokenomics">Tokenomics</a> ·
  <a href="#getting-started">Getting Started</a> ·
  <a href="https://x.com/GMNDProtocol">Twitter</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/network-Ethereum-3C3C3D?logo=ethereum" alt="Ethereum" />
  <img src="https://img.shields.io/badge/status-Testnet%20Live-00D4AA" alt="Status" />
  <img src="https://img.shields.io/badge/token-GMND%20(ERC--20)-7C5CFC" alt="Token" />
  <img src="https://img.shields.io/badge/license-MIT-blue" alt="License" />
</p>

---

## The Problem

AI companies spend billions annually on human data validation through centralized providers like Scale AI ($500K+ minimum contracts, zero transparency). A recent [peer-reviewed study](https://www.perle.ai/white-paper) showed that automated systems like AWS Rekognition achieve only **13.5% precision** compared to human annotation.

The AI data labeling market is projected to reach **$17.1 billion by 2030**, yet no Web3 protocol addresses decentralized human validation at the infrastructure level.

## The Solution

GlobalMind Protocol creates a **peer-to-peer network** where any connected device — smartphones, computers, routers, IoT devices — becomes an AI validation node. Validators earn **$GMND tokens** for verifying AI outputs, with quality enforced through **Blind Consensus** — a mechanism where validators submit answers independently, and fraud is detected automatically without human intervention.

### Key Differentiators

- **Proof of Expertise & Connectivity (PoEC)** — Novel consensus mechanism that rewards knowledge, not energy consumption
- **Dual Deflation** — Halving every 2 years + 20% automatic burn per corporate transaction (unique in the market)
- **ISP Integration** — First DePIN protocol with direct ISP partnership (Maranet Telecom, 1,000+ active clients in Marabá, Pará, Brazil)
- **Blind Consensus** — Validators submit answers without seeing other responses, preventing collusion

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    AI COMPANIES                         │
│              Submit validation tasks                    │
│                  Pay in $GMND                           │
└─────────────────────┬───────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────┐
│              GLOBALMIND PROTOCOL                        │
│                                                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │  Smart        │  │  Blind       │  │  Reward      │  │
│  │  Contracts    │  │  Consensus   │  │  Engine      │  │
│  │  (Ethereum)   │  │  Engine      │  │  (PoEC)      │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
│                                                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │  Halving     │  │  Auto Burn   │  │  Reputation  │  │
│  │  Mechanism   │  │  (20%/tx)    │  │  System      │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
└─────────────────────┬───────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────┐
│                 VALIDATOR NETWORK                        │
│                                                         │
│  ┌────────┐  ┌────────┐  ┌────────┐  ┌────────┐       │
│  │  ISP   │  │ Smart  │  │  IoT   │  │  PC /  │       │
│  │Routers │  │ phones │  │Devices │  │Laptops │       │
│  └────────┘  └────────┘  └────────┘  └────────┘       │
│                                                         │
│  Reward = f(UPTIME × ACCURACY)                          │
└─────────────────────────────────────────────────────────┘
```

## Tokenomics

| Parameter | Value |
|-----------|-------|
| **Token** | GMND (ERC-20) |
| **Blockchain** | Ethereum (Sepolia → Mainnet) |
| **Total Supply** | 1,000,000,000 (fixed, no additional minting) |
| **Seed Price** | $0.003 / GMND |
| **FDV** | $3,300,000 |
| **Deflation** | Dual: Halving + 20% burn per corporate tx |

### Distribution

| Allocation | % | Tokens | Vesting |
|-----------|---|--------|---------|
| Network Rewards | 40% | 400M | Via halving schedule |
| Seed Sale | 15% | 150M | 6m cliff + 18m linear |
| Team & Founders | 15% | 150M | 12m cliff + 36m linear |
| Ecosystem & Partnerships | 15% | 150M | Via DAO governance |
| Protocol Reserve | 10% | 100M | Multisig controlled |
| Initial Liquidity | 5% | 50M | At TGE |

### Halving Schedule

| Period | Era | Daily Emission | Annual Emission |
|--------|-----|---------------|-----------------|
| Year 1-2 | Era 0 | 100,000 GMND | 36.5M |
| Year 3-4 | Era 1 | 50,000 GMND | 18.2M |
| Year 5-6 | Era 2 | 25,000 GMND | 9.1M |
| Year 7-8 | Era 3 | 12,500 GMND | 4.5M |

## Competitive Landscape

| Protocol | On-chain | Halving | Blind Consensus | ISP Integration | Focus |
|----------|----------|---------|-----------------|-----------------|-------|
| Scale AI | ❌ | ❌ | ❌ | ❌ | Centralized annotation |
| Bittensor (TAO) | ✅ | ✅ | ❌ | ❌ | AI model competition |
| Grass | ✅ | ❌ | ❌ | ❌ | Web data scraping |
| Vana | ✅ | ❌ | ❌ | ❌ | Personal data |
| **GlobalMind** | **✅** | **✅** | **✅** | **✅** | **AI data validation** |

## Tech Stack

- **Smart Contracts**: Solidity (Ethereum / Sepolia)
- **Frontend**: Next.js + TypeScript + Tailwind CSS
- **Token**: ERC-20 with halving + auto-burn mechanisms
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- MetaMask (connected to Sepolia testnet)

### Installation

```bash
# Clone the repository
git clone https://github.com/EuJeffeson/globalmind-protocol.git

# Navigate to project directory
cd globalmind-protocol

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the dApp.

### Smart Contracts

Contracts are deployed on Ethereum Sepolia testnet. See the `/contracts` directory for source code.

## Current Status

| Milestone | Status |
|-----------|--------|
| Smart Contracts (Sepolia) | ✅ Live |
| ERC-20 Token ($GMND) | ✅ Deployed |
| dApp (Frontend) | ✅ [Production](https://globalmind-protocol.vercel.app) |
| ISP Partner (Maranet) | ✅ 1,000+ active clients |
| Halving Mechanism (V3) | ✅ Developed |
| Smart Contract Audit | 🔄 Pending |
| Mainnet Deployment | 🔄 Pending |
| First AI Company Pilot | 🔄 In progress |

## Roadmap

**Phase 0 — Foundation (Completed ✅)**
Smart contracts, token, dApp, ISP partnership, whitepaper, investor materials.

**Phase 1 — MVP Validated (Months 1-6)**
Maranet pilot, smart contract audit, mainnet deploy, 3 AI company clients, 500 active nodes.

**Phase 2 — Scale (Months 7-18)**
ISP expansion across Brazil, Android app, Uniswap listing, DAO governance, 10,000 nodes.

**Phase 3 — Open Protocol (Months 19-36)**
Public SDK, international expansion (LatAm + Africa), validated dataset marketplace, Series A.

## ISP Partner: Maranet Telecom

GlobalMind's first operational partner is **Maranet Telecom**, an ISP with 1,000+ active clients in **Marabá, Pará, Brazil**. This partnership demonstrates the ISP-as-node model:

- Client devices serve as potential validation nodes
- Customers earn $GMND while browsing normally
- ISP differentiates from competitors by offering passive income
- **First DePIN project in Northern Brazil**

> No competitor — not Bittensor, Grass, or Vana — has implemented direct ISP integration as corporate nodes. Maranet is the proof of concept for a model scalable to any internet provider worldwide.

## Founder

**Jeffeson Rocha** — Founder & Lead Developer

Background in telecommunications and Full Stack development. Built GlobalMind Protocol from scratch in Marabá, Pará — self-taught Web3 developer, no prior blockchain experience, no investors, no team.

- Deployed smart contracts on Ethereum Sepolia in under 2 weeks
- Created ERC-20 token, production dApp, and validation app connected to live contracts
- Operates Maranet Telecom with 1,000+ active clients in parallel

[Twitter: @eujeffesonr](https://x.com/eujeffesonr) · [Protocol: @GMNDProtocol](https://x.com/GMNDProtocol)

## Community

- **Twitter**: [@GMNDProtocol](https://x.com/GMNDProtocol) · [@eujeffesonr](https://x.com/eujeffesonr)
- **Discord**: [Join the server](https://discord.gg/globalmind)
- **GitHub**: [EuJeffeson/globalmind-protocol](https://github.com/EuJeffeson/globalmind-protocol)
- **Website**: [globalmind-protocol.vercel.app](https://globalmind-protocol.vercel.app)

## Contributing

We welcome contributions! GlobalMind is open-source under the MIT License.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

<p align="center">
  <strong>Built from Marabá, Pará, Brazil 🇧🇷</strong><br>
  <em>The AI validation layer the world needs.</em>
</p>
