"use client";

import { useState } from "react";
import { Sparkles, UploadCloud, ChevronDown, DollarSign, Clock, Users, Eye } from "lucide-react";

// --- DUMMY DATA ---
const SKILLS = [
  "React JS",
  "Node.js",
  "Flutter",
  "Python",
  "UI/UX",
  "Blockchain",
  "Zoho CRM",
];

// --- REUSABLE COMPONENTS ---

// 1. Fixed Card Component Types
function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-white rounded-xl shadow-lg border border-gray-100 ${className}`}>
      {children}
    </div>
  );
}

// 2. Fixed SectionHeader Types
function SectionHeader({ title, icon: Icon }: { title: string; icon: any }) {
  return (
    <h2 className="flex items-center text-2xl font-bold text-slate-800 mb-6 border-b pb-3">
      <Icon size={24} className="text-cyan-500 mr-3" />
      {title}
    </h2>
  );
}

// 3. Fixed FormInput Types
interface FormInputProps {
  label: string;
  value: string | number;
  onChange: (e: any) => void; // Using any to handle both input and textarea events easily
  placeholder?: string;
  type?: string;
  rows?: number;
}

function FormInput({ label, value, onChange, placeholder, type = "text", rows }: FormInputProps) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-semibold text-slate-700">{label}</label>
      {rows ? (
        <textarea
          value={value}
          onChange={onChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition outline-none"
          placeholder={placeholder}
          rows={rows}
        />
      ) : (
        <input
          value={value}
          onChange={onChange}
          type={type}
          className="w-full p-3 border border-gray-300 rounded-lg focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition outline-none"
          placeholder={placeholder}
        />
      )}
    </div>
  );
}

// 4. Fixed FormSelect Types
interface FormSelectProps {
  label: string;
  value: string | number;
  onChange: (e: any) => void;
  options: string[];
}

function FormSelect({ label, value, onChange, options }: FormSelectProps) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-semibold text-slate-700">{label}</label>
      <div className="relative">
        <select
          value={value}
          onChange={onChange}
          className="w-full appearance-none p-3 border border-gray-300 rounded-lg bg-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition outline-none"
        >
          {options.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
        <ChevronDown size={20} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
      </div>
    </div>
  );
}

// --- MAIN COMPONENT ---
export default function PostJob() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [projectType, setProjectType] = useState("One-time Project");
  const [skills, setSkills] = useState<string[]>([]);
  const [budgetType, setBudgetType] = useState<"fixed" | "hourly">("fixed");
  const [budget, setBudget] = useState("");
  const [timeline, setTimeline] = useState("2–4 Weeks");
  const [visibility, setVisibility] = useState("Public");

  const toggleSkill = (skill: string) => {
    setSkills((prev) =>
      prev.includes(skill)
        ? prev.filter((s) => s !== skill)
        : [...prev, skill]
    );
  };

  const generateWithAI = () => {
    setDescription(
      "We are looking for an experienced developer to build a high-quality application with clean UI, scalable backend, and great user experience."
    );
  };

  const publishJob = () => {
    alert("✅ Job Published Successfully!");
    console.log({
      title,
      description,
      projectType,
      skills,
      budgetType,
      budget,
      timeline,
      visibility,
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 px-4 sm:px-6 py-12">
        {/* ================= LEFT FORM (DETAILS) ================= */}
        <div className="lg:col-span-2 space-y-10">
          
          {/* Job Details */}
          <Card className="p-8">
            <SectionHeader title="Project Scope" icon={Clock} />

            <div className="space-y-6">
              <FormInput
                label="Project Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Build a React Native Food Delivery App"
              />

              <FormInput
                label="Project Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe your project requirements, target audience, and key features."
                rows={5}
              />

              {/* AI Generator Button - Enhanced Look */}
              <div className="p-3 border border-dashed border-cyan-300 rounded-lg bg-cyan-50 text-center">
                <button
                  onClick={generateWithAI}
                  className="inline-flex items-center gap-2 text-sm font-semibold bg-cyan-600 text-white px-5 py-2.5 rounded-full shadow-md hover:bg-cyan-700 transition duration-150"
                >
                  <Sparkles size={16} /> Generate Description with AI
                </button>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <FormSelect
                  label="Project Type"
                  value={projectType}
                  onChange={(e) => setProjectType(e.target.value)}
                  options={["One-time Project", "Ongoing Maintenance", "Dedicated Team"]}
                />

                <div className="space-y-1.5">
                    <label className="block text-sm font-semibold text-slate-700">Attachments</label>
                    <div className="flex items-center justify-center p-3 border-2 border-dashed border-gray-300 rounded-lg h-full hover:border-cyan-500 transition cursor-pointer">
                        <UploadCloud size={20} className="text-gray-500 mr-2" />
                        <span className="text-sm text-gray-600">Click to upload files (max 10MB)</span>
                        <input type="file" multiple className="sr-only" />
                    </div>
                </div>
              </div>
            </div>
          </Card>
          
          {/* Skills */}
          <Card className="p-8">
            <SectionHeader title="Skills & Expertise" icon={Users} />

            <p className="text-sm text-slate-600 mb-4">
                Select the core skills required for your project.
            </p>

            <div className="flex flex-wrap gap-3">
              {SKILLS.map((skill) => (
                <button
                  key={skill}
                  onClick={() => toggleSkill(skill)}
                  // Pill-style, highly distinct selected state
                  className={`px-4 py-2 rounded-full border text-sm font-medium transition duration-200 ${
                    skills.includes(skill)
                      ? "bg-cyan-600 text-white border-cyan-600 shadow-md transform scale-105"
                      : "bg-white text-slate-700 border-gray-300 hover:bg-slate-50"
                  }`}
                >
                  {skill}
                </button>
              ))}
            </div>
          </Card>

          {/* Budget */}
          <Card className="p-8">
            <SectionHeader title="Budget & Timeline" icon={DollarSign} />

            {/* Budget Type Toggle - Tab Style */}
            <div className="flex rounded-lg bg-gray-100 p-1 mb-6 shadow-inner">
              {["fixed", "hourly"].map((type) => (
                <button
                  key={type}
                  onClick={() => setBudgetType(type as any)}
                  className={`flex-1 text-center p-3 rounded-md transition duration-200 font-semibold text-sm ${
                    budgetType === type
                      ? "bg-white text-indigo-600 shadow-md ring-1 ring-gray-200"
                      : "text-slate-600 hover:bg-gray-200"
                  }`}
                >
                  {type === "fixed" ? "💰 Fixed Price" : "⏱ Hourly Rate"}
                </button>
              ))}
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
                <FormInput
                    label={budgetType === "fixed" ? "Total Project Budget (INR)" : "Hourly Rate (INR)"}
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    type="number"
                    placeholder={
                        budgetType === "fixed"
                        ? "e.g., 50000 (Fixed)"
                        : "e.g., 500/hr (Hourly)"
                    }
                />

                <FormSelect
                    label="Expected Delivery Time"
                    value={timeline}
                    onChange={(e) => setTimeline(e.target.value)}
                    options={["1 Week", "2–4 Weeks", "1–3 Months", "3+ Months"]}
                />
            </div>
          </Card>
        </div>

        {/* ================= SIDEBAR ================= */}
        <aside className="space-y-8">
          
          {/* Visibility */}
          <Card className="p-6">
            <h3 className="flex items-center gap-2 font-bold text-lg text-slate-800 mb-4">
              <Eye size={20} className="text-indigo-500"/> Project Visibility
            </h3>
            
            <div className="space-y-3">
                {["Public", "Invite Only", "Private"].map((v) => (
                    <label key={v} className={`flex items-center p-3 rounded-lg border cursor-pointer transition ${
                        visibility === v ? "bg-indigo-50 border-indigo-400" : "hover:bg-slate-50"
                    }`}>
                        <input
                            type="radio"
                            checked={visibility === v}
                            onChange={() => setVisibility(v)}
                            className="mr-3 text-indigo-600 focus:ring-indigo-500"
                        />
                        <span className="font-medium">{v}</span>
                    </label>
                ))}
            </div>
          </Card>

          {/* Preview & Publish */}
          <Card className="p-6">
            <h3 className="font-bold text-lg text-slate-800 mb-3">
              📝 Summary
            </h3>

            <div className="mt-4 bg-gray-50 border rounded-lg p-4 text-sm space-y-2">
              <p>
                <strong className="text-slate-700">Title:</strong> {title || "—"}
              </p>
              <p>
                <strong className="text-slate-700">Budget:</strong>{" "}
                {budget ? `₹${budget}` : "—"} ({budgetType})
              </p>
              <p>
                <strong className="text-slate-700">Skills:</strong> {skills.join(", ") || "—"}
              </p>
              <p>
                <strong className="text-slate-700">Timeline:</strong> {timeline}
              </p>
            </div>

            {/* Publish Button - Highly Prominent CTA */}
            <button
              onClick={publishJob}
              className="mt-6 w-full bg-gradient-to-r from-indigo-600 to-cyan-600 text-white py-3 rounded-xl font-extrabold text-lg shadow-xl hover:shadow-cyan-400/50 transition duration-300 transform hover:scale-[1.01]"
            >
              🚀 Publish Job
            </button>
          </Card>
          
          {/* Relationship Manager & Suggested Freelancers combined for simplicity */}
          <Card className="p-6">
            <h3 className="font-bold text-lg text-slate-800 mb-4 border-b pb-3">
              Support & Suggestions
            </h3>
                      
            {/* Suggested Freelancers */}
            <div>
              <h4 className="font-semibold text-slate-700 mb-2 flex items-center gap-2">
                🌟 Suggested Freelancers
              </h4>
              <div className="space-y-3">
                {[
                  ["Priya Sharma", "Flutter Dev"],
                  ["Arjun Patel", "Full Stack"],
                  ["Sneha Verma", "UI/UX"],
                ].map((f, index) => (
                  <div key={index} className="flex gap-3 text-sm items-center">
                    <img
                      src={`https://i.pravatar.cc/44?img=${index + 1}`}
                      className="w-10 h-10 rounded-full border border-gray-200"
                      alt="Freelancer"
                    />
                    <div>
                      <strong className="text-slate-800">{f[0]}</strong>
                      <div className="text-slate-500">{f[1]}</div>
                    </div>
                    <button className="ml-auto text-xs text-cyan-600 font-semibold hover:underline">
                        Invite
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </aside>
      </div>
    </div>
  );
}