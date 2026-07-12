# Estate OS — Product Specification

**The AI Operating System for Real Estate Agencies**

Version 1.0 · Status: Draft for build phase 1 (UI + mock data)

---

## 1. Product Vision

Estate OS replaces the disconnected stack of CRM, chat tools, dialers, spreadsheets, and marketing software with a single AI-native operating system for real estate agencies. A team of specialized AI workers — Pre-Sales, Sales, Customer Success, Channel Partner Manager, and a Management Assistant — collaborate over shared memory to automate the customer lifecycle from first enquiry to years after possession.

Guiding principle: **every feature must eliminate manual work while increasing conversions, improving customer experience, and reducing operational cost.**

The AI is not a chatbot bolted onto a CRM. The AI *is* the workforce; the humans supervise, approve, and close.

## 2. Platform Architecture

```
┌────────────────────────────────────────────────────────────┐
│                      Web App (Next.js)                     │
│  Dashboard · Workers · Inbox · CRM · Pipeline · Analytics  │
├────────────────────────────────────────────────────────────┤
│                     API Layer (REST + Webhooks)            │
├──────────────┬──────────────┬──────────────┬───────────────┤
│  AI Worker   │  Automation  │   Matching   │  Analytics    │
│ Orchestrator │    Engine    │    Engine    │   Pipeline    │
├──────────────┴──────────────┴──────────────┴───────────────┤
│           Unified Memory (conversations, profiles,         │
│           documents, events) + Knowledge Base (RAG)        │
├────────────────────────────────────────────────────────────┤
│  Postgres (system of record) · Vector store · Blob storage │
├────────────────────────────────────────────────────────────┤
│  Channel Integrations: WhatsApp · Meta · Email · Voice ·   │
│  SMS · Portals · Calendars · Payments                      │
└────────────────────────────────────────────────────────────┘
```

- **AI Worker Orchestrator** routes every inbound event to the owning worker, enforces handoff rules, and logs every action for audit.
- **Unified Memory** is a single event-sourced timeline per contact; every worker reads/writes the same memory — no question is ever asked twice.
- **Automation Engine** executes visual workflows (triggers → conditions → AI decisions → actions) with retries, delays, approvals, and escalation.
- Phase 1 (this build) implements the full UI over a typed in-memory data layer (`lib/data/*`), designed for later swap-in of Postgres (Neon) and LLM calls (Vercel AI Gateway).

## 3. Information Architecture

Top-level entities and ownership:

| Entity | Owned by | Key relationships |
|---|---|---|
| Contact | CRM | conversations, deals, visits, documents, score |
| Lead | Pre-Sales AI | contact, source, campaign, score, stage |
| Property / Project | Inventory | matches, visits, deals |
| Deal | Sales AI | contact, property, stage, documents, payments |
| Conversation | Inbox | contact, channel, messages, handling worker |
| Visit | Site-visit automation | contact, property, agent, feedback |
| Workflow | Automation Engine | trigger, nodes, run history |
| Document | Document automation | deal, checklist status |
| Knowledge Item | Knowledge Base | workers that consume it |

## 4. Navigation

Sidebar, grouped by job-to-be-done:

- **Overview**: Dashboard, Analytics
- **Engage**: Inbox (Messages), Calls, Leads
- **Sales**: Pipeline, Properties, CRM
- **Operate**: Tasks, Documents, Automation
- **System**: AI Workers, Knowledge Base, Settings

Global: ⌘K command palette (navigate, create lead, ask AI), notifications popover, breadcrumb topbar. Keyboard-first, dark mode first.

## 5. User Journeys

**Journey A — New lead to booked visit (fully automated)**
1. Lead arrives from Meta Ads → Pre-Sales AI (Aria) responds on WhatsApp in <5s, in the lead's language.
2. Aria answers project/pricing/amenity questions from the Knowledge Base, collects budget, bedrooms, timeline, and areas conversationally.
3. Matching Engine proposes 3 properties with explanations; lead score is computed live.
4. Aria books a site visit against agent calendars, sends confirmation + directions + reminders.
5. Assigned agent receives an AI briefing; management dashboard updates live.

**Journey B — Qualification to booking**
Sales AI (Marcus) takes over after qualification: tracks stages, handles objections, collects documents, generates booking paperwork, coordinates finance/legal, and posts internal summaries.

