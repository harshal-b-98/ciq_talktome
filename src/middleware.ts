/**
 * Next.js Middleware for Session Management
 * Handles session creation/updates before page render
 *
 * This is necessary because Next.js 15 doesn't allow cookie modifications
 * in Server Components (including pages and generateMetadata).
 */

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import type { CookieSessionData } from "./lib/session/cookie-session";

const SESSION_CONFIG = {
  cookieName: "ciq_session",
  password: process.env.SESSION_SECRET || "complex_password_at_least_32_characters_long_for_encryption",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    sameSite: "lax" as const,
    maxAge: 60 * 60 * 24 * 30, // 30 days
    path: "/",
  },
};

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Get or create session
  const cookieStore = await cookies();
  const session = await getIronSession<CookieSessionData>(cookieStore, SESSION_CONFIG);

  // If no session exists, create one
  if (!session.sessionId) {
    const now = new Date().toISOString();
    session.sessionId = crypto.randomUUID();
    session.createdAt = now;
    session.lastVisit = now;
    session.recentVisits = [];
    session.recentInteractions = [];
    session.metadata = {
      firstVisit: now,
      totalVisits: 1,
    };
    session.flags = {
      isBot: false,
      isReturningVisitor: false,
      hasInteracted: false,
      hasChatted: false,
      hasSubmittedForm: false,
      emailCaptured: false,
    };

    await session.save();
  } else {
    // Update existing session
    session.lastVisit = new Date().toISOString();
    session.metadata.totalVisits = (session.metadata.totalVisits || 0) + 1;
    session.flags.isReturningVisitor = session.metadata.totalVisits > 1;

    await session.save();
  }

  return response;
}

// Configure which routes use this middleware
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
