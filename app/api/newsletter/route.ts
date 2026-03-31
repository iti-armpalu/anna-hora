import { NextRequest, NextResponse } from "next/server";

type NewsletterRequestBody = {
  email?: string;
};

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as NewsletterRequestBody;
    const email = body.email?.trim().toLowerCase();

    if (!email) {
      return NextResponse.json(
        { ok: false, error: "Email is required." },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { ok: false, error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    // TODO:
    // 1. Add rate limiting / bot protection
    // 2. Send to Klaviyo
    // 3. Optionally store source metadata

    // Temporary success response
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request." },
      { status: 400 }
    );
  }
}