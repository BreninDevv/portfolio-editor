"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import Personagem2 from "../../public/personagem2.png";
import Gmail from "../../public/gmail.webp";
import Discord from "../../public/discord.jpg";
import X from "../../public/x.png";

export default function Contact() {
  const canvasRef = useRef(null);
  const sectionRef = useRef(null);

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

    // grid claro e sutil sobre o fundo #1e1e1e
    const lineColor = "rgba(255,255,255,0.06)";
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
      id="contact"
      className="relative w-full min-h-[600px] bg-[#1e1e1e] py-20 px-6 flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Fundo: grid interativo */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{
          maskImage:
            "radial-gradient(ellipse 80% 65% at 50% 45%, black 0%, transparent 85%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 65% at 50% 45%, black 0%, transparent 85%)",
        }}
      />

      {/* Título de Chamada */}
      <div className="relative z-10 text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Let is Work Together!
        </h2>
        <p className="text-gray-400 font-sans uppercase tracking-[0.2em] text-sm">
          Available for new projects
        </p>
      </div>

      <div className="relative z-10 w-full max-w-6xl flex flex-col md:flex-row items-center justify-center gap-12 lg:gap-24">
        {/* ESPAÇO PARA O PERSONAGEM (Esquerda) */}
        <div className="hidden md:block w-full border-6  border-b-blue-800 border-r-blue-500 rounded-[3rem] z-20 max-w-[350px] lg:max-w-[450px] transition-transform duration-500 hover:rotate-2 cursor-pointer">
          <div className="w-full bg-white/5 rounded-[3rem] flex items-center justify-center scale-101">
            <Image
              src={Personagem2}
              alt="Personagem 2"
              width={1000}
              className="rounded-[3rem] z-10"
            />
          </div>
        </div>

        {/* BOTÕES DE CONTATO (Direita) */}
        <div className="w-full max-w-md flex flex-col gap-6">
          {/* Discord Button */}
          <a href="https://discord.com/users/1449604904082473123">
            <div className="group flex items-center gap-4 p-4 bg-white rounded-2xl border-[3px] border-white shadow-[6px_6px_0px_0px_rgba(88,101,242,0.5)] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none cursor-pointer">
              <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center overflow-hidden">
                <Image src={Discord} alt="Discord logo" />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                  Discord
                </p>
                <p className="text-xl font-bold text-[#181922]">@YouBrenno</p>
              </div>
            </div>
          </a>

          {/* X Button */}
          <div className="group flex items-center gap-4 bg-white rounded-2xl border-[3px] border-white shadow-[6px_6px_0px_0px_rgba(225,48,108,0.5)] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none cursor-pointer">
            <a
              href="https://x.com/YouBrenno_edits"
              className="flex items-center gap-4 p-4 pr-40"
              target="_blank"
            >
              <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center overflow-hidden">
                <Image src={X} alt="X logo" className="rounded-xl" />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                  X twitter
                </p>
                <p className="text-xl font-bold text-[#181922]">
                  @YouBrenno_edits
                </p>
              </div>
            </a>
          </div>

          {/* Email Button */}
          <div className="group flex items-center gap-4 bg-white rounded-2xl border-[3px] border-white shadow-[6px_6px_0px_0px_rgba(100,100,100,1)] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none cursor-pointer">
            <a
              href="mailto:ybrenno.contact@gmail.com"
              className="flex items-center gap-4 p-4 pr-10"
              target="_blank"
            >
              <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center overflow-hidden">
                <Image src={Gmail} alt="Gmail logo" />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                  E-mail
                </p>
                <p className="text-lg md:text-xl font-bold text-[#181922] break-all">
                  ybrenno.contact@gmail.com
                </p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
