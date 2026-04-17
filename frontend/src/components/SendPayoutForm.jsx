import { useState } from "react";
import { Mail, DollarSign } from "lucide-react";
import { usePayouts } from "../hooks/usePayouts";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SendPayoutForm() {
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const { createPayout } = usePayouts();

  const handleSend = async () => {
    if (!email || !amount) return;
    
    setLoading(true);
    try {
      await createPayout({
        recipientEmail: email,
        amount: parseFloat(amount),
        note: note || "Payment for service"
      });
      setEmail("");
      setAmount("");
      setNote("");
    } catch (error) {
      console.error("Failed to create payout:", error);
      toast.error('Failed to create payout');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 h-full">
      <h2 className="text-lg font-bold text-gray-800">Send Payout</h2>
      <p className="text-sm text-gray-500 mt-0.5 mb-5">Transfer funds to a recipient via email.</p>

      <div className="mb-4">
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Recipient Email</label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"><Mail size={16} /></span>
          <input value={email} onChange={e => setEmail(e.target.value)}
            className="w-full border border-gray-200 rounded-lg pl-9 pr-4 py-2.5 text-sm text-gray-700 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition"
            placeholder="e.g. name@example.com" />
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Amount</label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"><DollarSign size={16} /></span>
          <input value={amount} onChange={e => setAmount(e.target.value)} type="number" min="0"
            className="w-full border border-gray-200 rounded-lg pl-9 pr-4 py-2.5 text-sm text-gray-700 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition"
            placeholder="0.00" />
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Note <span className="text-gray-400 font-normal">(Optional)</span></label>
        <textarea value={note} onChange={e => setNote(e.target.value)} rows={3}
          className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-700 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 resize-none transition"
          placeholder="What is this for?" />
      </div>

      <button onClick={handleSend} disabled={loading}
        className="w-full py-3 rounded-xl font-semibold text-white text-sm transition-all active:scale-95 disabled:opacity-70"
        style={{ background: loading ? "#64748b" : "linear-gradient(135deg,#3b82f6,#2563eb)", boxShadow: "0 4px 14px rgba(59,130,246,0.35)" }}>
        {loading ? "Sending..." : "Send Money"}
      </button>
    </div>
  );
}

export default SendPayoutForm;