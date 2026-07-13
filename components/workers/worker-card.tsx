import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { Worker } from '@/lib/types'

export function WorkerCard({ worker }: { worker: Worker }) {
  return (
    <Link href={`/workers/${worker.id}`}>
      <Card className="transition-all duration-200 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 cursor-pointer h-full">
        <CardContent className="p-6">
          <div className="flex items-start gap-4 mb-4">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold text-lg shrink-0"
              style={{ backgroundColor: `var(--${worker.color})` }}
            >
              {worker.name[0]}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <p className="text-lg font-semibold">{worker.name}</p>
                <Badge variant="secondary" className="text-[10px]">{worker.role}</Badge>
              </div>
              <div className="flex items-center gap-1.5">
                <div className={`h-1.5 w-1.5 rounded-full ${worker.status === 'active' ? 'bg-emerald-400' : 'bg-muted-foreground/40'}`} />
                <span className="text-xs text-muted-foreground capitalize">{worker.status}</span>
              </div>
            </div>
          </div>

          <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{worker.tagline}</p>

          <div className="grid grid-cols-2 gap-3 mb-3">
            {worker.kpis.slice(0, 2).map((kpi) => (
              <div key={kpi.label}>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground/60">{kpi.label}</p>
                <p className="text-lg font-mono font-semibold">{kpi.value}</p>
              </div>
            ))}
          </div>

          <Badge variant="outline" className="text-[10px]">
            {worker.channels.length} channels
          </Badge>
        </CardContent>
      </Card>
    </Link>
  )
}
