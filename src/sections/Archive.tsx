import { useState } from "react";
import { Film, Link2, ShieldCheck, TriangleAlert } from "lucide-react";
import { cn } from "@/lib/utils";
import { Callout, Label, SectionTitle } from "@/components/brand";
import { COVERAGE } from "@/data/content";

const GROUPS = ["公道饭", "省运会", "福山咖啡", "瑞溪三宝"] as const;
type Group = (typeof GROUPS)[number] | "全部";

/** 采访 / 影像专区（待用户提供链接后填充，遵循“只索引、不搬运”原则） */
const INTERVIEWS: {
  source: string;
  title: string;
  note: string;
  url?: string;
}[] = [
  {
    source: "官方媒体采访 · 公道饭店",
    title: "琼海公道店采访影像（待补充链接）",
    note: "参赛者在抖音上看到的官方媒体报道。请把链接给我，我按“来源 + 标题 + 摘要 + 原链”的形式登记到这一页。",
  },
  {
    source: "省运会宣传片",
    title: "《公道本味 匠心省运》（官方发布渠道）",
    note: "2026 年海南省第七届运动会宣传片，官方通报全网播放破百万。请在官方渠道观看与引用。",
  },
  {
    source: "地方文化机构",
    title: "公道文化馆实地影像（决赛前补充）",
    note: "多河文化谷景区内的公道文化馆。若取得授权，将把实拍影像放入本专区。",
  },
];

export function Archive() {
  const [group, setGroup] = useState<Group>("全部");
  const list = group === "全部" ? COVERAGE : COVERAGE.filter((c) => c.group === group);

  return (
    <div className="bg-background pb-24">
      <section className="mx-auto max-w-shell px-6 pb-16 pt-16 md:px-8 md:pb-24 md:pt-24">
        <Label>真实第一准则</Label>
        <h1 className="mt-8 font-sans text-5xl leading-[0.95] tracking-tight text-foreground sm:text-6xl md:text-7xl">
          影像志
        </h1>
        <div className="mt-10 grid gap-8 md:grid-cols-12 md:gap-12">
          <p className="max-w-md font-sans text-sm leading-relaxed text-muted md:col-span-5 md:text-base">
            这一页专门用来“摆出处”。官方媒体对公道饭的报道与采访，镜头比我们更专业、也更权威——
            我们不去搬运它们，而是把来源、标题、摘要与原链接一条条摊开，让评委和观众随时能核对。
          </p>
          <p className="font-sans text-xl italic leading-relaxed text-muted md:col-span-4 md:col-start-9 md:text-2xl">
            Index, not repost.
            <br />
            只做索引，不做搬运。
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-shell px-6 md:px-8">
        {/* 原则 */}
        <div className="grid gap-0 md:grid-cols-3">
          <Callout title="只索引，不搬运" icon={<ShieldCheck className="h-4 w-4" />}>
            第三方媒体内容版权属于原作者与发布机构。本站只做“来源标注 + 摘要 + 外链跳转”，
            不在站内转载视频文件、不二次剪辑、不水印覆盖。
          </Callout>
          <Callout title="以官方为准" icon={<Film className="h-4 w-4" />}>
            涉及习俗、历史、食材的表述，一律以省级文旅部门、政府门户、央媒与史志网的口径为准。
            本项目自己的 AI 生成内容，全部单独标注。
          </Callout>
          <Callout title="需要授权才上镜" icon={<TriangleAlert className="h-4 w-4" />}>
            如果采访影像里出现店家招牌、店主或食客正脸，站内呈现须先取得对方同意；
            未获授权时，只放官方链接，不放截图。
          </Callout>
        </div>

        {/* 采访专区 */}
        <section id="interviews" className="mt-24">
          <SectionTitle
            index="01"
            kick="采访专区 · 建设中"
            title="官方媒体的公道饭采访"
            desc="这一区将集中展示官方媒体对琼海公道店的采访影像。目前以“来源卡片”形式占位，链接到位后逐条填充。"
          />
          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {INTERVIEWS.map((it) => (
              <div
                key={it.title}
                className={cn(
                  "flex flex-col rounded-2xl border bg-background p-6 shadow-sm transition-all duration-300 hover:shadow-md",
                  it.url ? "border-border" : "border-dashed border-border",
                )}
              >
                <div className="flex items-center gap-3">
                  <Link2 className="h-4 w-4 text-subtle" />
                  <span className="label">{it.source}</span>
                </div>
                <h3 className="mt-5 font-sans text-xl leading-snug tracking-tight text-foreground">
                  {it.title}
                </h3>
                <p className="mt-4 flex-1 font-sans text-xs leading-relaxed text-muted">{it.note}</p>
                {it.url ? (
                  <a
                    href={it.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="hover-underline mt-6 inline-block font-sans text-[13px] font-medium text-foreground"
                  >
                    打开原视频 →
                  </a>
                ) : (
                  <span className="mt-6 font-sans text-[13px] font-medium text-subtle">
                    待补充链接
                  </span>
                )}
              </div>
            ))}
          </div>

          <div className="mt-12">
            <Callout title="需要参赛者提供" tone="invert">
              <ol className="space-y-3">
                <li>1. 你在抖音上看到的官方媒体采访链接（每条附：发布账号名 + 大致发布时间 + 一句话内容）。</li>
                <li>2. 若希望站内展示截图或片段，请确认是否已取得对方授权；未授权则只做外链跳转。</li>
                <li>3. 如果有长辈讲述视频或老照片，同样登记到本专区与故事馆（这类一手素材最珍贵）。</li>
              </ol>
            </Callout>
          </div>
        </section>

        {/* 报道索引 */}
        <section id="coverage" className="mt-24">
          <SectionTitle
            index="02"
            kick="考据来源索引"
            title="全部报道，逐条可核验"
            desc="按 IP 分组。点击任意一条可跳转原文——本项目所有文化陈述都能在这里找到依据。"
          />

          <div className="mt-12 flex flex-wrap gap-x-8 gap-y-3 border-t border-border pt-6">
            {(["全部", ...GROUPS] as Group[]).map((g) => (
              <button
                key={g}
                type="button"
                onClick={() => setGroup(g)}
                className={cn(
                  "hover-underline font-sans text-[13px] font-medium transition-colors duration-200",
                  g === group ? "text-foreground" : "text-subtle hover:text-foreground",
                )}
              >
                {g}
              </button>
            ))}
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {list.map((c) => (
              <a
                key={c.url}
                href={c.url}
                target="_blank"
                rel="noreferrer noopener"
                className="group flex flex-col rounded-2xl border border-border bg-background p-6 shadow-sm transition-all duration-300 hover:shadow-md"
              >
                <div className="flex items-baseline justify-between gap-4">
                  <span className="label">{c.media}</span>
                  <span className="text-[12px] font-medium text-subtle">
                    {c.date}
                  </span>
                </div>
                <h3 className="mt-3 text-[17px] font-semibold leading-snug tracking-tight text-foreground">
                  {c.title}
                </h3>
                <p className="mt-4 flex-1 font-sans text-xs leading-relaxed text-muted">
                  {c.summary}
                </p>
                <span className="mt-6 font-sans text-[13px] font-medium text-foreground">
                  阅读原文 →
                </span>
              </a>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
