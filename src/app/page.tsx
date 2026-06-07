'use client';

import { useState } from "react";
import GlobalBackground from "@/components/GlobalBackground";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import NewsTicker from "@/components/NewsTicker";
import FeaturedSection from "@/components/FeaturedSection";
import TrendingSection from "@/components/TrendingSection";
import SportSection from "@/components/SportSection";
import PollsSection from "@/components/PollsSection";
import CommentsSection from "@/components/CommentsSection";
import NewsletterSection from "@/components/NewsletterSection";
import Footer from "@/components/Footer";
import SearchOverlay from "@/components/SearchOverlay";
import { Article, Sport } from "@/types";

// Sample Data
const featuredMain: Article = {
  id: "feat-1",
  slug: "ipl-2026-final-preview",
  title: "IPL 2026 Final Preview: Mumbai Indians vs Chennai Super Kings — The Ultimate Showdown",
  excerpt: "As the two most successful franchises in IPL history prepare to clash in the final, we break down the key matchups, tactical battles, and the players who could decide the championship.",
  content: "",
  sport: "cricket",
  author: "Vikram Patel",
  date: "June 6, 2026",
  readTime: "8 min read",
  viewCount: 45200,
  featured: true,
};

const sidebarArticles: Article[] = [
  {
    id: "side-1",
    slug: "champions-league-final-preview",
    title: "Champions League Final: Real Madrid vs Bayern Munich Tactical Breakdown",
    excerpt: "",
    content: "",
    sport: "football",
    author: "Marcus Johnson",
    date: "June 5, 2026",
    readTime: "6 min",
    viewCount: 32100,
  },
  {
    id: "side-2",
    slug: "wimbledon-seeds-analysis",
    title: "Wimbledon 2026: Analyzing the Top 10 Seeds and Their Chances",
    excerpt: "",
    content: "",
    sport: "tennis",
    author: "Sarah Williams",
    date: "June 4, 2026",
    readTime: "5 min",
    viewCount: 18900,
  },
  {
    id: "side-3",
    slug: "f1-midseason-report",
    title: "F1 2026 Mid-Season Report: Verstappen's Dominance Under Threat?",
    excerpt: "",
    content: "",
    sport: "f1",
    author: "David Coulthard",
    date: "June 3, 2026",
    readTime: "7 min",
    viewCount: 28400,
  },
];

const trendingArticles: Article[] = [
  {
    id: "trend-1",
    slug: "virat-kohli-century",
    title: "Virat Kohli's Masterful Century Rescues India in Adelaide",
    excerpt: "",
    content: "",
    sport: "cricket",
    author: "Rohit Verma",
    date: "June 6, 2026",
    readTime: "4 min",
    viewCount: 67800,
  },
  {
    id: "trend-2",
    slug: "haaland-record",
    title: "Erling Haaland Breaks Premier League Goal Scoring Record",
    excerpt: "",
    content: "",
    sport: "football",
    author: "Gary Lineker",
    date: "June 5, 2026",
    readTime: "3 min",
    viewCount: 54300,
  },
  {
    id: "trend-3",
    slug: "alcaraz-clay-streak",
    title: "Carlos Alcaraz Extends Clay Court Winning Streak to 28 Matches",
    excerpt: "",
    content: "",
    sport: "tennis",
    author: "Martina Navratilova",
    date: "June 4, 2026",
    readTime: "4 min",
    viewCount: 42100,
  },
  {
    id: "trend-4",
    slug: "hamilton-ferrari-debut",
    title: "Lewis Hamilton's Ferrari Debut: What to Expect in 2026",
    excerpt: "",
    content: "",
    sport: "f1",
    author: "Martin Brundle",
    date: "June 3, 2026",
    readTime: "6 min",
    viewCount: 76500,
  },
  {
    id: "trend-5",
    slug: "ashes-series-preview",
    title: "The Ashes 2026: England vs Australia Series Preview",
    excerpt: "",
    content: "",
    sport: "cricket",
    author: "Michael Atherton",
    date: "June 2, 2026",
    readTime: "7 min",
    viewCount: 38900,
  },
];

