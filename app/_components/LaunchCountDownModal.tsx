"use client";

import { useState, useEffect, FormEvent } from "react";
import { motion } from "framer-motion";
import { Rocket, Bell, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useCreateNewsLetterMutation } from "../redux/api/newsLetter.api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Image from "next/image";

// Launch date: January 26, 2026
const LAUNCH_DATE = new Date("2026-02-26T00:00:00");

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isLaunched: boolean;
}

// Calculate time remaining until launch
const calculateTimeLeft = (): TimeLeft => {
  const now = new Date();
  const difference = LAUNCH_DATE.getTime() - now.getTime();

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isLaunched: true };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
    isLaunched: false,
  };
};

interface LaunchModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function LaunchCountdownModal({
  open,
  onOpenChange,
}: LaunchModalProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());
  const [email, setEmail] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const [createNewsLetter] = useCreateNewsLetterMutation();

  const router = useRouter();

  // Update countdown every second
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Handle email submission
  const handleNotifyMe = async () => {
    try {
      if (email && email.includes("@")) {
        const res = await createNewsLetter({ email: email }).unwrap();
        console.log(res.message);
        setIsSubmitted(true);
        setEmail("");
      }
    } catch (err: any) {
      setIsSubmitted(false);
      toast.error(err?.data?.message || "Registration failed");
    }
  };

  const handleConsulation = () => {
    onOpenChange(false);
    router.push("/#consultation");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {/* Blurred Background Overlay */}
      <DialogOverlay className="bg-black/10 backdrop-blur-md" />
      <DialogTitle></DialogTitle>

      <DialogContent
        className="
  max-w-[90%] sm:max-w-[420px] md:max-w-[500px]
  p-0
  bg-gradient-to-br from-amber-50 via-yellow-50 to-white
  border-2 border-yellow-200
  rounded-2xl md:rounded-3xl
  overflow-hidden shadow-2xl
  max-h-[90vh]
"
      >
        {timeLeft.isLaunched ? (
          // LAUNCHED STATE
          <div className="p-8">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center space-y-6"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.2 }}
                className="w-20 h-20 mx-auto bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full flex items-center justify-center"
              >
                <Rocket className="w-10 h-10 text-white" />
              </motion.div>

              <div>
                <h2 className="text-3xl font-black text-slate-900 mb-3">
                  🎉 We're Live!
                </h2>
                <p className="text-lg text-slate-700 mb-2">
                  Your wait is over! Hero Freelancers is now live.
                </p>
                <p className="text-slate-600">
                  Start posting jobs and connecting with top talent today.
                </p>
              </div>

              <div className="space-y-3">
                <Button
                  className="w-full h-12 bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-white font-bold rounded-xl shadow-lg"
                  onClick={() => (window.location.href = "/login")}
                >
                  Login Now & Get Started
                </Button>
                <Button
                  variant="outline"
                  className="w-full h-12 border-2 border-amber-200 hover:bg-amber-50 font-bold rounded-xl"
                  onClick={() => (window.location.href = "/register")}
                >
                  Create Free Account
                </Button>
              </div>
            </motion.div>
          </div>
        ) : (
          // COUNTDOWN STATE
          <>
            {/* Hero Image Header - Compact */}
            <div className="relative h-24 sm:h-28 md:h-32 overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
                alt="Team collaboration"
                fill
                sizes="(max-width: 768px) 100vw, 500px"
                priority={false}
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-3 left-4 text-white">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 mb-1"
                >
                  <Calendar className="w-3 h-3" />
                  <span className="text-xs font-semibold">
                    Launching 26 February 2026
                  </span>
                </motion.div>
                <h3 className="text-lg font-bold leading-tight">
                  Get notified when Hero Freelancers goes live
                </h3>
              </div>
            </div>

            <div className="p-4 sm:p-5 md:p-6 space-y-3 md:space-y-4">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-yellow-100 rounded-full">
                <Rocket className="w-3 h-3 text-amber-600" />
                <span className="text-xs font-bold text-amber-700">
                  Launch countdown
                </span>
              </div>

              {/* Main Heading */}
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-lg sm:text-xl md:text-2xl font-black text-slate-900 mb-1">
                    Hero Freelancers is coming
                  </h2>
                  <p className="text-slate-600 text-xs">
                    0% client commission • Managed delivery • Freelancers keep
                    more
                  </p>
                </div>
                <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full flex items-center justify-center text-white font-black text-lg">
                  HF
                </div>
              </div>

              {/* Countdown Timer - Compact */}
              <div className="grid grid-cols-4 gap-2">
                {[
                  { value: timeLeft.days, label: "DAYS" },
                  { value: timeLeft.hours, label: "HOURS" },
                  { value: timeLeft.minutes, label: "MIN" },
                  { value: timeLeft.seconds, label: "SEC" },
                ].map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-lg md:rounded-xl p-2 sm:p-2.5 md:p-3 text-center shadow-md border border-yellow-200"
                  >
                    <div className="text-xl sm:text-2xl md:text-3xl font-black text-amber-600">
                      {String(item.value).padStart(2, "0")}
                    </div>
                    <div className="text-[9px] sm:text-[10px] font-bold text-slate-500 mt-0.5">
                      {item.label}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Info Cards - Compact */}
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-emerald-50 rounded-lg p-3 border border-emerald-200">
                  <div className="font-bold text-emerald-900 text-xs sm:text-sm mb-0.5">
                    Launch event
                  </div>
                  <div className="text-xs text-emerald-700">
                    Platform release + onboarding.
                  </div>
                </div>
                <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                  <div className="font-bold text-blue-900 text-sm mb-0.5">
                    Early access
                  </div>
                  <div className="text-xs text-blue-700">
                    First updates + priority alerts.
                  </div>
                </div>
              </div>

              {/* Email Input */}
              {!isSubmitted ? (
                <div className="space-y-2">
                  <Input
                    type="email"
                    placeholder="Enter your email to get notified"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-11 rounded-xl border-2 border-amber-200 focus:border-amber-400 text-sm w-full"
                  />
                  <Button
                    onClick={handleNotifyMe}
                    className="w-full h-9 sm:h-10 md:h-11 text-sm bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-white font-bold rounded-xl shadow-lg"
                  >
                    <Bell className="w-4 h-4 mr-2" />
                    Notify me at launch
                  </Button>
                  <p className="text-[10px] text-center text-slate-500">
                    By submitting, you agree to receive launch updates.
                    Unsubscribe anytime.
                  </p>
                </div>
              ) : (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="bg-emerald-50 border-2 border-emerald-200 rounded-xl p-3 text-center"
                >
                  <div className="text-xl mb-1">✅</div>
                  <div className="font-bold text-emerald-900 text-sm mb-0.5">
                    You're on the list!
                  </div>
                  <div className="text-xs text-emerald-700">
                    We'll notify you when Hero Freelancers launches.
                  </div>
                </motion.div>
              )}

              {/* Bottom Buttons */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <Button
                  variant="outline"
                  className="h-10 border-2 border-slate-200 hover:bg-slate-50 font-bold rounded-xl text-sm"
                  onClick={() => onOpenChange(false)}
                >
                  Remind me later
                </Button>
                <Button
                  variant="default"
                  className="h-10 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-sm"
                  onClick={handleConsulation}
                >
                  Book consultation
                </Button>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
