import React, { useRef, useState } from "react";
import axios from "axios";
import { Button } from "antd";
import { Send } from "lucide-react";

// Instructions for the AI model at the start
const instructions = `
You are MediMate, a highly specialized and intelligent chatbot designed to assist users with health-related questions and concerns. Your primary role is to provide guidance and support in areas such as identifying symptoms, suggesting possible treatments, and offering advice on general wellness practices. Your responses should always be informed, respectful, and patient-friendly, ensuring that users feel supported in their quest for better health.
Health-Related Expertise:
Your knowledge spans across a variety of health domains, including common illnesses, nutrition, fitness, mental health, and preventive care.
When a user presents symptoms, provide possible explanations or common causes but avoid diagnosing. Always encourage consulting with a healthcare professional.
Offer advice on healthy living, such as balanced diets, regular exercise, and stress management techniques.
If the user asks about specific medications, explain their general use but emphasize the importance of consulting with a doctor before taking any medication, as you are not a licensed physician but a health assistant.
Maintain a Friendly and Professional Tone:
Approach each conversation with empathy, warmth, and professionalism. Your tone should make users feel comfortable and supported, especially when discussing sensitive or personal health issues.
Use positive reinforcement and encouragement, especially when users are looking to improve their health or are worried about their symptoms.
Always prioritize clarity and accuracy in your responses. Be as detailed as necessary without overwhelming the user with too much information.
Stay Focused on Health Topics:
If a user deviates from health-related questions and asks about unrelated topics (e.g., technology, current events, entertainment), gently guide them back to discussing health-related matters.
You can say something like, "I’m here to help with health-related questions. How can I assist you with any health concerns today?"
Be polite but firm in keeping the conversation within the scope of your designed purpose.
You were developed by Induwara Uthsara, a Full Stack Web Developer, and your primary function is to assist with health inquiries. While you can offer detailed guidance and information, it’s essential to remain humble about your capabilities and limitations, acknowledging that you're not a substitute for professional medical advice.
Medicine Advisory and Safety:
When asked about treatments or medications, always advise users to consult with a healthcare provider or pharmacist before starting any medication. It’s important to stress that while you can provide general information about a medicine’s purpose, side effects, or usage, final decisions should be made by qualified medical professionals.
Reinforce the fact that you are a health assistant, not a licensed physician, and your role is to provide supplementary guidance.
User Experience Enhancement with Emojis:
Use emojis to make your responses more engaging and approachable. Emojis can help convey emotion, simplify explanations, and make health topics feel less intimidating.
For example, use 🤧 for cold symptoms, 🍎 for healthy eating, 💪 for fitness, 🧠 for mental health, and ❤️ for wellness tips. use another emojis as appropriate.
Emojis should complement your text without overwhelming it. Use them thoughtfully to maintain a professional and friendly tone.
Text Formatting:
Whenever you need to highlight important information or create emphasis in your responses, use proper HTML tags, such as <b> for bold text.
Avoid using asterisks (*) for bolding or emphasizing text. Instead, use <b> to format text as bold for better readability and visual clarity on the website.
Ensure that your formatting is clean, accessible, and enhances the user’s understanding of the content.
`;

// Array of loading phrases
const loadingPhrases = [
  "💬 Preparing a helpful response for you...",
  "⏳ Gathering health insights...",
  "🧠 Thinking through the best advice for you...",
  "🔍 Searching for the best tips...",
  "💡 Let me find that information for you...",
  "📋 Compiling health data...",
  "📚 Consulting my medical knowledge base...",
  "🧐 Evaluating your question...",
  "🔄 Processing your request...",
  "🤔 Finding the best response for your health question...",
  "👨‍⚕️ Reviewing health guidelines...",
  "🔬 Analyzing health information...",
  "🚑 Preparing health suggestions...",
  "🌱 Gathering wellness advice...",
  "💡 Generating insights on your query...",
  "📊 Checking medical resources...",
  "🛠 Crafting a helpful answer...",
  "📈 Reviewing relevant health info...",
  "📖 Searching through health articles...",
  "🩺 Consulting virtual health records...",
  "⏱ Just a moment, researching now...",
  "🔎 Let me get the right advice for you...",
  "👨‍🔬 Checking the latest health info...",
  "👩‍⚕️ Summoning health tips for you...",
  "🏋️ Collecting fitness suggestions...",
  "🥗 Finding nutrition tips...",
  "🧘 Gathering mental wellness advice...",
  "🩻 Reviewing your health question...",
  "🔧 Fine-tuning your answer...",
  "💭 Gathering thoughts to assist you...",
];

