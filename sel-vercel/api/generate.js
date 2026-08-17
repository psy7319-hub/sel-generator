// Vercel Serverless Function: Gemini API를 서버 쪽에서 안전하게 호출합니다.
// API 키는 클라이언트(브라우저)에 절대 노출되지 않고, Vercel 환경변수(GEMINI_API_KEY)에서만 읽습니다.
// 무료 등급(free tier) 모델을 사용합니다. 모델명은 구글이 종종 바꾸니, 아래 GEMINI_MODEL 한 줄만 바꾸면 됩니다.
// 현재 사용 가능한 모델 목록: https://ai.google.dev/gemini-api/docs/models
const GEMINI_MODEL = "gemini-2.5-flash";

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method Not Allowed" });
    return;
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    res.status(500).json({ error: "서버에 GEMINI_API_KEY 환경변수가 설정되어 있지 않아요." });
    return;
  }

  const { situationLabel, domainLabel, subskill, grade, duration, format, style, excludeActivities, excludeQuestions } = req.body || {};

  const styleInstruction =
    style === "remix"
      ? `이 놀이는 마피아, 무궁화꽃이피었습니다, 빙고, 네 귀퉁이, 술래잡기, 의자뺏기, 눈치게임, 가위바위보, 인간 매듭 풀기, 김밥말아이동 같이 한국 초등학생들에게 이미 익숙한 놀이 하나를 골라, 거기에 지정된 SEL 하위기술 요소(질문, 역할, 규칙 변형 등)를 자연스럽게 녹여 재구성하는 방식으로 만들어줘. 원래 놀이 이름과 무엇을 어떻게 변형했는지 activity_name에 드러나게 해줘 (예: "SEL 무궁화꽃이 피었습니다 - 감정판").`
      : `완전히 새로운 놀이를 창작해줘. 기존 놀이를 그대로 가져오지 말고, 지정된 상황과 하위기술에 꼭 맞는 독창적인 활동으로 설계해줘.`;

  const excludeInstruction =
    (excludeActivities && excludeActivities.length) || (excludeQuestions && excludeQuestions.length)
      ? `\n[중복 금지] 아래 목록은 이 선생님에게 이미 보여준 놀이 이름·질문이야. 이것들과 겹치거나 아주 비슷한 것은 절대 다시 만들지 말고, 완전히 새로운 것으로 만들어줘.\n- 이미 사용된 놀이 이름: ${(excludeActivities || []).join(" / ") || "없음"}\n- 이미 사용된 질문: ${(excludeQuestions || []).join(" / ") || "없음"}\n`
      : "";

  const prompt = `너는 대한민국 초등학교의 사회정서학습(SEL, CASEL 5영역 기준) 전문 교사 콘텐츠 기획자야. 나승빈, 김양수 선생님류의 실천 중심 학급놀이 자료처럼, 방법이 구체적이고 교실에서 바로 쓸 수 있는 놀이를 만드는 게 목표야.
아래 조건에 딱 맞는 학급 놀이 1개와 질문 2개를 만들어줘.

[조건]
- 교실 상황: ${situationLabel}
- SEL 영역: ${domainLabel}
- 하위기술: ${subskill}
- 학년군: ${grade}
- 소요시간: ${duration}
- 활동형태: ${format}

[놀이 스타일]
${styleInstruction}
${excludeInstruction}
[요구사항]
1. 놀이는 위 조건(특히 교실 상황과 소요시간, 활동형태)에 실제로 바로 쓸 수 있게 구체적인 진행 단계(3~5단계)로 작성.
2. fun_point(재미포인트): 아이들이 이 놀이를 왜 재미있어할지 한 문장으로.
3. reflection_point(감동포인트/성찰): 이 놀이를 마친 뒤 아이들 마음속에 남을 정서적 여운이나 깨달음을 한 문장으로.
4. 질문은 2개: (a) 가볍게 답할 수 있는 자유질문, (b) 지정된 SEL 영역·하위기술과 직접 연결된 성찰 질문. 초등학교 고학년 학생 수준에 맞게 작성하되, 학년군이 저/중학년이면 그에 맞게 쉽게 조정.
5. "오늘의 한마디"는 상황과 영역에 어울리는 짧은 격언이나 문구를 새로 창작(기존 유명 문구를 그대로 인용하지 말 것).
6. 모든 문장은 초등학생이 이해할 수 있는 쉬운 한국어로.

아래 JSON 스키마에 맞춰 응답해줘:
{
  "activity_name": "놀이 이름",
  "activity_time": "예상 소요시간",
  "activity_steps": ["1단계 설명", "2단계 설명", "..."],
  "fun_point": "재미포인트 한 문장",
  "reflection_point": "감동포인트 한 문장",
  "question_free": "자유 질문",
  "question_sel": "SEL 연계 질문",
  "quote": "오늘의 한마디"
}`;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": apiKey,
        },
        body: JSON.stringify({
          contents: [{ role: "user", parts: [{ text: prompt }] }],
          generationConfig: {
            responseMimeType: "application/json",
          },
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(`Gemini API ${response.status}: ${data?.error?.message || JSON.stringify(data)}`);
    }

    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) throw new Error("모델 응답에 텍스트가 없습니다: " + JSON.stringify(data));

    let parsed;
    try {
      parsed = JSON.parse(text.replace(/```json|```/g, "").trim());
    } catch (parseErr) {
      throw new Error("JSON 파싱 실패: " + text.slice(0, 200));
    }

    res.status(200).json(parsed);
  } catch (e) {
    res.status(500).json({ error: "생성에 실패했습니다.", detail: String(e.message || e) });
  }
};
