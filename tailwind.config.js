/** @type {import('tailwindcss').Config} */
/**
 * 一碗公道饭 · Apple 风格设计系统
 * ─────────────────────────────────────────────
 * 白底 #FFFFFF + Apple 灰 #F5F5F7 + 黑字 #1D1D1F + Apple 蓝 #0071E3 点缀。
 * 大留白、精致圆角、微妙阴影、无渐变、无场景插画。
 *
 * 字体只有一族：系统无衬线栈。serif 与 mono 同时指向同一栈，
 * 因此即使代码里残留 font-serif，渲染结果与 font-sans 完全一致 —— 字体不可能被"乱用"。
 *
 * 禁止：渐变、彩色语义色阶（blue-500 之类）、玻璃态当默认风格、
 *       回弹/弹性缓动、Inter / Roboto / Geist 字体。
 */
module.exports = {
  // 排除从未被引用的 shadcn/ui 原语目录，避免通用组件库的默认样式被扫描进产物 CSS。
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}', '!./src/components/ui/**'],
  theme: {
    extend: {
      fontFamily: {
        // 全站唯一字体族：系统无衬线（macOS 上即 SF Pro / 苹方）
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"SF Pro Text"',
          '"SF Pro Display"',
          '"Helvetica Neue"',
          '"PingFang SC"',
          '"Hiragino Sans GB"',
          '"Microsoft YaHei"',
          '"Noto Sans SC"',
          'Arial',
          'sans-serif',
        ],
      },
      colors: {
        background: 'hsl(var(--background) / <alpha-value>)', // #FFFFFF
        surface: 'hsl(var(--surface) / <alpha-value>)', // #F5F5F7 Apple 灰
        foreground: 'hsl(var(--foreground) / <alpha-value>)', // #1D1D1F
        muted: 'hsl(var(--muted) / <alpha-value>)', // #6E6E73 次级文字
        subtle: 'hsl(var(--subtle) / <alpha-value>)', // #86868B 辅助文字
        border: 'hsl(var(--border) / <alpha-value>)', // #E8E8ED 分隔线
        input: 'hsl(var(--border) / <alpha-value>)',
        ring: 'hsl(var(--accent) / <alpha-value>)',
        accent: {
          DEFAULT: 'hsl(var(--accent) / <alpha-value>)', // #0071E3
          dark: 'hsl(var(--accent-dark) / <alpha-value>)', // #0066CC hover
          soft: 'hsl(var(--accent) / 0.08)',
        },
        ink: {
          DEFAULT: 'hsl(var(--foreground) / <alpha-value>)',
          soft: 'hsl(var(--muted) / <alpha-value>)',
          mute: 'hsl(var(--subtle) / <alpha-value>)',
        },
        card: {
          DEFAULT: 'hsl(var(--background) / <alpha-value>)',
          foreground: 'hsl(var(--foreground) / <alpha-value>)',
        },
        popover: {
          DEFAULT: 'hsl(var(--background) / <alpha-value>)',
          foreground: 'hsl(var(--foreground) / <alpha-value>)',
        },
        primary: {
          DEFAULT: 'hsl(var(--accent) / <alpha-value>)',
          foreground: 'hsl(var(--background) / <alpha-value>)',
        },
        secondary: {
          DEFAULT: 'hsl(var(--surface) / <alpha-value>)',
          foreground: 'hsl(var(--foreground) / <alpha-value>)',
        },
        destructive: {
          DEFAULT: 'hsl(0 72% 51% / <alpha-value>)',
          foreground: 'hsl(0 0% 100% / <alpha-value>)',
        },
      },
      // Tailwind preflight 默认把无颜色的 border 渲染成冷灰 —— 显式覆盖为设计线色
      borderColor: {
        DEFAULT: 'hsl(var(--border))',
      },
      // 精致圆角（Apple 语言）
      borderRadius: {
        none: '0px',
        sm: '6px',
        DEFAULT: '8px',
        md: '10px',
        lg: '12px',
        xl: '16px',
        '2xl': '20px',
        '3xl': '28px',
        full: '9999px',
      },
      // 微妙阴影（无重投影）
      boxShadow: {
        none: 'none',
        sm: '0 1px 2px rgba(0, 0, 0, 0.04)',
        DEFAULT: '0 1px 3px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.04)',
        md: '0 4px 14px rgba(0, 0, 0, 0.06)',
        lg: '0 12px 32px rgba(0, 0, 0, 0.08)',
        xl: '0 20px 48px rgba(0, 0, 0, 0.10)',
        '2xl': '0 28px 64px rgba(0, 0, 0, 0.12)',
        inner: 'inset 0 1px 2px rgba(0, 0, 0, 0.05)',
      },
      maxWidth: {
        prose: '42rem',
        shell: '1120px',
      },
      // 平滑收敛：无回弹、无弹性
      transitionTimingFunction: {
        DEFAULT: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
        apple: 'cubic-bezier(0.22, 1, 0.36, 1)',
        out: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      transitionDuration: {
        1000: '1000ms',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'caret-blink': {
          '0%,70%,100%': { opacity: '1' },
          '20%,50%': { opacity: '0' },
        },
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(14px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'caret-blink': 'caret-blink 1.2s ease-out infinite',
        'fade-up': 'fade-up 0.6s cubic-bezier(0.22, 1, 0.36, 1) both',
        'fade-in': 'fade-in 0.5s ease-out both',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
