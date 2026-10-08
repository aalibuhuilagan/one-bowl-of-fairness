import { Camera, Cpu, FileCheck2, Layers, ShieldCheck, Target } from "lucide-react";
import { Callout, Label, SectionTitle } from "@/components/brand";
import { SCORES } from "@/data/content";

const FACTS = [
  { k: "赛事", v: "“澄迈杯”人工智能 + 创新创业大赛" },
  { k: "赛道", v: "人工智能 + 数字文娱（开放赛道）" },
  { k: "参赛形式", v: "个人参赛" },
  { k: "产品形态", v: "Web 应用（移动优先，路演现场投屏）" },
];

const STACK = [
  { layer: "前端", value: "React 19 + TypeScript（strict）+ Tailwind CSS + shadcn/ui + Lucide 图标" },
  { layer: "路由 / 构建", value: "自研零依赖 hash 路由 + Vite 生产构建（可静态托管，离线可演示）" },
  { layer: "AI 对话", value: "DeepSeek API 优先（Key 由使用者本机填入，不下发、不入库）；断网时走本地考据语料兜底" },
  { layer: "AI 图像 / 视觉", value: "按需接火山引擎等平台；海报为本地 Canvas 实时合成，零依赖" },
  { layer: "内容安全", value: "考据语料白名单 + 引用溯源 + AI 生成内容强制标注" },
  { layer: "部署", value: "静态站点发布，生成在线链接供评委扫码体验" },
];

const RISKS = [
  { r: "被质疑“AI 含量不足”", a: "三大模块全部 AI 驱动：角色扮演对话、内容生成、知识检索；海报为现场实时合成" },
  { r: "被质疑“这是餐饮项目”", a: "定位话术统一为“AI 共创平台”，全程不出现开店 / 卖饭表述，收入来自文旅导流、文创与 ToG 合作" },
  { r: "AI 生成内容失实", a: "语料限定在可查证资料内，AI 可回答“不知道”；所有生成内容标注 AI 创作" },
  { r: "素材不足或侵权", a: "照片全部为本人实拍；第三方媒体内容只做索引外链，不搬运、不二次剪辑" },
  { r: "路演现场断网 / 无 Key", a: "关键是全链路本地降级：预设台词库、本地语料问答、Canvas 本地渲染" },
  { r: "方言读错、用错", a: "方言词条由参赛者（琼海本地人）校对后才上线，AI 不编造读音与词条" },
];

