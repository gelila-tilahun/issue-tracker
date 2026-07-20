import { auth } from "@/app/lib/auth";
import { NextRequest, NextResponse } from "next/server";

// This will now work because 'auth' is exported from the step above
export { auth as middleware } from "@/app/lib/auth";

export default async function proxy(request: NextRequest, res: NextResponse) {
    // 1. Call auth() directly
    const session = await auth(); 
    
    if (!session?.user) {
        return NextResponse.redirect(new URL('/api/auth/signin', request.nextUrl));
    }
    
    return NextResponse.next();
}

export const config = {
    matcher: [
        "/issues/new"
    ]
};