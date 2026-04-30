// Required Vercel environment variables:
//   RESEND_API_KEY   — Resend API key
//   CONTACT_TO_EMAIL — Recipient address (e.g. info@finefield.net)
//   CONTACT_FROM_EMAIL — Sender address (e.g. noreply@surgical-tech-portal.jp)

import { Resend } from "resend"

export async function POST(request: Request) {
  try {
    const formData = await request.formData()

    const name     = (formData.get("name")     as string | null)?.trim() ?? ""
    const email    = (formData.get("email")    as string | null)?.trim() ?? ""
    const category = (formData.get("category") as string | null)?.trim() ?? ""
    const message  = (formData.get("message")  as string | null)?.trim() ?? ""
    const gotcha   = (formData.get("_gotcha")  as string | null)?.trim() ?? ""

    // Honeypot — treat as success to avoid exposing the check to bots
    if (gotcha) {
      return Response.json({ success: true })
    }

    // Required field validation
    if (!name || !email || !category || !message) {
      return Response.json({ success: false, error: "必須項目が未入力です。" }, { status: 400 })
    }

    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) {
      console.error("[contact] Missing env var: RESEND_API_KEY")
      return Response.json({ success: false, error: "RESEND_API_KEY is not set" }, { status: 500 })
    }

    const resend = new Resend(apiKey)

    let sendResult
    try {
      sendResult = await resend.emails.send({
        from: "onboarding@resend.dev",
        to: "info@finefield.net",
        subject: "test",
        text: "test",
      })
      console.log("[contact] Resend result:", JSON.stringify(sendResult))
    } catch (sendErr) {
      console.error("[contact] Resend threw:", sendErr)
      return Response.json(
        { success: false, error: sendErr instanceof Error ? sendErr.message : "Unknown send error" },
        { status: 500 }
      )
    }

    if (sendResult.error) {
      console.error("[contact] Resend error object:", JSON.stringify(sendResult.error))
      return Response.json(
        { success: false, error: sendResult.error instanceof Error ? sendResult.error.message : JSON.stringify(sendResult.error) },
        { status: 500 }
      )
    }

    return Response.json({ success: true })
  } catch (err) {
    console.error("[contact] Unexpected error:", err)
    return Response.json({ success: false }, { status: 500 })
  }
}
