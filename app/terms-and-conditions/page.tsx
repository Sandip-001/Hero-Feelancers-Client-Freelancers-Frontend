"use client";

import Navbar from "@/components/layout/Navbar";
import { motion } from "framer-motion";
import Footer from "../_components/Footer";

export default function TermsPage() {
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
            Terms & Conditions
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
            1. Acceptance of Terms
          </h2>
          <p>
            By accessing or using Hero Freelancers, you agree to comply with
            and be bound by these Terms & Conditions. If you do not agree,
            you must not use the platform.
          </p>
        </section>

        {/* 2 */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            2. Platform Overview
          </h2>
          <p>
            Hero Freelancers is a managed freelance marketplace connecting
            clients and freelancers for project-based work. We facilitate
            communication, project management, and payments but are not
            a direct employer of freelancers.
          </p>
        </section>

        {/* 3 */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            3. User Accounts
          </h2>
          <ul className="list-disc pl-6 space-y-3">
            <li>You must provide accurate and complete information.</li>
            <li>You are responsible for maintaining account confidentiality.</li>
            <li>We may suspend or terminate accounts that violate policies.</li>
          </ul>
        </section>

        {/* 4 */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            4. Freelancer Responsibilities
          </h2>
          <ul className="list-disc pl-6 space-y-3">
            <li>Deliver services professionally and on time.</li>
            <li>Maintain confidentiality of client information.</li>
            <li>Comply with all applicable laws and regulations.</li>
          </ul>
        </section>

        {/* 5 */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            5. Client Responsibilities
          </h2>
          <ul className="list-disc pl-6 space-y-3">
            <li>Provide clear project requirements.</li>
            <li>Release payments upon satisfactory completion.</li>
            <li>Communicate respectfully and professionally.</li>
          </ul>
        </section>

        {/* 6 */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            6. Payments & Fees
          </h2>
          <p>
            Payments are processed securely through our platform.
            Clients may be charged service fees. Freelancers may be
            subject to subscription or commission-based charges.
            All fees are clearly communicated before payment.
          </p>
        </section>

        {/* 7 */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            7. Disputes & Managed Delivery
          </h2>
          <p>
            In case of disputes, Hero Freelancers may intervene to
            facilitate resolution. Our decision during dispute
            resolution shall be considered final.
          </p>
        </section>

        {/* 8 */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            8. Intellectual Property
          </h2>
          <p>
            Upon full payment, intellectual property rights for the
            delivered work are transferred to the client unless
            otherwise agreed in writing.
          </p>
        </section>

        {/* 9 */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            9. Limitation of Liability
          </h2>
          <p>
            Hero Freelancers shall not be liable for indirect,
            incidental, or consequential damages arising from
            use of the platform.
          </p>
        </section>

        {/* 10 */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            10. Termination
          </h2>
          <p>
            We reserve the right to suspend or terminate access
            to the platform for violations of these terms.
          </p>
        </section>

        {/* 11 */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            11. Changes to Terms
          </h2>
          <p>
            We may update these Terms from time to time.
            Continued use of the platform constitutes acceptance
            of revised terms.
          </p>
        </section>

        {/* 12 */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            12. Contact Information
          </h2>
          <p>
            For questions regarding these Terms & Conditions,
            please contact us at:
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