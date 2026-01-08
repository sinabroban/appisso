const { GoogleGenAI } = require("@google/genai");

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) return res.status(500).json({ error: "API 키를 등록해주세요." });

  try {
    // 1. 에러의 원인인 v1beta를 버리고, 정식 버전인 'v1'을 강제로 지정합니다.
    const genAI = new GoogleGenAI(apiKey);
    
    // 2. 2026년 현재 가장 안정적인 무료 등급 모델을 호출합니다.
    const model = genAI.getGenerativeModel(
      { model: "gemini-1.5-flash" },
      { apiVersion: 'v1' } // 이 부분이 404 에러를 잡는 핵심 열쇠입니다!
    );

    const { prompt } = req.body;
    const result = await model.generateContent(prompt);
    const response = await result.response;

    res.status(200).send(response.text()); 
  } catch (error) {
    res.status(500).json({ error: "연결 실패: " + error.message });
  }
};
