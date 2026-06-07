export type Sport = "cricket" | "football" | "tennis" | "f1";

export interface SportConfig {
  name: string;
  color: string;
  textColor: string;
  bgColor: string;
  borderColor: string;
  icon: string;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  sport: Sport;
  image?: string;
  author: string;
  date: string;
  readTime: string;
  viewCount: number;
  featured?: boolean;
  isTrending?: boolean;
}

export interface Poll {
  id: string;
  sport: Sport;
  question: string;
  options: PollOption[];
  totalVotes: number;
  daysRemaining: number;
}

export interface PollOption {
  id: string;
  text: string;
  votes: number;
}

export interface PollVote {
  pollId: string;
  optionId: string;
}

export interface Comment {
  id: string;
  username: string;
  avatar: string;
  timestamp: string;
  text: string;
  likes: number;
}

export interface NavLink {
  label: string;
  href: string;
  sport?: Sport;
}

export interface SearchResult {
  article: Article;
  snippet: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
}

export const SPORT_CONFIG: Record<Sport, SportConfig> = {
  cricket: {
    name: "Cricket",
    color: "cricket",
    textColor: "#5DCAA5",
    bgColor: "#085041",
    borderColor: "#1D9E75",
    icon: "🏏",
  },
  football: {
    name: "Football",
    color: "football",
    textColor: "#85B7EB",
    bgColor: "#0C447C",
    borderColor: "#378ADD",
    icon: "⚽",
  },
  tennis: {
    name: "Tennis",
    color: "tennis",
    textColor: "#EF9F27",
    bgColor: "#633806",
    borderColor: "#BA7517",
    icon: "🎾",
  },
  f1: {
    name: "F1",
    color: "f1",
    textColor: "#E63946",
    bgColor: "#791F1F",
    borderColor: "#A32D2D",
    icon: "🏎️",
  },
};

export type SportType = Sport;