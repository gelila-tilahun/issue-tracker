import prisma from "@/prisma/client";
import {NextRequest, NextResponse} from "next/server";

export async function GET(request: NextRequest){
    const users = await prisma.user.findMany({
        orderBy: { name: 'asc' },
        select: { id: true, name: true, email: true, image: true },
    });
    return NextResponse.json(users);
}