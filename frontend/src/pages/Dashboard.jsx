import { useState } from "react";
import { Zap, Grid3x3, ArrowLeftRight, Users, Settings, Bell, Download, Plus } from "lucide-react";
import SendPayoutForm from "../components/SendPayoutForm";
import PayoutHistory from "../components/PayoutHistory";
import { useBalance } from "../hooks/useBalance";

const NAV = [
  { icon: Grid3x3,    label: "Dashboard",    key: "dashboard" },
  { icon: ArrowLeftRight,    label: "Payout History", key: "transactions" },
  { icon: Settings,label: "Settings",     key: "settings" },
];

function Avatar({ initials, color, size = 36 }) {
  return (
    <div
      style={{ width: size, height: size, background: color + "22", color, fontSize: size * 0.35, flexShrink: 0 }}
      className="rounded-full flex items-center justify-center font-bold border border-current border-opacity-20"
    >
      {initials}
    </div>
  );
}

function Dashboard({ onLogout }) {
  const [activeNav, setActiveNav] = useState("dashboard");
  const { balance, loading } = useBalance();

  return (
    <div className="flex h-screen bg-gray-50 font-sans overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-100 flex flex-col py-6 px-4 shrink-0">
        <div className="flex items-center gap-2.5 px-2 mb-8">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg,#3b82f6,#2563eb)" }}>
            <Zap size={16} className="text-white" />
          </div>
          <span className="text-lg font-bold text-gray-800">ATMOONPE</span>
        </div>

        <nav className="flex flex-col gap-1 flex-1">
          {NAV.map(({ icon: Icon, label, key }) => (
            <button key={key} onClick={() => setActiveNav(key)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-left ${
                activeNav === key
                  ? "text-white shadow-sm"
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
              }`}
              style={activeNav === key ? { background: "linear-gradient(135deg,#3b82f6,#2563eb)" } : {}}>
              <Icon /> {label}
            </button>
          ))}
        </nav>

        <div className="border-t border-gray-100 pt-4 px-2">
          <div className="flex items-center gap-3 mb-3">
            <Avatar initials="DU" color="#3b82f6" size={36} />
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold text-gray-700 truncate">Demo User</div>
            </div>
          </div>
          <button 
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-red-600 hover:bg-red-50 transition-colors border border-gray-200 hover:border-red-200"
          >
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header className="h-16 border-b border-gray-100 bg-white flex items-center justify-between px-6 shrink-0">
          <div>
            <h1 className="text-xl font-bold text-gray-800">Dashboard</h1>
            <p className="text-xs text-gray-500">Manage your payouts and transactions</p>
          </div>
          
        </header>

        <main className="flex-1 overflow-auto p-6 flex flex-col gap-5">
          {/* Balance Banner */}
          <div className="rounded-xl p-6 flex items-center justify-between shadow-lg"
            style={{ background: "linear-gradient(135deg,#3b82f6 0%,#2563eb 60%,#1d4ed8 100%)" }}>
            <div>
              <p className="text-blue-100 text-sm mb-1">Available Balance</p>
              <p className="text-white text-4xl font-extrabold tracking-tight">{balance}</p>
            </div>
            
          </div>

          {/* Two Columns */}
          <div className="grid grid-cols-5 gap-5 flex-1 min-h-0">
            <div className="col-span-2"><SendPayoutForm /></div>
            <div className="col-span-3"><PayoutHistory /></div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
