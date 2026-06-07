'use client';

import { notFound } from "next/navigation";
import GlobalBackground from "@/components/GlobalBackground";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CommentsSection from "@/components/CommentsSection";
import NewsletterSection from "@/components/NewsletterSection";
import { Sport } from "@/types";
import { sportConfigs, SPORTS } from "@/lib/sports";
import { Clock, Eye, User, Calendar } from "lucide-react";
import Link from "next/link";

interface ArticlePageProps {
  params: Promise<{ sport: string; slug: string }>;
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { sport, slug } = await params;

  if (!SPORTS.includes(sport as Sport)) {
    notFound();
  }

  const config = sportConfigs[sport as Sport];

  return (
    <main className="relative min-h-screen">
      <GlobalBackground />
      <Navbar onSearchOpen={() => {}} />

      <article className="relative z-10 pt-24 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Link */}
          <Link
            href={`/${sport}`}
            className="inline-block text-sm text-muted hover:text-white mb-6 transition-colors"
          >
            ← Back to {config.name}
          </Link>

          {/* Sport Badge */}
          <span
            className="inline-block px-3 py-1 rounded-full text-[11px] font-medium mb-4"
            style={{
              backgroundColor: config.bgColor,
              color: config.textColor,
            }}
          >
            {config.name}
          </span>

          {/* Title */}
          <h1 className="text-2xl lg:text-4xl font-bold text-white leading-tight mb-6">
            {slug
              .split("-")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ")}
          </h1>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 text-[12px] text-muted mb-8 pb-8 border-b border-border">
            <span className="flex items-center gap-1">
              <User size={12} />
              Expert Analyst
            </span>
            <span className="flex items-center gap-1">
              <Calendar size={12} />
              June 6, 2026
            </span>
            <span className="flex items-center gap-1">
              <Clock size={12} />
              6 min read
            </span>
            <span className="flex items-center gap-1">
              <Eye size={12} />
              12,450 views
            </span>
          </div>

          {/* Article Content Placeholder */}
          <div className="prose max-w-none">
            <p className="text-body leading-relaxed mb-4">
              This is a detailed article about {sport}. The content would be loaded from your CMS or database here. This page demonstrates the full article layout with all the metadata, reading time, and engagement metrics.
            </p>
            <p className="text-body leading-relaxed mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <p className="text-body leading-relaxed mb-4">
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <h2>Key Takeaways</h2>
            <p className="text-body leading-relaxed mb-4">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
            </p>
          </div>
        </div>
      </article>

      <div className="relative z-10">
        <CommentsSection />
        <NewsletterSection />
      </div>

      <Footer />
    </main>
  );
}