'use client'

import { useState } from 'react'
import { calls } from '@/lib/data/calls'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { ArrowDownLeft, ArrowUpRight, Bot, User } from 'lucide-react'
import type { CallRecord } from '@/lib/types'

export default function CallsPage() {
  const [selected, setSelected] = useState<CallRecord | null>(null)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Calls</h1>
        <p className="text-muted-foreground">Voice AI</p>
      </div>
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Contact</TableHead><TableHead>Direction</TableHead><TableHead>Duration</TableHead>
                <TableHead>Time</TableHead><TableHead>Sentiment</TableHead><TableHead>Handled By</TableHead>
                <TableHead>Summary</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {calls.map((c) => (
                <TableRow key={c.id} className="cursor-pointer hover:bg-accent/50" onClick={() => setSelected(c)}>
                  <TableCell className="font-medium">{c.contactName}</TableCell>
                  <TableCell>
                    {c.direction === 'inbound'
                      ? <ArrowDownLeft className="h-4 w-4 text-emerald-400" />
                      : <ArrowUpRight className="h-4 w-4 text-blue-400" />}
                  </TableCell>
                  <TableCell className="font-mono">{c.duration}</TableCell>
                  <TableCell className="font-mono text-xs text-muted-foreground">{c.time}</TableCell>
                  <TableCell>
                    <Badge className={`text-[10px] border-0 ${c.sentiment === 'positive' ? 'bg-emerald-500/15 text-emerald-400' : c.sentiment === 'negative' ? 'bg-rose-500/15 text-rose-400' : 'bg-muted text-muted-foreground'}`}>
                      {c.sentiment}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={c.handledBy === 'ai' ? 'default' : 'secondary'} className="text-[10px] gap-1">
                      {c.handledBy === 'ai' ? <Bot className="h-3 w-3" /> : <User className="h-3 w-3" />}
                      {c.handledBy === 'ai' ? 'AI' : 'Human'}
                    </Badge>
                  </TableCell>
                  <TableCell className="max-w-[300px] truncate text-sm text-muted-foreground">{c.summary}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Sheet open={!!selected} onOpenChange={() => setSelected(null)}>
        <SheetContent className="overflow-y-auto sm:max-w-lg">
          {selected && (
            <>
              <SheetHeader><SheetTitle>{selected.contactName}</SheetTitle></SheetHeader>
              <div className="space-y-4 mt-4">
                <div className="flex gap-2 flex-wrap">
                  <Badge variant="outline">{selected.direction}</Badge>
                  <Badge variant="outline" className="font-mono">{selected.duration}</Badge>
                  <Badge className={`border-0 ${selected.sentiment === 'positive' ? 'bg-emerald-500/15 text-emerald-400' : selected.sentiment === 'negative' ? 'bg-rose-500/15 text-rose-400' : 'bg-muted text-muted-foreground'}`}>{selected.sentiment}</Badge>
                </div>
                <div><p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground mb-1">Summary</p><p className="text-sm">{selected.summary}</p></div>
                <div><p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground mb-1">Transcript</p><p className="text-sm whitespace-pre-line text-muted-foreground leading-relaxed">{selected.transcript}</p></div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  )
}