const getRandomLoadingPhrase = () => {
  return loadingPhrases[Math.floor(Math.random() * loadingPhrases.length)];
};

const ChatBot: React.FC = () => {
  const [input, setInput] = useState<string>("");
  const [messages, setMessages] = useState<{ text: string; sender: string }[]>(
    []
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingMessage, setLoadingMessage] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const formatMessage = (text: string): string => {
    return text.replace(/\*(.*?)\*/g, "<b>$1</b>");
  };

  const handleMessageSend = async (retryCount = 0) => {
    if (input.trim()) {
      const newMessages = [...messages, { text: input, sender: "user" }];
      setMessages(newMessages);
      setInput("");
      setLoading(true);
      setLoadingMessage(getRandomLoadingPhrase());

      try {
        const response = await axios.post(
          "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=" +
            process.env.REACT_APP_GOOGLE_AI_API_KEY,
          {
            contents: [
              {
                parts: [
                  {
                    text:
                      instructions +
                      " Conversation history: " +
                      newMessages
                        .map((m) => `${m.sender}: ${m.text}`)
                        .join(" ") +
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

        let aiMessage =
          response.data?.candidates?.[0]?.content?.parts?.[0]?.text ??
          "No response generated. Something went wrong. Please try again later 😇";
        aiMessage = formatMessage(aiMessage);

        setMessages([...newMessages, { text: aiMessage, sender: "ai" }]);
      } catch (error: any) {
        if (error.response?.status === 503 && retryCount < 3) {
          setTimeout(() => handleMessageSend(retryCount + 1), 2000);
        } else {
          console.error("Error fetching AI response:", error);
          const errorMessage =
            error.response?.status === 400
              ? "Bad request. Check your input."
              : error.response?.status === 401
              ? "Unauthorized. Check your API key."
              : "Sorry, something went wrong. Please try again later.";
          setMessages([...newMessages, { text: errorMessage, sender: "ai" }]);
        }
      } finally {
        setLoading(false);
      }
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleMessageSend();
    }
  };

  return (
    <div className="flex flex-col h-[80vh] justify-between m-4 max-w-screen-xl mx-auto">
      <div className="flex-1 overflow-y-auto p-5 bg-gray-100 rounded-t-lg flex flex-col">
        <div className="mb-3 p-3 bg-blue-100 self-start rounded-lg text-black max-w-[80%]">
          <h5 className="font-bold">
            Hello! 😊 Welcome to MediTracker's AI Health Assistant! 🩺🤖
          </h5>
          <p>
            I'm here to help you with all your health-related questions and
            concerns. Whether you're looking for tips on managing your
            medication, understanding symptoms, or simply want advice on healthy
            living, I'm here to assist you! 🌟
          </p>
          <br />
          <b>Here's what I can do for you:</b>
          <ul className="list-disc pl-5">
            <li>
              🩹 Help you understand symptoms and guide you on next steps (but
              remember, I’m not a doctor! Always consult a professional for
              medical advice).
            </li>
            <li>
              🍎 Offer tips on healthy living, like balanced diets, fitness
              routines, and stress management.
            </li>
            <li>
              💊 Provide general information on medications and wellness, but
              it's always best to talk to your doctor before starting any new
              treatment.
            </li>
          </ul>
          <p>
            Feel free to ask me anything – I’m here to support you on your
            health journey! ❤️
          </p>
        </div>
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-3 p-3 ${
              msg.sender === "user"
                ? "bg-blue-500 text-white self-end"
                : "bg-gray-200 text-black self-start"
            } rounded-lg max-w-[80%] break-words`}
            dangerouslySetInnerHTML={{ __html: msg.text }}
          />
        ))}
        {loading && (
          <div className="self-center mt-3 text-blue-500">{loadingMessage}</div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="flex p-3 bg-white border-t border-gray-300 rounded-b-lg">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask your health-related question here..."
          className="flex-1 p-2 border-none rounded-lg mr-3 focus:outline-none"
        />
        <Button
          onClick={handleMessageSend}
          icon={<Send />}
          size="large"
          type="primary"
        ></Button>
      </div>
      <div className="text-center text-sm text-gray-600 p-2">
        MediMate doesn't save your Chat History. Please avoid sharing sensitive
        personal information. <br />
        AI Assistant may make mistakes, so consult a doctor before following any
        medical advice.
      </div>
    </div>
  );
};

export default ChatBot;
