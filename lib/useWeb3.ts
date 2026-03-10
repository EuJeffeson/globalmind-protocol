"use client";
import { useState, useEffect, useCallback } from "react";
import { ethers } from "ethers";
import { CONTRACT_ADDRESS, CONTRACT_ABI, SEPOLIA_CHAIN_ID } from "./contract";

declare global {
  interface Window {
    ethereum?: any;
  }
}

// Detect if running inside a mobile wallet browser
function isMobileWalletBrowser(): boolean {
  if (typeof window === "undefined") return false;
  return !!window.ethereum;
}

// Detect if on mobile device
function isMobileDevice(): boolean {
  if (typeof window === "undefined") return false;
  return /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(navigator.userAgent);
}

export function useWeb3() {
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [signer,   setSigner]   = useState<ethers.JsonRpcSigner | null>(null);
  const [address,  setAddress]  = useState<string>("");
  const [chainId,  setChainId]  = useState<number>(0);
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState("");
  const [showMobileModal, setShowMobileModal] = useState(false);

  const connectWithProvider = useCallback(async (ethereum: any) => {
    setLoading(true);
    setError("");
    try {
      await ethereum.request({ method: "eth_requestAccounts" });
      const p = new ethers.BrowserProvider(ethereum);
      const s = await p.getSigner();
      const addr = await s.getAddress();
      const net = await p.getNetwork();
      const cid = Number(net.chainId);

      setProvider(p);
      setSigner(s);
      setAddress(addr);
      setChainId(cid);
      setShowMobileModal(false);

      if (cid !== SEPOLIA_CHAIN_ID) {
        try {
          await ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: "0xaa36a7" }],
          });
          const p2 = new ethers.BrowserProvider(ethereum);
          const s2 = await p2.getSigner();
          setProvider(p2);
          setSigner(s2);
          setChainId(SEPOLIA_CHAIN_ID);
        } catch {
          setError("Troque para a rede Sepolia na sua carteira");
        }
      }
    } catch (e: any) {
      if (e.code === 4001) {
        setError("Conexão rejeitada");
      } else {
        setError(e.message || "Erro ao conectar");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const connect = useCallback(async () => {
    if (typeof window === "undefined") return;

    // If wallet is injected (MetaMask desktop or inside wallet browser)
    if (window.ethereum) {
      await connectWithProvider(window.ethereum);
      return;
    }

    // On mobile without injected wallet — show options modal
    if (isMobileDevice()) {
      setShowMobileModal(true);
      return;
    }

    // Desktop without wallet
    setError("Nenhuma carteira encontrada. Instale MetaMask em metamask.io");
  }, [connectWithProvider]);

  // Deep link openers for mobile wallets
  const openInPhantom = useCallback(() => {
    const url = encodeURIComponent(window.location.href);
    window.location.href = `https://phantom.app/ul/browse/${url}`;
  }, []);

  const openInMetaMask = useCallback(() => {
    const url = window.location.href.replace("https://", "").replace("http://", "");
    window.location.href = `https://metamask.app.link/dapp/${url}`;
  }, []);

  const openInTrustWallet = useCallback(() => {
    const url = encodeURIComponent(window.location.href);
    window.location.href = `trust://browser_enable`;
    setTimeout(() => {
      window.location.href = `https://link.trustwallet.com/open_url?coin_id=60&url=${url}`;
    }, 500);
  }, []);

  const getContract = useCallback((write = false) => {
    if (write && signer)    return new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
    if (!write && provider) return new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
    return null;
  }, [provider, signer]);

  useEffect(() => {
    if (typeof window === "undefined" || !window.ethereum) return;
    const onAccountsChanged = () => connect();
    const onChainChanged    = () => connect();
    window.ethereum.on("accountsChanged", onAccountsChanged);
    window.ethereum.on("chainChanged",    onChainChanged);
    return () => {
      window.ethereum.removeListener("accountsChanged", onAccountsChanged);
      window.ethereum.removeListener("chainChanged",    onChainChanged);
    };
  }, [connect]);

  return {
    provider, signer, address, chainId, loading, error,
    connect, getContract,
    isConnected: !!address && chainId === SEPOLIA_CHAIN_ID,
    showMobileModal,
    setShowMobileModal,
    openInPhantom,
    openInMetaMask,
    openInTrustWallet,
    isMobile: isMobileDevice(),
  };
}
