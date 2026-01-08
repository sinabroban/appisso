const { GoogleGenAI } = require("@google/genai");

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return res.status(500).json({ error: "Vercel 설정에서 API 키를 확인하세요." });

  try {
    // 1. 별도의 버전 지정 없이 SDK 기본 설정을 사용합니다.
    const ai = new GoogleGenAI({ apiKey }); 

    const { prompt } = req.body;

    // 2. 오빠가 사진에서 확인한 'Gemini 3 Flash'의 API 정식 ID를 사용합니다.
    const result = await ai.models.generateContent({
      model: "gemini-3-flash", 
      contents: [{ role: 'user', parts: [{ text: prompt }] }] 
    });

    // 3. 응답 방식이 2026년형 SDK 표준으로 변경되었습니다.
    res.status(200).send(result.response.text); 
  } catch (error) {
    res.status(500).json({ error: "연결 실패: " + error.message });
  }
};
