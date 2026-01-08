const { GoogleGenerativeAI } = require("@google/generative-ai");

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return res.status(500).json({ error: "Vercel 설정에서 API 키를 확인하세요." });

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    // 무료 등급에서 가장 확실하게 대답하는 1.5-flash 모델입니다.
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const { prompt } = req.body;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    
    // 답변 텍스트만 깔끔하게 추출하여 보냅니다.
    res.status(200).send(response.text());
  } catch (error) {
    res.status(500).json({ error: "연결 실패: " + error.message });
  }
};
