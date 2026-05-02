import { NextResponse } from "next/server";
import { createCautionSimulation } from "@/lib/caution";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const packId = url.searchParams.get("packId") ?? "signature";

  return NextResponse.json(createCautionSimulation(packId));
}
