import DashboardLayout from "@/components/layout/dashboard-layout";
import FreelancerGuard from "./freelacnerGuard";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <FreelancerGuard>
      <DashboardLayout>{children}</DashboardLayout>;
    </FreelancerGuard>
  );
}
