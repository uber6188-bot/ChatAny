"use client";

import React from "react";
import styles from "./dashboard.module.scss";
import { IconButton } from "@/app/components/button";
import { Invoice, computeStatus, listInvoicesForMonth } from "./mock";

function formatCurrencyHKD(amount: number) {
  return new Intl.NumberFormat("zh-HK", {
    style: "currency",
    currency: "HKD",
    maximumFractionDigits: 0,
  }).format(amount);
}

type Props = { year: number; monthIndex0: number };

export function Ledger({ year, monthIndex0 }: Props) {
  const [rows, setRows] = React.useState<Invoice[]>([]);
  React.useEffect(() => {
    setRows(listInvoicesForMonth(year, monthIndex0));
  }, [year, monthIndex0]);

  const todayISO = new Date().toISOString().slice(0, 10);
  const statusColor = (s: string) => {
    switch (s) {
      case "paid":
        return "#10B981";
      case "partial":
        return "#F59E0B";
      case "issued":
        return "#6B7280";
      case "void":
        return "#9CA3AF";
      default:
        return "#6B7280";
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>應收台帳</div>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ textAlign: "left", fontSize: 12, color: "#6b7280" }}>
              <th>Invoice</th>
              <th>租客/單位</th>
              <th>開立</th>
              <th>到期</th>
              <th style={{ textAlign: "right" }}>金額</th>
              <th style={{ textAlign: "right" }}>已付</th>
              <th>狀態</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => {
              const st = computeStatus(r, todayISO);
              return (
                <tr
                  key={r.id}
                  style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}
                >
                  <td>{r.id}</td>
                  <td>
                    {r.tenantName} / {r.unitCode}
                  </td>
                  <td>{r.issueDate}</td>
                  <td>{r.dueDate}</td>
                  <td style={{ textAlign: "right" }}>
                    {formatCurrencyHKD(r.amount)}
                  </td>
                  <td style={{ textAlign: "right" }}>
                    {formatCurrencyHKD(r.paidAmount)}
                  </td>
                  <td>
                    <span style={{ color: statusColor(st), fontWeight: 700 }}>
                      {st}
                    </span>
                  </td>
                  <td style={{ textAlign: "right" }}>
                    <IconButton text="提醒" />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
