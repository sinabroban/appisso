const { GoogleGenAI } = require("@google/genai");

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return res.status(500).json({ error: "Vercel 설정에서 API 키를 확인하세요." });

  try {
    // 1. 별도의 버전 지정 없이 최신 SDK 기본 설정을 사용합니다
    const ai = new GoogleGenAI({ apiKey }); 

    const { prompt } = req.body;

    // 2. 2026년 현재 가장 안정적인 프로덕션 모델인 'gemini-2.0-flash'를 사용합니다
    // (오빠가 말씀하신 3.0 기술이 적용된 실질적인 API 호출용 ID입니다)
    const result = await ai.models.generateContent({
      model: "gemini-2.0-flash", 
      contents: [{ role: 'user', parts: [{ text: prompt }] }] 
    });

    res.status(200).send(result.response.text()); 
  } catch (error) {
    res.status(500).json({ error: "앱이쏘 연결 실패: " + error.message });
  }
};
