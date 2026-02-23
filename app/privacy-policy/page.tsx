"use client";

import Navbar from "@/components/layout/Navbar";
import { motion } from "framer-motion";
import Footer from "../_components/Footer";

export default function PrivacyPolicyPage() {
  return (
    <>
    <Navbar />
    <div className="bg-slate-50 min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r  from-yellow-500 via-amber-500 to-orange-500 py-16 px-4 ">
        <div className="max-w-4xl mx-auto text-center text-white">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold mt-16"
          >
            Privacy Policy
          </motion.h1>
          <p className="mt-4 text-blue-100 text-sm md:text-base">
            Effective Date: {new Date().getFullYear()}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 py-16 grid grid-cols-1 lg:grid-cols-4 gap-10">
        
        {/* Sidebar (Table of Contents) */}
        <div className="hidden lg:block lg:col-span-1">
          <div className="sticky top-24 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-4">
              Quick Navigation
            </h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li><a href="#info" className="hover:text-[#14A9F9]">Information We Collect</a></li>
              <li><a href="#use" className="hover:text-[#14A9F9]">How We Use Information</a></li>
              <li><a href="#sharing" className="hover:text-[#14A9F9]">Information Sharing</a></li>
              <li><a href="#security" className="hover:text-[#14A9F9]">Data Security</a></li>
              <li><a href="#cookies" className="hover:text-[#14A9F9]">Cookies</a></li>
              <li><a href="#rights" className="hover:text-[#14A9F9]">Your Rights</a></li>
              <li><a href="#contact" className="hover:text-[#14A9F9]">Contact Us</a></li>
            </ul>
          </div>
        </div>

        {/* Main Policy Content */}
        <div className="lg:col-span-3 space-y-12 text-gray-700 leading-relaxed">
          
          <section id="intro">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Introduction
            </h2>
            <p>
              Welcome to <strong>Hero Freelancers</strong>. We value your privacy
              and are committed to protecting your personal information.
              This Privacy Policy explains how we collect, use, disclose,
              and safeguard your information when you use our platform.
            </p>
          </section>

          <section id="info">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Information We Collect
            </h2>
            <ul className="list-disc pl-6 space-y-3">
              <li>Personal details (name, email, phone number)</li>
              <li>Professional information (skills, portfolio, experience)</li>
              <li>Payment and transaction information</li>
              <li>Usage data (IP address, browser type, activity logs)</li>
            </ul>
          </section>

          <section id="use">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              How We Use Your Information
            </h2>
            <p>
              We use your information to provide and improve our services,
              process payments, match freelancers with clients, ensure
              security, and communicate important updates.
            </p>
          </section>

          <section id="sharing">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Information Sharing
            </h2>
            <p>
              We do not sell your personal data. Information may be shared
              with trusted service providers, payment processors, or legal
              authorities when required by law.
            </p>
          </section>

          <section id="security">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Data Security
            </h2>
            <p>
              We implement industry-standard security measures to protect
              your data from unauthorized access, disclosure, or misuse.
              However, no system is completely secure.
            </p>
          </section>

          <section id="cookies">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Cookies & Tracking Technologies
            </h2>
            <p>
              We use cookies and similar technologies to enhance user
              experience, analyze traffic, and personalize content.
              You may disable cookies in your browser settings.
            </p>
          </section>

          <section id="rights">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Your Rights
            </h2>
            <ul className="list-disc pl-6 space-y-3">
              <li>Access and update your information</li>
              <li>Request deletion of your account</li>
              <li>Withdraw consent for marketing communications</li>
            </ul>
          </section>

          <section id="contact">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Contact Us
            </h2>
            <p>
              If you have questions about this Privacy Policy, please contact us at:
            </p>
            <p className="mt-2 font-medium">
              Email: support@herofreelancers.com
            </p>
          </section>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
}