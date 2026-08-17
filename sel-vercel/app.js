const SITUATIONS = [
  { id: "conflict", label: "갈등·다툼이 생겼을 때", icon: "⚡" },
  { id: "quiet", label: "조용히 집중해야 할 때(자습)", icon: "🌙" },
  { id: "before-home", label: "하교 전 정리 시간", icon: "🎒" },
  { id: "after-break", label: "쉬는시간 직후, 산만할 때", icon: "🌀" },
  { id: "before-class", label: "수업 시작 전, 분위기 전환", icon: "🔔" },
  { id: "group-start", label: "모둠활동 시작 전", icon: "🤝" },
  { id: "before-test", label: "시험·평가 전후", icon: "📝" },
  { id: "before-present", label: "발표 전, 긴장될 때", icon: "🎤" },
  { id: "rainy", label: "우천으로 교실에만 있어야 할 때", icon: "🌧️" },
  { id: "special-day", label: "명절·특별한 날", icon: "🎉" },
  { id: "new-semester", label: "새 학기·새 학년 첫날 (라포 형성)", icon: "🌱" },
  { id: "exclusion", label: "따돌림·소외 조짐이 보일 때", icon: "🫂" },
  { id: "birthday", label: "친구 생일 등 축하할 일이 있을 때", icon: "🎂" },
  { id: "rule-reset", label: "학급 규칙을 다시 세워야 할 때", icon: "📏" },
  { id: "field-trip", label: "현장학습·체험학습 전후", icon: "🚌" },
  { id: "teachers-day", label: "스승의 날 등 감사 표현이 필요한 날", icon: "🌷" },
  { id: "event-prep", label: "학예회·행사 준비 기간", icon: "🎭" },
  { id: "election", label: "학급 임원 선거·역할 정하기", icon: "🗳️" },
  { id: "online-conflict", label: "SNS·스마트폰 사용 관련 갈등", icon: "📱" },
  { id: "semester-end", label: "학기말 마무리·이별 준비", icon: "👋" },
];

const DOMAINS = [
  {
    id: "self-awareness",
    label: "자기인식",
    color: "#B23A2E",
    subskills: [
      "감정 인식(식별)", "정확한 자기지각", "강점 인식", "자신감·자기효능감",
      "가치관·목적의식", "자기존중", "성장 마인드셋", "정직성·진실성",
      "개인적·문화적 정체성 이해", "편견과 편향성 살펴보기",
    ],
  },
  {
    id: "self-management",
    label: "자기관리",
    color: "#E3A23B",
    subskills: [
      "감정조절", "스트레스 관리", "자기동기부여", "목표설정", "조직화 기술(계획·정리)",
      "충동조절·자기통제", "인내심(그릿)", "주도적으로 행동하는 용기", "집단적 주체성",
    ],
  },
  {
    id: "social-awareness",
    label: "사회적 인식",
    color: "#5B7B4F",
    subskills: [
      "타인의 관점 취하기(공감)", "타인의 강점 인식하기", "공감과 연민 나타내기",
      "감사 이해·표현하기", "다양성 존중·포용", "사회적 신호·규범 인식",
      "상황별 요구·기회 인식", "조직·제도의 영향 이해",
    ],
  },
  {
    id: "relationship",
    label: "관계기술",
    color: "#3E6B8A",
    subskills: [
      "효과적인 의사소통·경청", "팀워크·협력적 문제해결", "건설적 갈등해결",
      "부정적 사회압력에 저항하기", "자원과 도움 구하기·제공하기", "사회적 유대감·우정 형성",
      "리더십 발휘하기", "타인의 권리 옹호하기", "문화적 역량 발휘하기",
    ],
  },
  {
    id: "decision-making",
    label: "책임있는 의사결정",
    color: "#7A5C9E",
    subskills: [
      "문제 인식 및 분석", "대안 탐색 및 평가", "윤리적 기준·사회적 책임",
      "결과 예측 및 성찰", "호기심과 개방성", "정보·데이터의 합리적 판단",
      "비판적 사고 기술", "개인·대인관계·공동체·제도에 미치는 영향 평가",
    ],
  },
];

