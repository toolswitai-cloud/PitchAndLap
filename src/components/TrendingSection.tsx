'use client';

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Flame } from "lucide-react";
import { Article } from "@/types";
import { sportConfigs } from "@/lib/sports";
import { Clock } from "lucide-react";

interface TrendingSectionProps {
  articles: Article[];
}

const TrendingSection = ({ articles }: TrendingSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visibleRanks, setVisibleRanks] = useState<Set<number>>(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const rank = parseInt(entry.target.getAttribute("data-rank") || "0");
            setVisibleRanks((prev) => new Set([...prev, rank]));
          }
        });
      },
      { threshold: 0.3 }
    );

    const items = sectionRef.current?.querySelectorAll("[data-rank]");
    items?.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  const formatRank = (num: number): string => {
    return num.toString().padStart(2, "0");
  };

  return (
    <section ref={sectionRef} className="relative z-10 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 mb-8">
          <Flame size={18} className="text-amber-500" />
          <h2 className="text-sm font-semibold text-white uppercase tracking-wide">
            Trending This Week
          </h2>
        </div>

        <div className="space-y-0">
          {articles.slice(0, 5).map((article, index) => {
            const rank = index + 1;
            const sport = sportConfigs[article.sport];
            const isVisible = visibleRanks.has(rank);

            return (
              <Link
                key={article.id}
                href={`/${article.sport}/${article.slug}`}
                className="group block"
                data-rank={rank}
              >
                <div className="flex items-center gap-4 py-4 border-b border-border last:border-b-0 hover:bg-[rgba(255,255,255,0.02)] transition-colors duration-200 px-2 -mx-2 rounded">
                  {/* Rank Number */}
                  <div className="w-12 flex-shrink-0">
                    <span
                      className={`text-[32px] font-bold transition-all duration-700 ${
                        isVisible ? "text-[#222]" : "text-transparent"
                      }`}
                    >
                      {formatRank(rank)}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-[13px] text-[#bbbbbb] font-medium line-clamp-1 group-hover:text-white transition-colors duration-200">
                      {article.title}
                    </h3>
                  </div>

                  {/* Meta */}
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span
                      className="px-2 py-0.5 rounded text-[10px] font-medium"
                      style={{
                        backgroundColor: sport.bgColor,
                        color: sport.textColor,
                      }}
                    >
                      {sport.name}
                    </span>
                    <span className="text-[10px] text-[#444] flex items-center gap-1">
                      <Clock size={9} />
                      {article.readTime}
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TrendingSection;