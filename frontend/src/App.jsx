import { useState, useEffect } from "react";
import Layout from "./components/Layout";
import Sidebar from "./components/Sidebar";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Navbar from "./components/Navbar";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";

import toast, { Toaster } from "react-hot-toast";
import confetti from "canvas-confetti";

const API_URL = "http://localhost:5000/api";

export default function App() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("taskflow_token") || null);
  const [tasks, setTasks] = useState([]);
  const [view, setView] = useState("all");
  const [isSignupView, setIsSignupView] = useState(false);

  
  const getAuthHeaders = () => ({
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`
  });

 
  useEffect(() => {
    const storedUser = localStorage.getItem("taskflow_user");
    const storedToken = localStorage.getItem("taskflow_token");
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }
  }, []);

  
  useEffect(() => {
    if (!token || !user) return;

    fetch(`${API_URL}/tasks`, { headers: getAuthHeaders() })
      .then((res) => {
        if (!res.ok) throw new Error("Could not sync tasks database state");
        return res.json();
      })
      .then((data) => setTasks(data))
      .catch((err) => toast.error(err.message));
  }, [token, user]);

  const showConfetti = () => {
    confetti({ particleCount: 80, spread: 60, origin: { y: 0.7 } });
  };

  
  const handleLogin = async (email, password) => {
    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        e
        if (data.error && data.error.toLowerCase().includes("exist")) {
          return toast.error("Account not found! Please Sign Up first or verify your email. ✨", { duration: 5000 });
        }
        
        if (data.error && data.error.toLowerCase().includes("password")) {
          return toast.error("Incorrect Password! Please change your password or try again. 🔑", { duration: 5000 });
        }
        return toast.error(data.error || "Login failed! Please check your email or password.", { duration: 5000 });
      }

      
      localStorage.setItem("taskflow_token", data.token);
      localStorage.setItem("taskflow_user", JSON.stringify(data.user));
      setToken(data.token);
      setUser(data.user);
      toast.success(`Welcome back, ${data.user.name} ⚡`);
    } catch (err) {
      toast.error("Network connectivity crash. Is backend server alive?");
    }
  };

  const handleSignup = async (name, email, password) => {
    try {
      const res = await fetch(`${API_URL}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password })
      });
      
      const data = await res.json();

      if (!res.ok) {
        
        if (data.error && data.error.toLowerCase().includes("already registered")) {
          return toast.error("This email is already registered! Please log in directly. 👉", { duration: 5000 });
        }
        return toast.error(data.error || "Signup failed. Registration parameter validation error.", { duration: 5000 });
      }

      localStorage.setItem("taskflow_token", data.token);
      localStorage.setItem("taskflow_user", JSON.stringify(data.user));
      setToken(data.token);
      setUser(data.user);
      toast.success("Account initialized successfully! ✨");
    } catch (err) {
      toast.error("Network configuration pipeline validation error.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("taskflow_token");
    localStorage.removeItem("taskflow_user");
    setToken(null);
    setUser(null);
    setTasks([]);
    setView("all");
    toast.success("Session closed safely");
  };

 
  const addTask = async (text) => {
    try {
      const res = await fetch(`${API_URL}/tasks`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({ text })
      });
      const data = await res.json();
      if (!res.ok) return toast.error("Error creating server record");

      setTasks([data, ...tasks]);
      toast.success("Task deployed 🚀");
    } catch (err) {
      toast.error("Network communication pipeline blocked");
    }
  };

  const advanceStatus = async (id, nextStatus) => {
    try {
      const res = await fetch(`${API_URL}/tasks/${id}/status`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify({ status: nextStatus })
      });
      const data = await res.json();
      if (!res.ok) return toast.error("Could not sync task modification");

      setTasks(tasks.map((t) => (t._id === id ? data : t)));
      if (nextStatus === "done") showConfetti();
    } catch (err) {
      toast.error("Action execution interrupted");
    }
  };

  const deleteTask = async (id) => {
    try {
      const res = await fetch(`${API_URL}/tasks/${id}/delete`, {
        method: "PUT",
        headers: getAuthHeaders()
      });
      const data = await res.json();
      if (!res.ok) return toast.error("Database delete rejection error");

      setTasks(tasks.map((t) => (t._id === id ? data : t)));
      toast("Sent to Trash Can", { icon: "🗑" });
    } catch (err) {
      toast.error("Network pipeline issue occurred");
    }
  };

  const restoreTask = async (id) => {
    try {
      const res = await fetch(`${API_URL}/tasks/${id}/restore`, {
        method: "PUT",
        headers: getAuthHeaders()
      });
      const data = await res.json();
      if (!res.ok) return toast.error("Restoration processing declined");

      setTasks(tasks.map((t) => (t._id === id ? data : t)));
      showConfetti();
      toast.success("Task pipeline restored");
    } catch (err) {
      toast.error("Network transmission failure");
    }
  };

  let filtered = tasks;
  if (view === "all") filtered = tasks.filter((t) => !t.deleted);
  if (view === "active") filtered = tasks.filter((t) => t.status !== "done" && !t.deleted);
  if (view === "done") filtered = tasks.filter((t) => t.status === "done" && !t.deleted);
  if (view === "trash") filtered = tasks.filter((t) => t.deleted);
  if (view === "focus") filtered = tasks.filter((t) => t.status === "in_progress" && !t.deleted);

  const totalActiveAndDone = tasks.filter((t) => !t.deleted).length;
  const doneCount = tasks.filter((t) => t.status === "done" && !t.deleted).length;
  const progress = totalActiveAndDone ? Math.round((doneCount / totalActiveAndDone) * 100) : 0;

  if (!user || !token) {
    return (
      <>
        {isSignupView ? (
          <Signup onSignup={handleSignup} switchToLogin={() => setIsSignupView(false)} />
        ) : (
          <Login onLogin={handleLogin} switchToSignup={() => setIsSignupView(true)} />
        )}
        {/* Render fallback toast view directly on login page screen bounds */}
        <Toaster position="bottom-right" reverseOrder={false} />
      </>
    );
  }

  return (
    <Layout sidebar={<Sidebar setView={setView} view={view} />}>
      <Navbar user={user} logout={handleLogout} />

      <div className="mt-8 bg-gradient-to-br from-white/[0.04] to-white/[0.01] border border-white/[0.06] rounded-2xl p-6 relative overflow-hidden shadow-xl">
        <h2 className="text-xl font-bold tracking-tight text-slate-100">
          Welcome back, {user.name}
        </h2>
        <p className="text-slate-400 text-xs mt-1 max-w-md leading-relaxed">
          {view === "focus"
            ? "Zero internal distractions. Just you and your current active execution blocks."
            : "Streamlined modern metrics engineered to minimize cognitive overhead."}
        </p>

        <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-white/[0.04]">
          <div>
            <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold block">Total Allocation</span>
            <div className="text-xl font-bold text-slate-100 mt-0.5">{totalActiveAndDone}</div>
          </div>
          <div>
            <span className="text-[10px] text-purple-400 uppercase tracking-wider font-semibold block">Completed</span>
            <div className="text-xl font-bold text-purple-400 mt-0.5">{doneCount}</div>
          </div>
          <div>
            <span className="text-[10px] text-emerald-400 uppercase tracking-wider font-semibold block">Velocity Rate</span>
            <div className="text-xl font-bold text-emerald-400 mt-0.5">{progress}%</div>
          </div>
        </div>

        <div className="mt-5 w-full h-1 bg-white/[0.06] rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {view !== "trash" && (
        <div className="mt-6">
          <TaskInput addTask={addTask} />
        </div>
      )}

      <TaskList
        tasks={filtered}
        advanceStatus={advanceStatus}
        deleteTask={deleteTask}
        restoreTask={restoreTask}
      />
      <Toaster position="bottom-right" reverseOrder={false} />
    </Layout>
  );
}