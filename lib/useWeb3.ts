"use client";
import { useState, useEffect, useCallback } from "react";
import { ethers } from "ethers";
import { CONTRACT_ADDRESS, CONTRACT_ABI, SEPOLIA_CHAIN_ID } from "./contract";

export function useWeb3() {
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [signer,   setSigner]   = useState<ethers.JsonRpcSigner | null>(null);
  const [address,  setAddress]  = useState<string>("");
  const [chainId,  setChainId]  = useState<number>(0);
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState("");

  const connect = useCallback(async () => {
    // Garante que só roda no browser
    if (typeof window === "undefined") return;

    if (!(window as any).ethereum) {
      setError("MetaMask não encontrado. Instale em metamask.io");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Pede acesso às contas
      await (window as any).ethereum.request({ method: "eth_requestAccounts" });

      const p = new ethers.BrowserProvider((window as any).ethereum);
      const s = await p.getSigner();
      const addr = await s.getAddress();
      const net = await p.getNetwork();
      const cid = Number(net.chainId);

      setProvider(p);
      setSigner(s);
      setAddress(addr);
      setChainId(cid);

      if (cid !== SEPOLIA_CHAIN_ID) {
        // Tenta trocar automaticamente para Sepolia
        try {
          await (window as any).ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: "0xaa36a7" }], // Sepolia em hex
          });
          // Após trocar, reconecta
          const p2 = new ethers.BrowserProvider((window as any).ethereum);
          const s2 = await p2.getSigner();
          setProvider(p2);
          setSigner(s2);
          setChainId(SEPOLIA_CHAIN_ID);
        } catch {
          setError("Troque para a rede Sepolia no MetaMask");
        }
      }
    } catch (e: any) {
      if (e.code === 4001) {
        setError("Conexão rejeitada pelo usuário");
      } else {
        setError(e.message || "Erro ao conectar");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const getContract = useCallback((write = false) => {
    if (write && signer)    return new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
    if (!write && provider) return new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
    return null;
  }, [provider, signer]);

  // Escuta mudanças de conta e rede
  useEffect(() => {
    if (typeof window === "undefined" || !(window as any).ethereum) return;

    const onAccountsChanged = () => connect();
    const onChainChanged    = () => connect();

    ((window as any).ethereum).on("accountsChanged", onAccountsChanged);
    ((window as any).ethereum).on("chainChanged",    onChainChanged);

    return () => {
      ((window as any).ethereum).removeListener("accountsChanged", onAccountsChanged);
      ((window as any).ethereum).removeListener("chainChanged",    onChainChanged);
    };
  }, [connect]);

  return {
    provider, signer, address, chainId, loading, error,
    connect, getContract,
    isConnected: !!address && chainId === SEPOLIA_CHAIN_ID,
  };
}
