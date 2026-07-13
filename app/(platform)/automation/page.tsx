'use client'

import { useState } from 'react'
import { workflows } from '@/lib/data/workflows'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Zap, GitBranch, Brain, Play, Clock, AlertTriangle, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

const NODE_ICONS: Record<string, React.ElementType> = {
  trigger: Zap, condition: GitBranch, 'ai-decision': Brain,
  action: Play, delay: Clock, escalation: AlertTriangle,
}

export default function AutomationPage() {
  const [expandedId, setExpandedId] = useState<string | null>(null)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Automation</h1>
        <p className="text-muted-foreground">Workflows</p>
      </div>
      <div className="space-y-4">
        {workflows.map((wf) => (
          <Card key={wf.id} className={cn('transition-all cursor-pointer', expandedId === wf.id && 'border-primary/30')}>
            <CardContent className="p-5" onClick={() => setExpandedId(expandedId === wf.id ? null : wf.id)}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <p className="font-semibold">{wf.name}</p>
                  <Badge variant="outline" className="text-[10px]">{wf.trigger}</Badge>
                </div>
                <Badge variant={wf.status === 'active' ? 'default' : 'secondary'} className="text-[10px] capitalize">{wf.status}</Badge>
              </div>
              <div className="flex items-center gap-6">
                <div>
                  <p className="text-[10px] uppercase text-muted-foreground">Runs (30d)</p>
                  <p className="font-mono text-sm font-semibold">{wf.runs30d.toLocaleString()}</p>
                </div>
                <div className="flex-1 max-w-[200px]">
                  <p className="text-[10px] uppercase text-muted-foreground mb-0.5">Success</p>
                  <div className="flex items-center gap-2">
                    <Progress value={wf.successRate} className="h-1.5 flex-1" />
                    <span className="font-mono text-xs">{wf.successRate}%</span>
                  </div>
                </div>
              </div>

              {expandedId === wf.id && (
                <div className="mt-5 pt-4 border-t border-border">
                  <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground mb-3">Workflow</p>
                  <div className="flex items-start gap-0 overflow-x-auto pb-2">
                    {wf.nodes.map((node, i) => {
                      const Icon = NODE_ICONS[node.type] || Play
                      return (
                        <div key={node.id} className="flex items-start shrink-0">
                          <Card className="min-w-[140px]">
                            <CardContent className="p-3">
                              <div className="flex items-center gap-2 mb-1">
                                <Icon className="h-3.5 w-3.5 text-primary shrink-0" />
                                <span className="text-xs font-medium">{node.label}</span>
                              </div>
                              <p className="text-[10px] text-muted-foreground">{node.detail}</p>
                            </CardContent>
                          </Card>
                          {i < wf.nodes.length - 1 && (
                            <div className="flex items-center h-[60px] px-1 shrink-0">
                              <ArrowRight className="h-4 w-4 text-muted-foreground" />
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
