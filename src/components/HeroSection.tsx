'use client';

import { ArrowRight, Search } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/api/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <section className="relative min-h-[100vh] flex items-center z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
          {/* Left Content */}
          <div className="w-full lg:w-[60%] pt-16 lg:pt-0">
            <p className="text-accent text-[11px] font-medium tracking-[2px] uppercase mb-4">
              SPORTS · ANALYSIS · OPINION
            </p>

            <h1 className="text-[36px] lg:text-[56px] font-bold text-white leading-[1.15] mb-6">
              Where Every Sport Gets Its
              <br />
              <span className="text-accent">Story</span>
            </h1>

            <p className="text-[16px] text-muted max-w-[480px] leading-[1.7] mb-8">
              Deep dives into Cricket, Football, Tennis, and F1. Expert analysis,
              breaking news, and the stories that matter from the world of sports.
            </p>

            <div className="flex flex-wrap gap-4 mb-8">
              <Link
                href="/cricket"
                className="inline-flex items-center gap-2 bg-accent text-white px-6 py-3 rounded-md text-sm font-medium hover:bg-[#d6303e] transition-colors duration-200"
              >
                Read Latest
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/#sports"
                className="inline-flex items-center gap-2 border border-[#333] text-white px-6 py-3 rounded-md text-sm font-medium hover:border-muted transition-colors duration-200"
              >
                Browse by Sport
              </Link>
            </div>

            <form onSubmit={handleSearch} className="flex max-w-md">
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Search articles, players, matches..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-card border border-border rounded-l-md px-4 py-3 text-sm text-white placeholder-[#555] focus:border-accent transition-colors"
                />
              </div>
              <button type="submit" className="bg-accent text-white px-4 py-3 rounded-r-md hover:bg-[#d6303e] transition-colors">
                <Search size={18} />
              </button>
            </form>
          </div>

          {/* Right Content - Floating Icons */}
          <div className="hidden lg:flex w-[40%] justify-center items-center relative h-[400px]">
            <div className="grid grid-cols-2 gap-16">
              {/* Cricket Ball */}
              <div className="animate-float-slow">
                <svg width="80" height="80" viewBox="0 0 80 80" fill="white" opacity="0.15">
                  <circle cx="40" cy="40" r="35" />
                  <path d="M15 25 Q40 40 65 25" stroke="white" strokeWidth="3" fill="none" />
                  <path d="M15 55 Q40 40 65 55" stroke="white" strokeWidth="3" fill="none" />
                </svg>
              </div>

              {/* Football */}
              <div className="animate-float-medium">
                <svg width="80" height="80" viewBox="0 0 80 80" fill="white" opacity="0.15">
                  <circle cx="40" cy="40" r="35" />
                  <polygon points="40,15 55,30 50,50 30,50 25,30" fill="none" stroke="white" strokeWidth="2" />
                  <line x1="40" y1="15" x2="40" y2="50" stroke="white" strokeWidth="2" />
                  <line x1="25" y1="30" x2="55" y2="30" stroke="white" strokeWidth="2" />
                </svg>
              </div>

              {/* Tennis */}
              <div className="animate-float-fast">
                <svg width="80" height="80" viewBox="0 0 80 80" fill="white" opacity="0.15">
                  <circle cx="40" cy="40" r="35" />
                  <path d="M20 40 Q40 20 60 40 Q40 60 20 40" fill="none" stroke="white" strokeWidth="2" />
                  <line x1="40" y1="5" x2="40" y2="75" stroke="white" strokeWidth="2" />
                </svg>
              </div>

              {/* F1 Car */}
              <div className="animate-float-horizontal">
                <svg width="100" height="60" viewBox="0 0 100 60" fill="white" opacity="0.15">
                  <path d="M10 40 L20 35 L30 32 L50 30 L70 30 L85 32 L95 35 L90 45 L80 48 L60 50 L40 50 L25 48 L15 45 Z" />
                  <ellipse cx="25" cy="48" rx="8" ry="8" />
                  <ellipse cx="75" cy="48" rx="8" ry="8" />
                  <path d="M50 30 L55 15 L65 12 L75 15 L80 30" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce-slow">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2"
          opacity="0.3"
        >
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;