export function About() {
  return (
    <div className="bg-background pb-24">
      <section className="mx-auto max-w-shell px-6 pb-16 pt-16 md:px-8 md:pb-24 md:pt-24">
        <Label>关于项目</Label>
        <h1 className="mt-8 font-sans text-5xl leading-[0.95] tracking-tight text-foreground sm:text-6xl md:text-7xl">
          一碗公道饭
        </h1>
        <div className="mt-10 grid gap-8 md:grid-cols-12 md:gap-12">
          <p className="max-w-md font-sans text-sm leading-relaxed text-muted md:col-span-5 md:text-base">
            在海南琼海，“公道”两个字是可以吃的。我们把它做成一个能被玩、被创作、被分享的数字文娱产品——
            文化是根，AI 是新的灶火。
          </p>
          <p className="font-sans text-xl italic leading-relaxed text-muted md:col-span-4 md:col-start-9 md:text-2xl">
            One Bowl of Fairness.
            <br />
            一碗饭里，分得清。
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-shell px-6 md:px-8">
        {/* 基本信息 */}
        <div className="grid gap-12 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-6">
            <div className="border-t border-border pt-8">
              <span className="label">项目档案</span>
            </div>
            <dl className="mt-8">
              {FACTS.map((f) => (
                <div key={f.k} className="grid gap-2 border-t border-border py-4 sm:grid-cols-3">
                  <dt className="font-sans text-[13px] font-medium text-subtle">
                    {f.k}
                  </dt>
                  <dd className="font-sans text-sm leading-relaxed text-foreground sm:col-span-2">
                    {f.v}
                  </dd>
                </div>
              ))}
            </dl>
            <div className="mt-8 border-t border-border pt-6">
              <div className="font-sans text-lg tracking-tight text-foreground">一句话定位</div>
              <p className="indent mt-4 max-w-prose font-sans text-sm leading-relaxed text-muted">
                以琼海“公道饭”为首发 IP 的海南美食文化 AI 共创平台——让每个人都能用 AI
                “做一场公道”，把海南的侨乡味道变成可玩、可创、可分享的数字文娱体验。
              </p>
            </div>
          </div>

          <div className="space-y-8 md:col-span-6">
            <Callout title="真实性三条硬规矩" icon={<ShieldCheck className="h-4 w-4" />}>
              <ul className="space-y-3">
                <li>① 不用非授权图片：站内美食照片全部为参赛者本人实拍；暂缺的素材宁可不放。</li>
                <li>② 不编造历史：所有文化陈述出自官方与央媒报道，逐条可核验。</li>
                <li>③ 不冒充真实：AI 生成内容全部标注，不生成“历史照片”充当史料。</li>
              </ul>
            </Callout>
            <Callout title="素材与考据" icon={<Camera className="h-4 w-4" />}>
              实拍素材 58 张，覆盖三鸟活体与成品（白斩 / 烤制）、杯贡饭团、蘸料、芭蕉叶摆盘与锅巴工艺；
              考据资料汇编与素材台账随项目留档，可按编号追溯每一张图与每一句话的来源。
            </Callout>
          </div>
        </div>

        {/* 技术方案 */}
        <section className="mt-24">
          <SectionTitle
            index="01"
            kick="技术方案"
            title="怎么把这个东西跑起来"
            desc="围绕一个目标做取舍：路演现场必须稳。"
          />
          <div className="mt-16">
            {STACK.map((s) => (
              <div key={s.layer} className="grid gap-2 border-t border-border py-4 sm:grid-cols-3">
                <div className="font-sans text-[13px] font-medium text-subtle">
                  {s.layer}
                </div>
                <div className="font-sans text-sm leading-relaxed text-muted sm:col-span-2">
                  {s.value}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap gap-4">
            <Label tone="line">
              <Cpu className="h-3.5 w-3.5" /> 本地降级策略：断网 / 无 Key 也能完整演示
            </Label>
            <Label tone="line">
              <Layers className="h-3.5 w-3.5" /> 版本分区留存：03-作品版本 / v0.x 可运行快照
            </Label>
          </div>
        </section>

        {/* 风险与对策 */}
        <section className="mt-24">
          <SectionTitle
            index="02"
            kick="风险与对策"
            title="评委可能会问的问题，我们先把答案写出来"
          />
          <div className="mt-16 grid gap-x-12 md:grid-cols-2">
            {RISKS.map((x) => (
              <div key={x.r} className="border-t border-border py-6">
                <div className="flex items-start gap-3">
                  <FileCheck2 className="mt-0.5 h-4 w-4 shrink-0 text-subtle" />
                  <div className="font-sans text-lg leading-snug tracking-tight text-foreground">
                    {x.r}
                  </div>
                </div>
                <p className="mt-4 max-w-prose font-sans text-sm leading-relaxed text-muted">
                  {x.a}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 自评 */}
        <section className="mt-24">
          <SectionTitle
            index="03"
            kick="自评"
            title="按决赛五个维度先给自己打一遍"
            desc="打分理由与丢分点都写在计划书里；这两项丢分，正是接下来两周要补的地方。"
          />
          <div className="mt-16 grid gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-5">
            {SCORES.map((s) => (
              <div key={s.dim} className="border-t border-border pt-6">
                <div className="label">{s.dim}</div>
                <div className="mt-5 font-sans text-4xl leading-none tracking-tight text-foreground">
                  {s.score}
                  <span className="font-sans text-sm tracking-normal text-subtle">
                    /{s.max}
                  </span>
                </div>
                <div className="mt-4 font-sans text-xs leading-relaxed text-subtle">
                  {s.note}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12 flex flex-wrap items-center justify-between gap-6 bg-foreground px-8 py-8 text-background">
            <div className="flex items-center gap-4">
              <Target className="h-4 w-4 text-background/60" />
              <span className="font-sans text-2xl tracking-tight">
                当前自评合计 {SCORES.reduce((a, b) => a + b.score, 0)} / 100
              </span>
            </div>
            <span className="font-sans text-[13px] font-medium text-background/50">
              补强项：用户增长数据支撑、冷启动成本模型
            </span>
          </div>
        </section>

        {/* 联系方式 */}
        <section className="mt-24">
          <div className="border-t border-border pt-8">
            <span className="label">合作与联系</span>
            <p className="mt-8 max-w-prose font-sans text-sm leading-relaxed text-muted">
              欢迎文旅机构、景区、非遗保护单位、餐饮与文创品牌洽谈合作；也欢迎媒体引用本站的实拍素材（请注明出处）。
              联系方式将在报名材料中一并提交。
            </p>
            <div className="mt-10 grid gap-6 sm:grid-cols-3">
              <div className="border-t border-border pt-4">
                <div className="label">项目名</div>
                <div className="mt-2 font-sans text-lg tracking-tight text-foreground">一碗公道饭</div>
              </div>
              <div className="border-t border-border pt-4">
                <div className="label">赛道</div>
                <div className="mt-2 font-sans text-lg tracking-tight text-foreground">
                  人工智能 + 数字文娱
                </div>
              </div>
              <div className="border-t border-border pt-4">
                <div className="label">首发 IP</div>
                <div className="mt-2 font-sans text-lg tracking-tight text-foreground">琼海公道饭</div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
