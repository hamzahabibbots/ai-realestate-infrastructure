'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ChartContainer } from '@/components/ui/chart'
import type { ChartConfig } from '@/components/ui/chart'
import { Pie, PieChart, Cell } from 'recharts'
import { leadSources } from '@/lib/data/metrics'

const chartConfig = Object.fromEntries(
  leadSources.map((s) => [s.source, { label: s.source, color: s.fill }])
) satisfies ChartConfig

export function LeadSourceChart() {
  const total = leadSources.reduce((sum, s) => sum + s.value, 0)

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">Lead Sources</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <ChartContainer config={chartConfig} className="h-[200px] w-full">
          <PieChart>
            <Pie
              data={leadSources}
              dataKey="value"
              nameKey="source"
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={85}
              strokeWidth={2}
              stroke="var(--background)"
            >
              {leadSources.map((entry) => (
                <Cell key={entry.source} fill={entry.fill} />
              ))}
            </Pie>
            <text x="50%" y="50%" textAnchor="middle" dominantBaseline="central">
              <tspan x="50%" dy="-6" className="fill-foreground font-mono text-2xl font-bold">{total}</tspan>
              <tspan x="50%" dy="18" className="fill-muted-foreground text-xs">leads</tspan>
            </text>
          </PieChart>
        </ChartContainer>
        <div className="grid grid-cols-2 gap-x-6 gap-y-1.5 mt-2 w-full">
          {leadSources.map((s) => (
            <div key={s.source} className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full" style={{ backgroundColor: s.fill }} />
              <span className="text-xs text-muted-foreground">{s.source}</span>
              <span className="ml-auto font-mono text-xs">{s.value}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
