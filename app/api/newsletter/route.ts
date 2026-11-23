import { NextResponse } from "next/server"
import { z } from "zod"

// Subscribe Profiles: records SUBSCRIBED email consent and respects the list's (double) opt-in setting.
// "Add profile to list" would NOT record consent — see developers.klaviyo.com "Collect email and SMS consent via API".
const KLAVIYO_SUBSCRIBE_URL = "https://a.klaviyo.com/api/profile-subscription-bulk-create-jobs/"
const KLAVIYO_REVISION = "2025-10-15"
const KLAVIYO_TIMEOUT_MS = 8000

const requestSchema = z.object({
  email: z.string().trim().toLowerCase().pipe(z.email().max(254)),
  // Honeypot: hidden from people, filled in by bots
  website: z.string().optional(),
})

type NewsletterResponse = { ok: true } | { ok: false; error: "invalid_email" | "server_error" }

function respond(body: NewsletterResponse, status = 200): NextResponse<NewsletterResponse> {
  return NextResponse.json(body, { status })
}

export async function POST(request: Request): Promise<NextResponse<NewsletterResponse>> {
  const parsed = requestSchema.safeParse(await request.json().catch(() => null))
  if (!parsed.success) return respond({ ok: false, error: "invalid_email" }, 400)

  const { email, website } = parsed.data
  // Pretend success to bots so they don't retry; nothing is sent to Klaviyo
  if (website) return respond({ ok: true })

  const privateKey = process.env.KLAVIYO_PRIVATE_KEY
  const listId = process.env.KLAVIYO_LIST_ID
  if (!privateKey || !listId) {
    console.error("Newsletter: missing KLAVIYO_PRIVATE_KEY or KLAVIYO_LIST_ID")
    return respond({ ok: false, error: "server_error" }, 500)
  }

  try {
    const klaviyoResponse = await fetch(KLAVIYO_SUBSCRIBE_URL, {
      method: "POST",
      headers: {
        Authorization: `Klaviyo-API-Key ${privateKey}`,
        "Content-Type": "application/vnd.api+json",
        Accept: "application/vnd.api+json",
        revision: KLAVIYO_REVISION,
      },
      body: JSON.stringify({
        data: {
          type: "profile-subscription-bulk-create-job",
          attributes: {
            profiles: {
              data: [
                {
                  type: "profile",
                  attributes: {
                    email,
                    subscriptions: { email: { marketing: { consent: "SUBSCRIBED" } } },
                  },
                },
              ],
            },
          },
          relationships: { list: { data: { type: "list", id: listId } } },
        },
      }),
      signal: AbortSignal.timeout(KLAVIYO_TIMEOUT_MS),
      cache: "no-store",
    })

    // Klaviyo accepts the job asynchronously (202); any non-2xx is a real failure
    if (!klaviyoResponse.ok) {
      console.error(`Newsletter: Klaviyo ${klaviyoResponse.status}`, await klaviyoResponse.text())
      return respond({ ok: false, error: "server_error" }, 502)
    }

    return respond({ ok: true })
  } catch (err: unknown) {
    console.error("Newsletter: request failed:", err instanceof Error ? err.message : err)
    return respond({ ok: false, error: "server_error" }, 502)
  }
}
