"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"; 
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, User, Eye, EyeOff, ArrowLeft, UploadCloud, Loader2, Mail, Phone, MapPin, Layers } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// --- Redux Imports (New Structure) ---
import { useRegisterClientMutation } from "./../redux/api/clientAuth.api";
import { useRegisterFreelancerMutation } from "./../redux/api/freelancerAuth.api";

// --- Utility ---
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function SignupPage() {
  const [step, setStep] = useState<"selection" | "form">("selection");
  const [role, setRole] = useState<"client" | "freelancer" | null>(null);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      {/* HEADER */}
      <div className="py-6 px-4 md:px-8 flex justify-between items-center bg-white shadow-sm border-b border-gray-100 relative z-20">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold"><img src="./images/Logo/hero-freelancerss.png" alt="HeroFreelancer Logo" /></div>
          <span className="text-xl font-bold text-gray-700 hidden md:block">HeroFreelancer</span>
          <span className="text-xl font-bold text-gray-700 md:hidden"><img src="./images/Logo/hero-freelancerss.png" alt="HeroFreelancer Logo" /></span>
        </Link>
        
        <div className="flex items-center gap-4 text-sm">
          {step === "form" && (
            <div className="flex items-center gap-2">
               <span className="text-gray-600 hidden sm:inline">
                 {role === "client" ? "Looking for work?" : "Here to hire?"}
               </span>
               <button 
                 onClick={() => setRole(role === "client" ? "freelancer" : "client")}
                 className="text-blue-600 font-semibold hover:underline whitespace-nowrap"
               >
                 {role === "client" ? "Apply as a Freelancer" : "Join as a Client"}
               </button>
            </div>
          )}
          {step === "selection" && (
            <div className="text-gray-600">
              <span className="hidden sm:inline">Already have an account? </span>
              <Link href="/login" className="text-blue-600 font-semibold hover:underline">Log In</Link>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center pt-12 pb-20 px-4 overflow-y-auto">
        <AnimatePresence mode="wait">
          {step === "selection" ? (
            <RoleSelectionStep 
              key="selection"
              role={role} 
              setRole={setRole} 
              onContinue={() => setStep("form")} 
            />
          ) : (
            <RegistrationFormStep 
              key="form"
              role={role} 
              onBack={() => setStep("selection")} 
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ================= SUB-COMPONENTS =================

// --- STEP 1: Splitter (Kept mostly same, just slight styling tweaks) ---
const RoleSelectionStep = ({ role, setRole, onContinue }: any) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="w-full max-w-3xl flex flex-col items-center"
    >
      <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12 text-center font-heading">
        Join as a client or freelancer
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mb-12">
        {/* Client Card */}
        <div
          onClick={() => setRole("client")}
          className={cn(
            "relative p-8 rounded-xl border-2 cursor-pointer transition-all hover:shadow-lg bg-white h-64 flex flex-col justify-between group",
            role === "client" ? "border-blue-600 bg-blue-50/30" : "border-gray-200 hover:border-blue-300"
          )}
        >
          <div className="flex justify-between items-start">
             <Briefcase size={32} className={role === "client" ? "text-blue-600" : "text-gray-700"} />
             <div className={cn("w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors", role === "client" ? "border-blue-600" : "border-gray-300 group-hover:border-blue-300")}>
               {role === "client" && <div className="w-3 h-3 bg-blue-600 rounded-full" />}
             </div>
          </div>
          <p className="text-xl font-semibold text-gray-800">I'm a client, hiring for a project</p>
        </div>

        {/* Freelancer Card */}
        <div
          onClick={() => setRole("freelancer")}
          className={cn(
            "relative p-8 rounded-xl border-2 cursor-pointer transition-all hover:shadow-lg bg-white h-64 flex flex-col justify-between group",
            role === "freelancer" ? "border-blue-600 bg-blue-50/30" : "border-gray-200 hover:border-blue-300"
          )}
        >
          <div className="flex justify-between items-start">
             <User size={32} className={role === "freelancer" ? "text-blue-600" : "text-gray-700"} />
             <div className={cn("w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors", role === "freelancer" ? "border-blue-600" : "border-gray-300 group-hover:border-blue-300")}>
               {role === "freelancer" && <div className="w-3 h-3 bg-blue-600 rounded-full" />}
             </div>
          </div>
          <p className="text-xl font-semibold text-gray-800">I'm a freelancer, looking for work</p>
        </div>
      </div>

      <button
         disabled={!role}
         className={cn("px-16 py-3 rounded-full font-bold text-white transition-all transform shadow-md", role ? "bg-blue-600 hover:bg-blue-700 translate-y-0" : "bg-gray-300 cursor-not-allowed translate-y-2")}
         onClick={onContinue}
      >
        {role === "client" ? "Join as a Client" : role === "freelancer" ? "Apply as a Freelancer" : "Create Account"}
      </button>

      <p className="mt-8 text-gray-500 text-sm">
        Already have an account? <Link href="/login" className="text-blue-600 hover:underline">Log In</Link>
      </p>
    </motion.div>
  );
};

// --- STEP 2: The Form (UPDATED LOGIC) ---
const RegistrationFormStep = ({ role, onBack }: { role: "client" | "freelancer" | null, onBack: () => void }) => {
  const router = useRouter();
  
  // --- Initialize Hooks based on Role ---
  const [registerClient, { isLoading: isClientLoading }] = useRegisterClientMutation();
  const [registerFreelancer, { isLoading: isFreelancerLoading }] = useRegisterFreelancerMutation();

  const isLoading = isClientLoading || isFreelancerLoading;

  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState({ error: "", success: "" });
  const [resumeFile, setResumeFile] = useState<File | null>(null);

  // Unified Form State
  const [formData, setFormData] = useState({
    firstName: "", 
    lastName: "",  
    email: "",
    phone: "",
    whatsapp: "",
    address: "",
    password: "",
    // Client fields
    companyName: "",
    projectType: "",
    // Freelancer fields
    experienceLevel: "",
    skills: "", // Comma separated string for input UI
    portfolioUrl: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ error: "", success: "" });

    try {
      const fullName = `${formData.firstName} ${formData.lastName}`.trim();

      if (role === "client") {
        // 1. Client Registration (JSON)
        await registerClient({
            fullName,
            email: formData.email,
            phone: formData.phone,
            whatsapp: formData.whatsapp,
            address: formData.address,
            companyName: formData.companyName,
            projectType: formData.projectType,
            password: formData.password,
            // companyRole is optional in your types but might be required by backend
            companyRole: "Owner" 
        }).unwrap();
      } else {
        // 2. Freelancer Registration (FormData)
        if (!resumeFile) {
            setStatus({ error: "Please upload your resume (PDF/DOC)", success: "" });
            return;
        }

        const payload = new FormData();
        payload.append("fullName", fullName);
        payload.append("email", formData.email);
        payload.append("phone", formData.phone);
        payload.append("whatsapp", formData.whatsapp);
        payload.append("address", formData.address);
        payload.append("password", formData.password);
        payload.append("experienceLevel", formData.experienceLevel);
        payload.append("portfolioUrl", formData.portfolioUrl);
        
        // Convert skills string to JSON array for backend
        const skillsArray = formData.skills.split(",").map(s => s.trim()).filter(s => s !== "");
        payload.append("skills", JSON.stringify(skillsArray)); 
        
        payload.append("resume", resumeFile);

        await registerFreelancer(payload).unwrap();
      }
      
      setStatus({ error: "", success: `Success! Registered. Please verify OTP.` });
      
      // Redirect
      setTimeout(() => {
        router.push(`/verify-otp?email=${encodeURIComponent(formData.email)}&role=${role}`);
      }, 1500); 

    } catch (err: any) {
      console.error(err);
      const errorMessage = err?.data?.message || err.message || "Something went wrong";
      setStatus({ error: errorMessage, success: "" });
    }
  };

  const headingText = role === "freelancer" ? "Sign up to find work you love" : "Sign up to hire talent";

  return (
    <motion.div
      key={role}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-[600px] bg-white p-8 md:p-10 rounded-2xl shadow-xl border border-gray-100"
    >
      <div className="mb-6 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2 font-heading">{headingText}</h2>
      </div>

      {/* Error/Success Messages */}
      {status.error && <div className="mb-4 p-3 bg-red-50 text-red-600 rounded text-sm text-center">{status.error}</div>}
      {status.success && <div className="mb-4 p-3 bg-green-50 text-green-600 rounded text-sm text-center">{status.success}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* Name Fields */}
        <div className="grid grid-cols-2 gap-4">
          <InputGroup label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} icon={User} required />
          <InputGroup label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} icon={User} required />
        </div>

        {/* Email */}
        <InputGroup label="Email" name="email" type="email" value={formData.email} onChange={handleChange} icon={Mail} required />

        {/* Phone & Whatsapp */}
        <div className="grid grid-cols-2 gap-4">
           <InputGroup label="Phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} icon={Phone} placeholder="+91..." required />
           <InputGroup label="WhatsApp" name="whatsapp" type="tel" value={formData.whatsapp} onChange={handleChange} icon={Phone} placeholder="+91..." required />
        </div>

        {/* Address */}
        <InputGroup label="Address" name="address" value={formData.address} onChange={handleChange} icon={MapPin} required />

        {/* --- CONDITIONAL FIELDS --- */}
        {role === "client" ? (
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputGroup label="Company Name" name="companyName" value={formData.companyName} onChange={handleChange} icon={Briefcase} required />
                <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-600 pl-1">Project Type</label>
                    <div className="relative">
                        <Briefcase size={16} className="absolute left-3 top-3 text-gray-400" />
                        <select 
                            name="projectType" 
                            value={formData.projectType} 
                            onChange={handleChange} 
                            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:border-blue-500 outline-none bg-white text-sm" 
                            required
                        >
                            <option value="" disabled>Select Type</option>
                            <option value="App Development">App Development</option>
                            <option value="Web Development">Web Development</option>
                            <option value="Design">Design</option>
                            <option value="Marketing">Marketing</option>
                        </select>
                    </div>
                </div>
             </div>
        ) : (
             // FREELANCER FIELDS
             <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <label className="text-xs font-semibold text-gray-600 pl-1">Experience Level</label>
                        <div className="relative">
                            <Briefcase size={16} className="absolute left-3 top-3 text-gray-400" />
                            <select 
                                name="experienceLevel" 
                                value={formData.experienceLevel} 
                                onChange={handleChange} 
                                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:border-blue-500 outline-none bg-white text-sm" 
                                required
                            >
                                <option value="" disabled>Select Level</option>
                                <option value="Beginner">Beginner (0-2 yrs)</option>
                                <option value="Intermediate">Intermediate (2-5 yrs)</option>
                                <option value="Expert">Expert (5+ yrs)</option>
                            </select>
                        </div>
                    </div>
                    <InputGroup label="Portfolio URL (Optional)" name="portfolioUrl" value={formData.portfolioUrl} onChange={handleChange} icon={Briefcase} />
                </div>
                
                <InputGroup label="Skills (Comma separated)" name="skills" value={formData.skills} onChange={handleChange} icon={Layers} placeholder="React, Node.js, Design..." required />
                
                {/* File Upload */}
                <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-600 pl-1">Resume (PDF/DOC)</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:bg-gray-50 transition-colors cursor-pointer relative">
                        <input 
                            type="file" 
                            accept=".pdf,.doc,.docx"
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            onChange={(e) => setResumeFile(e.target.files ? e.target.files[0] : null)}
                        />
                        <div className="flex flex-col items-center justify-center gap-1">
                            <UploadCloud size={24} className="text-blue-500" />
                            <span className="text-sm font-medium text-gray-600 truncate max-w-[200px]">
                                {resumeFile ? resumeFile.name : "Click to upload resume"}
                            </span>
                        </div>
                    </div>
                </div>
             </>
        )}

        {/* Password */}
        <div className="space-y-1">
           <label className="text-xs font-semibold text-gray-600 pl-1">Password</label>
           <div className="relative">
             <input 
                name="password" 
                value={formData.password} 
                onChange={handleChange} 
                type={showPassword ? "text" : "password"} 
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-blue-500 outline-none pr-10" 
                minLength={6} 
                required 
             />
             <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
               {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
             </button>
           </div>
        </div>

        <button 
            type="submit" 
            disabled={isLoading} 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-full transition-all flex items-center justify-center mt-6 shadow-lg shadow-blue-200 disabled:opacity-70"
        >
          {isLoading ? <Loader2 className="animate-spin w-5 h-5"/> : "Create Account"}
        </button>
      </form>

      <button onClick={onBack} className="absolute top-28 left-4 md:left-8 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all">
        <ArrowLeft size={24} />
      </button>

    </motion.div>
  );
};

// --- Helper for Cleaner JSX ---
function InputGroup({ label, name, type = "text", value, onChange, icon: Icon, placeholder, required }: any) {
    return (
        <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-600 pl-1">{label}</label>
            <div className="relative">
                {Icon && <Icon size={16} className="absolute left-3 top-3 text-gray-400" />}
                <input 
                    name={name} 
                    type={type} 
                    value={value} 
                    onChange={onChange} 
                    placeholder={placeholder}
                    className={cn(
                        "w-full py-2.5 rounded-lg border border-gray-300 focus:border-blue-500 outline-none text-sm",
                        Icon ? "pl-10 pr-4" : "px-4"
                    )}
                    required={required} 
                />
            </div>
        </div>
    )
}