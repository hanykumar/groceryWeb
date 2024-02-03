import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from './store/provider'
import Header from "./components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Grocery App by Hany Kumar",
  description: "Grocery web app",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <main className="flex min-h-screen flex-col">
            <Header />
            <div className="mt-10 lg:p-10 p-5">
              {children}
            </div>
          </main>
        </Providers>
      </body>
    </html>
  );
}
