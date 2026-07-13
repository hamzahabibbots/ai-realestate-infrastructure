'use client'

import { useState } from 'react'
import { tasks as initialTasks } from '@/lib/data/tasks'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Bot } from 'lucide-react'
import type { Task } from '@/lib/types'

export default function TasksPage() {
  const [taskStates, setTaskStates] = useState<Record<string, boolean>>(
    Object.fromEntries(initialTasks.map((t) => [t.id, t.done]))
  )

  function toggle(id: string) {
    setTaskStates((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const today = initialTasks.filter((t) => t.due === 'today')
  const upcoming = initialTasks.filter((t) => t.due === 'upcoming')

  function TaskRow({ task }: { task: Task }) {
    const done = taskStates[task.id]
    return (
      <div className="flex items-center gap-3 py-2.5 group">
        <button onClick={() => toggle(task.id)} className={`w-4 h-4 rounded border shrink-0 flex items-center justify-center transition-colors ${done ? 'bg-primary border-primary' : 'border-border hover:border-primary/50'}`}>
          {done && <svg className="w-3 h-3 text-primary-foreground" viewBox="0 0 12 12" fill="none"><path d="M2.5 6L5 8.5L9.5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
        </button>
        <div className="flex-1 min-w-0">
          <p className={`text-sm ${done ? 'line-through text-muted-foreground' : ''}`}>{task.title}</p>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="font-mono text-[10px] text-muted-foreground">{task.dueLabel}</span>
            <span className="text-[10px] text-muted-foreground">{task.assignee}</span>
          </div>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <Badge variant={task.priority === 'high' ? 'destructive' : task.priority === 'medium' ? 'secondary' : 'outline'} className="text-[10px]">{task.priority}</Badge>
          {task.aiGenerated && (
            <Badge variant="outline" className="text-[10px] gap-1">
              <Bot className="h-3 w-3" />{task.originWorker}
            </Badge>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Tasks</h1>
      <Card>
        <CardContent className="p-6">
          <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground mb-3">Today</p>
          <div className="divide-y divide-border/50">
            {today.map((t) => <TaskRow key={t.id} task={t} />)}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-6">
          <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground mb-3">Upcoming</p>
          <div className="divide-y divide-border/50">
            {upcoming.map((t) => <TaskRow key={t.id} task={t} />)}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
