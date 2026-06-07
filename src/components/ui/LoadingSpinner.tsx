export default function LoadingSpinner({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  }

  return (
    <div className="flex items-center justify-center">
      <div
        className={`${sizeClasses[size]} border-2 border-slate-700 border-t-emerald-500 rounded-full animate-spin`}
      />
    </div>
  )
}

export function ArticleCardSkeleton() {
  return (
    <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl overflow-hidden">
      <div className="h-48 bg-slate-700/50 animate-pulse" />
      <div className="p-5 space-y-3">
        <div className="h-4 bg-slate-700/50 rounded w-1/3 animate-pulse" />
        <div className="h-6 bg-slate-700/50 rounded w-full animate-pulse" />
        <div className="h-4 bg-slate-700/50 rounded w-2/3 animate-pulse" />
        <div className="flex justify-between pt-2">
          <div className="h-3 bg-slate-700/50 rounded w-16 animate-pulse" />
          <div className="h-3 bg-slate-700/50 rounded w-16 animate-pulse" />
        </div>
      </div>
    </div>
  )
}

export function SectionSkeleton() {
  return (
    <div className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="h-8 bg-slate-700/50 rounded w-48 mb-8 animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <ArticleCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  )
}