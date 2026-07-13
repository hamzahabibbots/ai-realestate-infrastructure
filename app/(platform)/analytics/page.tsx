'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import type { ChartConfig } from '@/components/ui/chart'
import { Area, AreaChart, Bar, BarChart, XAxis, YAxis, CartesianGrid } from 'recharts'
import { ArrowUp, ArrowDown } from 'lucide-react'
import { kpis, revenueSeries, funnel, agentPerformance, campaignRoi, forecast, salesVelocity, lostReasons, leadSources, responseTimeTrend } from '@/lib/data/metrics'

const revenueConfig = { revenue: { label: 'Revenue (AED M)', color: 'var(--chart-1)' } } satisfies ChartConfig
const sourceConfig = Object.fromEntries(leadSources.map((s) => [s.source, { label: s.source, color: s.fill }])) satisfies ChartConfig
const lostConfig = { count: { label: 'Count', color: 'var(--chart-4)' } } satisfies ChartConfig
const roiConfig = { spend: { label: 'Spend (AED K)', color: 'var(--chart-4)' }, revenue: { label: 'Revenue (AED K)', color: 'var(--chart-2)' } } satisfies ChartConfig
const forecastConfig = { actual: { label: 'Actual', color: 'var(--chart-1)' }, projected: { label: 'Projected', color: 'var(--chart-5)' } } satisfies ChartConfig

const OPACITIES = ['opacity-100', 'opacity-80', 'opacity-60', 'opacity-40', 'opacity-25']

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Analytics</h1>
        <p className="text-muted-foreground">Enterprise performance dashboard</p>
      </div>

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="funnel">Funnel</TabsTrigger>
          <TabsTrigger value="agents">Agents</TabsTrigger>
          <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6 mt-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {kpis.map((k) => (
              <Card key={k.label}>
                <CardContent className="p-4">
                  <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground mb-1">{k.label}</p>
                  <p className="text-xl font-mono font-semibold">{k.value}</p>
                  <div className={`flex items-center gap-1 mt-1 text-xs ${k.delta >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {k.delta >= 0 ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
                    <span className="font-mono">{Math.abs(k.delta)}%</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-sm font-medium">Revenue Trend</CardTitle></CardHeader>
            <CardContent>
              <ChartContainer config={revenueConfig} className="h-[280px] w-full">
                <AreaChart data={revenueSeries} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--chart-1)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="var(--chart-1)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" strokeOpacity={0.5} />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }} tickFormatter={(v) => `${v}M`} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area type="monotone" dataKey="revenue" stroke="var(--chart-1)" fill="url(#areaFill)" strokeWidth={2} />
                </AreaChart>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-sm font-medium">Lead Sources</CardTitle></CardHeader>
            <CardContent>
              <ChartContainer config={sourceConfig} className="h-[220px] w-full">
                <BarChart data={leadSources} layout="vertical" margin={{ left: 100 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" strokeOpacity={0.3} horizontal={false} />
                  <XAxis type="number" axisLine={false} tickLine={false} tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }} />
                  <YAxis dataKey="source" type="category" axisLine={false} tickLine={false} tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }} width={90} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="value" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="funnel" className="space-y-6 mt-4">
          <Card>
            <CardContent className="p-6">
              <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground mb-5">Conversion Funnel</p>
              <div className="space-y-3">
                {funnel.map((stage, i) => (
                  <div key={stage.stage} className="flex items-center gap-4">
                    <div className="relative flex-1" style={{ paddingLeft: `${i * 5}%`, paddingRight: `${i * 5}%` }}>
                      <div className={`bg-primary ${OPACITIES[i]} rounded-md h-12 flex items-center px-4`}>
                        <span className="text-sm font-medium text-primary-foreground/90">{stage.stage}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 w-[140px] shrink-0 justify-end">
                      <span className="font-mono text-lg font-semibold">{stage.count.toLocaleString()}</span>
                      <span className="font-mono text-sm text-muted-foreground">{stage.pct}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {salesVelocity.map((s) => (
              <Card key={s.stage}>
                <CardContent className="p-4">
                  <p className="text-[11px] uppercase tracking-wider text-muted-foreground mb-1">{s.stage}</p>
                  <p className="text-2xl font-mono font-semibold">{s.days}<span className="text-sm text-muted-foreground ml-1">days</span></p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-sm font-medium">Lost Lead Reasons</CardTitle></CardHeader>
            <CardContent>
              <ChartContainer config={lostConfig} className="h-[220px] w-full">
                <BarChart data={lostReasons} layout="vertical" margin={{ left: 120 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" strokeOpacity={0.3} horizontal={false} />
                  <XAxis type="number" axisLine={false} tickLine={false} tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }} />
                  <YAxis dataKey="reason" type="category" axisLine={false} tickLine={false} tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }} width={110} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="count" fill="var(--chart-4)" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="agents" className="mt-4">
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-sm font-medium">Agent Performance</CardTitle></CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Agent</TableHead>
                    <TableHead className="text-right">Deals</TableHead>
                    <TableHead className="text-right">Revenue</TableHead>
                    <TableHead className="text-right">Conversion</TableHead>
                    <TableHead className="text-right">Response Time</TableHead>
                    <TableHead className="text-right">Trend</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {agentPerformance.map((a) => (
                    <TableRow key={a.agent}>
                      <TableCell className="font-medium">{a.agent}</TableCell>
                      <TableCell className="text-right font-mono">{a.deals}</TableCell>
                      <TableCell className="text-right font-mono">{a.revenue}</TableCell>
                      <TableCell className="text-right font-mono">{a.conversion}</TableCell>
                      <TableCell className="text-right font-mono">{a.responseTime}</TableCell>
                      <TableCell className="text-right">
                        <span className={`inline-flex items-center gap-1 text-xs ${a.trend >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                          {a.trend >= 0 ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
                          {Math.abs(a.trend)}%
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="campaigns" className="space-y-6 mt-4">
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-sm font-medium">Campaign ROI</CardTitle></CardHeader>
            <CardContent>
              <ChartContainer config={roiConfig} className="h-[280px] w-full">
                <BarChart data={campaignRoi} layout="vertical" margin={{ left: 130 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" strokeOpacity={0.3} horizontal={false} />
                  <XAxis type="number" axisLine={false} tickLine={false} tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }} />
                  <YAxis dataKey="campaign" type="category" axisLine={false} tickLine={false} tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }} width={120} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="spend" fill="var(--chart-4)" radius={[0, 4, 4, 0]} />
                  <Bar dataKey="revenue" fill="var(--chart-2)" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ChartContainer>
              <div className="flex flex-wrap gap-3 mt-3">
                {campaignRoi.map((c) => (
                  <Badge key={c.campaign} variant="outline" className="font-mono text-xs">{c.campaign}: {c.roi}x ROI</Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-sm font-medium">Revenue Forecast</CardTitle></CardHeader>
            <CardContent>
              <ChartContainer config={forecastConfig} className="h-[280px] w-full">
                <AreaChart data={forecast} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="projBand" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--chart-5)" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="var(--chart-5)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" strokeOpacity={0.5} />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }} tickFormatter={(v) => `${v}M`} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area type="monotone" dataKey="actual" stroke="var(--chart-1)" fill="none" strokeWidth={2} connectNulls={false} />
                  <Area type="monotone" dataKey="projected" stroke="var(--chart-5)" fill="url(#projBand)" strokeWidth={2} strokeDasharray="5 5" />
                </AreaChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
