const { GoogleGenAI } = require("@google/genai");

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  const apiKey = process.env.GEMINI_API_KEY; // 여기서 새 키를 읽어옵니다.
  if (!apiKey) return res.status(500).json({ error: "새 API 키를 설정해주세요." });

  try {
    const ai = new GoogleGenAI({ apiKey }); 
    const { prompt } = req.body;

    // 2026년 표준 모델인 gemini-2.0-flash를 사용합니다.
    const result = await ai.models.generateContent({
      model: "gemini-2.0-flash", 
      contents: [{ role: 'user', parts: [{ text: prompt }] }] 
    });

    res.status(200).send(result.response.text()); 
  } catch (error) {
    res.status(500).json({ error: "연결 실패: " + error.message });
  }
};
