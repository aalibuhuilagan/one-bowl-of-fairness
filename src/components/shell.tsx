import { useEffect, useState, type ReactNode } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link, ROUTES, useRouter } from "@/lib/router";
import { Seal, Wordmark } from "@/components/brand";

/* ── 顶部导航（Apple 毛玻璃固定栏） ─────────────────────── */

export function SiteNav() {
  const { route } = useRouter();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [route]);

  return (
    <header className="fixed top-0 z-50 w-full border-b border-border/70 bg-background/75 backdrop-blur-xl backdrop-saturate-150">
      <div className="mx-auto flex h-16 max-w-shell items-center justify-between gap-6 px-6 md:px-8">
        <Link to="home" className="flex items-center gap-2.5" aria-label="回到首页">
          <Seal size={28} />
          <Wordmark compact />
        </Link>

        <nav aria-label="主导航" className="hidden items-center gap-1 lg:flex">
          {ROUTES.filter((r) => r.key !== "home").map((r) => (
            <Link
              key={r.key}
              to={r.key}
              aria-current={route === r.key ? "page" : undefined}
              className={cn(
                "rounded-full px-3.5 py-2 text-[14px] font-medium transition-colors duration-200",
                route === r.key
                  ? "bg-surface text-foreground"
                  : "text-muted hover:bg-surface hover:text-foreground",
              )}
            >
              {r.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link to="ju" className="btn-primary hidden !px-5 !py-2 !text-[14px] sm:inline-flex">
            开一场公道局
          </Link>
          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-full text-foreground transition-colors duration-200 hover:bg-surface lg:hidden"
            aria-label={open ? "关闭菜单" : "打开菜单"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav aria-label="移动端导航" className="border-t border-border bg-background lg:hidden">
          <ul className="mx-auto max-w-shell px-6 py-3 md:px-8">
            {ROUTES.map((r) => (
              <li key={r.key}>
                <Link
                  to={r.key}
                  className={cn(
                    "flex items-baseline justify-between gap-6 rounded-xl px-3 py-3 transition-colors duration-200",
                    route === r.key ? "bg-surface" : "hover:bg-surface",
                  )}
                  aria-current={route === r.key ? "page" : undefined}
                >
                  <span className="text-[15px] font-medium text-foreground">{r.label}</span>
                  <span className="text-[12px] text-subtle">{r.hint}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}

/* ── 页脚（深色区 + 圆角内容块） ───────────────────────── */

export function SiteFooter() {
  return (
    <footer className="mt-20 bg-surface px-6 py-16 md:px-8 md:py-20">
      <div className="mx-auto max-w-shell">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2.5">
              <span
                className="inline-flex h-7 w-7 items-center justify-center rounded-[8px] bg-foreground text-background"
                aria-hidden="true"
              >
                <span className="text-[11px] font-semibold leading-none">公道</span>
              </span>
              <span className="text-[15px] font-semibold tracking-tight">一碗公道饭</span>
            </div>
            <p className="mt-4 max-w-md text-[13px] leading-relaxed text-muted">
              以琼海公道饭为首发 IP 的海南美食文化 AI 共创平台。三鸟为料、公道为魂，AI
              为新的灶火——让每个人都能“做一场公道”，把海南的侨乡味道变成可玩、可创、可分享的数字体验。
            </p>
            <p className="mt-4 text-[17px] font-semibold text-foreground">
              台风再大，大不过一锅公道。
            </p>
          </div>

          <div>
            <span className="label text-[13px] text-subtle">页面</span>
            <ul className="mt-4 space-y-2.5">
              {ROUTES.map((r) => (
                <li key={r.key}>
                  <Link
                    to={r.key}
                    className="text-[13px] text-muted transition-colors duration-200 hover:text-accent"
                  >
                    {r.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <span className="label text-[13px] text-subtle">说明</span>
            <ul className="mt-4 space-y-2.5 text-[13px] leading-relaxed text-muted">
              <li>参赛赛道：人工智能 + 数字文娱</li>
              <li>赛事：“澄迈杯”人工智能 + 创新创业大赛</li>
              <li>图片素材：参赛者本人实拍</li>
              <li>文化考据：官方与央媒公开报道</li>
              <li>AI 生成内容均已标注「AI 创作」</li>
            </ul>
          </div>
        </div>

        <div className="mt-14 border-t border-border pt-6 text-[12px] leading-relaxed text-subtle">
          <p>
            © 2026 一碗公道饭 · One Bowl of Fairness ｜ 本页所有美食照片均为参赛者本人拍摄，文献引用均已注明出处。
          </p>
          <p className="mt-1">第三方媒体报道仅作来源索引与外链跳转，不在站内转载、不二次剪辑。</p>
        </div>
      </div>
    </footer>
  );
}

/* ── 页面容器（为固定导航留出顶部空间） ────────────────── */

export function Page({ children, className }: { children: ReactNode; className?: string }) {
  return <main className={cn("animate-fade-in pt-16", className)}>{children}</main>;
}
