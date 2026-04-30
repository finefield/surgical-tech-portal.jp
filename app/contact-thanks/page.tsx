import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export const metadata = {
  title: "お問い合わせありがとうございます | Surgical Tech Portal",
  description: "お問い合わせを受け付けました。",
}

export default function ContactThanksPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />

      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-24">
        <div className="mx-auto w-full max-w-lg text-center">

          {/* Icon */}
          <div className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-full border border-primary/30 bg-primary/10">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-primary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>

          {/* Message */}
          <h1 className="mb-4 text-2xl font-bold text-foreground sm:text-3xl">
            お問い合わせありがとうございます。
          </h1>
          <p className="mb-10 text-pretty leading-relaxed text-muted-foreground">
            内容を確認のうえ、必要に応じてご連絡いたします。
          </p>

          {/* Back button */}
          <Link
            href="/"
            className="inline-block rounded-lg border border-border/60 bg-secondary/40 px-8 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary/70"
          >
            トップページへ戻る
          </Link>

        </div>
      </div>

      <Footer />
    </main>
  )
}
