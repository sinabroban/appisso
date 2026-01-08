const { GoogleGenAI } = require("@google/genai");

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return res.status(500).json({ error: "Vercel 설정에서 API 키를 확인하세요." });

  try {
    // 1. 에러가 났던 v1beta 대신 정식 버전인 'v1'을 강제로 사용합니다.
    const ai = new GoogleGenAI({ 
      apiKey: apiKey,
      apiVersion: 'v1' 
    }); 

    const { prompt } = req.body;

    // 2. 오빠가 사진에서 확인한 정확한 모델 이름 'gemini-3-flash'를 호출합니다.
    const response = await ai.models.generateContent({
      model: "gemini-3-flash", 
      contents: [{ role: 'user', parts: [{ text: prompt }] }] 
    });

    // 3. 성공적으로 받은 답변 텍스트를 보냅니다.
    res.status(200).send(response.text); 
  } catch (error) {
    res.status(500).json({ error: "Gemini 3 연결 실패: " + error.message });
  }
};
