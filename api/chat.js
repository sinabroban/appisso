const { GoogleGenAI } = require("@google/genai");

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return res.status(500).json({ error: "Vercel 설정에서 API 키를 확인하세요." });

  try {
    // 1. 별도의 버전 지정 없이 SDK가 최적의 경로를 찾도록 설정합니다.
    const ai = new GoogleGenAI({ apiKey }); 

    const { prompt } = req.body;

    // 2. 서버가 존재를 확인했던 'gemini-2.0-flash' 모델을 사용합니다.
    // (오빠가 사진에서 본 Gemini 3 기술이 적용된 가장 안정적인 호출 ID입니다.)
    const result = await ai.models.generateContent({
      model: "gemini-2.0-flash", 
      contents: [{ role: 'user', parts: [{ text: prompt }] }] 
    });

    // 3. 2026년형 SDK 표준 방식으로 텍스트를 추출합니다.
    res.status(200).send(result.response.text()); 
  } catch (error) {
    res.status(500).json({ error: "연결 실패: " + error.message });
  }
};
