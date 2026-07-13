import { CheckCircle2 } from 'lucide-react'

export function CapabilityList({ capabilities }: { capabilities: string[] }) {
  return (
    <div className="space-y-2.5">
      {capabilities.map((cap, i) => (
        <div key={i} className="flex items-start gap-3">
          <CheckCircle2 className="h-4 w-4 mt-0.5 text-emerald-400 shrink-0" />
          <span className="text-sm">{cap}</span>
        </div>
      ))}
    </div>
  )
}
