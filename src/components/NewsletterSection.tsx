'use client';

import { useState } from "react";
import { Mail, Lock, Check, Loader2 } from "lucide-react";

const benefits = [
  "Weekly digest",
  "Exclusive deep dives",
  "Match previews",
  "Unsubscribe anytime",
];

const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [showName, setShowName] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name: name || undefined }),
      });

      if (response.ok) {
        setStatus("success");
        setEmail("");
        setName("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="relative z-10 py-12" id="newsletter">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-card border border-border rounded-card overflow-hidden relative">
          {/* Red Top Border */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-accent" />

          <div className="p-6 lg:p-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              {/* Left Content */}
              <div className="lg:flex-1">
                <h3 className="text-[16px] text-white font-medium mb-2">
                  Get the best sports takes in your inbox
                </h3>
                <p className="text-[12px] text-[#555]">
                  Weekly digest with 4,200+ readers. No noise, just signal.
                </p>
              </div>

              {/* Right Form */}
              <div className="lg:flex-1 lg:max-w-md">
                <div className="flex items-center gap-2 mb-3">
                  <Lock size={12} className="text-muted" />
                  <span className="text-[11px] text-muted">No spam, ever</span>
                </div>

                <form onSubmit={handleSubmit} className="space-y-3">
                  <div className="flex gap-2">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      required
                      className="flex-1 bg-[#1a1a1a] border border-[#2a2a2a] rounded-md px-3 py-2.5 text-sm text-white placeholder-[#555] focus:border-accent transition-colors"
                    />
                    <button
                      type="submit"
                      disabled={status === "loading" || status === "success"}
                      className="bg-accent text-white px-4 py-2.5 rounded-md text-sm font-medium hover:bg-[#d6303e] transition-colors disabled:opacity-70 flex items-center gap-2"
                    >
                      {status === "loading" ? (
                        <Loader2 size={14} className="animate-spin" />
                      ) : status === "success" ? (
                        <Check size={14} />
                      ) : (
                        <Mail size={14} />
                      )}
                      {status === "success" ? "You're in!" : "Subscribe free"}
                    </button>
                  </div>

                  {showName && (
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name (optional)"
                      className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-md px-3 py-2 text-sm text-white placeholder-[#555] focus:border-accent transition-colors"
                    />
                  )}

                  {!showName && (
                    <button
                      type="button"
                      onClick={() => setShowName(true)}
                      className="text-[11px] text-[#444] hover:text-muted transition-colors"
                    >
                      + Add name (optional)
                    </button>
                  )}
                </form>

                {/* Status Messages */}
                {status === "success" && (
                  <p className="text-[12px] text-green-500 mt-2 flex items-center gap-1">
                    <Check size={12} />
                    Check your inbox for confirmation.
                  </p>
                )}
                {status === "error" && (
                  <p className="text-[12px] text-accent mt-2">
                    Something went wrong, try again.
                  </p>
                )}
              </div>
            </div>

            {/* Benefits */}
            <div className="flex flex-wrap gap-3 mt-6 pt-6 border-t border-border">
              {benefits.map((benefit) => (
                <div
                  key={benefit}
                  className="flex items-center gap-1.5 text-[11px] text-[#555]"
                >
                  <Check size={12} className="text-green-500" />
                  {benefit}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;