import Image from "next/image";

// Imports de Imagens
import Capcut from "../../public/capcut.png";
import Premiere from "../../public/premiere.png";
import AfterEffects from "../../public/aftereffects.png";
import MinecraftLogo from "../../public/minecraft.jpg";
import Youtube from "../../public/youtube.png";
import Shorts from "../../public/shorts.png";
import Personagem1 from "../../public/personagem1.png";

export default function Skills() {
  const skills = [
    {
      id: 1,
      name: "Premiere Pro",
      type: "Software",
      img: Premiere,
      fit: "contain",
      padding: "p-4",
    },
    {
      id: 2,
      name: "After Effects",
      type: "Software",
      img: AfterEffects,
      fit: "contain",
      padding: "p-4",
    },
    {
      id: 3,
      name: "CapCut",
      type: "Software",
      img: Capcut,
      fit: "contain",
      padding: "p-5",
    },
    // Replay Mod: Escala reduzida um pouco mais para alinhar visualmente com os outros ícones
    {
      id: 4,
      name: "Replay Mod",
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
      padding: "p-5",
    },
    {
      id: 6,
      name: "Long Form",
      type: "Format",
      img: Youtube,
      fit: "contain",
      padding: "p-5",
    },
  ];

  return (
    <section
      id="skills"
      className="relative w-full min-h-screen bg-[#61b8ff] py-12 px-6 flex flex-col items-center justify-center lg:pt-40 lg:pb-40 overflow-hidden"
    >
      {/* BACKGROUND GRID */}
      <div
        className="absolute inset-0 z-0 opacity-[0.7]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #4fa1e6 1px, transparent 1px),
            linear-gradient(to bottom, #4fa1e6 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
          maskImage: "radial-gradient(circle, black 30%, transparent 95%)",
        }}
      ></div>

      <div className="relative z-10 flex flex-col items-center w-full">
        {/* Título */}
        <h2 className="text-6xl font-bold text-[#181922] mb-20 text-center uppercase tracking-tighter">
          My Skills
        </h2>

        {/* Container Flex */}
        <div className="w-full max-w-6xl flex flex-col md:flex-row items-center justify-center gap-12">
          {/* Personagem Esquerda */}
          <div className="hidden md:block w-full max-w-[400px] lg:max-w-[500px] hover:scale-110 duration-500 cursor-pointer transition-transform ease-out">
            <Image
              src={Personagem1}
              alt="Avatar"
              className="w-full h-auto object-contain"
              priority
            />
          </div>

          {/* Grid de Skills Direita */}
          <div className="w-full max-w-2xl grid grid-cols-2 gap-y-12 gap-x-8">
            {skills.map((skill) => (
              <div
                key={skill.id}
                className="flex flex-col items-center group cursor-default"
              >
                {/* MOLDURA: Mantida com tamanho fixo para manter o grid alinhado */}
                <div
                  className={`w-24 h-24 md:w-40 md:h-40 bg-white rounded-2xl border-[3px] border-[#181922] shadow-[6px_6px_0px_0px_#181922] overflow-hidden flex items-center justify-center transition-all duration-300 group-hover:translate-x-1 group-hover:translate-y-1 group-hover:shadow-none cursor-pointer ${skill.padding}`}
                >
                  <Image
                    src={skill.img}
                    alt={skill.name}
                    className={`w-full h-full rounded-xl ${skill.fit === "cover" ? "object-cover" : "object-contain"} ${skill.imgScale || ""}`}
                  />
                </div>

                {/* TEXTOS */}
                <div className="mt-4 text-center">
                  <h3 className="text-xl md:text-2xl font-black text-[#181922] leading-tight uppercase tracking-tighter">
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
