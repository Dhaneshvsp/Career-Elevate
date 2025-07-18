import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req) {
  try {
    const { jobPosition, jobDesc, jobExperience, difficultyLevel, numQuestions } = await req.json();

    const apiKey = process.env.GEMINI_API_KEY; // ❗ Don't use NEXT_PUBLIC here
    const genAI = new GoogleGenerativeAI(apiKey);

    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash-exp",
    });

    const generationConfig = {
      temperature: 1,
      topP: 0.95,
      topK: 40,
      maxOutputTokens: 8192,
      responseMimeType: "text/plain",
    };

    const chatSession = model.startChat({ generationConfig });

    const inputPrompt = `Generate ${numQuestions} interview questions and answers in JSON format based on the following details:
    - Job Position: ${jobPosition}
    - Technology Stack: ${jobDesc}
    - Years of Experience: ${jobExperience}
    - Difficulty Level: ${difficultyLevel}

    Return a JSON array where each element is an object with:
    - "question": the interview question
    - "answer": the detailed answer`;

    const result = await chatSession.sendMessage(inputPrompt);
    const raw = await result.response.text();

    const cleaned = raw.replace(/```json/g, '').replace(/```/g, '').trim();
    const parsed = JSON.parse(cleaned);

    return Response.json({ questions: parsed });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
