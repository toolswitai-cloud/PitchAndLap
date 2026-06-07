'use client';

import { useState, useEffect } from "react";
import { Search, Bell, Rss, Menu, X } from "lucide-react";
import Link from "next/link";
import { NavLink, Notification } from "@/types";
import { sportConfigs } from "@/lib/sports";

interface NavbarProps {
  onSearchOpen?: () => void;
}

const navLinks: NavLink[] = [
  { label: "Cricket", href: "/cricket", sport: "cricket" },
  { label: "Football", href: "/football", sport: "football" },
  { label: "Tennis", href: "/tennis", sport: "tennis" },
  { label: "F1", href: "/f1", sport: "f1" },
  { label: "About", href: "/about" },
];

const sampleNotifications: Notification[] = [
  {
    id: "1",
    title: "New Article",
    message: "India wins the Test series against Australia",
    time: "2 min ago",
    read: false,
  },
  {
    id: "2",
    title: "Match Update",
    message: "Premier League: Arsenal 2-1 Manchester City",
    time: "15 min ago",
    read: false,
  },
  {
    id: "3",
    title: "F1 Qualifying",
    message: "Verstappen takes pole position at Silverstone",
    time: "1 hour ago",
    read: true,
  },
];

const Navbar = ({ onSearchOpen }: NavbarProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(2);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNotifClick = () => {
    setNotifOpen(!notifOpen);
    if (unreadCount > 0) setUnreadCount(0);
  };

  const handleSearchOpen = () => {
    if (onSearchOpen) {
      onSearchOpen();
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[rgba(10,10,10,0.92)] backdrop-blur-[20px] border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-[20px] font-semibold tracking-tight">
              <span className="text-white">Pitch</span>
              <span className="text-accent">&</span>
              <span className="text-white">Lap</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-muted hover:text-white transition-colors duration-200"
                style={link.sport ? { color: sportConfigs[link.sport].textColor } : undefined}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={handleSearchOpen}
              className="p-2 text-muted hover:text-white transition-colors duration-200"
              aria-label="Search"
            >
              <Search size={18} />
            </button>

            <div className="relative">
              <button
                onClick={handleNotifClick}
                className="p-2 text-muted hover:text-white transition-colors duration-200 relative"
                aria-label="Notifications"
              >
                <Bell size={18} />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full" />
                )}
              </button>

              {/* Notification Dropdown */}
              {notifOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-card border border-border rounded-card shadow-2xl overflow-hidden">
                  <div className="p-3 border-b border-border">
                    <span className="text-sm font-medium text-white">Notifications</span>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {sampleNotifications.map((notif) => (
                      <div
                        key={notif.id}
                        className={`p-3 border-b border-border hover:bg-card-hover transition-colors cursor-pointer ${
                          !notif.read ? "bg-[rgba(230,57,70,0.05)]" : ""
                        }`}
                      >
                        <p className="text-xs font-medium text-white">{notif.title}</p>
                        <p className="text-xs text-muted mt-1">{notif.message}</p>
                        <p className="text-[10px] text-[#444] mt-1">{notif.time}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/api/feed.xml"
              className="p-2 text-muted hover:text-white transition-colors duration-200"
              aria-label="RSS Feed"
            >
              <Rss size={18} />
            </Link>

            <Link
              href="/#newsletter"
              className="bg-accent text-white px-[14px] py-[6px] rounded-md text-sm font-medium hover:bg-[#d6303e] transition-colors duration-200"
            >
              Subscribe
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-muted hover:text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[rgba(10,10,10,0.98)] border-b border-border">
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="block text-sm font-medium text-muted hover:text-white transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3 border-t border-border flex items-center space-x-4">
              <button onClick={handleSearchOpen} className="p-2 text-muted">
                <Search size={18} />
              </button>
              <button className="p-2 text-muted" onClick={handleNotifClick}>
                <Bell size={18} />
              </button>
              <Link href="/api/feed.xml" className="p-2 text-muted">
                <Rss size={18} />
              </Link>
            </div>
            <Link
              href="/#newsletter"
              className="block w-full text-center bg-accent text-white px-4 py-2 rounded-md text-sm font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Subscribe
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;