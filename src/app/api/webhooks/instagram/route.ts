import { type NextRequest, NextResponse } from "next/server";

import {
  runInstagramCommentAutomation,
  runInstagramMessageAutomation,
} from "@/features/social-media/automations/instagram";

export async function GET(request: NextRequest) {
  const hub = request.nextUrl.searchParams.get("hub.challenge");
  if (!hub || typeof hub !== "string") {
    return new NextResponse("Invalid challenge", { status: 400 });
  }
  return new NextResponse(hub, { status: 200 });
}

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json();

    if (!payload || !Array.isArray(payload.entry) || payload.entry.length === 0) {
      return new NextResponse("Invalid payload structure", { status: 400 });
    }

    console.dir(payload, { depth: null });
    const entry = payload.entry[0];

    if ("messaging" in entry) {
      const response = await runInstagramMessageAutomation(entry);
      return new NextResponse(response?.message, { status: response?.status || 500 });
    }

    if ("changes" in entry) {
      const response = await runInstagramCommentAutomation(entry);
      return new NextResponse(response?.message, { status: response?.status || 500 });
    }

    return new NextResponse("Unhandled entry type", { status: 400 });
  } catch (error) {
    console.error("Error handling instagram webhook", error);
    if (error instanceof Error) {
      return new NextResponse(error.message, { status: 500 });
    }
    return new NextResponse("Error handling instagram webhook", { status: 500 });
  }
}
