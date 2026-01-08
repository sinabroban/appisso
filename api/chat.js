const { GoogleGenAI } = require("@google/genai");

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  // 1. Vercel 설정에서 키를 가져옵니다.
  const apiKey = process.env.GEMINI_API_KEY;

  // 2. 만약 키가 없으면 오빠한테 어디가 문제인지 한글로 알려줍니다.
  if (!apiKey) {
    return res.status(500).json({ error: "버셀(Vercel) 설정에 GEMINI_API_KEY가 등록되지 않았습니다." });
  }

  try {
    const ai = new GoogleGenAI({ apiKey }); 
    const { prompt } = req.body;

    // 3. 사진(스튜디오.png)에서 확인한 2026년 최신 모델 이름입니다!
    const response = await ai.models.generateContent({
      model: "gemini-3-flash", 
      contents: [{ role: 'user', parts: [{ text: prompt }] }] 
    });

    res.status(200).send(response.text); 
  } catch (error) {
    res.status(500).json({ error: "연결 실패: " + error.message });
  }
};
