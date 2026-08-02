"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import Personagem2 from "../../public/personagem2.png";
import Gmail from "../../public/gmail.webp";
import Discord from "../../public/discord.jpg";
import X from "../../public/x.png";

export default function Contact() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // --- BACKGROUND GRID ESTÁTICO (desenhado uma única vez) ---
  useEffect(() => {
    const canvas = canvasRef.current;
    const wrapper = sectionRef.current;
    if (!canvas || !wrapper) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const spacing = 40;
    const lineColor = "rgba(255,255,255,0.06)";

    function turbulence(x: number, y: number) {
      const ox =
        Math.sin(x * 0.012) * Math.cos(y * 0.01) * 6 + Math.sin(x * 0.025) * 3;
      const oy =
        Math.cos(y * 0.013) * Math.sin(x * 0.009) * 6 + Math.cos(y * 0.02) * 3;
      return [ox, oy];
    }

    function warpPoint(x0: number, y0: number) {
      const [tx, ty] = turbulence(x0, y0);
      return [x0 + tx, y0 + ty];
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

    function drawStatic() {
      const dpr = window.devicePixelRatio || 1;
      const width = wrapper!.clientWidth;
      const height = wrapper!.clientHeight;
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

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
    }

    drawStatic();
    window.addEventListener("resize", drawStatic);
    return () => window.removeEventListener("resize", drawStatic);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative w-full min-h-[600px] bg-[#1e1e1e] py-20 px-6 flex flex-col items-center justify-center overflow-hidden"
    >
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

      <div className="relative z-10 text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Let is Work Together!
        </h2>
        <p className="text-gray-400 font-sans uppercase tracking-[0.2em] text-sm">
          Available for new projects
        </p>
      </div>

      <div className="relative z-10 w-full max-w-6xl flex flex-col md:flex-row items-center justify-center gap-12 lg:gap-24">
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

        <div className="w-full max-w-md flex flex-col gap-6">
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
