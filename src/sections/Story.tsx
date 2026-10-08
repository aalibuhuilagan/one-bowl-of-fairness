import { BookOpenCheck, Footprints, Lock, Quote } from "lucide-react";
import { Callout, Chapter, DialectCard, Label, PhotoCard, SectionTitle } from "@/components/brand";
import { HeadChat } from "@/sections/Ju";
import { CHRONICLE, DIALECT } from "@/data/content";
import { photo } from "@/lib/photos";

const CN_NUM = ["壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖"];

/* ── 编年史（长卷章节：图文左右交替） ───────────────────── */

function Chronicle() {
  return (
    <section id="chronicle" className="bg-surface">
      <div className="mx-auto max-w-shell px-6 section md:px-8">
        <SectionTitle
          index="01"
          kick="编年史"
          title="从凑份合买，到省运会破圈"
          desc="每一段都标了出处；凡是查不到出处的，我们宁可不写。"
        />

        <div className="mt-16 space-y-16 md:space-y-24">
          {CHRONICLE.map((c, i) => {
            const body = <span className="indent">{c.body}</span>;
            if (!c.img) {
              return (
                <article key={c.title} className="mx-auto max-w-2xl text-center">
                  <div className="text-[13px] font-medium text-accent">{c.year}</div>
                  <h3 className="mt-2 text-[clamp(1.4rem,2.8vw,2rem)] font-semibold leading-[1.2] tracking-tight text-foreground">
                    {c.title}
                  </h3>
                  <p className="indent mt-4 text-[15px] leading-[1.85] text-muted">{c.body}</p>
                </article>
              );
            }
            return (
              <Chapter
                key={c.title}
                no={CN_NUM[i] ?? String(i + 1)}
                image={photo(c.img.dir, c.img.file)}
                alt={c.title}
                motif={c.img.caption}
                kicker={`${c.year}${c.tag ? ` · ${c.tag}` : ""}`}
                title={c.title}
                flip={i % 2 === 1}
              >
                {body}
              </Chapter>
            );
          })}
        </div>

        <div className="mt-16">
          <Callout title="考据来源（可逐条核验）" icon={<BookOpenCheck className="h-4 w-4" />}>
            本节内容取自：海南省旅游和文化广电体育厅《海南人独特的餐饮 AA 制：“公道饭”里的公道》、人民日报人民号、琼海市人民政府网《琼海公道文化馆》、
            中新网海南《“品尝一次，回味一年” 海南琼海这一碗公道饭》、海口市旅文局关于宣传片《公道本味 匠心省运》的通报、海南史志网《海南特色农产品选介·琼海篇》等。
            完整链接见「影像志」。
          </Callout>
        </div>
      </div>
    </section>
  );
}

/* ── 互动叙事预告（深色反差段） ─────────────────────────── */

