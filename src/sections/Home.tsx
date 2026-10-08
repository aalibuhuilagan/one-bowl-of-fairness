import { ArrowRight, Bot, ImageDown, MessageSquareQuote, UtensilsCrossed } from "lucide-react";
import { Link } from "@/lib/router";
import { Callout, Chapter, DialectCard, Label, PhotoCard, SectionTitle } from "@/components/brand";
import { CHRONICLE, COVERAGE, DIALECT, HOT, INGREDIENTS } from "@/data/content";
import {
  CRUST_SHOTS,
  DIP_SHOTS,
  HERO_SHOTS,
  LIVE_SHOTS,
  PLATING_SHOTS,
  STORY_SHOTS,
  photo,
} from "@/lib/photos";

/* ═══════════════ Hero · 白底大字 + 全幅主图 ═══════════════ */

function Hero() {
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-shell px-6 pt-20 text-center md:px-8 md:pt-28">
        <Label tone="line">人工智能 + 数字文娱 · 2026 海南省运会 · 琼海</Label>

        <h1 className="mx-auto mt-8 max-w-3xl text-[clamp(2.2rem,5.4vw,4rem)] font-semibold leading-[1.12] tracking-[-0.03em] text-foreground">
          台风再大，
          <br />
          大不过一锅公道。
        </h1>

        <p className="mx-auto mt-7 max-w-2xl text-[17px] leading-[1.75] text-muted">
          上世纪中期，琼海乡村八九户人家凑钱合买一只鸭，推举最公正的人掌刀分肉——连拇指大的鸡心也要等分。海南人把这叫“做公道”。
          今天，我们把灶火搬到网上：
          <span className="font-medium text-foreground">AI 当公道头，你来凑份子。</span>
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <Link to="ju" className="btn-primary group">
            开一场公道局
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
          <Link to="story" className="btn-secondary group">
            先听阿公讲这段旧事
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>

      {/* 主图：真实实拍（照片就是主角） */}
      <div className="mx-auto max-w-shell px-6 pb-16 pt-14 md:px-8 md:pb-24 md:pt-16">
        <figure className="group overflow-hidden rounded-3xl bg-surface shadow-lg">
          <div className="relative overflow-hidden">
            <img
              src={photo(HERO_SHOTS[0].dir, HERO_SHOTS[0].file)}
              alt="白斩嘉积鸭斩件后分成四盆"
              className="aspect-[16/10] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04] sm:aspect-[21/9]"
            />
          </div>
          <figcaption className="bg-background px-6 py-4 text-[13px] leading-relaxed text-subtle">
            {HERO_SHOTS[0].caption}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

/* ═══════════════ 顶部快讯条 ═══════════════ */

function HotStrip() {
  return (
    <section className="bg-surface">
      <div className="mx-auto flex max-w-shell flex-wrap items-center gap-x-5 gap-y-2 px-6 py-4 md:px-8">
        <Label tone="line" className="bg-background">
          {HOT.label}
        </Label>
        <span className="text-[13px] leading-relaxed text-muted">{HOT.text}</span>
        <Link
          to="story"
          anchor="chronicle"
          className="group inline-flex items-center gap-1.5 text-[13px] font-medium text-accent transition-colors duration-200 hover:text-accent-dark"
        >
          {HOT.action}
          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  );
}

/* ═══════════════ 什么是公道饭 ═══════════════ */

function WhatIsFairness() {
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-shell px-6 section md:px-8">
        <SectionTitle
          index="01"
          kick="什么是公道饭"
          title="在海南琼海，“公道”两个字，是可以吃的"
          desc={
            <>
              <p className="indent">
                物质匮乏的年代，村里八九户人家凑钱合买“三鸟”——鸡、鸭、鹅。谁去收钱、谁去买、谁来煮、怎么分？全村推举一位最公正、最有威望的人当
                <span className="font-medium text-foreground">“公道头”</span>，由他一手包办。
              </p>
              <p className="indent mt-4">
                规矩只有一条，却最硬：
                <span className="font-medium text-foreground">做的不取，取的不做</span>
                。掌刀的人自己不挑，把公平交给全村人的眼睛。分到最后一个部位，也要看齐——连拇指大的鸡心，都要切开等分。
              </p>
            </>
          }
        />

        <div className="mt-16 grid gap-10 md:grid-cols-2 md:gap-12">
          <div className="space-y-3">
            {[
              { k: "三鸟", v: "鸡 · 鸭 · 鹅", d: "合买的食材" },
              { k: "公道头", v: "全村推举", d: "掌刀主持的人" },
              { k: "杯贡", v: "鸭汤饭团", d: "围成一圈分" },
            ].map((i) => (
              <div
                key={i.k}
                className="flex items-center justify-between gap-6 rounded-2xl border border-border bg-background px-6 py-5 shadow-sm"
              >
                <span className="text-2xl font-semibold tracking-tight text-foreground">{i.v}</span>
                <span className="text-right">
                  <span className="block text-[13px] leading-relaxed text-muted">{i.d}</span>
                  <span className="mt-0.5 block text-[12px] text-subtle">琼海话 · {i.k}</span>
                </span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4 md:gap-5">
            {HERO_SHOTS.slice(1)
              .concat(PLATING_SHOTS[0])
              .slice(0, 4)
              .map((s) => (
                <PhotoCard
                  key={s.id}
                  src={photo(s.dir, s.file)}
                  title={s.title}
                  caption={s.caption}
                  ratio="3/4"
                />
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════ 一碗公道饭的诞生（长卷素材叙事） ═══════════ */

function CraftJourney() {
  const chapters = [
    {
      no: "壹",
      kicker: "第一章 · 选鸟",
      title: "今晚做哪只？",
      img: photo(LIVE_SHOTS[0].dir, LIVE_SHOTS[0].file),
      alt: LIVE_SHOTS[0].title,
      motif: "文昌鸡 · 活体 · 橙红羽毛，身圆脚矮",
      body: "做公道从挑鸟开始。文昌鸡、嘉积鸭、温泉鹅——海南人管这三样叫“三鸟”，每一样都是名菜级的食材。谁家出鸡、谁家出鸭，凑在一处，才凑得成一桌公道。",
      quote: "“鸡、鸭、鹅，合起来才叫三鸟。”",
    },
    {
      no: "贰",
      kicker: "第二章 · 开斩",
      title: "做的不取，取的不做",
      img: photo(STORY_SHOTS.choppingDuck.dir, STORY_SHOTS.choppingDuck.file),
      alt: "白斩嘉积鸭斩件",
      motif: "白斩嘉积鸭 · 斩件",
      body: "白斩，是海南人对好食材最大的尊重——不放重料，只靠火候与刀工。刀落在砧板上的第一下，就是公道的开始：掌刀的人只负责分，不挑好的留给自己。",
      quote: "“掌刀的人自己不能挑，公平交给全村人的眼睛。”",
    },
    {
      no: "叁",
      kicker: "第三章 · 分饭",
      title: "杯贡，围成一圈",
      img: photo(HERO_SHOTS[2].dir, HERO_SHOTS[2].file),
      alt: "杯贡饭团围边",
      motif: "杯贡 · 鸭汤煮饭捏成球形",
      body: "鸭汤煮饭，捏成球形，琼海话叫“杯贡”。一个饭团一份，沿着芭蕉叶围成一圈——圈里的每一个位置都一样大，这就是“人人有份”最朴素的样子。",
      quote: "“一个饭团一份，围成一圈，不多不少。”",
    },
    {
      no: "肆",
      kicker: "第四章 · 蘸料",
      title: "一人一碗 shou",
      img: photo(DIP_SHOTS[1].dir, DIP_SHOTS[1].file),
      alt: "白斩鸭配四碗蘸料",
      motif: "蘸料 · 琼海话读作 shou",
      body: "蒜蓉、辣椒、青桔，各有配比。蘸料先在大锅里调好，再一勺一勺分进小碗——和分肉是同一个逻辑：从大锅到小碗，每一碗的量都一样。",
      quote: "“从大锅里分碗，谁也不多一勺。”",
    },
    {
      no: "伍",
      kicker: "第五章 · 摆盘",
      title: "芭蕉叶上的团圆",
      img: photo(PLATING_SHOTS[0].dir, PLATING_SHOTS[0].file),
      alt: "芭蕉叶摆盘",
      motif: "芭蕉叶摆盘 · 斩件居中、饭团围边",
      body: "芭蕉叶打底，斩件肉居中，饭团围边，蘸料在旁。没有转盘、没有公筷，所有人伸手够得到同一片叶子——这是公道饭最经典的画面。",
      quote: "“一片叶子上的，是全村人的那份。”",
    },
    {
      no: "陆",
      kicker: "第六章 · 彩蛋",
      title: "杯匹：一锅只出一片",
      img: photo(CRUST_SHOTS[0].dir, CRUST_SHOTS[0].file),
      alt: "锅巴",
      motif: "杯匹 · 锅底结出的饭焦",
      body: "鸭汤饭在锅底结出一层饭焦，琼海话叫“杯匹”，浇猪油、撒盐，起锅即食。每锅只出得了一片，吃过的人才懂——这也暗合了公道的另一面：人人有份，但每份都不多。",
      quote: "“一锅只出一片，所以更珍贵。”",
    },
  ];

  return (
    <section className="bg-surface">
      <div className="mx-auto max-w-shell px-6 section md:px-8">
        <SectionTitle
          index="02"
          kick="一碗公道饭的诞生"
          title="从挑一只鸟，到最后一片锅巴"
          desc="下面是六个真实场景，按做一场公道饭的顺序排开。照片全部来自参赛者本人在琼海的实拍，不是图库，也不是 AI 生成的画面。"
        />

        <div className="mt-16 space-y-16 md:space-y-24">
          {chapters.map((c, i) => (
            <Chapter
              key={c.no}
              no={c.no}
              image={c.img}
              alt={c.alt}
              motif={c.motif}
              kicker={c.kicker}
              title={c.title}
              quote={c.quote}
              flip={i % 2 === 1}
            >
              {c.body}
            </Chapter>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════ 三大模块 ═══════════════ */

function ModulesSection() {
  const items = [
    {
      to: "ju" as const,
      kick: "社交裂变引擎",
      title: "AI 公道局",
      desc: "选三鸟、定做法、凑份子，AI 公道头主持全程。开斩与分餐做成仪式感交互，最后人人领一张「公道签」。",
      bullets: ["三鸟名菜级选材 + 白斩 / 烤制两条风味线", "AI 公道头实时对话，带老规矩与方言语气", "公道签：你分到的部位 + 趣味解读"],
    },
    {
      to: "story" as const,
      kick: "文化深度担当",
      title: "AI 故事馆",
      desc: "从凑份合买到省运会破圈，时间轴上一页页看；AI 只讲有出处的旧事，方言词条轻量点缀。",
      bullets: ["百年编年史 · 全部标注考据来源", "AI 问答严格限定在资料范围内，不编造", "琼海方言词条卡：杯贡 / 杯匹 / shou"],
    },
    {
      to: "create" as const,
      kick: "内容共创与传播",
      title: "AI 创作坊",
      desc: "选主题、选照片，一键生成朋友圈与小红书尺寸海报，附 AI 文案；还有“琼海话彩蛋版”。",
      bullets: ["真实照片 + AI 文案，输出成品 PNG", "五大主题：台风夜的暖 / 乡愁 / 公道精神…", "文案可复制，直接发社交平台"],
    },
  ];

  return (
    <section className="bg-background">
      <div className="mx-auto max-w-shell px-6 section md:px-8">
        <SectionTitle
          index="03"
          kick="三大模块"
          title="一场公道，从线上到线下都能玩"
          desc="每个模块都由 AI 驱动，且都可在断网状态下降级演示——路演现场不怕网。"
        />
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {items.map((m) => (
            <Link key={m.to} to={m.to} className="group card flex flex-col">
              <span className="label text-accent">{m.kick}</span>
              <h3 className="mt-3 text-[26px] font-semibold leading-tight tracking-tight text-foreground">
                {m.title}
              </h3>
              <p className="mt-3 flex-1 text-[14px] leading-[1.75] text-muted">{m.desc}</p>
              <ul className="mt-6 space-y-2 border-t border-border pt-5">
                {m.bullets.map((b) => (
                  <li key={b} className="flex gap-2.5 text-[13px] leading-relaxed text-muted">
                    <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    {b}
                  </li>
                ))}
              </ul>
              <span className="mt-6 inline-flex items-center gap-1.5 text-[14px] font-medium text-accent">
                进入模块
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════ AI 加在哪（深色反差段） ═══════════════ */

function AiEmpowerSection() {
  const cards = [
    {
      icon: Bot,
      title: "AI 生成式主持",
      desc: "公道头不是写死的文案，而是由大模型驱动的角色：读得懂你选的三鸟与做法，说得出老规矩，也能即兴回答“为什么要等分”。",
      tech: "LLM 角色扮演 + 考据语料约束（RAG）",
    },
    {
      icon: UtensilsCrossed,
      title: "AI 互动叙事 / 游戏化",
      desc: "分餐不是点一下按钮，而是有分量、有先后、有“谁多了一勺”的交互；台风夜的故事还能选分支、走向隐藏结局。",
      tech: "状态机 + 交互编排 + 分支叙事",
    },
    {
      icon: ImageDown,
      title: "AI 内容创作",
      desc: "用你自己的实拍照片，配上 AI 生成的文案与版式，一键出海报、出短视频脚本，让每个食客都成为海南美食的传播者。",
      tech: "文案生成 + Canvas 排版渲染",
    },
    {
      icon: MessageSquareQuote,
      title: "AI 知识问答 + 可信内容索引",
      desc: "把官方报道、方志、非遗信息整理成可查证的索引，AI 只在有出处的范围内作答——文化传播最怕失真。",
      tech: "考据语料库 + 引用溯源",
    },
  ];

  return (
    <section className="bg-foreground text-background">
      <div className="mx-auto max-w-shell px-6 section md:px-8">
        <SectionTitle
          index="04"
          kick="关于“人工智能 +”"
          invert
          title="AI 加在哪？加在“做公道”的每一步上"
          desc={
            <p>
              我们不做“AI 换脸的探店推荐”。这个项目的立足点是：
              <span className="font-medium text-background">文化是根，AI 是新的灶火</span>
              ——先把公道文化讲准、讲透，再用 AI 把它变成能玩、能创、能分享的数字体验。
            </p>
          }
        />

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {cards.map((c) => {
            const Icon = c.icon;
            return (
              <div
                key={c.title}
                className="rounded-2xl border border-background/12 bg-background/[0.06] p-6 transition-colors duration-300 hover:bg-background/[0.1]"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-background/10">
                    <Icon className="h-4.5 w-4.5 text-background/80" />
                  </span>
                  <h3 className="text-[19px] font-semibold tracking-tight text-background">
                    {c.title}
                  </h3>
                </div>
                <p className="mt-4 text-[14px] leading-[1.75] text-background/65">{c.desc}</p>
                <p className="mt-3 text-[12px] font-medium text-background/45">{c.tech}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-14 rounded-3xl border border-background/12 p-8 md:p-10">
          <h3 className="text-[22px] font-semibold tracking-tight text-background md:text-[26px]">
            为什么不会“跑偏成餐饮项目”
          </h3>
          <ul className="mt-7 grid gap-x-10 gap-y-3 md:grid-cols-2">
            {[
              "全程不出现“开店 / 卖饭 / 送餐”，产品形态是 Web 数字文娱应用",
              "三大模块全部 AI 驱动，且现场可实时生成内容",
              "文化考据全部可溯源，AI 不做无出处的发挥",
              "收入模型为文旅导流、文创电商、ToG 文旅宣传合作与 IP 授权",
            ].map((t, i) => (
              <li key={t} className="flex gap-3.5">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-background/12 text-[11px] font-semibold text-background/70">
                  {i + 1}
                </span>
                <span className="text-[14px] leading-[1.7] text-background/75">{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════ 三鸟食材 ═══════════════ */

function IngredientStrip() {
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-shell px-6 section md:px-8">
        <SectionTitle
          index="05"
          kick="三鸟"
          title="琼海人做公道，连食材都是名菜级的"
          desc="文昌鸡、嘉积鸭、温泉鹅——组局时三选一或三选多，每一样都可再选白斩或烤制。"
        />

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {INGREDIENTS.map((i) => (
            <Link key={i.id} to="ju" anchor="step1" className="group card block overflow-hidden !p-0">
              <div className="relative overflow-hidden">
                <img
                  src={photo(i.cover.dir, i.cover.file)}
                  alt={i.name}
                  loading="lazy"
                  className="aspect-[4/3] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
              </div>
              <div className="p-6">
                <h3 className="text-[20px] font-semibold tracking-tight text-foreground">
                  {i.name}
                </h3>
                <p className="mt-1.5 text-[12px] text-subtle">{i.badge}</p>
                <p className="mt-3 line-clamp-3 text-[13px] leading-relaxed text-muted">
                  {i.story}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link to="ju" anchor="step1" className="btn-ghost group">
            去 AI 公道局选食材
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════ 真实第一准则 · 照片墙 ═══════════════ */

function PhotoWallSection() {
  const shots = [...PLATING_SHOTS, ...DIP_SHOTS.slice(0, 2)];
  return (
    <section className="bg-surface">
      <div className="mx-auto max-w-shell px-6 section md:px-8">
        <SectionTitle
          index="06"
          kick="真实第一准则"
          title="这一页的照片，全部是本人实拍"
          desc="不用图库、不做摆拍替代。芭蕉叶、竹簸箕、蓝边粗瓷碗、砧板上的刀痕、一人一碗的蘸料——真实的市井细节，比任何精致美食图都更能说明“公道饭”是什么。"
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {shots.map((s) => (
            <PhotoCard key={s.id} src={photo(s.dir, s.file)} caption={s.caption} ratio="4/3" />
          ))}
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          <Callout title="关于方言：撒葱花，不当主菜">
            作品正文一律普通话，方言只做点缀：词条小卡、公道头台词里的一两个语气词。所有方言词都由参赛者（琼海本地人）校对后才会出现，AI
            不编造读音与词条。
          </Callout>
          <div className="grid gap-4 sm:grid-cols-2">
            {DIALECT.filter((d) => d.verified)
              .slice(0, 2)
              .map((d) => (
                <DialectCard key={d.word} entry={d} />
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════ 时间线 ═══════════════ */

function TimelineTeaser() {
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-shell px-6 section md:px-8">
        <SectionTitle
          index="07"
          kick="时间线"
          title="从凑份合买，到省运会破圈"
          desc="每一段都标注了考据来源，可逐条核验。"
        />

        <ol className="mt-14 grid gap-6 md:grid-cols-4">
          {CHRONICLE.slice(0, 4).map((c, i) => (
            <li key={c.title} className="rounded-2xl border border-border bg-background p-6 shadow-sm">
              <span className="text-[13px] font-medium text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="mt-2 text-[13px] text-subtle">{c.year}</div>
              <div className="mt-2 text-[17px] font-semibold leading-snug tracking-tight text-foreground">
                {c.title}
              </div>
              <p className="mt-2.5 line-clamp-3 text-[13px] leading-relaxed text-muted">{c.body}</p>
            </li>
          ))}
        </ol>

        <div className="mt-10 text-center">
          <Link to="story" anchor="chronicle" className="btn-secondary group">
            看完整编年史
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════ IP 矩阵 ═══════════════ */

function IpMatrixTeaser() {
  const items = [
    {
      name: "琼海公道饭",
      state: "首发 IP",
      desc: "凑份合买、均分而食的乡土共食习俗，海南省运会宣传片破圈的文化原型。",
      img: photo(STORY_SHOTS.gooseSauce.dir, STORY_SHOTS.gooseSauce.file),
      active: true,
    },
    {
      name: "澄迈福山咖啡",
      state: "第二站",
      desc: "1933 年华侨陈显彰自苏门答腊带回罗布斯塔种；焙炒技艺为省级非遗，风情镇是全国首个咖啡主题 4A 景区。",
      img: "",
      active: false,
    },
    {
      name: "澄迈瑞溪三宝",
      state: "第三站",
      desc: "牛肉干、瑞溪粽、腊肠；由墟市“隔夜牛肉不能再卖”的诚信规矩催生，200 多年历史。",
      img: "",
      active: false,
    },
  ];
  return (
    <section className="bg-surface">
      <div className="mx-auto max-w-shell px-6 section md:px-8">
        <SectionTitle
          index="08"
          kick="IP 矩阵 · 可复制性"
          title="公道饭是第一站，海南的味道还有很多站"
          desc={
            <p>
              同一套 AI 引擎与玩法框架，可以复用到全岛不同的美食 IP。公道饭验证「文化考据 → AI 玩法 → 内容共创 →
              文旅转化」的完整链路，第二站衔接大赛主办地澄迈：
              <span className="font-medium text-foreground">一只鸭、一粒豆、一片肉，都是漂洋过海的海南味。</span>
            </p>
          }
        />
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {items.map((it) => (
            <div key={it.name} className="group card flex flex-col overflow-hidden !p-0">
              <div className="relative overflow-hidden">
                {it.img ? (
                  <img
                    src={it.img}
                    alt={it.name}
                    loading="lazy"
                    className="aspect-[4/3] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                ) : (
                  <div className="flex aspect-[4/3] items-center justify-center bg-surface px-6">
                    <span className="text-center text-[13px] leading-relaxed text-subtle">
                      素材待补（决赛前提交）
                      <br />
                      不使用非授权图片
                    </span>
                  </div>
                )}
              </div>
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-[20px] font-semibold tracking-tight text-foreground">
                    {it.name}
                  </h3>
                  <Label tone={it.active ? "line" : "plain"} className="shrink-0 text-[12px]">
                    {it.state}
                  </Label>
                </div>
                <p className="mt-3 text-[13px] leading-relaxed text-muted">{it.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════ 可查证的出处 ═══════════════ */

function TrustSection() {
  const c = COVERAGE.filter((x) => x.group === "公道饭").slice(0, 3);
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-shell px-6 section md:px-8">
        <SectionTitle
          index="09"
          kick="可查证的出处"
          title="讲文化，先把出处摆出来"
          desc="本站涉及历史、习俗、食材的陈述，均来自省级文旅部门、政府门户、央媒与史志网的公开报道。完整报道索引与采访专区见「影像志」，欢迎评委逐条核验。"
        />
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {c.map((x) => (
            <a
              key={x.url}
              href={x.url}
              target="_blank"
              rel="noreferrer noopener"
              className="group card flex flex-col"
            >
              <span className="label text-accent">{x.media}</span>
              <span className="mt-3 text-[17px] font-semibold leading-snug tracking-tight text-foreground">
                {x.title}
              </span>
              <span className="mt-3 flex-1 text-[13px] leading-relaxed text-muted">
                {x.summary}
              </span>
              <span className="mt-5 inline-flex items-center gap-1.5 text-[14px] font-medium text-accent">
                查看原文
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
              </span>
            </a>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link to="archive" className="btn-secondary group">
            进入影像志 · 全部报道与采访索引
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export function Home() {
  return (
    <>
      <Hero />
      <HotStrip />
      <WhatIsFairness />
      <CraftJourney />
      <ModulesSection />
      <AiEmpowerSection />
      <IngredientStrip />
      <PhotoWallSection />
      <TimelineTeaser />
      <IpMatrixTeaser />
      <TrustSection />
    </>
  );
}
