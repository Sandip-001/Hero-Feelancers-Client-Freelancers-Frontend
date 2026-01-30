"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Briefcase,
  DollarSign,
  Code,
  Clock,
  Phone,
  CheckCircle,
  Loader2,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import { useGetMeQuery } from "../redux/api/auth.api";
import { toast } from "sonner";
import {
  useCreateJobMutation,
  useGetCurrenicesQuery,
} from "../redux/api/jobs.api";
import PhoneInputField from "../registration/_components/PhoneInputField";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import { CurrencyPayload } from "@/types/job";

// Popular technologies for suggestions
const TECH_SUGGESTIONS = [
  "React",
  "Next.js",
  "Node.js",
  "TypeScript",
  "Python",
  "Django",
  "Laravel",
  "PHP",
  "Vue.js",
  "Angular",
  "MongoDB",
  "PostgreSQL",
  "AWS",
  "Docker",
  "Tailwind CSS",
  "GraphQL",
  "Express.js",
  "Flutter",
  "React Native",
  "Java",
];

const HIRE_TIMELINES = [
  { value: "immediate", label: "Immediate (Within 1 week)" },
  { value: "1-2weeks", label: "1-2 weeks" },
  { value: "2-4weeks", label: "2-4 weeks" },
  { value: "1-3months", label: "1-3 months" },
  { value: "3+months", label: "3+ months" },
];

interface jobFormData {
  title: string;
  description: string;
  technology: string[];
  currency: string;
  projectValue: string;
  hireTimeline: string;
  contactNumber: string;
}

