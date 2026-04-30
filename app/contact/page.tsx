"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

type Status = "idle" | "submitting" | "success" | "error"

export default function ContactPage() {
  const [status, setStatus] = useState<Status>("idle")

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    console.log("[v0] submit clicked")
    setStatus("submitting")

    const form = e.currentTarget
    const formData = new FormData(form)

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        body: formData,
      })
      const json = await res.json()
      console.log("[v0] API response:", res.status, json)
      if (json.success) {
        setStatus("success")
      } else {
        setStatus("error")
      }
    } catch (err) {
      console.log("[v0] fetch error:", err)
      setStatus("error")
    }
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <div className="pb-16 pt-24">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="mb-12 text-center">
            <h1 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl">
              お問い合わせ
            </h1>
            <p className="text-pretty text-muted-foreground">
              本サイトに関するお問い合わせ、掲載情報の修正・削除のご依頼、広告掲載・協業のご相談はこちらよりご連絡ください。
            </p>
          </div>

          <div className="rounded-2xl border border-border/50 bg-secondary/20 p-8 backdrop-blur-sm">

            {/* Success */}
            {status === "success" && (
              <div className="py-8 text-center">
                <p className="mb-2 text-lg font-semibold text-foreground">
                  お問い合わせありがとうございます。
                </p>
                <p className="text-muted-foreground">
                  内容を確認のうえ、必要に応じてご連絡いたします。
                </p>
              </div>
            )}

            {/* Error */}
            {status === "error" && (
              <p className="mb-6 rounded-lg border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                送信中にエラーが発生しました。時間をおいて再度お試しください。
              </p>
            )}

            {/* Form */}
            {status !== "success" && (
              <form onSubmit={handleSubmit} noValidate>
                {/* Honeypot */}
                <input type="text" name="_gotcha" className="hidden" tabIndex={-1} autoComplete="off" />

                <div className="space-y-6">
                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="mb-2 block text-sm font-medium text-foreground">
                      お名前 <span className="text-primary">*</span>
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      autoComplete="name"
                      className="w-full rounded-lg border border-border/60 bg-secondary/40 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary/60 focus:outline-none focus:ring-1 focus:ring-primary/40 transition-colors"
                      placeholder="山田 太郎"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="mb-2 block text-sm font-medium text-foreground">
                      メールアドレス <span className="text-primary">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      className="w-full rounded-lg border border-border/60 bg-secondary/40 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary/60 focus:outline-none focus:ring-1 focus:ring-primary/40 transition-colors"
                      placeholder="example@mail.com"
                    />
                  </div>

                  {/* Category */}
                  <div>
                    <label htmlFor="category" className="mb-2 block text-sm font-medium text-foreground">
                      お問い合わせ種別 <span className="text-primary">*</span>
                    </label>
                    <select
                      id="category"
                      name="category"
                      required
                      className="w-full rounded-lg border border-border/60 bg-secondary/40 px-4 py-3 text-sm text-foreground focus:border-primary/60 focus:outline-none focus:ring-1 focus:ring-primary/40 transition-colors"
                      defaultValue=""
                    >
                      <option value="" disabled>選択してください</option>
                      <option value="掲載情報の修正依頼">掲載情報の修正依頼</option>
                      <option value="掲載削除の相談">掲載削除の相談</option>
                      <option value="取材・掲載に関する問い合わせ">取材・掲載に関する問い合わせ</option>
                      <option value="広告・協業に関する問い合わせ">広告・協業に関する問い合わせ</option>
                      <option value="その他">その他</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="mb-2 block text-sm font-medium text-foreground">
                      お問い合わせ内容 <span className="text-primary">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      className="w-full resize-y rounded-lg border border-border/60 bg-secondary/40 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary/60 focus:outline-none focus:ring-1 focus:ring-primary/40 transition-colors"
                      placeholder="お問い合わせ内容をご記入ください"
                    />
                  </div>

                  {/* Privacy Policy Agreement */}
                  <div className="flex items-start gap-3">
                    <input
                      id="privacy"
                      name="privacy"
                      type="checkbox"
                      required
                      className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-primary"
                    />
                    <label htmlFor="privacy" className="cursor-pointer text-sm text-muted-foreground leading-relaxed">
                      <a href="/privacy" target="_blank" className="text-primary underline-offset-2 hover:underline">
                        プライバシーポリシー
                      </a>
                      に同意します <span className="text-primary">*</span>
                    </label>
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="w-full rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                    onClick={() => console.log("[v0] button clicked, status:", status)}
                  >
                    {status === "submitting" ? "送信中..." : "送信する"}
                  </button>
                </div>
              </form>
            )}

            {/* Note */}
            <p className="mt-8 border-t border-border/40 pt-6 text-xs leading-relaxed text-muted-foreground">
              掲載情報の修正・削除に関するご連絡は、内容を確認のうえ対応いたします。返信にはお時間をいただく場合があります。
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
