import { Card, CardContent } from '@/components/ui/card'
import { ArrowUp, ArrowDown } from 'lucide-react'

export function KpiCard({ label, value, delta }: { label: string; value: string; delta: number }) {
  return (
    <Card className="transition-all duration-200 hover:border-primary/30">
      <CardContent className="p-5">
        <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground mb-2">{label}</p>
        <p className="text-3xl font-mono font-semibold tracking-tight">{value}</p>
        <div className={`flex items-center gap-1 mt-2 text-xs ${delta >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
          {delta >= 0 ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
          <span className="font-mono">{Math.abs(delta)}%</span>
          <span className="text-muted-foreground ml-0.5">vs last month</span>
        </div>
      </CardContent>
    </Card>
  )
}
