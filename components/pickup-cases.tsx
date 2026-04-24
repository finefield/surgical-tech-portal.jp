"use client"

import { useState } from "react"
import { ArrowRight, ChevronUp } from "lucide-react"

interface PickUpCase {
  id: number
  caseNumber: string
  university: string
  catchphrase: string
  lead: string
  fullStory: {
    challenge: {
      title: string
      content: string
    }
    solution: {
      title: string
      content: string
    }
  }
  tags: string[]
}

const pickUpCases: PickUpCase[] = [
  {
    id: 1,
    caseNumber: "CASE 01",
    university: "北海道大学 消化器外科II",
    catchphrase: "5G遠隔手術のフロンティア：広大な大地の「距離」をテクノロジーでゼロにする",
    lead: "北海道の広大な面積がもたらす「距離による高度医療の格差」。彼らは5G回線と国産ロボットHinotoriを活用し、札幌から数百キロ離れた地方病院へ遅延ゼロで技術指導を行う次世代医療インフラの実証に挑んでいます。",
    fullStory: {
      challenge: {
        title: "直面するハードル：日本の国土の2割を占める広大さ",
        content: "北海道における地域医療の最大の敵は「物理的な距離」と「厳しい冬季の移動」です。最高峰の技術を持つ大学病院の指導医が、地方中核病院へ直接赴いて技術指導を行うには、あまりにも莫大な移動時間とリソースが奪われます。この「距離による高度医療の格差」を、彼らは通信とロボティクスの力でねじ伏せようとしています。",
      },
      solution: {
        title: "圧倒的なソリューション：Hinotori × 5Gが生み出す未来",
        content: "いち早く国産手術支援ロボット「Hinotori」を導入した同局が現在強力に推し進めているのが、「5G回線を活用した遠隔手術支援システム」の実証プロジェクトです。札幌にある大学病院の熟練医が、数百キロ離れた地方病院の手術室から送られてくる高精細な術野映像をリアルタイムでモニタリング。遅延（ラグ）の一切ない環境下で、ロボットの鉗子操作に直接介入し、精緻な技術指導を行います。「映像の途切れ＝医療事故」に直結する極限の環境において、彼らが求めているのは「絶対に止まらない大容量通信インフラ」と「肉眼を超える超高画質映像の低遅延エンコード技術」です。北の大地で産声を上げたこの仕組みは、やがて日本全国の地域医療を救う「遠隔均てん化のマスターピース」となるはずです。",
      },
    },
    tags: ["5G遠隔手術", "国産ロボットHinotori", "リアルタイム低遅延伝送"],
  },
  {
    id: 2,
    caseNumber: "CASE 02",
    university: "高知大学 外科学講座",
    catchphrase: "映像配信のプロ集団。自局主導で実現する「大規模ハイブリッドカンファレンス」",
    lead: "情報の地域格差を自らのITリテラシーで打破。外部業者に頼らず、自局の医師が160名規模の会場とWebをシームレスに繋ぐハイブリッド講演会を運営。他科を巻き込んだ合同カンファレンスで、四国から全国へ知見を発信します。",
    fullStory: {
      challenge: {
        title: "直面するハードル：地方における情報の孤立と多職種連携の壁",
        content: "最新の医療技術や知見は、どうしても都市部に集中しがちです。また、高度化する外科手術において、外科医単独ではなく内科医や腫瘍内科医との綿密なチーム医療が不可欠になっていますが、忙しい各科の医師が物理的に一堂に会するのは困難でした。",
      },
      solution: {
        title: "圧倒的なソリューション：放送局レベルの自営DXと発信力",
        content: "高知大学外科学講座の真の恐ろしさは、消化器全領域でのロボット手術導入という実績に加え、その「極めて高いITリテラシーと自立した映像配信力」にあります。彼らは外部の映像業者に丸投げすることなく、自局の医師たちが主導して機材を操り、160名規模の会場とWeb空間をシームレスに繋ぐ「大規模ハイブリッド講演会」を定期的に開催しています。複数のカメラアングルから捉えた手術映像の切り替え、クリアな音声のミキシング、スライド資料とのPinP（ワイプ）表示など、その運営レベルはまさにプロの放送局。他科を巻き込んだ合同カンファレンスを常態化させ、四国から全国へ向けて最先端の知見を発信し続ける彼らの手術室・会議室には、「より直感的で、より安定したプロユースの映像スイッチャーや配信プラットフォーム」が常に求められています。",
      },
    },
    tags: ["自営ハイブリッド配信", "多職種合同カンファレンス", "映像送出テクノロジー"],
  },
  {
    id: 3,
    caseNumber: "CASE 03",
    university: "鳥取大学 消化器・小児外科学",
    catchphrase: "若手エースが牽引。完全統合型「スマート手術室」をアジャイルに構築",
    lead: "手術室に溢れる無数のデバイス映像を、ネットワーク（IP伝送）で一元化。執刀医の視界をチーム全員で遅延なく共有し、旧態依然とした「情報の分断」を若手主導のスピード感で破壊する、真の現場DX事例です。",
    fullStory: {
      challenge: {
        title: "直面するハードル：手術室に蔓延する「情報の分断」",
        content: "現代の手術室は、内視鏡モニター、ロボットのコンソール、麻酔器、生体情報モニターなど、無数のデバイスで溢れかえっています。しかし、それぞれのデータや映像は独立した画面に表示され、執刀医が見ている極度の緊張状態の術野を、周りのスタッフが全く同じ解像度・同じ視界で共有することは困難でした。",
      },
      solution: {
        title: "圧倒的なソリューション：IP伝送が実現する究極のチーム医療",
        content: "この旧態依然とした手術室の「情報の壁」を、若手外科医たちの圧倒的な熱量とスピード感（アジャイル）で破壊しているのが鳥取大学です。彼らは、手術室内のあらゆる機器から出力される映像やデータをネットワーク上で一元化する「統合型スマート手術室」を構築。院内IP伝送（AV over IP）システムを活用することで、執刀医の視界を麻酔科医や看護師、さらには別室にいる指導医のタブレットへ、遅延なく高画質で共有することを可能にしました。「誰が、いつ、どの映像を見るべきか」を現場のニーズに合わせて瞬時に切り替える彼らの取り組みは、ハードウェアの壁を越えた真のDXです。彼らの歩みは、「乱立する医療機器の映像ソースを、一本のLANケーブルでシームレスに繋ぐ次世代の映像ルーターやマトリックスハブ」の強力なショーケースとなります。",
      },
    },
    tags: ["スマート手術室", "若手主導アジャイルDX", "院内映像IP伝送"],
  },
]

