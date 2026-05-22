import { AnimatePresence } from "framer-motion";
import TaskCard from "./TaskCard";
export default function TaskList({ tasks, advanceStatus, deleteTask, restoreTask }) {
  if (tasks.length === 0) {
    return (
      <div className="mt-8 text-center py-12 px-4 rounded-2xl border border-dashed border-white/[0.06] bg-white/[0.01]">
        <span className="text-3xl block mb-2">🍃</span>
        <h3 className="text-sm font-medium text-slate-300">Clean Space</h3>
        <p className="text-xs text-slate-500 max-w-xs mx-auto mt-1">
          No items found under this operational filter array.
        </p>
      </div>
    );
  }
  return (
    <div className="mt-6 flex flex-col gap-2.5">
      <AnimatePresence mode="popLayout">
        {tasks.map((task) => (
          <TaskCard
            key={task._id} // 👈 Sahi MongoDB Key Identifier
            task={task}
            advanceStatus={advanceStatus}
            deleteTask={deleteTask}
            restoreTask={restoreTask}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}