const GRADE_GROUPS = ["저학년(1-2)", "중학년(3-4)", "고학년(5-6)"];
const DURATIONS = ["1-3분(짧게)", "5-10분", "10-20분(길게)"];
const FORMATS = ["개별", "짝", "모둠", "전체"];
const STYLES = [
  { id: "new", label: "새로 창작하기" },
  { id: "remix", label: "기존에 잘 아는 놀이 변형하기 (마피아·무궁화꽃이피었습니다·빙고 등)" },
];
const LOADING_MESSAGES = ["오늘의 재료를 다듬는 중...", "알맞은 그릇에 담는 중...", "간을 맞추는 중...", "상을 차리는 중..."];

// 동양고전 한마디 - 원문·출처가 확인된 문구만 고정으로 수록 (AI가 임의 생성하지 않음)
const CLASSICS = {
  "self-awareness": [
    { hanja: "溫故而知新 可以爲師矣", meaning: "옛것을 익히고 새것을 알면, 스승이 될 수 있다.", source: "논어 위정편" },
    { hanja: "知之者不如好之者 好之者不如樂之者", meaning: "아는 것은 좋아하는 것만 못하고, 좋아하는 것은 즐기는 것만 못하다.", source: "논어 옹야편" },
    { hanja: "誠者 天之道也 誠之者 人之道也", meaning: "성실함은 하늘의 도(道)요, 성실해지려 노력하는 것은 사람의 도이다.", source: "중용" },
    { hanja: "人不知而不慍 不亦君子乎", meaning: "남이 알아주지 않아도 성내지 않으면, 군자답지 아니한가.", source: "논어 학이편" },
  ],
  "self-management": [
    { hanja: "苟日新 日日新 又日新", meaning: "진실로 하루가 새로워지면 날마다 새로워지고, 또 날로 새로워진다.", source: "대학" },
    { hanja: "過而不改 是謂過矣", meaning: "잘못하고서 고치지 않는 것, 이것을 진짜 잘못이라 한다.", source: "논어 위령공편" },
    { hanja: "君子 素其位而行 不願乎其外", meaning: "군자는 지금 자기 처지에 맞게 행동하고, 그 밖의 것을 바라지 않는다.", source: "중용" },
    { hanja: "生於憂患而死於安樂", meaning: "근심과 어려움 속에서 살아나고, 안락함에 안주하면 죽는다.", source: "맹자 고자하" },
  ],
  "social-awareness": [
    { hanja: "惻隱之心 仁之端也", meaning: "측은히 여기는 마음이, 어짊(仁)의 실마리이다.", source: "맹자 공손추상" },
    { hanja: "見善如渴 聞惡如聾", meaning: "선한 일을 보거든 목마른 사람처럼 하고, 나쁜 일을 듣거든 귀먹은 사람처럼 하라.", source: "명심보감 계선편" },
    { hanja: "德不孤 必有隣", meaning: "덕은 외롭지 않다, 반드시 함께하는 이웃이 있다.", source: "논어 이인편" },
    { hanja: "一日不念善 諸惡皆自起", meaning: "하루라도 선한 생각을 하지 않으면, 온갖 나쁜 마음이 저절로 일어난다.", source: "명심보감 계선편" },
  ],
  relationship: [
    { hanja: "己所不欲 勿施於人", meaning: "내가 원하지 않는 일을, 남에게 시키지 말라.", source: "논어 위령공편" },
    { hanja: "三人行 必有我師焉", meaning: "세 사람이 함께 길을 가면, 그 중에 반드시 나의 스승이 있다.", source: "논어 술이편" },
    { hanja: "君子和而不同 小人同而不和", meaning: "군자는 화합하되 같아지지 않고, 소인은 같아지되 화합하지 못한다.", source: "논어 자로편" },
    { hanja: "天時不如地利 地利不如人和", meaning: "하늘이 준 때는 땅의 이로움만 못하고, 땅의 이로움은 사람의 화합만 못하다.", source: "맹자 공손추하" },
  ],
  "decision-making": [
    { hanja: "勿以惡小而爲之 勿以善小而不爲", meaning: "나쁜 일이 작다고 행하지 말고, 좋은 일이 작다고 안 하지 말라.", source: "명심보감 계선편" },
    { hanja: "施恩勿求報 與人勿追悔", meaning: "은혜를 베풀었으면 보답을 구하지 말고, 남에게 주었으면 후회하지 말라.", source: "명심보감 계선편" },
    { hanja: "自天子以至於庶人 壹是皆以修身爲本", meaning: "누구든 자기 자신을 갈고닦는 것을 모든 일의 근본으로 삼는다.", source: "대학" },
    { hanja: "學而不思則罔 思而不學則殆", meaning: "배우기만 하고 생각하지 않으면 얻는 게 없고, 생각만 하고 배우지 않으면 위태롭다.", source: "논어 위정편" },
  ],
};

