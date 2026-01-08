const { GoogleGenerativeAI } = require("@google/genai"); // 최신 SDK 사용

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return res.status(500).json({ error: "API 키 설정 필요" });

  try {
    const client = new GoogleGenerativeAI({ apiKey });
    // 오빠가 말씀하신 Gemini 3.0 모델로 호출합니다!
    const model = client.getGenerativeModel({ model: "gemini-3-flash" });

    const { prompt } = req.body;
    const result = await model.generateContent(prompt);
    
    // Gemini 3은 응답 구조가 더 간결해졌습니다
    const text = result.response.text();
    res.status(200).send(text);
  } catch (error) {
    res.status(500).json({ error: "Gemini 3 호출 실패: " + error.message });
  }
};
