"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, User, Apple, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// --- Utility ---
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function SignupPage() {
  // State to track the flow
  const [step, setStep] = useState<"selection" | "form">("selection");
  const [role, setRole] = useState<"client" | "freelancer" | null>(null);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      {/* ================= HEADER ================= */}
      <div className="py-6 px-4 md:px-8 flex justify-between items-center bg-white shadow-sm border-b border-gray-100 relative z-20">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">HF</div>
          <span className="text-xl font-bold text-gray-700 hidden md:block">HeroFreelancer</span>
          {/* Mobile Logo Short version */}
          <span className="text-xl font-bold text-gray-700 md:hidden">HF</span>
        </Link>
        
        <div className="flex items-center gap-4 text-sm">
          {/* LOGIC: If on Form Step, show the Role Toggle */}
          {step === "form" && (
            <div className="flex items-center gap-2">
               {/* Helper text hidden on very small mobile screens to save space */}
               <span className="text-gray-600 hidden sm:inline">
                 {role === "client" ? "Looking for work?" : "Here to hire?"}
               </span>
               
               <button 
                 onClick={() => setRole(role === "client" ? "freelancer" : "client")}
                 className="text-blue-600 font-semibold hover:underline whitespace-nowrap"
               >
                 {role === "client" ? "Apply as a Freelancer" : "Join as a Client"}
               </button>
            </div>
          )}

          {/* LOGIC: If on Selection Step, show Login Link */}
          {step === "selection" && (
            <div className="text-gray-600">
              <span className="hidden sm:inline">Already have an account? </span>
              <Link href="/login" className="text-blue-600 font-semibold hover:underline">Log In</Link>
            </div>
          )}
        </div>
      </div>
      {/* ================= END HEADER ================= */}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col items-center pt-12 pb-20 px-4">
        <AnimatePresence mode="wait">
          {step === "selection" ? (
            <RoleSelectionStep 
              key="selection"
              role={role} 
              setRole={setRole} 
              onContinue={() => setStep("form")} 
            />
          ) : (
            <RegistrationFormStep 
              key="form" // Changing this key forces a re-render animation if we wanted, but keeping 'form' makes the text transition smoother
              role={role} 
              onBack={() => setStep("selection")} 
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ================= SUB-COMPONENTS =================

// --- STEP 1: Splitter (Client vs Freelancer) ---
const RoleSelectionStep = ({ 
  role, 
  setRole, 
  onContinue 
}: { 
  role: "client" | "freelancer" | null, 
  setRole: (r: "client" | "freelancer") => void, 
  onContinue: () => void 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="w-full max-w-3xl flex flex-col items-center"
    >
      <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12 text-center font-heading">
        Join as a client or freelancer
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mb-12">
        {/* Client Card */}
        <div
          onClick={() => setRole("client")}
          className={cn(
            "relative p-8 rounded-xl border-2 cursor-pointer transition-all hover:shadow-lg bg-white h-64 flex flex-col justify-between group",
            role === "client" ? "border-blue-600 bg-blue-50/30" : "border-gray-200 hover:border-blue-300"
          )}
        >
          <div className="flex justify-between items-start">
             <Briefcase size={32} className={role === "client" ? "text-blue-600" : "text-gray-700"} />
             <div className={cn(
               "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors",
               role === "client" ? "border-blue-600" : "border-gray-300 group-hover:border-blue-300"
             )}>
               {role === "client" && <div className="w-3 h-3 bg-blue-600 rounded-full" />}
             </div>
          </div>
          <p className="text-xl font-semibold text-gray-800">I'm a client, hiring for a project</p>
        </div>

        {/* Freelancer Card */}
        <div
          onClick={() => setRole("freelancer")}
          className={cn(
            "relative p-8 rounded-xl border-2 cursor-pointer transition-all hover:shadow-lg bg-white h-64 flex flex-col justify-between group",
            role === "freelancer" ? "border-blue-600 bg-blue-50/30" : "border-gray-200 hover:border-blue-300"
          )}
        >
          <div className="flex justify-between items-start">
             <User size={32} className={role === "freelancer" ? "text-blue-600" : "text-gray-700"} />
             <div className={cn(
               "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors",
               role === "freelancer" ? "border-blue-600" : "border-gray-300 group-hover:border-blue-300"
             )}>
               {role === "freelancer" && <div className="w-3 h-3 bg-blue-600 rounded-full" />}
             </div>
          </div>
          <p className="text-xl font-semibold text-gray-800">I'm a freelancer, looking for work</p>
        </div>
      </div>

      <button
         disabled={!role}
         className={cn(
           "px-16 py-3 rounded-full font-bold text-white transition-all transform shadow-md",
           role ? "bg-blue-600 hover:bg-blue-700 translate-y-0" : "bg-gray-300 cursor-not-allowed translate-y-2"
         )}
         onClick={onContinue}
      >
        {role === "client" ? "Join as a Client" : role === "freelancer" ? "Apply as a Freelancer" : "Create Account"}
      </button>

      <p className="mt-8 text-gray-500 text-sm">
        Already have an account? <Link href="/login" className="text-blue-600 hover:underline">Log In</Link>
      </p>
    </motion.div>
  );
};

// --- STEP 2: The Form (Upwork Style) ---
const RegistrationFormStep = ({ 
  role, 
  onBack 
}: { 
  role: "client" | "freelancer" | null, 
  onBack: () => void 
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alert("Registration Successful! (This is a demo)");
    }, 2000);
  };

  const headingText = role === "freelancer" 
    ? "Sign up to find work you love" 
    : "Sign up to hire talent";

  return (
    <motion.div
      // Using a key based on role ensures the form animates slightly when switching roles via the header toggle
      key={role}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-[600px] bg-white p-8 md:p-10 rounded-2xl shadow-xl border border-gray-100"
    >
      <div className="mb-6 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2 font-heading">{headingText}</h2>
      </div>

      {/* Social Logins */}
      <div className="space-y-3 mb-6">
        <button className="w-full bg-white border border-gray-800 text-white rounded-full py-2.5 hover:bg-gray-50 transition-colors flex items-center justify-center relative overflow-hidden group">
           <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
           <span className="ml-3 font-medium text-sm text-gray-700 group-hover:text-blue-600 transition-colors">Continue with Google</span>
        </button>
        

        <button className="w-full bg-white border border-gray-300 text-gray-700 rounded-full py-2.5 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
           <img src="https://www.svgrepo.com/show/503173/apple-logo.svg" alt="Apple" className="w-7 h-7 mb-1" />
           <span className="font-medium text-sm">Continue with Apple</span>
        </button>
      </div>

      <div className="relative mb-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">or</span>
        </div>
      </div>

      {/* Manual Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
             <label className="text-xs font-semibold text-gray-600 pl-1">First Name</label>
             <input type="text" className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all" required />
          </div>
          <div className="space-y-1">
             <label className="text-xs font-semibold text-gray-600 pl-1">Last Name</label>
             <input type="text" className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all" required />
          </div>
        </div>

        <div className="space-y-1">
           <label className="text-xs font-semibold text-gray-600 pl-1">Email</label>
           <input type="email" className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all" required />
        </div>

        <div className="space-y-1">
           <label className="text-xs font-semibold text-gray-600 pl-1">Password</label>
           <div className="relative">
             <input 
                type={showPassword ? "text" : "password"} 
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all pr-10" 
                minLength={8}
                required 
             />
             <button 
               type="button"
               onClick={() => setShowPassword(!showPassword)}
               className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
             >
               {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
             </button>
           </div>
        </div>

        <div className="space-y-1">
           <label className="text-xs font-semibold text-gray-600 pl-1">Country</label>
           <select className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all bg-white" required>
              <option value="" disabled selected>Select your country</option>
              <option value="US">United States</option>
              <option value="UK">United Kingdom</option>
              <option value="IN">India</option>
              <option value="KE">Kenya</option>
              <option value="CA">Canada</option>
           </select>
        </div>

        <div className="space-y-3 mt-4">
           <label className="flex items-start gap-3 cursor-pointer group">
              <input type="checkbox" className="mt-1 w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500" />
              <span className="text-sm text-gray-600 group-hover:text-gray-800 transition-colors">
                Send me helpful emails to find rewarding work and job leads.
              </span>
           </label>
           <label className="flex items-start gap-3 cursor-pointer group">
              <input type="checkbox" className="mt-1 w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500" required />
              <span className="text-sm text-gray-600 group-hover:text-gray-800 transition-colors">
                Yes, I understand and agree to the <a href="#" className="text-blue-600 hover:underline">HeroFreelancer Terms of Service</a>, including the <a href="#" className="text-blue-600 hover:underline">User Agreement</a> and <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>.
              </span>
           </label>
        </div>

        <button 
           type="submit" 
           disabled={isLoading}
           className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-full transition-all flex items-center justify-center mt-6 shadow-lg shadow-blue-200"
        >
          {isLoading ? (
             <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
          ) : (
             "Create my account"
          )}
        </button>

        <div className="text-center mt-4 md:hidden">
          <p className="text-sm text-gray-600">
             Already have an account? <Link href="/login" className="text-blue-600 hover:underline">Log In</Link>
          </p>
        </div>
      </form>

      {/* Back Button to return to selection */}
      <button 
        onClick={onBack}
        className="absolute top-8 left-8 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all md:hidden"
      >
        <ArrowLeft size={24} />
      </button>

    </motion.div>
  );
};