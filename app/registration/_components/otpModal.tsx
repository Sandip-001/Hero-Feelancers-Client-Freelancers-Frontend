"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";

interface Props {
  open: boolean;
  email: string;
  onVerify: (otp: string) => void;
  onResend: () => void;
  onClose: () => void;
  verifying: boolean;
  resending: boolean;
}

export default function OtpModal({
  open,
  email,
  onVerify,
  onResend,
  onClose,
  verifying,
  resending,
}: Props) {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [time, setTime] = useState(300);
  const inputsRef = useRef<HTMLInputElement[]>([]);

  useEffect(() => {
    if (!open) return;
    setOtp(Array(6).fill(""));
    setTime(300);
    setTimeout(() => inputsRef.current[0]?.focus(), 200);

    const timer = setInterval(() => {
      setTime((t) => (t > 0 ? t - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [open]);

  const handleResendClick = async () => {
    await onResend();
    setTime(300);
  };

  const handleChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const otpValue = otp.join("");
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogTitle className="sr-only">Verify OTP</DialogTitle>
      <DialogContent 
        className="max-w-md rounded-2xl"
        // --- PREVENT CLOSING ON OVERLAY CLICK ---
        onPointerDownOutside={(e) => e.preventDefault()}
        onInteractOutside={(e) => e.preventDefault()}
      >
        <h2 className="text-2xl font-bold text-center">Verify OTP</h2>

        <p className="text-center text-gray-500 text-sm">
          OTP sent to <span className="font-semibold">{email}</span>
        </p>

        <div className="flex justify-center gap-3 mt-6">
          {otp.map((digit, i) => (
            <input
              key={i}
              ref={(el) => {
                if (el) inputsRef.current[i] = el;
              }}
              value={digit}
              maxLength={1}
              onChange={(e) => handleChange(e.target.value, i)}
              onKeyDown={(e) => handleKeyDown(e, i)}
              className="h-12 w-12 rounded-xl border text-center text-xl font-bold focus:border-black focus:outline-none"
            />
          ))}
        </div>

        <Button
          className="w-full mt-6 flex items-center justify-center gap-2"
          disabled={otpValue.length !== 6 || verifying}
          onClick={() => onVerify(otpValue)}
          variant={"gold"}
        >
          {verifying ? (
            <>
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
              Verifying...
            </>
          ) : (
            "Verify OTP"
          )}
        </Button>

        <div className="text-center mt-4 text-sm text-gray-500">
          OTP expires in{" "}
          <span className="font-semibold text-red-500">
            {minutes}:{seconds.toString().padStart(2, "0")}
          </span>
        </div>

        <Button
          variant="ghost"
          disabled={time > 0 || resending}
          onClick={handleResendClick}
          className="w-full mt-2"
        >
          {resending ? "Resending OTP..." : "Resend OTP"}
        </Button>
      </DialogContent>
    </Dialog>
  );
}