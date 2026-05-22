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
    Authorization: `Bearer ${token}`,
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
        if (!res.ok) throw new Error("Failed to fetch tasks");
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
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.error?.toLowerCase().includes("exist")) {
          return toast.error("Account not found. Please sign up first.");
        }

        if (data.error?.toLowerCase().includes("password")) {
          return toast.error("Incorrect password.");
        }

        return toast.error(data.error || "Login failed");
      }

      localStorage.setItem("taskflow_token", data.token);
      localStorage.setItem("taskflow_user", JSON.stringify(data.user));

      setToken(data.token);
      setUser(data.user);

      toast.success(`Welcome back, ${data.user.name}`);
    } catch {
      toast.error("Network error. Please check backend server.");
    }
  };

  const handleSignup = async (name, email, password) => {
    try {
      const res = await fetch(`${API_URL}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.error?.toLowerCase().includes("already")) {
          return toast.error("Email already registered.");
        }
        return toast.error(data.error || "Signup failed");
      }

      localStorage.setItem("taskflow_token", data.token);
      localStorage.setItem("taskflow_user", JSON.stringify(data.user));

      setToken(data.token);
      setUser(data.user);

      toast.success("Account created successfully");
    } catch {
      toast.error("Network error during signup");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("taskflow_token");
    localStorage.removeItem("taskflow_user");

    setToken(null);
    setUser(null);
    setTasks([]);
    setView("all");

    toast.success("Logged out");
  };

  const addTask = async (text) => {
    try {
      const res = await fetch(`${API_URL}/tasks`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({ text }),
      });

      const data = await res.json();

      if (!res.ok) return toast.error("Failed to create task");

      setTasks([data, ...tasks]);
      toast.success("Task added");
    } catch {
      toast.error("Network error");
    }
  };

  const advanceStatus = async (id, nextStatus) => {
    try {
      const res = await fetch(`${API_URL}/tasks/${id}/status`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify({ status: nextStatus }),
      });

      const data = await res.json();

      if (!res.ok) return toast.error("Failed to update task");

      setTasks(tasks.map((t) => (t._id === id ? data : t)));

      if (nextStatus === "done") showConfetti();
    } catch {
      toast.error("Update failed");
    }
  };

  const deleteTask = async (id) => {
    try {
      const res = await fetch(`${API_URL}/tasks/${id}/delete`, {
        method: "PUT",
        headers: getAuthHeaders(),
      });

      const data = await res.json();

      if (!res.ok) return toast.error("Delete failed");

      setTasks(tasks.map((t) => (t._id === id ? data : t)));

      toast("Moved to trash");
    } catch {
      toast.error("Delete error");
    }
  };

  const restoreTask = async (id) => {
    try {
      const res = await fetch(`${API_URL}/tasks/${id}/restore`, {
        method: "PUT",
        headers: getAuthHeaders(),
      });

      const data = await res.json();

      if (!res.ok) return toast.error("Restore failed");

      setTasks(tasks.map((t) => (t._id === id ? data : t)));

      showConfetti();
      toast.success("Task restored");
    } catch {
      toast.error("Restore error");
    }
  };

  let filtered = tasks;

  if (view === "all") filtered = tasks.filter((t) => !t.deleted);
  if (view === "active") filtered = tasks.filter((t) => t.status !== "done" && !t.deleted);
  if (view === "done") filtered = tasks.filter((t) => t.status === "done" && !t.deleted);
  if (view === "trash") filtered = tasks.filter((t) => t.deleted);
  if (view === "focus") filtered = tasks.filter((t) => t.status === "in_progress" && !t.deleted);

  const total = tasks.filter((t) => !t.deleted).length;
  const done = tasks.filter((t) => t.status === "done" && !t.deleted).length;
  const progress = total ? Math.round((done / total) * 100) : 0;

  if (!user || !token) {
    return (
      <>
        {isSignupView ? (
          <Signup onSignup={handleSignup} switchToLogin={() => setIsSignupView(false)} />
        ) : (
          <Login onLogin={handleLogin} switchToSignup={() => setIsSignupView(true)} />
        )}
        <Toaster position="bottom-right" />
      </>
    );
  }

  return (
    <Layout sidebar={<Sidebar setView={setView} view={view} />}>
      <Navbar user={user} logout={handleLogout} />

      <div className="mt-8 bg-white/5 border border-white/10 rounded-2xl p-6">
        <h2 className="text-xl font-bold">Welcome back, {user.name}</h2>
        <p className="text-sm text-gray-400 mt-1">
          {view === "focus"
            ? "Focus mode active"
            : "Task overview dashboard"}
        </p>

        <div className="grid grid-cols-3 gap-4 mt-6">
          <div>Total: {total}</div>
          <div>Done: {done}</div>
          <div>Progress: {progress}%</div>
        </div>

        <div className="mt-4 h-1 bg-gray-700 rounded">
          <div
            className="h-full bg-purple-500"
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

      <Toaster position="bottom-right" />
    </Layout>
  );
}