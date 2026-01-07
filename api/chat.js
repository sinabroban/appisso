// 버셀 서버리스 함수: API 키를 안전하게 숨기고 AI와 대화합니다.
const { GoogleGenerativeAI } = require("@google/generative-ai");

module.exports = async (req, res) => {
  // POST 요청이 아니면 차단
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  // 버셀 환경변수에서 API 키를 가져옵니다 (깃허브에는 노출 안 됨)
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  try {
    const { prompt } = req.body;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // 결과를 고객에게 전달
    res.status(200).json({ text });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "AI 응답을 가져오는 중 오류가 발생했습니다." });
  }
};
