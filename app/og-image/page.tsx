export default function OgImagePage() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-8">
      {/* OGP Image Container - 1200x630px */}
      <div
        id="ogp-capture"
        className="relative overflow-hidden"
        style={{
          width: "1200px",
          height: "630px",
          background: "linear-gradient(135deg, #0a0a0f 0%, #0c1929 40%, #0f172a 70%, #0a0a0f 100%)",
        }}
      >
        {/* Background Grid Pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(34, 211, 238, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(34, 211, 238, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />

        {/* Glowing Orbs */}
        <div
          className="absolute rounded-full blur-3xl"
          style={{
            width: "400px",
            height: "400px",
            background: "radial-gradient(circle, rgba(34, 211, 238, 0.15) 0%, transparent 70%)",
            top: "-100px",
            right: "100px",
          }}
        />
        <div
          className="absolute rounded-full blur-3xl"
          style={{
            width: "300px",
            height: "300px",
            background: "radial-gradient(circle, rgba(59, 130, 246, 0.12) 0%, transparent 70%)",
            bottom: "-50px",
            left: "200px",
          }}
        />

        {/* Right Side - Abstract Medical Tech Visuals */}
        <div className="absolute right-0 top-0 bottom-0 w-1/2 flex items-center justify-center">
          {/* Japan Map Silhouette (Abstract) */}
          <svg
            viewBox="0 0 400 500"
            className="absolute opacity-20"
            style={{ width: "350px", height: "450px", right: "80px", top: "90px" }}
          >
            <defs>
              <linearGradient id="japanGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#22d3ee" />
                <stop offset="100%" stopColor="#3b82f6" />
              </linearGradient>
            </defs>
            {/* Simplified Japan shape */}
            <path
              d="M180 50 L220 80 L240 120 L250 180 L240 220 L260 260 L250 300 L230 340 L200 380 L180 420 L160 400 L140 360 L120 320 L100 280 L90 240 L100 200 L120 160 L140 120 L160 80 Z"
              fill="url(#japanGradient)"
              opacity="0.6"
            />
            {/* Network nodes */}
            <circle cx="180" cy="150" r="6" fill="#22d3ee" opacity="0.8" />
            <circle cx="220" cy="200" r="5" fill="#22d3ee" opacity="0.6" />
            <circle cx="160" cy="250" r="4" fill="#3b82f6" opacity="0.7" />
            <circle cx="200" cy="300" r="5" fill="#22d3ee" opacity="0.5" />
            <circle cx="140" cy="180" r="4" fill="#3b82f6" opacity="0.6" />
            {/* Connection lines */}
            <line x1="180" y1="150" x2="220" y2="200" stroke="#22d3ee" strokeWidth="1" opacity="0.4" />
            <line x1="220" y1="200" x2="160" y2="250" stroke="#22d3ee" strokeWidth="1" opacity="0.4" />
            <line x1="160" y1="250" x2="200" y2="300" stroke="#22d3ee" strokeWidth="1" opacity="0.4" />
            <line x1="140" y1="180" x2="180" y2="150" stroke="#3b82f6" strokeWidth="1" opacity="0.4" />
          </svg>

          {/* Robot Arm Abstract */}
          <svg
            viewBox="0 0 200 200"
            className="absolute opacity-30"
            style={{ width: "180px", height: "180px", right: "280px", top: "120px" }}
          >
            <defs>
              <linearGradient id="armGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#22d3ee" />
                <stop offset="100%" stopColor="#06b6d4" />
              </linearGradient>
            </defs>
            {/* Robot arm segments */}
            <rect x="80" y="20" width="40" height="60" rx="8" fill="url(#armGradient)" opacity="0.7" />
            <rect x="70" y="80" width="60" height="50" rx="10" fill="url(#armGradient)" opacity="0.5" />
            <circle cx="100" cy="150" r="25" fill="url(#armGradient)" opacity="0.4" />
            {/* Joint circles */}
            <circle cx="100" cy="80" r="8" fill="#22d3ee" opacity="0.9" />
            <circle cx="100" cy="130" r="6" fill="#22d3ee" opacity="0.7" />
          </svg>

          {/* Data Cards */}
          <div
            className="absolute flex flex-col gap-3"
            style={{ right: "60px", bottom: "140px" }}
          >
            <div
              className="rounded-lg border border-cyan-500/30 bg-slate-900/60 backdrop-blur-sm p-3"
              style={{ width: "140px" }}
            >
              <div className="h-2 w-16 bg-cyan-400/60 rounded mb-2" />
              <div className="h-1.5 w-full bg-slate-600/50 rounded mb-1" />
              <div className="h-1.5 w-3/4 bg-slate-600/50 rounded" />
            </div>
            <div
              className="rounded-lg border border-blue-500/30 bg-slate-900/60 backdrop-blur-sm p-3"
              style={{ width: "120px", marginLeft: "30px" }}
            >
              <div className="h-2 w-12 bg-blue-400/60 rounded mb-2" />
              <div className="h-1.5 w-full bg-slate-600/50 rounded mb-1" />
              <div className="h-1.5 w-2/3 bg-slate-600/50 rounded" />
            </div>
          </div>

          {/* Floating data points */}
          <div className="absolute" style={{ right: "200px", top: "80px" }}>
            <div className="w-3 h-3 rounded-full bg-cyan-400 animate-pulse" />
          </div>
          <div className="absolute" style={{ right: "350px", top: "200px" }}>
            <div className="w-2 h-2 rounded-full bg-blue-400 opacity-60" />
          </div>
          <div className="absolute" style={{ right: "150px", bottom: "100px" }}>
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 opacity-50" />
          </div>
        </div>

        {/* Left Side - Text Content */}
        <div className="absolute left-0 top-0 bottom-0 w-1/2 flex flex-col justify-center pl-16 pr-8">
          {/* Main Copy */}
          <h1
            className="font-bold text-white leading-tight mb-6"
            style={{
              fontSize: "56px",
              textShadow: "0 0 40px rgba(34, 211, 238, 0.3)",
            }}
          >
            <span className="block">日本の外科医局を、</span>
            <span
              className="block bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent"
            >
              アップデートする。
            </span>
          </h1>

          {/* Sub Copy */}
          <p
            className="text-slate-300 font-medium mb-8"
            style={{ fontSize: "24px" }}
          >
            外科DX・最新テクノロジー
            <br />
            導入医局データベース
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-3">
            {[
              "ロボット手術",
              "AI・データ活用",
              "VR・教育",
              "内視鏡・低侵襲",
              "遠隔医療",
            ].map((tag) => (
              <span
                key={tag}
                className="px-3 py-1.5 rounded-full border border-cyan-500/40 bg-cyan-950/30 text-cyan-300"
                style={{ fontSize: "14px" }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom Accent Line */}
        <div
          className="absolute bottom-0 left-0 right-0 h-1"
          style={{
            background: "linear-gradient(90deg, transparent 0%, #22d3ee 30%, #3b82f6 70%, transparent 100%)",
          }}
        />

        {/* Corner Accents */}
        <div className="absolute top-6 left-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded border border-cyan-500/50 flex items-center justify-center bg-slate-900/50">
              <span className="text-cyan-400 font-mono font-bold text-sm">ST</span>
            </div>
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="fixed bottom-4 left-4 text-slate-500 text-sm">
        <p>このページをスクリーンショットして public/ogp.png として保存してください</p>
        <p>推奨: ブラウザの開発者ツールでデバイスを 1200x630 に設定</p>
      </div>
    </div>
  )
}
