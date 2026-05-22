import { motion } from "framer-motion";
export default function TaskCard({ task, advanceStatus, deleteTask, restoreTask }) {
  const isDone = task.status === "done";
  const isInProgress = task.status === "in_progress";
  const isPending = task.status === "pending";
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      layout
      className={`group flex justify-between items-center p-4 rounded-xl border transition-all duration-300 ${
        task.deleted
          ? "bg-red-950/10 border-red-900/20 opacity-50"
          : isDone
          ? "bg-slate-900/20 border-white/[0.02] opacity-50"
          : isInProgress
          ? "bg-purple-500/[0.03] border-purple-500/30 shadow-[0_0_20px_rgba(168,85,247,0.04)]"
          : "bg-white/[0.02] border-white/[0.06] hover:border-white/[0.12]"
      }`}
    >
      <div className="flex items-center gap-3.5 flex-1 min-w-0">
        {!task.deleted && (
          <span className={`w-2 h-2 rounded-full shrink-0 transition-all duration-300 ${
            isDone ? "bg-emerald-400" : isInProgress ? "bg-purple-400 animate-pulse" : "bg-slate-600"
          }`} />
        )}
        
        <div className="truncate pr-4">
          <p className={`text-sm font-medium tracking-wide transition-all duration-300 ${
            isDone ? "line-through text-slate-500" : "text-slate-200"
          }`}>
            {task.text}
          </p>
          
          {task.deleted && (
            <span className="inline-block mt-0.5 text-[9px] uppercase tracking-wider text-red-400 font-semibold">
              Archived
            </span>
          )}
          {isInProgress && !task.deleted && (
            <span className="inline-block mt-0.5 text-[9px] uppercase tracking-wider text-purple-400 font-medium">
              Active Focus Block
            </span>
          )}
        </div>
      </div>
      <div className="flex gap-2 shrink-0 items-center">
        {task.deleted ? (
          <button
            onClick={() => restoreTask(task._id)} // 👈 Updated to _id
            className="text-xs font-semibold px-3 py-1.5 bg-purple-500/10 text-purple-400 border border-purple-500/20 rounded-lg hover:bg-purple-500/20 transition"
          >
            Restore
          </button>
        ) : (
          <>
            {isPending && (
              <button
                onClick={() => advanceStatus(task._id, "in_progress")} // 👈 Updated to _id
                className="text-xs font-semibold px-3 py-1.5 bg-purple-600 text-white rounded-lg hover:bg-purple-500 shadow-md transition active:scale-95"
              >
                In Progress ⚡
              </button>
            )}
            {isInProgress && (
              <button
                onClick={() => advanceStatus(task._id, "done")} // 👈 Updated to _id
                className="text-xs font-semibold px-3 py-1.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-500 shadow-md transition active:scale-95"
              >
                Complete ✓
              </button>
            )}
            {isDone && (
              <button
                onClick={() => advanceStatus(task._id, "in_progress")} // 👈 Updated to _id
                className="text-xs text-slate-500 hover:text-slate-300 px-2 py-1"
              >
                Re-open
              </button>
            )}
            <button
              onClick={() => deleteTask(task._id)} // 👈 Updated to _id
              className="opacity-0 group-hover:opacity-100 focus:opacity-100 text-xs text-slate-600 hover:text-red-400 p-1.5 rounded-lg hover:bg-red-500/10 transition-all duration-200 ml-1"
              title="Move to Trash"
            >
              🗑
            </button>
          </>
        )}
      </div>
    </motion.div>
  );
}