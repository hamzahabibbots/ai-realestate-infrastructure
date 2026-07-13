'use client'

import { useState } from 'react'
import { leads } from '@/lib/data/leads'
import { STAGE_LABELS } from '@/lib/types'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { Search } from 'lucide-react'
import type { Lead } from '@/lib/types'

function scoreBadge(score: number) {
  if (score >= 80) return 'bg-emerald-500/15 text-emerald-400 border-0'
  if (score >= 60) return 'bg-amber-500/15 text-amber-400 border-0'
  return 'bg-muted text-muted-foreground border-0'
}

export default function LeadsPage() {
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<Lead | null>(null)

  const filtered = leads.filter((l) => !search || l.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-semibold">Leads</h1>
          <Badge variant="secondary" className="font-mono">{leads.length}</Badge>
        </div>
      </div>
      <div className="relative max-w-sm">
        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
        <Input placeholder="Search leads..." className="pl-8 h-9" value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Score</TableHead><TableHead>Name</TableHead><TableHead>Source</TableHead>
                <TableHead>Intent</TableHead><TableHead>Urgency</TableHead><TableHead>Stage</TableHead>
                <TableHead>Worker</TableHead><TableHead>Last Activity</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((l) => (
                <TableRow key={l.id} className="cursor-pointer hover:bg-accent/50" onClick={() => setSelected(l)}>
                  <TableCell><Badge className={`font-mono text-xs ${scoreBadge(l.score)}`}>{l.score}</Badge></TableCell>
                  <TableCell className="font-medium">{l.name}</TableCell>
                  <TableCell className="text-muted-foreground">{l.source}</TableCell>
                  <TableCell><Badge variant={l.intent === 'buy' ? 'default' : 'secondary'} className="text-[10px] capitalize">{l.intent}</Badge></TableCell>
                  <TableCell><Badge variant={l.urgency === 'high' ? 'destructive' : l.urgency === 'medium' ? 'secondary' : 'outline'} className="text-[10px] capitalize">{l.urgency}</Badge></TableCell>
                  <TableCell><Badge variant="outline" className="text-[10px]">{STAGE_LABELS[l.stage]}</Badge></TableCell>
                  <TableCell className="capitalize text-muted-foreground">{l.assignedWorker}</TableCell>
                  <TableCell className="font-mono text-xs text-muted-foreground">{l.lastActivity}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Sheet open={!!selected} onOpenChange={() => setSelected(null)}>
        <SheetContent className="overflow-y-auto">
          {selected && (
            <>
              <SheetHeader>
                <SheetTitle>{selected.name}</SheetTitle>
              </SheetHeader>
              <div className="space-y-4 mt-4">
                <div className="flex items-center gap-3">
                  <Badge className={`font-mono text-lg px-3 py-1 ${scoreBadge(selected.score)}`}>{selected.score}</Badge>
                  <Badge variant="outline">{STAGE_LABELS[selected.stage]}</Badge>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {[['Source', selected.source], ['Campaign', selected.campaign || 'N/A'], ['Intent', selected.intent], ['Urgency', selected.urgency], ['Worker', selected.assignedWorker], ['Agent', selected.assignedAgent || 'Unassigned']].map(([k, v]) => (
                    <div key={k}><p className="text-[10px] uppercase text-muted-foreground">{k}</p><p className="text-sm capitalize">{v}</p></div>
                  ))}
                </div>
                <div>
                  <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground mb-2">Score Breakdown</p>
                  {selected.scoreBreakdown.map((s) => (
                    <div key={s.factor} className="flex justify-between py-1 text-sm">
                      <span className="text-muted-foreground">{s.factor}</span>
                      <span className="font-mono">{s.points}</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  )
}
