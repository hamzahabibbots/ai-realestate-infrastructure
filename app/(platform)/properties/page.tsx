'use client'

import { useState } from 'react'
import { properties } from '@/lib/data/properties'
import { formatAED } from '@/lib/types'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

const LOCATION_GRADIENTS: Record<string, string> = {
  'Dubai Marina': 'from-blue-900/60 to-indigo-800/60',
  'Business Bay': 'from-violet-900/60 to-purple-800/60',
  'Creek Harbour': 'from-emerald-900/60 to-teal-800/60',
  'Dubai Hills': 'from-green-900/60 to-emerald-800/60',
  'Palm Jumeirah': 'from-amber-900/60 to-orange-800/60',
  'JVC': 'from-cyan-900/60 to-blue-800/60',
}

type StatusFilter = 'all' | 'available' | 'reserved' | 'sold'

export default function PropertiesPage() {
  const [filter, setFilter] = useState<StatusFilter>('all')
  const filtered = filter === 'all' ? properties : properties.filter((p) => p.status === filter)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h1 className="text-2xl font-semibold">Properties</h1>
        <div className="flex gap-2">
          {(['all', 'available', 'reserved', 'sold'] as const).map((s) => (
            <Button key={s} variant={filter === s ? 'default' : 'outline'} size="sm" className="text-xs capitalize h-7" onClick={() => setFilter(s)}>
              {s}
            </Button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filtered.map((p) => {
          const grad = LOCATION_GRADIENTS[p.location] || 'from-gray-900/60 to-gray-800/60'
          return (
            <Card key={p.id} className="overflow-hidden transition-all hover:border-primary/30">
              <div className={`h-40 bg-gradient-to-br ${grad} flex items-end p-4`}>
                <Badge variant={p.status === 'available' ? 'default' : p.status === 'reserved' ? 'secondary' : 'outline'} className="text-[10px] capitalize">
                  {p.status}
                </Badge>
              </div>
              <CardContent className="p-5">
                <p className="font-semibold mb-0.5">{p.title}</p>
                <p className="text-xs text-muted-foreground mb-3">{p.developer} &middot; {p.location}</p>
                <p className="text-xl font-mono font-semibold mb-3">{formatAED(p.price)}</p>
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <Badge variant="outline" className="text-[10px]">{p.bedrooms}</Badge>
                  <span className="font-mono text-xs text-muted-foreground">{p.areaSqft.toLocaleString()} sqft</span>
                  <span className="font-mono text-xs text-emerald-400">{p.rentalYield}% yield</span>
                </div>
                <p className="text-xs text-muted-foreground">{p.matchCount} AI matches &middot; {p.completionDate}</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {p.amenities.slice(0, 4).map((a) => (
                    <Badge key={a} variant="secondary" className="text-[9px] px-1.5 py-0">{a}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
