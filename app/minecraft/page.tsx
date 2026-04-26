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

  // --- DADOS ATUALIZADOS COM SEUS LINKS ---
  const longVideo = {
    id: 1,
    title: "Mongo Lucky Race!",
    category: "Long Form",
    type: "horizontal",
    // CORREÇÃO: Alterado de videoUrl para embedUrl e ajustado o link para formato de embed
    embedUrl: "https://www.youtube.com/embed/OVfPHesrALc", 
    handle: "@Mongo",
  };

  const shortEdits = [
    {
      id: 2,
      title: "Minecraft Edit",
      category: "Shorts",
      type: "vertical",
      embedUrl: "https://www.youtube.com/embed/VIzmj5Cce5A",
      handle: "@YouBrenno",
    },
    {
      id: 3,
      title: "Admin testing me...",
      category: "Shorts",
      type: "vertical",
      embedUrl: "https://www.youtube.com/embed/EqBoHQALr-g",
      handle: "@YouBrenno",
    },
    {
      id: 4,
      title: "Minecraft mysterious ☠",
      category: "Shorts",
      type: "vertical",
      embedUrl: "https://www.youtube.com/embed/yyzfZh7Vcio",
      handle: "@YouBrenno",
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

      {/* Hero Section */}
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
            Professional Minecraft Content Editor
          </p>
        </div>
      </section>

      {/* Edits Section */}
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

        <div className="w-full flex flex-col gap-12 md:gap-16">
          <VideoCard item={longVideo} greenShadow />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {shortEdits.map((item) => (
              <VideoCard key={item.id} item={item} greenShadow />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
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
          <div className="hidden md:block w-full border-4 border-white/10 rounded-[2.5rem] md:rounded-[3rem] overflow-hidden max-w-[400px]">
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
        className={`relative w-full bg-[#181922] border-[3px] md:border-4 border-[#181922] rounded-[2rem] md:rounded-[2.5rem] overflow-hidden transition-all ${
          item.type === "vertical" ? "aspect-[9/16]" : "aspect-video"
        }`}
        style={{ boxShadow: `8px 8px 0px 0px ${shadowColor}` }}
      >
        {item.embedUrl ? (
          <iframe
            src={item.embedUrl}
            className="w-full h-full"
            title={item.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-[#1e2029]">
            <span className="text-white/20 font-black uppercase text-xs tracking-[0.2em]">
              Video Slot
            </span>
          </div>
        )}

        <div className="absolute top-4 left-4 z-20 bg-white text-[#181922] text-[8px] md:text-[10px] font-black px-3 py-1 border-2 border-[#181922] rounded-full uppercase tracking-widest pointer-events-none">
          {item.category}
        </div>
      </div>
      <div className="px-2">
        <h3 className="text-2xl font-black text-[#181922] uppercase tracking-tighter leading-tight">
          {item.title}
        </h3>
        <p className="text-[13px] font-black text-green-700/50 uppercase mt-1 italic">
          {item.handle}
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
    <div className="group flex items-center gap-3 p-4 bg-white rounded-[1.5rem] border-[3px] border-[#181922] shadow-[6px_6px_0px_0px_#22c55e] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none cursor-pointer">
      <div className="relative w-10 h-10 shrink-0 overflow-hidden rounded-lg border border-gray-100">
        <Image src={icon} alt={label} fill className="object-cover" />
      </div>
      <div className="overflow-hidden">
        <p className="text-[8px] text-gray-400 uppercase tracking-widest">
          {label}
        </p>
        <p className="text-base text-[#181922] truncate font-black">{value}</p>
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