"use client";
import { useState, useEffect, useCallback } from "react";
import { ethers } from "ethers";
import { CONTRACT_ADDRESS, CONTRACT_ABI, SEPOLIA_CHAIN_ID } from "./contract";

declare global {
  interface Window {
    ethereum?: any;
  }
}

// Get the injected Ethereum provider, handling EIP-5749 (multiple injected wallets)
function getInjectedProvider(): any | null {
  if (typeof window === "undefined") return null;

  const eth = window.ethereum;
  if (!eth) return null;

  // EIP-5749: Multiple wallets installed — window.ethereum.providers is an array
  if (eth.providers && Array.isArray(eth.providers)) {
    // Prioritize MetaMask, explicitly exclude Brave's injected wallet
    const metamask = eth.providers.find((p: any) => p.isMetaMask && !p.isBraveWallet);
    if (metamask) return metamask;
    return eth.providers[0] || null;
  }

  // Single provider (desktop MetaMask or MetaMask mobile browser)
  return eth;
}

// Detect if on mobile device (iOS / Android)
function isMobileDevice(): boolean {
  if (typeof window === "undefined") return false;
  return /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(navigator.userAgent);
}

/**
 * Returns true only when the user is inside the MetaMask built-in browser
 * (mobile device + MetaMask provider injected).
 * Returns false on Safari/Chrome mobile where MetaMask is NOT injected.
 */
export function isInsideMetaMaskBrowser(): boolean {
  if (typeof window === "undefined") return false;
  const injected = getInjectedProvider();
  return isMobileDevice() && !!injected?.isMetaMask;
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
        } catch (switchError: any) {
          // Chain not added — try adding Sepolia
          if (switchError.code === 4902) {
            try {
              await ethereum.request({
                method: "wallet_addEthereumChain",
                params: [{
                  chainId: "0xaa36a7",
                  chainName: "Sepolia Testnet",
                  nativeCurrency: { name: "ETH", symbol: "ETH", decimals: 18 },
                  rpcUrls: ["https://rpc.sepolia.org"],
                  blockExplorerUrls: ["https://sepolia.etherscan.io"],
                }],
              });
              const p2 = new ethers.BrowserProvider(ethereum);
              const s2 = await p2.getSigner();
              setProvider(p2);
              setSigner(s2);
              setChainId(SEPOLIA_CHAIN_ID);
            } catch {
              setError("Não foi possível adicionar a rede Sepolia");
            }
          } else {
            setError("Troque para a rede Sepolia na sua carteira");
          }
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

    const injected = getInjectedProvider();

    // MetaMask injected (desktop or inside MetaMask mobile browser) — connect normally
    if (injected?.isMetaMask) {
      await connectWithProvider(injected);
      return;
    }

    // Another wallet injected on desktop — also connect normally
    if (injected && !isMobileDevice()) {
      await connectWithProvider(injected);
      return;
    }

    // Mobile Safari/Chrome without MetaMask injected — show redirect modal
    if (isMobileDevice()) {
      setShowMobileModal(true);
      return;
    }

    // Desktop without any wallet
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
    if (typeof window === "undefined") return;
    const injected = getInjectedProvider();
    if (!injected) return;
    const onAccountsChanged = () => connect();
    const onChainChanged    = () => connect();
    injected.on("accountsChanged", onAccountsChanged);
    injected.on("chainChanged",    onChainChanged);
    return () => {
      injected.removeListener("accountsChanged", onAccountsChanged);
      injected.removeListener("chainChanged",    onChainChanged);
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
