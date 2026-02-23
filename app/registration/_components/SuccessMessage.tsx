"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Sparkles } from "lucide-react";

interface Props {
  name: string;
  userType: "client" | "freelancer" | null;
}

const SuccessMessage = ({ name, userType }: Props) => {
  const router = useRouter();
  const [countdown, setCountdown] = useState(8);

  const destination =
    userType === "client" ? "/jobpost" : "/projects";

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          router.push(destination);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [router, destination]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-2xl mx-auto"
    >
      <Card className="border-2 border-green-200 shadow-2xl">
        <CardContent className="p-8 text-center">
          {/* ICON */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 0.6 }}
            className="w-24 h-24 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center mx-auto mb-6 shadow-lg"
          >
            <CheckCircle className="text-white" size={56} />
          </motion.div>

          {/* TITLE */}
          <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            Registration Successful 🎉
          </h2>

          <p className="text-gray-600 mb-6 text-lg">
            Welcome <strong className="text-gray-900">{name}</strong>
          </p>

          {/* MESSAGE */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-6 text-left">
            <div className="flex items-start gap-3">
              <Sparkles className="text-blue-600 mt-1" />
              <div className="space-y-3 text-gray-700 text-sm">
                {userType === "client" ? (
                  <>
                    <p>
                      🎯 You’re now registered as a <b>Client</b>.
                    </p>
                    <p>
                      Start posting your projects and receive proposals from
                      talented freelancers ready to bring your ideas to life.
                    </p>
                  </>
                ) : (
                  <>
                    <p>
                      🚀 You’re now registered as a <b>Freelancer</b>.
                    </p>
                    <p>
                      Explore live projects, apply to opportunities, showcase
                      your skills, and start earning on HeroFreelancers.
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* CTA BUTTON */}
          <Button
            className="mt-6 w-full text-lg py-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-md hover:shadow-lg transition-all"
            onClick={() => router.push(destination)}
          >
            {userType === "client"
              ? "Post Your First Project"
              : "Browse Projects"}
          </Button>

          {/* COUNTDOWN */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-6 text-sm text-gray-500"
          >
            Redirecting in{" "}
            <span className="font-bold text-red-500">
              {countdown}
            </span>{" "}
            seconds…
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default SuccessMessage;