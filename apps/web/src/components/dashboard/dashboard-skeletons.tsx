'use client'

export function MetricCardSkeleton() {
    return (
        <div className="bg-gradient-to-br from-[var(--color-background)] to-[var(--color-surface)] rounded-xl border border-[var(--color-border-subtle)] p-6 animate-pulse" style={{ boxShadow: 'var(--shadow-sm)' }}>
            <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 bg-[var(--color-surface-elevated)] rounded-lg"></div>
                <div className="w-12 h-4 bg-[var(--color-surface-elevated)] rounded"></div>
            </div>
            <div>
                <div className="w-16 h-8 bg-[var(--color-surface-elevated)] rounded mb-2"></div>
                <div className="w-24 h-4 bg-[var(--color-surface-elevated)] rounded mb-2"></div>
                <div className="w-full bg-[var(--color-surface-elevated)] rounded-full h-1.5"></div>
            </div>
        </div>
    )
}

export function MetricsGridSkeleton() {
    return (
        <div className="grid gap-6 transition-all duration-300" style={{
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))'
        }}>
            {Array.from({ length: 6 }).map((_, i) => (
                <MetricCardSkeleton key={i} />
            ))}
        </div>
    )
}

export function ProjectCardSkeleton() {
    return (
        <div className="bg-gradient-to-br from-[var(--color-background)] to-[var(--color-surface)] rounded-xl border border-[var(--color-border-subtle)] p-6 animate-pulse" style={{ boxShadow: 'var(--shadow-sm)' }}>
            <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-32 h-6 bg-[var(--color-surface-elevated)] rounded"></div>
                        <div className="w-16 h-5 bg-[var(--color-surface-elevated)] rounded-full"></div>
                    </div>
                    <div className="w-full h-4 bg-[var(--color-surface-elevated)] rounded mb-2"></div>
                    <div className="w-3/4 h-4 bg-[var(--color-surface-elevated)] rounded mb-3"></div>
                    <div className="flex items-center gap-2">
                        <div className="w-20 h-6 bg-[var(--color-surface-elevated)] rounded-full"></div>
                        <div className="w-24 h-6 bg-[var(--color-surface-elevated)] rounded-full"></div>
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <div>
                    <div className="flex items-center justify-between mb-2">
                        <div className="w-16 h-4 bg-[var(--color-surface-elevated)] rounded"></div>
                        <div className="w-10 h-4 bg-[var(--color-surface-elevated)] rounded"></div>
                    </div>
                    <div className="w-full bg-[var(--color-surface-elevated)] rounded-full h-2"></div>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-8 h-4 bg-[var(--color-surface-elevated)] rounded"></div>
                        <div className="w-8 h-4 bg-[var(--color-surface-elevated)] rounded"></div>
                        <div className="w-8 h-4 bg-[var(--color-surface-elevated)] rounded"></div>
                    </div>
                    <div className="flex gap-2">
                        <div className="w-24 h-8 bg-[var(--color-surface-elevated)] rounded"></div>
                        <div className="w-28 h-8 bg-[var(--color-surface-elevated)] rounded"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export function ProjectsListSkeleton() {
    return (
        <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
                <ProjectCardSkeleton key={i} />
            ))}
        </div>
    )
}

export function ExperimentCardSkeleton() {
    return (
        <div className="p-4 bg-gradient-to-br from-[var(--color-background)] to-[var(--color-surface)] border rounded-xl border-[var(--color-border-subtle)] animate-pulse">
            <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                    <div className="w-32 h-5 bg-[var(--color-surface-elevated)] rounded mb-2"></div>
                    <div className="w-24 h-3 bg-[var(--color-surface-elevated)] rounded"></div>
                </div>
                <div className="flex items-center gap-2 ml-2">
                    <div className="w-8 h-8 bg-[var(--color-surface-elevated)] rounded-lg"></div>
                    <div className="w-16 h-5 bg-[var(--color-surface-elevated)] rounded-full"></div>
                </div>
            </div>

            <div className="space-y-3">
                <div>
                    <div className="flex items-center justify-between mb-1">
                        <div className="w-12 h-3 bg-[var(--color-surface-elevated)] rounded"></div>
                        <div className="w-8 h-3 bg-[var(--color-surface-elevated)] rounded"></div>
                    </div>
                    <div className="w-full bg-[var(--color-surface-elevated)] rounded-full h-1.5"></div>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-12 h-5 bg-[var(--color-surface-elevated)] rounded"></div>
                        <div className="w-16 h-3 bg-[var(--color-surface-elevated)] rounded"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export function ExperimentsListSkeleton() {
    return (
        <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
                <ExperimentCardSkeleton key={i} />
            ))}
        </div>
    )
}

export function RecommendationCardSkeleton() {
    return (
        <div className="p-4 border rounded-xl bg-gradient-to-br from-[var(--color-primary-50)] to-[var(--color-primary-100)] border-[var(--color-primary-200)] animate-pulse">
            <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                    <div className="w-32 h-5 bg-white/30 rounded mb-2"></div>
                    <div className="w-full h-4 bg-white/30 rounded mb-1"></div>
                    <div className="w-3/4 h-4 bg-white/30 rounded mb-3"></div>
                    <div className="flex items-center gap-2">
                        <div className="w-16 h-5 bg-white/30 rounded-full"></div>
                        <div className="w-16 h-5 bg-white/30 rounded-full"></div>
                    </div>
                </div>
                <div className="ml-2">
                    <div className="w-10 h-10 bg-[var(--color-primary-600)] rounded-lg"></div>
                </div>
            </div>

            <div className="w-full h-8 bg-[var(--color-primary-600)] rounded"></div>
        </div>
    )
}

export function RecommendationsListSkeleton() {
    return (
        <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
                <RecommendationCardSkeleton key={i} />
            ))}
        </div>
    )
}
