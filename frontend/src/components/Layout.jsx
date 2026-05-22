import { motion } from "framer-motion";
export default function Layout({ sidebar, children }) {
  return (
    <div className="relative min-h-screen flex bg-[#030712] font-sans text-slate-100 overflow-hidden select-none">
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-purple-600/15 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-pink-600/10 blur-[150px] pointer-events-none" />
      {sidebar}
      <div className="flex-1 flex justify-center p-4 md:p-8 overflow-y-auto z-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full max-w-4xl"
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
}