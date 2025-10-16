"use client";

import React from "react";
import styles from "./dashboard.module.scss";
import { IconButton } from "@/app/components/button";
import { Select } from "@/app/components/ui-lib";
import { SideBar, SideBarBody } from "@/app/components/sidebar";
import homeStyles from "@/app/components/home.module.scss";
import { WindowContent } from "@/app/components/home";
import { CashflowChart, CollectionRateChart } from "./Charts";
import { getReceivablesByDateRange } from "./mock";

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

type DueEvent = { date: string; amount: number };

function buildMonthMatrix(year: number, monthIndex0: number) {
  // monthIndex0: 0-11
  const first = new Date(year, monthIndex0, 1);
  const startWeekday = (first.getDay() + 6) % 7; // make Monday=0
  const startDate = new Date(first);
  startDate.setDate(first.getDate() - startWeekday);
  const days: Date[] = [];
  for (let i = 0; i < 42; i++) {
    const d = new Date(startDate);
    d.setDate(startDate.getDate() + i);
    days.push(d);
  }
  return days;
}

function isSameDate(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function Calendar() {
  const [cursor, setCursor] = React.useState(() => new Date());
  const [map, setMap] = React.useState<Record<string, number>>({});

  const year = cursor.getFullYear();
  const month = cursor.getMonth();
  const matrix = buildMonthMatrix(year, month);
  const today = new Date();

  const formatMonthLabel = (d: Date) =>
    d.toLocaleDateString("zh-HK", { year: "numeric", month: "short" });

  const totalByDate = new Map<string, number>(Object.entries(map));

  const toKey = (d: Date) =>
    `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
      d.getDate(),
    ).padStart(2, "0")}`;

  const isCurrentMonth = (d: Date) => d.getMonth() === month;

  const isOverdue = (d: Date) => {
    const key = toKey(d);
    return totalByDate.has(key) && d < today && !isSameDate(d, today);
  };
  const isDueToday = (d: Date) =>
    totalByDate.has(toKey(d)) && isSameDate(d, today);

  const prevMonth = () =>
    setCursor((c) => new Date(c.getFullYear(), c.getMonth() - 1, 1));
  const nextMonth = () =>
    setCursor((c) => new Date(c.getFullYear(), c.getMonth() + 1, 1));

  React.useEffect(() => {
    const rangeStart = new Date(year, month, 1);
    const rangeEnd = new Date(year, month + 1, 0);
    const s = `${rangeStart.getFullYear()}-${String(
      rangeStart.getMonth() + 1,
    ).padStart(2, "0")}-${String(rangeStart.getDate()).padStart(2, "0")}`;
    const e = `${rangeEnd.getFullYear()}-${String(
      rangeEnd.getMonth() + 1,
    ).padStart(2, "0")}-${String(rangeEnd.getDate()).padStart(2, "0")}`;
    setMap(getReceivablesByDateRange(s, e));
  }, [year, month]);

  return (
    <div className={styles.calendar}>
      <div className={styles.calendarHeader}>
        <div>{formatMonthLabel(cursor)}</div>
        <div style={{ display: "flex", gap: 6 }}>
          <IconButton text="◀" onClick={prevMonth} />
          <IconButton text="▶" onClick={nextMonth} />
        </div>
      </div>
      <div className={styles.calendarGrid}>
        {matrix.map((d) => {
          const key = toKey(d);
          const amount = totalByDate.get(key);
          const muted = !isCurrentMonth(d);
          const todayFlag = isSameDate(d, today);
          return (
            <div
              key={key}
              className={`${styles.dayCell} ${muted ? styles.muted : ""} ${
                todayFlag ? styles.today : ""
              }`}
              title={amount ? `${key} ${formatCurrencyHKD(amount)}` : key}
            >
              <div className={styles.dayHeader}>
                <span>{d.getDate()}</span>
                {isOverdue(d) && <span className={styles.dotOverdue} />}
                {isDueToday(d) && <span className={styles.dotToday} />}
                {!isOverdue(d) && !isDueToday(d) && amount && (
                  <span className={styles.dotDue} />
                )}
              </div>
              {amount && (
                <div className={styles.amount}>{formatCurrencyHKD(amount)}</div>
              )}
            </div>
          );
        })}
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
    <div className={`${homeStyles.container} ${homeStyles["tight-container"]}`}>
      <SideBar />
      <WindowContent>
        <div className={styles.topbar}>
          <Topbar />
        </div>
        <div className={styles.content}>
          <KpiRow />
          <div className={styles.gridTwo}>
            <div className={styles.card}>
              <div className={styles.cardHeader}>現金流（過去12月）</div>
              <CashflowChart />
            </div>
            <Timeline />
          </div>
          <div style={{ height: 12 }} />
          <div className={styles.gridTwo}>
            <div className={styles.card}>
              <div className={styles.cardHeader}>收款率</div>
              <CollectionRateChart />
            </div>
            <Calendar />
          </div>
        </div>
      </WindowContent>
    </div>
  );
}
