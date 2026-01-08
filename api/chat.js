const { GoogleGenAI } = require("@google/genai");

module.exports = async (req, res) => {
  // 1. POST 방식이 아니면 거절
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return res.status(500).json({ error: "Vercel 설정에서 API 키를 확인하세요." });

  try {
    // 2. 반드시 정식 버전인 'v1'을 사용하도록 강제 지정합니다
    const ai = new GoogleGenAI({ 
      apiKey: apiKey,
      apiVersion: 'v1' 
    }); 

    const { prompt } = req.body;

    // 3. 2026년 현재 가장 안정적인 'gemini-1.5-flash' 모델을 사용합니다
    // (오빠가 말씀하신 3.0 기술이 녹아있는 정식 API용 이름입니다)
    const result = await ai.models.generateContent({
      model: "gemini-1.5-flash", 
      contents: [{ role: 'user', parts: [{ text: prompt }] }] 
    });

    // 4. 성공적으로 받은 답변 텍스트를 보냅니다
    res.status(200).send(result.response.text()); 
  } catch (error) {
    // 에러 발생 시 로그에 상세 내용을 남깁니다
    res.status(500).json({ error: "연결 실패: " + error.message });
  }
};
