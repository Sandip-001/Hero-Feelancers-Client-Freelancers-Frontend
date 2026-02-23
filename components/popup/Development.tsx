"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function DevelopmentPopup({name}: {name: string}) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="fixed inset-x-0 bottom-0 top-16 z-30 flex items-center justify-center backdrop-blur-md bg-white/40">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl overflow-hidden">
        
        {/* Top gradient section */}
        <div className="bg-gradient-to-br from-[#14A9F9] to-blue-600 p-8 text-center text-white">
          <div className="flex justify-center mb-4">
            <div className="relative h-16 w-16">
              <Image
                src="/logo.png"
                alt="HeroFreelancers"
                fill
                className="object-contain"
              />
            </div>
          </div>

          <h2 className="text-2xl font-bold mb-2">
            {name} Under Development
          </h2>

          <p className="text-blue-100 text-sm leading-relaxed">
            We’re building something amazing for you.  
            This section will be available very soon.
          </p>
        </div>

        {/* Bottom section */}
        <div className="p-6 text-center space-y-4">
          <p className="text-gray-500 text-sm mb-4">
            You can continue exploring available projects.
          </p>

          <Link href="/projects">
            <button className="w-full bg-[#14A9F9] hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition">
              Go to Projects
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
