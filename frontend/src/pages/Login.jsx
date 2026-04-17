import { useState } from "react";
import { Zap } from "lucide-react";
import { loginUser } from "../api/authApi";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from "../hooks/useAuth";

function LoginPage({ onLogin }) {
  const { login } = useAuth();
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [loading, setLoading] = useState(false);

const handleSubmit = async () => {
  if (!user || !pass) {
    toast.error("Please fill in all fields.");
    return;
  }

  try {
    setLoading(true);

    const token = await loginUser({
      username: user,
      password: pass,
    });
    login(token); 
    toast.success('Login successful!');

    setLoading(false);

    onLogin();

  } catch (err) {
    setLoading(false);
    toast.error('Login failed');
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: "#f0f4f3" }}>
      <div className="bg-white rounded-2xl shadow-xl p-10 w-full max-w-md animate-fadeIn">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg" style={{ background: "linear-gradient(135deg,#3b82f6,#2563eb)" }}>
            <Zap size={28} className="text-white" />
          </div>
        </div>
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-1">Welcome back</h1>
        <p className="text-center text-gray-400 text-sm mb-8">Enter your credentials to access your account</p>

        
        <div className="mb-5">
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Username</label>
          <input
            value={user} onChange={e => setUser(e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-gray-700 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition"
            placeholder="Enter Your Username"
          />
        </div>
        <div className="mb-7">
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Password</label>
          <input
            type="password" value={pass} onChange={e => setPass(e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-gray-700 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition"
            placeholder="Enter Your Password"
          />
        </div>
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full py-3 rounded-xl font-semibold text-white text-sm transition-all active:scale-95 disabled:opacity-70"
          style={{ background: "linear-gradient(135deg,#3b82f6,#2563eb)", boxShadow: "0 4px 14px rgba(59,130,246,0.4)" }}
        >
          {loading ? "Signing in…" : "Login"}
        </button>
        <span className="text-xs text-gray-500 text-center block mt-3">username: demo | password: demo</span>
      </div>
      <style>{`
        @keyframes fadeIn { from { opacity:0; transform:translateY(16px) } to { opacity:1; transform:none } }
        .animate-fadeIn { animation: fadeIn .4s ease both; }
      `}</style>
    </div>
  );
}

export default LoginPage;