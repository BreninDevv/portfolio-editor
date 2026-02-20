import type { Metadata } from "next";
import { Geist, Geist_Mono, Itim, Pacifico } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const itim = Itim({
  weight: "400",
  variable: "--font-itim",
  subsets: ["latin"],
});

const pacifico = Pacifico({
  weight: "400",
  variable: "--font-pacifico",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "YouBrenno | Editor Portfolio",
  description: "Professional Video Editor",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body
        className={`
          ${geistSans.variable} 
          ${geistMono.variable} 
          ${itim.variable} 
          ${pacifico.variable} 
          antialiased
        `}
      >
        {children}
      </body>
    </html>
  );
}
