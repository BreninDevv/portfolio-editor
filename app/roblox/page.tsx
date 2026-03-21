"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

// Imports de Imagens
import YouBrenno from "../favicon.ico";
import RobloxLogo from "../../public/roblox.png";
import Personagem2 from "../../public/personagem2.png";
import Gmail from "../../public/gmail.webp";
import Discord from "../../public/discord.jpg";
import X from "../../public/x.png";

export default function RobloxNichePage() {
  const [showStickyHeader, setShowStickyHeader] = useState(false);

  const robloxEdits = [
    {
      id: 1,
      title: "Foltyn steal Speeds",
      category: "Shorts",
      type: "vertical",
      creator: "@Foltyn",
      videoUrl: "https://youtube.com/shorts/ZOmeZnelRmY",
    },
    {
      id: 2,
      title: "Blox Fruits PvP",
      category: "Shorts",
      type: "vertical",
      creator: "@YouBrenno",
      videoUrl: "",
    },
    {
      id: 3,
      title: "Intro Roblox Video",
      category: "Long Form",
      type: "horizontal",
      creator: "@Suetam",
      videoUrl: "https://youtu.be/UifySD1GzYU",
    },
    {
      id: 4,
      title: "Tower of Hell Run",
      category: "Shorts",
      type: "vertical",
      creator: "@YouBrenno",
      videoUrl: "",
    },
    {
      id: 5,
      title: "Adopt Me Trading",
      category: "Shorts",
      type: "vertical",
      creator: "@YouBrenno",
      videoUrl: "",
    },
    {
      id: 6,
      title: "Doors Full Gameplay",
      category: "Long Form",
      type: "horizontal",
      creator: "@YouBrenno",
      videoUrl: "",
    },
  ];

  useEffect(() => {
    const handleScroll = () => setShowStickyHeader(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="bg-[#d8b4fe] font-sans selection:bg-[#7e22ce] selection:text-white">
      {/* --- HEADER CORRIGIDO PARA MOBILE --- */}
      <header
        className={`fixed top-0 z-[100] w-full py-4 px-4 md:px-6 transition-all duration-300 ${showStickyHeader ? "bg-white/90 backdrop-blur-md border-b-2 border-[#7e22ce]" : "bg-transparent"}`}
      >
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-[#181922]">
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

          <nav className="flex gap-4 md:gap-6 font-black text-[#181922] uppercase text-[10px] md:text-xs tracking-widest">
            <a href="/" className="hover:text-[#7e22ce] transition-colors">
              Hub
            </a>
            <a href="#edits" className="hover:text-[#7e22ce] transition-colors">
              Edits
            </a>
            {/* Removido o 'hidden sm:block' para aparecer no Mobile */}
            <a
              href="#contact"
              className="hover:text-[#7e22ce] transition-colors"
            >
              Contact
            </a>
          </nav>
        </div>
      </header>

      {/* --- HERO SECTION --- */}
      <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden px-4">
        <div
          className="absolute inset-0 z-0 opacity-[0.1]"
          style={{
            backgroundImage: `linear-gradient(#7e22ce 1px, transparent 1px), linear-gradient(90deg, #7e22ce 1px, transparent 1px)`,
            backgroundSize: "clamp(40px, 10vw, 60px) clamp(40px, 10vw, 60px)",
          }}
        ></div>

        <div className="relative z-10 text-center flex flex-col items-center w-full">
          <div className="relative w-32 h-32 sm:w-44 sm:h-44 md:w-52 md:h-52 bg-white border-[4px] md:border-[6px] border-[#181922] rounded-full overflow-hidden shadow-[8px_8px_0px_0px_#181922] md:shadow-[10px_10px_0px_0px_#181922] mb-6 md:mb-8 animate-bounce">
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
          <p className="text-[#7e22ce] font-bold uppercase tracking-[0.2em] md:tracking-[0.3em] text-[10px] sm:text-xs md:text-sm">
            Professional Roblox Editor & Specialist
          </p>
        </div>
      </section>

      {/* --- VIDEOS SECTION --- */}
      <section
        id="edits"
        className="py-16 md:py-24 px-4 md:px-6 max-w-6xl mx-auto"
      >
        <div className="flex items-center gap-3 md:gap-4 mb-12 md:mb-16 border-b-4 md:border-b-8 border-[#181922] pb-4 md:pb-6">
          <div className="relative w-12 h-12 md:w-16 md:h-16 bg-white rounded-[1rem] md:rounded-[1.2rem] border-[3px] md:border-4 border-[#181922] shadow-[4px_4px_0px_0px_#181922] overflow-hidden shrink-0">
            <Image
              src={RobloxLogo}
              alt="Roblox"
              fill
              className="object-cover"
            />
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-[#181922] uppercase tracking-tighter">
            Selected Edits
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {robloxEdits.map((item) => (
            <VideoCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      {/* --- CONTACT SECTION --- */}
      <section
        id="contact"
        className="w-full bg-[#181922] py-20 md:py-32 px-6 flex flex-col items-center justify-center min-h-screen"
      >
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-5xl md:text-7xl font-black text-white mb-4 uppercase tracking-tighter italic">
            Work with me
          </h2>
          <p className="text-[#d8b4fe] font-black uppercase tracking-[0.3em] text-xs">
            Let's build your audience
          </p>
        </div>

        <div className="w-full max-w-6xl flex flex-col md:flex-row items-center justify-center gap-10 md:gap-16">
          <div className="hidden md:block w-full border-4 border-[#7e22ce] rounded-[3rem] overflow-hidden max-w-[400px] transition-transform hover:scale-[1.02] duration-500 shadow-[20px_20px_0px_0px_rgba(126,34,206,0.3)]">
            <Image
              src={Personagem2}
              alt="Breno"
              width={600}
              height={600}
              className="w-full h-auto scale-[1.02]"
            />
          </div>

          <div className="w-full max-w-md flex flex-col gap-5 md:gap-6 font-black uppercase tracking-tighter">
            <ContactItem icon={Discord} label="Discord" value="@YouBrenno" />
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

function VideoCard({ item }: { item: any }) {
  const getEmbedUrl = (url: string) => {
    if (!url) return null;
    let videoId = "";
    if (url.includes("shorts/"))
      videoId = url.split("shorts/")[1].split("?")[0];
    else if (url.includes("v=")) videoId = url.split("v=")[1].split("&")[0];
    else if (url.includes("youtu.be/"))
      videoId = url.split("youtu.be/")[1].split("?")[0];

    return videoId
      ? `https://www.youtube.com/embed/${videoId}?modestbranding=1&rel=0`
      : null;
  };

  const embedUrl = getEmbedUrl(item.videoUrl);

  return (
    <div className="group flex flex-col gap-4">
      <div
        className={`relative w-full bg-white border-[3px] md:border-4 border-[#181922] rounded-[2rem] md:rounded-[2.5rem] overflow-hidden shadow-[8px_8px_0px_0px_#181922] md:shadow-[12px_12px_0px_0px_#181922] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none ${item.type === "vertical" ? "aspect-[9/16]" : "aspect-video"}`}
      >
        {embedUrl ? (
          <iframe
            className="absolute inset-0 w-full h-full scale-[1.02] object-cover"
            src={embedUrl}
            title={item.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ border: 0 }}
          ></iframe>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-purple-100 px-6 text-center">
            <span className="text-[#d8b4fe] font-black uppercase text-lg italic">
              {item.title}
            </span>
          </div>
        )}
        <div className="absolute top-4 left-4 md:top-6 md:left-6 bg-[#7e22ce] text-white text-[8px] md:text-[10px] font-black px-3 md:px-4 py-1 border-2 border-[#181922] rounded-full uppercase tracking-widest pointer-events-none">
          {item.category}
        </div>
      </div>
      <div className="mt-4 md:mt-8 px-2">
        <h3 className="text-2xl md:text-3xl font-black text-[#181922] uppercase tracking-tighter leading-tight">
          {item.title}
        </h3>
        <p className="text-[10px] md:text-xs font-black text-[#7e22ce] uppercase tracking-widest mt-1 italic">
          Project RBX-00{item.id}
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
    <div className="group flex items-center gap-3 md:gap-4 p-4 md:p-5 bg-white rounded-[1.5rem] md:rounded-[2rem] border-[3px] md:border-4 border-[#181922] shadow-[6px_6px_0px_0px_#181922] md:shadow-[8px_8px_0px_0px_#181922] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none cursor-pointer">
      <div className="w-10 h-10 md:w-12 md:h-12 shrink-0">
        <Image
          src={icon}
          alt={label}
          width={48}
          height={48}
          className="rounded-lg md:rounded-xl"
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
