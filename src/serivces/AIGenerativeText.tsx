import { GoogleGenerativeAI } from "@google/generative-ai";

export const generateDescription = async (promptUser: string) => {  
  if (!promptUser) return;
  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_SECRET_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const prompt = promptUser;
  const result = await model.generateContent(prompt);
  const generatedText = result.response.text()

  return (generatedText)
}
