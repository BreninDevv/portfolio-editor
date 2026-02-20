import Image from "next/image";
// Importe aqui as logos que você vai usar
// import DiscordLogo from "../../public/discord.png";

export default function Contact() {
  return (
    <section className="w-full min-h-[600px] bg-[#1e1e1e] py-20 px-6 flex flex-col items-center justify-center overflow-hidden">
      {/* Título de Chamada */}
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold font-comic text-white mb-4">
          Let is Work Together!
        </h2>
        <p className="text-gray-400 font-sans uppercase tracking-[0.2em] text-sm">
          Available for new projects
        </p>
      </div>

      <div className="w-full max-w-6xl flex flex-col md:flex-row items-center justify-center gap-12 lg:gap-24">
        {/* ESPAÇO PARA O PERSONAGEM (Esquerda) */}
        <div className="hidden md:block w-full max-w-[350px] lg:max-w-[450px] transition-transform duration-500 hover:rotate-2">
          {/* Substitua pelo seu componente de Imagem do Personagem */}
          <div className="w-full aspect-square bg-white/5 border-2 border-dashed border-gray-600 rounded-[3rem] flex items-center justify-center">
            <span className="text-gray-500 font-comic italic text-lg">
              Character Here
            </span>
          </div>
        </div>

        {/* BOTÕES DE CONTATO (Direita) */}
        <div className="w-full max-w-md flex flex-col gap-6">
          {/* Discord Button */}
          <div className="group flex items-center gap-4 p-4 bg-white rounded-2xl border-[3px] border-white shadow-[6px_6px_0px_0px_rgba(88,101,242,0.5)] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none cursor-pointer">
            <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center overflow-hidden">
              {/* <Image src={DiscordLogo} alt="Discord" className="p-2" /> */}
              <span className="text-[10px] font-bold text-gray-400">LOGO</span>
            </div>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                Discord
              </p>
              <p className="text-xl font-bold font-comic text-[#181922]">
                @YouBrenno
              </p>
            </div>
          </div>

          {/* Instagram Button */}
          <div className="group flex items-center gap-4 p-4 bg-white rounded-2xl border-[3px] border-white shadow-[6px_6px_0px_0px_rgba(225,48,108,0.5)] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none cursor-pointer">
            <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center overflow-hidden">
              <span className="text-[10px] font-bold text-gray-400">LOGO</span>
            </div>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                Instagram
              </p>
              <p className="text-xl font-bold font-comic text-[#181922]">
                @YouBrenno_edits
              </p>
            </div>
          </div>

          {/* Email Button */}
          <div className="group flex items-center gap-4 p-4 bg-white rounded-2xl border-[3px] border-white shadow-[6px_6px_0px_0px_rgba(100,100,100,1)] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none cursor-pointer">
            <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center overflow-hidden">
              <span className="text-[10px] font-bold text-gray-400">LOGO</span>
            </div>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                E-mail
              </p>
              <p className="text-lg md:text-xl font-bold font-comic text-[#181922] break-all">
                ybrenno.contato@gmail.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
