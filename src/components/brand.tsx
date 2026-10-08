import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import type { DialectEntry } from "@/data/content";

/* ── 标识（Apple 圆角方块 + 白字） ─────────────────────── */

export function Seal({ className, size = 40 }: { className?: string; size?: number }) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-[10px] bg-foreground text-background",
        className,
      )}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <span className="text-[13px] font-semibold leading-none tracking-tight">公道</span>
    </span>
  );
}

export function Wordmark({ compact = false }: { compact?: boolean }) {
  return (
    <span className="flex items-baseline gap-2.5">
      <span
        className={cn(
          "font-semibold tracking-tight text-foreground",
          compact ? "text-[15px]" : "text-lg sm:text-xl",
        )}
      >
        一碗公道饭
      </span>
      {!compact && (
        <span className="hidden text-[11px] font-medium text-subtle sm:inline">
          One Bowl of Fairness
        </span>
      )}
    </span>
  );
}

/* ── 眉标（小字 + 中等字重 + 灰色，不做全大写） ─────────── */

export function Label({
  children,
  tone = "plain",
  className,
}: {
  children: ReactNode;
  tone?: "plain" | "line" | "invert";
  className?: string;
}) {
  const tones: Record<string, string> = {
    plain: "text-muted",
    line: "rounded-full border border-border bg-background px-3 py-1 text-muted",
    invert: "text-background/60",
  };
  return (
    <span
      className={cn("inline-flex items-center gap-1.5 text-sm font-medium", tones[tone], className)}
    >
      {children}
    </span>
  );
}

/* ── 区块标题（眉标 + 大标题 + 导语；默认居中） ─────────── */

export function SectionTitle({
  index,
  kick,
  title,
  desc,
  align = "center",
  invert = false,
}: {
  /** 区块序号，如 "01" */
  index?: string;
  kick?: string;
  title: string;
  desc?: ReactNode;
  align?: "left" | "center";
  invert?: boolean;
}) {
  const label = [index, kick].filter(Boolean).join(" · ");
  const centered = align === "center";
  return (
    <div className={cn(centered && "text-center")}>
      {label && (
        <div className={cn("label", invert && "text-background/60")}>
          <span className={cn(invert ? "text-accent" : "text-accent")}>{label}</span>
        </div>
      )}
      <h2
        className={cn(
          "mt-3 text-[clamp(1.75rem,3.6vw,2.5rem)] font-semibold leading-[1.15] tracking-tight",
          invert ? "text-background" : "text-foreground",
        )}
      >
        {title}
      </h2>
      {desc && (
        <div
          className={cn(
            "mt-4 max-w-prose text-[15px] leading-[1.75] md:text-base",
            centered && "mx-auto",
            invert ? "text-background/70" : "text-muted",
          )}
        >
          {desc}
        </div>
      )}
    </div>
  );
}

/* ── 照片卡（圆角 + 微妙阴影 + 悬停缓慢推近） ───────────── */

export function PhotoCard({
  src,
  title,
  caption,
  ratio = "4/3",
  className,
  imgClassName,
  overlay,
  invert = false,
}: {
  src: string;
  title?: string;
  caption?: string;
  ratio?: string;
  className?: string;
  imgClassName?: string;
  overlay?: ReactNode;
  invert?: boolean;
}) {
  return (
    <figure
      className={cn(
        "group overflow-hidden rounded-2xl border transition-all duration-300",
        invert
          ? "border-background/15 bg-background/5 hover:border-background/30"
          : "border-border bg-background shadow-sm hover:shadow-md",
        className,
      )}
    >
      <div className="relative overflow-hidden bg-surface" style={{ aspectRatio: ratio }}>
        <img
          src={src}
          alt={title ?? caption ?? "公道饭实拍"}
          loading="lazy"
          decoding="async"
          className={cn(
            "h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]",
            imgClassName,
          )}
        />
        {overlay}
      </div>
      {(title || caption) && (
        <figcaption className="px-5 py-4">
          {title && (
            <div
              className={cn(
                "text-[15px] font-semibold leading-snug",
                invert ? "text-background" : "text-foreground",
              )}
            >
              {title}
            </div>
          )}
          {caption && (
            <div
              className={cn(
                "mt-1 text-[13px] leading-relaxed",
                invert ? "text-background/60" : "text-subtle",
              )}
            >
              {caption}
            </div>
          )}
        </figcaption>
      )}
    </figure>
  );
}

/* ── 素材长卷章节（双栏图文交替，参照 legend 的版式） ───── */

