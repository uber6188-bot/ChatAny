import { NextRequest, NextResponse } from "next/server";
import { tenantStore } from "../../storage";

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } },
) {
  const item = await tenantStore.get(params.id);
  if (!item) return NextResponse.json({ error: "Not Found" }, { status: 404 });
  return NextResponse.json(item);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const body = await req.json();
  const updated = await tenantStore.update(params.id, body);
  if (!updated)
    return NextResponse.json({ error: "Not Found" }, { status: 404 });
  return NextResponse.json(updated);
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } },
) {
  const removed = await tenantStore.remove(params.id);
  if (!removed)
    return NextResponse.json({ error: "Not Found" }, { status: 404 });
  return NextResponse.json({ ok: true });
}
