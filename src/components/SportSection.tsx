'use client';

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Article, Sport } from "@/types";
import { sportConfigs } from "@/lib/sports";
import { Clock } from "lucide-react";

interface SportSectionProps {
  sportName: Sport;
  articles: Article[];
}

const SportSection = ({ sportName, articles }: SportSectionProps) => {
  const config = sportConfigs[sportName];

  return (
    <section className="relative z-10 py-12" id="sports">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="flex items-center gap-2 flex-shrink-0">
            <span className="text-xl">{config.icon}</span>
            <h2
              className="text-lg font-semibold"
              style={{ color: config.textColor }}
            >
              {config.name}
            </h2>
          </div>
          <div
            className="flex-1 h-px"
            style={{ backgroundColor: config.borderColor, opacity: 0.2 }}
          />
          <Link
            href={`/${sportName}`}
            className="flex items-center gap-1 text-[12px] text-muted hover:text-white transition-colors duration-200 flex-shrink-0"
          >
            See all
            <ArrowRight size={12} />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {articles.map((article) => (
            <Link
              key={article.id}
              href={`/${article.sport}/${article.slug}`}
              className="group block"
            >
              <div className="bg-card border-[0.5px] border-border rounded-card p-4 hover:bg-card-hover hover:border-border-hover transition-all duration-200 h-full">
                <span
                  className="inline-block px-2 py-0.5 rounded text-[10px] font-medium mb-3"
                  style={{
                    backgroundColor: config.bgColor,
                    color: config.textColor,
                  }}
                >
                  {config.name}
                </span>
                <h3 className="text-[13px] text-body font-medium line-clamp-2 leading-snug mb-3 group-hover:text-white transition-colors duration-200">
                  {article.title}
                </h3>
                <p className="text-[10px] text-[#444] flex items-center gap-1">
                  <Clock size={9} />
                  {article.readTime}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SportSection;