export function Chapter({
  no,
  image,
  alt,
  motif,
  kicker,
  title,
  quote,
  flip = false,
  children,
  imageClassName,
}: {
  /** 章节号，如 "壹" 或 "01" */
  no?: string;
  image: string;
  alt?: string;
  /** 图片底部图注胶囊 */
  motif?: string;
  /** 标题上方的小眉标 */
  kicker?: string;
  title: string;
  /** 引文块 */
  quote?: ReactNode;
  /** 是否左右翻转（图在右） */
  flip?: boolean;
  children: ReactNode;
  imageClassName?: string;
}) {
  return (
    <article className="journey-chapter">
      <figure className={cn("chapter-media", flip && "md:order-2", imageClassName)}>
        <img src={image} alt={alt ?? motif ?? title} loading="lazy" decoding="async" />
        {no && <span className="chapter-no">{no}</span>}
        {motif && <figcaption className="chapter-motif">{motif}</figcaption>}
      </figure>
      <div className={cn("chapter-body", flip && "md:order-1")}>
        {kicker && <div className="chapter-kicker">{kicker}</div>}
        <h3>{title}</h3>
        <div className="chapter-prose">{children}</div>
        {quote && <blockquote className="chapter-quote">{quote}</blockquote>}
      </div>
    </article>
  );
}

/* ── 方言词条（卡片） ───────────────────────────────────── */

export function DialectCard({
  entry,
  className,
  invert = false,
}: {
  entry: DialectEntry;
  className?: string;
  invert?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border p-5 transition-shadow duration-300 hover:shadow-md",
        invert ? "border-background/15 bg-background/5" : "border-border bg-background shadow-sm",
        className,
      )}
    >
      <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
        <span
          className={cn(
            "text-xl font-semibold tracking-tight",
            invert ? "text-background" : "text-foreground",
          )}
        >
          {entry.word}
        </span>
        <span className={cn("label text-[13px]", invert && "text-background/60")}>
          {entry.pron}
        </span>
        {entry.verified && (
          <span className="rounded-full bg-accent-soft px-2 py-0.5 text-[11px] font-medium text-accent">
            已校对
          </span>
        )}
      </div>
      <p
        className={cn(
          "mt-2.5 text-[14px] leading-relaxed",
          invert ? "text-background/80" : "text-muted",
        )}
      >
        {entry.meaning}
      </p>
      <p className={cn("mt-1.5 text-[12px]", invert ? "text-background/50" : "text-subtle")}>
        用于：{entry.usage}
      </p>
    </div>
  );
}

/* ── 信息块（圆角卡片 或 深色反转） ─────────────────────── */

export function Callout({
  title,
  children,
  tone = "default",
  icon,
}: {
  title?: string;
  children: ReactNode;
  tone?: "default" | "invert";
  icon?: ReactNode;
}) {
  const isInvert = tone === "invert";
  return (
    <div
      className={cn(
        "rounded-2xl p-6",
        isInvert
          ? "bg-foreground text-background"
          : "border border-border bg-surface text-foreground",
      )}
    >
      {title && (
        <div
          className={cn(
            "mb-2.5 flex items-center gap-2.5 text-[15px] font-semibold",
            isInvert ? "text-background" : "text-foreground",
          )}
        >
          {icon}
          {title}
        </div>
      )}
      <div
        className={cn(
          "text-[14px] leading-[1.75]",
          isInvert ? "text-background/75" : "text-muted",
        )}
      >
        {children}
      </div>
    </div>
  );
}

/* ── 步骤指示（Apple 数字圆点 + 连接线） ────────────────── */

export function Steps({ steps, current }: { steps: string[]; current: number }) {
  return (
    <ol className="no-scrollbar flex items-center gap-3 overflow-x-auto pb-1">
      {steps.map((s, i) => {
        const active = i === current;
        const done = i < current;
        return (
          <li key={s} className="flex shrink-0 items-center gap-2.5">
            <span
              className={cn(
                "flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-semibold transition-colors duration-200",
                active
                  ? "bg-accent text-white"
                  : done
                    ? "bg-foreground text-background"
                    : "bg-surface text-subtle",
              )}
            >
              {i + 1}
            </span>
            <span
              className={cn(
                "text-[13px] font-medium transition-colors duration-200",
                active ? "text-foreground" : done ? "text-muted" : "text-subtle",
              )}
            >
              {s}
            </span>
            {i < steps.length - 1 && <span className="h-px w-5 bg-border" />}
          </li>
        );
      })}
    </ol>
  );
}
