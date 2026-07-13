import { ArrowRight } from 'lucide-react'
import type { Worker } from '@/lib/types'

export function HandoffFlow({ worker }: { worker: Worker }) {
  if (worker.handoffTo.length === 0) {
    return <p className="text-sm text-muted-foreground italic">No handoffs — terminal worker</p>
  }
  return (
    <div className="space-y-4">
      {worker.handoffTo.map((h, i) => (
        <div key={i} className="flex flex-col gap-1.5">
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-2 rounded-lg border border-border px-3 py-1.5 bg-card">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: `var(--${worker.color})` }} />
              <span className="text-sm font-medium">{worker.name}</span>
            </div>
            <ArrowRight className="h-4 w-4 text-muted-foreground shrink-0" />
            <div className="flex items-center gap-2 rounded-lg border border-border px-3 py-1.5 bg-card">
              <span className="text-sm font-medium">{h.target}</span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground ml-1">{h.rule}</p>
        </div>
      ))}
    </div>
  )
}
