import { useEffect, useMemo, useRef, useState } from "react";
import {
  BadgeCheck,
  BookOpenCheck,
  Check,
  ChefHat,
  Copy,
  Download,
  KeyRound,
  MessageCircle,
  RefreshCw,
  Send,
  Sparkles,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Callout, DialectCard, Label, SectionTitle, Steps } from "@/components/brand";
import {
  DIALECT_BY_WORD,
  HEAD_LINES,
  INGREDIENTS,
  QUICK_QUESTIONS,
  TICKET_PARTS,
  VILLAGERS,
  type Ingredient,
  type Method,
} from "@/data/content";
import { photo } from "@/lib/photos";
import { askHead, getKey, setKey, type ChatMsg } from "@/lib/llm";
import { downloadDataUrl, renderPoster } from "@/lib/poster";

const STEP_LABELS = ["开场", "选三鸟", "定做法", "凑份子", "开斩", "分餐", "公道签"];

interface Member {
  name: string;
  tag: string;
  isMe: boolean;
  part?: string;
  fortune?: string;
  share?: string;
  note?: string;
}

/* ── 打字机 ───────────────────────────────────────────── */

function Typewriter({ text, speed = 68, onDone }: { text: string; speed?: number; onDone?: () => void }) {
  const [shown, setShown] = useState("");
  useEffect(() => {
    setShown("");
    let i = 0;
    const timer = window.setInterval(() => {
      i += 1;
      setShown(text.slice(0, i));
      if (i >= text.length) {
        window.clearInterval(timer);
        onDone?.();
      }
    }, speed);
    return () => window.clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, speed]);
  return (
    <p className="font-sans text-2xl leading-snug tracking-tight text-background sm:text-4xl md:text-5xl">
      {shown}
      <span className="ml-1 inline-block h-[0.85em] w-px animate-caret-blink bg-background align-middle" />
    </p>
  );
}

/* ── 与公道头对话 ─────────────────────────────────────── */

export function HeadChat() {
  const [msgs, setMsgs] = useState<ChatMsg[]>([
    { role: "assistant", content: "坐近些。要问什么，趁汤还滚着。" },
  ]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [source, setSource] = useState<"deepseek" | "local">("local");
  const [keyDraft, setKeyDraft] = useState("");
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [msgs]);

  async function send(q: string) {
    const question = q.trim();
    if (!question || busy) return;
    setInput("");
    const next: ChatMsg[] = [...msgs, { role: "user", content: question }];
    setMsgs(next);
    setBusy(true);
    const { text, source: src } = await askHead(question, next);
    setSource(src);
    setMsgs([...next, { role: "assistant", content: text }]);
    setBusy(false);
  }

  return (
    <div className="border border-border">
      <div className="flex items-center justify-between gap-4 border-b border-border px-6 py-4">
        <div className="flex items-center gap-3">
          <MessageCircle className="h-4 w-4 text-foreground" />
          <span className="font-sans text-lg tracking-tight text-foreground">跟公道头说两句</span>
        </div>
        <Label tone={source === "deepseek" ? "line" : "plain"}>
          {source === "deepseek" ? "DeepSeek 实时生成" : "本地语料兜底"}
        </Label>
      </div>

      <div ref={listRef} className="no-scrollbar max-h-[320px] space-y-4 overflow-y-auto px-6 py-6">
        {msgs.map((m, i) => (
          <div key={i} className={cn("flex", m.role === "user" ? "justify-end" : "justify-start")}>
            <div
              className={cn(
                "max-w-[86%] whitespace-pre-line px-4 py-3 font-sans text-sm leading-relaxed",
                m.role === "user"
                  ? "bg-foreground text-background"
                  : "border border-border text-muted",
              )}
            >
              {m.role === "assistant" && <span className="label mb-2 block">公道头</span>}
              {m.content}
            </div>
          </div>
        ))}
        {busy && <div className="font-sans text-xs text-subtle">公道头在想…</div>}
      </div>

      <div className="flex flex-wrap gap-2 border-t border-border px-6 py-4">
        {QUICK_QUESTIONS.map((q) => (
          <button
            key={q}
            type="button"
            onClick={() => void send(q)}
            className="hover-underline font-sans text-xs text-muted transition-colors duration-200 hover:text-foreground"
          >
            {q}
          </button>
        ))}
      </div>

      <div className="flex items-end gap-3 border-t border-border px-6 py-4">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") void send(input);
          }}
          placeholder="问点什么，比如「为什么要等分？」"
          aria-label="向公道头提问"
          className="field"
        />
        <button
          type="button"
          onClick={() => void send(input)}
          disabled={busy}
          className="flex h-10 w-10 shrink-0 items-center justify-center bg-foreground text-background transition-colors duration-200 hover:opacity-90 disabled:opacity-40"
          aria-label="发送"
        >
          <Send className="h-4 w-4" />
        </button>
      </div>

      <details className="border-t border-border px-6 py-4">
        <summary className="flex cursor-pointer items-center gap-2 font-sans text-[13px] font-medium text-subtle">
          <KeyRound className="h-3.5 w-3.5" />
          接入 DeepSeek（可选，本机保存）
        </summary>
        <p className="mt-4 font-sans text-xs leading-relaxed text-muted">
          填入 Key 后，「公道头」由大模型实时扮演；不填则使用本地考据语料兜底，断网也能完整演示。
          Key 只存在本机浏览器，不上传、不写进代码。
        </p>
        <div className="mt-4 flex items-end gap-3">
          <input
            value={keyDraft}
            onChange={(e) => setKeyDraft(e.target.value)}
            placeholder={getKey() ? "已保存（重新填写可覆盖）" : "sk-..."}
            className="field"
          />
          <button
            type="button"
            onClick={() => {
              setKey(keyDraft);
              setKeyDraft("");
            }}
            className="shrink-0 bg-foreground px-4 py-3 font-sans text-[13px] font-medium text-background transition-colors duration-200 hover:opacity-90"
          >
            保存
          </button>
        </div>
      </details>
    </div>
  );
}

