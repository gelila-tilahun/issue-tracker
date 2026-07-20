import { handlers } from "@/app/lib/auth"; // Point to your configuration file
import { NextRequest } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ nextauth: string[] }> }
) {
  await params; // Unwraps the dynamic route params
  return handlers.GET(request as NextRequest);
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ nextauth: string[] }> }
) {
  await params; // Unwraps the dynamic route params
  return handlers.POST(request as NextRequest);
}