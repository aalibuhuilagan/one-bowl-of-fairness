import { useState } from "react";
import { Check, Copy, Download, ImageIcon, RefreshCw, Wand2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Callout, Label, SectionTitle } from "@/components/brand";
import { downloadDataUrl, renderPoster } from "@/lib/poster";
import { photo } from "@/lib/photos";

/* ── 主题模板（全部基于真实素材与考据，不虚构情节） ─────── */

interface Theme {
  id: string;
  name: string;
  desc: string;
  titles: string[];
  bodies: string[];
  corner: string;
  tags: string;
}

const THEMES: Theme[] = [
  {
    id: "typhoon",
    name: "台风夜的暖",
    desc: "冷与暖的对撞：屋外风雨，屋里灶火",
    titles: ["台风再大，大不过一锅公道", "外面落雨唛，屋里头汤滚了", "冷的是天，暖的是这一锅"],
    bodies: [
      "台风天的琼海乡村，屋外又冷又湿，屋里灶膛火正旺。八九户人家凑钱合买一只鸭，由一个最公正的人掌刀分肉——连拇指大的鸡心也要等分。",
      "据中新网报道：每逢台风天、农闲时节，乡邻围坐一处做公道饭，均分食物、闲话家常。这一晚的暖，是从锅底一直暖到心里的。",
    ],
    corner: "杯贡 · shou · 杯匹",
    tags: "#一碗公道饭 #琼海公道饭 #台风天 #海南美食",
  },
  {
    id: "homesick",
    name: "乡愁 · 下南洋",
    desc: "一只鸭、一粒豆、一片肉，都是漂洋过海的海南味",
    titles: ["一只鸭、一粒豆，都是漂洋过海的味道", "海南人的乡愁，是能闻得到的"],
    bodies: [
      "公道饭的核心食材嘉积鸭，是三百多年前琼籍华侨从南洋带回来的番鸭。这一口习俗也随琼侨传到新加坡、马来西亚——侨胞说，品尝一次，回味一年。",
      "同在一条“下南洋”的物产线索上，还有澄迈福山咖啡：1933 年华侨陈显彰从苏门答腊带回罗布斯塔咖啡种，在火山岩红壤上种活了海南的第一口咖啡香。",
    ],
    corner: "侨乡味道",
    tags: "#一碗公道饭 #海南侨乡 #嘉积鸭 #福山咖啡",
  },
  {
    id: "fairness",
    name: "公道精神",
    desc: "做的不取，取的不做",
    titles: ["做的不取，取的不做", "连拇指大的鸡心，也要等分", "什么叫公道？是一碗饭里分得清"],
    bodies: [
      "物质匮乏的年代，琼海乡村八九户人家凑钱合买“三鸟”，推举村里最公正、最有威望的人当“公道头”，主持收钱、购买、烹制和分配，人人均等。这套规矩，被称作海南人的“原始 AA 制”。",
      "分到最后一块肉、最后一碗汤，都要看齐。公道头全程不参与挑选——把公平交给全村人的眼睛。",
    ],
    corner: "公道头 · 三鸟",
    tags: "#一碗公道饭 #公道精神 #海南文化 #琼海",
  },
  {
    id: "midnight",
    name: "深夜美味",
    desc: "白斩、金桔蘸水、鸭油饭团与锅巴",
    titles: ["皮薄骨软，蘸一下 shou 才叫完整", "这一盘，是我今晚的夜宵天花板"],
    bodies: [
      "白斩嘉积鸭，脯大、皮薄、骨软、肉嫩，蘸料是滚鸭汤冲蒜茸姜茸、再挤上酸桔汁。旁边配鸭汤煮的饭团——琼海话叫“杯贡”，手抓着吃。",
      "锅底还有一片焦香：鸭汤饭结出的整片锅巴，浇猪油撒盐，起锅即食。琼海话叫“杯匹”，一锅只出这一片。",
    ],
    corner: "shou · 蘸料",
    tags: "#一碗公道饭 #夜宵 #海南美食 #白斩鸭",
  },
  {
    id: "crust",
    name: "隐藏锅巴",
    desc: "一锅只出一片的彩蛋",
    titles: ["一锅只出一片的那口，懂的人才懂", "守到最后的人，才吃得到杯匹"],
    bodies: [
      "鸭汤饭在锅底结出的整片锅巴，琼海话叫“杯匹”。起锅前浇猪油、撒盐，成片铲起，焦香酥脆。每锅只结一层，量少更珍贵。",
      "它和“公道”这件事意外地合拍：人人有份，但每份不多。所以我们把它做成互动叙事《台风夜·做公道》的隐藏结局——只有守到起锅的人才吃得到。",
    ],
    corner: "杯匹 · 锅巴",
    tags: "#一碗公道饭 #锅巴 #隐藏菜单 #海南",
  },
];

