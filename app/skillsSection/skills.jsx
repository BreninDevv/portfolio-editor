import Image from "next/image";
import Capcut from "../../public/capcut.png";
import Premiere from "../../public/premiere.png";
import AfterEffects from "../../public/aftereffects.png";
import Tiktok from "../../public/tiktok.png";
import Youtube from "../../public/youtube.png";
import Shorts from "../../public/shorts.png";
import Personagem1 from "../../public/personagem1.png";

export default function Skills() {
  const skills = [
    { id: 1, name: "CapCut", type: "Software", img: Capcut },
    { id: 2, name: "After Effects", type: "Software", img: AfterEffects },
    { id: 3, name: "Premiere Pro", type: "Software", img: Premiere },
    { id: 4, name: "TikTok", type: "Format", img: Tiktok },
    { id: 5, name: "Short Form", type: "Format", img: Shorts },
    { id: 6, name: "Long Form", type: "Format", img: Youtube },
  ];

  return (
    /* Seção com posição relativa para o grid funcionar */
    <section className="relative w-full min-h-screen bg-[#61b8ff] py-12 px-6 flex flex-col items-center justify-center lg:pt-40 lg:pb-40 overflow-hidden pb-35">
      {/* BACKGROUND GRID - Azul sutil para combinar com o fundo */}
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

      {/* Conteúdo z-10 para ficar acima do grid */}
      <div className="relative z-10 flex flex-col items-center w-full">
        {/* Título centralizado */}
        <h2 className="text-6xl font-bold font-comic text-[#181922] mb-20 text-center ">
          My Skills
        </h2>

        {/* Container Flex: Personagem na esquerda, Grid na direita */}
        <div className="w-full max-w-6xl flex flex-col md:flex-row items-center justify-center gap-12">
          {/* Personagem */}
          <div className="hidden md:block w-full max-w-[400px] lg:max-w-[500px] hover:scale-110 duration-300 cursor-pointer">
            <Image
              src={Personagem1}
              alt="Personagem 1"
              className="w-full h-auto object-contain"
              priority
            />
          </div>

          {/* Grid de Skills */}
          <div className="w-full max-w-2xl grid grid-cols-2 gap-y-12 gap-x-8">
            {skills.map((skill) => (
              <div
                key={skill.id}
                className="flex flex-col items-center group cursor-default"
              >
                {/* MOLDURA */}
                <div className="w-24 h-24 md:w-38 md:h-38 bg-white rounded-2xl border-[3px] cursor-pointer border-[#181922] shadow-[6px_6px_0px_0px_rgba(50,50,50,1)] overflow-hidden flex items-center justify-center p-4 transition-all duration-300 group-hover:translate-x-1 group-hover:translate-y-1 group-hover:shadow-none">
                  <Image
                    src={skill.img}
                    alt={skill.name}
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* NOME E TIPO */}
                <div className="mt-4 text-center">
                  <h3 className="text-xl font-bold font-comic text-[#181922] leading-tight">
                    {skill.name}
                  </h3>
                  <p className="text-[10px] font-sans text-white font-bold uppercase tracking-widest mt-1">
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
