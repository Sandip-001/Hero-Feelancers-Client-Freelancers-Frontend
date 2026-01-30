"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useGetMeQuery } from "../api/auth.api";

export const usePostJobGuard = () => {
  const router = useRouter();
  
  // 🔥 Always refetch when component mounts
  const { data, isLoading } = useGetMeQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const handlePostJobClick = () => {
    if (isLoading) {
      toast.loading("Checking access...");
      return;
    }

    // ❌ Not logged in
    if (!data?.user) {
      router.push("/registration");
      return;
    }

    // ❌ Freelancer
    if (data.role === "freelancer") {
      toast.error("Only clients can post jobs. Please register as a client.");
      setTimeout(() => router.push("/registration"), 1500);
      return;
    }

    // ✅ Client
    router.push("/jobpost");
  };

  return { handlePostJobClick };
};
