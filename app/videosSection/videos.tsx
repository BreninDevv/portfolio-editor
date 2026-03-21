import Image from "next/image";
import RobloxLogo from "../../public/roblox.png";

export default function Edits() {
  // --- DADOS DOS NICHOS ---

  const robloxEdits = [
    {
      creator: "@Foltyn",
      title: "Foltyn steal Speeds",
      category: "Shorts",
      type: "vertical",
      videoUrl: "https://youtube.com/shorts/ZOmeZnelRmY",
    },
    {
      creator: "@CriadordeConteudo",
      title: "Blox Fruits PvP",
      category: "Shorts",
      type: "vertical",
      videoUrl: "",
    },
    {
      creator: "@Suetam",
      title: "Intro Roblox Video",
      category: "Long Form",
      type: "horizontal",
      videoUrl: "https://youtu.be/UifySD1GzYU",
    },
  ];

  const irlEdits = [
    {
      creator: "@RayLivee",
      title: "RAY U DID IT",
      category: "Shorts",
      type: "vertical",
      videoUrl: "https://youtube.com/shorts/jk5R-tZOzME",
    },
    {
      creator: "@RayLivee",
      title: "RAY WOWED MRBEAST",
      category: "Shorts",
      type: "vertical",
      videoUrl: "https://youtube.com/shorts/IsQTdMaliXM",
    },
    {
      creator: "@TheTylilShowLivee",
      title: "RIGGIE 😂",
      category: "Shorts",
      type: "vertical",
      videoUrl: "https://youtube.com/shorts/gWuSqOVqf8k",
    },
  ];

  const unknownEdits = [
    {
      creator: "@CanalX",
      title: "Cinematic Project 01",
      category: "Long Form",
      type: "horizontal",
      videoUrl: "",
    },
    {
      creator: "@CanalY",
      title: "Cinematic Project 02",
      category: "Long Form",
      type: "horizontal",
      videoUrl: "",
    },
    {
      creator: "@CanalZ",
      title: "Cinematic Project 03",
      category: "Long Form",
      type: "horizontal",
      videoUrl: "",
    },
  ];

  return (
    <section
      id="edits"
      className="w-full bg-white py-16 px-6 flex flex-col items-center"
    >
      <h2 className="text-4xl font-bold text-[#181922] mb-16 text-center uppercase tracking-tighter">
        My Best Edits
      </h2>

      {/* SEÇÃO ROBLOX */}
      <NicheSection title="Roblox" icon={RobloxLogo} viewMoreHref="/roblox">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
          {robloxEdits.map((item, index) => (
            <VideoCard key={index} item={item} />
          ))}
        </div>
      </NicheSection>

      {/* SEÇÃO IRL STREAM */}
      <NicheSection title="IRL Stream" viewMoreHref="/irl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
          {irlEdits.map((item, index) => (
            <VideoCard key={index} item={item} />
          ))}
        </div>
      </NicheSection>

      {/* SEÇÃO DESCONHECIDA */}
      <NicheSection title="Unknown Niche" viewMoreHref="/dark">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
          {unknownEdits.map((item, index) => (
            <VideoCard key={index} item={item} />
          ))}
        </div>
      </NicheSection>
    </section>
  );
}

// --- SUB-COMPONENTE: SEÇÃO DE NICHO ---
function NicheSection({
  title,
  icon,
  viewMoreHref = "#",
  children,
}: {
  title: string;
  icon?: any;
  viewMoreHref?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="w-full max-w-6xl mb-24">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 border-b-4 border-[#181922] pb-4 gap-4">
        <div className="flex items-center gap-4">
          {icon && (
            <div className="w-12 h-12 bg-gray-100 rounded-lg border-2 border-[#181922] flex items-center justify-center overflow-hidden shrink-0">
              <Image src={icon} alt={`${title} icon`} />
            </div>
          )}
          <h3 className="text-3xl font-bold text-[#181922] uppercase tracking-tighter">
            {title}
          </h3>
        </div>

        <a
          href={viewMoreHref}
          className="group flex items-center gap-2 text-[#181922] font-bold text-sm uppercase tracking-widest hover:opacity-70 transition-all cursor-pointer"
        >
          View More
          <span className="transition-transform group-hover:translate-x-1">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5 12H19M19 12L12 5M19 12L12 19"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </a>
      </div>
      {children}
    </div>
  );
}

// --- SUB-COMPONENTE: CARD DE VÍDEO ---
function VideoCard({ item }: { item: any }) {
  const getEmbedUrl = (url: string) => {
    if (!url) return null;
    let videoId = "";
    if (url.includes("shorts/"))
      videoId = url.split("shorts/")[1].split("?")[0];
    else if (url.includes("v=")) videoId = url.split("v=")[1].split("&")[0];
    else if (url.includes("youtu.be/"))
      videoId = url.split("youtu.be/")[1].split("?")[0];

    return videoId
      ? `https://www.youtube.com/embed/${videoId}?modestbranding=1&rel=0&iv_load_policy=3`
      : null;
  };

  const embedUrl = getEmbedUrl(item.videoUrl);

  return (
    <div className="flex flex-col gap-4 group">
      <div
        className={`
          relative w-full bg-[#181922] rounded-[2rem] border-[3px] border-[#181922] overflow-hidden 
          shadow-[8px_8px_0px_0px_rgba(24,25,34,1)] transition-all 
          hover:translate-x-1 hover:translate-y-1 hover:shadow-none
          ${item.type === "vertical" ? "aspect-[9/16]" : "aspect-video"}
        `}
      >
        {embedUrl ? (
          <iframe
            className="absolute inset-0 w-full h-full scale-[1.02] object-cover"
            src={embedUrl}
            title={item.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ border: 0 }}
          ></iframe>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 font-sans italic p-6 text-center text-sm">
            {item.title} <br /> (Video URL not set)
          </div>
        )}

        <div className="absolute top-4 left-4 z-10 bg-[#181922] text-white text-[10px] font-bold px-3 py-1 rounded-lg uppercase pointer-events-none border border-white/10">
          {item.category}
        </div>
      </div>

      <div className="px-2">
        <h4 className="text-2xl font-bold text-[#181922] leading-tight line-clamp-1">
          {item.title}
        </h4>
        <p className="text-xs font-sans text-gray-500 font-bold uppercase tracking-widest mt-1">
          {item.creator}
        </p>
      </div>
    </div>
  );
}
