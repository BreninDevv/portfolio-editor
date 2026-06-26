"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";

// Imports de Imagens (Certifique-se que os caminhos estão corretos no seu projeto)
import YouBrenno from "../favicon.ico";
import Premiere from "../../public/premiere.png";
import AfterEffects from "../../public/aftereffects.png";

export default function Hero() {
  const [menu, setMenu] = useState(false);
  const [showStickyHeader, setShowStickyHeader] = useState(false);
  const canvasRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      // Ativa o header fixo após 300px de scroll
      setShowStickyHeader(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // --- BACKGROUND GRID INTERATIVO (turbulencia + sink no mouse) ---
  useEffect(() => {
    const canvas = canvasRef.current;
    const wrapper = sectionRef.current;
    if (!canvas || !wrapper) return;
    const ctx = canvas.getContext("2d");

    let width, height, dpr;
    let mouseX = -9999,
      mouseY = -9999;
    let targetMouseX = -9999,
      targetMouseY = -9999;
    let mousePresence = 0;
    let t = 0;
    let rafId;

    const spacing = 40;
    const sinkRadius = 220;
    const maxPull = 0.65;

    function resize() {
      dpr = window.devicePixelRatio || 1;
      width = wrapper.clientWidth;
      height = wrapper.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener("resize", resize);

    function handleMouseMove(e) {
      const rect = wrapper.getBoundingClientRect();
      targetMouseX = e.clientX - rect.left;
      targetMouseY = e.clientY - rect.top;
    }
    function handleMouseLeave() {
      targetMouseX = -9999;
      targetMouseY = -9999;
    }
    function handleTouchMove(e) {
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

    // cor das arestas combinando com o #181922 usado no resto do hero
    const lineColor = "rgba(24,25,34,0.10)";
    const dotColor = "#7fd4ff";

    function turbulence(x, y, time) {
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

    function sink(x, y, mx, my, presence) {
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

    function warpPoint(x0, y0) {
      const [tx, ty] = turbulence(x0, y0, t);
      const bx = x0 + tx;
      const by = y0 + ty;
      const [sx, sy] = sink(bx, by, mouseX, mouseY, mousePresence);
      return [bx + sx, by + sy];
    }

    function strokeSmoothLine(points) {
      if (points.length < 2) return;
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
        const pts = [];
        for (let c = -2; c <= cols; c++) {
          const x0 = c * spacing - margin;
          pts.push(warpPoint(x0, y0));
        }
        strokeSmoothLine(pts);
      }

      for (let c = -2; c <= cols; c++) {
        const x0 = c * spacing - margin;
        const pts = [];
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
      wrapper.removeEventListener("mousemove", handleMouseMove);
      wrapper.removeEventListener("mouseleave", handleMouseLeave);
      wrapper.removeEventListener("touchmove", handleTouchMove);
      wrapper.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen bg-white font-sans selection:bg-[#181922] selection:text-white flex flex-col items-center justify-center overflow-hidden px-4"
    >
      {/* --- HEADER RESPONSIVO PADRONIZADO --- */}
      <header
        className={`fixed top-0 z-[100] w-full py-4 px-4 md:px-6 transition-all duration-300 ${showStickyHeader ? "bg-white/95 backdrop-blur-md border-b-2 border-[#181922]/10" : "bg-transparent"}`}
      >
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          {/* Logo e Nome */}
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

          {/* Nav Desktop - Agora com Skills */}
          <nav className="hidden md:flex gap-6 font-black text-[#181922]/50 uppercase text-xs tracking-widest">
            <a href="#" className="hover:text-[#181922] transition-colors">
              Home
            </a>
            <a
              href="#niches"
              className="hover:text-[#181922] transition-colors"
            >
              Niches
            </a>
            <a href="#edits" className="hover:text-[#181922] transition-colors">
              Edits
            </a>
            <a
              href="#skills"
              className="hover:text-[#181922] transition-colors"
            >
              Skills
            </a>
            <a
              href="#contact"
              className="hover:text-[#181922] transition-colors"
            >
              Contact
            </a>
          </nav>

          {/* Botão Hambúrguer Mobile */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMenu(true)}
          >
            <div className="w-6 h-1 bg-[#181922] rounded-full"></div>
            <div className="w-4 h-1 bg-[#181922] rounded-full self-end"></div>
          </button>
        </div>
      </header>

      {/* --- MENU MOBILE (SIDEBAR) --- */}
      <nav
        className={`fixed top-0 right-0 h-screen bg-white z-[110] shadow-2xl transition-all duration-300 md:hidden ${menu ? "w-64 translate-x-0" : "w-0 translate-x-full"} overflow-hidden border-l border-gray-100`}
      >
        <div className="p-6 flex justify-end">
          <button
            onClick={() => setMenu(false)}
            className="text-[#181922] font-black text-xs uppercase tracking-widest border-2 border-[#181922] px-4 py-2 rounded-full"
          >
            CLOSE
          </button>
        </div>
        <ul className="flex flex-col text-2xl p-8 gap-y-6 font-black text-[#181922] uppercase tracking-tighter">
          <li>
            <a href="#" onClick={() => setMenu(false)}>
              Home
            </a>
          </li>
          <li>
            <a href="#niches" onClick={() => setMenu(false)}>
              Niches
            </a>
          </li>
          <li>
            <a href="#edits" onClick={() => setMenu(false)}>
              Edits
            </a>
          </li>
          <li>
            <a href="#skills" onClick={() => setMenu(false)}>
              Skills
            </a>
          </li>
          <li>
            <a href="#contact" onClick={() => setMenu(false)}>
              Contact
            </a>
          </li>
        </ul>
      </nav>

      {/* Overlay do Menu Mobile */}
      {menu && (
        <div
          onClick={() => setMenu(false)}
          className="fixed inset-0 bg-black/40 z-[105] md:hidden backdrop-blur-sm"
        />
      )}

      {/* --- BACKGROUND GRID INTERATIVO --- */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0 w-full h-full" />

      {/* --- HERO CONTENT --- */}
      <div className="relative z-10 text-center flex flex-col items-center w-full max-w-4xl px-4">
        {/* Avatar Circular Centralizado */}
        <div className="relative w-32 h-32 sm:w-44 sm:h-44 md:w-52 md:h-52 bg-white border-[4px] md:border-[6px] border-[#181922] rounded-full overflow-hidden shadow-[8px_8px_0px_0px_#181922] mb-6 md:mb-8 animate-bounce">
          <Image
            src={YouBrenno}
            alt="YouBrenno"
            fill
            className="object-cover scale-[1.02]"
            priority
          />
        </div>

        {/* Nome Principal */}
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-[#181922] uppercase tracking-tighter mb-2 leading-none">
          YOUBRENNO
        </h1>

        {/* Subtítulo */}
        <p className="text-[#181922]/40 font-bold uppercase tracking-[0.2em] md:tracking-[0.3em] text-[10px] sm:text-xs md:text-sm mb-8">
          Professional <b className="text-blue-400">Video Editor</b> &{" "}
          <b className="text-blue-400">Specialist</b>
        </p>

        {/* Descrição Curta */}
      </div>
    </section>
  );
}
