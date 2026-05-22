export default function Navbar({ user, logout }) {
  return (
    <div className="flex justify-between items-center bg-white/[0.02] border border-white/[0.04] rounded-2xl p-4 shadow-sm backdrop-blur-xl">
      <div>
        <h1 className="text-lg font-bold tracking-tight text-slate-100">Workspace</h1>
        <p className="text-xs text-purple-400/80 font-medium">Synced & up-to-date</p>
      </div>

      <div className="flex items-center gap-4">
        <div className="text-right hidden sm:block">
          <p className="text-sm font-semibold text-slate-200">{user?.name || user || "Guest User"}</p>
          <p className="text-[11px] text-emerald-400 flex items-center gap-1 justify-end font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Deep Focus Mode
          </p>
        </div>

        <button
          onClick={logout}
          className="text-xs font-semibold tracking-wide px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 rounded-xl transition-all duration-200 active:scale-95"
        >
          Exit
        </button>
      </div>
    </div>
  );
}