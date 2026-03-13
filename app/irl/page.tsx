"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

// Imports de Imagens
import YouBrenno from "../favicon.ico";
import IRL_Logo from "../../public/roblox.png";
import Personagem2 from "../../public/personagem2.png";
import Gmail from "../../public/gmail.webp";
import Discord from "../../public/discord.jpg";
import X from "../../public/x.png";

export default function IRLNichePage() {
  const [showStickyHeader, setShowStickyHeader] = useState(false);

  const irlEdits = [
    {
      id: 1,
      title: "RAY U DID IT",
      category: "Shorts",
      type: "vertical",
      creator: "@RayLivee",
      videoUrl: "https://youtube.com/shorts/jk5R-tZOzME",
    },
    {
      id: 2,
      title: "RAY WOWED MRBEAST",
      category: "Shorts",
      type: "vertical",
      creator: "@RayLivee",
      videoUrl: "https://youtube.com/shorts/IsQTdMaliXM",
    },
    {
      id: 3,
      title: "RIGGIE 😂",
      category: "Shorts",
      type: "vertical",
      creator: "@TheTylilShowLivee",
      videoUrl: "https://youtube.com/shorts/gWuSqOVqf8k",
    },
    {
      id: 4,
      title: "I GIVE UP",
      category: "Shorts",
      type: "vertical",
      creator: "@Kai Cenat Live",
      videoUrl: "https://youtube.com/shorts/VMX5D0E-M80",
    },
    {
      id: 5,
      title: "RAY FIGHTS JON JONES",
      category: "Shorts",
      type: "vertical",
      creator: "@RayLivee",
      videoUrl: "https://youtube.com/shorts/7WLVm9_vHPM",
    },
    {
      id: 6,
      title: "RAY COWBOY ",
      category: "Shorts",
      type: "vertical",
      creator: "@RayLivee",
      videoUrl: "https://youtube.com/shorts/NtAxVjXfvwg",
    },
  ];

  useEffect(() => {
    const handleScroll = () => setShowStickyHeader(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="bg-[#93c5fd] font-sans selection:bg-[#1e40af] selection:text-white min-h-screen">
      {/* --- HEADER --- */}
      <header
        className={`fixed top-0 z-[100] w-full py-4 px-4 md:px-6 transition-all duration-300 ${showStickyHeader ? "bg-white/95 backdrop-blur-md border-b-2 border-[#1e40af]" : "bg-transparent"}`}
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
            <a href="/" className="hover:text-[#1e40af] transition-colors">
              Hub
            </a>
            <a href="#edits" className="hover:text-[#1e40af] transition-colors">
              Edits
            </a>
            <a
              href="#contact"
              className="hover:text-[#1e40af] transition-colors"
            >
              Contact
            </a>
          </nav>
        </div>
      </header>

      {/* --- HERO --- */}
      <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden px-4">
        <div
          className="absolute inset-0 z-0 opacity-[0.08]"
          style={{
            backgroundImage: `linear-gradient(#1e40af 1px, transparent 1px), linear-gradient(90deg, #1e40af 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        ></div>

        <div className="relative z-10 text-center flex flex-col items-center w-full">
          <div className="relative w-32 h-32 sm:w-44 sm:h-44 md:w-52 md:h-52 bg-white border-[4px] md:border-[6px] border-[#181922] rounded-full overflow-hidden shadow-[8px_8px_0px_0px_#181922] mb-6 md:mb-8 animate-bounce">
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
          <p className="text-[#1e40af] font-bold uppercase tracking-[0.2em] md:tracking-[0.3em] text-[10px] sm:text-xs md:text-sm">
            Professional IRL Stream Editor & Specialist
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
              src={IRL_Logo}
              alt="IRL Content"
              fill
              className="object-cover scale-[1.02]"
            />
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-[#181922] uppercase tracking-tighter">
            IRL Edits
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {irlEdits.map((item) => (
            <VideoCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      {/* --- CONTACT SECTION - Ajustado para não ser "engolido" --- */}
      <section
        id="contact"
        className="w-full bg-[#181922] py-20 md:py-32 px-6 flex flex-col items-center justify-center min-h-screen"
      >
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-5xl md:text-7xl font-black text-white mb-4 uppercase tracking-tighter italic">
            Work with me
          </h2>
          <p className="text-[#93c5fd] font-black uppercase tracking-[0.4em] text-xs">
            Let's build your audience
          </p>
        </div>

        <div className="w-full max-w-6xl flex flex-col md:flex-row items-center justify-center gap-10 md:gap-16">
          <div className="hidden md:block w-full border-4 border-[#1e40af] rounded-[3rem] overflow-hidden max-w-[400px] transition-transform hover:scale-[1.02] duration-500 shadow-[20px_20px_0px_0px_rgba(30,64,175,0.3)]">
            <Image
              src={Personagem2}
              alt="Breno"
              width={600}
              height={600}
              className="w-full h-auto scale-[1.02]"
            />
          </div>

          <div className="w-full max-w-md flex flex-col gap-5 md:gap-6 font-black uppercase tracking-tighter">
            <div className="group flex items-center gap-4 p-5 bg-white rounded-[2rem] border-4 border-[#181922] shadow-[8px_8px_0px_0px_#181922] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none cursor-pointer">
              <Image
                src={Discord}
                alt="Discord"
                width={48}
                height={48}
                className="rounded-xl shrink-0"
              />
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  Discord
                </p>
                <p className="text-lg md:text-xl font-black text-[#181922]">
                  @YouBrenno
                </p>
              </div>
            </div>

            <a
              href="https://x.com/YouBrenno_edits"
              target="_blank"
              className="group flex items-center gap-4 p-5 bg-white rounded-[2rem] border-4 border-[#181922] shadow-[8px_8px_0px_0px_#181922] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none cursor-pointer"
            >
              <Image
                src={X}
                alt="X"
                width={48}
                height={48}
                className="rounded-xl shrink-0"
              />
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  X Twitter
                </p>
                <p className="text-lg md:text-xl font-black text-[#181922]">
                  @YouBrenno_edits
                </p>
              </div>
            </a>

            <a
              href="mailto:ybrenno.contact@gmail.com"
              className="group flex items-center gap-4 p-5 bg-white rounded-[2rem] border-4 border-[#181922] shadow-[8px_8px_0px_0px_#181922] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none cursor-pointer"
            >
              <Image
                src={Gmail}
                alt="Email"
                width={48}
                height={48}
                className="rounded-xl shrink-0"
              />
              <div className="overflow-hidden">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  E-mail
                </p>
                <p className="text-base md:text-lg font-black text-[#181922] truncate">
                  ybrenno.contact@gmail.com
                </p>
              </div>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

// O componente VideoCard permanece o mesmo para garantir o funcionamento dos embeds
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
      ? `https://www.youtube.com/embed/${videoId}?modestbranding=1&rel=0&iv_load_policy=3`
      : null;
  };

  const embedUrl = getEmbedUrl(item.videoUrl);

  return (
    <div className="flex flex-col gap-4 group">
      <div className="relative w-full bg-[#181922] rounded-[2rem] border-[3px] border-[#181922] overflow-hidden shadow-[8px_8px_0px_0px_rgba(24,25,34,1)] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none aspect-[9/16]">
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
          <div className="w-full h-full flex items-center justify-center text-gray-400 font-sans italic p-6 text-center text-sm">
            {item.title} <br /> (Video URL not set)
          </div>
        )}
        <div className="absolute top-4 left-4 z-10 bg-[#181922] text-white text-[10px] font-bold px-3 py-1 rounded-lg uppercase pointer-events-none border border-white/10">
          {item.category}
        </div>
      </div>
      <div className="px-2">
        <h4 className="text-2xl font-bold text-[#181922] leading-tight line-clamp-1">
          {item.title}
        </h4>
        <p className="text-xs font-sans text-gray-500 font-bold uppercase tracking-widest mt-1">
          {item.creator}
        </p>
      </div>
    </div>
  );
}
