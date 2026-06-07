import { SportConfig, Sport } from "@/types";

export const sportConfigs: Record<Sport, SportConfig> = {
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

export const getSportConfig = (sport: Sport): SportConfig => {
  return sportConfigs[sport];
};

export const SPORTS = ["cricket", "football", "tennis", "f1"] as const;