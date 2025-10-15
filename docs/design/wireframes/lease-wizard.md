# Lease Wizard (Low‑fi Wireframe)

## Purpose
Create/renew leases with automated billing schedules.

## Steps (ASCII)
```
Step 1: Parties        Step 2: Terms            Step 3: Charges         Step 4: Docs & Review
+-------------------+  +---------------------+  +--------------------+  +---------------------+
Tenant ▢ Search/Add   Period: From ▢ To ▢       Base Rent ▢ freq ▾     Upload templates ▢     
Unit ▢ Select         Deposit ▢ Account ▾       Recurrence ▾           Summary, totals, notes 
Co-tenants ▢          Indexation ▢% yearly      Add line: Parking ▢     Create Lease  [Save]  

Bottom bar: ⟵ Back | Save Draft | Next ⟶
```

## Outcomes
- Creates `Lease`, generates `InvoiceSchedule`, optional pro‑rations
- Sends welcome message and optionally first invoice

## Validation
- Conflicts with existing active lease, mandatory docs present
