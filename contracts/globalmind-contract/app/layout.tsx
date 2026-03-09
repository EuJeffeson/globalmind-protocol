import type { Metadata } from "next";
import { Space_Grotesk, Space_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const grotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-sans" });
const mono    = Space_Mono({ subsets: ["latin"], weight: ["400","700"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "GlobalMind Protocol — GMND",
  description: "Rede descentralizada de validação de dados para IA",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${grotesk.variable} ${mono.variable}`}>
      <body className="bg-[#030303] text-white font-sans antialiased">
        <Navbar />
        <main className="pt-16 min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
