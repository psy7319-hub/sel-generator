# 밥상쌤의 SEL 상차림 — Vercel 배포 안내 (Gemini API 버전)

## 이 폴더 구성
- `index.html`, `app.js` — 화면(정적 페이지)
- `api/generate.js` — Gemini API를 대신 호출해주는 서버 함수 (API 키를 안전하게 숨겨줌)

## 왜 서버 함수가 필요한가요?
브라우저에서 직접 Gemini API를 호출하면 API 키가 그대로 노출돼서 위험해요. 그래서 API 호출은 `api/generate.js`가 대신 해주고, 화면은 그 함수만 조용히 불러오는 구조예요.

## 배포 방법 (GitHub 연동)

1. **Gemini API 키 발급 (무료)**
   - https://aistudio.google.com/apikey 접속 → 구글 계정으로 로그인 → "Create API Key" 클릭
   - 신용카드 등록 없이 무료 등급으로 바로 발급돼요. `AIza...`로 시작하는 문자열이 키예요.

2. **GitHub에 코드 반영**
   - `app.js`, `api/generate.js` 파일을 저장소의 `sel-vercel` 폴더 안 같은 파일에 덮어써서 업로드(커밋)

3. **Vercel 환경변수 교체**
   - Vercel 프로젝트 → Settings → Environment Variables
   - 기존 `ANTHROPIC_API_KEY`는 지우거나 그냥 둬도 무방해요 (더는 안 쓰여요)
   - 새로 `GEMINI_API_KEY` 라는 이름으로 1번에서 발급받은 키 값을 등록

4. **재배포**
   - Deployments 탭 → 최근 배포 → 점 3개(…) → Redeploy
   - 환경변수를 바꾼 뒤에는 이 단계가 꼭 필요해요.

## 모델이 바뀌면?
구글이 무료 모델명을 종종 바꿔요. `api/generate.js` 맨 위 `GEMINI_MODEL` 한 줄만 최신 무료 모델명으로 바꿔주면 됩니다. 현재 사용 가능한 모델은 https://ai.google.dev/gemini-api/docs/models 에서 확인하실 수 있어요.

## 비용
무료 등급(free tier) 모델을 쓰도록 설정되어 있어서, 이 앱 정도의 사용량(하루 몇 번 클릭)이면 신용카드 등록 없이 계속 무료로 쓰실 수 있어요. 다만 무료 등급은 분당/일당 요청 횟수 제한이 있어서, 아주 짧은 시간에 몰아서 여러 번 누르면 일시적으로 실패할 수 있어요 — 잠시 후 다시 누르면 됩니다.

## 내용을 수정하고 싶다면
`app.js`의 SITUATIONS / DOMAINS / CLASSICS 등 배열을 수정하면 선택지·고전문구가 바뀝니다.
질문·놀이 생성 규칙을 바꾸고 싶다면 `api/generate.js`의 prompt 문구를 수정하세요.
