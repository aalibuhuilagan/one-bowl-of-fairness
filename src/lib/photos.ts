/**
 * 真实素材清单（对应《素材管理台账》S01–S05，全部为参赛者本人实拍）
 * 页面统一通过 photo() 取路径；路径分段编码，避免中文/特殊字符在 URL 中出问题。
 */

export interface Photo {
  /** 台账编号，如 S01b1-12 */
  id: string;
  /** 原始文件名（保留中文，便于与素材库一一对应） */
  file: string;
  /** 所属素材目录 */
  dir: PhotoKey;
  title: string;
  /** 一句话画面说明，用于图注（真实第一准则：图注只描述画面，不编造情节） */
  caption: string;
  /** 是否建议裁切后使用（如含他人肖像/字幕） */
  needsCrop?: boolean;
}

const DIR = {
  chicken: "文昌鸡",
  duckBoiled: "嘉积鸭/白斩",
  duckRoast: "嘉积鸭/烤制",
  gooseBoiled: "温泉鹅/白斩",
  gooseRoast: "温泉鹅/烤制",
  riceBall: "杯贡饭团",
  plating: "摆盘场景",
  dip: "蘸料",
  crust: "锅巴",
  live: "三鸟活体",
  ipMascot: "IP公道仔",
};

export type PhotoKey = keyof typeof DIR;

export function photo(dir: PhotoKey, file: string): string {
  // 注意：目录名不能叫 assets —— Vite 的打包目录就是 dist/assets，会撞在一起
  const segs = ["media", DIR[dir], file].join("/").split("/");
  return "/" + segs.map((s) => encodeURIComponent(s)).join("/");
}

/* ── 三鸟活体（“今晚做哪只”选择环节用，S12） ─────────────── */

export const LIVE_SHOTS: Photo[] = [
  {
    id: "S12-01",
    file: "S12-01_三鸟_文昌鸡活体.jpg",
    dir: "live",
    title: "文昌鸡 · 活体",
    caption: "橙红羽毛、黑绿尾羽的文昌鸡群，个体不大、身圆脚矮。",
  },
  {
    id: "S12-02",
    file: "S12-02_三鸟_嘉积鸭活体.jpg",
    dir: "live",
    title: "嘉积鸭 · 活体",
    caption: "俗称番鸭：白羽带黑斑、红冠黄蹼，形体扁平。",
  },
  {
    id: "S12-03",
    file: "S12-03_三鸟_温泉鹅活体.jpg",
    dir: "live",
    title: "温泉鹅 · 活体",
    caption: "万泉河沿岸散养的本地杂交鹅，白羽、橙喙、红蹼。",
  },
];

/* ── 精选主图（各页面复用，避免散落字符串） ───────────────── */

export const HERO_SHOTS: Photo[] = [
  {
    id: "S01b1-12",
    file: "S01b1-12_嘉积鸭_白斩_四盆均分俯拍.jpg",
    dir: "duckBoiled",
    title: "一只鸭，分成四盆",
    caption: "白斩嘉积鸭斩件后按人头分盆，是最直观的“公道”。",
  },
  {
    id: "S01c1-03",
    file: "S01c1-03_温泉鹅_白斩_斩件分碗.jpg",
    dir: "gooseBoiled",
    title: "十几只碗，一人一份",
    caption: "白斩温泉鹅斩件后分装成小碗，碗数就是人数。",
  },
  {
    id: "S02-01",
    file: "S02-01_杯贡饭团_芭蕉叶围边全景.jpg",
    dir: "riceBall",
    title: "杯贡，围成一圈",
    caption: "鸭汤煮饭捏成球形饭团，琼海话叫“杯贡”，沿芭蕉叶围成一圈。",
  },
  {
    id: "S05-02",
    file: "S05-02_锅巴_起锅盛盘金黄整块.jpg",
    dir: "crust",
    title: "一锅只出一片：杯匹",
    caption: "大铁锅炕出的整片锅巴，琼海话叫“杯匹”，浇猪油撒盐，起锅即食。",
  },
];

export const PLATING_SHOTS: Photo[] = [
  {
    id: "S04-01",
    file: "S04-01_芭蕉叶摆盘_饭团围边鸭肉全景.jpg",
    dir: "plating",
    title: "芭蕉叶上的团圆",
    caption: "斩件肉居中、饭团围边，旁边是蘸料锅与装饭团的竹篮。",
  },
  {
    id: "S04-02",
    file: "S04-02_芭蕉叶摆盘_竹篮取饭团.jpg",
    dir: "plating",
    title: "分饭团的手",
    caption: "戴手套从竹篮里取饭团，一个一个放到芭蕉叶上。",
  },
  {
    id: "S04-03",
    file: "S04-03_芭蕉叶摆盘_竹簸箕俯拍.jpg",
    dir: "plating",
    title: "竹簸箕上的公道",
    caption: "竹簸箕垫芭蕉叶，肉与饭团各占一半，是最经典的摆盘。",
  },
  {
    id: "S04-04",
    file: "S04-04_芭蕉叶摆盘_文昌鸡香芋饭团.jpg",
    dir: "plating",
    title: "红托盘 · 白斩鸡",
    caption: "金皮白斩文昌鸡配香芋、香菜与袋装饭团。",
  },
];

