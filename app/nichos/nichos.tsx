import Image from "next/image";
import RobloxLogo from "../../public/roblox.png";
import YT from "../../public/yt.png";
import Twitch from "../../public/twitch.png";

export default function Niches() {
  const nicheData = [
    {
      id: 1,
      title: "Roblox",
      slogan: "High-paced editing for maximum viewer retention.",
      icon: RobloxLogo,
    },
    {
      id: 2,
      title: "IRL Stream",
      slogan: "I turn IRL stream moments into highlights.",
      icon: Twitch,
    },
    {
      id: 3,
      title: "Dark Channels",
      slogan: "Mysterious narratives with compelling visual styles.",
      icon: YT,
    },
  ];

  return (
    <section
      id="niches"
      className="relative w-full min-h-screen md:h-screen bg-[#61b8ff] flex flex-col items-center justify-center py-20 px-6 overflow-hidden"
    >
      {/* GRID BACKGROUND */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(#000 1.2px, transparent 1.2px), 
            linear-gradient(90deg, #000 1.2px, transparent 1.2px)
          `,
          backgroundSize: "40px 40px",
          WebkitMaskImage:
            "radial-gradient(circle, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 85%)",
          maskImage:
            "radial-gradient(circle, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 85%)",
        }}
      ></div>

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