**Journey C — Post-booking lifecycle**
Customer Success AI (Sofia) owns agreements, payment reminders, construction updates, possession, warranty, reviews, referrals, and repeat-investment campaigns for years.

**Journey D — Management insight**
A director asks Atlas (Management Assistant): "Which campaign generated the most revenue?" and gets an answer with chart, drill-down link, and suggested actions.

**Journey E — Partner network**
Channel Partner Manager AI (Dev) broadcasts inventory/offer updates, routes partner leads, tracks commissions, and produces performance reports.

## 6. AI Worker Architecture

Every worker is defined by: **purpose, capabilities, memory access, trigger events, handoff rules, KPIs, automation logic, required integrations.**

| Worker | Function | Triggers | Hands off to | Core KPIs |
|---|---|---|---|---|
| **Aria** — Pre-Sales | All inbound enquiries: instant response, language detection, FAQs, qualification, scoring, visit booking, follow-ups, VIP escalation | Lead created, message received, call ended | Marcus (on qualification), human (VIP/complex) | Response time, qualification rate, visit-booking rate |
| **Marcus** — Sales | Owns qualified buyers: stage tracking, objections, alternatives, negotiations, document collection, booking paperwork, finance/legal coordination | Lead qualified, visit completed, objection raised | Sofia (on booking), human agent (negotiation) | Conversion rate, sales velocity, doc completion |
| **Sofia** — Customer Success | Post-booking lifecycle: agreement, payments, construction updates, possession, warranty, referrals, reviews, repeat investment | Booking confirmed, payment due, milestone reached | Human (disputes) | CSAT, referral rate, on-time payment rate |
| **Dev** — Channel Partner Manager | Partner comms: inventory/offer broadcasts, lead routing, commission tracking, onboarding, performance reports | Inventory change, partner lead, commission event | Marcus (partner deals) | Partner-sourced revenue, active partners |
| **Atlas** — Management Assistant | Natural-language analytics, executive summaries, forecasting, bottleneck prediction, suggested actions | On demand, scheduled digests, anomaly detected | — | Query accuracy, forecast error |

**Handoff protocol:** a handoff transfers conversation ownership plus a structured briefing (context summary, open questions, risk flags). The receiving worker (or human) acknowledges before the sender releases. All handoffs are visible in the worker detail UI.

## 7. CRM Architecture

The CRM is written by AI, read by humans. Contact profile fields: name, phone, email, budget, property type, bedrooms, preferred areas, timeline, mortgage status, nationality, communication preferences, viewed properties, booked visits, call history, conversation history, documents, lead source, lead score, current stage, assigned agent, objections, buying motivation, investment goals, notes.

Rules: every field auto-updates from conversations and events; deduplication on phone/email; no repeated questions (memory-checked before any worker asks); full field-level change history.

## 8. Database Schema (target, phase 2)

```sql
contacts(id, name, phone, email, nationality, language, budget_min, budget_max,
  property_type, bedrooms, preferred_areas[], timeline, mortgage_status,
  motivation, investment_goals, comm_preferences, created_at)
leads(id, contact_id, source, campaign_id, score, score_breakdown jsonb,
  intent, urgency, stage, assigned_worker, assigned_agent, created_at)
properties(id, project_id, title, type, bedrooms, price, area_sqft, location,
  amenities[], status, developer, rental_yield)
projects(id, name, developer, location, completion_date, rera_id)
deals(id, lead_id, property_id, stage, value, probability, expected_close)
conversations(id, contact_id, channel, status, handled_by, assigned_worker)
messages(id, conversation_id, direction, sender_type, channel, body,
  sentiment, created_at)
calls(id, contact_id, direction, duration, summary, sentiment, transcript_url)
visits(id, lead_id, property_id, agent_id, scheduled_at, status, feedback)
documents(id, deal_id, type, status, uploaded_at)
workflows(id, name, trigger, definition jsonb, status)
workflow_runs(id, workflow_id, status, started_at, log jsonb)
knowledge_items(id, type, title, content, embedding vector, used_by[])
events(id, entity_type, entity_id, actor_type, actor_id, type, payload jsonb,
  created_at)  -- unified memory timeline
users(id, name, role, permissions jsonb)
audit_log(id, user_id, action, entity, before, after, created_at)
```

