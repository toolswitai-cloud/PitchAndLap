'use client';

import Link from "next/link";
import { Article } from "@/types";
import { sportConfigs } from "@/lib/sports";
import { Eye, Clock } from "lucide-react";

interface FeaturedSectionProps {
  mainArticle: Article;
  sidebarArticles: Article[];
}

const FeaturedSection = ({ mainArticle, sidebarArticles }: FeaturedSectionProps) => {
  const mainSport = sportConfigs[mainArticle.sport];

  return (
    <section className="relative z-10 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-[11px] text-muted uppercase tracking-[2px] mb-6 font-medium">
          Featured
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-[65%_35%] gap-6">
          {/* Main Featured Card */}
          <Link href={`/${mainArticle.sport}/${mainArticle.slug}`} className="group block">
            <div className="relative bg-card border border-border rounded-card overflow-hidden h-full hover:border-[#333] transition-all duration-200">
              {/* Image Area */}
              <div className="relative h-[300px] lg:h-[400px] bg-[#1a1a1a] overflow-hidden">
                {mainArticle.image ? (
                  <img
                    src={mainArticle.image}
                    alt={mainArticle.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a]">
                    <span className="text-6xl opacity-20">{mainSport.icon}</span>
                  </div>
                )}

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />

                {/* Sport Badge */}
                <div
                  className="absolute top-4 left-4 px-3 py-1 rounded-full text-[11px] font-medium"
                  style={{
                    backgroundColor: mainSport.bgColor,
                    color: mainSport.textColor,
                  }}
                >
                  {mainSport.name}
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h2 className="text-[18px] text-white font-medium leading-tight mb-2 group-hover:text-accent transition-colors duration-200">
                  {mainArticle.title}
                </h2>
                <p className="text-[13px] text-[#555] line-clamp-2 mb-3 leading-relaxed">
                  {mainArticle.excerpt}
                </p>
                <div className="flex items-center gap-3 text-[11px] text-[#444]">
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: mainSport.textColor }}
                  />
                  <span>{mainArticle.date}</span>
                  <span className="flex items-center gap-1">
                    <Clock size={10} />
                    {mainArticle.readTime}
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye size={10} />
                    {mainArticle.viewCount.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </Link>

          {/* Sidebar */}
          <div className="flex flex-col gap-4">
            {sidebarArticles.map((article) => {
              const sport = sportConfigs[article.sport];
              return (
                <Link
                  key={article.id}
                  href={`/${article.sport}/${article.slug}`}
                  className="group block"
                >
                  <div
                    className="bg-card border-l-2 border-y border-r border-border rounded-r-card p-4 hover:bg-card-hover transition-all duration-200"
                    style={{ borderLeftColor: sport.borderColor }}
                  >
                    <div
                      className="inline-block px-2 py-0.5 rounded text-[10px] font-medium mb-2"
                      style={{
                        backgroundColor: sport.bgColor,
                        color: sport.textColor,
                      }}
                    >
                      {sport.name}
                    </div>
                    <h3 className="text-[13px] text-[#bbbbbb] font-medium line-clamp-2 leading-snug group-hover:text-white transition-colors duration-200">
                      {article.title}
                    </h3>
                    <p className="text-[10px] text-[#444] mt-2 flex items-center gap-1">
                      <Clock size={9} />
                      {article.readTime}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;