import { SPORT_CONFIG } from '@/types'

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://pitchandlap.com'
export const SITE_NAME = 'PitchAndLap'
export const SITE_DESCRIPTION = 'Your daily dose of sports coverage - Cricket, Football, Tennis, and F1'

export const SPORTS = Object.keys(SPORT_CONFIG) as Array<keyof typeof SPORT_CONFIG>

export const NAV_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'Cricket', href: '/cricket' },
  { label: 'Football', href: '/football' },
  { label: 'Tennis', href: '/tennis' },
  { label: 'F1', href: '/f1' },
  { label: 'About', href: '/about' },
]

export const FOOTER_LINKS = {
  sports: [
    { label: 'Cricket', href: '/cricket' },
    { label: 'Football', href: '/football' },
    { label: 'Tennis', href: '/tennis' },
    { label: 'F1', href: '/f1' },
  ],
  company: [
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'Privacy', href: '/privacy' },
  ],
}

export const DEFAULT_OG_IMAGE = '/og-image.png'

export const NEWS_TICKER_ITEMS = [
  '🏏 IPL 2026: Mumbai Indians face CSK in crucial clash',
  '⚽ Premier League: Arsenal vs Liverpool preview',
  '🎾 Wimbledon: Quarterfinals set for exciting matches',
  '🏎️ F1: Monaco GP qualifying results',
]