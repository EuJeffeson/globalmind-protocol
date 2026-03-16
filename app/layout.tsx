import "./globals.css";
import Navbar from "@/components/Navbar";
import Web3Provider from "@/components/Web3Provider";
import CursorEffect from "@/components/CursorEffect";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <Web3Provider>
          <CursorEffect />
          <Navbar />
          <main style={{ paddingTop: "64px" }}>
            {children}
          </main>
        </Web3Provider>
      </body>
    </html>
  );
}
