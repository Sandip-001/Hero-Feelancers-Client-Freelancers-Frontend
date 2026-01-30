"use client";
import React, { useState, useRef, ChangeEvent, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "@/app/_components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  User,
  Briefcase,
  Mail,
  Phone,
  MapPin,
  AlertCircle,
  Shield,
  Zap,
  Globe,
  Text,
} from "lucide-react";
import {
  FormErrors,
  PasswordStrength,
  RegistrationFormData,
} from "@/types/registration";
import UserTypeCard from "./_components/UserTypeCard";
import SuccessMessage from "./_components/SuccessMessage";
import InputField from "./_components/InputField";
import SkillsSelector from "./_components/SkillsSelector";
import PasswordField from "./_components/PasswordField";
import FileUpload from "./_components/FileUpload";
import Sidebar from "./_components/Sidebar";
import AnimatedBackground from "./_components/AnimatedBackground";
import {
  useRegisterClientMutation,
  useResendClientOtpMutation,
  useVerifyClientOtpMutation,
} from "../redux/api/clientAuth.api";
import {
  useRegisterFreelancerMutation,
  useResendFreelancerOtpMutation,
  useVerifyFreelancerOtpMutation,
} from "../redux/api/freelancerAuth.api";
import OtpModal from "./_components/otpModal";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import PhoneInputField from "./_components/PhoneInputField";
import Navbar from "@/components/layout/Navbar"; 