/* ── 蘸料（琼海话 "shou"） ────────────────────────────── */

export const DIP_SHOTS: Photo[] = [
  {
    id: "S03-01",
    file: "S03-01_蘸料_六碗一人一份带字标.jpg",
    dir: "dip",
    title: "一人一碗，谁也不多",
    caption: "托盘上六碗蘸料并排，画面字幕原文：“匠心秘制灵魂蘸酱 / 还原地道琼海本味”。",
  },
  {
    id: "S03-02",
    file: "S03-02_蘸料_白盘鸭肉配四碗蘸料.jpg",
    dir: "dip",
    title: "一盘鸭，四碗 shou",
    caption: "白盘白斩鸭配四碗蘸料，蒜蓉、辣椒、青桔各有配比。",
  },
  {
    id: "S03-04",
    file: "S03-04_蘸料_大锅舀蒜蓉蘸料.jpg",
    dir: "dip",
    title: "从大锅里分碗",
    caption: "蘸料先在大锅里调好，再一勺一勺分进小碗——和分肉同一个“公道”逻辑。",
  },
  {
    id: "S03-06",
    file: "S03-06_蘸料_浇淋打包份.jpg",
    dir: "dip",
    title: "浇上 shou，一份就打包好了",
    caption: "大勺把蒜蓉辣椒蘸料浇在套袋打包盒的斩件鸭肉与鸭血上——带走的那一份，也是分好的。",
  },
];

export const CRUST_SHOTS = [  {
    id: "S05-05",
    file: "S05-05_锅巴_浇猪油.jpg",
    caption: "字幕原文：“把猪油均匀浇上去”",
  },
  {
    id: "S05-03",
    file: "S05-03_锅巴_撒盐均匀.jpg",
    caption: "字幕原文：“接着又把盐均匀浇上去”",
  },
  {
    id: "S05-04",
    file: "S05-04_锅巴_起锅前整片.jpg",
    caption: "字幕原文：“起锅”——整片饭焦即将离锅",
  },
].map((s) => ({ ...s, dir: "crust" as const }));

/* ── 故事馆 · 编年史所用图片 ────────────────────────────── */

export const STORY_SHOTS = {
  hangingDuck: { dir: "duckBoiled" as const, file: "S01b1-01_嘉积鸭_白斩_挂鸭.jpg" },
  openingDuck: { dir: "duckBoiled" as const, file: "S01b1-03_嘉积鸭_白斩_开边分肉.jpg" },
  choppingDuck: { dir: "duckBoiled" as const, file: "S01b1-06_嘉积鸭_白斩_斩件特写.jpg" },
  dipping: { dir: "duckBoiled" as const, file: "S01b1-07_嘉积鸭_白斩_金桔蘸水浇汁.jpg" },
  bowls: { dir: "duckBoiled" as const, file: "S01b1-10_嘉积鸭_白斩_分骨架配蘸水碗.jpg" },
  gooseGeo: { dir: "gooseBoiled" as const, file: "S01c1-07_温泉鹅_白斩_白切摆盘字标.jpg" },
  goosePot: { dir: "gooseBoiled" as const, file: "S01c1-08_温泉鹅_白斩_吊鹅出锅.jpg" },
  gooseSauce: { dir: "gooseBoiled" as const, file: "S01c1-09_温泉鹅_白斩_簸箕装盘配三碗蘸料.jpg" },
  chickenWhole: { dir: "chicken" as const, file: "S01a-01_文昌鸡_白斩整只.jpg" },
  chickenCut: { dir: "chicken" as const, file: "S01a-02_文昌鸡_斩件摆盘.jpg" },
  roastGoose: { dir: "gooseRoast" as const, file: "S01c2-05_温泉鹅_烤制_温泉烧鹅簸箕装盘.jpg" },
  roastGooseHang: { dir: "gooseRoast" as const, file: "S01c2-01_温泉鹅_烤制_挂炉烧鹅字标.jpg" },
  roastDuck: { dir: "duckRoast" as const, file: "S01b2-07_嘉积鸭_烤制_鸭腿饭特写.jpg" },
  roastDuckSign: { dir: "duckRoast" as const, file: "S01b2-05_嘉积鸭_烤制_琼海烤鸭公道字标.jpg" },
  roastDuckPlatter: { dir: "duckRoast" as const, file: "S01b2-08_嘉积鸭_烤制_公道餐全景.jpg" },
  crustPlate: { dir: "crust" as const, file: "S05-02_锅巴_起锅盛盘金黄整块.jpg" },
};
