export default function FilterBar({ setFilter }) {
  const btn = "px-4 py-1 rounded-full text-sm bg-white/10 hover:bg-white/20 transition";
  return (
    <div className="flex gap-2 mt-5 justify-center flex-wrap">
      <button className={btn} onClick={() => setFilter("all")}>
        All 
      </button>
      <button className={btn} onClick={() => setFilter("active")}>
        Active
      </button>
      <button className={btn} onClick={() => setFilter("done")}>
        Done
      </button>
      <button
        className="px-4 py-1 rounded-full text-sm bg-red-500/30 hover:bg-red-500/50"
        onClick={() => setFilter("trash")}
      >
        Trash 🗑
      </button>
    </div>
  );
}