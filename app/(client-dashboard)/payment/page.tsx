"use client";

import React, {useRef, useState } from "react";
import {
  Filter,
  Download,
  X,
  CreditCard,
  Wallet,
  FileText,
  Users,
  Zap,
  CheckCircle,
  ArrowRightLeft,
  Search,
  Bell,
  MoreHorizontal,
  ArrowUpRight,
  ShieldCheck,
  Building2,
  AlertCircle,
  Clock,
  RefreshCcw,
  Loader2,
  Check,
  ChevronDown,
  Copy,
  ChevronUp,
  ArrowDownLeft,
  QrCode,
} from "lucide-react";
import Link from "next/link";


const theme = {
  colors: {
    primary: "bg-indigo-600 hover:bg-indigo-700 text-white",
    primaryLight: "bg-indigo-50 text-indigo-700",
    success: "text-emerald-600 bg-emerald-50 border-emerald-200",
    warning: "text-amber-600 bg-amber-50 border-amber-200",
    danger: "text-rose-600 bg-rose-50 border-rose-200",
    neutral: "text-slate-600 bg-slate-100 border-slate-200",
  },
  card: "bg-white rounded-2xl border border-slate-200 shadow-sm",
  input:
    "w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all",
  btn: {
    primary:
      "px-4 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-semibold shadow-sm hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed",
    secondary:
      "px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 text-sm font-semibold hover:bg-slate-50 transition-all flex items-center justify-center gap-2",
    ghost: "p-2 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors",
  },
};

type MilestoneStatus =
  | "Pending"
  | "Awaiting"
  | "Locked"
  | "Released"
  | "Disputed"
  | "Refunded"
  | "Completed";

interface Milestone {
  id: string;
  title: string;
  project: string;
  amount: number;
  status: MilestoneStatus;
  date: string;
}

interface Notification {
  id: number;
  type: "success" | "error";
  message: string;
}