## 9. Workflow Diagrams

**Lead lifecycle**
```
Lead Created → Aria responds (<5s) → Qualify (budget/intent/urgency)
  ├─ Hot (score ≥ 80) → Match properties → Book visit → Brief agent
  ├─ Warm → Nurture sequence (adaptive frequency)
  └─ VIP flag → Escalate to human immediately
Visit Completed → Feedback → ├─ Positive → Marcus takes over → Negotiate → Book
                             └─ Objection → Handle / alternatives → 2nd visit
Booking Confirmed → Sofia takes over → Payments → Possession → Referrals
```

**Handoff chain:** Aria → Marcus → Sofia, with human escalation available at every node and Dev feeding partner leads into Aria's queue.

## 10. Automation Flows

Triggers: Lead Created, Call Ended, Message Received, Viewing Booked, Viewing Completed, Booking Confirmed, Payment Received, Document Uploaded, Property Reserved, Customer Inactive.

Node types: **Trigger · Condition · AI Decision · Action · Delay · Approval · Loop · Escalation · Human Intervention.** Every run is logged with retries and failure alerts.

Shipped example workflows: Speed-to-lead responder, Post-visit follow-up sequence, Payment reminder ladder, Dormant-lead reactivation, Missing-document chaser, VIP escalation.

## 11. Screen-by-Screen UI Descriptions

- **Dashboard (`/`)** — KPI row (Leads Today, Pipeline Value, Bookings, Avg Response Time, Conversion Rate with deltas); revenue/leads area chart; lead-source donut; conversion funnel; live AI activity feed (telemetry stream of worker actions); Atlas assistant panel with suggested questions; hot leads list; today's site visits. AI participates by narrating what it is doing in real time.
- **AI Workers (`/workers`)** — roster cards per worker: status, owned channels, conversations handled, avg response, conversion contribution. Detail page (`/workers/[id]`): purpose, capabilities checklist, trigger events, handoff flow visualization, memory summary, KPI mini-charts, recent activity log, required integrations.
- **Inbox (`/inbox`)** — three panes. Left: conversation list with channel badges (WhatsApp, Instagram, Email, SMS, Web Chat, Voice), unread counts, lead-score chips, AI/human handling indicator, filters. Center: unified message timeline including call summaries and system events ("Visit booked"), composer with AI-draft suggestion and human-takeover toggle. Right: contact 360° — preferences, budget, score breakdown, matched properties, activity timeline.
- **Analytics (`/analytics`)** — tabs: Overview, Funnel, Agents, Campaigns. Charts for lead sources, funnel, response-time trend, agent performance, campaign ROI, sales velocity, lost-lead reasons, revenue forecast with projection band. Date/project filters, export.
- **Leads (`/leads`)** — sortable/filterable table: score badge, source, intent, urgency, stage, assigned worker; row opens detail sheet.
- **CRM (`/crm`)** — contact directory with 360° slide-over (shared component with inbox sidebar).
- **Properties (`/properties`)** — inventory grid with images, price, availability, match count, and "why matched" explanations.
- **Pipeline (`/pipeline`)** — Kanban by stage with deal value, probability, AI-next-step hints, stage totals.
- **Calls (`/calls`)** — voice AI log: direction, duration, sentiment badge, AI summary, transcript snippet.
- **Tasks (`/tasks`)** — Today/Upcoming groups; AI-generated tasks are labelled with the originating worker.
- **Documents (`/documents`)** — per-deal checklist tracker, completion bars, missing-document alerts.
- **Automation (`/automation`)** — workflow list with run stats; detail view renders the node graph (trigger → condition → AI decision → action).
- **Knowledge Base (`/knowledge`)** — library grouped by type (SOPs, FAQs, pricing, scripts, legal, brochures, RERA) with "used by" worker tags.
- **Settings (`/settings`)** — Team & Roles, Integrations grid with connect states, Security (audit log, permissions matrix, retention).

## 12. Dashboard Layouts

12-column responsive grid. Desktop: KPI row (5 cards) → charts row (area chart 8 cols + donut 4 cols) → funnel (6) + AI activity feed (6) → Atlas panel (7) + hot leads/visits (5). Tablet: 2-column stack. Mobile: single column, KPIs as 2×3 grid, feed collapsed behind a tab.

