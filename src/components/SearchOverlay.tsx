'use client';

import { useState, useEffect, useCallback, useRef } from "react";
import { Search, X, Clock } from "lucide-react";
import Link from "next/link";
import { Article } from "@/types";
import { sportConfigs } from "@/lib/sports";

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchOverlay = ({ isOpen, onClose }: SearchOverlayProps) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const performSearch = useCallback(
    async (searchQuery: string) => {
      if (!searchQuery.trim()) {
        setResults([]);
        return;
      }

      setLoading(true);

      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`);
        if (response.ok) {
          const data = await response.json();
          // Transform search results to Article format
          const articles: Article[] = data.map((item: any, index: number) => ({
            id: item.slug || index.toString(),
            slug: item.slug,
            title: item.title,
            excerpt: item.excerpt || "",
            content: "",
            sport: item.sport || "cricket",
            author: "Unknown",
            date: item.publishedAt || new Date().toISOString(),
            readTime: "5 min",
            viewCount: 0,
          }));
          setResults(articles);
        } else {
          setResults([]);
        }
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      performSearch(query);
    }, 300);

    return () => clearTimeout(timeout);
  }, [query, performSearch]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-[rgba(0,0,0,0.95)] flex flex-col items-center pt-[15vh] px-4">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-muted hover:text-white transition-colors"
        aria-label="Close search"
      >
        <X size={24} />
      </button>

      {/* Search Input */}
      <div className="w-full max-w-2xl">
        <div className="relative">
          <Search
            size={20}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted"
          />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search articles, players, matches..."
            className="w-full bg-card border border-border rounded-card pl-12 pr-4 py-4 text-lg text-white placeholder-[#555] focus:border-accent transition-colors"
          />
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center gap-1 text-[11px] text-[#444]">
            <span className="px-1.5 py-0.5 border border-[#333] rounded">ESC</span>
          </div>
        </div>

        {/* Results */}
        <div className="mt-6 space-y-2 max-h-[50vh] overflow-y-auto">
          {loading && (
            <div className="text-center py-8">
              <div className="w-6 h-6 border-2 border-accent border-t-transparent rounded-full animate-spin mx-auto" />
            </div>
          )}

          {!loading && query && results.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted text-sm">
                No articles found for &quot;{query}&quot;
              </p>
            </div>
          )}

          {!loading &&
            results.map((article) => {
              const sport = sportConfigs[article.sport];
              return (
                <Link
                  key={article.id}
                  href={`/${article.sport}/${article.slug}`}
                  onClick={onClose}
                  className="block bg-card border border-border rounded-card p-4 hover:bg-card-hover transition-colors duration-200"
                >
                  <div className="flex items-start gap-3">
                    <span
                      className="px-2 py-0.5 rounded text-[10px] font-medium flex-shrink-0"
                      style={{
                        backgroundColor: sport.bgColor,
                        color: sport.textColor,
                      }}
                    >
                      {sport.name}
                    </span>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm text-white font-medium mb-1">
                        {article.title}
                      </h4>
                      <p className="text-[12px] text-[#555] line-clamp-1">
                        {article.excerpt}
                      </p>
                      <div className="flex items-center gap-2 mt-2 text-[11px] text-[#444]">
                        <Clock size={10} />
                        <span>{new Date(article.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default SearchOverlay;