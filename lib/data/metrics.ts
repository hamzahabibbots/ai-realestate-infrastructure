import type { ActivityEvent } from '@/lib/types'

export const kpis = [
  { label: 'Leads Today', value: '47', delta: 12, format: 'number' },
  { label: 'Pipeline Value', value: 'AED 24.2M', delta: 8, format: 'currency' },
  { label: 'Bookings This Month', value: '18', delta: 22, format: 'number' },
  { label: 'Avg Response Time', value: '4.2s', delta: -12, format: 'time' },
  { label: 'Conversion Rate', value: '11.4%', delta: 3, format: 'percent' },
]

export const revenueSeries = [
  { month: 'Dec', revenue: 14.2, leads: 820 },
  { month: 'Jan', revenue: 16.8, leads: 940 },
  { month: 'Feb', revenue: 15.1, leads: 890 },
  { month: 'Mar', revenue: 19.4, leads: 1120 },
  { month: 'Apr', revenue: 22.6, leads: 1280 },
  { month: 'May', revenue: 24.2, leads: 1340 },
]

export const leadSources = [
  { source: 'Meta Ads', value: 428, fill: 'var(--chart-1)' },
  { source: 'Google Ads', value: 312, fill: 'var(--chart-2)' },
  { source: 'Property Portals', value: 264, fill: 'var(--chart-3)' },
  { source: 'Partners', value: 212, fill: 'var(--chart-5)' },
  { source: 'Organic / Referral', value: 124, fill: 'var(--chart-4)' },
]

export const funnel = [
  { stage: 'Leads', count: 1340, pct: 100 },
  { stage: 'Qualified', count: 509, pct: 38 },
  { stage: 'Visit', count: 218, pct: 16 },
  { stage: 'Negotiation', count: 96, pct: 7 },
  { stage: 'Booked', count: 42, pct: 3.1 },
]

export const responseTimeTrend = [
  { week: 'W1', ai: 4.8, human: 340 },
  { week: 'W2', ai: 4.5, human: 315 },
  { week: 'W3', ai: 4.6, human: 290 },
  { week: 'W4', ai: 4.2, human: 305 },
  { week: 'W5', ai: 4.1, human: 280 },
  { week: 'W6', ai: 4.2, human: 262 },
]

export const agentPerformance = [
  { agent: 'Omar Hassan', deals: 14, revenue: 'AED 9.8M', conversion: '16.2%', responseTime: '18m', trend: 8 },
  { agent: 'Sara Khan', deals: 11, revenue: 'AED 6.4M', conversion: '13.8%', responseTime: '24m', trend: 5 },
  { agent: 'Aria (AI)', deals: 9, revenue: 'AED 4.1M', conversion: '9.4%', responseTime: '4.2s', trend: 14 },
  { agent: 'Marcus (AI)', deals: 8, revenue: 'AED 3.9M', conversion: '11.1%', responseTime: '6.1s', trend: 11 },
]

export const campaignRoi = [
  { campaign: 'Marina Waterfront', spend: 42, revenue: 380, roi: 9.0 },
  { campaign: 'JVC Studios Reels', spend: 18, revenue: 96, roi: 5.3 },
  { campaign: 'Marina 2BR Search', spend: 35, revenue: 290, roi: 8.3 },
  { campaign: 'Hills Villas Lookalike', spend: 28, revenue: 140, roi: 5.0 },
  { campaign: 'Portal Listings', spend: 51, revenue: 265, roi: 5.2 },
]

export const lostReasons = [
  { reason: 'Budget mismatch', count: 84 },
  { reason: 'Went with competitor', count: 52 },
  { reason: 'Postponed decision', count: 47 },
  { reason: 'Financing declined', count: 29 },
  { reason: 'Location mismatch', count: 21 },
]

export const forecast = [
  { month: 'Jan', actual: 16.8, projected: null as number | null, low: null as number | null, high: null as number | null },
  { month: 'Feb', actual: 15.1, projected: null, low: null, high: null },
  { month: 'Mar', actual: 19.4, projected: null, low: null, high: null },
  { month: 'Apr', actual: 22.6, projected: null, low: null, high: null },
  { month: 'May', actual: 24.2, projected: 24.2, low: 24.2, high: 24.2 },
  { month: 'Jun', actual: null as number | null, projected: 26.1, low: 23.8, high: 28.4 },
  { month: 'Jul', actual: null, projected: 27.9, low: 24.6, high: 31.2 },
  { month: 'Aug', actual: null, projected: 29.4, low: 25.1, high: 33.8 },
]

