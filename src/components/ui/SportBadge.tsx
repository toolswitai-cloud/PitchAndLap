import { sportConfigs } from "@/lib/sports";
import type { Sport } from "@/types";

interface SportBadgeProps {
  sport: Sport;
  size?: 'sm' | 'md' | 'lg'
}

export default function SportBadge({ sport, size = 'md' }: SportBadgeProps) {
  const config = sportConfigs[sport]

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-1.5 text-base',
  }

  return (
    <span
      className={`inline-flex font-semibold uppercase tracking-wider rounded-full ${sizeClasses[size]}`}
      style={{
        backgroundColor: config.bgColor,
        color: config.textColor,
        border: `1px solid ${config.borderColor}`,
      }}
    >
      {config.name}
    </span>
  )
}