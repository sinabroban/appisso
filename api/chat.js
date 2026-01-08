const { GoogleGenerativeAI } = require("@google/generative-ai");

module.exports = async (req, res) => {
  // 1. 보안 체크 (POST 방식만 허용)
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  // 2. 열쇠(API 키) 확인
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return res.status(500).json({ error: "Vercel Settings에서 API 키를 등록해주세요." });

  try {
    // 3. 구글 AI 초기화
    const genAI = new GoogleGenerativeAI(apiKey);
    
    // 4. 무료 등급에서 가장 확실하게 대답하는 모델 선택
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const { prompt } = req.body;

    // 5. 답변 생성
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.status(200).send(text);
  } catch (error) {
    // 에러 발생 시 오빠가 알 수 있게 한글로 응답
    res.status(500).json({ error: "연결 실패: " + error.message });
  }
};
