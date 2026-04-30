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

    // Guard: environment variables
    const apiKey  = process.env.RESEND_API_KEY
    const toEmail = process.env.CONTACT_TO_EMAIL
    const fromEmail = process.env.CONTACT_FROM_EMAIL

    // Dry-run: env vars not yet configured — log and return success so UI can be tested
    if (!apiKey || !toEmail || !fromEmail) {
      console.log("[contact] Dry-run: env vars not set. Form data received:", { name, email, category, message })
      return Response.json({ success: true, dryRun: true })
    }

    const resend = new Resend(apiKey)

    const { error } = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      subject: "【Surgical Tech Portal】お問い合わせ",
      text: `Surgical Tech Portal のお問い合わせフォームから送信されました。

お名前: ${name}
メールアドレス: ${email}
お問い合わせ種別: ${category}
お問い合わせ内容:
${message}
`,
    })

    if (error) {
      console.error("[contact] Resend error:", error)
      return Response.json({ success: false }, { status: 500 })
    }

    return Response.json({ success: true })
  } catch (err) {
    console.error("[contact] Unexpected error:", err)
    return Response.json({ success: false }, { status: 500 })
  }
}
