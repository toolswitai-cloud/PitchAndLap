'use client';

import { useState } from "react";
import { BarChart3 } from "lucide-react";
import { Poll, PollOption, Sport } from "@/types";
import { sportConfigs } from "@/lib/sports";

interface PollCardProps {
  poll: Poll;
}

const PollCard = ({ poll }: PollCardProps) => {
  const [voted, setVoted] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [totalVotes, setTotalVotes] = useState(poll.totalVotes);
  const [options, setOptions] = useState<PollOption[]>(
    poll.options.map(opt => ({ ...opt, text: (opt as any).text || opt.label || opt.id }))
  );
  const config = sportConfigs[poll.sport as Sport];

  const handleVote = async (optionId: string) => {
    if (voted) return;

    setSelectedOption(optionId);
    setVoted(true);
    setTotalVotes((prev) => prev + 1);

    setOptions((prev) =>
      prev.map((opt) =>
        opt.id === optionId ? { ...opt, votes: opt.votes + 1 } : opt
      )
    );

    // API call
    try {
      await fetch("/api/poll-vote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pollId: poll.id, optionId }),
      });
    } catch (error) {
      console.error("Vote failed:", error);
    }
  };

  const getPercentage = (votes: number): number => {
    if (totalVotes === 0) return 0;
    return Math.round((votes / totalVotes) * 100);
  };

  return (
    <div className="bg-card border border-border rounded-card p-5">
      <p className="text-[13px] text-body font-medium mb-4 leading-snug">
        {poll.question}
      </p>

      <div className="space-y-2">
        {options.map((option) => {
          const percentage = getPercentage(option.votes);
          const isSelected = selectedOption === option.id;

          return (
            <div key={option.id}>
              {!voted ? (
                <button
                  onClick={() => handleVote(option.id)}
                  className="w-full text-left px-3.5 py-2.5 rounded-md bg-[#1a1a1a] border border-[#2a2a2a] text-[12px] text-body hover:border-[#444] transition-all duration-200 hover:bg-[#1f1f1f]"
                  style={isSelected ? { borderColor: config.textColor, borderLeftWidth: '3px' } : undefined}
                >
                  {option.text}
                </button>
              ) : (
                <div
                  className="relative rounded-md overflow-hidden"
                  style={isSelected ? { borderLeft: `3px solid ${config.textColor}` } : undefined}
                >
                  {/* Progress bar background */}
                  <div
                    className="absolute inset-0 transition-all duration-700 ease-out rounded-md"
                    style={{
                      width: `${percentage}%`,
                      backgroundColor: isSelected
                        ? `${config.textColor}15`
                        : "rgba(255,255,255,0.03)",
                    }}
                  />

                  {/* Content */}
                  <div className="relative flex items-center justify-between px-3.5 py-2.5">
                    <span
                      className={`text-[12px] ${
                        isSelected ? "font-medium" : "text-muted"
                      }`}
                      style={isSelected ? { color: config.textColor } : undefined}
                    >
                      {option.text}
                    </span>
                    <div className="flex items-center gap-2">
                      <span
                        className="text-[12px] font-medium"
                        style={isSelected ? { color: config.textColor } : undefined}
                      >
                        {percentage}%
                      </span>
                      {isSelected && (
                        <div
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: config.textColor }}
                        />
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
        <span className="text-[11px] text-[#444]">
          {totalVotes.toLocaleString()} votes
        </span>
        <span className="text-[11px] text-[#444]">
          {poll.daysRemaining || 7} days left
        </span>
      </div>
    </div>
  );
};

interface PollsSectionProps {
  initialPolls?: Poll[];
}

const PollsSection = ({ initialPolls }: PollsSectionProps) => {
  const defaultPolls: Poll[] = [
    {
      id: "poll-1",
      sport: "f1",
      question: "Who wins the 2026 F1 Championship?",
      options: [
        { id: "ver", text: "Max Verstappen", votes: 3420 },
        { id: "ham", text: "Lewis Hamilton", votes: 2150 },
        { id: "nor", text: "Lando Norris", votes: 1890 },
      ],
      totalVotes: 7460,
      daysRemaining: 12,
    },
    {
      id: "poll-2",
      sport: "cricket",
      question: "Best Test captain of the decade?",
      options: [
        { id: "rohit", text: "Rohit Sharma", votes: 2800 },
        { id: "cummins", text: "Pat Cummins", votes: 1950 },
        { id: "stokes", text: "Ben Stokes", votes: 2200 },
      ],
      totalVotes: 6950,
      daysRemaining: 8,
    },
  ];

  const polls = initialPolls || defaultPolls;

  return (
    <section className="relative z-10 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 mb-8">
          <BarChart3 size={18} className="text-muted" />
          <h2 className="text-[11px] text-muted uppercase tracking-[2px] font-medium">
            Fan Polls
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {polls.map((poll) => (
            <PollCard key={poll.id} poll={poll} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PollsSection;