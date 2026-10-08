import { Coffee, Sparkles } from "lucide-react";
import { Callout, Label } from "@/components/brand";
import { Link } from "@/lib/router";
import { photo } from "@/lib/photos";

const STATIONS = [
  {
    name: "琼海公道饭",
    state: "首发 IP · 已上线",
    place: "琼海",
    active: true,
    img: photo("gooseBoiled", "S01c1-09_温泉鹅_白斩_簸箕装盘配三碗蘸料.jpg"),
    points: [
      "三鸟为料：文昌鸡、嘉积鸭、温泉鹅，均为名菜级食材",
      "规矩为魂：做的不取，取的不做；人人均等",
      "场景为媒：台风天、农闲时，乡邻围坐一锅",
      "本期交付：AI 公道局 / AI 故事馆 / AI 创作坊 三模块",
    ],
  },
  {
    name: "澄迈福山咖啡",
    state: "第二站 · 决赛前",
    place: "澄迈",
    active: false,
    img: "",
    points: [
      "1933 年（一说 1935）印尼华侨陈显彰自苏门答腊带回罗布斯塔咖啡种，在福山火山岩富硒红壤试种成功，被称“海南咖啡第一人”",
      "“福山咖啡焙炒技艺”2017 年列入海南省级非物质文化遗产（炭火直火烘焙 + 手工炒糖）",
      "国家地理标志保护产品（2010）；福山咖啡文化风情镇 2025 年获评国家 4A 级景区，为全国首个咖啡主题 4A 景区",
      "叙事连接：与公道饭同属“下南洋”物产线索——一只鸭、一粒豆，都是漂洋过海的侨乡味道",
    ],
  },
  {
    name: "澄迈瑞溪三宝",
    state: "第三站 · 赛后",
    place: "澄迈",
    active: false,
    img: "",
    points: [
      "瑞溪墟始建于清康熙二年（1663 年）；清乾隆年间设耕牛屠宰场，当天卖不完的牛肉不能隔夜再卖，遂催生干制工艺",
      "牛肉干切片呈“Z”字型，以姜汁、胡椒粉、汾酒、白砂糖等腌浸，晾干后花生油煎炸，称“靓纱”，已有 200 多年历史",
      "三宝：牛肉干、瑞溪粽（猛火煮 8–10 小时）、腊肠，均百年传承",
      "精神连接：墟市“让廊护货、代管过夜”的诚信规矩，与公道饭的公平精神一脉相承",
    ],
  },
];

const MASCOT_POSES = [
  { file: "A03-01_公道仔_姿态_分饭.png", name: "分饭", note: "大木勺均分，人人有份" },
  { file: "A03-02_公道仔_姿态_举勺敲锤.png", name: "举勺敲锤", note: "一锤定音，公道判案" },
  { file: "A03-03_公道仔_姿态_抱簸箕.png", name: "抱簸箕", note: "满簸箕杯贡，丰收喜悦" },
  { file: "A03-04_公道仔_姿态_点赞.png", name: "点赞", note: "为公道竖个大拇指" },
  { file: "A03-05_公道仔_姿态_台风扶斗笠.png", name: "台风扶斗笠", note: "台风再大，大不过一锅公道" },
  { file: "A03-06_公道仔_姿态_欢迎挥手.png", name: "欢迎挥手", note: "欢迎来吃公道饭" },
];

