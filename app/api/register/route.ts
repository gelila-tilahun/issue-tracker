import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { randomUUID } from "crypto";

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = registerSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(
      { error: validation.error.errors[0].message },
      { status: 400 }
    );
  }

  const { name, email, password } = validation.data;

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return NextResponse.json(
      { error: "An account with this email already exists." },
      { status: 409 }
    );
  }

  const hashed = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      id: randomUUID(),
      name,
      email,
      password: hashed,
    },
  });

  return NextResponse.json({ message: "Account created successfully." }, { status: 201 });
}
