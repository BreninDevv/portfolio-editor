export default function PortfolioMarquee() {
  const repeticoes = 8;

  return (
    <div
      className="relative w-full overflow-hidden py-6 select-none"
      style={{
        background: "#ffffff",
        borderTop: "4px solid #181922",
        borderBottom: "4px solid #181922",
      }}
    >
      <div
        className="flex items-center"
        style={{
          width: "max-content",
          animation: "portfolio-marquee 20s linear infinite",
        }}
      >
        {Array.from({ length: 2 }).map((_, dupIndex) => (
          <div key={dupIndex} className="flex items-center shrink-0">
            {Array.from({ length: repeticoes }).map((_, i) => {
              const vazado = i % 2 === 1;
              return (
                <div key={i} className="flex items-center shrink-0">
                  <span
                    className="portfolio-word font-black uppercase tracking-tighter px-6 leading-none"
                    style={{
                      color: vazado ? "#ffffff" : "#181922",
                      WebkitTextStroke: vazado
                        ? "1.2px #181922"
                        : "0px transparent",
                    }}
                  >
                    YouBrenno
                  </span>
                  <div
                    style={{
                      width: "14px",
                      height: "14px",
                      minWidth: "14px",
                      minHeight: "14px",
                      borderRadius: "9999px",
                      backgroundColor: "#181922",
                      flexShrink: 0,
                    }}
                    aria-hidden="true"
                  />
                </div>
              );
            })}
          </div>
        ))}
      </div>

      <style>{`
        @keyframes portfolio-marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .portfolio-word {
          font-size: clamp(56px, 10vw, 120px);
          display: inline-block;
        }
      `}</style>
    </div>
  );
}
