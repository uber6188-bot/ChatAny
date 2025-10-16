export type MoneyHKD = number; // store cents or integers; here we use integers dollars for mock

export type InvoiceStatus = "draft" | "issued" | "paid" | "partial" | "void";

export type Invoice = {
  id: string;
  tenantName: string;
  unitCode: string;
  issueDate: string; // YYYY-MM-DD
  dueDate: string; // YYYY-MM-DD
  amount: MoneyHKD; // total amount in HKD dollars
  paidAmount: MoneyHKD; // accumulated paid amount
  status: InvoiceStatus;
};

export type Payment = {
  id: string;
  invoiceId: string;
  date: string; // YYYY-MM-DD
  amount: MoneyHKD;
  method: "FPS" | "Bank" | "Cash" | "Cheque";
};

export function computeStatus(inv: Invoice, todayISO: string): InvoiceStatus {
  if (inv.status === "void") return "void";
  if (inv.paidAmount >= inv.amount) return "paid";
  if (inv.paidAmount > 0 && inv.paidAmount < inv.amount) return "partial";
  return "issued";
}

// Mock dataset focused on Oct 2025
export const mockInvoices: Invoice[] = [
  {
    id: "INV-10045",
    tenantName: "Lee",
    unitCode: "A-102",
    issueDate: "2025-10-01",
    dueDate: "2025-10-05",
    amount: 8000,
    paidAmount: 0,
    status: "issued",
  },
  {
    id: "INV-10046",
    tenantName: "Chen",
    unitCode: "B-301",
    issueDate: "2025-10-01",
    dueDate: "2025-10-10",
    amount: 16000,
    paidAmount: 8000,
    status: "partial",
  },
  {
    id: "INV-10047",
    tenantName: "Wong",
    unitCode: "A-205",
    issueDate: "2025-10-01",
    dueDate: "2025-10-15",
    amount: 8000,
    paidAmount: 8000,
    status: "paid",
  },
  {
    id: "INV-10048",
    tenantName: "Chan",
    unitCode: "A-101",
    issueDate: "2025-10-01",
    dueDate: "2025-10-20",
    amount: 24000,
    paidAmount: 0,
    status: "issued",
  },
];

export function getReceivablesByDateRange(
  startISO: string,
  endISO: string,
): Record<string, MoneyHKD> {
  const start = new Date(startISO);
  const end = new Date(endISO);
  const out: Record<string, MoneyHKD> = {};
  for (const inv of mockInvoices) {
    const d = new Date(inv.dueDate);
    if (d >= start && d <= end) {
      out[inv.dueDate] =
        (out[inv.dueDate] ?? 0) + (inv.amount - inv.paidAmount);
    }
  }
  return out;
}

export function listInvoicesForMonth(
  year: number,
  monthIndex0: number,
): Invoice[] {
  return mockInvoices.filter((inv) => {
    const d = new Date(inv.dueDate);
    return d.getFullYear() === year && d.getMonth() === monthIndex0;
  });
}
