"use client";

import Image, { StaticImageData } from "next/image";
import { useState } from "react";

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
}

interface FilterItem {
  key: "all" | "minecraft" | "roblox";
  label: string;
  icon?: StaticImageData;
}

// ==================== CONSTANTS ====================
const minecraftLongVideo: VideoItem = {
  creator: "@YouBrenno",
  title: "Minecraft Edit!",
  category: "Long Form",
  type: "horizontal",
  videoUrl: "https://www.youtube.com/watch?v=r6FSyJpabZc",
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
  videoUrl:
    "https://www.youtube.com/watch?v=C4hA6atv5hk&list=PLl8Ya8sw1GHwCkqq6KLJxjC7aKJ_eieIZ",
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

// ==================== MAIN COMPONENT ====================
export default function Edits() {
  const [activeFilter, setActiveFilter] = useState<
    "all" | "minecraft" | "roblox"
  >("all");

  return (
    <section
      id="edits"
      className="relative w-full overflow-x-hidden py-24 px-6 md:px-12 flex flex-col items-center bg-[#070b16]"
    >
      {/* ── HEADER / TITLE SECTION ── */}
      <div className="flex flex-col items-center text-center mb-16">
        <div className="relative w-24 h-24 sm:w-28 sm:h-28 bg-[#0F1B3A] border-4 border-[#F2EFE9] rounded-full overflow-hidden shadow-[6px_6px_0px_0px_rgba(0,0,0,0.5)] mb-6 transition-transform duration-300 hover:scale-105">
          <Image
            src={YouBrenno}
            alt="YouBrenno Avatar"
            fill
            className="object-cover"
          />
        </div>

        <h2 className="text-4xl md:text-5xl font-extrabold text-[#F2EFE9] tracking-tight uppercase mb-3">
          Portfolio Videos
        </h2>
        <p className="text-sm md:text-base text-[#F2EFE9]/70 font-medium max-w-xl">
          High-retention edits tailored for top creators. Click to play.
        </p>
      </div>

      {/* ── FILTER TABS ── */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-16">
        {filters.map((f) => {
          const isActive = activeFilter === f.key;
          return (
            <button
              key={f.key}
              onClick={() => setActiveFilter(f.key)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl border-2 font-bold uppercase text-xs md:text-sm tracking-wider transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,0.4)] ${
                isActive
                  ? "bg-[#F2EFE9] text-[#070b16] border-[#F2EFE9] translate-x-0.5 translate-y-0.5 shadow-none"
                  : "bg-[#0F1B3A] text-[#F2EFE9] border-[#F2EFE9]/20 hover:border-[#F2EFE9]/60 hover:-translate-y-0.5"
              }`}
            >
              {f.icon && (
                <span className="relative w-4 h-4 rounded overflow-hidden shrink-0">
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

      {/* ── NICHE SECTIONS ── */}
      <div className="w-full max-w-6xl flex flex-col gap-20">
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

        {(activeFilter === "all" || activeFilter === "roblox") && (
          <NicheSection title="Roblox" icon={RobloxLogo} viewMoreHref="/roblox">
            <NicheLayout longVideo={robloxLongVideo} shorts={robloxEdits} />
          </NicheSection>
        )}
      </div>
    </section>
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
    <div className="flex flex-col gap-8">
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
    <div className="w-full flex flex-col gap-8">
      <div className="flex items-center justify-between border-b-2 border-[#F2EFE9]/10 pb-4">
        <div className="flex items-center gap-3">
          {icon && (
            <div className="w-10 h-10 rounded-lg border-2 border-[#F2EFE9]/20 overflow-hidden relative shrink-0 shadow-sm">
              <Image
                src={icon}
                alt={`${title} icon`}
                fill
                className="object-cover"
              />
            </div>
          )}
          <h3 className="text-2xl md:text-3xl font-extrabold text-[#F2EFE9] uppercase tracking-tight">
            {title}
          </h3>
        </div>

        <a
          href={viewMoreHref}
          className="group flex items-center gap-2 text-[#F2EFE9] font-bold text-xs md:text-sm uppercase tracking-wider hover:opacity-70 transition-all"
        >
          View More
          <span className="transition-transform group-hover:translate-x-1">
            →
          </span>
        </a>
      </div>

      {children}
    </div>
  );
}

function VideoCard({ item }: { item: VideoItem }) {
  const videoId = getYoutubeId(item.videoUrl);
  const embedUrl = videoId
    ? `https://www.youtube.com/embed/${videoId}?modestbranding=1&rel=0&iv_load_policy=3`
    : null;

  return (
    <div className="flex flex-col gap-3 group/card w-full">
      <div
        className={`relative w-full bg-[#0F1B3A] rounded-2xl border-2 border-[#F2EFE9]/20 overflow-hidden shadow-[6px_6px_0px_0px_rgba(0,0,0,0.4)] transition-all duration-300 hover:border-[#F2EFE9]/50 hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none ${
          item.type === "vertical" ? "aspect-[9/16]" : "aspect-video"
        }`}
      >
        {embedUrl ? (
          <iframe
            className="absolute inset-0 w-full h-full border-0"
            src={embedUrl}
            title={item.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-[#0F1B3A] text-[#F2EFE9]/40 font-sans italic p-6 text-center text-sm">
            {item.title} <br /> (Video URL not set)
          </div>
        )}

        <div className="absolute top-4 left-4 z-10 bg-[#070b16]/90 border border-[#F2EFE9]/20 text-[#F2EFE9] text-[10px] font-bold px-3 py-1 rounded-lg uppercase tracking-wider backdrop-blur-md pointer-events-none">
          {item.category}
        </div>
      </div>

      <div className="px-1">
        <h4 className="font-bold text-[#F2EFE9] text-lg md:text-xl leading-tight">
          {item.title}
        </h4>
        <p className="text-xs font-bold text-[#F2EFE9]/50 uppercase tracking-widest mt-1">
          {item.creator}
        </p>
      </div>
    </div>
  );
}
