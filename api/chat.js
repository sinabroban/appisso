const { GoogleGenAI } = require("@google/genai"); // 클래스 이름을 GoogleGenAI로 수정

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return res.status(500).json({ error: "Vercel 설정에서 API 키를 확인하세요." });

  try {
    // 1. GoogleGenAI 클래스로 클라이언트 생성
    const ai = new GoogleGenAI({ apiKey }); 

    const { prompt } = req.body;

    // 2. Gemini 3.0 모델 호출 (2026년 최신 표준 모델명)
    const response = await ai.models.generateContent({
      model: "gemini-3-flash",
      contents: prompt, // 새 SDK에서는 prompt를 contents로 바로 전달합니다
    });

    // 3. 답변 텍스트만 추출해서 전송
    res.status(200).send(response.text); 
  } catch (error) {
    res.status(500).json({ error: "Gemini 3 호출 실패: " + error.message });
  }
};
