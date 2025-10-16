# Landlordy — Dashboard (Low‑fi Wireframe)

## Purpose
Give landlords a quick view of portfolio health and urgent actions.

## Layout (ASCII)
```
+----------------------------------------------------------------------------------+
| Top bar: [☰] Landlordy | Search ⌕ | Quick Add ＋ | Month ◀ Oct 2025 ▶ | 🔔 3 | ⚙ |
+--------------------------+-------------------------------------------------------+
| Sidebar                  | KPIs (row)                                            |
| - Dashboard              |  [Occupancy 92%] [AR Due $128k] [Overdue 14]          |
| - Units                  |  [WO SLA 87%] [Vacant Units 6]                        |
| - Tenants & Leases       +-------------------------------------------------------+
| - Invoices & Rent        | Charts                                                |
| - Expenses & Maintenance |  [Cashflow by Month ─ line]   [Collection Rate ─ bar] |
| - Productivity           +---------------------------+---------------------------+
|                          | Calendar (Receivables)   | Activity Timeline         |
|                          |  Oct 2025 mini-cal       |  - Invoice #1245 paid     |
|                          |  Due totals per day      |  - Lease L-88 renewed     |
|                          |  Red dots = overdue      |  - WO #559 created        |
+--------------------------+---------------------------+---------------------------+
```

## Key Widgets
- KPI tiles (click-through)
- Cashflow & Collection charts
- Receivables mini-calendar
- Recent activity timeline
- Global alerts: overdue invoices, expiring leases, open work orders

## Primary Actions
- Quick Add: Tenant, Lease, Work Order, Expense, Invoice, Payment
- Export dashboard (PDF)

## Notes
- Supports saved month view; data filters persist across sessions.
