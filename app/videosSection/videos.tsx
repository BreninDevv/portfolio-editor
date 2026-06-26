"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import RobloxLogo from "../../public/roblox.png";
import Dark from "../../public/dark.png";
import IRL from "../../public/irl.png";
import Minecraft from "../../public/minecraft.jpg";

export default function Edits() {
  const robloxLongVideo = {
    creator: "@Dash",
    title: "Roblox Rivals 👑",
    category: "Long Form",
    type: "horizontal",
    videoUrl: "https://www.youtube.com/watch?v=C4hA6atv5hk",
  };

  const robloxEdits = [
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

  const irlEdits = [
    {
      creator: "@RayLivee",
      title: "RAY U DID IT",
      category: "Shorts",
      type: "vertical",
      videoUrl: "https://youtube.com/shorts/jk5R-tZOzME",
    },
    {
      creator: "@RayLivee",
      title: "RAY WOWED MRBEAST",
      category: "Shorts",
      type: "vertical",
      videoUrl: "https://youtube.com/shorts/IsQTdMaliXM",
    },
    {
      creator: "@TheTylilShowLivee",
      title: "RIGGIE 😂",
      category: "Shorts",
      type: "vertical",
      videoUrl: "https://youtube.com/shorts/gWuSqOVqf8k",
    },
  ];

  const minecraftLongVideo = {
    creator: "@Mongo",
    title: "MONGO LUCKY RACE!",
    category: "Long Form",
    type: "horizontal",
    videoUrl: "https://www.youtube.com/embed/OVfPHesrALc",
  };

  const minecraftEdits = [
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

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // --- BACKGROUND GRID INTERATIVO (turbulencia + sink no mouse) ---
  useEffect(() => {
    const canvas = canvasRef.current;
    const wrapper = sectionRef.current;
    if (!canvas || !wrapper) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width: number, height: number, dpr: number;
    let mouseX = -9999,
      mouseY = -9999;
    let targetMouseX = -9999,
      targetMouseY = -9999;
    let mousePresence = 0;
    let t = 0;
    let rafId: number;

    const spacing = 40;
    const sinkRadius = 220;
    const maxPull = 0.65;

    function resize() {
      dpr = window.devicePixelRatio || 1;
      width = wrapper!.clientWidth;
      height = wrapper!.clientHeight;
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener("resize", resize);

    function handleMouseMove(e: MouseEvent) {
      const rect = wrapper!.getBoundingClientRect();
      targetMouseX = e.clientX - rect.left;
      targetMouseY = e.clientY - rect.top;
    }
    function handleMouseLeave() {
      targetMouseX = -9999;
      targetMouseY = -9999;
    }
    function handleTouchMove(e: TouchEvent) {
      const rect = wrapper!.getBoundingClientRect();
      const touch = e.touches[0];
      targetMouseX = touch.clientX - rect.left;
      targetMouseY = touch.clientY - rect.top;
    }
    function handleTouchEnd() {
      targetMouseX = -9999;
      targetMouseY = -9999;
    }

    wrapper.addEventListener("mousemove", handleMouseMove);
    wrapper.addEventListener("mouseleave", handleMouseLeave);
    wrapper.addEventListener("touchmove", handleTouchMove, { passive: true });
    wrapper.addEventListener("touchend", handleTouchEnd);

    // grid escuro sutil sobre o fundo claro #F2EFE9
    const lineColor = "rgba(24,25,34,0.16)";
    const dotColor = "#181922";

    function turbulence(x: number, y: number, time: number) {
      const ox =
        Math.sin(x * 0.012 + time * 0.6) * Math.cos(y * 0.01 - time * 0.4) * 9 +
        Math.sin(x * 0.025 - time * 0.3) * 4;
      const oy =
        Math.cos(y * 0.013 - time * 0.5) *
          Math.sin(x * 0.009 + time * 0.35) *
          9 +
        Math.cos(y * 0.02 + time * 0.25) * 4;
      return [ox, oy];
    }

    function sink(
      x: number,
      y: number,
      mx: number,
      my: number,
      presence: number,
    ) {
      if (presence <= 0.001) return [0, 0];
      const dx = mx - x;
      const dy = my - y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist > sinkRadius || dist < 0.0001) return [0, 0];
      const t2 = 1 - dist / sinkRadius;
      const falloff = t2 * t2 * (3 - 2 * t2);
      const travel = dist * falloff * maxPull * presence;
      return [(dx / dist) * travel, (dy / dist) * travel];
    }

    function warpPoint(x0: number, y0: number) {
      const [tx, ty] = turbulence(x0, y0, t);
      const bx = x0 + tx;
      const by = y0 + ty;
      const [sx, sy] = sink(bx, by, mouseX, mouseY, mousePresence);
      return [bx + sx, by + sy];
    }

    function strokeSmoothLine(points: number[][]) {
      if (points.length < 2) return;
      ctx!.beginPath();
      ctx!.moveTo(points[0][0], points[0][1]);
      for (let i = 0; i < points.length - 1; i++) {
        const p0 = points[i];
        const p1 = points[i + 1];
        const mx = (p0[0] + p1[0]) / 2;
        const my = (p0[1] + p1[1]) / 2;
        ctx!.quadraticCurveTo(p0[0], p0[1], mx, my);
      }
      const last = points[points.length - 1];
      ctx!.lineTo(last[0], last[1]);
      ctx!.stroke();
    }

    function draw() {
      mouseX += (targetMouseX - mouseX) * 0.15;
      mouseY += (targetMouseY - mouseY) * 0.15;
      const targetPresence = targetMouseX > -1000 ? 1 : 0;
      mousePresence += (targetPresence - mousePresence) * 0.08;
      t += 0.012;

      ctx!.clearRect(0, 0, width, height);
      ctx!.lineWidth = 1;
      ctx!.strokeStyle = lineColor;
      ctx!.lineJoin = "round";
      ctx!.lineCap = "round";

      const margin = spacing * 2;
      const cols = Math.ceil((width + margin * 2) / spacing);
      const rows = Math.ceil((height + margin * 2) / spacing);

      for (let r = -2; r <= rows; r++) {
        const y0 = r * spacing - margin;
        const pts: number[][] = [];
        for (let c = -2; c <= cols; c++) {
          const x0 = c * spacing - margin;
          pts.push(warpPoint(x0, y0));
        }
        strokeSmoothLine(pts);
      }

      for (let c = -2; c <= cols; c++) {
        const x0 = c * spacing - margin;
        const pts: number[][] = [];
        for (let r = -2; r <= rows; r++) {
          const y0 = r * spacing - margin;
          pts.push(warpPoint(x0, y0));
        }
        strokeSmoothLine(pts);
      }

      if (mousePresence > 0.01) {
        for (let r = -2; r <= rows; r++) {
          for (let c = -2; c <= cols; c++) {
            const x0 = c * spacing - margin;
            const y0 = r * spacing - margin;
            const dist0 = Math.hypot(x0 - mouseX, y0 - mouseY);
            if (dist0 < sinkRadius) {
              const [wx, wy] = warpPoint(x0, y0);
              const alpha = (1 - dist0 / sinkRadius) * mousePresence * 0.5;
              ctx!.globalAlpha = alpha;
              ctx!.fillStyle = dotColor;
              ctx!.beginPath();
              ctx!.arc(wx, wy, 2, 0, Math.PI * 2);
              ctx!.fill();
            }
          }
        }
        ctx!.globalAlpha = 1;
      }

      rafId = requestAnimationFrame(draw);
    }
    draw();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      wrapper.removeEventListener("mousemove", handleMouseMove);
      wrapper.removeEventListener("mouseleave", handleMouseLeave);
      wrapper.removeEventListener("touchmove", handleTouchMove);
      wrapper.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  return (
    <>
      <style>{`
        @keyframes grain {
          0%, 100% { transform: translate(0, 0); }
          10%       { transform: translate(-2%, -3%); }
          20%       { transform: translate(3%, 2%); }
          30%       { transform: translate(-1%, 4%); }
          40%       { transform: translate(4%, -1%); }
          50%       { transform: translate(-3%, 3%); }
          60%       { transform: translate(2%, -4%); }
          70%       { transform: translate(-4%, 1%); }
          80%       { transform: translate(1%, -2%); }
          90%       { transform: translate(3%, 4%); }
        }
        .grain-layer {
          animation: grain 0.8s steps(1) infinite;
        }
        @keyframes iconPop {
          0%   { transform: scale(1) rotate(0deg); }
          30%  { transform: scale(1.25) rotate(-6deg); }
          55%  { transform: scale(0.92) rotate(4deg); }
          75%  { transform: scale(1.1) rotate(-2deg); }
          100% { transform: scale(1) rotate(0deg); }
        }
        .icon-pop:hover {
          animation: iconPop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        @keyframes shortIn {
          0% { opacity: 0; transform: translateX(14%) scale(0.96); }
          100% { opacity: 1; transform: translateX(0) scale(1); }
        }
        .animate-shortIn {
          animation: shortIn 0.4s cubic-bezier(0.22, 1, 0.36, 1);
        }
      `}</style>

      <section
        ref={sectionRef}
        id="edits"
        className="relative w-full overflow-hidden py-16 px-6 flex flex-col items-center"
        style={{ backgroundColor: "#F2EFE9" }}
      >
        {/* ── GRID INTERATIVO ── */}
        <canvas
          ref={canvasRef}
          className="pointer-events-none absolute inset-0 z-0 w-full h-full"
        />

        {/* ── GRAIN TEXTURE ── */}
        <div
          className="grain-layer pointer-events-none absolute z-0"
          style={{
            inset: "-50%",
            width: "200%",
            height: "200%",
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
            backgroundSize: "300px 300px",
            opacity: 0.55,
          }}
        />

        {/* ── RADIAL VIGNETTE (escurece bordas levemente) ── */}
        <div
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            background:
              "radial-gradient(ellipse 100% 80% at 50% 50%, transparent 40%, rgba(24,25,34,0.06) 100%)",
          }}
        />

        {/* ── GLOW TOPO ── */}
        <div
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            backgroundImage:
              "radial-gradient(ellipse 70% 40% at 50% -5%, rgba(56,189,248,0.10) 0%, transparent 70%)",
          }}
        />

        {/* ── CONTEÚDO ── */}
        <h2 className="relative z-10 text-4xl font-bold text-[#181922] mb-16 text-center uppercase tracking-tighter">
          My Best Edits
        </h2>

        <NicheSection title="Roblox" icon={RobloxLogo} viewMoreHref="/roblox">
          <div className="flex justify-center text-[#181922] font-bold text-2xl pb-10 text-center">
            All videos have been edited for technical demonstration purposes
            ONLY.
          </div>
          <NicheLayout longVideo={robloxLongVideo} shorts={robloxEdits} />
        </NicheSection>

        <NicheSection
          title="Minecraft"
          icon={Minecraft}
          viewMoreHref="/minecraft"
        >
          <div className="flex justify-center text-[#181922] font-bold text-2xl pb-10 text-center">
            All videos have been edited for technical demonstration purposes
            ONLY.
          </div>
          <NicheLayout longVideo={minecraftLongVideo} shorts={minecraftEdits} />
        </NicheSection>

        <NicheSection title="IRL Stream" icon={IRL} viewMoreHref="/irl">
          <div className="flex justify-center text-[#181922] font-bold text-2xl pb-10 text-center">
            All videos have been edited for technical demonstration purposes
            ONLY.
          </div>
          <NicheLayout longVideo={null} shorts={irlEdits} />
        </NicheSection>
      </section>
    </>
  );
}

