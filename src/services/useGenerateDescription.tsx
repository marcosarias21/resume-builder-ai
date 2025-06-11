import { GoogleGenerativeAI } from "@google/generative-ai";
import { useState } from "react";

export const useGenerativeDescription = () => {
  const [loading, setloading] = useState<boolean>();
  const generateText = async (promptUser: string) => {
    setloading(true);
    if (!promptUser) return;
    const genAI = new GoogleGenerativeAI(import.meta.env.VITE_SECRET_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = promptUser;
    const result = await model.generateContent(prompt);
    const generatedText = result.response.text();
    setloading(false);

    return generatedText;
  };
  return { generateText, loading };
};
