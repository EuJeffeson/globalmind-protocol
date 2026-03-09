# GlobalMind Protocol — Smart Contract MVP

Contrato inteligente do protocolo GlobalMind (GMND).
Versão MVP focada em validação de dados via plurality consensus.

---

## Pré-requisitos

- Node.js 18+ instalado (`node --version`)
- npm ou yarn
- MetaMask instalado no browser (para deploy na Sepolia)

---

## Setup — Rode isso no terminal, dentro desta pasta

```bash
# 1. Instala as dependências
npm install

# 2. Compila o contrato
npm run compile

# 3. Roda os testes (tudo deve passar com ✓)
npm test
```

Se tudo passar, você verá algo assim:

```
  GlobalMindProtocol
    createBatch()
      ✓ deve criar um batch com 2 tarefas e emitir BatchCreated
      ✓ deve reverter se nao houver recompensa
      ...
    finalizeBatch()
      ✓ deve finalizar e distribuir recompensas corretamente
      ...
  8 passing (2s)
```

---

## Deploy na rede local (sem gastar dinheiro real)

```bash
# Terminal 1 — sobe uma blockchain local
npm run node

# Terminal 2 — faz o deploy nessa blockchain local
npm run deploy:local
```

---

## Deploy na Sepolia (testnet pública — ETH de graça via faucet)

### Passo 1 — Consiga ETH de teste (gratuito)
- Crie uma carteira no MetaMask
- Acesse: https://sepoliafaucet.com
- Cole seu endereço e receba ETH de teste grátis

### Passo 2 — Configure as variáveis de ambiente
```bash
# Crie o arquivo .env na raiz do projeto
cp .env.example .env

# Edite o .env com seus dados:
# PRIVATE_KEY=sua_chave_privada_aqui (NUNCA commite isso no git!)
# SEPOLIA_RPC_URL=https://rpc.sepolia.org
```

### Passo 3 — Deploy
```bash
npm run deploy:sepolia
```

O terminal vai mostrar o endereço do contrato. Guarde ele —
você vai usar no frontend.

---

## Estrutura do Projeto

```
globalmind-contract/
├── contracts/
│   └── GlobalMindProtocol.sol   ← O contrato principal
├── scripts/
│   └── deploy.ts                ← Script de deploy
├── test/
│   └── GlobalMindProtocol.test.ts ← Testes automatizados
├── hardhat.config.ts            ← Configuração do Hardhat
├── package.json
└── README.md
```

---

## Como o Contrato Funciona

### Fluxo principal:

```
1. Empresa chama createBatch() + deposita ETH
         ↓
2. Nós chamam submitAnswer() com suas respostas
         ↓
3. Quando 3+ nós responderam, qualquer um chama finalizeBatch()
         ↓
4. Contrato calcula consenso (resposta mais votada)
         ↓
5. Distribui: 70% para nós corretos | 20% queimado | 10% treasury
```

### Funções principais:

| Função | Quem chama | O que faz |
|--------|-----------|-----------|
| `createBatch()` | Empresa de IA | Cria lote de tarefas + deposita ETH |
| `submitAnswer()` | Usuário/Nó | Envia resposta para uma tarefa |
| `finalizeBatch()` | Qualquer um | Calcula consenso e paga os nós |
| `cancelBatch()` | Empresa | Cancela e recupera ETH (se sem respostas) |
| `getNodeProfile()` | Qualquer um | Consulta score e histórico de um nó |

---

## O que vem na v2

- [ ] Commit-Reveal Scheme (consenso verdadeiramente cego)
- [ ] Score PoEC completo com uptime + accuracy + stake
- [ ] Token ERC-20 GMND (substituindo ETH nativo)
- [ ] Sistema de staking para nós (anti-sybil)
- [ ] Auditoria de segurança profissional

---

## Segurança — Avisos Importantes

⚠️ Este é um contrato MVP não auditado. NÃO use em produção com fundos reais.
⚠️ NUNCA commite sua chave privada no git. Use o arquivo .env (já no .gitignore).
⚠️ Antes de ir para mainnet, contrate uma auditoria (Trail of Bits, OpenZeppelin, etc.)

---

## Contato

GlobalMind Protocol — GMND
Whitepaper: ver pasta /docs
