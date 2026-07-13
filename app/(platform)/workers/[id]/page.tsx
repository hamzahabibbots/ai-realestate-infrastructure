'use client'

import { use } from 'react'
import Link from 'next/link'
import { getWorker } from '@/lib/data/workers'
import { CapabilityList } from '@/components/workers/capability-list'
import { HandoffFlow } from '@/components/workers/handoff-flow'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ArrowLeft, ArrowUp, ArrowDown } from 'lucide-react'

export default function WorkerDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const worker = getWorker(id)

  if (!worker) {
    return (
      <div className="space-y-4">
        <Link href="/workers" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-4 w-4" /> All Workers
        </Link>
        <Card><CardContent className="p-6"><p>Worker not found.</p></CardContent></Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Link href="/workers" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft className="h-4 w-4" /> All Workers
      </Link>

      <div className="flex items-start gap-5">
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center text-white font-bold text-3xl shrink-0"
          style={{ backgroundColor: `var(--${worker.color})` }}
        >
          {worker.name[0]}
        </div>
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-3xl font-semibold">{worker.name}</h1>
            <Badge variant="secondary">{worker.role}</Badge>
            <div className="flex items-center gap-1.5">
              <div className={`h-2 w-2 rounded-full ${worker.status === 'active' ? 'bg-emerald-400' : 'bg-muted-foreground/40'}`} />
              <span className="text-sm text-muted-foreground capitalize">{worker.status}</span>
            </div>
          </div>
          <p className="text-muted-foreground">{worker.tagline}</p>
        </div>
      </div>

      <Card>
        <CardContent className="p-5">
          <p className="text-sm leading-relaxed">{worker.purpose}</p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {worker.kpis.map((kpi) => (
          <Card key={kpi.label} className="transition-all duration-200 hover:border-primary/30">
            <CardContent className="p-4">
              <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground mb-1">{kpi.label}</p>
              <p className="text-2xl font-mono font-semibold">{kpi.value}</p>
              <div className={`flex items-center gap-1 mt-1 text-xs ${kpi.delta >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                {kpi.delta >= 0 ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
                <span className="font-mono">{Math.abs(kpi.delta)}%</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6 mt-4">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground mb-3">Capabilities</p>
            <CapabilityList capabilities={worker.capabilities} />
          </div>

          <div>
            <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground mb-3">Handoff Rules</p>
            <HandoffFlow worker={worker} />
          </div>

          <div>
            <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground mb-3">Trigger Events</p>
            <div className="flex flex-wrap gap-2">
              {worker.triggerEvents.map((t) => (
                <Badge key={t} variant="outline" className="text-xs">{t}</Badge>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground mb-3">Integrations</p>
            <div className="flex flex-wrap gap-2">
              {worker.integrations.map((ig) => (
                <Badge key={ig} variant="secondary" className="text-xs">{ig}</Badge>
              ))}
            </div>
          </div>

          <Card>
            <CardContent className="p-5">
              <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground mb-2">Memory Summary</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{worker.memorySummary}</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity" className="mt-4">
          <div className="space-y-3">
            {worker.activity.map((a) => (
              <div key={a.id} className="flex items-start gap-3 py-2">
                <span className="font-mono text-[11px] text-muted-foreground w-[80px] shrink-0 mt-0.5">{a.time}</span>
                <div>
                  <p className="text-sm">{a.action}</p>
                  {a.entity && <p className="text-xs text-muted-foreground font-medium mt-0.5">{a.entity}</p>}
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
