"use client";

import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import RobloxLogo from "../../public/roblox.png";
import Minecraft from "../../public/minecraft.jpg";

export default function Showreel() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const nicheData = [
    {
      id: 1,
      title: "Roblox",
      slogan: "High-paced editing for maximum viewer retention.",
      icon: RobloxLogo,
    },
    {
      id: 2,
      title: "Minecraft",
      slogan: "High-quality videos with replay mod",
      icon: Minecraft,
    },
  ];

  const toggleAudio = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

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
      if (!canvas || !wrapper || !ctx) return;
      dpr = window.devicePixelRatio || 1;
      width = wrapper.clientWidth;
      height = wrapper.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener("resize", resize);

    function handleMouseMove(e: MouseEvent) {
      if (!wrapper) return;
      const rect = wrapper.getBoundingClientRect();
      targetMouseX = e.clientX - rect.left;
      targetMouseY = e.clientY - rect.top;
    }
    function handleMouseLeave() {
      targetMouseX = -9999;
      targetMouseY = -9999;
    }
    function handleTouchMove(e: TouchEvent) {
      if (!wrapper) return;
      const rect = wrapper.getBoundingClientRect();
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

    // linhas sutis em azul escuro, pontos em azul claro (mesma paleta do resto do site)
    const lineColor = "rgba(24,25,34,0.10)";
    const dotColor = "#3b82f6";

    function turbulence(x: number, y: number, time: number) {
      const ox =
        Math.sin(x * 0.012 + time * 0.6) * Math.cos(y * 0.01 - time * 0.4) * 6 +
        Math.sin(x * 0.025 - time * 0.3) * 3;
      const oy =
        Math.cos(y * 0.013 - time * 0.5) *
          Math.sin(x * 0.009 + time * 0.35) *
          6 +
        Math.cos(y * 0.02 + time * 0.25) * 3;
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
      if (points.length < 2 || !ctx) return;
      ctx.beginPath();
      ctx.moveTo(points[0][0], points[0][1]);
      for (let i = 0; i < points.length - 1; i++) {
        const p0 = points[i];
        const p1 = points[i + 1];
        const mx = (p0[0] + p1[0]) / 2;
        const my = (p0[1] + p1[1]) / 2;
        ctx.quadraticCurveTo(p0[0], p0[1], mx, my);
      }
      const last = points[points.length - 1];
      ctx.lineTo(last[0], last[1]);
      ctx.stroke();
    }

    function draw() {
      if (!ctx) return;
      mouseX += (targetMouseX - mouseX) * 0.15;
      mouseY += (targetMouseY - mouseY) * 0.15;
      const targetPresence = targetMouseX > -1000 ? 1 : 0;
      mousePresence += (targetPresence - mousePresence) * 0.08;
      t += 0.012;

      ctx.clearRect(0, 0, width, height);
      ctx.lineWidth = 1;
      ctx.strokeStyle = lineColor;
      ctx.lineJoin = "round";
      ctx.lineCap = "round";

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
              const alpha = (1 - dist0 / sinkRadius) * mousePresence * 0.55;
              ctx.globalAlpha = alpha;
              ctx.fillStyle = dotColor;
              ctx.beginPath();
              ctx.arc(wx, wy, 2, 0, Math.PI * 2);
              ctx.fill();
            }
          }
        }
        ctx.globalAlpha = 1;
      }

      rafId = requestAnimationFrame(draw);
    }
    draw();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      if (wrapper) {
        wrapper.removeEventListener("mousemove", handleMouseMove);
        wrapper.removeEventListener("mouseleave", handleMouseLeave);
        wrapper.removeEventListener("touchmove", handleTouchMove);
        wrapper.removeEventListener("touchend", handleTouchEnd);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="showreel"
      className="relative w-full min-h-screen flex flex-col items-center justify-center py-16 sm:py-20 md:py-24 px-4 sm:px-6 overflow-hidden"
      style={{
        background: "#dbeafe",
      }}
    >
      {/* Grid animado interativo (canvas) */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0 w-full h-full" />

      <div className="relative z-10 max-w-6xl w-full mx-auto flex flex-col items-center">
        <h2
          className="text-4xl sm:text-5xl md:text-7xl font-black uppercase tracking-tighter mb-8 sm:mb-12 md:mb-16 text-center"
          style={{
            color: "#181922",
            textShadow: "0 4px 12px rgba(24,25,34,0.08)",
          }}
        >
          INTRO
        </h2>

        <div className="relative w-full max-w-4xl">
          <div
            className="aspect-video border-2 border-[#181922] bg-[#111114] relative overflow-hidden shadow-[8px_8px_0px_0px_rgba(24,25,34,1)]"
            style={{
              borderRadius: "2.5rem",
              isolation: "isolate",
            }}
          >
            <video
              ref={videoRef}
              className="absolute inset-0 w-full h-full object-cover"
              style={{ borderRadius: "2.5rem" }}
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              controls={false}
              disablePictureInPicture
            >
              <source src="/videos/PortfolioIntro.mp4" type="video/mp4" />
              Seu navegador não suporta vídeos.
            </video>

            {/* Botão de Som Estilizado */}
            <button
              onClick={toggleAudio}
              className="absolute bottom-6 right-6 z-20 bg-[#181922]/90 hover:bg-[#181922] border border-white/20 text-[#F2EFE9] px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-md backdrop-blur-sm cursor-pointer"
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
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 sm:gap-8 md:gap-12 lg:gap-16 w-full max-w-4xl mt-12 sm:mt-16 md:mt-20">
          {nicheData.map((niche) => (
            <div
              key={niche.id}
              className="group flex flex-col items-center text-center w-full"
            >
              <div className="cursor-pointer relative w-24 h-24 sm:w-28 sm:h-28 md:w-36 md:h-36 lg:w-40 lg:h-40 bg-white border-[4px] border-[#181922] rounded-[2rem] overflow-hidden shadow-[8px_8px_0px_0px_rgba(24,25,34,1)] transition-all duration-300 group-hover:translate-x-2 group-hover:translate-y-2 group-hover:shadow-none">
                {niche.icon ? (
                  <Image
                    src={niche.icon}
                    alt={niche.title}
                    fill
                    sizes="(max-width: 768px) 112px, 160px"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-100 flex items-center justify-center px-4">
                    <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest leading-tight">
                      Logo Space
                    </span>
                  </div>
                )}
              </div>

              <div className="mt-5 sm:mt-6 md:mt-8 flex flex-col items-center w-full px-2">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-[#181922] uppercase tracking-tighter leading-none mb-2 sm:mb-3">
                  {niche.title}
                </h3>
                <p className="max-w-[220px] sm:max-w-[200px] md:max-w-[220px] text-sm sm:text-base md:text-lg font-sans text-[#181922] font-bold leading-tight italic opacity-90">
                  "{niche.slogan}"
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
