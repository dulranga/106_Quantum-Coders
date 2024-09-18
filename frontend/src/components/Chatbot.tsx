import { generateResponse } from "@/actions/getChatResponse";
import { Button } from "antd";
import { Send } from "lucide-react";
import React, { useRef, useState } from "react";

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

  const handleMessageSend = async (retryCount = 0) => {
    if (input.trim()) {
      const newMessages = [...messages, { text: input, sender: "user" }];
      setMessages(newMessages);
      setInput("");
      setLoading(true);
      setLoadingMessage(getRandomLoadingPhrase());

      try {
        const aiMessage = await generateResponse(newMessages, input);

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
        <div className="mb-3 p-3 bg-blue-100 self-start rounded-lg text-black max-w-[80%]"></div>
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
          onClick={() => handleMessageSend()}
          icon={<Send />}
          size="large"
          type="primary"
        ></Button>
      </div>
      <div className="text-center text-sm text-gray-600 p-2">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore ipsum
        qui molestias placeat id illo mollitia molestiae vel non quisquam?
        Veritatis, perspiciatis quam possimus illum eaque voluptas ratione sequi
        suscipit.
      </div>
    </div>
  );
};

export default ChatBot;
