# Component Library Checklist

Foundational
- Color tokens (brand, semantic, neutral, elevation)
- Typography scale (H1–H6, body, caption, mono)
- Spacing & radii scale; shadows/elevations
- Grid & breakpoints; dark/light modes

Inputs
- Button (primary/secondary/tertiary/danger, sizes, loading)
- IconButton
- TextField, TextArea, NumberField, Masked/Formatted input
- Select, MultiSelect, Combobox with async search
- DatePicker, DateRangePicker, MonthPicker
- Toggle, Checkbox, RadioGroup, Switch
- Slider, InputRange
- FileUploader (drag‑drop, previews)

Data display
- Badge/StatusPill (Vacant/Occupied/Maintenance, Overdue/Paid)
- Avatar & AvatarGroup
- Tooltip, Popover, DropdownMenu
- Tabs, Accordion, Steps (wizard)
- Card, EmptyState, Skeleton/Spinner
- Table (virtualized, resizable columns, pinned columns, row selection)
- List with infinite scroll, Kanban board
- Timeline component
- Calendar (month/agenda) with event dots

Feedback
- Toast, Snackbar, Inline Alert
- Modal/Dialog, Drawer
- Confirmation dialog with consequences text

Navigation
- Sidebar Nav, Breadcrumbs, Topbar, Command Palette (⌘K)
- Pagination, Stepper

Domain components
- KPI Tile
- InvoiceRow with status & quick actions
- WorkOrderCard with SLA color
- LeaseSummary panel
- Money input with currency; Tax selector
- Attachment list with preview and OCR hooks

Utilities
- Form wrapper with validation schema (Zod/Yup)
- Data fetch hooks with caching (SWR/React Query)
- Permission gates/feature flags
- i18n provider (zh/EN), number/date formatters
- Template renderer (contract/invoice/message)

Accessibility & QA
- Focus states, keyboard navigation, ARIA roles
- Color‑contrast checks; reduced motion
- Unit test examples for core components

Documentation
- Storybook or similar with usage examples
- Theming guide and tokens reference
