'use client'

import { deals } from '@/lib/data/properties'
import { formatAED } from '@/lib/types'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'

const STAGES = [
  { key: 'qualified', label: 'Qualified' },
  { key: 'visit-scheduled', label: 'Visit Scheduled' },
  { key: 'visit-completed', label: 'Visit Completed' },
  { key: 'negotiation', label: 'Negotiation' },
  { key: 'booking', label: 'Booking' },
  { key: 'closed', label: 'Closed' },
] as const

export default function PipelinePage() {
  const totalValue = deals.reduce((s, d) => s + d.value, 0)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Sales Pipeline</h1>
        <p className="text-muted-foreground">Total pipeline: <span className="font-mono text-foreground">{formatAED(totalValue)}</span></p>
      </div>
      <div className="flex gap-4 overflow-x-auto pb-4">
        {STAGES.map((stage) => {
          const stageDeals = deals.filter((d) => d.stage === stage.key)
          const stageTotal = stageDeals.reduce((s, d) => s + d.value, 0)
          return (
            <div key={stage.key} className="min-w-[280px] flex-shrink-0">
              <Card className="h-full">
                <CardHeader className="pb-2 px-4 pt-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">{stage.label}</p>
                    <Badge variant="secondary" className="font-mono text-[10px]">{stageDeals.length}</Badge>
                  </div>
                  <p className="font-mono text-xs text-muted-foreground">{formatAED(stageTotal)}</p>
                </CardHeader>
                <CardContent className="px-3 pb-3">
                  <ScrollArea className="h-[420px]">
                    <div className="space-y-2">
                      {stageDeals.map((d) => (
                        <Card key={d.id} className="transition-all hover:border-primary/30">
                          <CardContent className="p-3">
                            <p className="font-medium text-sm">{d.leadName}</p>
                            <p className="text-xs text-muted-foreground mb-2">{d.property}</p>
                            <p className="text-lg font-mono font-semibold mb-1">{formatAED(d.value)}</p>
                            <div className="flex items-center gap-2 mb-2">
                              <Badge variant="outline" className="text-[10px] font-mono">{d.probability}%</Badge>
                              <span className="text-[10px] text-muted-foreground">{d.daysInStage}d in stage</span>
                            </div>
                            <p className="text-xs text-muted-foreground italic">{d.aiHint}</p>
                            <p className="text-xs mt-1">{d.nextStep}</p>
                          </CardContent>
                        </Card>
                      ))}
                      {stageDeals.length === 0 && (
                        <p className="text-xs text-muted-foreground text-center py-8">No deals</p>
                      )}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>
          )
        })}
      </div>
    </div>
  )
}
