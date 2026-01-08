const { GoogleGenAI } = require("@google/genai");

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return res.status(500).json({ error: "Vercel 설정에서 API 키를 확인하세요." });

  try {
    // 1. 테스트용 v1beta 대신 정식 프로덕션 버전인 'v1'을 사용합니다.
    const ai = new GoogleGenAI({ 
      apiKey: apiKey,
      apiVersion: 'v1' 
    }); 

    const { prompt } = req.body;

    // 2. 모델 ID를 'gemini-3.0-flash'로 정확히 지정합니다.
    // (스튜디오 화면의 'Gemini 3 Flash'는 마케팅 이름이고, 실제 ID는 3.0인 경우가 많아요!)
    const result = await ai.models.generateContent({
      model: "gemini-3.0-flash", 
      contents: [{ role: 'user', parts: [{ text: prompt }] }] 
    });

    res.status(200).send(result.response.text); 
  } catch (error) {
    res.status(500).json({ error: "연결 실패: " + error.message });
  }
};
