import { useState } from "react";
export default function TaskInput({ addTask }) {
  const [text, setText] = useState("");

  const handleAdd = () => {
    if (!text.trim()) return;
    addTask(text);
    setText("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleAdd();
  };

  return (
    <div className="relative flex items-center gap-2 bg-slate-900/40 border border-white/[0.06] shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)] rounded-2xl p-1.5 transition-all focus-within:border-purple-500/50 focus-within:shadow-[0_0_20px_rgba(168,85,247,0.15)]">
      <input
        className="flex-1 pl-4 pr-2 py-3 bg-transparent text-sm text-slate-200 placeholder-slate-500 outline-none w-full"
        placeholder="Capture your next breakthrough task..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button
        onClick={handleAdd}
        className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-sm font-semibold text-white shadow-lg shadow-purple-500/20 hover:brightness-110 active:scale-95 transition-all duration-200"
      >
        Deploy
      </button>
    </div>
  );
}