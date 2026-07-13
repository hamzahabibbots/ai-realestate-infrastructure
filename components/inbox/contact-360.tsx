import { ScrollArea } from '@/components/ui/scroll-area'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import { getContact, getLeadByContact } from '@/lib/data/leads'
import { properties } from '@/lib/data/properties'
import { formatAED } from '@/lib/types'

export function Contact360({ contactId, matchedPropertyIds }: { contactId: string; matchedPropertyIds: string[] }) {
  const contact = getContact(contactId)
  const lead = getLeadByContact(contactId)
  if (!contact) return <div className="p-4 text-sm text-muted-foreground">No contact selected</div>

  const matchedProps = properties.filter((p) => matchedPropertyIds.includes(p.id))
  const maxPoints = lead?.scoreBreakdown ? Math.max(...lead.scoreBreakdown.map((s) => s.points)) : 30

  return (
    <ScrollArea className="h-full">
      <div className="p-4 space-y-4">
        <div>
          <p className="text-lg font-semibold">{contact.name}</p>
          <p className="text-sm text-muted-foreground">{contact.phone}</p>
          <p className="text-sm text-muted-foreground">{contact.email}</p>
        </div>
        <Separator />

        {lead && (
          <>
            <div>
              <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground mb-2">Lead Score</p>
              <p className={`text-4xl font-mono font-bold ${lead.score >= 80 ? 'text-emerald-400' : lead.score >= 60 ? 'text-amber-400' : 'text-muted-foreground'}`}>
                {lead.score}
              </p>
              {lead.scoreBreakdown && (
                <div className="mt-3 space-y-2">
                  {lead.scoreBreakdown.map((s) => (
                    <div key={s.factor}>
                      <div className="flex justify-between text-xs mb-0.5">
                        <span className="text-muted-foreground">{s.factor}</span>
                        <span className="font-mono">{s.points}</span>
                      </div>
                      <Progress value={(s.points / maxPoints) * 100} className="h-1" />
                    </div>
                  ))}
                </div>
              )}
            </div>
            <Separator />
          </>
        )}

        <div>
          <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground mb-2">Preferences</p>
          <div className="grid grid-cols-2 gap-y-2.5 gap-x-4">
            {[
              ['Budget', `${formatAED(contact.budgetMin)} - ${formatAED(contact.budgetMax)}`],
              ['Type', contact.propertyType],
              ['Bedrooms', contact.bedrooms],
              ['Areas', contact.preferredAreas.join(', ')],
              ['Timeline', contact.timeline],
              ['Mortgage', contact.mortgageStatus],
            ].map(([label, value]) => (
              <div key={label}>
                <p className="text-[10px] text-muted-foreground uppercase">{label}</p>
                <p className="text-sm">{value}</p>
              </div>
            ))}
          </div>
        </div>
        <Separator />

        {matchedProps.length > 0 && (
          <>
            <div>
              <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground mb-2">Matched Properties</p>
              <div className="space-y-2">
                {matchedProps.map((p) => (
                  <div key={p.id} className="flex justify-between items-center">
                    <p className="text-sm">{p.title}</p>
                    <span className="font-mono text-xs text-muted-foreground">{formatAED(p.price)}</span>
                  </div>
                ))}
              </div>
            </div>
            <Separator />
          </>
        )}

        <div>
          <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground mb-2">Notes</p>
          <p className="text-sm text-muted-foreground leading-relaxed">{contact.notes}</p>
        </div>
      </div>
    </ScrollArea>
  )
}