/* ── 分餐台 ───────────────────────────────────────────── */

function DivideTable({
  ing,
  method,
  members,
  revealed,
  onDivide,
}: {
  ing: Ingredient;
  method: Method;
  members: Member[];
  revealed: number;
  onDivide: () => void;
}) {
  const n = members.length;
  const balls = Math.min(n * 2, 16);
  const done = revealed >= n;

  return (
    <div className="border border-border p-6 sm:p-8">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <ChefHat className="h-4 w-4 text-foreground" />
          <span className="font-sans text-xl tracking-tight text-foreground">
            分餐台 · {ing.name}（{method.name}）
          </span>
        </div>
        <button
          type="button"
          onClick={onDivide}
          disabled={done}
          className="btn-primary text-[13px] font-medium disabled:opacity-40"
        >
          {done ? <Check className="h-4 w-4" /> : <Users className="h-4 w-4" />}
          {done ? "已人人有份" : `按人头分给 ${n} 人`}
        </button>
      </div>

      {/* 真实照片 + 杯贡格阵（用方格填充表达"人人有份"，不用圆形图标） */}
      <div className="relative overflow-hidden">
        <img
          src={method.img}
          alt={`${ing.name}${method.name}`}
          className="mx-auto max-h-[240px] w-auto max-w-full object-cover sm:max-h-[300px]"
        />
        <div className="mt-8 flex flex-wrap items-end justify-center gap-2">
          {Array.from({ length: balls }).map((_, i) => (
            <span
              key={i}
              className={cn(
                "h-6 w-6 transition-colors duration-500 sm:h-7 sm:w-7",
                i < revealed * 2 ? "bg-foreground" : "bg-foreground/10",
              )}
              style={{ transitionDelay: `${i * 60}ms` }}
            />
          ))}
        </div>
        <p className="mt-5 text-center font-sans text-xs leading-relaxed text-subtle">
          杯贡（鸭汤饭团）· 按人数 ×2 分 —— 方格一个个填满，就是“人人有份”
        </p>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <img
          src={photo("dip", "S03-04_蘸料_大锅舀蒜蓉蘸料.jpg")}
          alt="蘸料从大锅分碗"
          loading="lazy"
          className="h-12 w-12 object-cover"
        />
        <Label tone="line">蘸料 shou：{method.sauce}</Label>
      </div>
      <p className="mt-4 font-sans text-xs leading-relaxed text-muted">
        蘸料也是先在大锅里调好、再一勺一勺分碗——和分肉同一个“公道”逻辑。
      </p>

      {/* 名单 */}
      <ul className="mt-8">
        {members.map((m, i) => {
          const got = i < revealed;
          return (
            <li
              key={m.name}
              className={cn(
                "flex items-center justify-between gap-4 border-t border-border py-4 transition-opacity duration-500",
                got ? "opacity-100" : "opacity-40",
              )}
            >
              <div className="flex min-w-0 items-center gap-4">
                <span className="w-6 shrink-0 font-sans text-[13px] font-medium text-subtle">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0">
                  <div className="flex items-center gap-3 font-sans text-sm text-foreground">
                    {m.name}
                    {m.isMe && <Label tone="line">我</Label>}
                  </div>
                  <div className="mt-1 font-sans text-xs text-subtle">{m.tag}</div>
                </div>
              </div>
              <div className="shrink-0 text-right">
                {got ? (
                  <>
                    <div className="font-sans text-lg tracking-tight text-foreground">{m.part}</div>
                    <div className="mt-0.5 font-sans text-xs text-subtle">{m.share}</div>
                  </>
                ) : (
                  <span className="font-sans text-xs text-subtle">等你分到</span>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/* ═══════════════ 主页面 ═══════════════ */

export function Ju() {
  const [step, setStep] = useState(0);
  const [ing, setIng] = useState<Ingredient | null>(null);
  const [method, setMethod] = useState<Method | null>(null);
  const [size, setSize] = useState(6);
  const [meName, setMeName] = useState("我");
  const [members, setMembers] = useState<Member[]>([]);
  const [chopped, setChopped] = useState(false);
  const [revealed, setRevealed] = useState(0);
  const [ticketNo, setTicketNo] = useState("");
  const [copied, setCopied] = useState(false);
  const [saving, setSaving] = useState(false);

  const myMember = members.find((m) => m.isMe);

  /* 进入分餐页时组装名单 */
  useEffect(() => {
    if (step !== 5 || members.length > 0) return;
    const list: Member[] = [{ name: meName || "我", tag: "凑了 1 份", isMe: true }];
    const pool = [...VILLAGERS].sort(() => Math.random() - 0.5);
    for (let i = 0; i < size - 1; i += 1) {
      const v = pool[i % pool.length];
      list.push({ name: v.name, tag: `凑了 1 份 · ${v.tag}`, isMe: false });
    }
    const offset = Math.floor(Math.random() * TICKET_PARTS.length);
    list.forEach((m, i) => {
      const p = TICKET_PARTS[(i + offset) % TICKET_PARTS.length];
      m.part = p.part;
      m.fortune = p.fortune;
      m.share = p.share;
      m.note = p.note;
    });
    setMembers(list);
    setTicketNo(
      `No.${new Date().toISOString().slice(0, 10).replace(/-/g, "")}-${String(list.length).padStart(2, "0")}`,
    );
  }, [step, members.length, meName, size]);

  function divideAll() {
    if (!members.length) return;
    let i = 0;
    const timer = window.setInterval(() => {
      i += 1;
      setRevealed(i);
      if (i >= members.length) window.clearInterval(timer);
    }, 360);
  }

  const headLine = useMemo(() => {
    if (step === 0) return HEAD_LINES.open;
    if (step === 3) return ing && method ? HEAD_LINES.gather(size, ing.bird, method.name) : HEAD_LINES.open;
    if (step === 4) return HEAD_LINES.chop;
    if (step === 5) return HEAD_LINES.divide;
    if (step === 6)
      return revealed >= members.length && myMember?.part === "锅巴（杯匹）"
        ? HEAD_LINES.crust
        : HEAD_LINES.ticket;
    return "";
  }, [step, size, ing, method, revealed, members.length, myMember]);

  const myCopy = myMember
    ? `我在【一碗公道饭】的 AI 公道局里凑了一份，一只${ing?.name ?? "三鸟"}，${
        method?.name ?? "白斩"
      }，我分到的是——${myMember.part}。\n${myMember.fortune}\n#一碗公道饭 #琼海公道饭 #海南美食`
    : "";

  async function saveTicket() {
    if (!myMember || !method) return;
    setSaving(true);
    try {
      const url = await renderPoster({
        image: method.img,
        title: `公道签：${myMember.part}`,
        body: `${myMember.fortune}\n${myMember.note ?? ""}`,
        corner: `杯贡 · shou · 杯匹 · 乓`,
      });
      downloadDataUrl(url, `公道签_${myMember.part}.png`);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="bg-background pb-24">
      {/* 头部 */}
      <section className="mx-auto max-w-shell px-6 pb-16 pt-16 md:px-8 md:pb-24 md:pt-24">
        <Label>模块一 · 社交裂变引擎</Label>
        <h1 className="mt-8 font-sans text-5xl leading-[0.95] tracking-tight text-foreground sm:text-6xl md:text-7xl">
          AI 公道局
        </h1>
        <div className="mt-10 grid gap-8 md:grid-cols-12 md:gap-12">
          <p className="max-w-md font-sans text-sm leading-relaxed text-muted md:col-span-5 md:text-base">
            还原“凑份子做公道”的仪式：选三鸟 → 定做法 → 凑份子 → AI 公道头主持开斩 → 分餐 → 领一张公道签。
            开场就在台风夜——屋外风雨，屋里灶火。
          </p>
          <div className="border-t border-border pt-6 md:col-span-6 md:col-start-7">
            <Steps steps={STEP_LABELS} current={step} />
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-6 md:px-8">
        {/* STEP 0 · 台风夜开场 */}
        {step === 0 && (
          <section
            id="opening"
            className="rounded-3xl bg-foreground px-6 py-20 text-center shadow-lg sm:px-14 sm:py-28"
          >
            <Label tone="invert">场景 · 台风夜 · 琼海乡村</Label>
            <div className="mx-auto mt-10 min-h-[120px] max-w-3xl">
              <Typewriter text={headLine} />
            </div>
            <p className="mx-auto mt-8 max-w-prose text-[15px] leading-[1.75] text-background/65">
              据中新网报道：每逢台风天、农闲时节，乡邻围坐一处做公道饭，均分食物、闲话家常。
              屋外又冷又湿，屋里灶膛火正旺——这一晚，你也被喊进来了。
            </p>
            <button
              type="button"
              onClick={() => setStep(1)}
              className="mt-10 inline-flex items-center gap-2 rounded-full bg-background px-6 py-3 text-[15px] font-medium text-foreground transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
            >
              进屋，凑一份 <Sparkles className="h-4 w-4" />
            </button>
          </section>
        )}

        {/* STEP 1 · 选三鸟 */}
        {step === 1 && (
          <section id="step1" className="space-y-16">
            <SectionTitle
              index="01"
              kick="选三鸟"
              title="今晚做哪只“三鸟”？"
              desc="凑份子合买的是鸡、鸭、鹅。先挑一只活的——在琼海，这三鸟恰好都是名菜级食材。"
            />
            <div className="grid gap-8 md:grid-cols-3 md:gap-12">
              {INGREDIENTS.map((i) => {
                const active = ing?.id === i.id;
                return (
                  <button
                    key={i.id}
                    type="button"
                    onClick={() => {
                      setIng(i);
                      setMethod(null);
                    }}
                    className={cn(
                      "group overflow-hidden rounded-2xl border-2 bg-background text-left shadow-sm transition-all duration-300 hover:shadow-md",
                      active ? "border-accent" : "border-border hover:border-subtle",
                    )}
                  >
                    <div className="relative aspect-[4/3] overflow-hidden bg-surface">
                      <img
                        src={photo(i.live.dir, i.live.file)}
                        alt={`${i.name}活体`}
                        loading="lazy"
                        className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                      />
                      {active && (
                        <span className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-accent text-white shadow-md">
                          <Check className="h-4 w-4" />
                        </span>
                      )}
                    </div>
                    <div className="p-6">
                      <h3 className="text-[20px] font-semibold tracking-tight text-foreground">
                        {i.name}
                      </h3>
                      <p className="mt-1.5 text-[12px] text-subtle">{i.badge}</p>
                      <p className="mt-4 text-[13px] leading-relaxed text-muted">{i.story}</p>
                      <ul className="mt-5 space-y-1.5 border-t border-border pt-4">
                        {i.facts.map((f) => (
                          <li
                            key={f}
                            className="flex gap-2.5 text-[12px] leading-relaxed text-subtle"
                          >
                            <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent/60" />
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </button>
                );
              })}
            </div>
            <div className="flex flex-wrap items-end justify-between gap-8">
              <DialectCard entry={DIALECT_BY_WORD["三鸟"]} className="max-w-md" />
              <button
                type="button"
                disabled={!ing}
                onClick={() => setStep(2)}
                className="btn-primary disabled:opacity-40"
              >
                下一步：定做法
              </button>
            </div>
          </section>
        )}

        {/* STEP 2 · 定做法 */}
        {step === 2 && ing && (
          <section id="step2" className="space-y-16">
            <SectionTitle
              index="02"
              kick="定做法"
              title={`${ing.name}怎么做？`}
              desc="食材名不限定做法。传统公道饭以白斩为主——便于“公道头”斩件均分；烤制则是琼海档口的另一条风味线。"
            />
            <div className="grid gap-8 sm:grid-cols-2 md:gap-12">
              {ing.methods.map((m) => {
                const active = method?.id === m.id;
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setMethod(m)}
                    className={cn(
                      "group overflow-hidden rounded-2xl border-2 bg-background text-left shadow-sm transition-all duration-300 hover:shadow-md",
                      active ? "border-accent" : "border-border hover:border-subtle",
                    )}
                  >
                    <div className="relative aspect-[4/3] overflow-hidden bg-surface">
                      <img
                        src={m.img}
                        alt={`${ing.name}${m.name}`}
                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                      />
                      {active && (
                        <span className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-accent text-white shadow-md">
                          <Check className="h-4 w-4" />
                        </span>
                      )}
                    </div>
                    <div className="p-6">
                      <h3 className="text-[20px] font-semibold tracking-tight text-foreground">
                        {m.name}
                      </h3>
                      <p className="mt-3 text-[13px] leading-relaxed text-muted">{m.note}</p>
                      <p className="mt-4 border-t border-border pt-4 text-[12px] leading-relaxed text-subtle">
                        蘸料（琼海话 shou）：{m.sauce}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
            <div className="flex flex-wrap items-center justify-between gap-8">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="hover-underline font-sans text-[13px] font-medium text-subtle transition-colors duration-200 hover:text-foreground"
              >
                ← 换一只
              </button>
              <button
                type="button"
                disabled={!method}
                onClick={() => setStep(3)}
                className="btn-primary disabled:opacity-40"
              >
                下一步：凑份子
              </button>
            </div>
          </section>
        )}

        {/* STEP 3 · 凑份子 */}
        {step === 3 && ing && method && (
          <section id="step3" className="space-y-16">
            <SectionTitle
              index="03"
              kick="凑份子"
              title="凑几份？谁来凑？"
              desc="老规矩：凑份的人人一份，人手不够时，村里人会替你补上——这里由 AI 村民补位。"
            />
            <div className="grid gap-12 lg:grid-cols-12">
              <div className="border border-border p-6 sm:p-8 lg:col-span-7">
                <label htmlFor="size" className="font-sans text-sm text-foreground">
                  今晚凑 <span className="font-sans text-xl">{size}</span> 份（含我）
                </label>
                <input
                  id="size"
                  type="range"
                  min={2}
                  max={10}
                  value={size}
                  onChange={(e) => setSize(Number(e.target.value))}
                  className="mt-6 w-full accent-[#1C1C1C]"
                />
                <div className="mt-8">
                  <label htmlFor="me" className="label">
                    怎么称呼你（写进公道签）
                  </label>
                  <input
                    id="me"
                    value={meName}
                    maxLength={12}
                    onChange={(e) => setMeName(e.target.value)}
                    className="field"
                  />
                </div>
                <div className="mt-8 border-t border-border pt-6">
                  <div className="font-sans text-lg tracking-tight text-foreground">公道头的确认</div>
                  <p className="mt-4 font-sans text-sm leading-relaxed text-muted">
                    {HEAD_LINES.gather(size, ing.bird, method.name)}
                  </p>
                  <p className="mt-4 font-sans text-[12px] font-medium text-subtle">
                    规矩：做的不取，取的不做
                  </p>
                </div>
              </div>

              <div className="space-y-8 lg:col-span-5">
                <div className="border border-border p-6">
                  <div className="font-sans text-lg tracking-tight text-foreground">今晚的桌边</div>
                  <ul className="mt-5">
                    <li className="flex items-center justify-between border-t border-border py-3">
                      <span className="font-sans text-sm text-foreground">{meName || "我"}</span>
                      <Label tone="line">发起人 · 1 份</Label>
                    </li>
                    {Array.from({ length: size - 1 }).map((_, i) => {
                      const v = VILLAGERS[i % VILLAGERS.length];
                      return (
                        <li
                          key={`${v.name}-${i}`}
                          className="flex items-center justify-between border-t border-border py-3"
                        >
                          <span className="font-sans text-sm text-muted">{v.name}</span>
                          <span className="font-sans text-xs text-subtle">AI 村民 · {v.tag}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <Callout title="关于 AI 村民" tone="invert">
                  名字取自琼海的乡镇地名（嘉积、博鳌、万泉、潭门…），是拟人化的角色设定，不代表真实人物。
                  决赛版本里，这些位置将让真人好友通过分享链接坐上来。
                </Callout>
                <div className="flex flex-wrap items-center justify-between gap-6">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="hover-underline font-sans text-[13px] font-medium text-subtle transition-colors duration-200 hover:text-foreground"
                  >
                    ← 换做法
                  </button>
                  <button type="button" onClick={() => setStep(4)} className="btn-primary">
                    收钱，起灶 →
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* STEP 4 · 开斩 */}
        {step === 4 && ing && method && (
          <section id="step4" className="space-y-16">
            <SectionTitle
              index="04"
              kick="开斩"
              title="当着大家的面，开斩"
              desc="公道头掌刀，自己绝不挑选——这一刀下去，今晚的公平就见分晓。"
            />
            <div className="border border-border">
              <div className="group relative aspect-[4/3] overflow-hidden border-b border-border sm:aspect-[16/9]">
                <img
                  src={method.img}
                  alt={`${ing.name}${method.name}`}
                  className={cn(
                    "h-full w-full object-cover transition-transform duration-1000",
                    chopped ? "scale-105" : "group-hover:scale-105",
                  )}
                />
                {chopped && (
                  <div className="pointer-events-none absolute inset-0 animate-fade-in bg-background/30" />
                )}
              </div>
              <div className="flex flex-wrap items-center justify-between gap-6 p-6 sm:p-8">
                <p className="max-w-lg font-sans text-sm leading-relaxed text-muted">
                  {HEAD_LINES.chop}
                </p>
                {!chopped ? (
                  <button
                    type="button"
                    onClick={() => {
                      setChopped(true);
                      window.setTimeout(() => setStep(5), 1000);
                    }}
                    className="btn-primary"
                  >
                    下刀
                  </button>
                ) : (
                  <Label tone="line">
                    <BadgeCheck className="h-3.5 w-3.5" /> 已斩件，准备分餐
                  </Label>
                )}
              </div>
            </div>
            <Callout title="这一步为什么要有交互">
              “开斩”是公道饭最有仪式感的动作：肉要当着所有人分，刀要当着所有人下。
              决赛版本将把这里做成可交互的斩件体验（拖刀切、按人头均分）。
            </Callout>
          </section>
        )}

        {/* STEP 5 · 分餐 */}
        {step === 5 && ing && method && (
          <section id="step5" className="grid gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7">
              <DivideTable
                ing={ing}
                method={method}
                members={members}
                revealed={revealed}
                onDivide={divideAll}
              />
            </div>
            <div className="space-y-8 lg:col-span-5">
              <HeadChat />
              <Callout title="为什么人人都有一份">
                公道饭的核心不是“好吃”，而是“分得均”。所以这张桌上，汤也要一人一碗、绝不凭关系多舀一勺。
                这套分餐规则，也被写进了互动叙事《台风夜·做公道》的判定里。
              </Callout>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setStep(6)}
                  disabled={revealed < members.length}
                  className="btn-primary disabled:opacity-40"
                >
                  {revealed < members.length ? "分完再领签" : "领我的公道签"}
                </button>
              </div>
            </div>
          </section>
        )}

        {/* STEP 6 · 公道签 */}
        {step === 6 && ing && method && myMember && (
          <section id="step6" className="space-y-16">
            <SectionTitle
              index="06"
              kick="公道签"
              title="你的公道签"
              desc="一张签，写明你分到什么，也写一句公道头给你的话。"
            />

            <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
              {/* 签卡 */}
              <div className="border border-border p-8 sm:p-10">
                <div className="flex items-baseline justify-between gap-6">
                  <span className="label">One Bowl of Fairness</span>
                  <span className="label">{ticketNo}</span>
                </div>
                <div className="mt-10 font-sans text-4xl leading-[1.05] tracking-tight text-foreground sm:text-5xl">
                  {myMember.part}
                </div>
                <div className="mt-4 font-sans text-[13px] font-medium text-subtle">
                  {ing.name} · {method.name} · {myMember.share}
                </div>
                <p className="mt-8 font-sans text-lg leading-relaxed text-foreground md:text-xl">
                  {myMember.fortune}
                </p>
                <p className="mt-4 font-sans text-xs leading-relaxed text-muted">{myMember.note}</p>
                <div className="mt-8 flex flex-wrap gap-3 border-t border-border pt-6">
                  <Label tone="line">杯贡 · 饭团</Label>
                  <Label tone="line">shou · 蘸料</Label>
                  <Label tone="line">杯匹 · 锅巴</Label>
                  <Label tone="line">乓 · 香</Label>
                </div>
                <p className="mt-6 font-sans text-[10px] leading-relaxed text-subtle">
                  今晚同桌 {members.length} 人，一只{ing.bird}，人人有份 · 出处：海南省旅文厅、中新网海南等公开报道
                </p>
              </div>

              {/* 同桌名单 + 操作 */}
              <div className="space-y-8">
                <div className="border border-border p-6">
                  <div className="font-sans text-lg tracking-tight text-foreground">今晚这一桌</div>
                  <ul className="mt-5 grid gap-x-8 sm:grid-cols-2">
                    {members.map((m) => (
                      <li
                        key={m.name}
                        className="flex items-baseline justify-between gap-4 border-t border-border py-3"
                      >
                        <span className="font-sans text-xs text-muted">{m.name}</span>
                        <span className="font-sans text-xs text-subtle">{m.part}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap gap-4">
                  <button
                    type="button"
                    onClick={() => {
                      void navigator.clipboard.writeText(myCopy).then(() => {
                        setCopied(true);
                        window.setTimeout(() => setCopied(false), 2000);
                      });
                    }}
                    className="btn-primary"
                  >
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    {copied ? "已复制分享文案" : "复制分享文案"}
                  </button>
                  <button
                    type="button"
                    onClick={() => void saveTicket()}
                    disabled={saving}
                    className="btn-secondary disabled:opacity-40"
                  >
                    <Download className="h-4 w-4" />
                    {saving ? "生成中…" : "保存公道签图片"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setStep(1);
                      setIng(null);
                      setMethod(null);
                      setMembers([]);
                      setRevealed(0);
                      setChopped(false);
                    }}
                    className="btn-secondary"
                  >
                    <RefreshCw className="h-4 w-4" />
                    再做一场
                  </button>
                </div>

                <Callout
                  title="决赛版本会补上的两件事"
                  tone="invert"
                  icon={<BookOpenCheck className="h-4 w-4 text-background" />}
                >
                  ① 组局链接分享：把这一桌变成真人好友，谁没到就空着一个碗；
                  ② 排行榜：本周最热公道局、最“旺”的部位（腿 / 胗 / 锅巴）。
                </Callout>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
