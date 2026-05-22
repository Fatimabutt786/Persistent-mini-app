import { useState } from "react";

export default function Signup({ onSignup, switchToLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !password) return;
    onSignup(name, email, password);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6 shadow-2xl backdrop-blur-md">
        <h2 className="text-xl font-bold text-slate-100 tracking-tight text-center">Initialize Account</h2>
        <p className="text-xs text-slate-400 text-center mt-1">Connect to live task automation layer</p>
        
        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
          <div>
            <label className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold block mb-1.5">Full Name</label>
            <input 
              type="text" required value={name} onChange={e => setName(e.target.value)}
              className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-3.5 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-purple-500/50 transition" 
              placeholder="Alex Mercer"
            />
          </div>
          <div>
            <label className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold block mb-1.5">Email Address</label>
            <input 
              type="email" required value={email} onChange={e => setEmail(e.target.value)}
              className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-3.5 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-purple-500/50 transition" 
              placeholder="alex@example.com"
            />
          </div>
          <div>
            <label className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold block mb-1.5">Security Token Password</label>
            <input 
              type="password" required value={password} onChange={e => setPassword(e.target.value)}
              className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-3.5 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-purple-500/50 transition" 
              placeholder="••••••••"
            />
          </div>
          
          <button type="submit" className="w-full mt-2 bg-purple-600 hover:bg-purple-500 text-white rounded-xl py-2.5 text-sm font-semibold shadow-lg shadow-purple-900/20 transition active:scale-98">
            Create Free Account
          </button>
        </form>
        
        <p className="text-xs text-slate-400 text-center mt-4">
          Already have an account?{" "}
          <button onClick={switchToLogin} className="text-purple-400 hover:underline font-medium">Log In</button>
        </p>
      </div>
    </div>
  );
}