"use client";

import React from "react";
import styles from "./dashboard.module.scss";
import { IconButton } from "@/app/components/button";
import { Select } from "@/app/components/ui-lib";

function formatCurrencyHKD(amount: number) {
  return new Intl.NumberFormat("zh-HK", {
    style: "currency",
    currency: "HKD",
    maximumFractionDigits: 0,
  }).format(amount);
}

const KPIS = [
  { title: "Occupancy", value: "92%", sub: "Target ≥ 90%" },
  { title: "應收(本月)", value: formatCurrencyHKD(128000), sub: "已收 72%" },
  { title: "逾期發票", value: "14", sub: formatCurrencyHKD(56000) },
  { title: "空置單位", value: "6", sub: "刊登招租" },
  { title: "工單進行中", value: "11", sub: "SLA 86%" },
];

function Topbar() {
  return (
    <div className={styles.topbar}>
      <div className={styles.topbarTitle}>Landlordy — Dashboard</div>
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <Select defaultValue="2025-10">
          <option value="2025-09">Sep 2025</option>
          <option value="2025-10">Oct 2025</option>
          <option value="2025-11">Nov 2025</option>
        </Select>
        <IconButton text="Quick Add" type="primary" />
      </div>
    </div>
  );
}

function KpiRow() {
  return (
    <div className={styles.kpis}>
      {KPIS.map((k) => (
        <div key={k.title} className={styles.kpi}>
          <div className={styles.kpiTitle}>{k.title}</div>
          <div className={styles.kpiValue}>{k.value}</div>
          <div className={styles.kpiSub}>{k.sub}</div>
        </div>
      ))}
    </div>
  );
}

function ChartCard({ title }: { title: string }) {
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>{title}</div>
      <div className={styles.chartPlaceholder}>Chart Placeholder</div>
    </div>
  );
}

function Calendar() {
  const days = Array.from({ length: 35 }, (_, i) => i + 1);
  return (
    <div className={styles.calendar}>
      <div className={styles.calendarHeader}>
        <div>Oct 2025</div>
        <div style={{ display: "flex", gap: 6 }}>
          <IconButton text="◀" />
          <IconButton text="▶" />
        </div>
      </div>
      <div className={styles.calendarGrid}>
        {days.map((d) => (
          <div className={styles.dayCell} key={d}>
            <div className={styles.dayHeader}>
              <span>{d}</span>
              {d % 6 === 0 && <span className={styles.dot} />}
            </div>
            {d % 5 === 0 && (
              <div className={styles.amount}>{formatCurrencyHKD(8000)}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function Timeline() {
  const items = [
    { time: "10:12", text: "Invoice #1245 已收款 $8,000" },
    { time: "09:05", text: "Lease L-88 已續約" },
    { time: "08:41", text: "WO #559 建立：浴室滲水 A-101" },
  ];
  return (
    <div className={styles.timeline}>
      <div className={styles.cardHeader}>活動時間線</div>
      {items.map((it, idx) => (
        <div key={idx} className={styles.timelineItem}>
          <div style={{ color: "#6b7280" }}>{it.time}</div>
          <div>{it.text}</div>
          <IconButton text="動作" />
        </div>
      ))}
    </div>
  );
}

export default function DashboardPage() {
  return (
    <div className={styles.window}>
      <Topbar />
      <div className={styles.content}>
        <KpiRow />
        <div className={styles.gridTwo}>
          <ChartCard title="現金流（過去12月）" />
          <Timeline />
        </div>
        <div style={{ height: 12 }} />
        <div className={styles.gridTwo}>
          <ChartCard title="收款率" />
          <Calendar />
        </div>
      </div>
    </div>
  );
}
