'use client';

import GlobalBackground from "@/components/GlobalBackground";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NewsletterSection from "@/components/NewsletterSection";

export default function AboutPage() {
  return (
    <main className="relative min-h-screen">
      <GlobalBackground />
      <Navbar onSearchOpen={() => {}} />

      <div className="relative z-10 pt-24 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            About <span className="text-accent">Pitch&Lap</span>
          </h1>

          <div className="space-y-6 text-body leading-relaxed">
            <p>
              Pitch&Lap is a premium sports analysis platform dedicated to delivering
              deep, insightful coverage of Cricket, Football, Tennis, and Formula 1.
              Founded in 2024, we believe every sport deserves storytelling that matches
              the passion of its fans.
            </p>

            <p>
              Our team of expert analysts, former athletes, and data scientists work
              together to bring you content that goes beyond the headlines. From tactical
              breakdowns to historical deep dives, we cover the stories that matter.
            </p>

            <h2 className="text-xl font-bold text-white mt-8 mb-4">Our Mission</h2>
            <p>
              To elevate sports journalism through rigorous analysis, compelling narratives,
              and a commitment to accuracy. We don't just report the news — we explain
              why it matters.
            </p>

            <h2 className="text-xl font-bold text-white mt-8 mb-4">The Team</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              {[
                { name: "Vikram Patel", role: "Editor-in-Chief", sport: "Cricket" },
                { name: "Marcus Johnson", role: "Senior Writer", sport: "Football" },
                { name: "Sarah Williams", role: "Tennis Analyst", sport: "Tennis" },
                { name: "David Coulthard", role: "F1 Correspondent", sport: "F1" },
              ].map((member) => (
                <div
                  key={member.name}
                  className="bg-card border border-border rounded-card p-4"
                >
                  <h3 className="text-white font-medium">{member.name}</h3>
                  <p className="text-[12px] text-muted">{member.role}</p>
                  <p className="text-[11px] text-accent mt-1">{member.sport}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10">
        <NewsletterSection />
      </div>

      <Footer />
    </main>
  );
}