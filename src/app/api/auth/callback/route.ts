import { scalekit } from "@/lib/scalekit";
import { redirect } from "next/dist/server/api-utils";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const code = searchParams.get("code");
    const redirectUrl = `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/callback`;
    if (!code) {
        return Response.json({ error: "No code provided" }, { status: 400 });
    }

    const session = await scalekit.authenticateWithCode(code, redirectUrl);
    const response = NextResponse.redirect(new URL(`${process.env.NEXT_PUBLIC_APP_URL}`));

    response.cookies.set("access_token", session.accessToken, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: "/"
    })

    return response;
}