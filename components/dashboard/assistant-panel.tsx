'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Brain } from 'lucide-react'
import { assistantExchanges } from '@/lib/data/metrics'

export function AssistantPanel() {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null)

  return (
    <Card className="overflow-hidden">
      <div className="h-1 bg-gradient-to-r from-primary via-violet-500 to-fuchsia-500" />
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-1">
          <Brain className="h-4 w-4 text-primary" />
          <span className="text-[11px] font-medium uppercase tracking-wider text-primary">Atlas</span>
        </div>
        <p className="text-xs text-muted-foreground mb-4">Management Assistant</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {assistantExchanges.map((ex, i) => (
            <Badge
              key={i}
              variant="outline"
              className="cursor-pointer text-xs hover:bg-primary/10 hover:border-primary/40 transition-colors"
              onClick={() => setSelectedIdx(i)}
            >
              {ex.question}
            </Badge>
          ))}
        </div>

        <ScrollArea className="h-[180px] mb-4">
          {selectedIdx !== null && (
            <div className="space-y-3">
              <div className="flex justify-end">
                <div className="max-w-[80%] rounded-2xl rounded-tr-sm bg-primary/10 px-4 py-2.5">
                  <p className="text-sm text-primary">{assistantExchanges[selectedIdx].question}</p>
                </div>
              </div>
              <div className="flex justify-start">
                <div className="max-w-[90%] rounded-2xl rounded-tl-sm bg-muted px-4 py-2.5">
                  <p className="text-sm leading-relaxed">{assistantExchanges[selectedIdx].answer}</p>
                </div>
              </div>
            </div>
          )}
          {selectedIdx === null && (
            <div className="flex items-center justify-center h-full text-sm text-muted-foreground">
              Select a question above to ask Atlas
            </div>
          )}
        </ScrollArea>

        <Input
          placeholder="Ask Atlas anything about your business..."
          className="bg-muted/50"
        />
      </CardContent>
    </Card>
  )
}
