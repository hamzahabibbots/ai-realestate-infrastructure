'use client'

import type { Conversation } from '@/lib/types'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Bot, User, Phone, Sparkles, SendHorizontal } from 'lucide-react'
import { CHANNEL_LABELS } from '@/lib/types'

export function MessageThread({ conversation }: { conversation: Conversation | null }) {
  if (!conversation) {
    return (
      <div className="flex items-center justify-center h-full text-muted-foreground">
        Select a conversation
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <div className="flex items-center gap-3">
          <h3 className="font-semibold">{conversation.contactName}</h3>
          <Badge variant="outline" className="text-[10px]">{CHANNEL_LABELS[conversation.channel]}</Badge>
          <Badge variant={conversation.status === 'open' ? 'default' : conversation.status === 'waiting' ? 'secondary' : 'outline'} className="text-[10px] capitalize">
            {conversation.status}
          </Badge>
        </div>
        <Button variant="outline" size="sm" className="h-7 text-xs gap-1.5">
          <User className="h-3 w-3" /> Take Over
        </Button>
      </div>

      <ScrollArea className="flex-1 px-4 py-4">
        <div className="space-y-4 max-w-3xl mx-auto">
          {conversation.messages.map((msg) => {
            if (msg.kind === 'system-event') {
              return (
                <div key={msg.id} className="flex justify-center">
                  <div className="bg-muted/30 rounded-lg py-2 px-4 text-xs text-muted-foreground italic text-center max-w-[80%]">
                    {msg.body}
                  </div>
                </div>
              )
            }
            if (msg.kind === 'call-summary') {
              return (
                <div key={msg.id} className="max-w-[80%]">
                  <div className="bg-muted/50 border border-border rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Phone className="h-3.5 w-3.5 text-primary" />
                      <span className="text-xs font-medium text-primary">Call Summary</span>
                    </div>
                    <p className="text-sm leading-relaxed">{msg.body}</p>
                    <p className="font-mono text-[10px] text-muted-foreground mt-2">{msg.time}</p>
                  </div>
                </div>
              )
            }

            const isContact = msg.sender === 'contact'
            const isAi = msg.sender === 'ai'

            return (
              <div key={msg.id} className={isContact ? '' : ''}>
                {!isContact && (
                  <div className="flex items-center gap-1.5 mb-1">
                    {isAi ? <Bot className="h-3 w-3 text-primary" /> : <User className="h-3 w-3 text-muted-foreground" />}
                    <span className={`text-[11px] ${isAi ? 'text-primary' : 'text-muted-foreground'}`}>{msg.senderName}</span>
                  </div>
                )}
                {isContact && (
                  <div className="mb-1">
                    <span className="text-[11px] text-muted-foreground">{msg.senderName}</span>
                  </div>
                )}
                <div className={`max-w-[70%] rounded-2xl px-4 py-2.5 ${
                  isContact ? 'bg-muted rounded-tl-sm' :
                  isAi ? 'bg-card border border-primary/20 rounded-tl-sm' :
                  'bg-card border border-border rounded-tl-sm'
                }`}>
                  <p className="text-sm leading-relaxed">{msg.body}</p>
                </div>
                <p className="font-mono text-[10px] text-muted-foreground mt-1">{msg.time}</p>
              </div>
            )
          })}
        </div>
      </ScrollArea>

      <div className="border-t border-border p-3">
        <div className="flex items-center gap-2">
          <Input placeholder="Type a message..." className="flex-1 h-9" />
          <Button variant="ghost" size="icon" className="h-9 w-9 shrink-0">
            <Sparkles className="h-4 w-4" />
          </Button>
          <Button size="icon" className="h-9 w-9 shrink-0">
            <SendHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
