# Dashboard — Hong Kong Market (Hi‑Fi Spec, Business Style)

Audience: HK landlords/property managers (SME to mid‑size). Tone: professional, clean, trustworthy.

Brand & Visual
- Color: Navy (#0A2240), Slate Gray (#4B5563), Accent Blue (#2E6FF2), Success (#10B981), Warning (#F59E0B), Danger (#EF4444)
- Typography: Inter or Source Han Sans (思源黑體); numbers use tabular lining
- Density: medium‑dense (data‑first), 12/16px spacing grid, 4px radius, subtle shadows
- Charts: minimal gridlines, currency in HKD by default

Layout
- Topbar: logo • global search (⌘K) • quick add + • month switcher • notifications • user menu
- Left sidebar: sections — Dashboard, Units, Tenants & Leases, Receivables, Maintenance, Reports, Settings
- Content grid: 2‑column responsive; KPI row (auto wrap) → charts → receivables calendar → activity timeline

KPI Tiles (clickable)
- Occupancy Rate — target ≥ 90%
- Monthly AR (應收) — HKD, shows % collected
- Overdue Invoices — count + amount; red if > 0
- Vacant Units — count + ‘Post Listing’ shortcut
- Open Work Orders — count + SLA %

Receivables Calendar (HK‑style)
- Month view with daily due totals (HKD $), red dot for overdue
- Hover: shows tenant list and amounts; click → filtered ledger

Charts
- Cashflow by Month (12‑mo line): collections vs expenses, net cashflow
- Collection Rate (stacked bar): on‑time vs late vs unpaid

Activity Timeline
- System events: invoice issued/paid, lease expiring, work order status changes
- Actions inline: send reminder, record payment, renew lease

Quick Add Menu
- Tenant, Lease, Invoice, Payment, Work Order, Expense

Localization & Compliance
- Currency: HKD with $ symbol; number format 12,345.00
- Date format: DD/MM/YYYY; week starts Monday
- Optional e‑receipt template aligned with IRD best practices (non‑official)

Empty/Error States
- If no data: show setup checklist (add property → create lease → generate first invoice)
- Network errors: retry with diagnostics link

Accessibility
- Contrast ≥ WCAG AA, focus outlines, keyboard‑navigable KPI tiles and calendar

Appendix — Example Data Snapshot
- AR This Month: $128,000 (Collected 72%)
- Overdue: 14 invoices ($56,000)
- Vacant Units: 6
- Work Orders: 11 open (SLA 86%)

Handoff Notes
- Provide Figma styles: color tokens, text styles, 8 components (KPI Tile, Calendar cell, Chart card, Timeline item, Sidebar item, Topbar, Quick Add menu, Toast)
- Breakpoints: ≥1280 desktop (2 columns), 1024–1279 condense KPI to 2 rows, ≤768 single column
