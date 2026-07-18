'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from '@/components/ui/sidebar'
import {
  LayoutDashboard,
  BarChart3,
  MessageSquare,
  Phone,
  Users,
  Kanban,
  Building2,
  Contact,
  CheckSquare,
  FileText,
  Workflow,
  Bot,
  BookOpen,
  Settings,
} from 'lucide-react'
import { workers } from '@/lib/data/workers'

const NAV_GROUPS = [
  {
    label: 'OVERVIEW',
    items: [
      { label: 'Dashboard', icon: LayoutDashboard, href: '/' },
      { label: 'Analytics', icon: BarChart3, href: '/analytics' },
    ],
  },
  {
    label: 'ENGAGE',
    items: [
      { label: 'Inbox', icon: MessageSquare, href: '/inbox' },
      { label: 'Calls', icon: Phone, href: '/calls' },
      { label: 'Leads', icon: Users, href: '/leads' },
    ],
  },
  {
    label: 'SALES',
    items: [
      { label: 'Pipeline', icon: Kanban, href: '/pipeline' },
      { label: 'Properties', icon: Building2, href: '/properties' },
      { label: 'CRM', icon: Contact, href: '/crm' },
    ],
  },
  {
    label: 'OPERATE',
    items: [
      { label: 'Tasks', icon: CheckSquare, href: '/tasks' },
      { label: 'Documents', icon: FileText, href: '/documents' },
      { label: 'Automation', icon: Workflow, href: '/automation' },
    ],
  },
  {
    label: 'SYSTEM',
    items: [
      { label: 'AI Workers', icon: Bot, href: '/workers' },
      { label: 'Knowledge Base', icon: BookOpen, href: '/knowledge' },
      { label: 'Settings', icon: Settings, href: '/settings' },
    ],
  },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar variant="sidebar" collapsible="icon">
      <SidebarHeader className="p-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4 text-primary-foreground">
              <path d="M8 1L14.5 5V11L8 15L1.5 11V5L8 1Z" fill="currentColor" />
            </svg>
          </div>
          <span className="font-mono text-sm font-semibold uppercase tracking-[0.2em] group-data-[collapsible=icon]:hidden">
            Estate OS
          </span>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        {NAV_GROUPS.map((group) => (
          <SidebarGroup key={group.label}>
            <SidebarGroupLabel className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground/60 px-3">
              {group.label}
            </SidebarGroupLabel>
            <SidebarMenu>
              {group.items.map((item) => {
                const isActive = item.href === '/'
                  ? pathname === '/'
                  : pathname.startsWith(item.href)
                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      isActive={isActive}
                      tooltip={item.label}
                      render={<Link href={item.href} />}
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="p-4 group-data-[collapsible=icon]:p-2">
        <div className="space-y-2 group-data-[collapsible=icon]:hidden">
          <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground/60">
            Workers
          </p>
          <div className="flex flex-col gap-1.5">
            {workers.map((w) => (
              <div key={w.id} className="flex items-center gap-2">
                <div
                  className={`h-1.5 w-1.5 rounded-full ${w.status === 'active' ? 'bg-emerald-400' : 'bg-muted-foreground/40'}`}
                />
                <span className="text-xs text-muted-foreground">{w.name}</span>
                <span className="text-[10px] text-muted-foreground/50 ml-auto">{w.role}</span>
              </div>
            ))}
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
