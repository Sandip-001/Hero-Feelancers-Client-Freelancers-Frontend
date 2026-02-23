"use client";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { useState, useEffect } from "react";
import { twMerge } from "tailwind-merge";
import Link from "next/link";
import { ClassValue, clsx } from "clsx";

import { ChevronDown, Menu, X, User, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useLogoutClientMutation } from "@/app/redux/api/clientAuth.api";
import { useLogoutFreelancerMutation } from "@/app/redux/api/freelancerAuth.api";
import { useGetMeQuery } from "@/app/redux/api/auth.api";

import { baseApi } from "@/app/redux/api/baseApi";
import { useDispatch } from "react-redux";
import { usePostJobGuard } from "@/app/redux/hooks/usePostJobGuard";

// --- Utility for tw-merge ---
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function Navbar() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [logoutClient] = useLogoutClientMutation();
  const [logoutFreelancer] = useLogoutFreelancerMutation();

  const { data: authData, isLoading: authLoading } = useGetMeQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const { handlePostJobClick } = usePostJobGuard();

  // Desktop Hover State
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  // Mobile Menu States
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMobileCategory, setActiveMobileCategory] = useState<
    string | null
  >(null);

  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  const isLoggedIn = !!authData?.user;
  const userType = authData?.role || null;

  // Helper to toggle mobile accordions
  const toggleMobileCategory = (category: string) => {
    setActiveMobileCategory(
      activeMobileCategory === category ? null : category,
    );
  };

  const handleLogout = async () => {
    try {
      if (userType === "client") {
        await logoutClient().unwrap();
      } else {
        await logoutFreelancer().unwrap();
      }
      // 🔥 CLEAR RTK QUERY CACHE
      dispatch(baseApi.util.resetApiState());
      setShowProfileDropdown(false);

      router.push("/login"); // 🔥 Important
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  // Get dashboard link based on user type
  const getDashboardLink = () => {
    return userType === "client" ? "/project" : "/projects";
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="fixed left-0 right-0 top-4 mx-auto w-[90%] max-w-6xl z-50"
      >
        <div className="relative bg-white/90 backdrop-blur-md shadow-md rounded-2xl border border-gray-100 py-4 px-6 md:px-8 flex justify-between items-center z-50">
          {/* Logo */}
          <div
            onClick={() => router.push("/")}
            className="flex items-center gap-2 cursor-pointer z-50"
          >
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
              <img
                src="/images/Logo/hero-freelancerss.png"
                alt="HeroFreelancers Logo"
              />
            </div>
            <span className="text-xl font-bold text-gray-700">
              HeroFreelancers
            </span>
          </div>

          {/* ==================== DESKTOP MENU (>768px) ==================== */}
          <div className="hidden md:flex gap-6 lg:gap-8 text-sm font-medium text-gray-600 h-full items-center">
            <Link href="/" className="hover:text-yellow-600 transition-colors">
              Home
            </Link>

            <Link
              href="/jobs"
              className="hover:text-yellow-600 transition-colors"
            >
              Find Work
            </Link>

            <Link
              href="/freelancers"
              className="hover:text-yellow-600 transition-colors"
            >
              Find Freelancers
            </Link>

            {/* Conditional rendering based on authentication status */}
            {!isLoggedIn ? (
              <>
                <Link
                  href="/login"
                  className="hover:text-yellow-600 transition-colors"
                >
                  Log In
                </Link>
                <Link
                  href="/registration"
                  className="hover:text-yellow-600 transition-colors"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <>
                {/* Profile Dropdown for logged-in users */}
                <div
                  className="relative h-full flex items-center py-2"
                  onMouseEnter={() => setShowProfileDropdown(true)}
                  onMouseLeave={() => setShowProfileDropdown(false)}
                >
                  <button className="flex items-center gap-2 hover:text-yellow-600 transition-colors">
                    <User size={18} />
                    <span className="capitalize">{userType}</span>
                    <ChevronDown
                      size={14}
                      className={cn(
                        "transition-transform duration-200",
                        showProfileDropdown ? "rotate-180" : "",
                      )}
                    />
                  </button>

                  <AnimatePresence>
                    {showProfileDropdown && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 cursor-default"
                      >
                        <Link
                          href={getDashboardLink()}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          Go to Projects
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2"
                        >
                          <LogOut size={16} />
                          Log Out
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </>
            )}

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-yellow-500 via-amber-500 to-orange-500  hover:bg-yellow-600 text-white px-5 py-2 lg:px-6 lg:py-2.5 rounded-full text-xs lg:text-sm font-medium transition-colors shadow-lg whitespace-nowrap"
              onClick={handlePostJobClick}
            >
              Post a project
            </motion.button>
          </div>

          {/* ==================== MOBILE HAMBURGER BUTTON (<768px) ==================== */}
          <div className="md:hidden flex items-center gap-4">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* ==================== MOBILE FULL SCREEN MENU ==================== */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-white z-[60] overflow-y-auto"
          >
            <div className="p-6">
              {/* Header */}
              <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
                    HF
                  </div>
                  <span className="text-xl font-bold text-gray-700">
                    HeroFreelancer
                  </span>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-gray-500 bg-gray-100 rounded-full"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Mobile Links */}
              <div className="flex flex-col gap-6">
                <Link
                  href="/"
                  className="text-lg font-bold text-gray-800 hover:text-yellow-600"
                >
                  Home
                </Link>

                <Link
                  href="/jobs"
                  className="text-lg font-bold text-gray-800 hover:text-yellow-600"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Find Work
                </Link>

                <Link
                  href="/freelancers"
                  className="text-lg font-bold text-gray-800 hover:text-yellow-600"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Find Freelancers
                </Link>

                {/* Conditional rendering for mobile menu */}
                {!isLoggedIn ? (
                  <>
                    <Link
                      href="/login"
                      className="text-lg font-bold text-gray-800"
                    >
                      Log In
                    </Link>
                    <Link
                      href="/registration"
                      className="text-lg font-bold text-white bg-blue-600 px-4 py-2 rounded-full shadow-lg shadow-blue-200 inline-block text-center"
                    >
                      Sign Up
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      href={getDashboardLink()}
                      className="text-lg font-bold text-white bg-blue-600 px-4 py-2 rounded-full shadow-lg shadow-blue-200 inline-block text-center flex items-center justify-center gap-2"
                    >
                      <User size={20} />
                      Go to Projects
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="text-lg font-bold text-red-600 bg-red-50 px-4 py-2 rounded-full inline-block text-center flex items-center justify-center gap-2"
                    >
                      <LogOut size={20} />
                      Log Out
                    </button>
                  </>
                )}

                <button
                  className="bg-gradient-to-r from-yellow-500 via-amber-500 to-orange-500 text-white w-full py-3 rounded-xl font-bold shadow-lg shadow-blue-200 mt-4"
                  onClick={handlePostJobClick}
                >
                  Post a project
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
