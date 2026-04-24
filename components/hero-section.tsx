"use client"

import { Search } from "lucide-react"
import { TechTags } from "./tech-tags"

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] overflow-hidden pt-16">
      {/* Background Effects */}
      <div className="absolute inset-0">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
        
        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 200, 255, 0.3) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(0, 200, 255, 0.3) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        />
        
        {/* Glowing orbs */}
        <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-neon-cyan/10 blur-[128px]" />
        <div className="absolute right-1/4 bottom-1/4 h-80 w-80 rounded-full bg-neon-blue/10 blur-[128px]" />
        
        {/* Abstract tech illustration */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-20">
          <svg
            width="600"
            height="600"
            viewBox="0 0 600 600"
            fill="none"
            className="text-neon-cyan"
          >
            <circle cx="300" cy="300" r="200" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
            <circle cx="300" cy="300" r="150" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
            <circle cx="300" cy="300" r="100" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
            <circle cx="300" cy="300" r="50" stroke="currentColor" strokeWidth="1" opacity="0.6" />
            
            {/* Robotic arm suggestion */}
            <path
              d="M300 300 L400 200 L450 250 L380 320"
              stroke="currentColor"
              strokeWidth="2"
              opacity="0.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="380" cy="320" r="8" fill="currentColor" opacity="0.5" />
            
            {/* Connection lines */}
            <line x1="300" y1="100" x2="300" y2="500" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
            <line x1="100" y1="300" x2="500" y2="300" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
            
            {/* Data flow dots */}
            <circle cx="300" cy="150" r="3" fill="currentColor" opacity="0.6" />
            <circle cx="300" cy="450" r="3" fill="currentColor" opacity="0.6" />
            <circle cx="150" cy="300" r="3" fill="currentColor" opacity="0.6" />
            <circle cx="450" cy="300" r="3" fill="currentColor" opacity="0.6" />
          </svg>
        </div>
      </div>

      {/* Content */}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-[calc(90vh-4rem)] flex-col items-center justify-center py-20 text-center">
          {/* Badge */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-border/50 bg-secondary/50 px-4 py-1.5 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-neon-cyan opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-neon-cyan" />
            </span>
            <span className="text-xs text-muted-foreground">
              最新の医療テクノロジーを探索
            </span>
          </div>

          {/* Main heading */}
          <h1 className="mb-6 max-w-4xl text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            日本の外科医療を、
            <br />
            <span className="bg-gradient-to-r from-neon-cyan to-neon-blue bg-clip-text text-transparent">
              アップデートする。
            </span>
          </h1>

          {/* Subheading */}
          <p className="mb-10 max-w-2xl text-pretty text-lg text-muted-foreground sm:text-xl">
            全国の最新ロボット手術・映像DXの事例データベース
          </p>

          {/* Search bar */}
          <div className="mb-8 w-full max-w-2xl">
            <div className="group relative">
              <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-neon-cyan/50 to-neon-blue/50 opacity-0 blur transition-opacity group-hover:opacity-100" />
              <div className="relative flex items-center rounded-xl border border-border/50 bg-secondary/80 backdrop-blur-sm">
                <Search className="ml-4 h-5 w-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="技術名、病院名、キーワードで検索..."
                  className="flex-1 bg-transparent px-4 py-4 text-foreground placeholder:text-muted-foreground focus:outline-none"
                />
                <button className="mr-2 rounded-lg bg-gradient-to-r from-neon-cyan to-neon-blue px-6 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90">
                  検索
                </button>
              </div>
            </div>
          </div>

          {/* Tech tags */}
          <TechTags />
        </div>
      </div>
    </section>
  )
}
