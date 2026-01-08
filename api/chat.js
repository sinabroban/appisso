const { GoogleGenAI } = require("@google/genai");

module.exports = async (req, res) => {
  // 1. 보안 및 방식 체크
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');
  const apiKey = process.env.GEMINI_API_KEY;

  try {
    // 2. 오빠가 사진으로 보여준 최신 SDK 연결
    const ai = new GoogleGenAI({ apiKey }); 
    const { prompt } = req.body;

    // 3. 스튜디오 사진에 있던 'Gemini 3 Flash' 모델로 바로 연결합니다
    const response = await ai.models.generateContent({
      model: "gemini-3-flash", 
      contents: [{ role: 'user', parts: [{ text: prompt }] }] 
    });

    // 4. 결과값만 깔끔하게 전달
    res.status(200).send(response.text); 
  } catch (error) {
    // 혹시라도 에러가 나면 이유를 오빠한테 한글로 알려줍니다
    res.status(500).json({ error: "앱이쏘 연결 실패: " + error.message });
  }
};
