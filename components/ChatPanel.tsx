"use client";

import { useEffect, useRef, useState } from "react";
import type { Solution } from "@/lib/schema";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export function ChatPanel({
  question,
  attempt,
  solution,
}: {
  question: string;
  attempt: string | null;
  solution: Solution;
}) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [messages]);

  async function send() {
    const text = input.trim();
    if (!text || busy) return;
    setInput("");
    setBusy(true);
    const history = [...messages, { role: "user" as const, content: text }];
    setMessages([...history, { role: "assistant", content: "" }]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question, attempt, solution, messages: history }),
      });
      if (!res.ok || !res.body) {
        const detail = await res.text();
        throw new Error(detail || `Request failed (${res.status})`);
      }
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        const current = acc;
        setMessages([...history, { role: "assistant", content: current }]);
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : "Something went wrong";
      setMessages([...history, { role: "assistant", content: `[${message}]` }]);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="czs-chat">
      <div className="czs-chat-head">
        <div className="czs-chat-title">Ask about this solution</div>
        <div className="czs-chat-sub">grounded in the problem, your attempt, and the code on screen</div>
      </div>
      <div ref={scrollRef} className="czs-chat-msgs">
        {messages.length === 0 && (
          <div className="czs-chat-hints">
            try asking:
            <ul>
              <li>&quot;why this data structure instead of sorting?&quot;</li>
              <li>&quot;walk me through the empty-input case&quot;</li>
              <li>&quot;here&apos;s my attempt — why doesn&apos;t it work?&quot;</li>
            </ul>
          </div>
        )}
        {messages.map((m, i) => (
          <div
            key={i}
            className={`czs-msg ${m.role === "user" ? "czs-msg-user" : "czs-msg-bot"}`}
          >
            {m.content || (busy && i === messages.length - 1 ? "…" : m.content)}
          </div>
        ))}
      </div>
      <div className="czs-chat-input">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              send();
            }
          }}
          placeholder="ask a doubt…"
          rows={2}
          className="czs-chat-ta"
        />
        <button onClick={send} disabled={busy || !input.trim()} className="czs-chat-send">
          Send
        </button>
      </div>
    </div>
  );
}
