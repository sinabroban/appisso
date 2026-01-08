const { GoogleGenAI } = require("@google/genai");

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return res.status(500).json({ error: "API 키를 확인하세요." });

  try {
    // 1. API 클라이언트 생성
    const ai = new GoogleGenAI({ apiKey }); 

    const { prompt } = req.body;

    // 2. 모델 ID를 'gemini-1.5-flash'로 수정
    // 3.0 기술이 적용된 가장 안정적인 API 전용 명칭입니다.
    const result = await ai.models.generateContent({
      model: "gemini-1.5-flash", 
      contents: [{ role: 'user', parts: [{ text: prompt }] }] 
    });

    // 3. 응답 텍스트 전송
    res.status(200).send(result.response.text()); 
  } catch (error) {
    res.status(500).json({ error: "앱이쏘 연결 실패: " + error.message });
  }
};
