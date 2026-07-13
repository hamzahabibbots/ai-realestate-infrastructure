'use client'

import { useState } from 'react'
import { conversations } from '@/lib/data/conversations'
import { ConversationList } from '@/components/inbox/conversation-list'
import { MessageThread } from '@/components/inbox/message-thread'
import { Contact360 } from '@/components/inbox/contact-360'

export default function InboxPage() {
  const [selectedId, setSelectedId] = useState(conversations[0]?.id ?? '')
  const selected = conversations.find((c) => c.id === selectedId) ?? null

  return (
    <div className="flex h-[calc(100vh-8rem)] -m-6 overflow-hidden">
      <div className="w-[340px] border-r border-border flex-shrink-0 overflow-hidden">
        <ConversationList conversations={conversations} selectedId={selectedId} onSelect={setSelectedId} />
      </div>
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <MessageThread conversation={selected} />
      </div>
      <div className="w-[340px] border-l border-border flex-shrink-0 overflow-hidden hidden xl:block">
        {selected && <Contact360 contactId={selected.contactId} matchedPropertyIds={selected.matchedProperties} />}
      </div>
    </div>
  )
}
