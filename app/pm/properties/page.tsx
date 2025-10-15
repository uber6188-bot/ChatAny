"use client";
import { useEffect, useMemo, useState } from "react";
import type { Property } from "@/app/api/pm/types";
import styles from "../pm.module.scss";

type PropertyForm = {
  name: string;
  address?: string;
  unitCount?: string; // input as string then parse to number
  tagsInput?: string; // comma separated
  notes?: string;
};

function parseTags(input?: string): string[] | undefined {
  if (!input) return [];
  return input
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

function toForm(p?: Property): PropertyForm {
  if (!p) return { name: "" };
  return {
    name: p.name ?? "",
    address: p.address ?? "",
    unitCount: p.unitCount != null ? String(p.unitCount) : "",
    tagsInput: (p.tags ?? []).join(", "),
    notes: p.notes ?? "",
  };
}

export default function PropertiesPage() {
  const [items, setItems] = useState<Property[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<PropertyForm>({ name: "" });

  const isEditing = useMemo(() => Boolean(editingId), [editingId]);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/pm/properties", { cache: "no-store" });
      const data = await res.json();
      setItems(data.items as Property[]);
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

    const payload: Partial<Property> = {
      name: form.name.trim(),
      address: form.address || undefined,
      unitCount: form.unitCount ? Number(form.unitCount) : undefined,
      tags: parseTags(form.tagsInput),
      notes: form.notes || undefined,
    };

    try {
      setLoading(true);
      setError(null);
      if (isEditing && editingId) {
        const res = await fetch(`/api/pm/properties/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("Update failed");
      } else {
        const res = await fetch(`/api/pm/properties`, {
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

  function onEdit(p: Property) {
    setEditingId(p.id);
    setForm(toForm(p));
  }

  async function onDelete(p: Property) {
    if (!confirm(`Delete property "${p.name}"?`)) return;
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`/api/pm/properties/${p.id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Delete failed");
      await load();
    } catch (e: any) {
      setError(e?.message || "Delete failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.section}>
      <h2>Properties</h2>
      {error && <div className={styles.error}>{error}</div>}

      <form className={styles.form} onSubmit={onSubmit}>
        <div className={styles.formRow}>
          <label>Name</label>
          <input
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            placeholder="Property name"
            required
          />
        </div>
        <div className={styles.formRow}>
          <label>Address</label>
          <input
            value={form.address ?? ""}
            onChange={(e) =>
              setForm((f) => ({ ...f, address: e.target.value }))
            }
            placeholder="Street, City"
          />
        </div>
        <div className={styles.formRow}>
          <label>Units</label>
          <input
            type="number"
            min={0}
            value={form.unitCount ?? ""}
            onChange={(e) =>
              setForm((f) => ({ ...f, unitCount: e.target.value }))
            }
            placeholder="e.g. 10"
          />
        </div>
        <div className={styles.formRow}>
          <label>Tags</label>
          <input
            value={form.tagsInput ?? ""}
            onChange={(e) =>
              setForm((f) => ({ ...f, tagsInput: e.target.value }))
            }
            placeholder="comma,separated,tags"
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
              <th>Address</th>
              <th>Units</th>
              <th>Tags</th>
              <th>Notes</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((p) => (
              <tr key={p.id}>
                <td>{p.name}</td>
                <td>{p.address ?? ""}</td>
                <td>{p.unitCount ?? ""}</td>
                <td>{(p.tags ?? []).join(", ")}</td>
                <td>{p.notes ?? ""}</td>
                <td className={styles.rowActions}>
                  <button onClick={() => onEdit(p)}>Edit</button>
                  <button className={styles.danger} onClick={() => onDelete(p)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr>
                <td colSpan={6} style={{ textAlign: "center", opacity: 0.6 }}>
                  {loading ? "Loading..." : "No properties yet"}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