export const salesVelocity = [
  { stage: 'Lead → Qualified', days: 1.2 },
  { stage: 'Qualified → Visit', days: 4.8 },
  { stage: 'Visit → Negotiation', days: 6.4 },
  { stage: 'Negotiation → Booked', days: 5.6 },
]

export const liveActivity: ActivityEvent[] = [
  { id: 'ev1', time: '2 min ago', worker: 'aria', message: 'Qualified lead L-2841 — score 87, visit proposed', type: 'lead' },
  { id: 'ev2', time: '5 min ago', worker: 'marcus', message: 'Booking form generated for Unit 2104, Marina Bay Tower', type: 'deal' },
  { id: 'ev3', time: '9 min ago', worker: 'aria', message: 'Site visit booked — Hillside Grove, Sunday 16:00', type: 'visit' },
  { id: 'ev4', time: '12 min ago', worker: 'sofia', message: 'Construction update sent to 64 Palm Vista buyers', type: 'message' },
  { id: 'ev5', time: '16 min ago', worker: 'aria', message: 'Language switch: conversation continued in Arabic', type: 'message' },
  { id: 'ev6', time: '18 min ago', worker: 'atlas', message: 'Answered management query on campaign revenue', type: 'system' },
  { id: 'ev7', time: '31 min ago', worker: 'aria', message: 'VIP lead escalated to Omar Hassan — budget AED 12M+', type: 'escalation' },
  { id: 'ev8', time: '40 min ago', worker: 'sofia', message: 'Payment reminder sent — instalment 4 due June 1', type: 'message' },
  { id: 'ev9', time: '54 min ago', worker: 'marcus', message: 'Price objection handled with comparable sales data', type: 'deal' },
  { id: 'ev10', time: '1 hr ago', worker: 'dev', message: 'Inventory broadcast sent to 34 Tier-1 partners', type: 'system' },
]

export const assistantExchanges: { question: string; answer: string }[] = [
  {
    question: 'How many leads arrived today?',
    answer:
      '47 leads arrived today — up 12% vs the same day last week. Top source: Meta Ads (18 leads, Marina Waterfront campaign). 9 are already qualified and 3 have visits booked.',
  },
  {
    question: 'Which campaign generated the most revenue?',
    answer:
      'Marina Waterfront (Meta) leads this month: AED 380K attributed revenue on AED 42K spend — a 9.0x ROI. Marina 2BR Search (Google) is second at 8.3x. Suggest shifting 20% of the Hills Villas budget toward Marina Waterfront.',
  },
  {
    question: 'What is our pipeline value?',
    answer:
      'Current pipeline is AED 24.2M across 42 active deals. Weighted by probability: AED 14.8M. The largest deal is Azure Sky Penthouse (AED 12.1M, 70% probability, in negotiation with Omar).',
  },
  {
    question: 'Why are conversions dropping on Instagram?',
    answer:
      'Instagram conversion fell 2.1pts this month. Root cause: 64% of Instagram leads are budget-mismatched for the promoted JVC inventory (avg stated budget AED 580K vs AED 640K entry price). Suggest promoting post-handover payment plans in Reels creative.',
  },
]

export const notifications = [
  { id: 'n1', title: 'VIP escalation', body: 'Elena Petrova (AED 12M+) transferred to Omar Hassan', time: '31 min ago', urgent: true },
  { id: 'n2', title: 'Approval needed', body: 'Marcus requests discount approval beyond 3% for Deal D-1043', time: '54 min ago', urgent: true },
  { id: 'n3', title: 'Visit reminder', body: '3 site visits scheduled this weekend — all agents confirmed', time: '2 hr ago', urgent: false },
  { id: 'n4', title: 'Anomaly detected', body: 'Atlas: Instagram response time up 40% this week', time: '2 hr ago', urgent: false },
]
