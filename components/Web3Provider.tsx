"use client";
import { createWeb3Modal, defaultWagmiConfig } from "@web3modal/wagmi/react";
import { WagmiProvider } from "wagmi";
import { sepolia } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";

const projectId = "c785b435f82dc0e865205a04250539e4";

const metadata = {
  name: "GlobalMind Protocol",
  description: "Decentralized AI Validation Network",
  url: "https://globalmind-protocol.vercel.app",
  icons: ["https://globalmind-protocol.vercel.app/favicon.ico"],
};

const chains = [sepolia] as const;

const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
});

createWeb3Modal({
  wagmiConfig: config,
  projectId,
  defaultChain: sepolia,
  themeMode: "dark",
  themeVariables: {
    "--w3m-accent": "#c8522a",
    "--w3m-border-radius-master": "2px",
  },
});

const queryClient = new QueryClient();

export default function Web3Provider({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  );
}
