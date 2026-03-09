"use client";
import { useState, useEffect, useCallback } from "react";
import { ethers } from "ethers";
import { CONTRACT_ADDRESS, CONTRACT_ABI, SEPOLIA_CHAIN_ID } from "./contract";

declare global {
  interface Window { ethereum?: any; }
}

export function useWeb3() {
  const [provider, setProvider]   = useState<ethers.BrowserProvider | null>(null);
  const [signer,   setSigner]     = useState<ethers.JsonRpcSigner | null>(null);
  const [address,  setAddress]    = useState<string>("");
  const [chainId,  setChainId]    = useState<number>(0);
  const [loading,  setLoading]    = useState(false);
  const [error,    setError]      = useState("");

  const connect = useCallback(async () => {
    if (!window.ethereum) {
      setError("MetaMask não encontrado. Instale em metamask.io");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const p = new ethers.BrowserProvider(window.ethereum);
      await p.send("eth_requestAccounts", []);
      const s = await p.getSigner();
      const addr = await s.getAddress();
      const net = await p.getNetwork();

      setProvider(p);
      setSigner(s);
      setAddress(addr);
      setChainId(Number(net.chainId));

      if (Number(net.chainId) !== SEPOLIA_CHAIN_ID) {
        setError("Troque para a rede Sepolia no MetaMask");
      }
    } catch (e: any) {
      setError(e.message || "Erro ao conectar");
    } finally {
      setLoading(false);
    }
  }, []);

  const getContract = useCallback((write = false) => {
    if (write && signer)   return new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
    if (!write && provider) return new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
    return null;
  }, [provider, signer]);

  useEffect(() => {
    if (!window.ethereum) return;
    window.ethereum.on("accountsChanged", () => connect());
    window.ethereum.on("chainChanged",    () => connect());
    return () => {
      window.ethereum?.removeAllListeners?.();
    };
  }, [connect]);

  return { provider, signer, address, chainId, loading, error, connect, getContract,
           isConnected: !!address && chainId === SEPOLIA_CHAIN_ID };
}
