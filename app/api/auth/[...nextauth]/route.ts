import NextAuth from "next-auth"

import { authOptions } from "@/app/lib/auth";
import { NextRequest } from "next/server";

const handler = NextAuth(authOptions)


export async function GET(
  request: Request,
  { params }: { params: Promise<{ nextauth: string[] }> }
) {
  await params; // Unwraps the promise to prevent the Next.js error
  return handler.handlers.GET(request as NextRequest);
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ nextauth: string[] }> }
) {
  await params; // Unwraps the promise to prevent the Next.js error
  return handler.handlers.POST(request as NextRequest);
}
