"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

// Imports de Imagens (Certifique-se que os caminhos estão corretos no seu projeto)
import YouBrenno from "../favicon.ico";
import Premiere from "../../public/premiere.png";
import AfterEffects from "../../public/aftereffects.png";

export default function Hero() {
  const [menu, setMenu] = useState(false);
  const [showStickyHeader, setShowStickyHeader] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Ativa o header fixo após 300px de scroll
      setShowStickyHeader(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative h-screen bg-white font-sans selection:bg-[#181922] selection:text-white flex flex-col items-center justify-center overflow-hidden px-4">
      {/* --- HEADER RESPONSIVO PADRONIZADO --- */}
      <header
        className={`fixed top-0 z-[100] w-full py-4 px-4 md:px-6 transition-all duration-300 ${showStickyHeader ? "bg-white/95 backdrop-blur-md border-b-2 border-[#181922]/10" : "bg-transparent"}`}
      >
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          {/* Logo e Nome */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-[#181922]/20">
              <Image
                src={YouBrenno}
                alt="Logo"
                width={32}
                height={32}
                className="object-cover"
              />
            </div>
            <span className="font-black text-[#181922] uppercase text-xs md:text-sm tracking-tighter">
              YouBrenno
            </span>
          </div>

          {/* Nav Desktop - Agora com Skills */}
          <nav className="hidden md:flex gap-6 font-black text-[#181922]/50 uppercase text-xs tracking-widest">
            <a href="#" className="hover:text-[#181922] transition-colors">
              Home
            </a>
            <a
              href="#niches"
              className="hover:text-[#181922] transition-colors"
            >
              Niches
            </a>
            <a href="#edits" className="hover:text-[#181922] transition-colors">
              Edits
            </a>
            <a
              href="#skills"
              className="hover:text-[#181922] transition-colors"
            >
              Skills
            </a>
            <a
              href="#contact"
              className="hover:text-[#181922] transition-colors"
            >
              Contact
            </a>
          </nav>

          {/* Botão Hambúrguer Mobile */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMenu(true)}
          >
            <div className="w-6 h-1 bg-[#181922] rounded-full"></div>
            <div className="w-4 h-1 bg-[#181922] rounded-full self-end"></div>
          </button>
        </div>
      </header>

      {/* --- MENU MOBILE (SIDEBAR) --- */}
      <nav
        className={`fixed top-0 right-0 h-screen bg-white z-[110] shadow-2xl transition-all duration-300 md:hidden ${menu ? "w-64 translate-x-0" : "w-0 translate-x-full"} overflow-hidden border-l border-gray-100`}
      >
        <div className="p-6 flex justify-end">
          <button
            onClick={() => setMenu(false)}
            className="text-[#181922] font-black text-xs uppercase tracking-widest border-2 border-[#181922] px-4 py-2 rounded-full"
          >
            CLOSE
          </button>
        </div>
        <ul className="flex flex-col text-2xl p-8 gap-y-6 font-black text-[#181922] uppercase tracking-tighter">
          <li>
            <a href="#" onClick={() => setMenu(false)}>
              Home
            </a>
          </li>
          <li>
            <a href="#niches" onClick={() => setMenu(false)}>
              Niches
            </a>
          </li>
          <li>
            <a href="#edits" onClick={() => setMenu(false)}>
              Edits
            </a>
          </li>
          <li>
            <a href="#skills" onClick={() => setMenu(false)}>
              Skills
            </a>
          </li>
          <li>
            <a href="#contact" onClick={() => setMenu(false)}>
              Contact
            </a>
          </li>
        </ul>
      </nav>

      {/* Overlay do Menu Mobile */}
      {menu && (
        <div
          onClick={() => setMenu(false)}
          className="fixed inset-0 bg-black/40 z-[105] md:hidden backdrop-blur-sm"
        />
      )}

      {/* --- BACKGROUND GRID --- */}
      <div
        className="absolute inset-0 z-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(#181922 1px, transparent 1px), linear-gradient(90deg, #181922 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      ></div>

      {/* --- HERO CONTENT --- */}
      <div className="relative z-10 text-center flex flex-col items-center w-full max-w-4xl px-4">
        {/* Avatar Circular Centralizado */}
        <div className="relative w-32 h-32 sm:w-44 sm:h-44 md:w-52 md:h-52 bg-white border-[4px] md:border-[6px] border-[#181922] rounded-full overflow-hidden shadow-[8px_8px_0px_0px_#181922] mb-6 md:mb-8 animate-bounce">
          <Image
            src={YouBrenno}
            alt="YouBrenno"
            fill
            className="object-cover scale-[1.02]"
            priority
          />
        </div>

        {/* Nome Principal */}
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-[#181922] uppercase tracking-tighter mb-2 leading-none">
          YOUBRENNO
        </h1>

        {/* Subtítulo */}
        <p className="text-[#181922]/40 font-bold uppercase tracking-[0.2em] md:tracking-[0.3em] text-[10px] sm:text-xs md:text-sm mb-8">
          Professional <b className="text-blue-400">Video Editor</b> &{" "}
          <b className="text-blue-400">Specialist</b>
        </p>

        {/* Descrição Curta */}
      </div>
    </section>
  );
}