## 13. Component Library

shadcn/ui base: Button, Card, Badge, Tabs, Table, Dialog, Sheet, Command, DropdownMenu, Avatar, Input, Select, Separator, ScrollArea, Tooltip, Popover, Progress, Switch, Chart (Recharts), Sidebar, Breadcrumb, Sonner.

Domain components: `KpiCard`, `DeltaBadge`, `ScoreChip`, `ChannelBadge`, `WorkerAvatar`, `ActivityFeed`, `FunnelChart`, `ConversationList`, `MessageThread`, `Contact360`, `HandoffFlow`, `WorkflowGraph`, `PropertyCard`, `DealCard`, `SentimentBadge`.

## 14. Design System

- **Colors (5)**: background near-black `#0A0A0B`; card `#131316`; foreground off-white; **primary: electric violet-indigo** for actions and AI highlights; emerald (positive), amber (warning), rose (negative) as status colors mapped to chart tokens. All via semantic CSS tokens.
- **Typography (2 families)**: Geist Sans (UI), Geist Mono (KPIs, IDs, timestamps, telemetry labels). Uppercase letter-spaced micro-labels for section headers.
- **Shape/space**: rounded-xl cards, 1px subtle borders, generous padding, high density without clutter, glass/blur for overlays and palette.
- Dark mode first; light mode derivable from tokens.

## 15. Interaction Design

⌘K command palette everywhere; hover reveals row actions; optimistic UI on state changes; skeletons on load; toasts for background AI actions; drag-and-drop for pipeline and workflow builder (phase 2); all interactive elements keyboard-reachable with visible focus rings; reduced-motion respected.

## 16. State Management

Server components fetch from the data layer; client state via SWR keyed by entity (`/leads`, `/conversations/:id`) so views stay in sync; UI-local state (panels, filters) in component state; URL as source of truth for filters/tabs; phase 2 adds real-time invalidation via server events.

## 17. Notifications

In-app notification center (topbar popover) with worker events, escalations, and approvals; priority levels (FYI / action needed / urgent); per-user channel preferences (in-app, email, WhatsApp digest); Atlas daily executive digest; all notifications deep-link to the relevant entity.

## 18. Integrations

WhatsApp Business API, Meta (Ads + Messenger + Instagram), Google (Ads, Gmail, Calendar), Outlook, Twilio (SMS/Voice), Stripe, Razorpay, 99acres, Housing, MagicBricks, Zapier, n8n, inbound/outbound webhooks, public REST API. Each integration surfaces in Settings with connect state, health, and owned events.

## 19. Security Architecture

SSO + MFA authentication; role-based access control (Owner, Admin, Manager, Agent, Partner, Read-only) with a permissions matrix; field-level PII controls; full audit log of human and AI actions; encryption in transit and at rest; configurable data retention and backups; compliance-ready (data residency, DPA, RERA record-keeping).

## 20. Analytics Architecture

Event-sourced: every worker/user action emits a typed event to the `events` stream; metrics are aggregations over events (response time, funnel conversion, velocity, CLV, referral rate); Atlas queries the same aggregates for natural-language answers; forecasting from pipeline-weighted projections; drill-down from every chart to underlying records; CSV/API export.

## 21. API Architecture

REST, versioned `/api/v1`: CRUD for contacts, leads, properties, deals, conversations; webhook subscriptions per trigger event; worker actions API (send message, book visit, update score) with idempotency keys; rate limiting and API keys scoped by role; OpenAPI spec published.

## 22. Mobile Responsiveness

Mobile-first layouts: sidebar collapses to a sheet; inbox panes become a stacked drill-in flow; tables gain horizontal scroll with pinned key columns; Kanban becomes swipeable columns; touch targets ≥ 44px; KPI grid reflows 5→2 columns.

## 23. Future Scalability

Phase 2: Neon Postgres + Better Auth, real AI workers on Vercel AI Gateway, real-time updates. Phase 3: voice AI receptionist, document generation, calendar/payment integrations. Phase 4: multi-tenant agency workspaces, partner portal, white-label, mobile apps, marketplace of workflow templates. Architecture supports this via the event stream, typed data layer, and worker orchestrator abstraction.
