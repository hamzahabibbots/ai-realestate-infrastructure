'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command'
import {
  LayoutDashboard, BarChart3, MessageSquare, Phone, Users,
  Kanban, Building2, Contact, CheckSquare, FileText, Workflow,
  Bot, BookOpen, Settings, Plus, Brain, Search,
} from 'lucide-react'

const NAV_ITEMS = [
  { label: 'Dashboard', icon: LayoutDashboard, href: '/' },
  { label: 'Analytics', icon: BarChart3, href: '/analytics' },
  { label: 'Inbox', icon: MessageSquare, href: '/inbox' },
  { label: 'Calls', icon: Phone, href: '/calls' },
  { label: 'Leads', icon: Users, href: '/leads' },
  { label: 'Pipeline', icon: Kanban, href: '/pipeline' },
  { label: 'Properties', icon: Building2, href: '/properties' },
  { label: 'CRM', icon: Contact, href: '/crm' },
  { label: 'Tasks', icon: CheckSquare, href: '/tasks' },
  { label: 'Documents', icon: FileText, href: '/documents' },
  { label: 'Automation', icon: Workflow, href: '/automation' },
  { label: 'AI Workers', icon: Bot, href: '/workers' },
  { label: 'Knowledge Base', icon: BookOpen, href: '/knowledge' },
  { label: 'Settings', icon: Settings, href: '/settings' },
]

const QUICK_ACTIONS = [
  { label: 'New Lead', icon: Plus },
  { label: 'Ask Atlas AI', icon: Brain },
  { label: 'Search Contacts', icon: Search },
]

export function CommandPalette() {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setOpen((prev) => !prev)
      }
    }
    function handleCustomOpen() {
      setOpen(true)
    }
    document.addEventListener('keydown', handleKeyDown)
    window.addEventListener('open-command-palette', handleCustomOpen)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('open-command-palette', handleCustomOpen)
    }
  }, [])

  function navigate(href: string) {
    setOpen(false)
    router.push(href)
  }

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Navigate">
          {NAV_ITEMS.map((item) => (
            <CommandItem key={item.href} onSelect={() => navigate(item.href)}>
              <item.icon className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>{item.label}</span>
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Quick Actions">
          {QUICK_ACTIONS.map((action) => (
            <CommandItem key={action.label} onSelect={() => setOpen(false)}>
              <action.icon className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>{action.label}</span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}
