'use client';

import { useEffect, useRef, useState } from "react";
import { MessageCircle, ThumbsUp, User } from "lucide-react";
import { Comment } from "@/types";
import Giscus from "@giscus/react";

const sampleComments: Comment[] = [
  {
    id: "1",
    username: "CricketFan99",
    avatar: "",
    timestamp: "2 hours ago",
    text: "Brilliant analysis of the batting collapse. The data on spin bowling averages really tells the story.",
    likes: 24,
  },
  {
    id: "2",
    username: "F1Addict",
    avatar: "",
    timestamp: "5 hours ago",
    text: "Verstappen's race craft this season has been absolutely supreme. That overtake in lap 47 was masterful.",
    likes: 18,
  },
  {
    id: "3",
    username: "TennisPro",
    avatar: "",
    timestamp: "1 day ago",
    text: "The surface analysis here is spot on. Clay court transitions are so underrated in modern tennis.",
    likes: 31,
  },
];

interface CommentsSectionProps {
  slug?: string;
}

const CommentsSection = ({ slug }: CommentsSectionProps) => {
  return (
    <section className="relative z-10 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 mb-8">
          <MessageCircle size={18} className="text-blue-400" />
          <h2 className="text-sm font-semibold text-white">Reader Reactions</h2>
        </div>

        {/* Giscus Container */}
        <div className="bg-card border border-border rounded-card p-4">
          <Giscus
            id="comments"
            repo="yourusername/pitchandlap"
            repoId="R_kgDOGxxxxx"
            category="Comments"
            categoryId="DIC_kwDOGxxxxx"
            mapping="pathname"
            strict="0"
            reactionsEnabled="1"
            emitMetadata="0"
            inputPosition="top"
            theme="dark"
            lang="en"
            loading="lazy"
          />
        </div>

        {/* Fallback UI while Giscus loads - shows sample comments */}
        <div className="mt-8 space-y-6">
          <p className="text-[11px] text-muted uppercase tracking-[2px]">Recent Comments</p>
          {sampleComments.map((comment) => (
            <div
              key={comment.id}
              className="bg-card border border-border rounded-card p-4"
            >
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#2a2a2a] flex items-center justify-center flex-shrink-0">
                  <User size={14} className="text-muted" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium text-white">
                      {comment.username}
                    </span>
                    <span className="text-[11px] text-[#444]">
                      {comment.timestamp}
                    </span>
                  </div>
                  <p className="text-[13px] text-body leading-relaxed mb-2">
                    {comment.text}
                  </p>
                  <button className="flex items-center gap-1 text-[11px] text-[#444] hover:text-muted transition-colors">
                    <ThumbsUp size={12} />
                    {comment.likes}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CommentsSection;