import { useState } from "react";
import API from "../services/api";

export default function ChatWidget({
  tenantKey = "zudio",
  brandName = "Zudio",
}) {

  const [question, setQuestion] = useState("");

  const [messages, setMessages] = useState([
    {
      role: "ai",
      text: "Hello 👋 How can I help you today?",
    },
  ]);

  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {

    if (!question.trim()) return;

    const userMessage = {
      role: "user",
      text: question,
    };

    setMessages((prev) => [
      ...prev,
      userMessage,
    ]);

    const currentQuestion = question;

    setQuestion("");

    try {

      setLoading(true);

      const response = await API.post(
        "/chat/public",
        {
          question: currentQuestion,
          tenantKey,
        }
      );

      const aiMessage = {
        role: "ai",
        text: response.data.answer,
      };

      setMessages((prev) => [
        ...prev,
        aiMessage,
      ]);

    } catch (error) {

      console.log(error);

      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: "Something went wrong.",
        },
      ]);

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="fixed bottom-6 right-6 z-50">

      <div className="w-[370px] h-[600px] bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden">

        {/* Header */}

        <div className="bg-zinc-900 border-b border-zinc-800 px-5 py-4 flex items-center justify-between">

          <div>

            <h1 className="text-white font-semibold text-lg">
              {brandName} Support Assistant
            </h1>

            <p className="text-zinc-400 text-sm">
              Ask anything about orders, refunds, or shipping.
            </p>

          </div>

          <div className="w-3 h-3 rounded-full bg-green-500" />

        </div>

        {/* Messages */}

        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-black">

          {
            messages.map((msg, index) => (

              <div
                key={index}
                className={`flex ${
                  msg.role === "user"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >

                <div
                  className={`p-4 rounded-2xl max-w-[85%] text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-white text-black rounded-br-sm"
                      : "bg-zinc-900 text-white rounded-bl-sm border border-zinc-800"
                  }`}
                >

                  {msg.text}

                </div>

              </div>

            ))
          }

          {
            loading && (

              <div className="flex">

                <div className="bg-zinc-900 text-white p-4 rounded-2xl rounded-bl-sm border border-zinc-800 text-sm">

                  Thinking...

                </div>

              </div>

            )
          }

        </div>

        {/* Input */}

        <div className="border-t border-zinc-800 bg-zinc-950 p-4 flex gap-3">

          <input
            type="text"
            placeholder="Ask a question..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleAsk();
              }
            }}
            className="flex-1 bg-black border border-zinc-700 rounded-xl px-4 py-3 text-white outline-none focus:border-white text-sm"
          />

          <button
            onClick={handleAsk}
            disabled={loading}
            className="bg-white text-black px-5 rounded-xl font-semibold hover:opacity-90 transition text-sm disabled:opacity-50"
          >

            Send

          </button>

        </div>

      </div>

    </div>

  );

}
