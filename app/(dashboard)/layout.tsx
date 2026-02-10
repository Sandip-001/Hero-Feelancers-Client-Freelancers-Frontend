"use client"
import DashboardLayout from "@/components/layout/dashboard-layout";
import FreelancerGuard from "./freelacnerGuard";
import { useEffect } from "react";
import { connectSocket } from "../socket";
export default function Layout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    connectSocket();
  }, []);
  return (
    <FreelancerGuard>
      <DashboardLayout>{children}</DashboardLayout>;
    </FreelancerGuard>
  );
}