const StatusBadge = ({ status }: { status: MilestoneStatus | string }) => {
  const styles =
    status === "Released" || status === "Completed"
      ? theme.colors.success
      : status === "In Escrow" || status === "Locked"
      ? theme.colors.primaryLight
      : status === "Pending" || status === "Awaiting"
      ? theme.colors.warning
      : status === "Disputed" || status === "Refunded"
      ? theme.colors.danger
      : theme.colors.neutral;

  return (
    <span
      className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${styles} flex items-center gap-1.5 w-fit`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
};

const ToastContainer = ({
  notifications,
  remove,
}: {
  notifications: Notification[];
  remove: (id: number) => void;
}) => {
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      {notifications.map((note) => (
        <div
          key={note.id}
          className={`flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg border animate-in slide-in-from-right ${
            note.type === "success"
              ? "bg-white border-emerald-100 text-emerald-800"
              : "bg-white border-rose-100 text-rose-800"
          }`}
        >
          {note.type === "success" ? (
            <CheckCircle size={18} className="text-emerald-500" />
          ) : (
            <AlertCircle size={18} className="text-rose-500" />
          )}
          <span className="text-sm font-medium">{note.message}</span>
          <button
            onClick={() => remove(note.id)}
            className="ml-2 hover:bg-black/5 p-1 rounded-full"
          >
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  );
};

export default function ClientDashboardPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [walletBalance, setWalletBalance] = useState(45000);
  const [milestones, setMilestones] = useState<Milestone[]>([
    {
      id: "M1",
      title: "Backend API Integration",
      project: "Hexco CRM",
      amount: 25000,
      status: "Locked",
      date: "Nov 20",
    },
    {
      id: "M2",
      title: "QA & Testing",
      project: "Hexco CRM",
      amount: 10000,
      status: "Awaiting",
      date: "Dec 05",
    },
    {
      id: "M3",
      title: "UI/UX Homepage",
      project: "Solaris Web",
      amount: 15000,
      status: "Released",
      date: "Oct 15",
    },
  ]);

  const escrowLocked = milestones
    .filter((m) => m.status === "Locked")
    .reduce((acc, curr) => acc + curr.amount, 0);
  const pendingApprovals = milestones.filter(
    (m) => m.status === "Awaiting"
  ).length;

  const addNotification = (type: "success" | "error", message: string) => {
    const id = Date.now();
    setNotifications((prev) => [...prev, { id, type, message }]);
    setTimeout(
      () => setNotifications((prev) => prev.filter((n) => n.id !== id)),
      4000
    );
  };

  const handleFundMilestone = (id: string, amount: number) => {
    if (walletBalance < amount) {
      addNotification(
        "error",
        "Insufficient wallet balance. Please add funds."
      );
      return;
    }
    setWalletBalance((prev) => prev - amount);
    setMilestones((prev) =>
      prev.map((m) => (m.id === id ? { ...m, status: "Locked" } : m))
    );
    addNotification("success", `₹${amount.toLocaleString()} moved to Escrow.`);
  };

  const handleReleaseMilestone = (id: string) => {
    setMilestones((prev) =>
      prev.map((m) => (m.id === id ? { ...m, status: "Released" } : m))
    );
    addNotification("success", "Milestone released to freelancer.");
  };

  const handleAddFunds = (amount: number) => {
    setWalletBalance((prev) => prev + amount);
    addNotification("success", `₹${amount.toLocaleString()} added to wallet.`);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans pb-20">
      <ToastContainer
        notifications={notifications}
        remove={(id) =>
          setNotifications((prev) => prev.filter((n) => n.id !== id))
        }
      />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <ClientPanel
            balance={walletBalance}
            locked={escrowLocked}
            pendingCount={pendingApprovals}
            milestones={milestones}
            onFund={handleFundMilestone}
            onRelease={handleReleaseMilestone}
            onAddFunds={handleAddFunds}
            addNotification={addNotification}
          />
        </div>
      </main>
    </div>
  );
}

interface ClientPanelProps {
  balance: number;
  locked: number;
  pendingCount: number;
  milestones: Milestone[];
  onFund: (id: string, amount: number) => void;
  onRelease: (id: string) => void;
  onAddFunds: (amount: number) => void;
  addNotification: (type: "success" | "error", message: string) => void;
}

function ClientPanel({
  balance,
  locked,
  pendingCount,
  milestones,
  onFund,
  onRelease,
  onAddFunds,
  addNotification,
}: ClientPanelProps) {
  const [activeTab, setActiveTab] = useState("Wallet");
  const [isWalletExpanded, setIsWalletExpanded] = useState(false);
  const [isMilestonesExpanded, setIsMilestonesExpanded] = useState(false);
  const [isHistoryExpanded, setIsHistoryExpanded] = useState(false);
  const [isTimelineExpanded, setIsTimelineExpanded] = useState(false);

  const [fundAmount, setFundAmount] = useState("");
  const [txnId, setTxnId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const isAmountValid = Number(fundAmount) > 0;
  const [showFilters, setShowFilters] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>("All");

  const transactions = [
    { id: "TX-9901", type: "Credit", desc: "Wallet Funding", amount: 45000, date: "Nov 18, 2024", status: "Success" },
    { id: "TX-9902", type: "Debit", desc: "Escrow: Backend API", amount: 25000, date: "Nov 20, 2024", status: "Locked" },
    { id: "TX-9903", type: "Debit", desc: "Escrow: QA Testing", amount: 10000, date: "Dec 05, 2024", status: "Locked" },
    { id: "TX-9904", type: "Credit", desc: "Refund: Change Req", amount: 5000, date: "Dec 10, 2024", status: "Success" },
  ];

  const filteredMilestones = milestones.filter((m) => {
    if (m.status === "Completed" || m.status === "Refunded") return false;
    if (statusFilter === "All") return true;
    return m.status === statusFilter;
  });

  const handleFundSubmit = () => {
    if (!fundAmount || !txnId) return;
    setIsSubmitting(true);
    setTimeout(() => {
      onAddFunds(Number(fundAmount));
      setIsSubmitting(false);
      setFundAmount("");
      setTxnId("");
    }, 1500);
  };

  const handleFile = (f: File) => {
    if (!["image/png", "image/jpeg", "application/pdf"].includes(f.type)) {
      addNotification("error", "Only PNG, JPG or PDF allowed");
      return;
    }
    if (f.size > 5 * 1024 * 1024) {
      addNotification("error", "Max file size is 5MB");
      return;
    }
    setFile(f);
    addNotification("success", "File selected");
  };

  const handleSubmit = () => {
    if (!isAmountValid) { addNotification("error", "Amount > 0 required"); return; }
    if (!txnId) { addNotification("error", "Transaction ID required"); return; }
    if (!file) { addNotification("error", "Upload proof screenshot"); return; }
    setFundAmount("");
    setTxnId("");
    setFile(null);
    addNotification("success", "Payment submitted for verification");
  };

  const downloadStatement = () => {
    addNotification("success", "Statement downloaded");
  };

  return (
    <>
      <section className="lg:col-span-9 xl:col-span-9 space-y-8">
        {/* WALLET & METRICS HEADER - REDESIGNED PER IMAGES */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* 1. Wallet Balance Card */}
          <div className={`${theme.card} p-5 relative overflow-hidden transition-all hover:shadow-md hover:-translate-y-0.5 group`}>
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1">Wallet Balance</p>
                <h2 className="text-2xl font-black text-slate-900 tracking-tighter">₹{balance.toLocaleString()}</h2>
              </div>
              <div className="p-2.5 bg-slate-50 text-slate-600 rounded-xl border border-slate-100 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                <Wallet size={20} />
              </div>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-[11px] font-bold text-emerald-600 uppercase tracking-wide">Ready to fund</span>
            </div>
          </div>

          {/* 2. Escrow Locked Card */}
          <div className={`${theme.card} p-5 relative overflow-hidden transition-all hover:shadow-md hover:-translate-y-0.5 group`}>
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-[11px] font-bold text-indigo-400 uppercase tracking-widest mb-1">In Escrow</p>
                <h2 className="text-2xl font-black text-slate-900 tracking-tighter">₹{locked.toLocaleString()}</h2>
              </div>
              <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl border border-indigo-100 group-hover:bg-indigo-100 transition-colors">
                <ShieldCheck size={20} />
              </div>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-[11px] font-bold text-indigo-500 uppercase tracking-wide opacity-80">Funds are protected</span>
            </div>
           
          </div>

          {/* 3. Pending Approvals Card */}
          <div className={`${theme.card} p-5 relative overflow-hidden transition-all hover:shadow-md hover:-translate-y-0.5 group`}>
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-[11px] font-bold text-amber-500 uppercase tracking-widest mb-1">Approvals</p>
                <h2 className="text-2xl font-black text-slate-900 tracking-tighter">{pendingCount}</h2>
              </div>
              <div className="p-2.5 bg-amber-50 text-amber-600 rounded-xl border border-amber-100 group-hover:bg-amber-100 transition-colors">
                <Clock size={20} />
              </div>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-[11px] font-bold text-amber-600 uppercase tracking-wide opacity-80">Waiting for review</span>
            </div>
            
          </div>

          {/* 4. Refunds Card */}
          <div className={`${theme.card} p-5 relative overflow-hidden transition-all hover:shadow-md hover:-translate-y-0.5 group`}>
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-[11px] font-bold text-emerald-500 uppercase tracking-widest mb-1">Refunds</p>
                <h2 className="text-2xl font-black text-slate-900 tracking-tighter">₹0</h2>
              </div>
              <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl border border-emerald-100 group-hover:bg-emerald-100 transition-colors">
                <RefreshCcw size={20} />
              </div>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-[11px] font-bold text-emerald-600 uppercase tracking-wide opacity-80">Processed successfully</span>
            </div>
  
          </div>
        </div>

        {/* WALLET & MANUAL PAYMENTS ACCORDION */}
        {activeTab === "Wallet" && (
         <div className={`${theme.card} transition-all overflow-hidden`}>
  <div className="p-4 sm:p-6 lg:p-8">
    {/* Header Section: Stacked on mobile, side-by-side on sm+ */}
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h3 className="text-lg font-black text-slate-900 tracking-tight">Wallet & Manual Payments</h3>
        <p className="text-sm text-slate-500">Send via UPI / bank, then upload proof to credit your wallet.</p>
      </div>
      <button
        onClick={() => setIsWalletExpanded(!isWalletExpanded)}
        className="w-full sm:w-auto bg-[#0095FF] text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-md shadow-blue-100 hover:bg-[#0080FF] active:scale-95 transition-all flex items-center justify-center gap-2"
      >
        {isWalletExpanded ? "Close Panel" : "Add Funds Now"}
        {isWalletExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>
    </div>

    {isWalletExpanded && (
      <div className="mt-6 pt-6 sm:mt-8 sm:pt-8 border-t border-slate-100 animate-in fade-in slide-in-from-top-4 duration-300">
        {/* Main Grid: Single column on mobile/tablet, 2 columns on Desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          
          {/* Step 1 Column */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-black shrink-0">1</div>
              <h4 className="font-black text-slate-900 uppercase tracking-wide text-xs">Send payment details</h4>
            </div>
            
            <div className="bg-slate-50/80 rounded-2xl p-4 sm:p-6 border border-slate-200">
              {/* UPI Section */}
              <div className="mb-6 sm:mb-8">
                <p className="text-[10px] text-slate-400 font-black uppercase mb-3 tracking-[0.2em]">UPI ID</p>
                <div className="flex flex-col xs:flex-row items-start xs:items-center justify-between p-4 bg-white rounded-xl border border-slate-200 shadow-sm group gap-3">
                  <span className="text-base sm:text-lg font-black text-slate-900 break-all">herofreelancer@upi</span>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText("herofreelancer@upi");
                      addNotification("success", "UPI ID Copied");
                    }}
                    className="w-full xs:w-auto text-[10px] font-black uppercase border border-slate-200 px-4 py-2 rounded-lg text-slate-600 bg-slate-50 hover:bg-white active:scale-95 transition-all flex items-center justify-center gap-2 whitespace-nowrap"
                  >
                    <Copy size={12} /> Copy
                  </button>
                </div>
              </div>

              {/* Bank Details Section */}
              <div className="mb-6 sm:mb-8">
                <p className="text-[10px] text-slate-400 font-black uppercase mb-3 tracking-[0.2em]">Bank Transfer</p>
                <div className="space-y-3 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                  <div className="flex flex-col xs:flex-row justify-between text-sm gap-1">
                    <span className="text-slate-400">Account</span>
                    <span className="font-bold text-right">Hero Freelancer Pvt Ltd</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">A/C No</span>
                    <span className="font-bold">1234 5678 900</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">IFSC</span>
                    <span className="font-bold tracking-widest text-indigo-600">HERO0001234</span>
                  </div>
                </div>
              </div>

              {/* QR Section */}
              <div className="p-4 bg-white rounded-2xl border border-slate-200 flex flex-col items-center justify-center text-center shadow-sm">
                <p className="text-[10px] text-slate-400 font-black uppercase mb-4 tracking-widest flex items-center gap-2">
                  <QrCode size={14} /> Scan & Pay
                </p>
                <div className="p-3 bg-white border-2 border-slate-50 rounded-2xl mb-3">
                  <img
                    src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=upi://pay?pa=herofreelancer@upi&pn=HeroFreelancer"
                    alt="Payment QR"
                    className="w-28 h-28 sm:w-36 sm:h-36"
                  />
                </div>
                <p className="text-[10px] font-bold text-slate-400 uppercase">Accepts all UPI Apps</p>
              </div>
            </div>
          </div>

          {/* Step 2 Column */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-black shrink-0">2</div>
              <h4 className="font-black text-slate-900 uppercase tracking-wide text-xs">Verify payment proof</h4>
            </div>
            
            <form onSubmit={(e) => { e.preventDefault(); handleFundSubmit(); }} className="space-y-6">
              {/* Form Inputs Grid: Stacked on mobile, 2 columns on sm+ */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Amount (₹)</label>
                  <input type="number" value={fundAmount} onChange={(e) => setFundAmount(e.target.value)} className={`${theme.input} w-full`} placeholder="e.g. 25,000" required />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">UTR / TXN ID</label>
                  <input type="text" value={txnId} onChange={(e) => setTxnId(e.target.value)} className={`${theme.input} w-full`} placeholder="Ref ID from App" required />
                </div>
              </div>

              {/* Upload Area */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Payment screenshot</label>
                <div 
                  onDrop={(e) => { e.preventDefault(); handleFile(e.dataTransfer.files[0]); }}
                  onDragOver={(e) => e.preventDefault()}
                  onClick={() => fileRef.current?.click()}
                  className="border-2 border-dashed border-slate-200 rounded-2xl py-8 sm:py-12 px-4 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-slate-50 hover:border-indigo-300 transition-all bg-slate-50/30"
                >
                  <div className="p-3 bg-white rounded-xl shadow-sm mb-3 border border-slate-100 text-slate-400">
                    <ArrowRightLeft size={24} />
                  </div>
                  <p className="text-sm font-bold text-slate-600 line-clamp-1">
                    {file ? file.name : "Click to select or drag screenshot"}
                  </p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase mt-1">Max 5MB • PNG, JPG, PDF</p>
                  <input ref={fileRef} type="file" hidden onChange={(e) => e.target.files && handleFile(e.target.files[0])} />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Add Notes</label>
                <textarea rows={2} className={`${theme.input} w-full resize-none`} placeholder="e.g. For Logo Design Milestone"></textarea>
              </div>

              {/* Submit Area: Stacked on mobile, Row on sm+ */}
              <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 pt-4">
                <button 
                  onClick={handleSubmit} 
                  className="w-full sm:w-auto bg-slate-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-black active:scale-95 transition-all shadow-xl shadow-slate-200"
                >
                  Submit Verification
                </button>
                <p className="text-[10px] font-bold text-slate-400 uppercase text-center sm:text-left leading-relaxed max-w-[200px]">
                  Verification within 2–6 working hours.
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    )}
  </div>
</div>
        )}

        {/* ACTIVE MILESTONES TABLE */}
        <div className={theme.card}>
          <div className="p-5 border-b border-slate-100 flex justify-between items-center cursor-pointer hover:bg-slate-50 transition-colors rounded-t-2xl" onClick={() => setIsMilestonesExpanded(!isMilestonesExpanded)}>
            <h3 className="font-black text-slate-900 text-sm uppercase tracking-widest flex items-center gap-2">
              Active Milestones
              {isMilestonesExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </h3>
            <button className="text-[10px] font-black uppercase text-indigo-600 tracking-widest flex items-center gap-1">View All <ArrowUpRight size={14} /></button>
          </div>

          {isMilestonesExpanded && (
            <div className="overflow-x-auto animate-in slide-in-from-top-2 duration-300">
              <table className="w-full text-sm text-left">
                <thead className="bg-slate-50/50 text-slate-400 text-[10px] uppercase font-black tracking-[0.15em]">
                  <tr>
                    <th className="px-6 py-4">Project Details</th>
                    <th className="px-6 py-4 text-right">Amount</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredMilestones.length === 0 ? (
                    <tr><td colSpan={4} className="px-6 py-12 text-center text-slate-400 font-bold uppercase text-[10px] tracking-widest">No active milestones found</td></tr>
                  ) : (
                    filteredMilestones.map((milestone) => (
                      <tr key={milestone.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-5">
                          <div className="font-bold text-slate-900">{milestone.title}</div>
                          <div className="text-[11px] font-bold text-slate-400 mt-0.5">{milestone.project} • {milestone.date}</div>
                        </td>
                        <td className="px-6 py-5 text-right font-black text-slate-900">₹{milestone.amount.toLocaleString()}</td>
                        <td className="px-6 py-5"><StatusBadge status={milestone.status} /></td>
                        <td className="px-6 py-5 text-right">
                          {milestone.status === "Awaiting" && <button onClick={() => onFund(milestone.id, milestone.amount)} className="text-[10px] font-black uppercase text-white bg-indigo-600 px-4 py-2 rounded-lg shadow-md shadow-indigo-100 hover:bg-indigo-700 transition-all">Fund</button>}
                          {milestone.status === "Locked" && <button onClick={() => onRelease(milestone.id)} className="text-[10px] font-black uppercase text-emerald-700 bg-emerald-100 border border-emerald-200 px-4 py-2 rounded-lg hover:bg-emerald-200 transition-all">Release</button>}
                          {milestone.status === "Released" && <span className="text-[10px] font-black uppercase text-slate-400">Paid</span>}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* TRANSACTION HISTORY */}
        <div className={theme.card}>
          <div className="p-5 border-b border-slate-100 flex justify-between items-center cursor-pointer hover:bg-slate-50 transition-colors rounded-t-2xl" onClick={() => setIsHistoryExpanded(!isHistoryExpanded)}>
            <h3 className="font-black text-slate-900 text-sm uppercase tracking-widest flex items-center gap-2">
              Payment History
              {isHistoryExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </h3>
            <button onClick={(e) => { e.stopPropagation(); downloadStatement(); }} className="text-[10px] font-black uppercase text-indigo-600 tracking-widest flex items-center gap-2"><Download size={14} /> Download</button>
          </div>

          {isHistoryExpanded && (
            <div className="overflow-x-auto animate-in slide-in-from-top-2 duration-300">
              <table className="w-full text-sm text-left">
                <thead className="bg-slate-50/50 text-slate-400 text-[10px] uppercase font-black tracking-[0.15em]">
                  <tr>
                    <th className="px-6 py-4">Transaction</th>
                    <th className="px-6 py-4">Date</th>
                    <th className="px-6 py-4 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {transactions.map((tx) => (
                    <tr key={tx.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-5">
                        <div className="font-bold text-slate-900">{tx.desc}</div>
                        <div className="text-[10px] font-black text-slate-400 mt-0.5">{tx.id} • {tx.status}</div>
                      </td>
                      <td className="px-6 py-5 text-slate-500 font-bold text-xs">{tx.date}</td>
                      <td className={`px-6 py-5 text-right font-black ${tx.type === "Credit" ? "text-emerald-600" : "text-slate-900"}`}>
                        {tx.type === "Credit" ? "+" : "-"}₹{tx.amount.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>

      {/* SIDEBAR */}
      <aside className="lg:col-span-3 xl:col-span-3 space-y-6">
        <div className={`${theme.card} p-5`}>
          <button onClick={() => setIsTimelineExpanded(!isTimelineExpanded)} className="text-[10px] font-black uppercase tracking-widest text-slate-900 flex items-center justify-between w-full">
            Activity Timeline
            {isTimelineExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
          
          {isTimelineExpanded && (
            <div className="mt-6 relative pl-4 border-l-2 border-slate-100 space-y-8 animate-in fade-in slide-in-from-top-2">
              <div className="relative">
                <div className="absolute -left-[21px] top-1.5 h-3 w-3 rounded-full bg-[#0095FF] ring-4 ring-white"></div>
                <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Today • 11:10 AM</p>
                <p className="text-xs font-bold text-slate-800 tracking-tight leading-snug">₹25,000 moved to escrow for <span className="text-indigo-600 font-black">“Hexco CRM”</span>.</p>
              </div>
              <div className="relative">
                <div className="absolute -left-[21px] top-1.5 h-3 w-3 rounded-full bg-emerald-500 ring-4 ring-white"></div>
                <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Yesterday • 5:45 PM</p>
                <p className="text-xs font-bold text-slate-800 tracking-tight leading-snug">₹20,000 released for <span className="text-emerald-600 font-black">“Solaris Web”</span>.</p>
              </div>
            </div>
          )}
        </div>

        <div className={`${theme.card} p-6 bg-slate-900 text-white border-slate-800 relative overflow-hidden group`}>
          <div className="flex items-center gap-4 mb-4 relative z-10">
            <div className="relative shrink-0">
              <img src="https://i.pravatar.cc/100?img=11" className="w-12 h-12 rounded-full border-2 border-indigo-500 p-0.5 object-cover" alt="Manager" />
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-slate-900 rounded-full animate-pulse"></span>
            </div>
            <div>
              <p className="text-black text-sm tracking-tight ">Amit Sharma</p>
              <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Finance Lead</p>
            </div>
          </div>
          <p className="text-xs  font-bold text-black mb-6 leading-relaxed relative z-10 opacity-80">
            Need help with large transactions or escrow disputes? Amit is your dedicated support agent.
          </p>
          <Link href="/messages">
            <button className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white text-[10px] font-black uppercase tracking-widest rounded-xl transition-all shadow-xl shadow-indigo-900/40 relative z-10 active:scale-95">
            Chat with Amit
          </button>
          </Link>
          {/* Subtle logo bg */}
          <ShieldCheck size={120} className="absolute -right-8 -bottom-8 text-white opacity-[0.03] group-hover:rotate-12 transition-transform duration-700" />
        </div>
      </aside>
    </>
  );
}