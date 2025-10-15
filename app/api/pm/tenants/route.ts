import { NextRequest, NextResponse } from "next/server";
import { tenantStore } from "../storage";
import type { Tenant } from "../types";

export async function GET() {
  const items = await tenantStore.list();
  return NextResponse.json({ items });
}

export async function POST(req: NextRequest) {
  const body = (await req.json()) as Partial<Tenant>;
  if (!body.name || body.name.trim().length === 0) {
    return NextResponse.json({ error: "name is required" }, { status: 400 });
  }
  const created = await tenantStore.create({
    name: body.name.trim(),
    phone: body.phone,
    email: body.email,
    propertyId: body.propertyId,
    unitNumber: body.unitNumber,
    leaseStart: body.leaseStart,
    leaseEnd: body.leaseEnd,
    monthlyRent: body.monthlyRent,
    notes: body.notes,
  } as Tenant);
  return NextResponse.json(created, { status: 201 });
}
