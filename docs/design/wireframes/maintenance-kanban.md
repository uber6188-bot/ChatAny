# Maintenance — Kanban (Low‑fi Wireframe)

## Purpose
Track work orders from intake to completion with SLA visibility.

## Layout (ASCII)
```
Columns: To‑do | In Progress | Waiting Parts | Completed
+-----------+---------------+----------------+-----------+
| #559 Leak | #561 AC fix   | #563 Window    | #552 Done |
| A‑101     | B‑301         | A‑204          | A‑103     |
| SLA: 🔴    | SLA: 🟡        | SLA: 🟢         | Cost: $0  |
+-----------+---------------+----------------+-----------+

Top: Filters [Property ▾] [Priority ▾] [Assignee ▾]  ＋ New Work Order
Card: title • unit • priority • SLA color • assignee avatar • cost badge
Right drawer on click: details, checklist, photos, cost lines, charge‑back toggle.
```

## Notes
- Drag & drop between columns; auto timestamps stage changes.
- SLA color derived from due/priority; webhook for vendor notification.
