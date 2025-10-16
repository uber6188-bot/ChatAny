"use client";

import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from "recharts";

function hkd(n: number) {
  return new Intl.NumberFormat("zh-HK", {
    style: "currency",
    currency: "HKD",
    maximumFractionDigits: 0,
  }).format(n);
}

export function CashflowChart() {
  const data = [
    { m: "Jan", in: 110000, out: 65000 },
    { m: "Feb", in: 98000, out: 72000 },
    { m: "Mar", in: 125000, out: 68000 },
    { m: "Apr", in: 121000, out: 70500 },
    { m: "May", in: 127500, out: 72000 },
    { m: "Jun", in: 130000, out: 73500 },
    { m: "Jul", in: 118000, out: 69000 },
    { m: "Aug", in: 122000, out: 71000 },
    { m: "Sep", in: 126000, out: 72000 },
    { m: "Oct", in: 128000, out: 74000 },
    { m: "Nov", in: 129000, out: 73500 },
    { m: "Dec", in: 133000, out: 76000 },
  ];
  const toNet = (d: (typeof data)[number]) => d.in - d.out;
  return (
    <ResponsiveContainer width="100%" height={220}>
      <LineChart data={data} margin={{ left: 8, right: 8, top: 10, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="m" />
        <YAxis tickFormatter={(v) => v / 1000 + "k"} />
        <Tooltip formatter={(v: any) => hkd(Number(v))} />
        <Line
          type="monotone"
          dataKey="in"
          name="收款"
          stroke="#2E6FF2"
          strokeWidth={2}
          dot={false}
        />
        <Line
          type="monotone"
          dataKey="out"
          name="支出"
          stroke="#F59E0B"
          strokeWidth={2}
          dot={false}
        />
        <Line
          type="monotone"
          data={data.map((d) => ({ ...d, net: toNet(d) }))}
          dataKey="net"
          name="淨現金流"
          stroke="#10B981"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

export function CollectionRateChart() {
  const data = [
    { m: "Jul", on: 82, late: 12, un: 6 },
    { m: "Aug", on: 85, late: 10, un: 5 },
    { m: "Sep", on: 78, late: 15, un: 7 },
    { m: "Oct", on: 72, late: 18, un: 10 },
  ];
  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data} margin={{ left: 8, right: 8, top: 10, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="m" />
        <YAxis unit="%" />
        <Tooltip />
        <Legend />
        <Bar dataKey="on" name="準時" stackId="a" fill="#2E6FF2" />
        <Bar dataKey="late" name="延遲" stackId="a" fill="#F59E0B" />
        <Bar dataKey="un" name="未收" stackId="a" fill="#EF4444" />
      </BarChart>
    </ResponsiveContainer>
  );
}
