'use client';

import { notFound } from "next/navigation";
import GlobalBackground from "@/components/GlobalBackground";
import Navbar from "@/components/Navbar";
import SportSection from "@/components/SportSection";
import Footer from "@/components/Footer";
import NewsletterSection from "@/components/NewsletterSection";
import { Sport } from "@/types";
import { sportConfigs, SPORTS } from "@/lib/sports";
import Link from "next/link";

// Sample articles for the sport page
const getArticlesForSport = (sport: Sport) => {
  return Array.from({ length: 9 }, (_, i) => ({
    id: `${sport}-${i + 1}`,
    slug: `${sport}-article-${i + 1}`,
    title: `${sportConfigs[sport].name} Article ${i + 1}: Deep Dive Analysis and Expert Commentary`,
    excerpt: "Comprehensive analysis of the latest developments...",
    content: "",
    sport,
    author: "Expert Analyst",
    date: `June ${6 - (i % 5)}, 2026`,
    readTime: `${4 + (i % 5)} min`,
    viewCount: 10000 + i * 1500,
  }));
};

interface SportPageProps {
  params: Promise<{ sport: string }>;
}

export default async function SportPage({ params }: SportPageProps) {
  const { sport } = await params;

  if (!SPORTS.includes(sport as Sport)) {
    notFound();
  }

  const sportKey = sport as Sport;
  const config = sportConfigs[sportKey];
  const articles = getArticlesForSport(sportKey);

  return (
    <main className="relative min-h-screen">
      <GlobalBackground />
      <Navbar onSearchOpen={() => {}} />

      <div className="relative z-10 pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1
              className="text-3xl font-bold mb-2"
              style={{ color: config.textColor }}
            >
              {config.icon} {config.name}
            </h1>
            <p className="text-muted text-sm">
              Latest news, analysis, and opinion from the world of {config.name.toLowerCase()}.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {articles.map((article) => (
              <Link
                key={article.id}
                href={`/${sport}/${article.slug}`}
                className="group block"
              >
                <div className="bg-card border-[0.5px] border-border rounded-card p-4 hover:bg-card-hover hover:border-border-hover transition-all duration-200">
                  <span
                    className="inline-block px-2 py-0.5 rounded text-[10px] font-medium mb-3"
                    style={{
                      backgroundColor: config.bgColor,
                      color: config.textColor,
                    }}
                  >
                    {config.name}
                  </span>
                  <h3 className="text-[13px] text-body font-medium line-clamp-2 leading-snug mb-3">
                    {article.title}
                  </h3>
                  <p className="text-[10px] text-[#444]">{article.readTime}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <NewsletterSection />
      <Footer />
    </main>
  );
}