'use client';

import { useEffect, useRef } from "react";

const GlobalBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const scrollY = window.scrollY;
      const silhouettes = containerRef.current.querySelectorAll(".silhouette");
      silhouettes.forEach((sil) => {
        (sil as HTMLElement).style.transform = `translateY(${scrollY * 0.2}px)`;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div ref={containerRef} className="global-bg">
      {/* Dot Grid */}
      <div className="dot-grid" />

      {/* Radial Glows */}
      <div className="red-glow" />
      <div className="blue-glow" />

      {/* Sport Silhouettes */}
      <svg
        className="silhouette"
        style={{ top: "5%", left: "2%", width: "300px", height: "400px" }}
        viewBox="0 0 100 140"
        fill="white"
      >
        {/* Cricket Batsman */}
        <path d="M30 20 L35 15 L40 20 L38 50 L42 80 L45 120 L40 130 L35 125 L38 80 L35 50 Z M42 50 L60 30 L65 35 L45 55 Z M25 60 L20 65 L15 60 L20 55 Z" />
        <ellipse cx="32" cy="12" rx="8" ry="10" />
      </svg>

      <svg
        className="silhouette"
        style={{ top: "3%", right: "5%", width: "350px", height: "200px" }}
        viewBox="0 0 140 80"
        fill="white"
      >
        {/* F1 Car Side Profile */}
        <path d="M10 50 L20 45 L30 40 L50 38 L70 35 L90 35 L110 38 L120 42 L125 48 L120 55 L110 58 L90 60 L70 60 L50 58 L30 55 L20 52 Z M50 38 L55 30 L65 28 L75 30 L80 38 Z M90 35 L95 25 L105 23 L115 25 L120 35 Z M30 55 L25 65 L20 68 L15 65 L18 58 Z M100 60 L95 70 L90 72 L85 70 L88 62 Z" />
      </svg>

      <svg
        className="silhouette"
        style={{ top: "40%", left: "1%", width: "250px", height: "300px" }}
        viewBox="0 0 100 120"
        fill="white"
      >
        {/* Football Player Kicking */}
        <ellipse cx="50" cy="15" rx="10" ry="12" />
        <path d="M45 25 L40 50 L35 75 L30 95 L25 110 L30 115 L35 100 L40 80 L45 60 L50 45 L55 60 L60 80 L65 100 L70 115 L75 110 L70 95 L65 75 L60 50 L55 25 Z M50 45 L65 35 L75 30 L80 35 L70 40 L60 45 Z M35 75 L20 70 L10 75 L15 80 L25 78 Z" />
      </svg>

      <svg
        className="silhouette"
        style={{ top: "35%", right: "3%", width: "280px", height: "320px" }}
        viewBox="0 0 100 120"
        fill="white"
      >
        {/* Tennis Player Serving */}
        <ellipse cx="50" cy="20" rx="9" ry="11" />
        <path d="M45 30 L42 50 L40 70 L38 90 L35 110 L40 115 L42 95 L45 75 L48 55 L50 45 L52 55 L55 75 L58 95 L60 115 L65 110 L62 90 L60 70 L58 50 L55 30 Z M42 50 L25 35 L15 30 L12 35 L22 40 L35 48 Z M58 50 L75 40 L85 35 L88 40 L78 45 L65 52 Z" />
        <circle cx="20" cy="25" r="4" />
      </svg>

      <svg
        className="silhouette"
        style={{ bottom: "5%", left: "50%", transform: "translateX(-50%)", width: "600px", height: "150px" }}
        viewBox="0 0 200 50"
        fill="white"
      >
        {/* Stadium Crowd Panorama */}
        <path d="M0 50 L0 30 Q10 20 20 30 Q30 15 40 25 Q50 10 60 20 Q70 5 80 15 Q90 8 100 18 Q110 5 120 15 Q130 10 140 20 Q150 8 160 18 Q170 12 180 22 Q190 15 200 25 L200 50 Z" />
        <path d="M0 50 L0 38 Q15 28 30 38 Q45 22 60 32 Q75 18 90 28 Q105 15 120 25 Q135 12 150 22 Q165 18 180 28 Q195 20 200 30 L200 50 Z" opacity="0.6" />
      </svg>
    </div>
  );
};

export default GlobalBackground;