function PickUpCard({ pickUpCase }: { pickUpCase: PickUpCase }) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <article className="group relative">
      {/* Glow Border on Hover */}
      <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-neon-cyan/0 via-neon-cyan/30 to-neon-blue/0 opacity-0 blur transition-all duration-500 group-hover:opacity-100" />

      <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-secondary/30 backdrop-blur-sm transition-all duration-300 group-hover:border-neon-cyan/30 group-hover:bg-secondary/50">
        <div className="p-8 lg:p-10">
          {/* Case number badge */}
          <div className="mb-4 flex items-center gap-3">
            <span className="rounded-full bg-neon-cyan/10 px-4 py-1.5 text-sm font-semibold text-neon-cyan">
              {pickUpCase.caseNumber}
            </span>
            <span className="text-sm text-muted-foreground">{pickUpCase.university}</span>
          </div>

          {/* Catchphrase */}
          <h3 className="mb-4 text-xl font-bold leading-tight text-foreground transition-colors group-hover:text-neon-cyan md:text-2xl lg:text-2xl">
            {pickUpCase.catchphrase}
          </h3>

          {/* Lead text */}
          <p className="mb-6 leading-relaxed text-muted-foreground">
            {pickUpCase.lead}
          </p>

          {/* Tags */}
          <div className="mb-6 flex flex-wrap gap-2">
            {pickUpCase.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-neon-cyan/30 bg-neon-cyan/10 px-3 py-1 text-xs font-medium text-neon-cyan"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Expandable full story */}
          {isExpanded && (
            <div className="mb-6 space-y-6 border-t border-border/50 pt-6">
              {/* Challenge section */}
              <div>
                <h4 className="mb-3 flex items-center gap-2 text-lg font-semibold text-foreground">
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-amber-500/20 text-xs font-bold text-amber-400">!</span>
                  {pickUpCase.fullStory.challenge.title}
                </h4>
                <p className="leading-relaxed text-muted-foreground">
                  {pickUpCase.fullStory.challenge.content}
                </p>
              </div>

              {/* Solution section */}
              <div>
                <h4 className="mb-3 flex items-center gap-2 text-lg font-semibold text-foreground">
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-neon-cyan/20 text-xs font-bold text-neon-cyan">S</span>
                  {pickUpCase.fullStory.solution.title}
                </h4>
                <p className="leading-relaxed text-muted-foreground">
                  {pickUpCase.fullStory.solution.content}
                </p>
              </div>
            </div>
          )}

          {/* Read Full Story button */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="inline-flex items-center gap-2 text-sm font-medium text-neon-cyan transition-colors hover:text-neon-cyan/80"
          >
            {isExpanded ? (
              <>
                閉じる
                <ChevronUp className="h-4 w-4" />
              </>
            ) : (
              <>
                ストーリーの全貌を読む
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  )
}

export function PickUpCases() {
  return (
    <section className="relative overflow-hidden py-24">
      {/* Background Glow Effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/4 top-0 h-[500px] w-[500px] rounded-full bg-neon-cyan/5 blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 h-[400px] w-[400px] rounded-full bg-neon-blue/5 blur-[100px]" />
      </div>

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-neon-cyan/30 bg-neon-cyan/10 px-4 py-1.5 text-sm font-medium text-neon-cyan">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-neon-cyan opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-neon-cyan" />
            </span>
            PICK UP CASES
          </div>
          <h2 className="mb-4 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            日本の外科医療をアップデートする
            <br />
            <span className="bg-gradient-to-r from-neon-cyan via-neon-blue to-neon-cyan bg-clip-text text-transparent">
              先駆者たち
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            テクノロジーで医療の課題に挑む、最前線の取り組みをご紹介します
          </p>
        </div>

        {/* Cases */}
        <div className="space-y-8">
          {pickUpCases.map((pickUpCase) => (
            <PickUpCard key={pickUpCase.id} pickUpCase={pickUpCase} />
          ))}
        </div>
      </div>
    </section>
  )
}
