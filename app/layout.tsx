import type { Metadata } from "next";
import { Instrument_Serif, DM_Mono, Manrope } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import WalletModal from "@/components/WalletModal";

const instrumentSerif = Instrument_Serif({
  weight: ["400"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-serif",
});

const dmMono = DM_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-mono",
});

const manrope = Manrope({
  weight: ["300", "400", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "GlobalMind Protocol — GMND",
  description: "A infraestrutura descentralizada de validação de IA do futuro.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className={`${instrumentSerif.variable} ${dmMono.variable} ${manrope.variable}`}>
        <Navbar />
        <WalletModal />
        <main>{children}</main>
      </body>
    </html>
  );
}
