import { HEAD_LINES, KNOWLEDGE, type QAPair } from "@/data/content";

/**
 * AI 公道头对话通道。
 * - 默认走本地考据语料兜底（断网/无 Key 也能完整演示，路演保险）
 * - 若用户在本机填入 DeepSeek API Key，则切换为真·大模型实时生成
 *   Key 仅存于浏览器 localStorage，仅用于本地演示，不会写入代码仓库或上传。
 */

const KEY_STORAGE = "fairbowl-deepseek-key";

export type ChatRole = "system" | "user" | "assistant";
export interface ChatMsg {
  role: ChatRole;
  content: string;
}

export function getKey(): string {
  if (typeof window === "undefined") return "";
  return window.localStorage.getItem(KEY_STORAGE) ?? "";
}

export function setKey(key: string) {
  if (key.trim()) window.localStorage.setItem(KEY_STORAGE, key.trim());
  else window.localStorage.removeItem(KEY_STORAGE);
}

export const HEAD_SYSTEM_PROMPT = `你是海南琼海公道饭里的“公道头”，一位上了年纪、话不多但极讲规矩的乡村长者，正在主持一场公道饭。

说话要求：
1. 用普通话，可在一两处点缀海南话语气词（如“落雨唛”“食饱未”），点到为止，不整段方言。
2. 语气苍老、温厚、简短，每次回答不超过 120 字，先给结论再补一句缘由。
3. 你的口头规矩是“做的不取，取的不做”。

事实红线（极重要）：
- 只能依据下面的资料回答，禁止编造人物、年代、数据、菜谱或方言读音。
- 资料没有的内容，就坦白说“这个我不晓得，别乱讲，坏了公道的名声”，并建议去「影像志」查官方报道。
- 不把公道饭说成餐厅、外卖或生意，它是琼海乡村凑份合买、均分而食的共食习俗。

资料：
${KNOWLEDGE.map((k) => `Q${k.keys[0]}：${k.a}`).join("\n")}
补充：方言词条——杯贡（饭团）、杯匹（锅巴）、shou（蘸料，与“兽”同音）、三鸟（鸡鸭鹅统称）、公道头（主持人）。`;

/* ── 本地语料检索 ─────────────────────────────────────── */

function score(pair: QAPair, q: string): number {
  const s = q.toLowerCase();
  return pair.keys.reduce((acc, k) => (s.includes(k.toLowerCase()) ? acc + k.length : acc), 0);
}

export function answerLocally(question: string): string {
  const q = question.trim();
  if (!q) return HEAD_LINES.open;
  const ranked = [...KNOWLEDGE].map((p) => ({ p, s: score(p, q) })).sort((a, b) => b.s - a.s);
  if (ranked[0] && ranked[0].s > 0) return ranked[0].p.a;
  return (
    "这个我不晓得，别乱讲，坏了公道的名声。\n\n" +
    "你要问的，若是三鸟、杯贡、杯匹、shou、公道头、台风天，或者澄迈的福山咖啡、瑞溪三宝，我都可以讲一讲——" +
    "别的，去「影像志」里看官方的报道，那才是能拿给人看的说法。"
  );
}

/* ── 远程调用（可选） ─────────────────────────────────── */

export async function askHead(
  question: string,
  history: ChatMsg[],
): Promise<{ text: string; source: "deepseek" | "local" }> {
  const key = getKey();
  if (!key) return { text: answerLocally(question), source: "local" };

  try {
    const res = await fetch("https://api.deepseek.com/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
      body: JSON.stringify({
        model: "deepseek-chat",
        temperature: 0.7,
        max_tokens: 400,
        messages: [
          { role: "system", content: HEAD_SYSTEM_PROMPT },
          ...history.slice(-6),
          { role: "user", content: question },
        ],
      }),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = (await res.json()) as { choices?: { message?: { content?: string } }[] };
    const text = data.choices?.[0]?.message?.content?.trim();
    if (!text) throw new Error("empty response");
    return { text, source: "deepseek" };
  } catch {
    return {
      text: answerLocally(question) + "\n\n（网络没通，我先用本地的老账本答你。）",
      source: "local",
    };
  }
}
