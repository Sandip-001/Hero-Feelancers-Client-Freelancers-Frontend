"use client";
import {
    AlertCircle,
    ArrowDownToLine,
    ArrowUpRight,
    Calendar,
    CheckCircle2,
    ChevronLeft,
    CreditCard,
    Download,
    FileText,
    Filter,
    Landmark,
    MessageCircle,
    MessageSquare,
    Phone,
    Plus,
    Search,
    TrendingUp,
    Wallet,
    X
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCallback, useMemo, useState } from "react";

// --- 1. Define Types & Interfaces ---

type TransactionType = "Project" | "Withdrawal";
type TransactionStatus = "Funded" | "Released" | "Pending" | "Processing" | "Completed" | "Failed";

interface Transaction {
  id: string;
  type: TransactionType;
  title: string; 
  subtitle: string; 
  amount: number;
  status: TransactionStatus;
  date: string;
  logo: React.ReactNode;
  color: string;
}

interface ToastState {
  show: boolean;
  message: string;
  type: "success" | "error";
}

interface PayoutMethod {
  id: string;
  bankName: string;
  accountNumber: string; 
  maskedNumber: string;
  holderName: string;
  ifsc: string;
}

// --- 2. Initial Mock Data ---
const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: "TXN-8832",
    type: "Project",
    title: "Food Delivery App",
    subtitle: "Milestone: UI/UX Design",
    amount: 18000,
    status: "Funded",
    date: "2025-10-12",
    logo: "FD",
    color: "bg-orange-100 text-orange-600",
  },
  {
    id: "TXN-9941",
    type: "Project",
    title: "E-Commerce Platform",
    subtitle: "Milestone: Backend Dev",
    amount: 45000,
    status: "Released",
    date: "2025-10-05",
    logo: "EC",
    color: "bg-blue-100 text-blue-600",
  },
  {
    id: "WD-1029",
    type: "Withdrawal",
    title: "Withdrawal to HDFC Bank",
    subtitle: "Acct ending in ****8821",
    amount: 20000,
    status: "Completed",
    date: "2025-10-06",
    logo: <Landmark className="w-5 h-5" />,
    color: "bg-red-100 text-red-600",
  },
  {
    id: "TXN-7721",
    type: "Project",
    title: "CRM System Dashboard",
    subtitle: "Milestone: API Integration",
    amount: 22500,
    status: "Pending",
    date: "2025-10-01",
    logo: "CR",
    color: "bg-purple-100 text-purple-600",
  },
  {
    id: "TXN-6619",
    type: "Project",
    title: "Portfolio Website",
    subtitle: "Milestone: Final Deployment",
    amount: 12000,
    status: "Released",
    date: "2025-09-28",
    logo: "PW",
    color: "bg-pink-100 text-pink-600",
  },
];

const INITIAL_PAYOUT_METHODS: PayoutMethod[] = [
    { id: "pm-1", bankName: "HDFC Bank", accountNumber: "XXXXXXXX8821", maskedNumber: "****8821", holderName: "Amit Sharma", ifsc: "HDFC0001234" },
    { id: "pm-2", bankName: "SBI Bank", accountNumber: "XXXXXXXX1102", maskedNumber: "****1102", holderName: "Amit Sharma", ifsc: "SBIN0004321" },
];

