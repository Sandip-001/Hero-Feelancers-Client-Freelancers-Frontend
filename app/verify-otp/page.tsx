"use client";

import React, { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { toast } from "sonner"; // Added toaster import

// Import specific hooks from the new Redux structure
import { useVerifyClientOtpMutation, useResendClientOtpMutation } from "./../redux/api/clientAuth.api";
import { useVerifyFreelancerOtpMutation, useResendFreelancerOtpMutation } from "./../redux/api/freelancerAuth.api";

function VerifyForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const email = searchParams.get("email");
  const role = searchParams.get("role") as "client" | "freelancer" | null;

  const [otp, setOtp] = useState("");

  // --- 1. Initialize Hooks for BOTH roles ---
  const [verifyClient, { isLoading: isClientVerifying }] = useVerifyClientOtpMutation();
  const [resendClient, { isLoading: isClientResending }] = useResendClientOtpMutation();

  const [verifyFreelancer, { isLoading: isFreelancerVerifying }] = useVerifyFreelancerOtpMutation();
  const [resendFreelancer, { isLoading: isFreelancerResending }] = useResendFreelancerOtpMutation();

  // Helper to determine current loading state
  const isVerifying = isClientVerifying || isFreelancerVerifying;
  const isResending = isClientResending || isFreelancerResending;

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !role) {
      toast.error("Missing account info. Please register again."); // Replaced alert
      return;
    }

    try {
      if (role === "client") {
        await verifyClient({ email, otp }).unwrap();
      } else {
        await verifyFreelancer({ email, otp }).unwrap();
      }

      toast.success("Verified! Redirecting to login..."); // Replaced alert
      router.push("/login"); 
    } catch (err: any) {
      console.error("Verification Failed:", err);
      toast.error(err?.data?.message || "Invalid OTP. Please try again."); // Replaced alert
    }
  };

  const handleResend = async () => {
    if (!email || !role) return;

    try {
      if (role === "client") {
        await resendClient({ email }).unwrap();
      } else {
        await resendFreelancer({ email }).unwrap();
      }
      toast.success("New code sent successfully!"); // Replaced alert
    } catch (err: any) {
      console.error("Resend Failed:", err);
      toast.error(err?.data?.message || "Failed to send code."); // Replaced alert
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl border border-gray-100 text-center"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Verify your Email</h2>
        <p className="text-gray-500 mb-6">We sent a code to <span className="font-semibold text-gray-700">{email}</span></p>

        <form onSubmit={handleVerify} className="space-y-6">
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="000000"
            className="w-full text-center text-3xl tracking-[0.5em] font-bold py-3 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:outline-none transition-colors text-slate-800"
            maxLength={6}
            required
          />

          <button
            type="submit"
            disabled={isVerifying}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-full transition-all disabled:opacity-70 flex items-center justify-center gap-2"
          >
            {isVerifying ? <Loader2 className="animate-spin" /> : "Verify Account"}
          </button>
        </form>

        <div className="mt-6 text-sm text-gray-500">
          Didn't receive code?{" "}
          <button 
            type="button" 
            onClick={handleResend} 
            disabled={isResending}
            className="text-indigo-600 font-semibold hover:underline disabled:opacity-50"
          >
            {isResending ? "Sending..." : "Resend"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default function VerifyOtpPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <VerifyForm />
    </Suspense>
  );
}