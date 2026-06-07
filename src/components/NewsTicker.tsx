'use client';

const headlines = [
  "India clinches Test series against Australia with dominant 8-wicket victory",
  "Premier League: Manchester City held to draw by Arsenal at Emirates",
  "Wimbledon 2026: Alcaraz and Sinner set up blockbuster semifinal clash",
  "F1 Monaco GP: Verstappen masterclass secures pole by 0.3 seconds",
  "IPL 2026: Mumbai Indians sign young pace sensation for record fee",
  "Champions League Final: Real Madrid vs Bayern Munich preview",
  "Tennis: Swiatek extends clay-court winning streak to 35 matches",
  "F1: Hamilton confirms Ferrari move for 2026 season",
];

const NewsTicker = () => {
  const tickerContent = headlines.join(" | ");

  return (
    <div className="w-full h-[36px] bg-accent overflow-hidden flex items-center relative z-20">
      {/* LIVE Badge */}
      <div className="flex-shrink-0 flex items-center gap-2 px-4 bg-[#d6303e] h-full">
        <span className="w-2 h-2 bg-white rounded-full animate-pulse-dot" />
        <span className="text-white text-[11px] font-bold tracking-[0.3px]">LIVE</span>
      </div>

      {/* Scrolling Content */}
      <div className="flex-1 overflow-hidden relative">
        <div className="animate-scroll-ticker whitespace-nowrap flex">
          <span className="text-white text-[11px] tracking-[0.3px] px-4">
            {tickerContent} | {tickerContent}
          </span>
          <span className="text-white text-[11px] tracking-[0.3px] px-4">
            {tickerContent} | {tickerContent}
          </span>
        </div>
      </div>
    </div>
  );
};

export default NewsTicker;