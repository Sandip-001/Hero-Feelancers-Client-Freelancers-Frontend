"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

import { useCreateEnquiryMutation } from "../redux/api/ctaEnquiry.api";
import { EnquiryFormData } from "@/types/cta";

export default function CTASection() {
  const [createEnquiry, { isLoading }] = useCreateEnquiryMutation();

  const [form, setForm] = useState<EnquiryFormData>({
    name: "",
    email: "",
    role: "",
    topic: "",
    description: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.role || !form.topic) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      await createEnquiry(form).unwrap();

      toast.success("✅ Enquiry submitted! Our team will contact you shortly.");

      // Reset form
      setForm({
        name: "",
        email: "",
        role: "",
        topic: "",
        description: "",
      });
    } catch (err: any) {
      toast.error(err?.data?.message || "Something went wrong");
    }
  };

  return (
    <section
      id="consultation"
      className="relative py-24 bg-gradient-to-br from-yellow-500 via-amber-500 to-orange-500 overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-white/20 blur-3xl rounded-full" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative max-w-5xl mx-auto px-4"
      >
        <div className="text-center text-white">
          <h2 className="text-4xl sm:text-5xl font-black mb-4">
            Book a Free Consultation
          </h2>
          <p className="text-lg text-white/90 max-w-2xl mx-auto mb-10">
            One form for <b>clients & freelancers</b> — let us guide you.
          </p>

          {/* FORM */}
          <motion.form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto bg-white/95 p-6 rounded-3xl shadow-2xl"
          >
            {/* Name */}
            <Input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Full name *"
              className="h-12 rounded-2xl text-black"
            />

            {/* Email */}
            <Input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="Work email *"
              className="h-12 rounded-2xl text-black"
            />

            {/* Role */}
            <Select
              value={form.role}
              onValueChange={(value) =>
                setForm({ ...form, role: value })
              }
            >
              <SelectTrigger className=" text-black w-full">
                <SelectValue placeholder="I am a..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="client">
                  Client (Hiring / Project)
                </SelectItem>
                <SelectItem value="freelancer">
                  Freelancer (Looking for work)
                </SelectItem>
                <SelectItem value="partner">
                  Agency / Partner
                </SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>

            {/* Topic */}
            <Input
              value={form.topic}
              onChange={(e) => setForm({ ...form, topic: e.target.value })}
              placeholder="What do you need help with? *"
              className="h-12 rounded-2xl text-black"
            />

            {/* Description */}
            <Textarea
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              placeholder="Briefly describe your requirement (optional)"
              rows={3}
              className="col-span-full rounded-2xl text-black resize-none"
            />

            {/* Submit */}
            <Button
              type="submit"
              disabled={isLoading}
              className="col-span-full h-12 rounded-2xl font-extrabold bg-slate-950 hover:bg-slate-900"
            >
              {isLoading ? "Submitting..." : "Get Free Consultation"}
            </Button>
          </motion.form>

          {/* Trust badges */}
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Badge className="bg-white/20 text-white">
              0% Client Commission
            </Badge>
            <Badge className="bg-white/20 text-white">
              Dedicated Manager
            </Badge>
            <Badge className="bg-white/20 text-white">
              Secure Milestones
            </Badge>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
