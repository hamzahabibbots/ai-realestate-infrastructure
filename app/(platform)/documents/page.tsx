import { dealDocuments } from '@/lib/data/documents'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { CheckCircle2, Clock, AlertTriangle } from 'lucide-react'

const STATUS_CONFIG = {
  received: { icon: CheckCircle2, color: 'text-emerald-400', label: 'Received' },
  pending: { icon: Clock, color: 'text-amber-400', label: 'Pending' },
  expired: { icon: AlertTriangle, color: 'text-rose-400', label: 'Expired' },
} as const

export default function DocumentsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Documents</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {dealDocuments.map((dd) => {
          const received = dd.documents.filter((d) => d.status === 'received').length
          const total = dd.documents.length
          const pct = Math.round((received / total) * 100)
          return (
            <Card key={dd.id}>
              <CardContent className="p-6">
                <p className="font-semibold mb-0.5">{dd.dealName}</p>
                <p className="text-sm text-muted-foreground mb-3">{dd.buyer}</p>
                <div className="flex items-center gap-3 mb-4">
                  <Progress value={pct} className="h-1.5 flex-1" />
                  <span className="font-mono text-xs text-muted-foreground">{received}/{total}</span>
                </div>
                <div className="space-y-2 mb-3">
                  {dd.documents.map((doc) => {
                    const cfg = STATUS_CONFIG[doc.status]
                    const Icon = cfg.icon
                    return (
                      <div key={doc.name} className="flex items-center gap-2.5">
                        <Icon className={`h-4 w-4 shrink-0 ${cfg.color}`} />
                        <span className="text-sm flex-1">{doc.name}</span>
                        <span className={`text-[10px] ${cfg.color}`}>{cfg.label}</span>
                      </div>
                    )
                  })}
                </div>
                {dd.alert && (
                  <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3 mt-3">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-destructive shrink-0 mt-0.5" />
                      <p className="text-sm text-destructive">{dd.alert}</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