export default function JobPostPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<jobFormData>({
    title: "",
    description: "",
    technology: [],
    currency: "INR",
    projectValue: "",
    hireTimeline: "",
    contactNumber: "",
  });

  const [techInput, setTechInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [error, setError] = useState("");

  // 🔥 Refetch on mount to ensure fresh data
  const { data, isLoading } = useGetMeQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const { data: currencies, isLoading: currencyLoading } =
    useGetCurrenicesQuery(undefined, {
      refetchOnMountOrArgChange: true,
    });

  const [createJob] = useCreateJobMutation();

  useEffect(() => {
    if (isLoading) return;

    // ❌ Not logged in
    if (!data?.user) {
      router.replace("/login");
      return;
    }

    // ❌ Freelancer trying to access
    if (data.role !== "client") {
      toast.error("Only clients can post jobs.");
      router.replace("/");
      return;
    }
  }, [data, isLoading, router]);

  // ⏳ Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  // ⏳ Prevent UI flash while redirecting
  if (!data?.user || data.role !== "client") {
    return null;
  }

  // Add technology tag
  const addTechnology = (tech: string) => {
    const trimmed = tech.trim();
    if (trimmed && !formData.technology.includes(trimmed)) {
      setFormData({
        ...formData,
        technology: [...formData.technology, trimmed],
      });
      setTechInput("");
    }
  };

  // Remove technology tag
  const removeTechnology = (tech: string) => {
    setFormData({
      ...formData,
      technology: formData.technology.filter((t) => t !== tech),
    });
  };

  const validatePhone = (contact: string) => {
    const contactNumber = parsePhoneNumberFromString(contact);
    return contactNumber ? contactNumber.isValid() : false;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      // Validate required fields
      if (
        !formData.title ||
        !formData.description ||
        formData.technology.length === 0 ||
        !formData.currency ||
        !formData.projectValue ||
        !formData.hireTimeline
      ) {
        setError("Please fill in all required fields");
        setIsSubmitting(false);
        return;
      }

      // Validate project value
      if (
        isNaN(Number(formData.projectValue)) ||
        Number(formData.projectValue) <= 0
      ) {
        setError("Project value must be a positive number");
        setIsSubmitting(false);
        return;
      }

      //Validate phone number if provided
      if (formData.contactNumber && !validatePhone(formData.contactNumber)) {
        setError(
          "Enter a valid international phone number (with country code)"
        );
        setIsSubmitting(false);
        return;
      }

      const res = await createJob({
        title: formData.title,
        description: formData.description,
        technology: formData.technology,
        currency: formData.currency,
        projectValue: formData.projectValue,
        hireTimeline: formData.hireTimeline,
        contactNumber: formData.contactNumber,
      }).unwrap();
      console.log(res.message);

      setSubmitSuccess(true);
      // Reset form after 3 seconds
      setTimeout(() => {
        setFormData({
          title: "",
          description: "",
          technology: [],
          currency: "USD",
          projectValue: "",
          hireTimeline: "",
          contactNumber: "",
        });
        setSubmitSuccess(false);
      }, 8000);
    } catch (err: any) {
      setError(err?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-amber-50 to-white flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center"
        >
          <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-3xl font-black text-slate-900 mb-3">
            Job Posted Successfully! 🎉
          </h2>
          <p className="text-slate-600 mb-6">
            Your job has been published and Our team will contact with you soon.
          </p>
          <Button
            className="bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-white font-bold rounded-xl"
            onClick={() => setSubmitSuccess(false)}
          >
            Post Another Job
          </Button>
        </motion.div>
      </div>
    );
  }

  const selectedCurrencySymbol =
    currencies?.find((c: CurrencyPayload) => c.code === formData.currency)
      ?.symbol || "";

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-amber-50 to-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-100 rounded-full mb-4">
            <Briefcase className="w-4 h-4 text-amber-600" />
            <span className="text-sm font-bold text-amber-700">Post a Job</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">
            Find Your Perfect Freelancer
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Post your project and connect with talented professionals ready to
            bring your vision to life.
          </p>
        </motion.div>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="border-2 border-yellow-200 shadow-xl rounded-3xl overflow-hidden">
            <CardHeader className="">
              <CardTitle className="text-2xl font-black text-slate-900">
                Project Details
              </CardTitle>
              <CardDescription className="text-slate-600">
                Fill in the information below to post your job
              </CardDescription>
            </CardHeader>

            <CardContent className="p-6 md:p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Job Title */}
                <div className="space-y-2">
                  <Label
                    htmlFor="title"
                    className="text-sm font-bold text-slate-700"
                  >
                    Job Title <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <Briefcase className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                    <Input
                      id="title"
                      placeholder="e.g., Build a React E-commerce Website"
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                      className="pl-10 h-12 rounded-xl border-2 border-amber-200 focus:border-amber-400"
                      required
                    />
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label
                    htmlFor="description"
                    className="text-sm font-bold text-slate-700"
                  >
                    Project Description <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your project in detail, including requirements, deliverables, and expectations..."
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    className="min-h-[150px] rounded-xl border-2 border-amber-200 focus:border-amber-400 resize-none"
                    required
                  />
                  <p className="text-xs text-slate-500">
                    {formData.description.length} characters
                  </p>
                </div>

                {/* Technologies */}
                <div className="space-y-2">
                  <Label
                    htmlFor="technology"
                    className="text-sm font-bold text-slate-700"
                  >
                    Required Technologies{" "}
                    <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <Code className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                    <Input
                      id="technology"
                      placeholder="Type and press Enter to add technologies"
                      value={techInput}
                      onChange={(e) => setTechInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addTechnology(techInput);
                        }
                      }}
                      className="pl-10 h-12 rounded-xl border-2 border-amber-200 focus:border-amber-400"
                    />
                  </div>

                  {/* Technology Tags */}
                  {formData.technology.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {formData.technology.map((tech) => (
                        <Badge
                          key={tech}
                          className="bg-amber-100 text-amber-800 px-3 py-1.5 rounded-full flex items-center gap-2"
                        >
                          {tech}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              removeTechnology(tech);
                            }}
                            className="hover:text-red-600"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  )}

                  {/* Tech Suggestions */}
                  <div className="flex flex-wrap gap-2 mt-3">
                    {/* Tech Suggestions */}
                    {TECH_SUGGESTIONS.filter(
                      (tech) =>
                        !formData.technology.includes(tech) &&
                        tech.toLowerCase().includes(techInput.toLowerCase())
                    ).length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {TECH_SUGGESTIONS.filter(
                          (tech) =>
                            !formData.technology.includes(tech) &&
                            tech.toLowerCase().includes(techInput.toLowerCase())
                        ).map((tech) => (
                          <button
                            key={tech}
                            type="button"
                            onClick={() => addTechnology(tech)}
                            className="px-3 py-1 text-xs border border-amber-200 rounded-full hover:bg-amber-50 transition-colors text-slate-600"
                          >
                            + {tech}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Budget Section */}
                <div className="grid md:grid-cols-2 gap-4">
                  {/* Currency */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="currency"
                      className="text-sm font-bold text-slate-700"
                    >
                      Currency <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={formData.currency}
                      onValueChange={(value) =>
                        setFormData({ ...formData, currency: value })
                      }
                    >
                      <SelectTrigger className="h-12 rounded-xl border-2 border-amber-200">
                        <SelectValue placeholder="Select currency" />
                      </SelectTrigger>
                      <SelectContent>
                        {currencies?.map((c: CurrencyPayload) => (
                          <SelectItem key={c.code} value={c.code}>
                            {c.code} ({c.symbol}) — {c.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Project Value */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="projectValue"
                      className="text-sm font-bold text-slate-700"
                    >
                      Project Budget <span className="text-red-500">*</span>
                    </Label>

                    <div className="relative">
                      {/* Currency Symbol */}
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 font-semibold">
                        {selectedCurrencySymbol}
                      </span>

                      <Input
                        id="projectValue"
                        type="number"
                        placeholder="Enter amount"
                        value={formData.projectValue}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            projectValue: e.target.value,
                          })
                        }
                        className="pl-10 h-12 rounded-xl border-2 border-amber-200 focus:border-amber-400"
                        required
                        min="1"
                      />
                    </div>
                  </div>
                </div>

                {/* Hire Timeline */}
                <div className="space-y-2">
                  <Label
                    htmlFor="hireTimeline"
                    className="text-sm font-bold text-slate-700"
                  >
                    When do you need to hire?{" "}
                    <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={formData.hireTimeline}
                    onValueChange={(value) =>
                      setFormData({ ...formData, hireTimeline: value })
                    }
                  >
                    <SelectTrigger className="h-12 rounded-xl border-2 border-amber-200">
                      <Clock className="w-5 h-5 text-slate-400 mr-2" />
                      <SelectValue placeholder="Select timeline" />
                    </SelectTrigger>
                    <SelectContent>
                      {HIRE_TIMELINES.map((timeline) => (
                        <SelectItem key={timeline.value} value={timeline.value}>
                          {timeline.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Contact Number (Optional) */}
                <div className="space-y-2">
                  <div className="relative">
                    <PhoneInputField
                      label="Contact Number"
                      value={formData.contactNumber}
                      onChange={(value) =>
                        setFormData((prev) => ({
                          ...prev,
                          contactNumber: value,
                        }))
                      }
                      icon={Phone}
                      placeholder="Enter Phone Number"
                    />
                  </div>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4">
                    <p className="text-sm text-red-700 font-semibold">
                      {error}
                    </p>
                  </div>
                )}

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-14 bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-white font-bold rounded-xl shadow-lg text-lg"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Posting Job...
                    </>
                  ) : (
                    <>
                      <Briefcase className="w-5 h-5 mr-2" />
                      Post Job Free
                    </>
                  )}
                </Button>

                <p className="text-xs text-center text-slate-500">
                  By posting a job, you agree to our Terms of Service and
                  Privacy Policy
                </p>
              </form>
            </CardContent>
          </Card>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="grid md:grid-cols-3 gap-4 mt-8"
        >
          {[
            { icon: "⚡", text: "Get proposals in 24 hours" },
            { icon: "🎯", text: "0% platform commission" },
            { icon: "🔒", text: "Secure payment protection" },
          ].map((feature, i) => (
            <div
              key={i}
              className="bg-white rounded-xl p-4 border border-yellow-200 text-center"
            >
              <div className="text-2xl mb-2">{feature.icon}</div>
              <p className="text-sm font-semibold text-slate-700">
                {feature.text}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}