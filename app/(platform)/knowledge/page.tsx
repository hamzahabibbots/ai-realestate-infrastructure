import { knowledgeItems } from '@/lib/data/knowledge'
import { getWorker } from '@/lib/data/workers'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { FileText, Search } from 'lucide-react'
import type { WorkerId } from '@/lib/types'

const TYPE_ORDER = ['SOP', 'FAQ', 'Pricing', 'Script', 'Legal', 'Brochure', 'RERA'] as const

const WORKER_COLORS: Record<WorkerId, string> = {
  aria: 'var(--chart-1)', marcus: 'var(--chart-2)', sofia: 'var(--chart-3)', dev: 'var(--chart-5)', atlas: 'var(--chart-4)',
}

export default function KnowledgePage() {
  const groupedItems = TYPE_ORDER.map((type) => ({
    type,
    items: knowledgeItems.filter((i) => i.type === type),
  })).filter((g) => g.items.length > 0)

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Knowledge Base</h1>
      <div className="relative max-w-sm">
        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
        <Input placeholder="Search knowledge base..." className="pl-8 h-9" />
      </div>
      {groupedItems.map((group) => (
        <div key={group.type}>
          <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground mb-3">{group.type}</p>
          <Card>
            <CardContent className="p-0 divide-y divide-border/50">
              {group.items.map((item) => (
                <div key={item.id} className="flex items-center gap-3 px-4 py-3 hover:bg-accent/30 transition-colors">
                  <FileText className="h-4 w-4 text-muted-foreground shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{item.title}</p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <div className="flex -space-x-1">
                      {item.usedBy.map((wId) => {
                        const w = getWorker(wId)
                        return (
                          <div key={wId} title={w?.name ?? wId} className="w-5 h-5 rounded-full border-2 border-background flex items-center justify-center text-[9px] text-white font-bold" style={{ backgroundColor: WORKER_COLORS[wId] }}>
                            {(w?.name ?? wId)[0]}
                          </div>
                        )
                      })}
                    </div>
                    <span className="font-mono text-[10px] text-muted-foreground w-[50px] text-right">{item.size}</span>
                    <span className="font-mono text-[10px] text-muted-foreground w-[80px] text-right">{item.updatedAt}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  )
}
