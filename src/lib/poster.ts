/**
 * 海报渲染：用真实照片 + 文案在 Canvas 上合成成品 PNG
 * 全部本地渲染，不依赖网络与第三方服务。
 * 视觉遵循 Apple Style：白底 + 墨黑字 + 苹果蓝强调，克制的圆角胶囊与细线，
 * 无渐变、无重阴影，全站统一单一无衬线字族。
 */

export interface PosterOptions {
  /** 底图地址（同源静态资源） */
  image: string;
  /** 主标题（常为一句公道话） */
  title: string;
  /** 副标题 / 文案正文 */
  body: string;
  /** 角标（方言词条 或 项目名） */
  corner?: string;
  /** 尺寸：小红书竖版 3:4 / 朋友圈方版 1:1 */
  size?: "3:4" | "1:1";
}

const W = 1080;

/* ---------- Apple 设计令牌：白底 / Apple 灰 / 墨黑 / 苹果蓝 ---------- */
const BG = "#FFFFFF"; // 背景
const INK = "#1D1D1F"; // 主文字
const MUTED = "#6E6E73"; // 次级文字
const SUBTLE = "#86868B"; // 三级文字
const BORDER = "#E8E8ED"; // 分隔线
const ACCENT = "#0071E3"; // 苹果蓝
const ACCENT_SOFT = "#EAF2FE"; // 苹果蓝浅底

/* 全站单一字族，海报与网页保持一致 */
const SANS =
  '-apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", "Helvetica Neue", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Noto Sans SC", Arial, sans-serif';

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("图片加载失败"));
    img.src = src;
  });
}

/** 等宽换行（中文按字符宽度近似切分） */
function wrap(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
  const lines: string[] = [];
  let line = "";
  for (const ch of text) {
    if (ch === "\n") {
      lines.push(line);
      line = "";
      continue;
    }
    const test = line + ch;
    if (ctx.measureText(test).width > maxWidth && line) {
      lines.push(line);
      line = ch;
    } else {
      line = test;
    }
  }
  if (line) lines.push(line);
  return lines;
}

/** 拉字距（现代浏览器支持；不支持则静默忽略） */
function setTracking(ctx: CanvasRenderingContext2D, value: string) {
  const c = ctx as CanvasRenderingContext2D & { letterSpacing?: string };
  if ("letterSpacing" in c) c.letterSpacing = value;
}

/** 圆角矩形路径（不依赖 ctx.roundRect 的浏览器支持） */
function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  const rr = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + rr, y);
  ctx.lineTo(x + w - rr, y);
  ctx.arcTo(x + w, y, x + w, y + rr, rr);
  ctx.lineTo(x + w, y + h - rr);
  ctx.arcTo(x + w, y + h, x + w - rr, y + h, rr);
  ctx.lineTo(x + rr, y + h);
  ctx.arcTo(x, y + h, x, y + h - rr, rr);
  ctx.lineTo(x, y + rr);
  ctx.arcTo(x, y, x + rr, y, rr);
  ctx.closePath();
}

export async function renderPoster(opts: PosterOptions): Promise<string> {
  const H = opts.size === "1:1" ? W : Math.round(W * (4 / 3));
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("无法创建画布");

  // 底色：纯白（Apple 白底）
  ctx.fillStyle = BG;
  ctx.fillRect(0, 0, W, H);

  // 照片区域（上部 56%），cover 裁切
  const imgH = Math.round(H * 0.56);
  try {
    const img = await loadImage(opts.image);
    const scale = Math.max(W / img.width, imgH / img.height);
    const dw = img.width * scale;
    const dh = img.height * scale;
    ctx.drawImage(img, (W - dw) / 2, (imgH - dh) / 2, dw, dh);
  } catch {
    ctx.fillStyle = BORDER;
    ctx.fillRect(0, 0, W, imgH);
  }

  const PAD = 96;

  // 主标题：统一无衬线 + 半粗，负字距
  setTracking(ctx, "-0.022em");
  ctx.fillStyle = INK;
  ctx.font = `600 58px ${SANS}`;
  const titleLines = wrap(ctx, opts.title, W - PAD * 2).slice(0, 2);
  // 标题默认可能被上一轮 tracking 影响，绘制后复位
  titleLines.forEach((l, i) => ctx.fillText(l, PAD, imgH + 132 + i * 76));
  setTracking(ctx, "0px");

  // 正文：无衬线 + 次级灰
  ctx.font = `400 30px ${SANS}`;
  ctx.fillStyle = MUTED;
  const bodyTop = imgH + 166 + titleLines.length * 76;
  const bodyLines = wrap(ctx, opts.body, W - PAD * 2).slice(0, 6);
  bodyLines.forEach((l, i) => ctx.fillText(l, PAD, bodyTop + i * 50));

  // 角标：Apple 胶囊（浅蓝底 + 苹果蓝字）
  if (opts.corner) {
    setTracking(ctx, "0.06em");
    ctx.font = `600 26px ${SANS}`;
    const label = opts.corner;
    const tw = ctx.measureText(label).width;
    const bw = tw + 64;
    const bh = 68;
    const bx = PAD;
    const by = H - 196;
    ctx.fillStyle = ACCENT_SOFT;
    roundRect(ctx, bx, by, bw, bh, bh / 2);
    ctx.fill();
    ctx.fillStyle = ACCENT;
    ctx.fillText(label, bx + 32, by + 45);
    setTracking(ctx, "0px");
  }

  // 页脚：Apple 细线 + 小字，右侧项目口号
  ctx.strokeStyle = BORDER;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(PAD, H - 100);
  ctx.lineTo(W - PAD, H - 100);
  ctx.stroke();

  ctx.font = `600 24px ${SANS}`;
  ctx.fillStyle = INK;
  ctx.fillText("一碗公道饭", PAD, H - 56);

  ctx.font = `400 24px ${SANS}`;
  ctx.fillStyle = SUBTLE;
  const leftW = ctx.measureText("一碗公道饭").width;
  ctx.fillText(" · 海南美食文化 AI 共创平台", PAD + leftW + 8, H - 56);

  ctx.textAlign = "right";
  ctx.fillStyle = MUTED;
  ctx.fillText("台风再大，大不过一锅公道", W - PAD, H - 56);
  ctx.textAlign = "left";

  return canvas.toDataURL("image/png");
}

export function downloadDataUrl(dataUrl: string, filename: string) {
  const a = document.createElement("a");
  a.href = dataUrl;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
}