/* ── 可选照片（均来自本人实拍素材库） ──────────────────── */

const PHOTOS = [
  { dir: "duckBoiled" as const, file: "S01b1-12_嘉积鸭_白斩_四盆均分俯拍.jpg", label: "四盆均分（主图）" },
  { dir: "gooseBoiled" as const, file: "S01c1-03_温泉鹅_白斩_斩件分碗.jpg", label: "十几碗均分" },
  { dir: "plating" as const, file: "S04-03_芭蕉叶摆盘_竹簸箕俯拍.jpg", label: "芭蕉叶摆盘" },
  { dir: "plating" as const, file: "S04-04_芭蕉叶摆盘_文昌鸡香芋饭团.jpg", label: "红托盘白斩鸡" },
  { dir: "riceBall" as const, file: "S02-02_杯贡饭团_簸箕俯拍特写.jpg", label: "杯贡特写" },
  { dir: "crust" as const, file: "S05-02_锅巴_起锅盛盘金黄整块.jpg", label: "起锅的杯匹" },
  { dir: "crust" as const, file: "S05-05_锅巴_浇猪油.jpg", label: "浇猪油" },
  { dir: "duckBoiled" as const, file: "S01b1-07_嘉积鸭_白斩_金桔蘸水浇汁.jpg", label: "金桔蘸水" },
  { dir: "duckRoast" as const, file: "S01b2-07_嘉积鸭_烤制_鸭腿饭特写.jpg", label: "烤鸭腿饭" },
  { dir: "gooseRoast" as const, file: "S01c2-05_温泉鹅_烤制_温泉烧鹅簸箕装盘.jpg", label: "温泉烧鹅" },
  { dir: "gooseBoiled" as const, file: "S01c1-08_温泉鹅_白斩_吊鹅出锅.jpg", label: "吊鹅出锅" },
  { dir: "duckBoiled" as const, file: "S01b1-06_嘉积鸭_白斩_斩件特写.jpg", label: "斩件特写" },
  { dir: "dip" as const, file: "S03-01_蘸料_六碗一人一份带字标.jpg", label: "一人一碗蘸料" },
  { dir: "dip" as const, file: "S03-02_蘸料_白盘鸭肉配四碗蘸料.jpg", label: "鸭肉配四碗 shou" },
  { dir: "dip" as const, file: "S03-06_蘸料_浇淋打包份.jpg", label: "浇上 shou 的打包份" },
];

type CopyStyle = "moments" | "redbook" | "script" | "dialect";

const COPY_STYLES: { id: CopyStyle; name: string; hint: string }[] = [
  { id: "moments", name: "朋友圈", hint: "短、克制、留一句余味" },
  { id: "redbook", name: "小红书", hint: "开头抓人 + 分点 + 标签" },
  { id: "script", name: "短视频口播", hint: "15–30 秒分镜式口播稿" },
  { id: "dialect", name: "琼海话彩蛋版", hint: "普通话为主，方言词点缀" },
];

