import { KpiCard } from '@/components/dashboard/kpi-card'
import { RevenueChart } from '@/components/dashboard/revenue-chart'
import { LeadSourceChart } from '@/components/dashboard/lead-source-chart'
import { FunnelChart } from '@/components/dashboard/funnel-chart'
import { ActivityFeed } from '@/components/dashboard/activity-feed'
import { AssistantPanel } from '@/components/dashboard/assistant-panel'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { kpis } from '@/lib/data/metrics'
import { leads } from '@/lib/data/leads'
import { visits } from '@/lib/data/properties'
import { STAGE_LABELS } from '@/lib/types'

export default function DashboardPage() {
  const hotLeads = leads.filter((l) => l.score >= 80).sort((a, b) => b.score - a.score).slice(0, 5)

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {kpis.map((k) => (
          <KpiCard key={k.label} label={k.label} value={k.value} delta={k.delta} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8"><RevenueChart /></div>
        <div className="lg:col-span-4"><LeadSourceChart /></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-6"><FunnelChart /></div>
        <div className="lg:col-span-6"><ActivityFeed /></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7"><AssistantPanel /></div>
        <div className="lg:col-span-5 space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">Hot Leads</p>
            </CardHeader>
            <CardContent className="space-y-2">
              {hotLeads.map((l) => (
                <div key={l.id} className="flex items-center justify-between py-1.5">
                  <div>
                    <p className="text-sm font-medium">{l.name}</p>
                    <p className="text-xs text-muted-foreground">{l.source}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="font-mono text-xs bg-emerald-500/15 text-emerald-400">{l.score}</Badge>
                    <Badge variant="outline" className="text-[10px]">{STAGE_LABELS[l.stage]}</Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">Today&apos;s Visits</p>
            </CardHeader>
            <CardContent className="space-y-2">
              {visits.map((v) => (
                <div key={v.id} className="flex items-center justify-between py-1.5">
                  <div>
                    <p className="text-sm font-medium">{v.leadName}</p>
                    <p className="text-xs text-muted-foreground">{v.property}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-muted-foreground">{v.time}</span>
                    <Badge variant={v.status === 'confirmed' ? 'default' : 'secondary'} className="text-[10px]">{v.status}</Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
