"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

// Imports de Imagens
import YouBrenno from "../favicon.ico";
import MinecraftLogo from "../../public/minecraft.jpg";
import Personagem2 from "../../public/personagem2.png";
import Gmail from "../../public/gmail.webp";
import Discord from "../../public/discord.jpg";
import X from "../../public/x.png";

export default function MinecraftNichePage() {
  const [showStickyHeader, setShowStickyHeader] = useState(false);

  // --- ESTRUTURA DOS CARDS (Sem URLs de vídeo conforme solicitado) ---
  const longVideo = {
    id: 1,
    title: "Project Name Here",
    category: "Long Form",
    type: "horizontal",
    videoUrl: "",
  };

  const shortEdits = [
    {
      id: 2,
      title: "Short Edit #1",
      category: "Shorts",
      type: "vertical",
      videoUrl: "",
    },
    {
      id: 3,
      title: "Short Edit #2",
      category: "Shorts",
      type: "vertical",
      videoUrl: "",
    },
    {
      id: 4,
      title: "Short Edit #3",
      category: "Shorts",
      type: "vertical",
      videoUrl: "",
    },
  ];

  useEffect(() => {
    const handleScroll = () => setShowStickyHeader(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="bg-[#dcfce7] font-sans selection:bg-green-600 selection:text-white min-h-screen">
      <header
        className={`fixed top-0 z-[100] w-full py-4 px-4 md:px-6 transition-all duration-300 ${
          showStickyHeader
            ? "bg-white/80 backdrop-blur-md border-b-2 border-green-200"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto flex justify-between items-center">
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
          <nav className="flex gap-4 md:gap-6 font-black text-[#181922]/50 uppercase text-[10px] md:text-xs tracking-widest">
            <a href="/" className="hover:text-green-600 transition-colors">
              Hub
            </a>
            <a href="#edits" className="hover:text-green-600 transition-colors">
              Edits
            </a>
            <a
              href="#contact"
              className="hover:text-green-600 transition-colors"
            >
              Contact
            </a>
          </nav>
        </div>
      </header>

      <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden px-4">
        <div
          className="absolute inset-0 z-0 opacity-[0.05]"
          style={{
            backgroundImage: `linear-gradient(#166534 1px, transparent 1px), linear-gradient(90deg, #166534 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        ></div>

        <div className="relative z-10 text-center flex flex-col items-center w-full">
          <div className="relative w-32 h-32 sm:w-44 sm:h-44 md:w-52 md:h-52 bg-white border-[4px] md:border-[6px] border-[#181922] rounded-full overflow-hidden shadow-[8px_8px_0px_0px_#22c55e] mb-6 md:mb-8 animate-bounce">
            <Image
              src={YouBrenno}
              alt="YouBrenno"
              fill
              className="object-cover"
              priority
            />
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-[#181922] uppercase tracking-tighter mb-2 leading-none">
            YOUBRENNO
          </h1>
          <p className="text-green-700 font-bold uppercase tracking-[0.2em] md:tracking-[0.3em] text-[10px] sm:text-xs md:text-sm">
            Professional Minecraft Content Editor & Specialist
          </p>
        </div>
      </section>

      <section
        id="edits"
        className="py-16 md:py-24 px-4 md:px-6 max-w-6xl mx-auto flex flex-col items-center"
      >
        <div className="w-full flex items-center gap-3 md:gap-4 mb-12 md:mb-16 border-b-4 md:border-b-8 border-[#181922]/10 pb-4 md:pb-6">
          <div className="relative w-12 h-12 md:w-16 md:h-16 bg-white rounded-[1rem] md:rounded-[1.2rem] border-[3px] md:border-4 border-[#181922] shadow-[4px_4px_0px_0px_#22c55e] overflow-hidden shrink-0">
            <Image
              src={MinecraftLogo}
              alt="Minecraft"
              fill
              className="object-cover scale-[1.1]"
            />
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-[#181922] uppercase tracking-tighter">
            Minecraft
          </h2>
        </div>

        <div className="w-full flex justify-center text-[#181922] font-bold text-2xl pb-16 text-center text-balance">
          All videos have been edited for technical demonstration purposes ONLY.
        </div>

        <div className="w-full flex flex-col gap-12 md:gap-16">
          <VideoCard item={longVideo} greenShadow />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {shortEdits.map((item) => (
              <VideoCard key={item.id} item={item} greenShadow />
            ))}
          </div>
        </div>

        <div className="mt-20 flex flex-col items-center gap-8">
          {/* Texto atualizado conforme solicitado */}
          <p className="text-[#181922]/30 font-black uppercase tracking-[0.4em] text-sm md:text-base italic text-center">
            More videos coming soon
          </p>
          <a
            href="/"
            className="group relative inline-flex items-center justify-center px-8 py-4 font-black uppercase tracking-tighter text-black bg-white border-[3px] border-[#181922] rounded-full shadow-[6px_6px_0px_0px_#22c55e] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
          >
            View Full Editing Portfolio
          </a>
        </div>
      </section>

      <section
        id="contact"
        className="w-full bg-[#181922] py-20 md:py-32 px-6 flex flex-col items-center justify-center"
      >
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-5xl md:text-7xl font-black text-white mb-4 uppercase tracking-tighter italic">
            Work with me
          </h2>
          <p className="text-white/30 font-black uppercase tracking-[0.3em] text-xs">
            Available for Minecraft YouTube Channels
          </p>
        </div>

        <div className="w-full max-w-6xl flex flex-col md:flex-row items-center justify-center gap-10 md:gap-16">
          <div className="hidden md:block w-full border-4 border-white/10 rounded-[2.5rem] md:rounded-[3rem] overflow-hidden max-w-[400px] shadow-[20px_20px_0px_0px_rgba(255,255,255,0.05)]">
            <Image
              src={Personagem2}
              alt="Breno"
              width={600}
              height={600}
              className="w-full h-auto"
            />
          </div>
          <div className="w-full max-w-md flex flex-col gap-5 md:gap-6 font-black uppercase tracking-tighter">
            <ContactItem
              icon={Discord}
              label="Discord"
              value="@YouBrenno"
              href="https://discord.com/users/1449604904082473123"
            />
            <ContactItem
              icon={X}
              label="X Twitter"
              value="@YouBrenno_edits"
              href="https://x.com/YouBrenno_edits"
            />
            <ContactItem
              icon={Gmail}
              label="E-mail"
              value="ybrenno.contact@gmail.com"
              href="mailto:ybrenno.contact@gmail.com"
            />
          </div>
        </div>
      </section>
    </main>
  );
}

function VideoCard({
  item,
  greenShadow = false,
}: {
  item: any;
  greenShadow?: boolean;
}) {
  const shadowColor = greenShadow ? "#22c55e" : "#181922";

  return (
    <div className="group flex flex-col gap-4 w-full">
      <div
        className={`relative w-full bg-[#181922] border-[3px] md:border-4 border-[#181922] rounded-[2rem] md:rounded-[2.5rem] overflow-hidden transition-all group-hover:translate-x-1 group-hover:translate-y-1 group-hover:shadow-none ${
          item.type === "vertical" ? "aspect-[9/16]" : "aspect-video"
        }`}
        style={{ boxShadow: `8px 8px 0px 0px ${shadowColor}` }}
      >
        <div className="w-full h-full flex items-center justify-center bg-[#1e2029] group-hover:bg-[#252833] transition-colors">
          <div className="flex flex-col items-center gap-2 opacity-20">
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="1.5"
            >
              <path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            <span className="text-white font-black uppercase text-xs tracking-[0.2em]">
              Video Slot
            </span>
          </div>
        </div>

        <div className="absolute top-4 left-4 md:top-6 md:left-6 z-20 bg-white text-[#181922] text-[8px] md:text-[10px] font-black px-3 md:px-4 py-1 border-2 border-[#181922] rounded-full uppercase tracking-widest pointer-events-none">
          {item.category}
        </div>
      </div>
      <div className="mt-4 md:mt-8 px-2">
        <h3 className="text-2xl md:text-3xl font-black text-[#181922] uppercase tracking-tighter leading-tight">
          {item.title}
        </h3>
        <p className="text-[10px] md:text-xs font-black text-green-700/50 uppercase tracking-widest mt-1 italic">
          Project MINECRAFT-00{item.id}
        </p>
      </div>
    </div>
  );
}

function ContactItem({
  icon,
  label,
  value,
  href,
}: {
  icon: any;
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <div className="group flex items-center gap-3 md:gap-4 p-4 md:p-5 bg-white rounded-[1.5rem] md:rounded-[2rem] border-[3px] md:border-4 border-[#181922] shadow-[6px_6px_0px_0px_#22c55e] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none cursor-pointer">
      <div className="relative w-10 h-10 md:w-12 md:h-12 shrink-0 overflow-hidden rounded-lg md:rounded-xl border border-gray-100">
        <Image
          src={icon}
          alt={label}
          fill
          className="object-cover scale-[1.1]"
        />
      </div>
      <div className="overflow-hidden">
        <p className="text-[8px] md:text-[10px] text-gray-400 uppercase tracking-widest">
          {label}
        </p>
        <p className="text-base md:text-xl text-[#181922] truncate font-black">
          {value}
        </p>
      </div>
    </div>
  );
  return href ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className="w-full">
      {content}
    </a>
  ) : (
    content
  );
}
