import { motion } from "framer-motion";

export default function Sidebar({ setView, view }) {
  const menuItems = [
    { name: "Dashboard", key: "all", icon: "⚡" },
    { name: "Active Tasks", key: "active", icon: "🎯" },
    { name: "Completed", key: "done", icon: "✨" },
    { name: "Trash Bin", key: "trash", icon: "🗑" },
    { name: "Focus Arena", key: "focus", icon: "🧘" },
  ];

  return (
    <div className="w-68 hidden lg:flex flex-col p-6 border-r border-white/[0.06] bg-white/[0.02] backdrop-blur-3xl justify-between">
      <div>
        <div className="flex items-center gap-3 mb-10 pl-2">
          <span className="text-2xl bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent font-black tracking-wider">
            TaskFlow
          </span>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-400 font-medium border border-purple-500/20">
            PRO
          </span>
        </div>
        <nav className="flex flex-col gap-1.5 relative">
          {menuItems.map((item) => {
            const isActive = view === item.key;
            return (
              <button
                key={item.key}
                onClick={() => setView(item.key)}
                className={`relative group flex items-center gap-3 w-full text-left font-medium py-3 px-4 rounded-xl transition-all duration-300 ${
                  isActive ? "text-purple-400 font-semibold" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute inset-0 bg-white/[0.04] border border-white/[0.06] rounded-xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="text-lg relative z-10">{item.icon}</span>
                <span className="text-sm relative z-10">{item.name}</span>
              </button>
            );
          })}
        </nav>
      </div>

      
    </div>
  );
}