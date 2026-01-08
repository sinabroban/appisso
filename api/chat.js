const { GoogleGenAI } = require("@google/genai");

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) return res.status(500).json({ error: "API 키를 등록해주세요." });

  try {
    const ai = new GoogleGenAI({ apiKey }); 
    const { prompt } = req.body;

    // 오빠가 찍어준 사진(스튜디오.png)에서 확인한 'Gemini 3 Flash'를 호출합니다.
    const result = await ai.models.generateContent({
      model: "gemini-3-flash", 
      contents: [{ role: 'user', parts: [{ text: prompt }] }] 
    });

    res.status(200).send(result.response.text()); 
  } catch (error) {
    res.status(500).json({ error: "연결 실패: " + error.message });
  }
};