function NicheLayout({
  longVideo,
  shorts,
}: {
  longVideo: any | null;
  shorts: any[];
}) {
  if (!longVideo) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
        {shorts.map((item, index) => (
          <VideoCard key={index} item={item} />
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-10">
      <div className="w-full">
        <VideoCard item={longVideo} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
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
  icon?: any;
  viewMoreHref?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative z-10 w-full max-w-6xl mb-24">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 border-b-4 border-[#181922] pb-4 gap-4">
        <div className="flex items-center gap-4">
          {icon && (
            <div className="icon-pop w-12 h-12 bg-gray-100 rounded-lg border-2 border-[#181922] flex items-center justify-center overflow-hidden shrink-0 relative cursor-pointer">
              <Image
                src={icon}
                alt={`${title} icon`}
                fill
                className="object-cover scale-[1.1]"
              />
            </div>
          )}
          <h3 className="text-3xl font-bold text-[#181922] uppercase tracking-tighter leading-none">
            {title}
          </h3>
        </div>

        <a
          href={viewMoreHref}
          className="group flex items-center gap-2 text-[#181922] font-bold text-sm uppercase tracking-widest hover:opacity-70 transition-all cursor-pointer"
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

function VideoCard({
  item,
  compact = false,
  dimmed = false,
  fillHeight = false,
}: {
  item: any;
  compact?: boolean;
  dimmed?: boolean;
  fillHeight?: boolean;
}) {
  const getEmbedUrl = (url: string) => {
    if (!url) return null;
    if (url.includes("youtube.com/embed/")) return url;
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
    <div
      className="flex flex-col gap-3 group w-full"
      style={{ opacity: dimmed ? 0.18 : 1 }}
    >
      <div
        className={`
          relative w-full bg-[#181922] rounded-[2rem] border-[3px] border-[#181922] overflow-hidden
          shadow-[8px_8px_0px_0px_rgba(24,25,34,1)] transition-all
          ${!dimmed ? "hover:translate-x-1 hover:translate-y-1 hover:shadow-none" : ""}
          ${
            item.type === "vertical"
              ? fillHeight
                ? "aspect-[9/16] md:aspect-auto md:h-full md:min-h-[480px]"
                : "aspect-[9/16]"
              : "aspect-video"
          }
        `}
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
          <div className="w-full h-full flex items-center justify-center bg-[#1e2029] text-gray-400 font-sans italic p-6 text-center text-sm">
            {item.title} <br /> (Video URL not set)
          </div>
        )}
        <div className="absolute top-4 left-4 z-10 bg-[#181922] text-white text-[10px] font-bold px-3 py-1 rounded-lg uppercase pointer-events-none border border-white/10">
          {item.category}
        </div>
      </div>

      <div className="px-2">
        <h4
          className={`font-bold text-[#181922] leading-tight line-clamp-1 ${
            compact ? "text-lg" : "text-2xl"
          }`}
        >
          {item.title}
        </h4>
        <p className="text-xs font-sans text-gray-600 font-bold uppercase tracking-widest mt-1">
          {item.creator}
        </p>
      </div>
    </div>
  );
}
