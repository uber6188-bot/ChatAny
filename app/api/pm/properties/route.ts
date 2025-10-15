import { NextRequest, NextResponse } from "next/server";
import { propertyStore } from "../storage";
import type { Property } from "../types";

export async function GET() {
  const items = await propertyStore.list();
  return NextResponse.json({ items });
}

export async function POST(req: NextRequest) {
  const body = (await req.json()) as Partial<Property>;
  if (!body.name || body.name.trim().length === 0) {
    return NextResponse.json({ error: "name is required" }, { status: 400 });
  }
  const created = await propertyStore.create({
    name: body.name.trim(),
    address: body.address,
    unitCount: body.unitCount,
    tags: body.tags ?? [],
    notes: body.notes,
  } as Property);
  return NextResponse.json(created, { status: 201 });
}
