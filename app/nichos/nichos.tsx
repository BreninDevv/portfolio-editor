"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import RobloxLogo from "../../public/roblox.png";
import Twitch from "../../public/twitch.png";
import Minecraft from "../../public/minecraft.jpg";

export default function Niches() {
  // CORREÇÃO: Adicionada a tipagem correta para os elementos HTML correspondentes
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

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
    {
      id: 3,
      title: "IRL Stream",
      slogan: "I turn IRL stream moments into highlights.",
      icon: Twitch,
    },
  ];

  // --- BACKGROUND GRID INTERATIVO (turbulencia + sink no mouse) ---
  useEffect(() => {
    const canvas = canvasRef.current;
    const wrapper = sectionRef.current;
    if (!canvas || !wrapper) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return; // Verificação de segurança para o contexto 2D

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

    // grid escuro sutil sobre o fundo azul #61b8ff, igual ao grid estatico que estava aqui
    const lineColor = "rgba(24,25,34,0.18)";
    const dotColor = "#7fd4ff";

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
      ctx.lineWidth = 1.2;
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
      id="niches"
      className="relative w-full min-h-screen md:h-screen bg-[#61b8ff] flex flex-col items-center justify-center py-20 px-6 overflow-hidden"
    >
      {/* GRID BACKGROUND INTERATIVO */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{
          WebkitMaskImage:
            "radial-gradient(circle, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 85%)",
          maskImage:
            "radial-gradient(circle, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 85%)",
        }}
      />

      <div className="relative max-w-6xl w-full mx-auto flex flex-col items-center">
        {/* TÍTULO DA SEÇÃO */}
        <h2 className="text-5xl md:text-7xl font-black text-[#181922] uppercase tracking-tighter mb-16 md:mb-24 text-center">
          Main Niches
        </h2>

        {/* GRID DE NICHOS */}
        <div className=" grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-12 lg:gap-20 w-full">
          {nicheData.map((niche) => (
            <div
              key={niche.id}
              className="group flex flex-col items-center text-center w-full"
            >
              {/* MOLDURA DA LOGO */}
              <div className="cursor-pointer relative w-32 h-32 md:w-40 lg:w-44 md:h-40 lg:h-44 bg-white border-[4px] border-[#181922] rounded-[2.5rem] overflow-hidden shadow-[10px_10px_0px_0px_rgba(24,25,34,1)] transition-all duration-300 group-hover:translate-x-2 group-hover:translate-y-2 group-hover:shadow-none">
                {niche.icon ? (
                  <Image
                    src={niche.icon}
                    alt={niche.title}
                    fill
                    sizes="(max-width: 768px) 128px, 176px"
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

              {/* TEXTOS */}
              <div className="mt-8 md:mt-12 flex flex-col items-center w-full px-2">
                <h3 className="text-3xl lg:text-4xl font-black text-[#181922] uppercase tracking-tighter leading-none mb-4">
                  {niche.title}
                </h3>
                <p className="max-w-[240px] md:max-w-[260px] text-base lg:text-lg font-sans text-[#181922] font-bold leading-tight italic opacity-90">
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
