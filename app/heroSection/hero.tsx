"use client";

import Image from "next/image";
import YouBrenno from "../favicon.ico";
import Capcut from "../../public/capcut.png";
import Premiere from "../../public/premiere.png";
import AfterEffects from "../../public/aftereffects.png";
import { useState } from "react";

export default function Hero() {
  const [menu, setMenu] = useState(false);

  return (
    <section className="relative min-h-screen bg-[#ffffff] flex flex-col items-center mb-10 overflow-x-hidden">
      {/* BACKGROUND GRID - Linhas claras e sutis */}
      <div
        className="absolute inset-0 z-0 opacity-[0.7]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #e5e7eb 1px, transparent 1px),
            linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)
          `,
          backgroundSize: "200px 200px",
          maskImage: "radial-gradient(circle, black 40%, transparent 90%)",
        }}
      ></div>

      {/* HEADER RESPONSIVO */}
      <header className="w-full p-6 md:p-8 flex justify-between items-center max-w-6xl bg-[#181922] text-white fixed z-50 md:rounded-b-3xl md:top-0 shadow-2xl">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight font-comic">
          What is up?
        </h2>

        <nav className="hidden md:block">
          <ul className="flex gap-x-8 text-xl font-comic">
            <li>
              <a href="#" className="hover:text-gray-400 transition-colors">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-400 transition-colors">
                Edits
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-400 transition-colors">
                Contact
              </a>
            </li>
          </ul>
        </nav>

        <button
          className="md:hidden text-3xl p-2 z-60"
          onClick={() => setMenu((prev) => !prev)}
        >
          <div className="space-y-1">
            <div
              className={`w-8 h-1 bg-white transition-all ${menu ? "rotate-45 translate-y-2" : ""}`}
            ></div>
            <div
              className={`w-8 h-1 bg-white ${menu ? "opacity-0" : ""}`}
            ></div>
            <div
              className={`w-8 h-1 bg-white transition-all ${menu ? "-rotate-45 -translate-y-2" : ""}`}
            ></div>
          </div>
        </button>
      </header>

      {/* MOBILE NAV SIDEBAR */}
      <nav
        className={`fixed top-0 left-0 h-screen bg-white z-55 shadow-2xl transition-all duration-300 ease-in-out md:hidden ${menu ? "w-64 translate-x-0" : "w-0 -translate-x-full"} overflow-hidden`}
      >
        <ul className="flex flex-col text-3xl p-8 py-24 gap-y-8 text-black font-comic">
          <li>
            <a
              href="#"
              onClick={() => setMenu(false)}
              className="hover:text-gray-500"
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="#"
              onClick={() => setMenu(false)}
              className="hover:text-gray-500"
            >
              Edits
            </a>
          </li>
          <li>
            <a
              href="#"
              onClick={() => setMenu(false)}
              className="hover:text-gray-500"
            >
              Contact
            </a>
          </li>
        </ul>
      </nav>

      {/* Overlay Mobile */}
      {menu && (
        <div
          onClick={() => setMenu(false)}
          className="fixed inset-0 bg-black/40 z-54 md:hidden"
        />
      )}

      {/* HERO CONTENT - z-10 para ficar acima do grid */}
      <div className="relative z-10 flex flex-col items-center mt-10 md:mt-24 md:mb-20 px-6 text-center pt-25 w-full max-w-4xl">
        <h1 className="text-2xl md:text-4xl pb-8 md:pb-8 font-semibold text-gray-800">
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

        <h1 className="text-4xl md:text-6xl font-bold mb-8 font-comic text-[#181922]">
          YouBrenno
        </h1>

        {/* Logos das Ferramentas */}
        <div className="flex gap-6 md:gap-10 mb-10 bg-white/80 backdrop-blur-sm p-4 md:p-6 rounded-3xl border-2 border-dashed border-gray-300 shadow-sm">
          <Image
            src={Capcut}
            alt="Capcut"
            width={70}
            height={70}
            className="w-12 h-12 md:w-20 md:h-20 cursor-pointer hover:scale-115 duration-300 object-contain"
          />
          <Image
            src={Premiere}
            alt="Premiere"
            width={70}
            height={70}
            className="w-12 h-12 md:w-20 md:h-20 cursor-pointer hover:scale-115 duration-300 object-contain"
          />
          <Image
            src={AfterEffects}
            alt="AfterEffects"
            width={70}
            height={70}
            className="w-12 h-12 md:w-20 md:h-20 cursor-pointer hover:scale-115 duration-300 object-contain"
          />
        </div>

        <p className="max-w-xs md:max-w-2xl text-xl md:text-3xl leading-snug font-medium font-comic text-gray-700">
          Specializing in <span className="text-blue-600">Roblox</span>,{" "}
          <span className="text-green-600">Minecraft</span> shorts, and
          long-form videos
        </p>
      </div>
    </section>
  );
}
