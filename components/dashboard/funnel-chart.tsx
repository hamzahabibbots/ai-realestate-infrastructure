import { Card, CardContent } from '@/components/ui/card'
import { funnel } from '@/lib/data/metrics'

const OPACITIES = ['opacity-100', 'opacity-80', 'opacity-60', 'opacity-40', 'opacity-25']

export function FunnelChart() {
  return (
    <Card>
      <CardContent className="p-6">
        <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground mb-5">
          Conversion Funnel
        </p>
        <div className="space-y-3">
          {funnel.map((stage, i) => (
            <div key={stage.stage} className="flex items-center gap-4">
              <div className="relative flex-1" style={{ paddingLeft: `${i * 4}%`, paddingRight: `${i * 4}%` }}>
                <div className={`bg-primary ${OPACITIES[i]} rounded-md h-10 flex items-center px-4`}>
                  <span className="text-sm font-medium text-primary-foreground/90 truncate">{stage.stage}</span>
                </div>
              </div>
              <div className="flex items-center gap-3 w-[120px] shrink-0 justify-end">
                <span className="font-mono text-sm font-semibold">{stage.count.toLocaleString()}</span>
                <span className="font-mono text-xs text-muted-foreground w-[40px] text-right">{stage.pct}%</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
