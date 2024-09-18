import { generateResponse } from "@/actions/getChatResponse";
import { Button } from "antd";
import { Send } from "lucide-react";
import React, { useRef, useState } from "react";

// Array of loading phrases
const loadingPhrases = [
    "💬 Preparing the best information for you...",
    "⏳ Gathering election insights...",
    "🧠 Thinking through the candidate manifestos...",
    "🔍 Searching for the most relevant policies...",
    "💡 Let me find that election information for you...",
    "📋 Compiling election data...",
    "📚 Consulting my knowledge of the manifestos...",
    "🧐 Evaluating the candidates' promises...",
    "🔄 Processing your election query...",
    "🤔 Finding the best comparison for your candidate question...",
    "📊 Reviewing election resources...",
    "🔬 Analyzing manifesto details...",
    "📈 Gathering insights from the candidates' policies...",
    "🔎 Let me retrieve the right information for you...",
    "🗳️ Checking the candidates' stances on key issues...",
    "⚖️ Comparing manifestos for you...",
    "📖 Reviewing candidates' promises...",
    "🔧 Fine-tuning your election answer...",
    "💭 Thinking through the election facts for you...",
    "📊 Summarizing policy information...",
    "🔎 Let me check the manifestos for relevant details...",
    "👨‍💼 Consulting political knowledge...",
    "📝 Reviewing key points in the manifestos...",
    "🗳️ Collecting election-related details...",
    "🌍 Gathering information on policy promises...",
    "🔍 Searching for relevant election facts...",
    "⚖️ Analyzing the candidates' policies...",
    "📊 Gathering political insights...",
    "🔄 Summoning the best election response for you...",
    "💡 Reviewing campaign information..."
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
              <div className="mb-3 p-3 bg-blue-100 self-start rounded-lg text-black max-w-[80%]">
                  <h5>Hello! 😊 Welcome to ElectionMate – Your AI Assistant for Election Information! 🗳️🤖</h5>

                  <p>I'm here to help you with all your questions about the upcoming election, candidate manifestos, and key issues. Whether you're curious about what the candidates are promising or need a comparison of their policies, I'm here to guide you! 🌟</p>
                  <br />
                  <b>Here's what I can do for you:</b>
                  <ul>
                      <li>📜 Provide you with detailed information from candidate manifestos so you can understand their promises and policies.</li>
                      <li>⚖️ Compare different candidates' manifestos to help you see where they stand on key issues like the economy, healthcare, and education.</li>
                      <li>🔍 Answer your election-related queries, from voting information to key dates, so you stay informed throughout the process.</li>
                  </ul>

                  <p>Feel free to ask me anything about the election – I’m here to help you make an informed decision! 🗳️❤️</p>
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
          placeholder="Ask your election-related question here..."
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
              ElectionMate doesn't save your chat history. Please avoid sharing sensitive personal information. <br />
              The information provided is based on pre-analyzed data, and ElectionMate aims to remain neutral and factual. Always verify with official sources before making any decisions.
      </div>
    </div>
  );
};

export default ChatBot;
