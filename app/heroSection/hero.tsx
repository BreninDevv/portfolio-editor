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
    <section className="min-h-screen bg-[#ffffff] flex flex-col items-center mb-10">
      <header className="w-full p-8 flex justify-between items-center max-w-4xl bg-[#181922] text-white fixed z-50">
        <h2 className="text-2xl font-bold tracking-tight font-comic">
          What is up?
        </h2>
        <button
          className="text-3xl p-2 z-60"
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

      <nav
        className={`
        fixed top-0 left-0 h-screen bg-white z-55 shadow-2xl transition-all duration-300 ease-in-out
        ${menu ? "w-54 translate-x-0" : "w-0 -translate-x-full"} 
        overflow-hidden
      `}
      >
        <ul className="flex flex-col text-3xl p-8 py-20 gap-y-8 text-black itim">
          <li>
            <a href="#" className="hover:text-gray-500">
              Home
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-gray-500">
              Edits
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-gray-500">
              Contact
            </a>
          </li>
        </ul>
      </nav>

      {menu && (
        <div
          onClick={() => setMenu(false)}
          className="fixed inset-0 bg-black/40 z-54"
        />
      )}

      <div className="flex flex-col items-center mt-6 px-6 text-center pt-25">
        <h1 className="text-3xl pb-8 font-semibold">Professional Editor</h1>

        <div className="w-48 h-48 mt-5 rounded-full border-4 border-black overflow-hidden bg-gray-700 mb-2 shadow-xl animate-bounce">
          <div className="w-full h-full flex items-center justify-center">
            <Image src={YouBrenno} alt="YouBrenno" />
          </div>
        </div>

        <h1 className="text-4xl font-medium mb-8 font-comic">YouBrenno</h1>

        <div className="flex gap-4 mb-10">
          <Image
            src={Capcut}
            alt="Capcut logo"
            width={60}
            className="cursor-pointer hover:scale-115 duration-300"
          />
          <Image
            src={Premiere}
            alt="Premiere logo"
            width={60}
            className="cursor-pointer hover:scale-115 duration-300"
          />
          <Image
            src={AfterEffects}
            alt="AfterEffects logo"
            width={60}
            className="cursor-pointer hover:scale-115 duration-300"
          />
        </div>

        <p className="max-w-xs text-xl leading-snug font-medium font-comic">
          Specializing in Roblox, minecraft shorts, and long videos
        </p>
      </div>
    </section>
  );
}
