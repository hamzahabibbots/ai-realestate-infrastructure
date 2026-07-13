import { workers } from '@/lib/data/workers'
import { WorkerCard } from '@/components/workers/worker-card'

export default function WorkersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">AI Workers</h1>
        <p className="text-muted-foreground">Specialized AI employees managing your business operations</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {workers.map((w) => (
          <WorkerCard key={w.id} worker={w} />
        ))}
      </div>
    </div>
  )
}
