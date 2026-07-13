'use client'

import { useState } from 'react'
import type { Conversation } from '@/lib/types'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Search, MessageCircle, Camera, Mail, Phone, Globe, MessageSquare, Smartphone, Bot, User } from 'lucide-react'
import { cn } from '@/lib/utils'

const CHANNEL_ICONS: Record<string, React.ElementType> = {
  whatsapp: MessageCircle, instagram: Camera, email: Mail, voice: Phone,
  webchat: Globe, facebook: MessageSquare, sms: Smartphone,
}

type Filter = 'all' | 'unread' | 'ai' | 'human'

export function ConversationList({ conversations, selectedId, onSelect }: {
  conversations: Conversation[]; selectedId: string; onSelect: (id: string) => void
}) {
  const [filter, setFilter] = useState<Filter>('all')
  const [search, setSearch] = useState('')
  const totalUnread = conversations.reduce((s, c) => s + c.unread, 0)

  const filtered = conversations.filter((c) => {
    if (filter === 'unread' && c.unread === 0) return false
    if (filter === 'ai' && c.handledBy !== 'ai') return false
    if (filter === 'human' && c.handledBy !== 'human') return false
    if (search && !c.contactName.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  const filters: { key: Filter; label: string }[] = [
    { key: 'all', label: 'All' }, { key: 'unread', label: 'Unread' },
    { key: 'ai', label: 'AI' }, { key: 'human', label: 'Human' },
  ]

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-border space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Inbox</h2>
          {totalUnread > 0 && <Badge>{totalUnread}</Badge>}
        </div>
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <Input placeholder="Search..." className="pl-8 h-8 text-sm" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <div className="flex gap-1">
          {filters.map((f) => (
            <button key={f.key} onClick={() => setFilter(f.key)}
              className={cn('px-2.5 py-1 rounded-md text-xs font-medium transition-colors',
                filter === f.key ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-accent'
              )}>
              {f.label}
            </button>
          ))}
        </div>
      </div>
      <ScrollArea className="flex-1">
        {filtered.map((c) => {
          const Icon = CHANNEL_ICONS[c.channel] || MessageCircle
          return (
            <button key={c.id} onClick={() => onSelect(c.id)}
              className={cn('w-full text-left p-3 border-b border-border/50 transition-colors',
                selectedId === c.id ? 'bg-accent/50 border-l-2 border-l-primary' : 'hover:bg-accent/20'
              )}>
              <div className="flex items-start gap-2.5">
                <Icon className="h-4 w-4 mt-0.5 text-muted-foreground shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-medium truncate">{c.contactName}</span>
                    <span className="font-mono text-[10px] text-muted-foreground shrink-0">{c.lastTime}</span>
                  </div>
                  <p className="text-xs text-muted-foreground truncate mt-0.5">{c.lastMessage}</p>
                  <div className="flex items-center gap-1.5 mt-1.5">
                    <span className="font-mono text-[10px] text-primary">{c.score}</span>
                    {c.unread > 0 && <Badge className="h-4 px-1 text-[10px]">{c.unread}</Badge>}
                    {c.handledBy === 'ai' ? <Bot className="h-3 w-3 text-muted-foreground" /> : <User className="h-3 w-3 text-muted-foreground" />}
                  </div>
                </div>
              </div>
            </button>
          )
        })}
      </ScrollArea>
    </div>
  )
}
