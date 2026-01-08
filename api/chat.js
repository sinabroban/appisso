const { GoogleGenAI } = require("@google/genai");

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return res.status(500).json({ error: "API 키를 확인하세요." });

  try {
    // 1. 정식 프로덕션 버전(v1)을 사용하도록 설정
    const ai = new GoogleGenAI({ apiKey, apiVersion: 'v1' }); 

    const { prompt } = req.body;

    // 2. 모델 ID를 'gemini-3.0-flash'로 정확히 지정
    // 3.0 버전은 '3'이 아니라 '3.0'을 붙여야 인식되는 경우가 많습니다.
    const response = await ai.models.generateContent({
      model: "gemini-3.0-flash", 
      contents: [{ role: 'user', parts: [{ text: prompt }] }] 
    });

    res.status(200).send(response.text); 
  } catch (error) {
    // 에러 발생 시 상세 메시지를 더 정확히 보여주도록 수정
    res.status(500).json({ error: "Gemini 3 연결 실패: " + error.message });
  }
};
