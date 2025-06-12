import React, { useState } from "react";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: "Hey! Need help? Ask me anything about our menu or bookings.",
    },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages([...messages, { from: "user", text: input }]);
    setInput("");

    // Simple bot reply simulation
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          from: "bot",
          text: "Thanks for your message! We'll get back to you soon.",
        },
      ]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-5 right-5">
      {/* Chat toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-red-600 text-white rounded-full p-4 shadow-lg hover:bg-red-700 transition"
        aria-label="Toggle Chatbot"
      >
        💬
      </button>

      {/* Chat window */}
      {isOpen && (
        <div className="w-80 h-96 bg-white rounded-lg shadow-xl flex flex-col overflow-hidden mt-2">
          <div className="bg-red-600 text-white p-4 font-semibold flex justify-between items-center">
            <span>Delicia Chatbot</span>
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close Chat"
              className="font-bold"
            >
              ✕
            </button>
          </div>

          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`${msg.from === "bot" ? "text-left" : "text-right"}`}
              >
                <div
                  className={`inline-block px-4 py-2 rounded-lg ${
                    msg.from === "bot"
                      ? "bg-gray-200 text-gray-800"
                      : "bg-red-600 text-white"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 border-t flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 border rounded px-3 py-2 focus:outline-red-600"
              onKeyDown={(e) => {
                if (e.key === "Enter") sendMessage();
              }}
            />
            <button
              onClick={sendMessage}
              className="bg-red-600 hover:bg-red-700 text-white rounded px-4 py-2 font-semibold"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
