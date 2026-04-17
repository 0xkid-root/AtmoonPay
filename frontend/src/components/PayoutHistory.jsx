import { usePayouts } from "../hooks/usePayouts";

function StatusBadge({ status }) {
  const map = {
    Completed: "bg-emerald-100 text-emerald-700",
    Pending:   "bg-amber-100 text-amber-700",
    Failed:    "bg-red-100 text-red-700",
  };
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${map[status]}`}>
      {status}
    </span>
  );
}

// -- AVATAR --
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

function PayoutHistory() {
  const { payouts, loading } = usePayouts();
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex flex-col h-full">
      <h2 className="text-lg font-bold text-gray-800">Payout History</h2>
      <p className="text-sm text-gray-500 mt-0.5 mb-4">Recent transactions and their status.</p>

      <div className="overflow-auto flex-1">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100">
              {["DATE","EMAIL","AMOUNT","STATUS","NOTE"].map(h => (
                <th key={h} className="text-left text-xs font-semibold text-gray-400 pb-3 pr-4 last:pr-0 tracking-wide">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="py-8 text-center text-gray-500 text-sm">Loading payouts...</td>
              </tr>
            ) : payouts.length === 0 ? (
              <tr>
                <td colSpan="5" className="py-8 text-center text-gray-500 text-sm">No payouts found</td>
              </tr>
            ) : (
              payouts.map((row, i) => (
                <tr key={row.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors group"
                  style={{ animation: `rowIn .3s ease ${i * 60}ms both` }}>
                  <td className="py-3.5 pr-4 text-gray-500 text-xs whitespace-nowrap">
                    {new Date(row.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-3.5 pr-4">
                    <div className="flex items-center gap-2.5">
                      <Avatar initials={row.recipientEmail.substring(0, 2).toUpperCase()} color="#3b82f6" size={34} />
                      <div>
                        <div className="font-semibold text-gray-800 text-sm leading-tight">{row.recipientEmail}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 pr-4 font-bold text-gray-800">{row.amount.toFixed(2)}</td>
                  <td className="py-3.5 pr-4"><StatusBadge status={row.status} /></td>
                  <td className="py-3.5 text-gray-500 text-xs">{row.note}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <style>{`
        @keyframes rowIn { from { opacity:0; transform:translateX(-8px) } to { opacity:1; transform:none } }
      `}</style>
    </div>
  );
}

export default PayoutHistory;