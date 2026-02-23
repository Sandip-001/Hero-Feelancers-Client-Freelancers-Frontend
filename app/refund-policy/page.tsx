"use client";

import { motion } from "framer-motion";
import Footer from "../_components/Footer";
import Navbar from "@/components/layout/Navbar";

export default function RefundPolicyPage() {
  return (
    <>
    <Navbar />
    <div className="bg-slate-50 min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-yellow-500 via-amber-500 to-orange-500 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center text-white">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold mt-16"
          >
            Refund Policy
          </motion.h1>
          <p className="mt-4 text-blue-100 text-sm md:text-base">
            Effective Date: {new Date().getFullYear()}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 py-16 space-y-12 text-gray-700 leading-relaxed">

        {/* 1 */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            1. Overview
          </h2>
          <p>
            At Hero Freelancers, we strive to provide a transparent and fair
            payment system for both clients and freelancers. This Refund Policy
            explains when refunds may be issued and under what conditions.
          </p>
        </section>

        {/* 2 */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            2. Project-Based Payments
          </h2>
          <ul className="list-disc pl-6 space-y-3">
            <li>
              Funds held in escrow may be refunded if work has not been started.
            </li>
            <li>
              If a dispute arises, we may review project communication and
              deliverables before making a decision.
            </li>
            <li>
              Once a project is marked as completed and payment released,
              refunds may not be possible.
            </li>
          </ul>
        </section>

        {/* 3 */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            3. Freelancer Subscription Fees
          </h2>
          <p>
            Subscription payments for freelancers (if applicable) are generally
            non-refundable. However, refunds may be considered in the following cases:
          </p>
          <ul className="list-disc pl-6 space-y-3 mt-3">
            <li>Duplicate payments</li>
            <li>Technical billing errors</li>
            <li>Unauthorized transactions (subject to verification)</li>
          </ul>
        </section>

        {/* 4 */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            4. Service Fees
          </h2>
          <p>
            Platform service fees are non-refundable once a project has been
            successfully matched or completed. Exceptions may apply in cases
            of system errors.
          </p>
        </section>

        {/* 5 */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            5. Dispute Resolution
          </h2>
          <p>
            In case of disputes, Hero Freelancers may intervene and review
            all communications, agreements, and deliverables. Our decision
            will be made in good faith and shall be considered final.
          </p>
        </section>

        {/* 6 */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            6. Refund Processing Time
          </h2>
          <p>
            Approved refunds will be processed within 7–10 business days.
            The time taken for the refunded amount to reflect in your account
            depends on your bank or payment provider.
          </p>
        </section>

        {/* 7 */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            7. Chargebacks
          </h2>
          <p>
            Initiating a chargeback without contacting us first may result in
            account suspension. We encourage users to contact our support team
            to resolve issues before escalating to payment providers.
          </p>
        </section>

        {/* 8 */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            8. Contact Us
          </h2>
          <p>
            If you have questions about this Refund Policy or wish to request
            a refund, please contact:
          </p>
          <p className="mt-2 font-medium">
            Email: support@herofreelancers.com
          </p>
        </section>

      </div>
    </div>
    <Footer />
    </>
  );
}