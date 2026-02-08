'use client'
import { GitBranch, Activity, Lightbulb, Plus, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/design-system-button'

interface EmptyStateProps {
    title: string
    description: string
    actionLabel: string
    onAction?: () => void
    icon: React.ReactNode
}

function EmptyState({ title, description, actionLabel, onAction, icon }: EmptyStateProps) {
    return (
        <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
            <div className="mb-6 p-4 bg-[var(--color-surface-elevated)] rounded-2xl">
                {icon}
            </div>
            <h3 className="text-xl font-semibold text-[var(--color-text-primary)] mb-2">
                {title}
            </h3>
            <p className="text-[var(--color-text-secondary)] mb-6 max-w-md">
                {description}
            </p>
            <Button
                variant="primary"
                className="flex items-center gap-2"
                onClick={onAction}
            >
                <Plus className="w-4 h-4" />
                {actionLabel}
            </Button>
        </div>
    )
}

export function EmptyProjectsState({ onCreateProject }: { onCreateProject?: () => void }) {
    return (
        <EmptyState
            icon={<GitBranch className="w-12 h-12 text-[var(--color-primary-600)]" />}
            title="No Projects Yet"
            description="Start your research journey by creating your first project. Organize your experiments, collaborate with your team, and track your progress all in one place."
            actionLabel="Create Your First Project"
            onAction={onCreateProject}
        />
    )
}

export function EmptyExperimentsState({ onCreateExperiment }: { onCreateExperiment?: () => void }) {
    return (
        <EmptyState
            icon={<Activity className="w-12 h-12 text-green-600" />}
            title="No Running Experiments"
            description="Launch your first experiment to start collecting data and insights. Our AI agents will help you design, execute, and analyze your experiments."
            actionLabel="Start New Experiment"
            onAction={onCreateExperiment}
        />
    )
}

export function EmptyRecommendationsState({ onRefresh }: { onRefresh?: () => void }) {
    return (
        <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
            <div className="mb-6 p-4 bg-[var(--color-primary-100)] rounded-2xl">
                <Lightbulb className="w-12 h-12 text-[var(--color-primary-600)]" />
            </div>
            <h3 className="text-xl font-semibold text-[var(--color-text-primary)] mb-2">
                No Recommendations Available
            </h3>
            <p className="text-[var(--color-text-secondary)] mb-6 max-w-md">
                Our AI is analyzing your research profile to provide personalized recommendations. Check back soon for relevant papers, collaborators, and funding opportunities.
            </p>
            <Button
                variant="outline"
                className="flex items-center gap-2"
                onClick={onRefresh}
            >
                <ArrowRight className="w-4 h-4" />
                Refresh Recommendations
            </Button>
        </div>
    )
}
