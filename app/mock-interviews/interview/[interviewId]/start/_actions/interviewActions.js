"use server"; // This directive is ESSENTIAL.

import { db } from "@/utils/db";
import { UserAnswer } from "@/utils/schema";
import { chatSession } from "@/utils/GeminiAIModal";
import moment from "moment";

// This function will run securely on the server
export async function processAndSaveAnswer(
  userAnswerText,
  question,
  interviewData,
  userEmail
) {
  if (!userAnswerText || !question || !interviewData) {
    return { success: false, message: "Missing required data." };
  }

  const feedbackPrompt = `Based on the following interview question and user answer:
    Question: "${question.question}"
    User's Answer: "${userAnswerText}"

    Please provide a rating and constructive feedback. The user's expected answer for context is: "${question.answer}".

    Return your response as a single, clean JSON object with the following fields:
    - "rating": A number between 1 and 10.
    - "feedback": A 3 to 5 line string providing feedback for improvement.
    - "personalized_tips": A string with some tips for interview preparation based on the user's response.
    
    Example JSON:
    {
      "rating": 7,
      "feedback": "Your answer was good, but you could elaborate more on the technical details. Try to structure your response using the STAR method.",
      "personalized_tips": "Practice explaining complex topics in simple terms. Reviewing common data structures would also be beneficial."
    }`;

  try {
    // 1. Get feedback from the AI
    const aiResult = await chatSession.sendMessage(feedbackPrompt);
    const aiResponseText = await aiResult.response.text();

    // Clean and parse the JSON response from the AI
    const jsonMatch = aiResponseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      console.error("Error: No valid JSON found in AI response", aiResponseText);
      return { success: false, message: "Could not parse AI feedback." };
    }
    const jsonFeedback = JSON.parse(jsonMatch[0]);

    // 2. Save everything to the database
    await db.insert(UserAnswer).values({
      mockIdRef: interviewData.mockId,
      question: question.question,
      correctAns: question.answer,
      userAns: userAnswerText,
      feedback: jsonFeedback.feedback,
      rating: jsonFeedback.rating,
      userEmail: userEmail,
      createdAt: moment().format("DD-MM-yyyy"),
    });

    return { success: true };
  } catch (error) {
    console.error("Error in processAndSaveAnswer server action:", error);
    return { success: false, message: "An error occurred while saving your answer." };
  }
}