function makeCopy(theme: Theme, style: CopyStyle, variant: number): string {
  const t = theme.titles[variant % theme.titles.length];
  const b = theme.bodies[variant % theme.bodies.length];
  if (style === "moments") {
    return `${t}\n\n${b}\n\n${theme.tags}`;
  }
  if (style === "redbook") {
    return `【${t}】\n\n${b}\n\n为什么值得专门记一笔：\n· 三鸟不是普通鸡鸭鹅——文昌鸡、嘉积鸭、温泉鹅，都是名菜级的食材\n· 分得均，才是这顿饭最动人的地方\n· 隐藏彩蛋：锅底那片“杯匹”，一锅只出一片\n\n${theme.tags}`;
  }
  if (style === "script") {
    return `【短视频口播稿 · 约 25 秒】\n\n0–3s｜画面：灶膛火 / 蒸汽\n口播：${t}。\n\n3–12s｜画面：白斩斩件、分碗\n口播：${b}\n\n12–20s｜画面：芭蕉叶上的饭团围成一圈\n口播：鸭汤煮饭捏成饭团，琼海话叫“杯贡”，围成一圈，一人一份，谁也不少谁。\n\n20–25s｜画面：锅巴起锅\n口播：锅底那一片，琼海话叫“杯匹”——一锅只出这一片。\n\n字幕：${theme.tags}`;
  }
  return `（普通话为主，方言只做点缀）\n\n${t}。\n\n${b}\n\n—— 斩好了，来蘸 "shou"；饭团捏得圆，叫"杯贡"；锅底那一片，叫"杯匹"，起锅那一下，乓得整屋都闻到。\n\n${theme.tags}`;
}

/* ── 页面 ─────────────────────────────────────────────── */

