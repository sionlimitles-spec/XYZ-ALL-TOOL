"use client";
import { useState } from "react";

export default function AIChatPage() {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>(
    []
  );
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function send() {
    if (!input.trim()) return;
    const newMsgs = [...messages, { role: "user", content: input }];
    setMessages(newMsgs);
    setInput("");
    setLoading(true);

    const res = await fetch("/api/ai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: newMsgs }),
    });
    const data = await res.json();
    setMessages([...newMsgs, { role: "assistant", content: data.reply }]);
    setLoading(false);
  }

  return (
    <div className="max-w-2xl mx-auto glass-card p-6 flex flex-col h-[70vh]">
      <h1 className="text-2xl font-semibold mb-4">AI Chat</h1>
      <div className="flex-1 overflow-y-auto space-y-3 mb-4">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`p-3 rounded-lg ${
              m.role === "user"
                ? "bg-[var(--accent)]/20 ml-auto max-w-[80%]"
                : "bg-white/5 max-w-[80%]"
            }`}
          >
            {m.content}
          </div>
        ))}
        {loading && <div className="text-white/60 text-sm">Mengetik...</div>}
      </div>
      <div className="flex gap-2">
        <input
          className="input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="Tulis pesan..."
        />
        <button className="btn btn-primary" onClick={send}>
          Kirim
        </button>
      </div>
    </div>
  );
}
