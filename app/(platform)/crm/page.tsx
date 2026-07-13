'use client'

import { useState } from 'react'
import { contacts } from '@/lib/data/leads'
import { formatAED } from '@/lib/types'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { Separator } from '@/components/ui/separator'
import type { Contact } from '@/lib/types'

export default function CrmPage() {
  const [selected, setSelected] = useState<Contact | null>(null)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">CRM</h1>
        <p className="text-muted-foreground">Contacts</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {contacts.map((c) => (
          <Card key={c.id} className="cursor-pointer transition-all hover:border-primary/30" onClick={() => setSelected(c)}>
            <CardContent className="p-5">
              <p className="font-semibold mb-1">{c.name}</p>
              <p className="text-sm text-muted-foreground">{c.phone}</p>
              <p className="text-sm text-muted-foreground mb-3">{c.email}</p>
              <div className="flex flex-wrap gap-2 mb-2">
                <Badge variant="outline" className="text-[10px]">{c.nationality}</Badge>
                <Badge variant="secondary" className="text-[10px]">{c.propertyType}</Badge>
                <Badge variant="secondary" className="text-[10px]">{c.bedrooms}</Badge>
              </div>
              <p className="font-mono text-sm">{formatAED(c.budgetMin)} - {formatAED(c.budgetMax)}</p>
              <p className="text-xs text-muted-foreground mt-1">{c.timeline}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Sheet open={!!selected} onOpenChange={() => setSelected(null)}>
        <SheetContent className="overflow-y-auto">
          {selected && (
            <>
              <SheetHeader><SheetTitle>{selected.name}</SheetTitle></SheetHeader>
              <div className="space-y-4 mt-4">
                <div><p className="text-sm text-muted-foreground">{selected.phone}</p><p className="text-sm text-muted-foreground">{selected.email}</p></div>
                <Separator />
                <div className="grid grid-cols-2 gap-3">
                  {[['Nationality', selected.nationality], ['Language', selected.language], ['Budget', `${formatAED(selected.budgetMin)} - ${formatAED(selected.budgetMax)}`], ['Property', selected.propertyType], ['Bedrooms', selected.bedrooms], ['Areas', selected.preferredAreas.join(', ')], ['Timeline', selected.timeline], ['Mortgage', selected.mortgageStatus], ['Motivation', selected.motivation], ['Investment', selected.investmentGoal]].map(([k, v]) => (
                    <div key={k}><p className="text-[10px] uppercase text-muted-foreground">{k}</p><p className="text-sm">{v}</p></div>
                  ))}
                </div>
                <Separator />
                <div><p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground mb-1">Notes</p><p className="text-sm text-muted-foreground">{selected.notes}</p></div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  )
}
