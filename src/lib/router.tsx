import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type AnchorHTMLAttributes,
  type ReactNode,
} from "react";

/**
 * 极简 hash 路由（零依赖）。
 * 支持 "#/story" 与带锚点定位 "#/ju|divide"（进入后滚动到对应区块）。
 */
export type RouteKey =
  | "home"
  | "ju"
  | "story"
  | "create"
  | "archive"
  | "ip"
  | "about";

export const ROUTES: { key: RouteKey; path: string; label: string; hint: string }[] = [
  { key: "home", path: "/", label: "首页", hint: "台风夜 · 一锅暖" },
  { key: "ju", path: "/ju", label: "AI 公道局", hint: "凑份子，做一场公道" },
  { key: "story", path: "/story", label: "AI 故事馆", hint: "百年公道 · 方言词条" },
  { key: "create", path: "/create", label: "AI 创作坊", hint: "一键生成海报文案" },
  { key: "archive", path: "/archive", label: "影像志", hint: "官方报道与采访索引" },
  { key: "ip", path: "/ip", label: "IP 矩阵", hint: "一杯咖啡的南洋之旅" },
  { key: "about", path: "/about", label: "关于项目", hint: "考据来源 · 参赛信息" },
];

interface RouterState {
  route: RouteKey;
  anchor: string | null;
  go: (route: RouteKey, anchor?: string) => void;
}

const RouterContext = createContext<RouterState>({
  route: "home",
  anchor: null,
  go: () => {},
});

function parseHash(): { route: RouteKey; anchor: string | null } {
  const raw = window.location.hash.replace(/^#/, "");
  if (!raw || raw === "/") return { route: "home", anchor: null };
  const [path, anchor] = raw.split("|");
  const found = ROUTES.find((r) => r.path === path);
  return { route: found ? found.key : "home", anchor: anchor ?? null };
}

export function RouterProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<{ route: RouteKey; anchor: string | null }>(() =>
    typeof window === "undefined" ? { route: "home", anchor: null } : parseHash(),
  );

  useEffect(() => {
    const onChange = () => setState(parseHash());
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);

  // 锚点定位（等目标区块渲染完成）
  useEffect(() => {
    if (!state.anchor) return;
    const t = window.setTimeout(() => {
      document.getElementById(state.anchor as string)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 120);
    return () => window.clearTimeout(t);
  }, [state]);

  const go = useCallback((route: RouteKey, anchor?: string) => {
    const found = ROUTES.find((r) => r.key === route);
    const path = found ? found.path : "/";
    const next = `#${path}${anchor ? `|${anchor}` : ""}`;
    if (window.location.hash === next) {
      if (anchor) document.getElementById(anchor)?.scrollIntoView({ behavior: "smooth" });
      else window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      window.location.hash = next;
    }
    if (!anchor) window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const value = useMemo<RouterState>(() => ({ ...state, go }), [state, go]);
  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>;
}

export function useRouter() {
  return useContext(RouterContext);
}

type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  to: RouteKey;
  anchor?: string;
};

export function Link({ to, anchor, children, onClick, ...rest }: LinkProps) {
  const { go } = useRouter();
  const found = ROUTES.find((r) => r.key === to);
  return (
    <a
      href={`#${found ? found.path : "/"}${anchor ? `|${anchor}` : ""}`}
      onClick={(e) => {
        e.preventDefault();
        onClick?.(e);
        go(to, anchor);
      }}
      {...rest}
    >
      {children}
    </a>
  );
}
