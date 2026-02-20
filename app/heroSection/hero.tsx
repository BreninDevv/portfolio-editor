"use client";

import Image from "next/image";
import YouBrenno from "../favicon.ico";
import Capcut from "../../public/capcut.png";
import Premiere from "../../public/premiere.png";
import AfterEffects from "../../public/aftereffects.png";
import { useState, useEffect } from "react";

export default function Hero() {
  const [menu, setMenu] = useState(false);
  const [showStickyHeader, setShowStickyHeader] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const heroHeight = 500;

      if (currentScrollY > heroHeight) {
        setShowStickyHeader(true);
      } else {
        setShowStickyHeader(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative min-h-screen bg-[#ffffff] flex flex-col items-center mb-10 overflow-x-hidden">
      {/* SEGUNDO HEADER (Sticky - Adicionado Menu Hambúrguer) */}
      <header
        className={`
        fixed top-6 z-[100] w-[95%] max-w-4xl 
        bg-white/80 backdrop-blur-md
        py-4 px-10 rounded-full shadow-[0_10px_40px_rgba(0,0,0,0.15)] 
        transition-all duration-500 ease-in-out
        flex justify-between items-center border border-white/40
        ${showStickyHeader ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-20 pointer-events-none"}
      `}
      >
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#181922]/10 hover:scale-130 duration-200 cursor-pointer">
            <Image src={YouBrenno} alt="Logo" className="object-cover" />
          </div>
          <span className="font-bold text-[#181922] text-lg">YouBrenno</span>
        </div>

        {/* Menu Desktop */}
        <nav className="hidden md:block">
          <ul className="flex gap-x-8 text-sm font-bold text-[#181922]">
            <li>
              <a href="#" className="hover:text-blue-600 transition-colors">
                Home
              </a>
            </li>
            <li>
              <a
                href="#skills"
                className="hover:text-blue-600 transition-colors"
              >
                Skills
              </a>
            </li>
            <li>
              <a
                href="#edits"
                className="hover:text-blue-600 transition-colors"
              >
                Edits
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className="hover:text-blue-600 transition-colors"
              >
                Contact
              </a>
            </li>
          </ul>
        </nav>

        {/* BOTÃO HAMBÚRGUER (Aparece apenas no Mobile) */}
        <button
          className="md:hidden flex flex-col gap-1"
          onClick={() => setMenu(true)}
        >
          <div className="w-6 h-1 bg-[#181922] rounded-full"></div>
          <div className="w-6 h-1 bg-[#181922] rounded-full"></div>
          <div className="w-6 h-1 bg-[#181922] rounded-full"></div>
        </button>
      </header>

      {/* BACKGROUND GRID */}
      <div
        className="absolute inset-0 z-0 opacity-[0.7]"
        style={{
          backgroundImage: `linear-gradient(to right, #e5e7eb 1px, transparent 1px), linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)`,
          backgroundSize: "200px 200px",
          maskImage: "radial-gradient(circle, black 40%, transparent 90%)",
        }}
      ></div>

      {/* HEADER PRINCIPAL (Hero) */}
      <header className="sticky top-0 w-full p-6 md:p-8 flex justify-between items-center max-w-6xl bg-[#181922] text-white z-50 md:rounded-b-3xl shadow-2xl">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
          What is up?
        </h2>
        <nav className="hidden md:block">
          <ul className="flex gap-x-8 text-xl">
            <li>
              <a href="#" className="hover:text-gray-400">
                Home
              </a>
            </li>
            <li>
              <a href="#skills" className="hover:text-gray-400">
                Skills
              </a>
            </li>
            <li>
              <a href="#edits" className="hover:text-gray-400">
                Edits
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:text-gray-400">
                Contact
              </a>
            </li>
          </ul>
        </nav>
        {/* Hambúrguer do Header Principal */}
        <button
          className="md:hidden text-3xl p-2"
          onClick={() => setMenu(true)}
        >
          <div className="space-y-1">
            <div className="w-8 h-1 bg-white"></div>
            <div className="w-8 h-1 bg-white"></div>
            <div className="w-8 h-1 bg-white"></div>
          </div>
        </button>
      </header>

      {/* MOBILE NAV SIDEBAR (O mesmo menu para os dois headers) */}
      <nav
        className={`fixed top-0 right-0 h-screen bg-white z-[110] shadow-2xl transition-all duration-300 md:hidden ${menu ? "w-64 translate-x-0" : "w-0 translate-x-full"} overflow-hidden`}
      >
        <ul className="flex flex-col text-3xl p-8 py-24 gap-y-8 text-black">
          <li>
            <a href="#" onClick={() => setMenu(false)}>
              Home
            </a>
          </li>
          <li>
            <a href="#skills" onClick={() => setMenu(false)}>
              Skills
            </a>
          </li>
          <li>
            <a href="#edits" onClick={() => setMenu(false)}>
              Edits
            </a>
          </li>
          <li>
            <a href="#contact" onClick={() => setMenu(false)}>
              Contact
            </a>
          </li>
        </ul>
      </nav>

      {/* Overlay Mobile */}
      {menu && (
        <div
          onClick={() => setMenu(false)}
          className="fixed inset-0 bg-black/40 z-[105] md:hidden"
        />
      )}

      {/* HERO CONTENT */}
      <div className="relative z-10 flex flex-col items-center mt-10 md:mt-24 md:mb-20 px-6 text-center w-full max-w-4xl">
        <h1 className="text-2xl md:text-4xl md:pb-16 pb-8 font-semibold text-gray-800">
          Professional Editor
        </h1>

        <div className="w-48 h-48 md:w-64 md:h-64 mt-5 rounded-full border-4 border-[#181922] overflow-hidden bg-gray-700 mb-6 shadow-2xl animate-bounce">
          <div className="w-full h-full flex items-center justify-center relative">
            <Image
              src={YouBrenno}
              alt="YouBrenno"
              fill
              className="object-cover"
            />
          </div>
        </div>

        <h1 className="text-4xl md:text-6xl font-bold mb-8 text-[#181922]">
          YouBrenno
        </h1>

        <div className="flex gap-6 md:gap-10 mb-10 bg-white/80 backdrop-blur-sm p-4 md:p-6 rounded-3xl border-2 border-dashed border-gray-300 shadow-sm">
          <Image
            src={Capcut}
            alt="Capcut"
            width={70}
            height={70}
            className="w-12 h-12 md:w-20 md:h-20 hover:scale-115 duration-300 object-contain cursor-pointer"
          />
          <Image
            src={Premiere}
            alt="Premiere"
            width={70}
            height={70}
            className="w-12 h-12 md:w-20 md:h-20 hover:scale-115 duration-300 object-contain cursor-pointer"
          />
          <Image
            src={AfterEffects}
            alt="AfterEffects"
            width={70}
            height={70}
            className="w-12 h-12 md:w-20 md:h-20 hover:scale-115 duration-300 object-contain cursor-pointer"
          />
        </div>

        <p className="max-w-xs md:max-w-2xl text-xl md:text-3xl text-gray-700 leading-snug">
          Specializing in <span className="text-blue-600">Roblox</span>,{" "}
          <span className="text-green-600">Minecraft</span> shorts, and
          long-form videos
        </p>
      </div>
    </section>
  );
}
