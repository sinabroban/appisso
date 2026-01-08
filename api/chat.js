const { GoogleGenerAI } = require("@google/generative-ai");

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return res.status(500).json({ error: "Vercel 설정에서 API 키를 확인하세요." });

  try {
    // 1. 구글 AI 도구를 초기화합니다.
    const genAI = new GoogleGenerAI(apiKey);
    
    // 2. 무료 등급에서 가장 확실하게 대답하는 1.5-flash 모델을 선택합니다.
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const { prompt } = req.body;

    // 3. AI에게 질문을 던지고 답변을 기다립니다.
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // 4. 성공한 답변을 화면에 보냅니다.
    res.status(200).send(text);
  } catch (error) {
    res.status(500).json({ error: "연결 실패: " + error.message });
  }
};
