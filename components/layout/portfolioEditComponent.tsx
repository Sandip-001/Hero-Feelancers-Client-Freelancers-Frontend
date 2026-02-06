import { useUpdateProtfolioMutation } from "@/app/redux/api/portfolio.api";
import { ProjectFormType } from "@/types/portfolio";
import { Upload, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

type Props = {
  data: any;
  onClose: () => void;
};

const PortfolioEditComponent = ({ data, onClose }: Props) => {
  const [updatePortfolio, { isLoading }] = useUpdateProtfolioMutation();
  // Project Form State
  const [projectForm, setProjectForm] = useState<ProjectFormType>({
    title: "",
    role: "",
    technologies: [],
    duration: "",
    category: "mobile",
    otherCategory: "",
    imageUrl: "https://via.placeholder.com/800x420",
  });

  const [portfolioFile, setPortfolioFile] = useState<File | null>(null);

  const [technologyInput, setTechnologyInput] = useState("");

  // PREFILL DATA
  useEffect(() => {
    if (data) {
      setProjectForm({
        title: data.title || "",
        role: data.role || "",
        technologies: data.technologies || [],
        duration: data.duration || "",
        category: data.category || "mobile",
        otherCategory: data.otherCategory || "",
        imageUrl: data.imageUrl || "",
      });
    }
  }, [data]);

  const handleProjectImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPortfolioFile(file);
      setProjectForm({ ...projectForm, imageUrl: URL.createObjectURL(file) });
    }
  };

  // Generic handler for nested array updates in projectForm
  const handleTechnologyKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Enter" && technologyInput.trim()) {
      e.preventDefault();

      if (!projectForm.technologies.includes(technologyInput.trim())) {
        setProjectForm({
          ...projectForm,
          technologies: [...projectForm.technologies, technologyInput.trim()],
        });
      }
      setTechnologyInput("");
    }
  };

  const removeTechnology = (technology: string) => {
    setProjectForm({
      ...projectForm,
      technologies: projectForm.technologies.filter((t) => t !== technology),
    });
  };

  // Handle Add Portfolio
  const handleEditPortfolio = async () => {
    const fd = new FormData();

    fd.append("title", projectForm.title);
    fd.append("role", projectForm.role);
    fd.append(
      "technologies",
      JSON.stringify(projectForm.technologies.map((s) => s)),
    );
    fd.append("category", projectForm.category);

    if (projectForm.category === "other") {
      fd.append("otherCategory", projectForm.otherCategory);
    }

    fd.append("duration", projectForm.duration);

    if (portfolioFile) {
      fd.append("image", portfolioFile);
    }

    try {
      const res = await updatePortfolio({
        id: data.id,
        formData: fd,
      }).unwrap();

      onClose();
      toast.success(res?.message || "Portfolio updated Successfully");
    } catch (err: any) {
      toast.error(err?.data?.message || "Portfolio Create failed");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-[999] flex items-center justify-center px-4 backdrop-blur-sm transition-opacity">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl flex flex-col max-h-[90vh] animate-fadeIn">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-bold text-gray-800">
            Edit Portfolio Details
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>
        <div className="p-6 overflow-y-auto space-y-5">
          {/* Project Image Upload Section */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Project Image
            </label>
            <div className="flex items-start gap-4">
              <div className="relative w-32 h-20 bg-gray-100 rounded-lg overflow-hidden border border-gray-200 shrink-0">
                <img
                  src={projectForm.imageUrl}
                  alt="Preview"
                  className="w-full h-full object-cover"
                  onError={(e) =>
                    ((e.target as HTMLImageElement).src =
                      "https://via.placeholder.com/800x420")
                  }
                />
              </div>

              <div className="flex flex-col gap-2 w-full">
                <label className="cursor-pointer bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 hover:border-gray-400 transition-all flex items-center justify-center gap-2 shadow-sm w-full">
                  <Upload size={16} />
                  Upload Cover
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleProjectImageUpload}
                  />
                </label>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Project Title
            </label>
            <input
              type="text"
              value={projectForm.title}
              onChange={(e) =>
                setProjectForm({ ...projectForm, title: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0E9F6E] outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Role
              </label>
              <input
                type="text"
                value={projectForm.role}
                onChange={(e) =>
                  setProjectForm({ ...projectForm, role: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0E9F6E] outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                value={projectForm.category}
                onChange={(e) =>
                  setProjectForm({
                    ...projectForm,
                    category: e.target.value,
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0E9F6E] outline-none bg-white"
              >
                <option value="mobile">Mobile</option>
                <option value="web">Web</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          {projectForm.category === "other" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Specify Category
              </label>
              <input
                type="text"
                value={projectForm.otherCategory}
                onChange={(e) =>
                  setProjectForm({
                    ...projectForm,
                    otherCategory: e.target.value,
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="Enter category"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Technologies Used
            </label>
            <div>
              <input
                value={technologyInput}
                onChange={(e) => setTechnologyInput(e.target.value)}
                onKeyDown={handleTechnologyKeyDown}
                placeholder="Type a technology and press Enter..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0E9F6E] outline-none bg-white"
              />

              <div className="flex flex-wrap gap-2 mt-3">
                {projectForm.technologies.map((tech, index) => (
                  <span
                    key={tech}
                    className="group relative flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-full text-sm font-medium shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105 animate-fadeIn"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    {tech}
                    <button
                      onClick={() => removeTechnology(tech)}
                      className="hover:bg-white/20 rounded-full p-0.5 transition-colors"
                    >
                      <X size={14} />
                    </button>
                  </span>
                ))}
                {projectForm.technologies.length === 0 && (
                  <p className="text-sm text-gray-400 italic">
                    No technologies added yet
                  </p>
                )}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Duration
            </label>
            <input
              type="text"
              value={projectForm.duration}
              onChange={(e) =>
                setProjectForm({ ...projectForm, duration: e.target.value })
              }
              placeholder="type in days or months"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0E9F6E] outline-none"
            />
          </div>
        </div>
        <div className="p-6 border-t bg-gray-50 rounded-b-2xl flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-100 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleEditPortfolio}
            className="px-5 py-2.5 rounded-lg bg-[#0E9F6E] text-white font-medium hover:bg-[#09875D] shadow-lg shadow-green-200 transition-all"
          >
            {isLoading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PortfolioEditComponent;
