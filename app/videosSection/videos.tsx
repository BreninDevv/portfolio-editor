"use client";

import Image, { StaticImageData } from "next/image";
import { useState, useRef } from "react";

import YouBrenno from "../favicon.ico";
import RobloxLogo from "../../public/roblox.png";
import Minecraft from "../../public/minecraft.jpg";

// ==================== INTERFACES ====================
interface VideoItem {
  creator: string;
  title: string;
  category: string;
  type: "horizontal" | "vertical";
  videoUrl?: string;
  videoFile?: string;
}

interface FilterItem {
  key: "all" | "minecraft" | "roblox";
  label: string;
  icon?: StaticImageData;
}

// ==================== CONSTANTES ====================
const minecraftLongVideo: VideoItem = {
  creator: "@YouBrenno",
  title: "Minecraft Edit!",
  category: "Long Form",
  type: "horizontal",
  videoFile: "/videos/talvezfim_1.mp4",
};
const minecraftEdits: VideoItem[] = [
  {
    creator: "@YouBrenno",
    title: "Minecraft Edit",
    category: "Shorts",
    type: "vertical",
    videoUrl: "https://www.youtube.com/watch?v=VIzmj5Cce5A",
  },
  {
    creator: "@YouBrenno",
    title: "Admin testing me...",
    category: "Shorts",
    type: "vertical",
    videoUrl: "https://www.youtube.com/watch?v=EqBoHQALr-g",
  },
  {
    creator: "@YouBrenno",
    title: "Minecraft mysterious",
    category: "Shorts",
    type: "vertical",
    videoUrl: "https://www.youtube.com/watch?v=yyzfZh7Vcio",
  },
];

const robloxLongVideo: VideoItem = {
  creator: "@Dash",
  title: "Roblox Rivals 👑",
  category: "Long Form",
  type: "horizontal",
  videoFile: "/videos/RobloxRivalsEdit.mp4",
};

const robloxEdits: VideoItem[] = [
  {
    creator: "@Foltyn",
    title: "Foltyn steal Speeds",
    category: "Shorts",
    type: "vertical",
    videoUrl: "https://youtube.com/shorts/ZOmeZnelRmY",
  },
  {
    creator: "@Foltyn",
    title: "THE NEW DRAGON! ☠",
    category: "Shorts",
    type: "vertical",
    videoUrl: "https://youtube.com/shorts/pTPQ-OkzzDk",
  },
  {
    creator: "@Caylus",
    title: "Caylus Aura ☠",
    category: "Shorts",
    type: "vertical",
    videoUrl: "https://youtube.com/shorts/UaO3Sh-25iw",
  },
];

const filters: FilterItem[] = [
  { key: "all", label: "All" },
  { key: "minecraft", label: "Minecraft", icon: Minecraft },
  { key: "roblox", label: "Roblox", icon: RobloxLogo },
];

function getYoutubeId(url?: string): string | null {
  if (!url) return null;
  if (url.includes("youtube.com/embed/"))
    return url.split("embed/")[1].split("?")[0];
  if (url.includes("shorts/")) return url.split("shorts/")[1].split("?")[0];
  if (url.includes("v=")) return url.split("v=")[1].split("&")[0];
  if (url.includes("youtu.be/")) return url.split("youtu.be/")[1].split("?")[0];
  return null;
}