export function Ip() {
  return (
    <div className="bg-background pb-24">
      <section className="mx-auto max-w-shell px-6 pb-16 pt-16 md:px-8 md:pb-24 md:pt-24">
        <Label>可复制性</Label>
        <h1 className="mt-8 font-sans text-5xl leading-[0.95] tracking-tight text-foreground sm:text-6xl md:text-7xl">
          IP 矩阵
        </h1>
        <div className="mt-10 grid gap-8 md:grid-cols-12 md:gap-12">
          <p className="max-w-md font-sans text-sm leading-relaxed text-muted md:col-span-5 md:text-base">
            「一碗公道饭」不是单一美食的展示网站，而是
            <span className="font-sans text-foreground">海南美食文化 IP 的 AI 孵化器</span>
            ：公道饭验证「文化考据 → AI 玩法 → 内容共创 → 文旅转化」的完整链路，第二、第三站直接落在赛事主办地澄迈。
          </p>
          <p className="font-sans text-xl italic leading-relaxed text-muted md:col-span-4 md:col-start-9 md:text-2xl">
            One dish, one method.
            <br />
            先做透一站，再复制到全岛。
          </p>
        </div>
      </section>

      {/* ── 形象大使「公道仔」（AI 创作） ─────────────────── */}
      <section className="mx-auto max-w-shell border-t border-border px-6 pb-16 pt-16 md:px-8 md:pb-24 md:pt-20">
        <div className="grid gap-10 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-4">
            <figure className="overflow-hidden rounded-2xl border border-border bg-surface/60 shadow-sm">
              <img
                src={photo("ipMascot", "A01-08_公道仔_立绘_定稿.png")}
                alt="公道仔立绘：嘉积鸭原型，头戴斗笠、身穿长袍、手捧杯贡"
                className="aspect-[2/3] w-full object-cover"
              />
            </figure>
            <div className="mt-4 flex items-center gap-3">
              <img
                src={photo("ipMascot", "A02-01_公道仔_头像.png")}
                alt="公道仔头像"
                className="h-12 w-12 rounded-full border border-border object-cover"
              />
              <div>
                <p className="font-sans text-sm font-semibold text-foreground">公道仔</p>
                <p className="font-sans text-[12px] text-subtle">首发 IP 形象大使 · AI 创作</p>
              </div>
            </div>
          </div>

          <div className="md:col-span-8">
            <Label tone="line">形象大使</Label>
            <h2 className="mt-6 font-sans text-4xl leading-tight tracking-tight text-foreground md:text-5xl">
              公道仔
            </h2>
            <p className="mt-6 max-w-xl font-sans text-sm leading-relaxed text-muted md:text-base">
              以公道饭的签名食材——嘉积鸭（番鸭）为原型：眼周红色肉瘤是它天生的「红脸」，
              头戴海南渔家斗笠，身穿判官长袍，胸前一枚芭蕉叶徽章，双手捧着一颗杯贡。
              它不法官威压，只认真分饭——把「公平公正」从一句口号，变成一个可以打招呼的朋友。
            </p>
            <ul className="mt-8 grid gap-x-8 sm:grid-cols-2">
              {[
                "原型：嘉积鸭（番鸭），公道饭三鸟中的签名鸟",
                "记忆点：天生红脸 + 渔家斗笠，一眼认得",
                "身份：判官长袍，守护「人人均等」的老规矩",
                "道具：手捧杯贡，走到哪分到哪",
              ].map((t) => (
                <li key={t} className="flex gap-4 border-t border-border py-3 font-sans text-sm leading-relaxed text-muted">
                  <span className="mt-2.5 h-px w-4 shrink-0 bg-foreground/40" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6">
          {MASCOT_POSES.map((p) => (
            <figure key={p.file} className="group overflow-hidden rounded-2xl border border-border bg-surface/60">
              <img
                src={photo("ipMascot", p.file)}
                alt={"公道仔姿态：" + p.name}
                className="aspect-[2/3] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              />
              <figcaption className="flex items-baseline justify-between gap-3 px-4 py-3">
                <span className="font-sans text-[13px] font-medium text-foreground">{p.name}</span>
                <span className="font-sans text-[12px] text-subtle">{p.note}</span>
              </figcaption>
            </figure>
          ))}
        </div>
        <p className="mt-6 font-sans text-[12px] text-subtle">
          以上形象均为 AI 生成（本站 AI 创作内容均已标注），原型特征参考参赛者本人实拍的嘉积鸭照片。
        </p>
      </section>

      <div className="mx-auto max-w-shell px-6 md:px-8">
        <div>
          {STATIONS.map((s, i) => (
            <section
              key={s.name}
              className="group grid gap-8 border-t border-border py-12 transition-colors duration-200 hover:border-border md:grid-cols-12 md:gap-12 md:py-16"
            >
              <div className="md:col-span-1">
                <span className="label">{String(i + 1).padStart(2, "0")}</span>
              </div>

              <div className="md:col-span-4">
                {s.img ? (
                  <figure className="overflow-hidden rounded-2xl border border-border shadow-sm">
                    <img
                      src={s.img}
                      alt={s.name}
                      className="aspect-[4/3] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    />
                  </figure>
                ) : (
                  <div className="flex aspect-[4/3] items-center justify-center rounded-2xl border border-dashed border-border bg-surface/60 px-6">
                    <div className="text-center">
                      <Coffee className="mx-auto h-6 w-6 text-subtle" />
                      <p className="mt-3 text-[13px] leading-relaxed text-subtle">
                        素材待补（决赛前提交）
                        <br />
                        不使用非授权图片，宁缺不假
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div className="md:col-span-7">
                <div className="flex flex-wrap items-baseline gap-x-5 gap-y-2">
                  <h2 className="font-sans text-3xl leading-tight tracking-tight text-foreground md:text-4xl">
                    {s.name}
                  </h2>
                  <Label tone="line">{s.state}</Label>
                  <Label>{s.place}</Label>
                </div>

                <ul className="mt-8">
                  {s.points.map((p) => (
                    <li
                      key={p}
                      className="flex gap-4 border-t border-border py-3 font-sans text-sm leading-relaxed text-muted"
                    >
                      <span className="mt-2.5 h-px w-4 shrink-0 bg-foreground/40" />
                      {p}
                    </li>
                  ))}
                </ul>

                {s.active && (
                  <Link
                    to="ju"
                    className="hover-underline group/link mt-8 inline-flex items-center gap-2 font-sans text-[13px] font-medium text-foreground"
                  >
                    去玩首发 IP 的 AI 公道局
                    <span className="transition-transform duration-200 group-hover/link:translate-x-2">→</span>
                  </Link>
                )}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-16">
          <Callout
            title="落地逻辑（回应“大赛落地澄迈”的要求）"
            tone="invert"
            icon={<Sparkles className="h-4 w-4 text-background" />}
          >
            赛道与扶持指向澄迈，而公道饭在琼海——这不是冲突，而是矩阵的第一站。
            计划书中明确：以公道饭为样板验证方法论，第二站直接接澄迈福山咖啡（4A 景区场景，天然适合 AR / AI 导览与数字纪念品），
            第三站接瑞溪三宝（墟市诚信文化与公道精神同源）。方法论可复制到全岛 18 个市县。
          </Callout>
        </div>
      </div>
    </div>
  );
}
