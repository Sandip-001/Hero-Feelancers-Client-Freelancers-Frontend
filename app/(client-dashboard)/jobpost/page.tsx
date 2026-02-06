"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Sparkles,
  UploadCloud,
  ChevronDown,
  DollarSign,
  Clock,
  Users,
  Eye,
  Loader2,
  Plus,
  X,
} from "lucide-react";
import { toast } from "sonner"; // Added toaster import

// Import Redux Hooks
import {
  useCreateJobMutation,
  useGenerateJobDescriptionMutation,
} from "./../../redux/api/jobs.api";

// --- CONSTANTS ---
const SUGGESTED_SKILLS = [
  "React JS",
  "Node.js",
  "Flutter",
  "Python",
  "UI/UX",
  "Blockchain",
  "Zoho CRM",
  "Java",
  "AWS",
  "Figma",
];

// --- REUSABLE COMPONENTS ---

function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`bg-white rounded-xl shadow-lg border border-gray-100 ${className}`}
    >
      {children}
    </div>
  );
}

function SectionHeader({ title, icon: Icon }: { title: string; icon: any }) {
  return (
    <h2 className="flex items-center text-2xl font-bold text-slate-800 mb-6 border-b pb-3">
      <Icon size={24} className="text-cyan-500 mr-3" />
      {title}
    </h2>
  );
}

interface FormInputProps {
  label: string;
  value: string | number;
  onChange: (e: any) => void;
  placeholder?: string;
  type?: string;
  rows?: number;
  onKeyDown?: (e: any) => void; // Added for custom skill input
}

function FormInput({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  rows,
  onKeyDown,
}: FormInputProps) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-semibold text-slate-700">
        {label}
      </label>
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
          onKeyDown={onKeyDown}
          type={type}
          className="w-full p-3 border border-gray-300 rounded-lg focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition outline-none"
          placeholder={placeholder}
        />
      )}
    </div>
  );
}

interface FormSelectProps {
  label: string;
  value: string | number;
  onChange: (e: any) => void;
  options: string[];
}

function FormSelect({ label, value, onChange, options }: FormSelectProps) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-semibold text-slate-700">
        {label}
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={onChange}
          className="w-full appearance-none p-3 border border-gray-300 rounded-lg bg-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition outline-none"
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <ChevronDown
          size={20}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
        />
      </div>
    </div>
  );
}

