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

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f2f9ff]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600 font-medium">Loading ...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
