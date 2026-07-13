import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { liveActivity } from '@/lib/data/metrics'
import type { WorkerId } from '@/lib/types'

const WORKER_COLORS: Record<WorkerId, string> = {
  aria: 'var(--chart-1)',
  marcus: 'var(--chart-2)',
  sofia: 'var(--chart-3)',
  dev: 'var(--chart-5)',
  atlas: 'var(--chart-4)',
}

export function ActivityFeed() {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
            AI Activity
          </p>
        </div>
        <ScrollArea className="h-[340px] pr-3">
          <div className="space-y-3">
            {liveActivity.map((ev) => (
              <div key={ev.id} className="flex items-start gap-3 group">
                <div
                  className="mt-1.5 h-2 w-2 shrink-0 rounded-full"
                  style={{ backgroundColor: WORKER_COLORS[ev.worker] }}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm leading-snug">{ev.message}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="font-mono text-[10px] text-muted-foreground">{ev.time}</span>
                    <Badge variant="secondary" className="text-[10px] h-4 px-1.5 capitalize">
                      {ev.worker}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
