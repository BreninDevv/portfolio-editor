import Image from "next/image";
import YouBrenno from "../favicon.ico";
import Capcut from "../../public/capcut.png";
import Premiere from "../../public/premiere.png";
import AfterEffects from "../../public/aftereffects.png";

export default function Hero() {
  return (
    <section className="min-h-screen bg-[#ffffff]  flex flex-col items-center">
      {/* HEADER / NAVBAR */}
      <header className="w-full p-8 flex justify-between items-center max-w-4xl bg-[#181922] text-white">
        <h2
          className="text-2xl font-bold tracking-tight "
          style={{ fontFamily: "cursive, sans-serif" }}
        >
          What is up?
        </h2>
        <button className="text-3xl">
          {/* Ícone de Menu Hamburguer */}
          <div className="space-y-1">
            <div className="w-8 h-1 bg-white"></div>
            <div className="w-8 h-1 bg-white"></div>
            <div className="w-8 h-1 bg-white"></div>
          </div>
        </button>
      </header>

      {/* CONTEÚDO PRINCIPAL */}
      <div className="flex flex-col items-center mt-6 px-6 text-center">
        <h1 className="text-4xl pb-8 font-semibold">Professional Editor</h1>
        {/* ESPAÇO PARA A FOTO DE PERFIL (Avatar) */}
        <div className="w-48 h-48 rounded-full border-4 border-black overflow-hidden bg-gray-700 mb-2 shadow-xl">
          {/* <img src="/sua-foto.png" alt="Profile" className="w-full h-full object-cover" /> */}
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <Image src={YouBrenno} alt="YouBrenno" />
          </div>
        </div>

        {/* NOME */}
        <h1
          className="text-4xl font-medium mb-8"
          style={{ fontFamily: "cursive, sans-serif" }}
        >
          YouBrenno
        </h1>

        {/* SOFTWARES (Ícones) */}
        <div className="flex gap-4 mb-10">
          {/* CapCut - Placeholder */}
          <Image
            src={Capcut}
            alt="Capcut logo"
            width={60}
            className="cursor-pointer hover:scale-115 duration-300"
          />

          {/* Premiere Pro - Placeholder */}
          <Image
            src={Premiere}
            alt="Premiere logo"
            width={60}
            className="cursor-pointer hover:scale-115 duration-300"
          />

          {/* After Effects - Placeholder */}
          <Image
            src={AfterEffects}
            alt="AfterEffects logo"
            width={60}
            className="cursor-pointer hover:scale-115 duration-300"
          />
        </div>

        {/* BIO / DESCRIÇÃO */}
        <p className="max-w-xs text-xl leading-snug font-medium">
          specializing in Roblox, minecraft shorts, and long videos
        </p>
      </div>
    </section>
  );
}