// ==================== MAIN REGISTRATION COMPONENT ====================
export default function RegistrationClient() {
  const router = useRouter();

  const [userType, setUserType] = useState<"client" | "freelancer" | null>(
    null
  );
  const [formData, setFormData] = useState<RegistrationFormData>({
    fullName: "",
    email: "",
    phone: "",
    whatsapp: "",
    address: "",
    password: "",
    confirmPassword: "",
    companyName: "",
    designation: "",
    projectType: "",
    resume: null,
    skills: [],
    experienceLevel: "",
    portfolioUrl: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [customProjectType, setCustomProjectType] = useState("");
  const [isOtherProject, setIsOtherProject] = useState(false);
  const [isOtherSkill, setIsOtherSkill] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [registerClient] = useRegisterClientMutation();
  const [registerFreelancer] = useRegisterFreelancerMutation();
  const [verifyClientOtp, { isLoading: verifyingClient }] =
    useVerifyClientOtpMutation();
  const [resendClientOtp, { isLoading: resendingClient }] =
    useResendClientOtpMutation();

  const [verifyFreelancerOtp, { isLoading: verifyingFreelancer }] =
    useVerifyFreelancerOtpMutation();
  const [resendFreelancerOtp, { isLoading: resendingFreelancer }] =
    useResendFreelancerOtpMutation();

  const [showOtp, setShowOtp] = useState(false);

  const isVerifying = verifyingClient || verifyingFreelancer;

  const isResending = resendingClient || resendingFreelancer;

  const skillsList = [
    "Web Development",
    "Mobile Apps",
    "UI/UX Design",
    "Graphic Design",
    "Content Writing",
    "Digital Marketing",
    "Data Science",
    "Blockchain",
    "AI/ML",
    "Video Editing",
    "Automation",
    "Customer Support",
    "SEO",
    "Social Media Management",
    "Project Management",
    "DevOps",
    "Cybersecurity",
    "Cloud Computing",
    "Technical Writing",
    "Translation",
    "Photography",
    "Animation",
    "Game Development",
    "AR/VR",
    "Voice Over",
    "other",
  ];

  const getPasswordStrength = (password: string): PasswordStrength => {
    let score = 0;
    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^a-zA-Z0-9]/.test(password)) score++;

    if (score <= 1) return { score, label: "Weak", color: "bg-red-500" };
    if (score <= 3) return { score, label: "Medium", color: "bg-yellow-500" };
    return { score, label: "Strong", color: "bg-green-500" };
  };

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validatePhone = (phone: string) => {
    const phoneNumber = parsePhoneNumberFromString(phone);
    return phoneNumber ? phoneNumber.isValid() : false;
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!validateEmail(formData.email))
      newErrors.email = "Invalid email address";

    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    else if (!validatePhone(formData.phone))
      newErrors.phone =
        "Enter a valid international phone number (with country code)";

    if (!formData.whatsapp.trim())
      newErrors.whatsapp = "WhatsApp number is required";
    else if (!validatePhone(formData.whatsapp))
      newErrors.whatsapp = "Enter a valid whatsApp number with country code";

    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 8)
      newErrors.password = "Password must be at least 8 characters";
    if (!formData.confirmPassword)
      newErrors.confirmPassword = "Please confirm your password";
    else if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    if (userType === "client") {
      if (!formData.projectType?.trim())
        newErrors.projectType = "Project type is required";
    }

    if (userType === "freelancer") {
      if (!formData.resume) newErrors.resume = "Resume is required";
      if (!formData.experienceLevel)
        newErrors.experienceLevel = "Experience level is required";
      if (!formData.skills || formData.skills.length === 0)
        newErrors.skills = "Please add at least one skill";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSkillToggle = (skill: string) => {
    // ❌ Do NOT store "other"
    if (skill.toLowerCase() === "other") {
      return;
    }

    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter((s) => s !== skill)
        : [...prev.skills, skill],
    }));

    if (errors.skills) {
      setErrors((prev) => ({ ...prev, skills: "" }));
    }
  };

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const maxSize = 2 * 1024 * 1024;
      const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];

      if (!allowedTypes.includes(file.type)) {
        setErrors((prev) => ({
          ...prev,
          resume: "Only PDF and Word documents allowed",
        }));
        return;
      }

      if (file.size > maxSize) {
        setErrors((prev) => ({
          ...prev,
          resume: "File size must be less than 2MB",
        }));
        return;
      }

      setFormData((prev) => ({ ...prev, resume: file }));
      setErrors((prev) => ({ ...prev, resume: "" }));
    }
  };

  const onClose = () => {
    setShowOtp(false);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);

    try {
      if (userType === "client") {
        const res = await registerClient({
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          whatsapp: formData.whatsapp,
          address: formData.address,
          companyName: formData.companyName!,
          companyRole: formData.designation,
          projectType: formData.projectType!,
          password: formData.password,
        }).unwrap();
        console.log(res.message);
        setIsSubmitting(false);
        toast.success(res.message || "Client Registered successfully");
      } else {
        const fd = new FormData();

        Object.entries(formData).forEach(([key, value]) => {
          if (key === "skills") {
            value.forEach((skill: string) => fd.append("skills[]", skill));
            return;
          }
          if (value) fd.append(key, value as any);
        });

        const res = await registerFreelancer(fd).unwrap();
        console.log(res.message);
        setIsSubmitting(false);
        toast.success(
          res.message || "Freelancer Registered successfully"
        );
      }

      setShowOtp(true);
    } catch (err: any) {
      setIsSubmitting(false);
      toast.error(err?.data?.message || "Registration failed");
    }
  };

  const handleVerify = async (otp: string) => {
    try {
      if (!otp || otp.length !== 6) {
        toast.error("Please enter a valid 6-digit OTP");
        return;
      }

      if (userType === "client") {
        const res = await verifyClientOtp({
          email: formData.email,
          otp,
        }).unwrap();

        toast.success(res.message || "Client verified successfully");
      } else if (userType === "freelancer") {
        const res = await verifyFreelancerOtp({
          email: formData.email,
          otp,
        }).unwrap();

        toast.success(res.message || "Freelancer verified successfully");
      }

      setShowOtp(false);
      setSubmitSuccess(true); // optional success UI

      setTimeout(() => {
        setSubmitSuccess(false);
        setUserType(null);
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          whatsapp: "",
          address: "",
          password: "",
          confirmPassword: "",
          companyName: "",
          designation: "",
          projectType: "",
          resume: null,
          skills: [],
          experienceLevel: "",
          portfolioUrl: "",
        });
        setErrors({});
        router.push("/");
      }, 10000);
    } catch (err: any) {
      toast.error(err?.data?.message || "Invalid OTP");
    }
  };

  const handleResendOtp = async () => {
    try {
      if (userType === "client") {
        const res = await resendClientOtp({
          email: formData.email,
        }).unwrap();

        toast.success(res.message || "OTP resent to client email");
      } else if (userType === "freelancer") {
        const res = await resendFreelancerOtp({
          email: formData.email,
        }).unwrap();

        toast.success(res.message || "OTP resent to freelancer email");
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to resend OTP");
    }
  };

  const resetForm = () => {
    setUserType(null);
    setIsOtherProject(false);
    setCustomProjectType("");
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      whatsapp: "",
      address: "",
      password: "",
      confirmPassword: "",
      companyName: "",
      designation: "",
      projectType: "",
      resume: null,
      skills: [],
      experienceLevel: "",
      portfolioUrl: "",
    });
    setErrors({});
  };

  return (
    <>
    <Navbar />
      <div className="min-h-screen mt-24 bg-gradient-to-br from-yellow-50 via-white to-amber-50 relative overflow-hidden">
        
        <AnimatedBackground />

        <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-25 sm:py-25">
          <AnimatePresence mode="wait">
            {!userType ? (
              <motion.div
                key="user-type"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="max-w-4xl mx-auto"
              >
                <div className="text-center mb-12 mt-6">
                  <motion.h1
                    className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    Join{" "}
                    <span className="bg-gradient-to-r from-yellow-500 via-amber-600 to-yellow-500 bg-clip-text text-transparent">
                      Hero Freelancers
                    </span>
                  </motion.h1>
                  <motion.p
                    className="text-lg text-gray-600"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    Choose your account type to get started
                  </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <UserTypeCard
                    type="client"
                    icon={Briefcase}
                    title="I'm a Client"
                    description="Looking to hire talented freelancers for your projects with 0% commission"
                    features={[
                      "Post unlimited projects",
                      "0% platform commission",
                      "Dedicated project manager",
                    ]}
                    gradient="from-emerald-500 to-emerald-600"
                    borderColor="hover:border-emerald-400"
                    onClick={() => setUserType("client")}
                  />
                  <UserTypeCard
                    type="freelancer"
                    icon={User}
                    title="I'm a Freelancer"
                    description="Ready to showcase your skills and earn with the lowest platform fees"
                    features={[
                      "Find unlimited projects",
                      "Lowest commission rates",
                      "Secure escrow payments",
                    ]}
                    gradient="from-purple-500 to-purple-600"
                    borderColor="hover:border-purple-400"
                    onClick={() => setUserType("freelancer")}
                  />
                </div>
              </motion.div>
            ) : submitSuccess ? (
              <SuccessMessage name={formData.fullName} userType={userType} />
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-20">
                  <div className="lg:col-span-2">
                    <Card className="border-2 shadow-xl">
                      <CardContent className="p-6 sm:p-8">
                        <div className="flex items-center justify-between mb-6">
                          <div>
                            <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-yellow-500 to-yellow-400 bg-clip-text text-transparent">
                              {userType === "client" ? "Client" : "Freelancer"}{" "}
                              Registration
                            </h2>
                            <p className="text-sm text-gray-500 mt-1">
                              Fill in your details to create your account
                            </p>
                          </div>
                          <Button variant="ghost" size="sm" onClick={resetForm}>
                            Change Type
                          </Button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                          {/* Personal Information */}
                          <div>
                            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                              <User size={20} className="text-yellow-600" />
                              Personal Information
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div className="sm:col-span-2">
                                <InputField
                                  label="Full Name"
                                  name="fullName"
                                  value={formData.fullName}
                                  onChange={handleInputChange}
                                  error={errors.fullName}
                                  icon={Text}
                                  placeholder="Enter your full name"
                                  required
                                />
                              </div>
                              <InputField
                                label="Email Address"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                error={errors.email}
                                icon={Mail}
                                placeholder="your@email.com"
                                required
                              />
                              <PhoneInputField
                                label="Phone Number"
                                value={formData.phone}
                                onChange={(value) =>
                                  setFormData((prev) => ({
                                    ...prev,
                                    phone: value,
                                  }))
                                }
                                error={errors.phone}
                                icon={Phone}
                                placeholder="Enter Phone Number"
                                required
                              />

                              <PhoneInputField
                                label="WhatsApp Number"
                                value={formData.whatsapp}
                                onChange={(value) =>
                                  setFormData((prev) => ({
                                    ...prev,
                                    whatsapp: value,
                                  }))
                                }
                                error={errors.whatsapp}
                                icon={Phone}
                                placeholder="Enter Whatsapp Number"
                                required
                              />

                              <div className="sm:col-span-2">
                                <InputField
                                  label="Address"
                                  name="address"
                                  value={formData.address}
                                  onChange={handleInputChange}
                                  error={errors.address}
                                  icon={MapPin}
                                  placeholder="Enter your full address"
                                  rows={3}
                                  required
                                />
                              </div>
                            </div>
                          </div>

                          {/* Client-Specific Fields */}
                          {userType === "client" && (
                            <div>
                              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                <Briefcase
                                  size={20}
                                  className="text-yellow-600"
                                />
                                Company Information
                              </h3>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <InputField
                                  label="Company Name"
                                  name="companyName"
                                  value={formData.companyName || ""}
                                  onChange={handleInputChange}
                                  error={errors.companyName}
                                  icon={Text}
                                  placeholder="Your company name (optional)"
                                />
                                <InputField
                                  label="Your Designation"
                                  name="designation"
                                  value={formData.designation || ""}
                                  onChange={handleInputChange}
                                  icon={Text}
                                  placeholder="e.g., CEO, Project Manager"
                                />
                                <div className="sm:col-span-2">
                                  <label className="block text-sm font-medium mb-2">
                                    Project Type{" "}
                                    <span className="text-red-500">*</span>
                                  </label>

                                  {/* PROJECT TYPE SELECT */}
                                  <select
                                    name="projectType"
                                    value={
                                      isOtherProject
                                        ? "other"
                                        : formData.projectType
                                    }
                                    onChange={(e) => {
                                      const value = e.target.value;

                                      if (value === "other") {
                                        setIsOtherProject(true);
                                        setFormData((prev) => ({
                                          ...prev,
                                          projectType: "",
                                        }));
                                        setCustomProjectType("");
                                      } else {
                                        setIsOtherProject(false);
                                        setFormData((prev) => ({
                                          ...prev,
                                          projectType: value,
                                        }));
                                        setCustomProjectType("");
                                      }

                                      if (errors.projectType) {
                                        setErrors((prev) => ({
                                          ...prev,
                                          projectType: "",
                                        }));
                                      }
                                    }}
                                    className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 transition ${
                                      errors.projectType
                                        ? "border-red-500 bg-red-50"
                                        : "border-amber-200 bg-white"
                                    }`}
                                  >
                                    <option value="">
                                      Select project type
                                    </option>
                                    <option value="web-development">
                                      Web Development
                                    </option>
                                    <option value="mobile-app">
                                      Mobile App Development
                                    </option>
                                    <option value="design">
                                      Design (UI/UX, Graphic)
                                    </option>
                                    <option value="marketing">
                                      Digital Marketing
                                    </option>
                                    <option value="content">
                                      Content Writing
                                    </option>
                                    <option value="other">Other</option>
                                  </select>

                                  {/* OTHER PROJECT TYPE INPUT */}
                                  {isOtherProject && (
                                    <input
                                      type="text"
                                      value={customProjectType}
                                      onChange={(e) => {
                                        setCustomProjectType(e.target.value);
                                        setFormData((prev) => ({
                                          ...prev,
                                          projectType: e.target.value,
                                        }));

                                        if (errors.projectType) {
                                          setErrors((prev) => ({
                                            ...prev,
                                            projectType: "",
                                          }));
                                        }
                                      }}
                                      placeholder="Describe your project type"
                                      className="mt-3 w-full px-4 py-3 border-2 border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                    />
                                  )}

                                  {/* ERROR */}
                                  {errors.projectType && (
                                    <motion.p
                                      initial={{ opacity: 0, y: -10 }}
                                      animate={{ opacity: 1, y: 0 }}
                                      className="text-red-500 text-xs mt-1 flex items-center gap-1"
                                    >
                                      <AlertCircle size={12} />{" "}
                                      {errors.projectType}
                                    </motion.p>
                                  )}
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Freelancer-Specific Fields */}
                          {userType === "freelancer" && (
                            <div>
                              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                <Zap size={20} className="text-yellow-600" />
                                Professional Information
                              </h3>
                              <div className="space-y-4">
                                <div>
                                  <label className="block text-sm font-medium mb-2">
                                    Experience Level{" "}
                                    <span className="text-red-500">*</span>
                                  </label>
                                  <select
                                    name="experienceLevel"
                                    value={formData.experienceLevel}
                                    onChange={handleInputChange}
                                    className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus-within:ring-amber-400 transition ${
                                      errors.experience
                                        ? "border-red-500 bg-red-50"
                                        : "border-amber-200 bg-white"
                                    }`}
                                  >
                                    <option value="">
                                      Select experience level
                                    </option>
                                    <option value="beginner">
                                      Beginner (0-1 years)
                                    </option>
                                    <option value="intermediate">
                                      Intermediate (1-3 years)
                                    </option>
                                    <option value="expert">
                                      Expert (3-5 years)
                                    </option>
                                    <option value="senior">
                                      Senior (5+ years)
                                    </option>
                                  </select>
                                  {errors.experience && (
                                    <motion.p
                                      initial={{ opacity: 0, y: -10 }}
                                      animate={{ opacity: 1, y: 0 }}
                                      className="text-red-500 text-xs mt-1 flex items-center gap-1"
                                    >
                                      <AlertCircle size={12} />{" "}
                                      {errors.experience}
                                    </motion.p>
                                  )}
                                </div>

                                <SkillsSelector
                                  selectedSkills={formData.skills || []}
                                  onToggle={handleSkillToggle}
                                  error={errors.skills}
                                  skillsList={skillsList}
                                  isOtherSkill={isOtherSkill}
                                  setIsOtherSkill={setIsOtherSkill}
                                />

                                <InputField
                                  label="Portfolio URL"
                                  name="portfolioUrl"
                                  value={formData.portfolioUrl || ""}
                                  onChange={handleInputChange}
                                  icon={Globe}
                                  placeholder="https://yourportfolio.com"
                                />
                                <FileUpload
                                  file={formData.resume}
                                  onChange={handleFileUpload}
                                  error={errors.resume}
                                  fileInputRef={fileInputRef}
                                />
                              </div>
                            </div>
                          )}

                          {/* Security Section */}
                          <div>
                            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                              <Shield size={20} className="text-yellow-600" />
                              Security
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <PasswordField
                                label="Password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                error={errors.password}
                                showPassword={showPassword}
                                toggleShow={() =>
                                  setShowPassword(!showPassword)
                                }
                                showStrength
                                strength={getPasswordStrength(
                                  formData.password
                                )}
                              />
                              <PasswordField
                                label="Confirm Password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                                error={errors.confirmPassword}
                                showPassword={showConfirmPassword}
                                toggleShow={() =>
                                  setShowConfirmPassword(!showConfirmPassword)
                                }
                              />
                            </div>
                          </div>

                          {/* Submit Button */}
                          <motion.div
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                          >
                            <Button
                              type="submit"
                              disabled={isSubmitting}
                              className={`w-full py-6 text-lg font-semibold bg-gradient-to-r ${
                                userType === "client"
                                  ? "from-emerald-500 to-emerald-600 hover:from-emerald-700 hover:to-emerald-800"
                                  : "from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800"
                              } transition-all shadow-lg`}
                            >
                              {isSubmitting ? (
                                <span className="flex items-center justify-center gap-2">
                                  <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{
                                      duration: 1,
                                      repeat: Infinity,
                                      ease: "linear",
                                    }}
                                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                                  />
                                  Processing...
                                </span>
                              ) : (
                                "Create Account"
                              )}
                            </Button>
                          </motion.div>
                        </form>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Sidebar Info */}
                  <Sidebar />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
      <OtpModal
        open={showOtp}
        email={formData.email}
        onClose={onClose}
        onResend={handleResendOtp}
        onVerify={handleVerify}
        verifying={isVerifying}
        resending={isResending}
      />
       <Footer />
    </>
  );
}
