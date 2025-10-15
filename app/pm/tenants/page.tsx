"use client";
import { useEffect, useMemo, useState } from "react";
import type { Property, Tenant } from "@/app/api/pm/types";
import styles from "../pm.module.scss";

type TenantForm = {
  name: string;
  phone?: string;
  email?: string;
  propertyId?: string;
  unitNumber?: string;
  leaseStart?: string; // yyyy-mm-dd
  leaseEnd?: string; // yyyy-mm-dd
  monthlyRent?: string; // input as string then parse to number
  notes?: string;
};

function toForm(t?: Tenant): TenantForm {
  if (!t) return { name: "" };
  return {
    name: t.name ?? "",
    phone: t.phone ?? "",
    email: t.email ?? "",
    propertyId: t.propertyId ?? "",
    unitNumber: t.unitNumber ?? "",
    leaseStart: t.leaseStart ? t.leaseStart.slice(0, 10) : "",
    leaseEnd: t.leaseEnd ? t.leaseEnd.slice(0, 10) : "",
    monthlyRent: t.monthlyRent != null ? String(t.monthlyRent) : "",
    notes: t.notes ?? "",
  };
}

export default function TenantsPage() {
  const [items, setItems] = useState<Tenant[]>([]);
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<TenantForm>({ name: "" });
  const isEditing = useMemo(() => Boolean(editingId), [editingId]);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const [tenantsRes, propsRes] = await Promise.all([
        fetch("/api/pm/tenants", { cache: "no-store" }),
        fetch("/api/pm/properties", { cache: "no-store" }),
      ]);
      const tenantsData = await tenantsRes.json();
      const propsData = await propsRes.json();
      setItems(tenantsData.items as Tenant[]);
      setProperties(propsData.items as Property[]);
    } catch (e: any) {
      setError(e?.message || "Failed to load");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  function resetForm() {
    setEditingId(null);
    setForm({ name: "" });
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name?.trim()) {
      setError("Name is required");
      return;
    }

    const payload: Partial<Tenant> = {
      name: form.name.trim(),
      phone: form.phone || undefined,
      email: form.email || undefined,
      propertyId: form.propertyId || undefined,
      unitNumber: form.unitNumber || undefined,
      leaseStart: form.leaseStart || undefined,
      leaseEnd: form.leaseEnd || undefined,
      monthlyRent: form.monthlyRent ? Number(form.monthlyRent) : undefined,
      notes: form.notes || undefined,
    };

    try {
      setLoading(true);
      setError(null);
      if (isEditing && editingId) {
        const res = await fetch(`/api/pm/tenants/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("Update failed");
      } else {
        const res = await fetch(`/api/pm/tenants`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("Create failed");
      }
      await load();
      resetForm();
    } catch (e: any) {
      setError(e?.message || "Submit failed");
    } finally {
      setLoading(false);
    }
  }

  function onEdit(t: Tenant) {
    setEditingId(t.id);
    setForm(toForm(t));
  }

  async function onDelete(t: Tenant) {
    if (!confirm(`Delete tenant "${t.name}"?`)) return;
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`/api/pm/tenants/${t.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      await load();
    } catch (e: any) {
      setError(e?.message || "Delete failed");
    } finally {
      setLoading(false);
    }
  }

  const propertyById = useMemo(() => {
    const map = new Map<string, Property>();
    for (const p of properties) map.set(p.id, p);
    return map;
  }, [properties]);

  return (
    <div className={styles.section}>
      <h2>Tenants</h2>
      {error && <div className={styles.error}>{error}</div>}

      <form className={styles.form} onSubmit={onSubmit}>
        <div className={styles.formRow}>
          <label>Name</label>
          <input
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            placeholder="Full name"
            required
          />
        </div>
        <div className={styles.formRow}>
          <label>Phone</label>
          <input
            value={form.phone ?? ""}
            onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
            placeholder="+1 555 1234"
          />
        </div>
        <div className={styles.formRow}>
          <label>Email</label>
          <input
            value={form.email ?? ""}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            placeholder="name@example.com"
          />
        </div>
        <div className={styles.formRow}>
          <label>Property</label>
          <select
            value={form.propertyId ?? ""}
            onChange={(e) =>
              setForm((f) => ({ ...f, propertyId: e.target.value }))
            }
          >
            <option value="">-- None --</option>
            {properties.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.formRow}>
          <label>Unit</label>
          <input
            value={form.unitNumber ?? ""}
            onChange={(e) =>
              setForm((f) => ({ ...f, unitNumber: e.target.value }))
            }
            placeholder="e.g. A-203"
          />
        </div>
        <div className={styles.formRow}>
          <label>Lease Start</label>
          <input
            type="date"
            value={form.leaseStart ?? ""}
            onChange={(e) =>
              setForm((f) => ({ ...f, leaseStart: e.target.value }))
            }
          />
        </div>
        <div className={styles.formRow}>
          <label>Lease End</label>
          <input
            type="date"
            value={form.leaseEnd ?? ""}
            onChange={(e) =>
              setForm((f) => ({ ...f, leaseEnd: e.target.value }))
            }
          />
        </div>
        <div className={styles.formRow}>
          <label>Monthly Rent</label>
          <input
            type="number"
            min={0}
            step={0.01}
            value={form.monthlyRent ?? ""}
            onChange={(e) =>
              setForm((f) => ({ ...f, monthlyRent: e.target.value }))
            }
            placeholder="e.g. 1200"
          />
        </div>
        <div className={styles.formRow}>
          <label>Notes</label>
          <textarea
            value={form.notes ?? ""}
            onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
            placeholder="Additional notes"
          />
        </div>
        <div className={styles.actions}>
          {isEditing && (
            <button type="button" className={styles.ghost} onClick={resetForm}>
              Cancel
            </button>
          )}
          <button type="submit" disabled={loading}>
            {isEditing ? "Save" : "Add"}
          </button>
        </div>
      </form>

      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Contact</th>
              <th>Property</th>
              <th>Unit</th>
              <th>Lease</th>
              <th>Rent</th>
              <th>Notes</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((t) => (
              <tr key={t.id}>
                <td>{t.name}</td>
                <td>{[t.phone, t.email].filter(Boolean).join("\n")}</td>
                <td>
                  {t.propertyId
                    ? propertyById.get(t.propertyId)?.name ?? t.propertyId
                    : ""}
                </td>
                <td>{t.unitNumber ?? ""}</td>
                <td>
                  {[t.leaseStart?.slice(0, 10), t.leaseEnd?.slice(0, 10)]
                    .filter(Boolean)
                    .join(" → ")}
                </td>
                <td>{t.monthlyRent != null ? `$${t.monthlyRent}` : ""}</td>
                <td>{t.notes ?? ""}</td>
                <td className={styles.rowActions}>
                  <button onClick={() => onEdit(t)}>Edit</button>
                  <button className={styles.danger} onClick={() => onDelete(t)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr>
                <td colSpan={8} style={{ textAlign: "center", opacity: 0.6 }}>
                  {loading ? "Loading..." : "No tenants yet"}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