function NarrativeTeaser() {
  const shots = [
    { dir: "crust" as const, file: "S05-04_锅巴_起锅前整片.jpg", cap: "“起锅”——隐藏结局的分岔点" },
    { dir: "gooseBoiled" as const, file: "S01c1-08_温泉鹅_白斩_吊鹅出锅.jpg", cap: "灶上的蒸汽，是那一晚的声音" },
    { dir: "duckBoiled" as const, file: "S01b1-04_嘉积鸭_白斩_出锅.jpg", cap: "整鸭出锅，等着开斩" },
    { dir: "plating" as const, file: "S04-02_芭蕉叶摆盘_竹篮取饭团.jpg", cap: "分饭团的手，一个一个来" },
  ];
  return (
    <section className="bg-foreground text-background">
      <div className="mx-auto max-w-shell px-6 section md:px-8">
        <div className="grid gap-12 md:grid-cols-2 md:gap-16">
          <div>
            <SectionTitle
              index="02"
              kick="互动叙事 · P1"
              invert
              align="left"
              title="《台风夜 · 做公道》"
              desc="文字冒险：台风夜，你被喊进屋里凑一份。要不要先去看灶火？汤滚了要不要催？分完肉，锅底那一片还没起……你的选择会决定今晚的结局。"
            />
            <ul className="mt-10 space-y-4">
              <li className="flex gap-3.5 rounded-2xl border border-background/12 bg-background/[0.06] p-5">
                <Footprints className="mt-0.5 h-4 w-4 shrink-0 text-background/60" />
                <span className="text-[14px] leading-relaxed text-background/75">
                  三条主线：帮厨、递碗、守灶——每条线对应一段真实的伙食记忆。
                </span>
              </li>
              <li className="flex gap-3.5 rounded-2xl border border-background/12 bg-background/[0.06] p-5">
                <Lock className="mt-0.5 h-4 w-4 shrink-0 text-background/60" />
                <span className="text-[14px] leading-relaxed text-background/75">
                  隐藏结局「杯匹」：只有守到起锅、并且没催过公道头的人，才吃得到这一片锅巴。
                </span>
              </li>
              <li className="flex gap-3.5 rounded-2xl border border-background/12 bg-background/[0.06] p-5">
                <Quote className="mt-0.5 h-4 w-4 shrink-0 text-background/60" />
                <span className="text-[14px] leading-relaxed text-background/75">
                  所有情境细节均来自真实习俗与实拍素材，不虚构“历史故事”。
                </span>
              </li>
            </ul>
            <p className="mt-8 text-[13px] leading-relaxed text-background/45">
              说明：互动叙事为决赛阶段（P1）交付内容，本次线上初赛以 AI 公道局、故事馆、创作坊为主线。
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 md:gap-5">
            {shots.map((s) => (
              <PhotoCard
                key={s.file}
                src={photo(s.dir, s.file)}
                caption={s.cap}
                ratio="3/4"
                invert
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── 方言词条墙 ───────────────────────────────────────── */

function DialectWall() {
  return (
    <section id="dialect" className="bg-background">
      <div className="mx-auto max-w-shell px-6 section md:px-8">
        <SectionTitle
          index="04"
          kick="方言词条"
          title="这些词，是这碗饭的“口音”"
          desc="原则：撒葱花，不当主菜。正文一律普通话，方言只做词条卡与公道头的语气点缀。所有词条均由琼海本地人校对，AI 不编造读音。"
        />
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {DIALECT.map((d) => (
            <DialectCard key={d.word} entry={d} />
          ))}
        </div>
        <p className="mx-auto mt-10 max-w-prose text-center text-[13px] leading-relaxed text-subtle">
          注音栏与词条例句由参赛者（琼海本地人）持续补充；未校对内容不会出现在作品中。
          我们保留“待补”状态，是为了不拿不准的东西去凑热闹。
        </p>
      </div>
    </section>
  );
}

/* ── 页面 ─────────────────────────────────────────────── */

export function Story() {
  return (
    <div>
      {/* 页头 */}
      <section className="mx-auto max-w-shell px-6 pb-14 pt-16 md:px-8 md:pb-20 md:pt-24">
        <div className="page-intro">
          <Label tone="line">模块二 · 文化深度担当</Label>
          <h1 className="mt-6 text-[clamp(2.4rem,6vw,4rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-foreground">
            AI 故事馆
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-[17px] leading-[1.75] text-muted">
            百年编年史、方言词条，以及一位能答话的“阿公”。AI
            只在有出处的范围内作答——讲文化，最怕失真。
          </p>
          <p className="mt-4 text-[15px] font-medium text-subtle">
            Every bowl has a source. 每一碗，都查得到出处。
          </p>
        </div>
      </section>

      <Chronicle />

      {/* AI 问答 */}
      <section className="bg-background">
        <div className="mx-auto max-w-shell px-6 section md:px-8">
          <div className="grid gap-12 md:grid-cols-2 md:gap-16">
            <div>
              <SectionTitle
                index="03"
                kick="AI 问答"
                align="left"
                title="问阿公：这碗饭到底凭什么“公道”？"
                desc="答案来自考据语料库，且每段都能在官方报道里找到出处。资料之外的问题，他会坦白说“不晓得”。"
              />
              <div className="mt-10 space-y-6">
                <Callout title="为什么不做“什么都能答”">
                  文化类内容一旦编造，就是硬伤。所以我们把语料限定在省级文旅部门、政府门户、央媒与史志网的可查证资料内，
                  并保留“不知道”的权利——这在答辩时反而是加分项。
                </Callout>
                <a href="#/archive" className="btn-ghost group">
                  去影像志核对出处 →
                </a>
              </div>
            </div>
            <div>
              <HeadChat />
            </div>
          </div>
        </div>
      </section>

      <NarrativeTeaser />
      <DialectWall />
    </div>
  );
}
