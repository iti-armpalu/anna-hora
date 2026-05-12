import { NextResponse } from "next/server"

const KLAVIYO_API_URL = "https://a.klaviyo.com/api"
const KLAVIYO_REVISION = "2024-02-15"

export async function POST(req: Request) {
  try {
    const { email } = await req.json()

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { ok: false, error: "Valid email is required" },
        { status: 400 }
      )
    }

    const privateKey = process.env.KLAVIYO_PRIVATE_KEY
    const listId = process.env.KLAVIYO_LIST_ID

    if (!privateKey || !listId) {
      console.error("Missing Klaviyo env vars")
      return NextResponse.json(
        { ok: false, error: "Server configuration error" },
        { status: 500 }
      )
    }

    // Step 1 — create or update the profile
    const profileRes = await fetch(`${KLAVIYO_API_URL}/profiles/`, {
      method: "POST",
      headers: {
        Authorization: `Klaviyo-API-Key ${privateKey}`,
        "Content-Type": "application/json",
        revision: KLAVIYO_REVISION,
      },
      body: JSON.stringify({
        data: {
          type: "profile",
          attributes: { email },
        },
      }),
    })

    // 409 means profile already exists — that's fine, get the ID from response
    let profileId: string | null = null

    if (profileRes.status === 409) {
      const error = await profileRes.json()
      profileId = error?.errors?.[0]?.meta?.duplicate_profile_id ?? null
    } else if (profileRes.ok) {
      const profileData = await profileRes.json()
      profileId = profileData?.data?.id ?? null
    } else {
      const error = await profileRes.json()
      console.error("Klaviyo profile error:", error)
      return NextResponse.json(
        { ok: false, error: "Failed to create profile" },
        { status: 500 }
      )
    }

    if (!profileId) {
      return NextResponse.json(
        { ok: false, error: "Could not resolve profile ID" },
        { status: 500 }
      )
    }

    // Step 2 — subscribe profile to the list
    const subscribeRes = await fetch(
      `${KLAVIYO_API_URL}/lists/${listId}/relationships/profiles/`,
      {
        method: "POST",
        headers: {
          Authorization: `Klaviyo-API-Key ${privateKey}`,
          "Content-Type": "application/json",
          revision: KLAVIYO_REVISION,
        },
        body: JSON.stringify({
          data: [{ type: "profile", id: profileId }],
        }),
      }
    )

    if (!subscribeRes.ok && subscribeRes.status !== 204) {
      const error = await subscribeRes.json()
      console.error("Klaviyo subscribe error:", error)
      return NextResponse.json(
        { ok: false, error: "Failed to subscribe to list" },
        { status: 500 }
      )
    }

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error("Newsletter route error:", error)
    return NextResponse.json(
      { ok: false, error: "Something went wrong. Please try again." },
      { status: 500 }
    )
  }
}