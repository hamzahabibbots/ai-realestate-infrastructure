# Estate OS — Continue Build from Existing Foundation

## What Already Exists
- `docs/PRODUCT_SPEC.md` (all 23 sections) 
- `app/globals.css` (dark oklch theme)
- `app/layout.tsx` (Geist fonts, dark mode)
- `lib/types.ts` (all domain types)
- `lib/data/{leads,workers,conversations,properties,metrics}.ts` (rich mock data)
- All shadcn/ui components installed
- `app/page.tsx` — **placeholder only** (needs replacing)

## What Needs Building

Everything below needs to be created from scratch. The scope is large — roughly **40+ files** across shell, components, pages, and additional mock data.

---

## Proposed Changes

### 1. Additional Mock Data

#### [NEW] `lib/data/tasks.ts`
Tasks grouped by Today/Upcoming, AI-generated flags, worker origin

#### [NEW] `lib/data/documents.ts`
Per-deal document checklists with status tracking

#### [NEW] `lib/data/workflows.ts`
Workflow definitions with node graphs (trigger → condition → AI decision → action)

#### [NEW] `lib/data/knowledge.ts`
Knowledge base items (SOPs, FAQs, pricing, scripts, legal, brochures, RERA) with worker usage tags

#### [NEW] `lib/data/calls.ts`
Call records with Voice AI summaries, sentiment, transcripts

---

### 2. Platform Shell

#### [NEW] `components/shell/sidebar.tsx`
Grouped nav (Overview / Engage / Sales / Operate / System), Estate OS logo, active states, collapsed icon mode on mobile

#### [NEW] `components/shell/topbar.tsx`
Breadcrumb, global search button (⌘K trigger), notifications popover

#### [NEW] `components/shell/command-palette.tsx`
⌘K palette using shadcn Command — navigate modules, quick actions ("Ask AI", "New lead"), search

#### [NEW] `app/(platform)/layout.tsx`
Shell layout wrapping sidebar + topbar around all module pages

---

### 3. Priority Module: Dashboard

#### [MODIFY] `app/page.tsx` → redirect to `/(platform)`

#### [NEW] `app/(platform)/page.tsx`
Main dashboard: KPI row, charts, funnel, AI activity feed, Atlas assistant panel, hot leads, site visits

#### [NEW] `components/dashboard/kpi-card.tsx`
Mono numerals, delta indicators, subtle animations

#### [NEW] `components/dashboard/revenue-chart.tsx`
Area chart via Recharts (revenue + leads)

#### [NEW] `components/dashboard/lead-source-chart.tsx`
Donut chart for lead sources

#### [NEW] `components/dashboard/funnel-chart.tsx`
Conversion funnel visualization

#### [NEW] `components/dashboard/activity-feed.tsx`
Telemetry-style live AI activity stream

#### [NEW] `components/dashboard/assistant-panel.tsx`
Atlas chat panel with canned Q&A + suggested question chips

---

### 4. Priority Module: AI Workers

#### [NEW] `app/(platform)/workers/page.tsx`
Roster of 5 workers with status, KPIs, channels

#### [NEW] `app/(platform)/workers/[id]/page.tsx`
Worker detail: purpose, capabilities, trigger events, handoff flow, memory, activity, KPIs, integrations

#### [NEW] `components/workers/worker-card.tsx`
Worker roster card with gradient avatar, status, KPI summary

#### [NEW] `components/workers/handoff-flow.tsx`
Visual handoff chain: Aria → Marcus → Sofia

#### [NEW] `components/workers/capability-list.tsx`
Checklist of worker capabilities

---

### 5. Priority Module: Omnichannel Inbox

#### [NEW] `app/(platform)/inbox/page.tsx`
Three-pane layout: conversation list, thread, contact 360°

#### [NEW] `components/inbox/conversation-list.tsx`
Channel badges, unread counts, score chips, AI/human indicator, filters

#### [NEW] `components/inbox/message-thread.tsx`
Unified timeline including call summaries and system events, composer with AI draft

#### [NEW] `components/inbox/contact-360.tsx`
Contact sidebar: preferences, budget, score breakdown, matched properties, timeline

---

### 6. Priority Module: Analytics

#### [NEW] `app/(platform)/analytics/page.tsx`
Tabbed: Overview, Funnel, Agents, Campaigns with charts and filters

#### [NEW] `components/analytics/funnel-detail.tsx`
Detailed funnel with percentages and stage counts

#### [NEW] `components/analytics/agent-table.tsx`
Agent performance table with trend indicators

#### [NEW] `components/analytics/campaign-roi.tsx`
Campaign ROI bar chart

#### [NEW] `components/analytics/forecast-chart.tsx`
Revenue forecast with projection bands

---

### 7. Secondary Modules (functional screens)

#### [NEW] `app/(platform)/leads/page.tsx`
Sortable table with score badges, source, intent, stage; row click → detail sheet

#### [NEW] `app/(platform)/crm/page.tsx`
Contact directory with 360° slide-over profile

#### [NEW] `app/(platform)/properties/page.tsx`
Property inventory grid with images, price, availability, match count

#### [NEW] `app/(platform)/pipeline/page.tsx`
Kanban deal board by stage with deal cards

#### [NEW] `app/(platform)/calls/page.tsx`
Call log with Voice AI summaries, sentiment badges

#### [NEW] `app/(platform)/tasks/page.tsx`
Tasks grouped Today/Upcoming, AI-generated badges

#### [NEW] `app/(platform)/documents/page.tsx`
Per-deal document checklist with completion bars

#### [NEW] `app/(platform)/automation/page.tsx`
Workflow list + detail with styled node graph

#### [NEW] `app/(platform)/knowledge/page.tsx`
Document library grouped by type with worker usage tags

#### [NEW] `app/(platform)/settings/page.tsx`
Tabs: Team & Roles, Integrations grid, Security (audit log, permissions)

---

## Execution Strategy

Given the massive scope (~45 files), I'll use **parallel subagents** to build concurrently:

1. **Agent A**: Mock data (`lib/data/tasks.ts`, `documents.ts`, `workflows.ts`, `knowledge.ts`, `calls.ts`) + Shell (`components/shell/*`, platform layout)
2. **Agent B**: Dashboard page + all dashboard components
3. **Agent C**: AI Workers pages + components
4. **Agent D**: Inbox pages + components + Analytics pages + components
5. **Agent E**: All 10 secondary module pages

Each agent works in the same workspace using the existing types, data, and design system.

## Verification Plan

### Build Check
- `pnpm build` must pass with zero errors

### Manual Verification
- Run `pnpm dev` and visually inspect all 15 modules
- Verify ⌘K command palette navigation
- Verify responsive behavior (sidebar collapse)

> [!IMPORTANT]
> This is a **~45-file build** across 15 modules. I'll execute with parallel subagents for speed. Every file follows the existing dark theme tokens, Geist typography, and shadcn components already installed.
