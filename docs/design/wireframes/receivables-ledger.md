# Receivables Ledger (Low‑fi Wireframe)

## Purpose
Track invoices, statuses, collections, and take bulk actions.

## Layout (ASCII)
```
Filters: [Month ▾] [Property ▾] [Tenant ▾] [Status: All/Overdue/Partial ▾]  Actions: New Invoice, Export
+----------------------------------------------------------------------------------+
| ▢ | Invoice # | Tenant / Unit   | Issue | Due   | Amount | Paid | Balance | Status |
| ▢ | 10045      Lee / A-102       10/01  10/05    28,000   0      28,000    Overdue |
| ▣ | 10046      Chen / B-301      10/01  10/05    31,000   31,000  0        Paid    |
| ▢ | ...                                                                            |
+----------------------------------------------------------------------------------+
Bottom bar: ▾ Bulk: Send Reminders • Record Payment • Write‑off • Export
Right drawer (on row click): invoice details, timeline, attachments, actions.
Calendar toggle: switch to month calendar with daily totals and overdue dots.
```

## Notes
- Row selection supports multi‑tenant reminders; reminder templates configurable.