export function Create() {
  const [themeIdx, setThemeIdx] = useState(0);
  const [photoIdx, setPhotoIdx] = useState(0);
  const [variant, setVariant] = useState(0);
  const [style, setStyle] = useState<CopyStyle>("redbook");
  const [posterUrl, setPosterUrl] = useState("");
  const [busy, setBusy] = useState(false);
  const [copied, setCopied] = useState(false);

  const theme = THEMES[themeIdx];
  const shot = PHOTOS[photoIdx];
  const copy = makeCopy(theme, style, variant);

  async function generate() {
    setBusy(true);
    try {
      const url = await renderPoster({
        image: photo(shot.dir, shot.file),
        title: theme.titles[variant % theme.titles.length],
        body: theme.bodies[variant % theme.bodies.length],
        corner: theme.corner,
      });
      setPosterUrl(url);
    } catch {
      setPosterUrl("");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="bg-background pb-24">
      <section className="mx-auto max-w-shell px-6 pb-16 pt-16 md:px-8 md:pb-24 md:pt-24">
        <Label>模块三 · 内容共创与传播</Label>
        <h1 className="mt-8 font-sans text-5xl leading-[0.95] tracking-tight text-foreground sm:text-6xl md:text-7xl">
          AI 创作坊
        </h1>
        <div className="mt-10 grid gap-8 md:grid-cols-12 md:gap-12">
          <p className="max-w-md font-sans text-sm leading-relaxed text-muted md:col-span-5 md:text-base">
            用你自己的实拍照片，配上 AI 生成的文案与版式，一键出海报与社交文案——每个食客都能成为海南美食的传播者。
            海报由本地 Canvas 实时合成，不依赖网络。
          </p>
          <p className="font-sans text-xl italic leading-relaxed text-muted md:col-span-4 md:col-start-9 md:text-2xl">
            Five themes, one real photo.
            <br />
            五个主题，一张实拍。
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-shell px-6 md:px-8">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          {/* 控制台 */}
          <div className="space-y-16">
            <div>
              <SectionTitle index="01" kick="选主题" title="今晚发哪一种情绪？" />
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {THEMES.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => {
                      setThemeIdx(THEMES.indexOf(t));
                      setPosterUrl("");
                    }}
                    className={cn(
                      "rounded-xl border p-5 text-left transition-all duration-200",
                      t.id === theme.id
                        ? "border-accent bg-accent-soft shadow-sm"
                        : "border-border bg-background hover:border-subtle",
                    )}
                  >
                    <span className="text-[17px] font-semibold tracking-tight text-foreground">
                      {t.name}
                    </span>
                    <span className="mt-1.5 block text-[13px] leading-relaxed text-subtle">
                      {t.desc}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <SectionTitle
                index="02"
                kick="挑照片"
                title="挑一张真实照片"
                desc="以下全部来自本人实拍素材库，无图库图、无 AI 生成图。"
              />
              <div className="mt-8 grid grid-cols-3 gap-2 sm:grid-cols-4">
                {PHOTOS.map((p, i) => (
                  <button
                    key={p.file}
                    type="button"
                    onClick={() => {
                      setPhotoIdx(i);
                      setPosterUrl("");
                    }}
                    className={cn(
                      "overflow-hidden rounded-xl border-2 transition-all duration-200",
                      i === photoIdx
                        ? "border-accent"
                        : "border-transparent opacity-80 hover:opacity-100",
                    )}
                    title={p.label}
                  >
                    <img
                      src={photo(p.dir, p.file)}
                      alt={p.label}
                      loading="lazy"
                      className="aspect-[4/3] w-full object-cover"
                    />
                  </button>
                ))}
              </div>
              <p className="mt-4 font-sans text-xs text-subtle">
                当前选中：{shot.label}
              </p>
            </div>

            <div>
              <SectionTitle index="03" kick="生成" title="合成海报" />
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => void generate()}
                  disabled={busy}
                  className="btn-primary disabled:opacity-40"
                >
                  <Wand2 className="h-4 w-4" />
                  {busy ? "正在合成…" : posterUrl ? "换一版海报" : "生成海报"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setVariant((v) => v + 1);
                    setPosterUrl("");
                  }}
                  className="btn-secondary"
                >
                  <RefreshCw className="h-4 w-4" />
                  换一组文案
                </button>
              </div>
              <p className="mt-4 font-sans text-xs text-subtle">
                尺寸：小红书竖版 3:4 · 1080px 宽
              </p>
            </div>

            <Callout title="合规与标注">
              海报使用真实照片 + AI 生成文案；成品带项目署名，不含任何虚构“历史照片”。
              短视频生成（P1）将复用同一套素材与文案引擎，输出配音与字幕。
            </Callout>
          </div>

          {/* 预览区 */}
          <div className="space-y-16">
            <div>
              <div className="flex items-baseline justify-between gap-4">
                <span className="text-[19px] font-semibold tracking-tight text-foreground">
                  海报预览
                </span>
                <Label>Canvas 本地合成</Label>
              </div>
              {posterUrl ? (
                <div className="mt-6">
                  <img
                    src={posterUrl}
                    alt="生成的海报"
                    className="w-full rounded-2xl border border-border shadow-md"
                  />
                  <button
                    type="button"
                    onClick={() => downloadDataUrl(posterUrl, `一碗公道饭_${theme.name}.png`)}
                    className="btn-secondary mt-5 w-full justify-center"
                  >
                    <Download className="h-4 w-4" />
                    下载 PNG
                  </button>
                </div>
              ) : (
                <div className="mt-6 flex aspect-[3/4] flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-surface/60 px-6 text-center">
                  <ImageIcon className="h-8 w-8 text-subtle" />
                  <p className="mt-4 text-[13px] leading-relaxed text-subtle">
                    选好主题与照片后
                    <br />
                    点「生成海报」即可实时合成
                  </p>
                </div>
              )}
            </div>

            <div>
              <div className="flex flex-wrap items-baseline justify-between gap-4">
                <span className="text-[19px] font-semibold tracking-tight text-foreground">
                  配套文案
                </span>
                <div className="flex flex-wrap gap-2">
                  {COPY_STYLES.map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setStyle(s.id)}
                      title={s.hint}
                      className={cn(
                        "rounded-full px-3 py-1.5 text-[13px] font-medium transition-all duration-200",
                        s.id === style
                          ? "bg-accent-soft text-accent"
                          : "text-subtle hover:bg-surface hover:text-foreground",
                      )}
                    >
                      {s.name}
                    </button>
                  ))}
                </div>
              </div>
              <pre className="mt-6 max-h-[360px] overflow-auto whitespace-pre-wrap rounded-2xl border border-border bg-surface/60 p-5 font-sans text-[14px] leading-[1.75] text-muted">
                {copy}
              </pre>
              <button
                type="button"
                onClick={() => {
                  void navigator.clipboard.writeText(copy).then(() => {
                    setCopied(true);
                    window.setTimeout(() => setCopied(false), 2000);
                  });
                }}
                className="btn-secondary mt-8 w-full justify-center"
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                {copied ? "已复制" : "复制文案"}
              </button>
              <p className="mt-4 font-sans text-xs leading-relaxed text-subtle">
                当前为本地模板引擎输出（四套风格 × 五主题随机组合）。接入大模型后，同一入口可生成个性化版本。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
