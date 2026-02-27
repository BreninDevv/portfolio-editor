import Image from "next/image";
import Minecraft from "../../public/minecraft.jpg";
import Roblox from "../../public/roblox.png";

export default function Edits() {
  const minecraftEdits = [
    { id: 1, title: "Survival Series", category: "Shorts", type: "vertical" },
    { id: 2, title: "Parkour Challenge", category: "Shorts", type: "vertical" },
    {
      id: 3,
      title: "The End Dimension",
      category: "Long Form",
      type: "horizontal",
    },
  ];

  const robloxEdits = [
    { id: 4, title: "Bedwars Clutch", category: "Shorts", type: "vertical" },
    { id: 5, title: "Blox Fruits PvP", category: "Shorts", type: "vertical" },
    {
      id: 6,
      title: "Brookhaven Story",
      category: "Long Form",
      type: "horizontal",
    },
  ];

  return (
    <section
      id="edits"
      className="w-full bg-white py-16 px-6 flex flex-col items-center"
    >
      <h2 className="text-4xl font-bold text-[#181922] mb-16 text-center">
        My Best Edits
      </h2>

      {/* --- SEÇÃO MINECRAFT --- */}
      <div className="w-full max-w-6xl mb-20">
        <div className="flex items-center gap-4 mb-10 border-b-4 border-[#181922] pb-4">
          {/* PLACEHOLDER PARA LOGO MINECRAFT */}
          <div className="w-12 h-12 bg-gray-200 rounded-lg border-2 border-black flex items-center justify-center overflow-hidden">
            <Image src={Minecraft} alt="Minecraft Logo" />
          </div>
          <h3 className="text-3xl font-bold  text-[#181922]">Minecraft</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 cursor-pointer">
          {minecraftEdits.map((item) => (
            <VideoCard key={item.id} item={item} />
          ))}
        </div>
      </div>

      {/* --- SEÇÃO ROBLOX --- */}
      <div className="w-full max-w-6xl">
        <div className="flex items-center gap-4 mb-10 border-b-4 border-[#181922] pb-4">
          {/* PLACEHOLDER PARA LOGO ROBLOX */}
          <div className="w-12 h-12 bg-gray-200 rounded-lg border-2 border-black flex items-center justify-center overflow-hidden">
            <Image src={Roblox} alt="Roblox Logo" />
          </div>
          <h3 className="text-3xl font-bold  text-[#181922]">Roblox</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 cursor-pointer">
          {robloxEdits.map((item) => (
            <VideoCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

// Sub-componente para não repetir código
function VideoCard({ item }: { item: any }) {
  return (
    <div className="flex flex-col gap-4 group">
      <div
        className={`
        relative w-full bg-gray-50 rounded-[2rem] border-[3px] border-[#181922] overflow-hidden 
        shadow-[8px_8px_0px_0px_rgba(24,25,34,1)] transition-all 
        group-hover:translate-x-1 group-hover:translate-y-1 group-hover:shadow-none
        ${item.type === "vertical" ? "aspect-[9/16]" : "aspect-video"}
      `}
      >
        <div className="w-full h-full flex items-center justify-center text-gray-400 font-sans italic p-4 text-center">
          {item.title} Video Space
        </div>
        <div className="absolute top-5 left-5 bg-[#181922] text-white text-[10px] font-bold font-sans px-3 py-1 rounded-lg uppercase">
          {item.category}
        </div>
      </div>
      <div className="px-2">
        <h4 className="text-2xl font-bold text-[#181922]">{item.title}</h4>
        <p className="text-xs font-sans text-gray-500 font-bold uppercase tracking-widest">
          Project #{item.id}
        </p>
      </div>
    </div>
  );
}