// 이번 세션에서 이미 나온 것들 (중복 방지용)
let usedActivityNames = [];
let usedQuestions = [];
let usedClassicKeys = [];
let currentWorksheetData = null;

function pickClassicQuote(domainId) {
  const pool = CLASSICS[domainId] || [];
  let candidates = pool.filter((q) => !usedClassicKeys.includes(q.hanja));
  if (candidates.length === 0) {
    // 다 썼으면 이 영역 것만 리셋
    usedClassicKeys = usedClassicKeys.filter((k) => !pool.some((q) => q.hanja === k));
    candidates = pool;
  }
  const picked = candidates[Math.floor(Math.random() * candidates.length)];
  if (picked) usedClassicKeys.push(picked.hanja);
  return picked;
}

let state = {
  situation: SITUATIONS[0].id,
  domain: DOMAINS[0].id,
  subskill: DOMAINS[0].subskills[0],
  grade: GRADE_GROUPS[2],
  duration: DURATIONS[1],
  format: FORMATS[2],
  style: STYLES[0].id,
};

function $(id) { return document.getElementById(id); }

function renderSituations() {
  const row = $("situationRow");
  row.innerHTML = "";
  SITUATIONS.forEach((s) => {
    const btn = document.createElement("button");
    btn.className = "chip" + (state.situation === s.id ? " active-situation" : "");
    btn.textContent = `${s.icon} ${s.label}`;
    btn.onclick = () => { state.situation = s.id; renderSituations(); };
    row.appendChild(btn);
  });
}

function renderDomains() {
  const row = $("domainRow");
  row.innerHTML = "";
  DOMAINS.forEach((d) => {
    const btn = document.createElement("button");
    btn.className = "chip";
    const active = state.domain === d.id;
    btn.style.borderColor = d.color;
    btn.style.color = active ? "#FFF9F2" : d.color;
    btn.style.background = active ? d.color : "#FBF9F6";
    btn.textContent = d.label;
    btn.onclick = () => {
      state.domain = d.id;
      state.subskill = d.subskills[0];
      renderDomains();
      renderSubskills();
    };
    row.appendChild(btn);
  });
}

function currentDomain() { return DOMAINS.find((d) => d.id === state.domain); }

function renderSubskills() {
  const sel = $("subskillSelect");
  sel.innerHTML = "";
  currentDomain().subskills.forEach((s) => {
    const opt = document.createElement("option");
    opt.value = s; opt.textContent = s;
    sel.appendChild(opt);
  });
  sel.value = state.subskill;
  sel.onchange = () => { state.subskill = sel.value; };
}

function fillSelect(id, arr, current, onChange, labelFn) {
  const sel = $(id);
  sel.innerHTML = "";
  arr.forEach((v) => {
    const opt = document.createElement("option");
    const value = typeof v === "object" ? v.id : v;
    const label = labelFn ? labelFn(v) : v;
    opt.value = value; opt.textContent = label;
    sel.appendChild(opt);
  });
  sel.value = current;
  sel.onchange = () => onChange(sel.value);
}

function init() {
  renderSituations();
  renderDomains();
  renderSubskills();
  fillSelect("gradeSelect", GRADE_GROUPS, state.grade, (v) => (state.grade = v));
  fillSelect("durationSelect", DURATIONS, state.duration, (v) => (state.duration = v));
  fillSelect("formatSelect", FORMATS, state.format, (v) => (state.format = v));
  fillSelect("styleSelect", STYLES, state.style, (v) => (state.style = v), (v) => v.label);
  $("serveBtn").onclick = handleGenerate;
  $("worksheetBtn").onclick = downloadWorksheet;
}

