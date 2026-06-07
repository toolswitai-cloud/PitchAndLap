-- PitchAndLap Supabase Database Setup
-- Run this in your Supabase SQL Editor

-- 1. Subscribers table
CREATE TABLE IF NOT EXISTS subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  sport_interest TEXT,
  subscribed_at TIMESTAMPTZ DEFAULT NOW(),
  is_active BOOLEAN DEFAULT TRUE
);

-- 2. Poll votes table
CREATE TABLE IF NOT EXISTS poll_votes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  poll_id TEXT NOT NULL,
  option_id TEXT NOT NULL,
  voter_hash TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(poll_id, voter_hash)
);

-- 3. Article views table
CREATE TABLE IF NOT EXISTS article_views (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  article_slug TEXT UNIQUE NOT NULL,
  views INTEGER DEFAULT 0,
  last_viewed TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Polls table
CREATE TABLE IF NOT EXISTS polls (
  id TEXT PRIMARY KEY,
  question TEXT NOT NULL,
  sport TEXT NOT NULL,
  options JSONB NOT NULL,
  total_votes INTEGER DEFAULT 0,
  ends_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert sample polls
INSERT INTO polls (id, question, sport, options, total_votes, ends_at) VALUES
(
  'f1-champion-2026',
  'Who wins the 2026 F1 World Championship?',
  'f1',
  '[{"id": "verstappen", "text": "Max Verstappen", "votes": 3420}, {"id": "hamilton", "text": "Lewis Hamilton", "votes": 2150}, {"id": "norris", "text": "Lando Norris", "votes": 1890}]',
  7460,
  NOW() + INTERVAL '12 days'
),
(
  'best-test-captain',
  'Best Test captain of the decade?',
  'cricket',
  '[{"id": "rohit", "text": "Rohit Sharma", "votes": 2800}, {"id": "cummins", "text": "Pat Cummins", "votes": 1950}, {"id": "stokes", "text": "Ben Stokes", "votes": 2200}]',
  6950,
  NOW() + INTERVAL '8 days'
)
ON CONFLICT (id) DO NOTHING;

-- Enable Row Level Security (optional - for security)
ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE poll_votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE article_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE polls ENABLE ROW LEVEL SECURITY;