const sportArticles: Record<Sport, Article[]> = {
  cricket: [
    {
      id: "c-1",
      slug: "test-cricket-evolution",
      title: "The Evolution of Test Cricket: How Day-Night Tests Changed the Game Forever",
      excerpt: "",
      content: "",
      sport: "cricket",
      author: "Harsha Bhogle",
      date: "June 6, 2026",
      readTime: "9 min",
      viewCount: 23400,
    },
    {
      id: "c-2",
      slug: "ipl-auction-strategy",
      title: "IPL Auction Strategy: How Teams Build Championship Rosters",
      excerpt: "",
      content: "",
      sport: "cricket",
      author: "Aakash Chopra",
      date: "June 5, 2026",
      readTime: "6 min",
      viewCount: 18700,
    },
    {
      id: "c-3",
      slug: "women-cricket-growth",
      title: "The Unstoppable Rise of Women's Cricket Globally",
      excerpt: "",
      content: "",
      sport: "cricket",
      author: "Lisa Sthalekar",
      date: "June 4, 2026",
      readTime: "5 min",
      viewCount: 15600,
    },
  ],
  football: [
    {
      id: "f-1",
      slug: "tactical-evolution-2026",
      title: "Tactical Evolution: How Inverted Fullbacks Are Reshaping Modern Football",
      excerpt: "",
      content: "",
      sport: "football",
      author: "Jonathan Wilson",
      date: "June 6, 2026",
      readTime: "8 min",
      viewCount: 31200,
    },
    {
      id: "f-2",
      slug: "transfer-window-insights",
      title: "Summer Transfer Window 2026: The Biggest Moves and Shock Deals",
      excerpt: "",
      content: "",
      sport: "football",
      author: "Fabrizio Romano",
      date: "June 5, 2026",
      readTime: "5 min",
      viewCount: 28900,
    },
    {
      id: "f-3",
      slug: "women-euro-preview",
      title: "Women's Euro 2026: Tournament Preview and Predictions",
      excerpt: "",
      content: "",
      sport: "football",
      author: "Alex Scott",
      date: "June 4, 2026",
      readTime: "6 min",
      viewCount: 19800,
    },
  ],
  tennis: [
    {
      id: "t-1",
      slug: "grand-slam-physics",
      title: "The Physics of the Perfect Serve: Breaking Down Grand Slam Data",
      excerpt: "",
      content: "",
      sport: "tennis",
      author: "Craig O'Shannessy",
      date: "June 6, 2026",
      readTime: "7 min",
      viewCount: 14500,
    },
    {
      id: "t-2",
      slug: "next-gen-tennis",
      title: "Next Gen Tennis: The Players Ready to Challenge for Major Titles",
      excerpt: "",
      content: "",
      sport: "tennis",
      author: "Brad Gilbert",
      date: "June 5, 2026",
      readTime: "6 min",
      viewCount: 13200,
    },
    {
      id: "t-3",
      slug: "court-surfaces-comparison",
      title: "Grass vs Clay vs Hard Court: The Ultimate Surface Comparison",
      excerpt: "",
      content: "",
      sport: "tennis",
      author: "Patrick Mouratoglou",
      date: "June 4, 2026",
      readTime: "8 min",
      viewCount: 16700,
    },
  ],
  f1: [
    {
      id: "f1-1",
      slug: "aerodynamics-2026",
      title: "F1 2026 Aerodynamics: How New Regulations Will Change Racing",
      excerpt: "",
      content: "",
      sport: "f1",
      author: "Mark Hughes",
      date: "June 6, 2026",
      readTime: "9 min",
      viewCount: 27800,
    },
    {
      id: "f1-2",
      slug: "driver-market-shakeup",
      title: "The 2026 Driver Market Shakeup: Who Goes Where?",
      excerpt: "",
      content: "",
      sport: "f1",
      author: "Will Buxton",
      date: "June 5, 2026",
      readTime: "6 min",
      viewCount: 24500,
    },
    {
      id: "f1-3",
      slug: "sustainability-f1",
      title: "F1's Road to Sustainability: Beyond Carbon Neutral by 2030",
      excerpt: "",
      content: "",
      sport: "f1",
      author: "Rachel Brookes",
      date: "June 4, 2026",
      readTime: "7 min",
      viewCount: 18900,
    },
  ],
};

export default function Home() {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <main className="relative min-h-screen">
      <GlobalBackground />
      <Navbar onSearchOpen={() => setSearchOpen(true)} />

      <div className="relative z-10">
        <HeroSection />
        <NewsTicker />
        <FeaturedSection
          mainArticle={featuredMain}
          sidebarArticles={sidebarArticles}
        />
        <TrendingSection articles={trendingArticles} />
        <SportSection sportName="cricket" articles={sportArticles.cricket} />
        <SportSection sportName="football" articles={sportArticles.football} />
        <SportSection sportName="tennis" articles={sportArticles.tennis} />
        <SportSection sportName="f1" articles={sportArticles.f1} />
        <PollsSection />
        <CommentsSection />
        <NewsletterSection />
      </div>

      <Footer />
      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </main>
  );
}