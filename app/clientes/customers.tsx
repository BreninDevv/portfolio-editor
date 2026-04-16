import Image from "next/image";
import RyanRbx from "../../public/RyanRbx.png";
import Newski from "../../public/Newski.png";

export default function Customers() {
  const clients = [
    {
      name: "RyanRbx",
      subscribers: "123K",
      imageUrl: RyanRbx,
      channelUrl: "https://youtube.com/@RyanRbx",
      imageScale: 105, // 105% de zoom
    },
  ];

  return (
    <section
      id="customers"
      /* FUNDO ATUALIZADO: Mesmos pontos da seção de vídeos */
      className="w-full bg-white bg-[radial-gradient(#d1d5db_2px,transparent_2px)] [background-size:24px_24px] py-16 px-6 flex flex-col items-center"
    >
      <div className="w-full max-w-6xl">
        {/* Cabeçalho */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 border-b-4 border-[#181922] pb-4 gap-4">
          <h2 className="text-4xl font-bold text-[#181922] uppercase tracking-tighter leading-none">
            Trusted By
          </h2>
          <span className="text-[#181922] font-bold text-sm uppercase tracking-widest opacity-50">
            Professional Partners
          </span>
        </div>

        {/* Container Centralizado */}
        <div className="flex flex-wrap justify-center gap-12 md:gap-20">
          {clients.map((client, index) => (
            <CustomerCard key={index} client={client} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CustomerCard({ client }: { client: any }) {
  return (
    <a
      href={client.channelUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col items-center gap-4 group cursor-pointer transition-all duration-300 hover:scale-105"
    >
      {/* Container do Avatar */}
      <div
        className="
          relative w-28 h-28 md:w-36 md:h-36 
          bg-white rounded-full border-[3px] border-[#181922] 
          shadow-[8px_8px_0px_0px_rgba(24,25,34,1)] transition-all 
          group-hover:shadow-none group-hover:translate-x-1 group-hover:translate-y-1
          overflow-hidden
        "
      >
        <Image
          src={client.imageUrl}
          alt={client.name}
          fill
          className="object-cover"
          // Aplicamos o scale individual aqui via inline style
          style={{ transform: `scale(${client.imageScale / 100 || 1})` }}
        />
      </div>

      {/* Info do Cliente */}
      <div className="flex flex-col items-center">
        <h4 className="text-2xl font-bold text-[#181922] leading-tight uppercase tracking-tighter">
          {client.name}
        </h4>
        <div className="inline-block mt-2 bg-[#181922] text-white text-[11px] font-bold px-3 py-1 rounded shadow-[4px_4px_0px_0px_rgba(0,0,0,0.15)]">
          {client.subscribers} SUBS
        </div>
      </div>
    </a>
  );
}
