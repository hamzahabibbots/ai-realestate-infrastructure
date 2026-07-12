export type Channel =
  | 'whatsapp'
  | 'instagram'
  | 'facebook'
  | 'email'
  | 'sms'
  | 'webchat'
  | 'voice'

export type LeadStage =
  | 'new'
  | 'contacted'
  | 'qualified'
  | 'visit-booked'
  | 'visit-done'
  | 'negotiation'
  | 'booked'
  | 'lost'

export type WorkerId = 'aria' | 'marcus' | 'sofia' | 'dev' | 'atlas'

export interface Worker {
  id: WorkerId
  name: string
  role: string
  status: 'active' | 'idle'
  tagline: string
  purpose: string
  channels: Channel[]
  capabilities: string[]
  triggerEvents: string[]
  handoffTo: { target: string; rule: string }[]
  integrations: string[]
  memorySummary: string
  kpis: { label: string; value: string; delta: number }[]
  activity: WorkerActivity[]
  color: string
}

export interface WorkerActivity {
  id: string
  time: string
  action: string
  entity?: string
}

export interface Contact {
  id: string
  name: string
  phone: string
  email: string
  nationality: string
  language: string
  budgetMin: number
  budgetMax: number
  propertyType: string
  bedrooms: string
  preferredAreas: string[]
  timeline: string
  mortgageStatus: string
  motivation: string
  investmentGoal: string
  commPreference: Channel
  notes: string
}

export interface Lead {
  id: string
  contactId: string
  name: string
  source: string
  campaign?: string
  score: number
  scoreBreakdown: { factor: string; points: number }[]
  intent: 'buy' | 'invest' | 'rent'
  urgency: 'high' | 'medium' | 'low'
  stage: LeadStage
  assignedWorker: WorkerId
  assignedAgent?: string
  createdAt: string
  lastActivity: string
  vip?: boolean
}

export interface Property {
  id: string
  title: string
  project: string
  developer: string
  type: string
  bedrooms: string
  price: number
  areaSqft: number
  location: string
  amenities: string[]
  status: 'available' | 'reserved' | 'sold'
  rentalYield: number
  matchCount: number
  image: string
  completionDate: string
}

export interface Deal {
  id: string
  leadName: string
  property: string
  stage:
    | 'qualified'
    | 'visit-scheduled'
    | 'visit-completed'
    | 'negotiation'
    | 'booking'
    | 'closed'
  value: number
  probability: number
  nextStep: string
  aiHint: string
  worker: WorkerId
  daysInStage: number
}

export interface Message {
  id: string
  sender: 'contact' | 'ai' | 'human' | 'system'
  senderName: string
  body: string
  time: string
  channel: Channel
  kind?: 'text' | 'call-summary' | 'system-event'
}

export interface Conversation {
  id: string
  contactId: string
  contactName: string
  channel: Channel
  lastMessage: string
  lastTime: string
  unread: number
  score: number
  handledBy: 'ai' | 'human'
  worker: WorkerId
  status: 'open' | 'waiting' | 'resolved'
  messages: Message[]
  matchedProperties: string[]
}

export interface CallRecord {
  id: string
  contactName: string
  direction: 'inbound' | 'outbound'
  duration: string
  time: string
  sentiment: 'positive' | 'neutral' | 'negative'
  summary: string
  transcript: string
  handledBy: 'ai' | 'human'
}

export interface Task {
  id: string
  title: string
  due: 'today' | 'upcoming'
  dueLabel: string
  assignee: string
  aiGenerated: boolean
  originWorker?: WorkerId
  priority: 'high' | 'medium' | 'low'
  done: boolean
}

export interface DealDocuments {
  id: string
  dealName: string
  buyer: string
  documents: { name: string; status: 'received' | 'pending' | 'expired' }[]
  alert?: string
}

export interface Workflow {
  id: string
  name: string
  trigger: string
  status: 'active' | 'paused'
  runs30d: number
  successRate: number
  nodes: WorkflowNode[]
}

export interface WorkflowNode {
  id: string
  type: 'trigger' | 'condition' | 'ai-decision' | 'action' | 'delay' | 'escalation'
  label: string
  detail: string
}

export interface KnowledgeItem {
  id: string
  title: string
  type: 'SOP' | 'FAQ' | 'Pricing' | 'Script' | 'Legal' | 'Brochure' | 'RERA'
  updatedAt: string
  usedBy: WorkerId[]
  size: string
}

export interface Visit {
  id: string
  leadName: string
  property: string
  time: string
  agent: string
  status: 'confirmed' | 'pending' | 'completed'
}

export interface ActivityEvent {
  id: string
  time: string
  worker: WorkerId
  message: string
  type: 'lead' | 'message' | 'visit' | 'deal' | 'system' | 'escalation'
}

export const CHANNEL_LABELS: Record<Channel, string> = {
  whatsapp: 'WhatsApp',
  instagram: 'Instagram',
  facebook: 'Facebook',
  email: 'Email',
  sms: 'SMS',
  webchat: 'Web Chat',
  voice: 'Voice',
}

export const STAGE_LABELS: Record<LeadStage, string> = {
  new: 'New',
  contacted: 'Contacted',
  qualified: 'Qualified',
  'visit-booked': 'Visit Booked',
  'visit-done': 'Visit Done',
  negotiation: 'Negotiation',
  booked: 'Booked',
  lost: 'Lost',
}

export function formatAED(value: number): string {
  if (value >= 1_000_000) return `AED ${(value / 1_000_000).toFixed(1)}M`
  if (value >= 1_000) return `AED ${(value / 1_000).toFixed(0)}K`
  return `AED ${value}`
}