async function handleGenerate() {
  const btn = $("serveBtn");
  const errorBox = $("errorBox");
  const tray = $("tray");
  errorBox.style.display = "none";
  tray.style.display = "none";
  btn.disabled = true;

  let msgIdx = 0;
  btn.textContent = LOADING_MESSAGES[0];
  const timer = setInterval(() => {
    msgIdx = (msgIdx + 1) % LOADING_MESSAGES.length;
    btn.textContent = LOADING_MESSAGES[msgIdx];
  }, 1400);

  try {
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        situationLabel: SITUATIONS.find((s) => s.id === state.situation).label,
        domainLabel: currentDomain().label,
        subskill: state.subskill,
        grade: state.grade,
        duration: state.duration,
        format: state.format,
        style: state.style,
        excludeActivities: usedActivityNames.slice(-15),
        excludeQuestions: usedQuestions.slice(-20),
      }),
    });
    if (!res.ok) {
      let detail = "";
      try {
        const errJson = await res.json();
        detail = errJson.error ? `${errJson.error}${errJson.detail ? " (" + errJson.detail + ")" : ""}` : "";
      } catch (e2) {}
      throw new Error(detail || "서버 오류");
    }
    const result = await res.json();

    usedActivityNames.push(result.activity_name);
    usedQuestions.push(result.question_free, result.question_sel);

    const classic = pickClassicQuote(state.domain);
    renderResult(result, classic);
  } catch (e) {
    errorBox.textContent = "메뉴를 만드는 데 실패했어요: " + e.message;
    errorBox.style.display = "block";
  } finally {
    clearInterval(timer);
    btn.disabled = false;
    btn.textContent = "🍚 오늘의 상 차려주세요";
  }
}

function renderResult(result, classic) {
  const d = currentDomain();
  const situationLabel = SITUATIONS.find((s) => s.id === state.situation).label;

  $("trayTitle").textContent = `오늘의 상차림 · ${situationLabel} · ${d.label}(${state.subskill})`;
  $("activityTimeLabel").textContent = `오늘의 놀이 · ${result.activity_time || ""}`;
  $("activityTimeLabel").style.color = d.color;
  $("activityName").textContent = result.activity_name || "";

  const stepsEl = $("activitySteps");
  stepsEl.innerHTML = "";
  (result.activity_steps || []).forEach((step) => {
    const li = document.createElement("li");
    li.textContent = step;
    stepsEl.appendChild(li);
  });

  $("funPoint").textContent = result.fun_point || "";
  $("reflectionPoint").textContent = result.reflection_point || "";

  $("questionFree").textContent = result.question_free || "";
  $("questionSelLabel").textContent = `🍲 오늘의 질문 (${d.label})`;
  $("questionSelLabel").style.color = d.color;
  $("questionSel").textContent = result.question_sel || "";
  $("quote").textContent = result.quote ? `🍵 “${result.quote}”` : "";

  if (classic) {
    currentWorksheetData = classic;
    $("classicHanja").textContent = classic.hanja;
    $("classicMeaning").textContent = classic.meaning;
    $("classicSource").textContent = `— ${classic.source}`;
    $("classicCard").style.display = "block";
  } else {
    $("classicCard").style.display = "none";
  }

  $("tray").style.display = "block";
  $("tray").scrollIntoView({ behavior: "smooth", block: "start" });
}

function downloadWorksheet() {
  if (!currentWorksheetData) return;
  const { hanja, meaning, source } = currentWorksheetData;
  const win = window.open("", "_blank");
  const traceRows = Array.from({ length: 4 })
    .map(
      () =>
        `<div class="trace-row"><span class="trace-text">${hanja}</span></div>`
    )
    .join("");
  win.document.write(`<!DOCTYPE html>
<html lang="ko"><head><meta charset="UTF-8"><title>따라쓰기 학습지</title>
<style>
  body { font-family: 'Noto Serif KR', serif; padding: 40px; color: #222; }
  h1 { font-size: 20px; margin-bottom: 4px; }
  .meta { font-size: 13px; color: #666; margin-bottom: 28px; }
  .meaning { font-size: 16px; margin-bottom: 28px; line-height: 1.6; }
  .trace-row { border: 1px solid #bbb; border-radius: 6px; height: 70px; margin-bottom: 14px;
               display: flex; align-items: center; padding: 0 16px; }
  .trace-text { font-size: 28px; letter-spacing: 4px; color: #d8d8d8; font-weight: 700; }
  .trace-row:first-child .trace-text { color: #333; }
  .blank-row { border: 1px solid #ddd; border-radius: 6px; height: 70px; margin-bottom: 14px; }
  .print-btn { margin-top: 24px; padding: 10px 20px; font-size: 14px; cursor: pointer; }
  @media print { .print-btn { display: none; } }
</style></head>
<body>
  <h1>사회정서 한마디 따라쓰기</h1>
  <div class="meta">${source}</div>
  <div class="meaning">${meaning}</div>
  ${traceRows}
  <div class="blank-row"></div>
  <div class="blank-row"></div>
  <button class="print-btn" onclick="window.print()">인쇄 / PDF로 저장하기</button>
</body></html>`);
  win.document.close();
}

init();
