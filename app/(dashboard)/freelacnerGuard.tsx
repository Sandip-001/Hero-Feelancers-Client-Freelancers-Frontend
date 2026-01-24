"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useGetMeQuery } from "../redux/api/auth.api";

export default function FreelancerGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { data, isLoading } = useGetMeQuery();

  useEffect(() => {
    if (!isLoading) {
      if (!data || data.role !== "freelancer") {
        router.replace("/login");
      }
    }
  }, [isLoading, data, router]);

  if (isLoading) return <div className="p-6">Loading...</div>;

  return <>{children}</>;
}
