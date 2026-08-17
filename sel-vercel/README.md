# 밥상쌤의 SEL 상차림 — Vercel 배포 안내

## 이 폴더 구성
- `index.html`, `app.js` — 화면(정적 페이지)
- `api/generate.js` — Claude API를 대신 호출해주는 서버 함수 (API 키를 안전하게 숨겨줌, Vercel이 자동으로 서버리스 함수로 인식)

## 왜 서버 함수가 필요한가요?
브라우저(학생·선생님의 화면)에서 직접 Claude API를 호출하면 API 키가 그대로 노출돼서 위험해요.
그래서 API 호출은 `api/generate.js`가 대신 해주고, 화면은 그 함수만 조용히 불러오는 구조로 만들었어요.
`api/` 폴더 안의 파일은 Vercel이 자동으로 서버리스 함수로 배포해주기 때문에 별도 설정 파일이 필요 없어요.

## 배포 방법 (GitHub 연동)

1. **API 키 발급**
   - https://console.anthropic.com 접속 → 로그인 → API Keys 메뉴에서 새 키 발급
   - (Claude.ai 앱 로그인 계정과는 별개로, API 사용은 별도 과금이에요)

2. **이 폴더를 GitHub 저장소에 올리기**
   - GitHub에 새 저장소 생성 → 이 폴더 안의 파일 전체(index.html, app.js, api 폴더)를 드래그 앤 드롭으로 업로드 → Commit changes

3. **Vercel에서 프로젝트 가져오기**
   - https://vercel.com → 로그인(GitHub 계정으로 로그인하면 편해요)
   - "Add New..." → "Project" → 방금 만든 GitHub 저장소 선택 → Import
   - Framework Preset은 "Other"로 두시면 돼요 (빌드 설정 필요 없음)

4. **환경변수 등록 (중요!)**
   - Import 화면 또는 나중에 Project → Settings → Environment Variables
   - Key: `ANTHROPIC_API_KEY`, Value: 1번에서 발급받은 키 값 입력

5. **Deploy 클릭**
   - 몇 분 내로 `https://내프로젝트이름.vercel.app` 주소가 생성됩니다. 이 주소를 학생/선생님들과 공유하면 됩니다.

## 환경변수를 나중에 추가/수정했다면
Settings에서 환경변수를 바꾼 뒤에는 **Deployments 탭 → 맨 위 배포 → "Redeploy"**를 한 번 눌러줘야 반영돼요.

## 내용을 수정하고 싶다면
`app.js`의 SITUATIONS / DOMAINS / GRADE_GROUPS 등 배열을 수정하면 선택지가 바뀝니다.
질문·놀이 생성 규칙을 바꾸고 싶다면 `api/generate.js`의 prompt 문구를 수정하세요.
