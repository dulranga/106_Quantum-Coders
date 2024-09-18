"use server";

import axios from "axios";
import candidatesContext from "backend/src/candidates.json";

// Instructions for the AI model at the start

export const generateResponse = async (newMessages: any[] = [], input = "") => {
  const instructions = `Use this json data and parse it to get info about sri lanka presidential election candidates manifestos for answer to users : ${JSON.stringify(
    candidatesContext
  )}`;

  const fallbackResponse =
    "No response generated. Something went wrong. Please try again later 😇";

  const formatMessage = (text: string): string => {
    return text.replace(/\*(.*?)\*/g, "<b>$1</b>");
  };

  if (!Array.isArray(newMessages)) return fallbackResponse;

  const response = await axios.post(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=" +
      process.env.GOOGLE_GENERATIVE_AI_API_KEY,
    {
      contents: [
        {
          parts: [
            {
              text:
                instructions +
                " Conversation history: " +
                newMessages.map((m) => `${m.sender}: ${m.text}`).join(" ") +
                " User: " +
                input,
            },
          ],
        },
      ],
    },
    {
      headers: { "Content-Type": "application/json" },
    }
  );

  const aiMessage =
    response.data?.candidates?.[0]?.content?.parts?.[0]?.text ??
    fallbackResponse;
  return formatMessage(aiMessage);
};
