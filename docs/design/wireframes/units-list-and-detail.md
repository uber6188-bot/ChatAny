# Units — List & Detail (Low‑fi Wireframe)

## Purpose
Manage properties/units, statuses, and quick edits.

## Layout (ASCII)
```
+----------------------------------------------------------------------------------+
| Top bar ... (same as dashboard)                                                  |
+--------------------------+-------------------------------------------------------+
| Sidebar > Units          | Header: Filters [Property ▾] [Status: All ▾] [Saved ▾] |
|                          | Actions: Import CSV • Export • Bulk Edit • Add Unit   |
|                          +------------------------------+------------------------+
|                          | List/Table                   | Right Detail (drawer)  |
|                          |  ▢ Unit A-101  Vacant        |  Unit A-101            |
|                          |  ▣ Unit A-102  Occupied      |  Tabs: Overview | Docs |
|                          |  ▢ Unit B-301  Maint.        |  Overview:              |
|                          |  ...                         |   - Size, Rent base     |
|                          | Pagination ⟵ 1 / 12 ⟶        |   - Amenities           |
|                          |                              |   - Status timeline     |
+--------------------------+------------------------------+------------------------+
```

## Key Elements
- Saved filters, quick search by unit/tenant
- Status badges: Vacant / Occupied / Maintenance
- Batch actions: set rent base, assign tags, archive
- Detail tabs: Overview, Leases (history), Documents, Work Orders

## Notes
- Map/Card toggle (list default). Inline edits for rent base and tags.
