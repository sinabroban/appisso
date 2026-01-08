const { GoogleGenerativeAI } = require("@google/generative-ai");

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');
  
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return res.status(500).json({ error: "API 키가 등록되지 않았습니다." });

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    // 가장 범용적으로 쓰이는 안정적인 모델입니다.
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const { prompt } = req.body;
    const result = await model.generateContent(prompt);
    
    // 2026년 표준 응답 방식입니다.
    const text = result.response.text();
    res.status(200).send(text);
  } catch (error) {
    res.status(500).json({ error: "연결 실패: " + error.message });
  }
};
