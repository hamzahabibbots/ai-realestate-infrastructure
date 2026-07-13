'use client'

import { usePathname } from 'next/navigation'
import { SidebarTrigger } from '@/components/ui/sidebar'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Bell, Search } from 'lucide-react'
import { notifications } from '@/lib/data/metrics'

const ROUTE_LABELS: Record<string, string> = {
  '/': 'Dashboard',
  '/analytics': 'Analytics',
  '/inbox': 'Inbox',
  '/calls': 'Calls',
  '/leads': 'Leads',
  '/pipeline': 'Pipeline',
  '/properties': 'Properties',
  '/crm': 'CRM',
  '/tasks': 'Tasks',
  '/documents': 'Documents',
  '/automation': 'Automation',
  '/workers': 'AI Workers',
  '/knowledge': 'Knowledge Base',
  '/settings': 'Settings',
}

export function Topbar() {
  const pathname = usePathname()
  const basePath = '/' + (pathname.split('/')[1] || '')
  const currentLabel = ROUTE_LABELS[basePath] || ROUTE_LABELS[pathname] || 'Estate OS'
  const urgentCount = notifications.filter((n) => n.urgent).length

  function openCommandPalette() {
    window.dispatchEvent(new CustomEvent('open-command-palette'))
  }

  return (
    <header className="flex h-14 items-center gap-2 border-b border-border px-4">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mx-2 h-5" />

      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <span className="text-xs text-muted-foreground">Estate OS</span>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="text-sm font-medium">{currentLabel}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="ml-auto flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          className="hidden sm:flex items-center gap-2 text-muted-foreground h-8 px-3"
          onClick={openCommandPalette}
        >
          <Search className="h-3.5 w-3.5" />
          <span className="text-xs">Search...</span>
          <kbd className="ml-2 pointer-events-none hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium sm:flex">
            <span className="text-xs">&#8984;</span>K
          </kbd>
        </Button>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" className="relative h-8 w-8">
              <Bell className="h-4 w-4" />
              {urgentCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] font-mono text-destructive-foreground">
                  {urgentCount}
                </span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-0" align="end">
            <div className="border-b border-border p-3">
              <p className="text-sm font-semibold">Notifications</p>
            </div>
            <ScrollArea className="h-[280px]">
              <div className="space-y-0">
                {notifications.map((n) => (
                  <div key={n.id} className="flex gap-3 border-b border-border/50 p-3 last:border-0">
                    {n.urgent && <div className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-destructive" />}
                    {!n.urgent && <div className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-muted-foreground/30" />}
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium">{n.title}</p>
                      <p className="text-xs text-muted-foreground">{n.body}</p>
                      <p className="mt-1 font-mono text-[10px] text-muted-foreground/60">{n.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </PopoverContent>
        </Popover>
      </div>
    </header>
  )
}