// ==================== COMPONENTE PRINCIPAL ====================
export default function Edits() {
  const [activeFilter, setActiveFilter] = useState<
    "all" | "minecraft" | "roblox"
  >("all");

  return (
    <>
      <style>{`
        @keyframes titleGlow {
          0%, 100% { text-shadow: 0 0 18px rgba(127,212,255,0.55), 0 0 40px rgba(127,212,255,0.25); }
          50%      { text-shadow: 0 0 26px rgba(127,212,255,0.75), 0 0 56px rgba(127,212,255,0.35); }
        }
        .title-glow {
          animation: titleGlow 3.2s ease-in-out infinite;
        }
      `}</style>

      <section
        id="edits"
        className="relative w-full overflow-x-hidden py-16 px-6 flex flex-col items-center"
        style={{ backgroundColor: "#050912" }}
      >
        {/* ── PERSONAGEM + TÍTULO ── */}
        <div className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 bg-white border-[4px] border-[#F2EFE9] rounded-full overflow-hidden shadow-[6px_6px_0px_0px_rgba(0,0,0,0.35)] mb-5 transition-transform duration-300 ease-out hover:scale-105">
          <Image
            src={YouBrenno}
            alt="YouBrenno Avatar"
            fill
            className="object-cover scale-[1.02]"
          />
        </div>

        <h2 className="title-glow text-4xl font-bold text-[#F2EFE9] mb-10 text-center uppercase tracking-tighter">
          Portfolio Videos
        </h2>

        {/* ── TABS DE FILTRO ── */}
        <div className="relative z-10 flex flex-wrap items-center justify-center gap-2 md:gap-3 mb-16">
          {filters.map((f) => {
            const isActive = activeFilter === f.key;
            return (
              <button
                key={f.key}
                onClick={() => setActiveFilter(f.key)}
                className={`relative flex items-center gap-2 px-5 py-2.5 rounded-xl border-[3px] font-bold uppercase text-xs md:text-sm tracking-widest transition-all ${
                  isActive
                    ? "bg-[#F2EFE9] text-[#0A1128] border-[#F2EFE9] shadow-[4px_4px_0px_0px_rgba(255,255,255,0.15)]"
                    : "bg-transparent text-[#F2EFE9] border-[#F2EFE9]/30 hover:border-[#F2EFE9]/70"
                }`}
              >
                {f.icon && (
                  <span className="relative w-4 h-4 rounded-sm overflow-hidden shrink-0">
                    <Image
                      src={f.icon}
                      alt={f.label}
                      fill
                      className="object-cover"
                    />
                  </span>
                )}
                {f.label}
              </button>
            );
          })}
        </div>

        {/* ── MINECRAFT ── */}
        {(activeFilter === "all" || activeFilter === "minecraft") && (
          <NicheSection
            title="Minecraft"
            icon={Minecraft}
            viewMoreHref="/minecraft"
          >
            <NicheLayout
              longVideo={minecraftLongVideo}
              shorts={minecraftEdits}
            />
          </NicheSection>
        )}

        {/* ── ROBLOX ── */}
        {(activeFilter === "all" || activeFilter === "roblox") && (
          <NicheSection title="Roblox" icon={RobloxLogo} viewMoreHref="/roblox">
            <NicheLayout longVideo={robloxLongVideo} shorts={robloxEdits} />
          </NicheSection>
        )}
      </section>
    </>
  );
}

function NicheLayout({
  longVideo,
  shorts,
}: {
  longVideo: VideoItem;
  shorts: VideoItem[];
}) {
  return (
    <div className="flex flex-col gap-10">
      <div className="w-full">
        <VideoCard item={longVideo} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
        {shorts.map((item, index) => (
          <VideoCard key={index} item={item} />
        ))}
      </div>
    </div>
  );
}

function NicheSection({
  title,
  icon,
  viewMoreHref = "#",
  children,
}: {
  title: string;
  icon?: StaticImageData;
  viewMoreHref?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="w-full max-w-6xl mb-24">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 border-b-2 border-[#F2EFE9]/15 pb-4 gap-4">
        <div className="flex items-center gap-4">
          {icon && (
            <div className="w-12 h-12 bg-white/5 rounded-lg border-2 border-[#F2EFE9]/30 flex items-center justify-center overflow-hidden shrink-0 relative">
              <Image
                src={icon}
                alt={`${title} icon`}
                fill
                className="object-cover scale-[1.1]"
              />
            </div>
          )}
          <h3 className="text-3xl font-bold text-[#F2EFE9] uppercase tracking-tighter leading-none">
            {title}
          </h3>
        </div>

        <a
          href={viewMoreHref}
          className="group flex items-center gap-2 text-[#F2EFE9] font-bold text-sm uppercase tracking-widest hover:opacity-70 transition-all cursor-pointer"
        >
          View More
          <span className="transition-transform group-hover:translate-x-1">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5 12H19M19 12L12 5M19 12L12 19"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </a>
      </div>

      {children}
    </div>
  );
}

function VideoCard({ item }: { item: VideoItem }) {
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const videoId = getYoutubeId(item.videoUrl);
  const embedUrl = videoId
    ? `https://www.youtube.com/embed/${videoId}?modestbranding=1&rel=0&iv_load_policy=3`
    : null;

  const toggleAudio = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="flex flex-col gap-3 group w-full">
      <div
        className={`relative w-full bg-[#0F1B3A] rounded-2xl border-2 border-[#F2EFE9]/15 overflow-hidden shadow-[6px_6px_0px_0px_rgba(0,0,0,0.35)] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none hover:border-[#F2EFE9]/40 ${
          item.type === "vertical" ? "aspect-[9/16]" : "aspect-video"
        }`}
      >
        {item.videoFile ? (
          <>
            <video
              ref={videoRef}
              className="absolute inset-0 w-full h-full object-cover"
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              controls={false}
              disablePictureInPicture
            >
              <source src={item.videoFile} type="video/mp4" />
              Seu navegador não suporta vídeos.
            </video>

            {/* Botão de Som no Cantinho */}
            <button
              onClick={toggleAudio}
              className="absolute bottom-4 right-4 z-20 bg-[#0A1128]/80 hover:bg-[#0A1128] border border-white/20 text-[#F2EFE9] px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-md backdrop-blur-sm cursor-pointer"
              title={isMuted ? "Ativar som" : "Desativar som"}
            >
              {isMuted ? (
                <>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                    <line x1="23" y1="9" x2="17" y2="15"></line>
                    <line x1="17" y1="9" x2="23" y2="15"></line>
                  </svg>
                  <span>Mute</span>
                </>
              ) : (
                <>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                  </svg>
                  <span>Sound On</span>
                </>
              )}
            </button>
          </>
        ) : embedUrl ? (
          <iframe
            className="absolute inset-0 w-full h-full"
            src={embedUrl}
            title={item.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ border: 0 }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-[#0F1B3A] text-[#F2EFE9]/40 font-sans italic p-6 text-center text-sm">
            {item.title} <br /> (Video URL not set)
          </div>
        )}

        <div className="absolute top-4 left-4 z-10 bg-[#0A1128]/90 text-[#F2EFE9] text-[10px] font-bold px-3 py-1 rounded-lg uppercase pointer-events-none border border-white/10">
          {item.category}
        </div>
      </div>

      <div className="px-2">
        <h4 className="font-bold text-[#F2EFE9] leading-tight line-clamp-1 text-xl">
          {item.title}
        </h4>
        <p className="text-xs font-sans text-[#F2EFE9]/50 font-bold uppercase tracking-widest mt-1">
          {item.creator}
        </p>
      </div>
    </div>
  );
}