export default function PaymentHistoryPage() {
  // --- State Management ---
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);
  const [payoutMethods, setPayoutMethods] = useState<PayoutMethod[]>(INITIAL_PAYOUT_METHODS);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("");
  
  // Modal State
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const [modalView, setModalView] = useState<"withdraw" | "add-method">("withdraw");
  
  // Form States
  const [withdrawAmount, setWithdrawAmount] = useState<string>("");
  const [selectedMethodId, setSelectedMethodId] = useState<string>(INITIAL_PAYOUT_METHODS[0].id);
  
  const [newBankDetails, setNewBankDetails] = useState({
      bankName: "",
      accountNumber: "",
      holderName: "",
      ifsc: ""
  });
  
  // Toast State
  const [toast, setToast] = useState<ToastState>({ show: false, message: "", type: "success" });

  // --- Financial Calculations ---
  const totalReleasedIncome = transactions
    .filter((t) => t.type === "Project" && t.status === "Released")
    .reduce((acc, curr) => acc + curr.amount, 0);

  const totalWithdrawn = transactions
    .filter((t) => t.type === "Withdrawal" && (t.status === "Completed" || t.status === "Processing"))
    .reduce((acc, curr) => acc + curr.amount, 0);

  const availableBalance = totalReleasedIncome - totalWithdrawn;

  const totalPending = transactions
    .filter((t) => t.type === "Project" && (t.status === "Pending" || t.status === "Funded"))
    .reduce((acc, curr) => acc + curr.amount, 0);

  const lifetimeEarnings = totalReleasedIncome; 

  // --- Filtering Logic ---
  const filteredRows = useMemo(() => {
    return transactions.filter((row) => {
      const matchesSearch = row.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            row.id.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === "All" || row.status === statusFilter;
      const matchesDate = !dateFilter || row.date === dateFilter;

      return matchesSearch && matchesStatus && matchesDate;
    });
  }, [transactions, searchQuery, statusFilter, dateFilter]);


  // --- Actions ---

  const showToast = (message: string, type: "success" | "error") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast(prev => ({ ...prev, show: false })), 3000);
  };

  const resetModal = () => {
      setIsWithdrawModalOpen(false);
      setModalView("withdraw");
      setWithdrawAmount("");
      setNewBankDetails({ bankName: "", accountNumber: "", holderName: "", ifsc: "" });
  };

  const handleAddBankMethod = (e: React.FormEvent) => {
      e.preventDefault();
      const { bankName, accountNumber, holderName, ifsc } = newBankDetails;

      if (!bankName || !accountNumber || !holderName || !ifsc) {
          showToast("Please fill in all bank details.", "error");
          return;
      }

      const masked = `****${accountNumber.slice(-4)}`;
      const newMethod: PayoutMethod = {
          id: `pm-${Date.now()}`,
          bankName,
          accountNumber,
          maskedNumber: masked,
          holderName,
          ifsc
      };

      setPayoutMethods([...payoutMethods, newMethod]);
      setSelectedMethodId(newMethod.id); 
      setModalView("withdraw"); 
      setNewBankDetails({ bankName: "", accountNumber: "", holderName: "", ifsc: "" });
      showToast("Bank account added successfully!", "success");
  };

  const handleWithdrawSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(withdrawAmount);
    const method = payoutMethods.find(m => m.id === selectedMethodId);

    if (isNaN(amount) || amount <= 0) {
      showToast("Please enter a valid amount.", "error");
      return;
    }

    if (amount > availableBalance) {
      showToast("Insufficient available balance.", "error");
      return;
    }

    if (!method) {
        showToast("Please select a payout method.", "error");
        return;
    }

    const newTransaction: Transaction = {
      id: `WD-${Math.floor(1000 + Math.random() * 9000)}`,
      type: "Withdrawal",
      title: `Withdrawal to ${method.bankName}`,
      subtitle: `Acct ending in ${method.maskedNumber}`,
      amount: amount,
      status: "Processing",
      date: new Date().toISOString().split('T')[0],
      logo: <Landmark className="w-5 h-5" />,
      color: "bg-red-100 text-red-600",
    };

    setTransactions([newTransaction, ...transactions]);
    resetModal();
    showToast(`Withdrawal request of ₹${amount.toLocaleString()} submitted.`, "success");
  };

  const handleExportCSV = useCallback(() => {
    const header = ["ID", "Type", "Title", "Amount", "Status", "Date"];
    const csvRows = [
      header.join(","),
      ...filteredRows.map((r) =>
        [r.id, r.type, r.title, r.amount, r.status, r.date].join(",")
      ),
    ];

    const blob = new Blob([csvRows.join("\n")], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "payment_history.csv";
    link.click();
    showToast("CSV Export downloaded successfully.", "success");
  }, [filteredRows]);

  const handleDownloadInvoice = (transactionId: string) => {
    const blob = new Blob([`INVOICE #${transactionId}\n\nDate: ${new Date().toLocaleDateString()}\nStatus: Paid\n\nThank you for your business.`], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Invoice_${transactionId}.txt`;
    link.click();
    showToast("Invoice downloaded.", "success");
  };

  const getStatusBadge = (status: TransactionStatus) => {
    switch (status) {
      case "Funded": return <Badge className="bg-amber-100 text-amber-700 border-amber-200 shadow-none">In Escrow</Badge>;
      case "Released": return <Badge className="bg-green-100 text-green-700 border-green-200 shadow-none">Funds Available</Badge>;
      case "Completed": return <Badge className="bg-slate-100 text-slate-600 border-slate-200 shadow-none">Transferred</Badge>;
      case "Processing": return <Badge className="bg-blue-50 text-blue-600 border-blue-200 shadow-none animate-pulse">Processing</Badge>;
      case "Pending": return <Badge variant="outline" className="text-slate-500 border-slate-300">Pending</Badge>;
      default: return <Badge variant="destructive">{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 px-0 py-6 sm:px-6 lg:p-10 space-y-8 font-sans relative pb-24">
      
      {/* --- TOAST NOTIFICATION --- */}
      {toast.show && (
        <div className={`fixed top-5 right-5 z-50 flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg border animate-in slide-in-from-top-5 duration-300 ${
          toast.type === "success" ? "bg-white border-green-200 text-green-800" : "bg-white border-red-200 text-red-800"
        }`}>
          {toast.type === "success" ? <CheckCircle2 className="w-5 h-5 text-green-600" /> : <AlertCircle className="w-5 h-5 text-red-600" />}
          <p className="text-sm font-medium">{toast.message}</p>
        </div>
      )}

      {/* --- HEADER (Added mobile padding) --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-4 sm:px-0">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Financial Overview</h1>
          <p className="text-slate-500 mt-1">Track your project earnings and manage withdrawals.</p>
        </div>
        <div className="flex gap-3">
            <Button 
                variant="outline" 
                className="bg-white hover:bg-slate-50 text-slate-700 border-slate-200 shadow-sm flex-1 sm:flex-none"
                onClick={() => showToast("Tax Report functionality coming soon!", "success")}
            >
                <FileText className="w-4 h-4 mr-2" />
                Tax Report
            </Button>
            <Button 
                onClick={handleExportCSV}
                className="bg-[#14A9F9] hover:bg-[#0f90d6] text-white shadow-md shadow-blue-500/20 flex-1 sm:flex-none"
            >
                <Download className="w-4 h-4 mr-2" />
                Export CSV
            </Button>
        </div>
      </div>

      {/* --- STATS ROW (Added mobile padding) --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4 sm:px-0">
        <Card className="border-none shadow-sm bg-gradient-to-br from-[#14A9F9] to-[#0B8BCF] text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
                <Wallet className="w-24 h-24" />
            </div>
            <CardContent className="p-6">
                <p className="text-blue-100 text-sm font-medium mb-1">Lifetime Earnings</p>
                <div className="flex items-baseline gap-2">
                    <h2 className="text-3xl font-bold">₹{lifetimeEarnings.toLocaleString()}</h2>
                    <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full flex items-center text-white">
                        <TrendingUp className="w-3 h-3 mr-1" /> +12%
                    </span>
                </div>
            </CardContent>
        </Card>

        <Card className="border border-emerald-100 shadow-sm bg-emerald-50/50">
            <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <p className="text-emerald-800 text-sm font-medium">Available for Withdrawal</p>
                        <h2 className="text-3xl font-bold text-emerald-900 mt-1">₹{availableBalance.toLocaleString()}</h2>
                    </div>
                    <div className="p-2 bg-emerald-200 rounded-lg">
                        <ArrowUpRight className="w-6 h-6 text-emerald-700" />
                    </div>
                </div>
                <Button 
                    size="sm" 
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white border-none h-9 shadow-sm"
                    onClick={() => setIsWithdrawModalOpen(true)}
                >
                    Request Payout
                </Button>
            </CardContent>
        </Card>

        <Card className="border border-slate-200 shadow-sm bg-white">
            <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <p className="text-slate-500 text-sm font-medium">In Escrow / Pending</p>
                        <h2 className="text-3xl font-bold text-slate-800 mt-1">₹{totalPending.toLocaleString()}</h2>
                    </div>
                    <div className="p-2 bg-amber-50 rounded-lg">
                        <CreditCard className="w-6 h-6 text-amber-500" />
                    </div>
                </div>
                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-amber-400 h-full w-[65%]" />
                </div>
                <p className="text-xs text-slate-400 mt-2">Will be available upon milestone completion</p>
            </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 px-0 sm:px-0">
        
        {/* --- MAIN TABLE --- */}
        <div className="lg:col-span-8 xl:col-span-9 space-y-4 px-4 sm:px-0">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input 
                        placeholder="Search projects or IDs..."
                        className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#14A9F9]/20 focus:border-[#14A9F9] transition"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="flex gap-2">
                    <select 
                        className="bg-slate-50 border border-slate-200 text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-[#14A9F9] text-slate-600 cursor-pointer flex-1 sm:flex-none"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <option value="All">All Status</option>
                        <option value="Funded">Funded</option>
                        <option value="Released">Released</option>
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="Completed">Completed</option>
                    </select>
                    
                    <input 
                        type="date" 
                        className="bg-slate-50 border border-slate-200 text-sm rounded-lg px-3 py-2 text-slate-600 focus:outline-none focus:border-[#14A9F9] flex-1 sm:flex-none"
                        value={dateFilter}
                        onChange={(e) => setDateFilter(e.target.value)}
                    />
                </div>
            </div>

            {/* Table */}
            <Card className="border-slate-200 shadow-sm overflow-hidden bg-white sm:rounded-xl rounded-none border-x-0 sm:border-x">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[700px]">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-xs uppercase tracking-wider font-medium">
                                <th className="p-5">Transaction Details</th>
                                <th className="p-5">Note / Milestone</th>
                                <th className="p-5">Date</th>
                                <th className="p-5">Amount</th>
                                <th className="p-5">Status</th>
                                <th className="p-5 text-right">Invoice</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm divide-y divide-slate-100">
                            {filteredRows.length > 0 ? filteredRows.map((row) => (
                                <tr key={row.id} className="hover:bg-slate-50/80 transition-colors group">
                                    <td className="p-5">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-xs ${row.color}`}>
                                                {row.logo}
                                            </div>
                                            <div>
                                                <p className="font-semibold text-slate-800">{row.title}</p>
                                                <p className="text-xs text-slate-500 font-mono">{row.id}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-5 text-slate-600">{row.subtitle}</td>
                                    <td className="p-5 text-slate-600">
                                        <div className="flex items-center gap-2">
                                            <Calendar className="w-3.5 h-3.5 text-slate-400" />
                                            {row.date}
                                        </div>
                                    </td>
                                    <td className={`p-5 font-bold ${row.type === "Withdrawal" ? "text-red-600" : "text-green-600"}`}>
                                        {row.type === "Withdrawal" ? "-" : "+"} ₹{row.amount.toLocaleString()}
                                    </td>
                                    <td className="p-5">{getStatusBadge(row.status)}</td>
                                    <td className="p-5 text-right">
                                        <Button 
                                            variant="ghost" 
                                            size="sm" 
                                            className="text-slate-400 hover:text-[#14A9F9]"
                                            onClick={() => handleDownloadInvoice(row.id)}
                                        >
                                            <ArrowDownToLine className="w-4 h-4" />
                                        </Button>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan={6} className="p-10 text-center text-slate-500">
                                        <div className="flex flex-col items-center justify-center gap-2">
                                            <Filter className="w-8 h-8 text-slate-300" />
                                            <p>No transactions found matching your filters.</p>
                                            <Button 
                                                variant="link" 
                                                className="text-[#14A9F9]" 
                                                onClick={() => {setSearchQuery(""); setStatusFilter("All"); setDateFilter("")}}
                                            >
                                                Clear Filters
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>

        {/* --- SIDEBAR --- */}
        <div className="lg:col-span-4 xl:col-span-3 space-y-6 px-4 sm:px-0">
            <Card className="border-slate-200 shadow-md overflow-hidden rounded-xl">
    
    <div className="h-24 bg-[#14A9F9] w-full relative">
    </div>

    <CardContent className="px-4 pb-6 pt-0">
        
        <div className="relative -mt-10 mb-3 flex justify-center">
            <div className="relative">
                <img 
                    src="https://i.pravatar.cc/150?img=11" 
                    className="w-20 h-20 rounded-full border-4 border-white shadow-lg object-cover"
                    alt="Relationship Manager"
                />
                <span className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></span>
            </div>
        </div>

        <div className="text-center mb-4">
            <h3 className="font-bold text-slate-800 text-lg">Amit Sharma</h3>
            <p className="text-[#14A9F9] font-semibold text-sm">Relationship Manager</p>
        </div>

        <div className="bg-slate-50 border border-slate-100 rounded-lg py-2.5 mb-5 flex items-center justify-center text-slate-500 text-sm font-medium gap-2">
            <Phone className="w-3.5 h-3.5" /> 
            +1 (555) 123-4567
        </div>

        <div className="grid grid-cols-3 gap-3">
            
            <button 
                onClick={() => console.log("Redirecting to messages...")} 
                className="flex flex-col items-center justify-center py-3 px-1 bg-[#14A9F9] text-white rounded-xl hover:bg-[#0f90d6] transition-colors gap-1.5 shadow-sm"
            >
                <MessageSquare className="w-5 h-5" />
                <span className="text-[10px] font-medium">Message</span>
            </button>

            <a 
                href="https://wa.me/15551234567" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center py-3 px-1 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors gap-1.5 shadow-sm no-underline"
            >
                <MessageCircle className="w-5 h-5" />
                <span className="text-[10px] font-medium">WhatsApp</span>
            </a>

            <a 
                href="tel:+15551234567"
                className="flex flex-col items-center justify-center py-3 px-1 bg-white border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-50 transition-colors gap-1.5 shadow-sm no-underline"
            >
                <Phone className="w-5 h-5" />
                <span className="text-[10px] font-medium">Call</span>
            </a>

        </div>
    </CardContent>
</Card>

            <div className="bg-gradient-to-br from-indigo-900 to-slate-900 rounded-xl p-6 text-white shadow-lg">
                <h4 className="font-bold text-lg mb-2">Need a detailed Invoice?</h4>
                <p className="text-indigo-200 text-sm mb-4 leading-relaxed">
                    Download monthly consolidated statements for your tax filing.
                </p>
                <Button variant="secondary" className="w-full bg-white text-indigo-900 hover:bg-indigo-50">
                    <Download className="w-4 h-4 mr-2" />
                    Download Statement
                </Button>
            </div>
        </div>
      </div>

      {/* --- MODAL: WITHDRAWAL & BANK DETAILS --- */}
      {isWithdrawModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <Card className="w-full max-w-md bg-white shadow-xl border-0">
                <CardHeader className="flex flex-row items-center justify-between border-b pb-4">
                    <CardTitle className="text-lg font-bold text-slate-800 flex items-center gap-2">
                        {modalView === "withdraw" ? "Withdraw Funds" : (
                            <><button onClick={() => setModalView("withdraw")} className="hover:bg-slate-100 p-1 rounded-full"><ChevronLeft className="w-5 h-5"/></button> Add Bank Details</>
                        )}
                    </CardTitle>
                    <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={resetModal}
                        className="text-slate-400 hover:text-red-500"
                    >
                        <X className="w-5 h-5" />
                    </Button>
                </CardHeader>
                <CardContent className="pt-6">
                    {modalView === "withdraw" ? (
                        <form onSubmit={handleWithdrawSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700">Amount to Withdraw</label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 font-semibold">₹</span>
                                    <input 
                                        type="number" 
                                        className="w-full pl-8 pr-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition text-lg font-semibold text-slate-900"
                                        placeholder="0.00"
                                        value={withdrawAmount}
                                        onChange={(e) => setWithdrawAmount(e.target.value)}
                                        autoFocus
                                    />
                                </div>
                                <p className="text-xs text-slate-500 flex justify-between">
                                    <span>Available: ₹{availableBalance.toLocaleString()}</span>
                                    <button 
                                        type="button"
                                        className="text-emerald-600 font-medium hover:underline"
                                        onClick={() => setWithdrawAmount(availableBalance.toString())}
                                    >
                                        Max
                                    </button>
                                </p>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700">Withdraw To</label>
                                <div className="space-y-3">
                                    <select 
                                        className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:border-emerald-500 bg-white"
                                        value={selectedMethodId}
                                        onChange={(e) => setSelectedMethodId(e.target.value)}
                                    >
                                        {payoutMethods.map((method) => (
                                            <option key={method.id} value={method.id}>
                                                {method.bankName} - {method.maskedNumber}
                                            </option>
                                        ))}
                                    </select>
                                    
                                    <Button 
                                        type="button"
                                        variant="outline" 
                                        className="w-full border-dashed border-slate-300 text-slate-600 hover:bg-slate-50 hover:text-[#14A9F9]"
                                        onClick={() => setModalView("add-method")}
                                    >
                                        <Plus className="w-4 h-4 mr-2" />
                                        Add New Bank Account
                                    </Button>
                                </div>
                            </div>

                            <Button 
                                type="submit" 
                                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-6 text-base shadow-md shadow-emerald-500/20 mt-4"
                            >
                                Confirm Withdrawal
                            </Button>
                        </form>
                    ) : (
                        <form onSubmit={handleAddBankMethod} className="space-y-4">
                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-slate-500 uppercase">Bank Name</label>
                                <input 
                                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-[#14A9F9] text-sm"
                                    placeholder="e.g. HDFC Bank"
                                    value={newBankDetails.bankName}
                                    onChange={(e) => setNewBankDetails({...newBankDetails, bankName: e.target.value})}
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-slate-500 uppercase">Account Number</label>
                                <input 
                                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-[#14A9F9] text-sm"
                                    placeholder="e.g. 1234567890"
                                    type="number"
                                    value={newBankDetails.accountNumber}
                                    onChange={(e) => setNewBankDetails({...newBankDetails, accountNumber: e.target.value})}
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-slate-500 uppercase">IFSC Code</label>
                                <input 
                                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-[#14A9F9] text-sm uppercase"
                                    placeholder="e.g. HDFC0001234"
                                    value={newBankDetails.ifsc}
                                    onChange={(e) => setNewBankDetails({...newBankDetails, ifsc: e.target.value})}
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-slate-500 uppercase">Account Holder Name</label>
                                <input 
                                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-[#14A9F9] text-sm"
                                    placeholder="e.g. Amit Sharma"
                                    value={newBankDetails.holderName}
                                    onChange={(e) => setNewBankDetails({...newBankDetails, holderName: e.target.value})}
                                />
                            </div>

                            <div className="pt-2 flex gap-3">
                                <Button 
                                    type="button" 
                                    variant="outline" 
                                    className="flex-1"
                                    onClick={() => setModalView("withdraw")}
                                >
                                    Cancel
                                </Button>
                                <Button 
                                    type="submit" 
                                    className="flex-1 bg-[#14A9F9] hover:bg-[#0f90d6] text-white"
                                >
                                    Save & Select
                                </Button>
                            </div>
                        </form>
                    )}
                </CardContent>
            </Card>
        </div>
      )}

    </div>
  );
}