// --- MAIN COMPONENT ---
export default function PostJob() {
  const router = useRouter();

  // API Hooks
  const [createJob, { isLoading: isCreating }] = useCreateJobMutation();
  const [generateDesc, { isLoading: isGenerating }] =
    useGenerateJobDescriptionMutation();

  // Form State
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [projectType, setProjectType] = useState("One-time Project");
  const [skills, setSkills] = useState<string[]>([]);
  const [customSkill, setCustomSkill] = useState(""); // State for manual skill input
  const [budgetType, setBudgetType] = useState<"fixed" | "hourly">("fixed");
  const [budget, setBudget] = useState("");
  const [timeline, setTimeline] = useState("2–4 Weeks");
  const [visibility, setVisibility] = useState("Public");
  const [file, setFile] = useState<File | null>(null);

  // Toggle suggested skills
  const toggleSkill = (skill: string) => {
    setSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill],
    );
  };

  // Add custom skill
  const addCustomSkill = () => {
    if (customSkill.trim() && !skills.includes(customSkill.trim())) {
      setSkills([...skills, customSkill.trim()]);
      setCustomSkill("");
    }
  };

  // Handle Enter key for custom skill
  const handleCustomSkillKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent form submission
      addCustomSkill();
    }
  };

  // --- AI GENERATION ---
  const generateWithAI = async () => {
    if (!title) {
      toast.error("Please enter a title first to generate a description."); // Replaced alert
      return;
    }
    try {
      const res = await generateDesc({ title }).unwrap();
      setDescription(
        res.description || res.data?.description || "Generated description...",
      );
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to Genrate");
    }
  };

  // --- SUBMIT JOB ---
  const publishJob = async () => {
    if (!title || !description || !budget) {
      toast.error(
        "Please fill in all required fields (Title, Description, Budget).",
      ); // Replaced alert
      return;
    }

    try {
      const formData = new FormData();

      formData.append("title", title);
      formData.append("description", description);
      formData.append("technologies", JSON.stringify(skills));
      formData.append("currency", "INR");
      formData.append("projectValue", budget.toString());
      formData.append("hireTimeline", timeline);

      // FIX: Ensure lowercase values for enum (fixed/hourly)
      formData.append("priceType", budgetType === "fixed" ? "fixed" : "hourly");

      formData.append("jobType", projectType);
      formData.append("visibility", visibility);

      if (file) {
        formData.append("document", file);
      }

      await createJob(formData).unwrap();

      toast.success("Job Published Successfully!"); // Replaced alert
      router.push("/project");
    } catch (error: any) {
      console.error("Job Post Failed", error);
      // Safely extract error message
      const msg =
        error?.data?.error || error?.data?.message || "Failed to publish job.";
      toast.error(msg); // Replaced alert
    }
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

              {/* AI Generator Button */}
              <div className="p-3 border border-dashed border-cyan-300 rounded-lg bg-cyan-50 text-center">
                <button
                  onClick={generateWithAI}
                  disabled={isGenerating}
                  className="inline-flex items-center gap-2 text-sm font-semibold bg-cyan-600 text-white px-5 py-2.5 rounded-full shadow-md hover:bg-cyan-700 transition duration-150 disabled:opacity-70"
                >
                  {isGenerating ? (
                    <Loader2 className="animate-spin" size={16} />
                  ) : (
                    <Sparkles size={16} />
                  )}
                  {isGenerating
                    ? "Generating..."
                    : "Generate Description with AI"}
                </button>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <FormSelect
                  label="Project Type"
                  value={projectType}
                  onChange={(e) => setProjectType(e.target.value)}
                  options={[
                    "One-time Project",
                    "Ongoing Maintenance",
                    "Dedicated Team",
                  ]}
                />

                <div className="space-y-1.5">
                  <label className="block text-sm font-semibold text-slate-700">
                    Attachments
                  </label>
                  <div className="flex items-center justify-center p-3 border-2 border-dashed border-gray-300 rounded-lg h-full hover:border-cyan-500 transition cursor-pointer relative bg-slate-50">
                    <UploadCloud size={20} className="text-gray-500 mr-2" />
                    <span className="text-sm text-gray-600 truncate max-w-[150px]">
                      {file ? file.name : "Click to upload"}
                    </span>
                    <input
                      type="file"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      onChange={(e) =>
                        setFile(e.target.files ? e.target.files[0] : null)
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Skills */}
          <Card className="p-8">
            <SectionHeader title="Skills & Expertise" icon={Users} />

            <p className="text-sm text-slate-600 mb-4">
              Select from suggestions or add your own required skills.
            </p>

            {/* Custom Skill Input */}
            <div className="flex gap-2 mb-6">
              <div className="flex-1">
                <FormInput
                  label=""
                  value={customSkill}
                  onChange={(e) => setCustomSkill(e.target.value)}
                  placeholder="Type a skill (e.g. Next.js) and press Enter"
                  onKeyDown={handleCustomSkillKeyDown}
                />
              </div>
              <button
                onClick={addCustomSkill}
                className="mt-1.5 bg-slate-800 text-white px-4 rounded-lg hover:bg-slate-900 transition flex items-center justify-center h-[46px]"
              >
                <Plus size={20} />
              </button>
            </div>

            {/* Selected Skills Display */}
            {skills.length > 0 && (
              <div className="mb-6 p-4 bg-slate-50 rounded-xl border border-slate-200">
                <h4 className="text-xs font-bold text-slate-500 uppercase mb-3">
                  Selected Skills
                </h4>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="bg-cyan-100 text-cyan-800 text-sm font-semibold px-3 py-1 rounded-full flex items-center gap-1"
                    >
                      {skill}
                      <button
                        onClick={() => toggleSkill(skill)}
                        className="hover:text-red-500"
                      >
                        <X size={14} />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="border-t pt-4">
              <h4 className="text-xs font-bold text-slate-400 uppercase mb-3">
                Suggested Skills
              </h4>
              <div className="flex flex-wrap gap-3">
                {SUGGESTED_SKILLS.map((skill) => {
                  if (skills.includes(skill)) return null; // Don't show if already selected
                  return (
                    <button
                      key={skill}
                      onClick={() => toggleSkill(skill)}
                      className="px-4 py-2 rounded-full border text-sm font-medium transition duration-200 bg-white text-slate-700 border-gray-300 hover:bg-slate-50 hover:border-cyan-400"
                    >
                      + {skill}
                    </button>
                  );
                })}
              </div>
            </div>
          </Card>

          {/* Budget */}
          <Card className="p-8">
            <SectionHeader title="Budget & Timeline" icon={DollarSign} />

            {/* Budget Type Toggle */}
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
                label={
                  budgetType === "fixed"
                    ? "Total Project Budget (INR)"
                    : "Hourly Rate (INR)"
                }
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                type="number"
                placeholder={
                  budgetType === "fixed" ? "e.g., 50000" : "e.g., 500"
                }
              />

              <FormSelect
                label="Expected Delivery Time"
                value={timeline}
                onChange={(e) => setTimeline(e.target.value)}
                options={[
                  "Within One week",
                  "2–4 Weeks",
                  "1–3 Months",
                  "3+ Months",
                ]}
              />
            </div>
          </Card>
        </div>

        {/* ================= SIDEBAR ================= */}
        <aside className="space-y-8">
          {/* Visibility 
          <Card className="p-6">
            <h3 className="flex items-center gap-2 font-bold text-lg text-slate-800 mb-4">
              <Eye size={20} className="text-indigo-500" /> Project Visibility
            </h3>

            <div className="space-y-3">
              {["Public", "Invite Only", "Private"].map((v) => (
                <label
                  key={v}
                  className={`flex items-center p-3 rounded-lg border cursor-pointer transition ${
                    visibility === v
                      ? "bg-indigo-50 border-indigo-400"
                      : "hover:bg-slate-50"
                  }`}
                >
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
          </Card> */}

          {/* Preview & Publish */}
          <Card className="p-6">
            <h3 className="font-bold text-lg text-slate-800 mb-3">
              📝 Summary
            </h3>

            <div className="mt-4 bg-gray-50 border rounded-lg p-4 text-sm space-y-2">
              <p>
                <strong className="text-slate-700">Title:</strong>{" "}
                {title || "—"}
              </p>
              <p>
                <strong className="text-slate-700">Budget:</strong>{" "}
                {budget ? `₹${budget}` : "—"} ({budgetType})
              </p>
              <p>
                <strong className="text-slate-700">Skills:</strong>{" "}
                {skills.length > 0 ? skills.join(", ") : "—"}
              </p>
              <p>
                <strong className="text-slate-700">Timeline:</strong> {timeline}
              </p>
            </div>

            {/* Publish Button */}
            <button
              onClick={publishJob}
              disabled={isCreating}
              className="mt-6 w-full bg-gradient-to-r from-indigo-600 to-cyan-600 text-white py-3 rounded-xl font-extrabold text-lg shadow-xl hover:shadow-cyan-400/50 transition duration-300 transform hover:scale-[1.01] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isCreating ? (
                <Loader2 className="animate-spin" />
              ) : (
                "🚀 Publish Job"
              )}
            </button>
          </Card>

          {/* Support */}
          <Card className="p-6">
            <h3 className="font-bold text-lg text-slate-800 mb-4 border-b pb-3">
              Support
            </h3>
            <div className="text-sm text-slate-500">
              Need help crafting the perfect job post?{" "}
              <a href="#" className="text-cyan-600 hover:underline">
                Contact Support
              </a>
            </div>
          </Card>
        </aside>
      </div>
    </div>
  );
}
