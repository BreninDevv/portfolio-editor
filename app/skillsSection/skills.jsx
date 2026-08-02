"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

import Capcut from "../../public/capcut.png";
import Premiere from "../../public/premiere.png";
import AfterEffects from "../../public/aftereffects.png";
import MinecraftLogo from "../../public/minecraft.jpg";
import Youtube from "../../public/youtube.png";
import Shorts from "../../public/shorts.png";
import Personagem1 from "../../public/personagem1.png";

export default function Skills() {
  const canvasRef = useRef(null);
  const sectionRef = useRef(null);

  const skills = [
    {
      id: 1,
      name: "Premiere Pro",
      type: "Software",
      img: Premiere,
      fit: "contain",
      padding: "p-3",
    },
    {
      id: 2,
      name: "After Effects",
      type: "Software",
      img: AfterEffects,
      fit: "contain",
      padding: "p-3",
    },
    {
      id: 3,
      name: "CapCut",
      type: "Software",
      img: Capcut,
      fit: "contain",
      padding: "p-4",
    },
    {
      id: 4,
      name: "Flashback Mod",
      type: "Minecraft",
      img: MinecraftLogo,
      fit: "cover",
      padding: "p-0",
      imgScale: "scale-[0.80]",
    },
    {
      id: 5,
      name: "Short Form",
      type: "Format",
      img: Shorts,
      fit: "contain",
      padding: "p-4",
    },
    {
      id: 6,
      name: "Long Form",
      type: "Format",
      img: Youtube,
      fit: "contain",
      padding: "p-4",
    },
  ];

  // --- BACKGROUND GRID ESTÁTICO (desenhado uma única vez, sem animação nem mouse-tracking) ---
  useEffect(() => {
    const canvas = canvasRef.current;
    const wrapper = sectionRef.current;
    if (!canvas || !wrapper) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const spacing = 40;
    const lineColor = "rgba(24,25,34,0.32)";

    function turbulence(x, y) {
      // t fixo (0) — mesma curva "congelada" no formato que a animação teria em repouso
      const ox =
        Math.sin(x * 0.012) * Math.cos(y * 0.01) * 9 + Math.sin(x * 0.025) * 4;
      const oy =
        Math.cos(y * 0.013) * Math.sin(x * 0.009) * 9 + Math.cos(y * 0.02) * 4;
      return [ox, oy];
    }

    function warpPoint(x0, y0) {
      const [tx, ty] = turbulence(x0, y0);
      return [x0 + tx, y0 + ty];
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

    function drawStatic() {
      const dpr = window.devicePixelRatio || 1;
      const width = wrapper.clientWidth;
      const height = wrapper.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

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
    }

    drawStatic();
    window.addEventListener("resize", drawStatic);
    return () => window.removeEventListener("resize", drawStatic);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative w-full min-h-screen bg-[#c4a6f5] py-12 px-6 flex flex-col items-center justify-center overflow-hidden"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0 w-full h-full"
        style={{
          maskImage: "radial-gradient(circle, black 30%, transparent 95%)",
          WebkitMaskImage:
            "radial-gradient(circle, black 30%, transparent 95%)",
        }}
      />

      <div className="relative z-10 flex flex-col items-center w-full">
        <h2
          className="text-5xl md:text-6xl font-bold mb-12 md:mb-16 text-center uppercase tracking-tighter"
          style={{
            color: "#ffffff",
            textShadow:
              "0 0 18px rgba(255,255,255,0.6), 0 0 42px rgba(255,255,255,0.35)",
          }}
        >
          My Skills
        </h2>

        <div className="w-full max-w-6xl flex flex-col md:flex-row items-center justify-center gap-10 md:gap-14">
          <div className="hidden md:block w-full max-w-[340px] lg:max-w-[420px] hover:scale-110 duration-500 cursor-pointer transition-transform ease-out">
            <Image
              src={Personagem1}
              alt="Avatar"
              className="w-full h-auto object-contain"
              priority
            />
          </div>

          <div className="w-full max-w-2xl grid grid-cols-2 gap-y-10 gap-x-8">
            {skills.map((skill) => (
              <div
                key={skill.id}
                className="flex flex-col items-center group cursor-default"
              >
                <div
                  className={`w-24 h-24 md:w-36 md:h-36 bg-white rounded-2xl border-[3px] border-[#181922] shadow-[6px_6px_0px_0px_#181922] overflow-hidden flex items-center justify-center transition-all duration-300 group-hover:translate-x-1 group-hover:translate-y-1 group-hover:shadow-none cursor-pointer ${skill.padding}`}
                >
                  <Image
                    src={skill.img}
                    alt={skill.name}
                    className={`w-full h-full rounded-xl ${skill.fit === "cover" ? "object-cover" : "object-contain"} ${skill.imgScale || ""}`}
                  />
                </div>

                <div className="mt-4 text-center">
                  <h3 className="text-lg md:text-xl font-black text-[#181922] leading-tight uppercase tracking-tighter">
                    {skill.name}
                  </h3>
                  <p className="text-[10px] md:text-xs font-sans text-white font-bold uppercase tracking-widest mt-1">
                    {skill.type}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
