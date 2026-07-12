import type { Worker } from '@/lib/types'

export const workers: Worker[] = [
  {
    id: 'aria',
    name: 'Aria',
    role: 'Pre-Sales',
    status: 'active',
    tagline: 'First responder for every enquiry, on every channel.',
    purpose:
      'Owns all incoming enquiries. Responds within seconds in any language, answers project and pricing questions, qualifies leads conversationally, scores them, books site visits, and hands qualified buyers to Marcus.',
    channels: ['whatsapp', 'instagram', 'facebook', 'email', 'sms', 'webchat', 'voice'],
    capabilities: [
      'Respond to new leads in under 5 seconds',
      'Detect language and reply natively',
      'Identify returning customers from memory',
      'Answer FAQs, pricing, payment plans, amenities, locality',
      'Collect qualification data naturally in conversation',
      'Determine buying intent, investment intent, and urgency',
      'Recommend matching properties with explanations',
      'Calculate and update lead score in real time',
      'Book, confirm, remind, and reschedule site visits',
      'Escalate VIP leads to a human immediately',
      'Run follow-up sequences until conversion or closure',
    ],
    triggerEvents: ['Lead Created', 'Message Received', 'Call Ended', 'Visit Cancelled'],
    handoffTo: [
      { target: 'Marcus (Sales)', rule: 'Lead score ≥ 80 and qualification complete' },
      { target: 'Human agent', rule: 'VIP flag, legal question, or explicit request' },
    ],
    integrations: ['WhatsApp Business API', 'Meta Ads', 'Google Ads', 'Twilio Voice', 'Google Calendar', '99acres', 'MagicBricks'],
    memorySummary:
      'Holds full conversation history for 1,284 active contacts. Never re-asks a known preference. Shares qualification data with Marcus and the CRM instantly.',
    kpis: [
      { label: 'Avg response time', value: '4.2s', delta: -12 },
      { label: 'Conversations today', value: '186', delta: 9 },
      { label: 'Qualification rate', value: '38%', delta: 5 },
      { label: 'Visits booked (7d)', value: '64', delta: 14 },
    ],
    activity: [
      { id: 'a1', time: '2 min ago', action: 'Qualified lead and computed score 87', entity: 'Rohan Mehta' },
      { id: 'a2', time: '9 min ago', action: 'Booked site visit at Marina Bay Tower for Saturday 11:00', entity: 'Fatima Al Rashid' },
      { id: 'a3', time: '16 min ago', action: 'Detected Arabic, switched conversation language', entity: 'Khalid Rahman' },
      { id: 'a4', time: '31 min ago', action: 'Escalated VIP lead to human agent (budget AED 12M)', entity: 'Elena Petrova' },
      { id: 'a5', time: '48 min ago', action: 'Sent payment plan comparison for Palm Vista Residences', entity: 'James Carter' },
    ],
    color: 'chart-1',
  },
  {
    id: 'marcus',
    name: 'Marcus',
    role: 'Sales',
    status: 'active',
    tagline: 'Owns the buyer from qualification to booking.',
    purpose:
      'Takes over qualified buyers. Tracks every deal stage, handles objections, recommends alternatives, coordinates negotiation, collects documents, generates booking paperwork, and coordinates finance, legal, and operations.',
    channels: ['whatsapp', 'email', 'voice'],
    capabilities: [
      'Track every deal stage automatically',
      'Handle objections with knowledge-base grounding',
      'Recommend alternative units when hesitation is detected',
      'Coordinate negotiations and internal approvals',
      'Collect KYC and mortgage documents',
      'Generate booking forms, reservation forms, and invoices',
      'Coordinate with finance, legal, and operations teams',
      'Produce internal deal summaries after every interaction',
      'Notify the assigned human agent at key moments',
    ],
    triggerEvents: ['Lead Qualified', 'Visit Completed', 'Objection Raised', 'Document Uploaded'],
    handoffTo: [
      { target: 'Sofia (Customer Success)', rule: 'Booking confirmed and payment received' },
      { target: 'Human agent', rule: 'Final negotiation or discount beyond 3%' },
    ],
    integrations: ['DocuSign', 'Stripe', 'Razorpay', 'Gmail', 'Internal CRM'],
    memorySummary:
      'Tracks 42 active deals with full objection history and document status. Inherits complete pre-sales context from Aria on every handoff.',
    kpis: [
      { label: 'Active deals', value: '42', delta: 6 },
      { label: 'Conversion rate', value: '24%', delta: 3 },
      { label: 'Avg sales velocity', value: '18d', delta: -8 },
      { label: 'Doc completion', value: '91%', delta: 4 },
    ],
    activity: [
      { id: 'm1', time: '5 min ago', action: 'Generated booking form for Unit 2104, Marina Bay Tower', entity: 'Priya Sharma' },
      { id: 'm2', time: '22 min ago', action: 'Handled price objection with comparable sales data', entity: 'Rohan Mehta' },
      { id: 'm3', time: '54 min ago', action: 'Requested missing Emirates ID copy', entity: 'James Carter' },
      { id: 'm4', time: '1 hr ago', action: 'Notified agent Omar: negotiation approval needed', entity: 'Deal #D-1042' },
    ],
    color: 'chart-2',
  },
  {
    id: 'sofia',
    name: 'Sofia',
    role: 'Customer Success',
    status: 'active',
    tagline: 'Keeps customers happy for years after booking.',
    purpose:
      'Owns the customer after booking. Manages agreements, payment reminders, construction updates, registration, possession, warranty questions, reviews, referral campaigns, and repeat-investment opportunities.',
    channels: ['whatsapp', 'email', 'sms'],
    capabilities: [
      'Send agreement status updates and next steps',
      'Run payment reminder ladders before due dates',
      'Broadcast construction milestone updates with photos',
      'Guide customers through registration and possession',
      'Answer warranty and snagging questions',
      'Launch referral campaigns to happy customers',
      'Request reviews at high-satisfaction moments',
      'Surface repeat investment opportunities',
    ],
    triggerEvents: ['Booking Confirmed', 'Payment Due', 'Construction Milestone', 'Possession Date Set', 'Customer Inactive'],
    handoffTo: [{ target: 'Human agent', rule: 'Dispute, refund request, or legal escalation' }],
    integrations: ['WhatsApp Business API', 'Stripe', 'Razorpay', 'Gmail', 'Construction ERP'],
    memorySummary:
      'Manages 318 post-booking customers across 9 projects. Tracks payment schedules, milestones, and satisfaction signals per customer.',
    kpis: [
      { label: 'Customers managed', value: '318', delta: 11 },
      { label: 'On-time payments', value: '96%', delta: 2 },
      { label: 'Referral rate', value: '19%', delta: 6 },
      { label: 'CSAT', value: '4.8', delta: 1 },
    ],
    activity: [
      { id: 's1', time: '12 min ago', action: 'Sent milestone update: Tower B slab casting complete', entity: 'Palm Vista buyers (64)' },
      { id: 's2', time: '40 min ago', action: 'Payment reminder sent, instalment 4 due June 1', entity: 'Anita Desai' },
      { id: 's3', time: '2 hr ago', action: 'Launched referral offer to 5-star reviewers', entity: 'Creek Horizon' },
    ],
    color: 'chart-3',
  },
  {
    id: 'dev',
    name: 'Dev',
    role: 'Channel Partner Manager',
    status: 'idle',
    tagline: 'Keeps the entire partner network in sync.',
    purpose:
      'Automates all channel partner communication: inventory and offer updates, commission tracking, partner lead routing, onboarding, performance reports, and broadcast announcements.',
    channels: ['whatsapp', 'email'],
    capabilities: [
      'Broadcast inventory and price updates to partners',
      'Route partner-sourced leads into the pre-sales queue',
      'Track commissions per partner and per deal',
      'Onboard new partners with automated document collection',
      'Generate monthly partner performance reports',
      'Answer partner questions on availability and offers',
    ],
    triggerEvents: ['Inventory Changed', 'Partner Lead Received', 'Commission Event', 'New Partner Signed'],
    handoffTo: [
      { target: 'Aria (Pre-Sales)', rule: 'Partner lead received — enters standard qualification' },
      { target: 'Human agent', rule: 'Commission dispute' },
    ],
    integrations: ['WhatsApp Business API', 'Gmail', 'Partner Portal', 'Zapier'],
    memorySummary:
      'Maintains profiles for 87 active channel partners including tier, specialization, and 12-month performance history.',
    kpis: [
      { label: 'Active partners', value: '87', delta: 4 },
      { label: 'Partner leads (30d)', value: '212', delta: 18 },
      { label: 'Partner revenue share', value: '31%', delta: 5 },
      { label: 'Avg payout time', value: '6d', delta: -22 },
    ],
    activity: [
      { id: 'd1', time: '1 hr ago', action: 'Broadcast new payment plan for Creek Horizon to all Tier-1 partners', entity: '34 partners' },
      { id: 'd2', time: '3 hr ago', action: 'Routed partner lead to Aria', entity: 'via Skyline Brokers' },
      { id: 'd3', time: '5 hr ago', action: 'Generated April commission statement', entity: 'Skyline Brokers' },
    ],
    color: 'chart-5',
  },
  {
    id: 'atlas',
    name: 'Atlas',
    role: 'Management Assistant',
    status: 'active',
    tagline: 'Answers any business question in plain language.',
    purpose:
      'Gives management instant answers to natural-language questions, produces executive summaries, forecasts revenue and conversions, predicts bottlenecks, and suggests concrete actions.',
    channels: ['webchat'],
    capabilities: [
      'Answer natural-language questions over all business data',
      'Produce daily and weekly executive summaries',
      'Forecast revenue and conversions with confidence bands',
      'Predict pipeline bottlenecks before they happen',
      'Suggest prioritized actions with expected impact',
      'Detect anomalies and alert proactively',
    ],
    triggerEvents: ['On Demand', 'Scheduled Digest', 'Anomaly Detected'],
    handoffTo: [],
    integrations: ['Analytics Pipeline', 'All internal data sources'],
    memorySummary:
      'Queries the unified event stream across all workers, deals, campaigns, and channels. Retains context of previous management questions.',
    kpis: [
      { label: 'Questions answered (7d)', value: '143', delta: 21 },
      { label: 'Forecast accuracy', value: '94%', delta: 2 },
      { label: 'Anomalies flagged', value: '3', delta: 0 },
      { label: 'Digests delivered', value: '14', delta: 0 },
    ],
    activity: [
      { id: 't1', time: '18 min ago', action: 'Answered: "Which campaign generated the most revenue this month?"', entity: 'CEO' },
      { id: 't2', time: '2 hr ago', action: 'Flagged anomaly: response time on Instagram up 40%', entity: 'Ops team' },
      { id: 't3', time: '8 hr ago', action: 'Delivered morning executive digest', entity: 'Management' },
    ],
    color: 'chart-4',
  },
]

export function getWorker(id: string) {
  return workers.find((w) => w.id === id)
}
