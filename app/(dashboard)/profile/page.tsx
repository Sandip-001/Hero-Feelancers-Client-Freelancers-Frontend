"use client";
import { Camera, CheckCircle, Filter, MapPin, Plus, Star, Upload, X, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";

export default function FreelancerProfile() {
  const [open, setOpen] = useState(false);
  const [projectModalOpen, setProjectModalOpen] = useState(false);

  // Centralized Profile State
  const [profile, setProfile] = useState({
    name: "Manas D.",
    title: "Full Stack Mobile & Web",
    location: "Kolkata, India",
    rate: "$35/hr",
    exp: "15+ yrs",
    avatar: "https://via.placeholder.com/120",
    about: "I build high-quality mobile & web apps with a focus on React Native and Node.js. I have over 15 years of experience delivering scalable solutions for startups and enterprises.",
    status: "Available",
    verified: true,
    skills: [
      { label: "React Native", value: "92%", score: "4.6" },
      { label: "Flutter", value: "96%", score: "4.8" },
      { label: "Node.js", value: "88%", score: "4.4" }
    ],
    quickPortfolio: [
      { title: "Food Delivery App", desc: "React Native • Firebase", image: "https://via.placeholder.com/56" },
      { title: "Marketplace", desc: "Next.js • Postgres", image: "https://via.placeholder.com/56" }
    ],
    certifications: [
      { provider: "AWS", name: "Certified" },
      { provider: "Google", name: "Flutter Expert" }
    ],
    socials: [
      { platform: "GitHub", url: "#" },
      { platform: "LinkedIn", url: "#" },
      { platform: "Dribbble", url: "#" }
    ]
  });

  // Projects State
  const [projects, setProjects] = useState([
    {
      id: 1,
      title: "Food Delivery App",
      role: "Lead Mobile Dev",
      tools: "React Native, Firebase",
      duration: "3 months",
      image: "https://via.placeholder.com/800x420",
      tags: ["Performance", "Payments"],
      category: "Mobile"
    },
    {
      id: 2,
      title: "Freelance Marketplace",
      role: "Full Stack",
      tools: "Next.js, Postgres",
      duration: "4 months",
      image: "https://via.placeholder.com/800x420",
      tags: ["Full Stack", "Web"],
      category: "Web"
    }
  ]);

  // Project Form State
  const [projectForm, setProjectForm] = useState({
    title: "",
    role: "",
    tools: "",
    duration: "",
    category: "Mobile",
    image: "https://via.placeholder.com/800x420"
  });

  // Filter State
  const [filter, setFilter] = useState("All");

  // Form state for editing profile
  const [formData, setFormData] = useState(profile);

  // Reset form data to current profile whenever modal opens
  useEffect(() => {
    if (open) {
      setFormData(profile);
    }
  }, [open, profile]);

  // Handle Save Profile
  const handleSave = () => {
    setProfile(formData);
    setOpen(false);
  };

  // Generic handler for nested array updates in formData
  const updateArrayItem = (arrayName: string, index: number, field: string, value: any) => {
    const updatedArray = (formData as any)[arrayName].map((item: any, i: number) => {
      if (i === index) {
        return { ...item, [field]: value };
      }
      return item;
    });
    setFormData({ ...formData, [arrayName]: updatedArray });
  };

  // Generic handler to remove an item from a nested array in formData
  const removeArrayItem = (arrayName: string, index: number) => {
    const updatedArray = (formData as any)[arrayName].filter((_: any, i: number) => i !== index);
    setFormData({ ...formData, [arrayName]: updatedArray });
  };

  // Generic handler to add a new item to a nested array in formData
  const addArrayItem = (arrayName: string, emptyItem: any) => {
    setFormData({ 
      ...formData, 
      [arrayName]: [...(formData as any)[arrayName], emptyItem] 
    });
  };

  // Handle Image Uploads
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData({ ...formData, avatar: imageUrl });
    }
  };

  const handleProjectImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProjectForm({ ...projectForm, image: imageUrl });
    }
  };

  // Handle Add Project
  const handleAddProject = () => {
    if (!projectForm.title || !projectForm.role) return; 
    setProjects([
      { ...projectForm, id: Date.now(), tags: [projectForm.category] }, 
      ...projects
    ]);
    setProjectModalOpen(false);
    setProjectForm({
      title: "", role: "", tools: "", duration: "", category: "Mobile", image: "https://via.placeholder.com/800x420"
    });
  };

  // Handle Filter Cycle
  const cycleFilter = () => {
    const options = ["All", "Mobile", "Web"];
    const nextIndex = (options.indexOf(filter) + 1) % options.length;
    setFilter(options[nextIndex]);
  };

  const displayedProjects = filter === "All" ? projects : projects.filter(p => p.category === filter);

  return (
    <div className="bg-gray-50 min-h-screen text-gray-900 font-sans relative p-6">
      
      {/* ========================================= */}
      {/* FULL EDIT PROFILE MODAL */}
      {/* ========================================= */}
      {open && (
        <div className="fixed inset-0 bg-black/60 z-[999] flex items-center justify-center px-4 backdrop-blur-sm transition-opacity">
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl flex flex-col max-h-[90vh] animate-fadeIn">
            <div className="flex items-center justify-between p-6 border-b bg-gray-50 rounded-t-2xl">
              <h2 className="text-xl font-bold text-gray-800">Edit Profile</h2>
              <button onClick={() => setOpen(false)} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                <X size={20} className="text-gray-500" />
              </button>
            </div>
            
            <div className="p-8 overflow-y-auto space-y-8">
              
              {/* SECTION: BASIC INFO */}
              <section className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Basic Information</h3>
                
                {/* Image Upload */}
                <div className="flex items-center gap-6">
                  <div className="relative group shrink-0">
                    <img 
                      src={formData.avatar} 
                      alt="Preview" 
                      className="w-20 h-20 rounded-full object-cover border-2 border-gray-200 shadow-sm" 
                      onError={(e) => (e.target as HTMLImageElement).src = "https://via.placeholder.com/150"}
                    />
                    <div className="absolute inset-0 bg-black/20 rounded-full hidden group-hover:flex items-center justify-center transition-all cursor-pointer">
                       <Camera size={20} className="text-white opacity-80" />
                    </div>
                    <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleImageUpload} />
                  </div>
                  <div className="flex-1 space-y-2">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-medium text-gray-500 uppercase">Full Name</label>
                          <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full mt-1 px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-green-500 outline-none" />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-500 uppercase">Status</label>
                          <select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })} className="w-full mt-1 px-3 py-2 border rounded-lg text-sm bg-white focus:ring-2 focus:ring-green-500 outline-none">
                            <option>Available</option><option>Busy</option><option>Offline</option>
                          </select>
                        </div>
                      </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-500 uppercase">Job Title</label>
                    <input type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="w-full mt-1 px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-green-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 uppercase">Location</label>
                    <input type="text" value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} className="w-full mt-1 px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-green-500 outline-none" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-500 uppercase">Hourly Rate</label>
                    <input type="text" value={formData.rate} onChange={(e) => setFormData({ ...formData, rate: e.target.value })} className="w-full mt-1 px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-green-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 uppercase">Experience</label>
                    <input type="text" value={formData.exp} onChange={(e) => setFormData({ ...formData, exp: e.target.value })} className="w-full mt-1 px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-green-500 outline-none" />
                  </div>
                </div>
                
                <div>
                  <label className="block text-xs font-medium text-gray-500 uppercase">About / Bio</label>
                  <textarea rows={3} value={formData.about} onChange={(e) => setFormData({ ...formData, about: e.target.value })} className="w-full mt-1 px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-green-500 outline-none resize-none" />
                </div>
              </section>

              {/* SECTION: SKILLS */}
              <section className="space-y-3">
                <div className="flex justify-between items-center border-b pb-2">
                   <h3 className="text-lg font-semibold text-gray-900">Skills</h3>
                   <button onClick={() => addArrayItem('skills', { label: "", value: "50%", score: "0.0" })} className="text-xs flex items-center gap-1 bg-green-50 text-green-700 px-2 py-1 rounded hover:bg-green-100"><Plus size={12}/> Add Skill</button>
                </div>
                <div className="space-y-2">
                  {formData.skills.map((skill, idx) => (
                    <div key={idx} className="flex gap-2 items-center">
                      <input type="text" placeholder="Skill (e.g. React)" value={skill.label} onChange={(e) => updateArrayItem('skills', idx, 'label', e.target.value)} className="flex-1 px-3 py-2 border rounded-lg text-sm" />
                      <input type="text" placeholder="%" value={skill.value} onChange={(e) => updateArrayItem('skills', idx, 'value', e.target.value)} className="w-16 px-3 py-2 border rounded-lg text-sm" />
                      <input type="text" placeholder="Score" value={skill.score} onChange={(e) => updateArrayItem('skills', idx, 'score', e.target.value)} className="w-16 px-3 py-2 border rounded-lg text-sm" />
                      <button onClick={() => removeArrayItem('skills', idx)} className="text-red-400 hover:text-red-600 p-1"><Trash2 size={16}/></button>
                    </div>
                  ))}
                </div>
              </section>

              {/* SECTION: QUICK PORTFOLIO */}
              <section className="space-y-3">
                <div className="flex justify-between items-center border-b pb-2">
                   <h3 className="text-lg font-semibold text-gray-900">Quick Portfolio</h3>
                   <button onClick={() => addArrayItem('quickPortfolio', { title: "", desc: "", image: "https://via.placeholder.com/56" })} className="text-xs flex items-center gap-1 bg-green-50 text-green-700 px-2 py-1 rounded hover:bg-green-100"><Plus size={12}/> Add Item</button>
                </div>
                <div className="space-y-3">
                  {formData.quickPortfolio.map((item, idx) => (
                    <div key={idx} className="flex gap-3 items-start p-3 border rounded-lg bg-gray-50">
                      <img 
                        src={item.image} 
                        alt="Portfolio"
                        className="w-10 h-10 rounded object-cover bg-gray-200"
                        onError={(e) => (e.target as HTMLImageElement).src = "https://via.placeholder.com/56"}
                      />
                      <div className="flex-1 grid grid-cols-2 gap-2">
                          <input type="text" placeholder="Project Name" value={item.title} onChange={(e) => updateArrayItem('quickPortfolio', idx, 'title', e.target.value)} className="px-2 py-1 border rounded text-sm" />
                          <input type="text" placeholder="Description" value={item.desc} onChange={(e) => updateArrayItem('quickPortfolio', idx, 'desc', e.target.value)} className="px-2 py-1 border rounded text-sm" />
                      </div>
                      <button onClick={() => removeArrayItem('quickPortfolio', idx)} className="text-red-400 hover:text-red-600 mt-1"><Trash2 size={16}/></button>
                    </div>
                  ))}
                </div>
              </section>

              {/* SECTION: CERTIFICATIONS */}
              <section className="space-y-3">
                <div className="flex justify-between items-center border-b pb-2">
                   <h3 className="text-lg font-semibold text-gray-900">Certifications</h3>
                   <button onClick={() => addArrayItem('certifications', { provider: "", name: "" })} className="text-xs flex items-center gap-1 bg-green-50 text-green-700 px-2 py-1 rounded hover:bg-green-100"><Plus size={12}/> Add Cert</button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {formData.certifications.map((cert, idx) => (
                    <div key={idx} className="flex gap-2 items-center">
                      <input type="text" placeholder="Provider (e.g. AWS)" value={cert.provider} onChange={(e) => updateArrayItem('certifications', idx, 'provider', e.target.value)} className="w-1/3 px-3 py-2 border rounded-lg text-sm" />
                      <input type="text" placeholder="Name" value={cert.name} onChange={(e) => updateArrayItem('certifications', idx, 'name', e.target.value)} className="flex-1 px-3 py-2 border rounded-lg text-sm" />
                      <button onClick={() => removeArrayItem('certifications', idx)} className="text-red-400 hover:text-red-600"><Trash2 size={16}/></button>
                    </div>
                  ))}
                </div>
              </section>

              {/* SECTION: SOCIALS */}
              <section className="space-y-3">
                 <div className="flex justify-between items-center border-b pb-2">
                   <h3 className="text-lg font-semibold text-gray-900">Social Links</h3>
                   <button onClick={() => addArrayItem('socials', { platform: "New Link", url: "#" })} className="text-xs flex items-center gap-1 bg-green-50 text-green-700 px-2 py-1 rounded hover:bg-green-100"><Plus size={12}/> Add Social</button>
                </div>
                <div className="flex flex-wrap gap-3">
                  {formData.socials.map((social, idx) => (
                    <div key={idx} className="flex items-center gap-1 bg-gray-50 border rounded-full px-2 py-1">
                       <input type="text" value={social.platform} onChange={(e) => updateArrayItem('socials', idx, 'platform', e.target.value)} className="bg-transparent text-sm w-20 outline-none text-gray-700" />
                       <button onClick={() => removeArrayItem('socials', idx)} className="text-gray-400 hover:text-red-500 rounded-full p-0.5"><X size={14}/></button>
                    </div>
                  ))}
                </div>
              </section>

            </div>
            <div className="p-6 border-t bg-gray-50 rounded-b-2xl flex justify-end gap-3">
              <button onClick={() => setOpen(false)} className="px-5 py-2.5 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-100 transition-colors">Cancel</button>
              <button onClick={handleSave} className="px-5 py-2.5 rounded-lg bg-[#0E9F6E] text-white font-medium hover:bg-[#09875D] shadow-lg shadow-green-200 transition-all">Save Changes</button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================= */}
      {/* ADD PROJECT MODAL */}
      {/* ========================================= */}
      {projectModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-[999] flex items-center justify-center px-4 backdrop-blur-sm transition-opacity">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl flex flex-col max-h-[90vh] animate-fadeIn">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-bold text-gray-800">Add New Project</h2>
              <button onClick={() => setProjectModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <X size={20} className="text-gray-500" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto space-y-5">
              
              {/* Project Image Upload Section */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Project Image</label>
                <div className="flex items-start gap-4">
                  <div className="relative w-32 h-20 bg-gray-100 rounded-lg overflow-hidden border border-gray-200 shrink-0">
                    <img 
                      src={projectForm.image} 
                      alt="Preview" 
                      className="w-full h-full object-cover"
                      onError={(e) => (e.target as HTMLImageElement).src = "https://via.placeholder.com/800x420"}
                    />
                  </div>
                  
                  <div className="flex flex-col gap-2 w-full">
                    <label className="cursor-pointer bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 hover:border-gray-400 transition-all flex items-center justify-center gap-2 shadow-sm w-full">
                      <Upload size={16} />
                      Upload Cover
                      <input type="file" accept="image/*" className="hidden" onChange={handleProjectImageUpload} />
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Project Title</label>
                <input type="text" value={projectForm.title} onChange={(e) => setProjectForm({...projectForm, title: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0E9F6E] outline-none" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                  <input type="text" value={projectForm.role} onChange={(e) => setProjectForm({...projectForm, role: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0E9F6E] outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select value={projectForm.category} onChange={(e) => setProjectForm({...projectForm, category: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0E9F6E] outline-none bg-white">
                    <option value="Mobile">Mobile</option>
                    <option value="Web">Web</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tools Used</label>
                <input type="text" value={projectForm.tools} onChange={(e) => setProjectForm({...projectForm, tools: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0E9F6E] outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                <input type="text" value={projectForm.duration} onChange={(e) => setProjectForm({...projectForm, duration: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0E9F6E] outline-none" />
              </div>
            </div>
            <div className="p-6 border-t bg-gray-50 rounded-b-2xl flex justify-end gap-3">
              <button onClick={() => setProjectModalOpen(false)} className="px-5 py-2.5 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-100 transition-colors">Cancel</button>
              <button onClick={handleAddProject} className="px-5 py-2.5 rounded-lg bg-[#0E9F6E] text-white font-medium hover:bg-[#09875D] shadow-lg shadow-green-200 transition-all">Add Project</button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================= */}
      {/* MAIN PROFILE PAGE */}
      {/* ========================================= */}

      <main className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT SIDEBAR */}
        <aside className="lg:col-span-4 space-y-6">
          
          {/* IDENTITY CARD */}
          <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-start gap-5">
              <div className="relative shrink-0">
                <img
                  src={profile.avatar}
                  alt="avatar"
                  className="w-24 h-24 rounded-full object-cover border-4 border-gray-50 shadow-sm"
                  onError={(e) => (e.target as HTMLImageElement).src = "https://via.placeholder.com/150"}
                />
                <span className={`absolute bottom-1 right-1 w-5 h-5 rounded-full border-2 border-white ${profile.status === 'Available' ? 'bg-green-500' : 'bg-amber-500'}`} title={profile.status} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h1 className="text-xl font-bold text-gray-900 truncate">{profile.name}</h1>
                  {profile.verified && (
                    <CheckCircle size={16} className="text-[#0E9F6E] shrink-0" fill="#E1FCEF" />
                  )}
                </div>

                <p className="text-sm text-gray-500 mb-3 truncate">
                  {profile.title}
                </p>
                <div className="flex items-center gap-1 text-sm text-gray-500 mb-3">
                   <MapPin size={14} />
                   {profile.location}
                </div>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-semibold">{profile.rate}</span>
              <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-semibold">{profile.exp}</span>
            </div>

            <div className="mt-5 border-t pt-4 text-sm text-gray-600 space-y-3">
              <div className="flex justify-between items-center">
                <span>Total earnings</span>
                <span className="font-semibold text-gray-900">$6K+</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Total jobs</span>
                <span className="font-semibold text-gray-900">9</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Availability</span>
                <span className={`font-semibold ${profile.status === 'Available' ? 'text-green-600' : 'text-amber-600'}`}>{profile.status}</span>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button className="flex-1 bg-white border border-gray-300 text-gray-700 py-2.5 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                Public View
              </button>

              <button
                onClick={() => setOpen(true)}
                className="flex-1 bg-[#0E9F6E] text-white py-2.5 rounded-lg font-medium hover:bg-[#09875D] shadow-sm transition-colors flex items-center justify-center gap-2"
              >
                Edit Profile
              </button>
            </div>
          </section>

          {/* ABOUT */}
          <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-bold text-gray-900">About</h3>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
              {profile.about}
            </p>
            <div className="mt-4 flex gap-2 flex-wrap">
              <span className="bg-green-50 text-green-700 px-2 py-1 rounded text-xs font-medium border border-green-100">Strength: Performance</span>
              <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs font-medium border border-blue-100">Top 1% Devs</span>
            </div>
          </section>

          {/* SKILLS */}
          <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
            <h3 className="font-bold text-gray-900 mb-4">Skills & Expertise</h3>
            <div className="space-y-4 text-sm">
              {profile.skills.map((skill, idx) => (
                <div key={idx}>
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-700">{skill.label}</span>
                    <span className="font-semibold text-gray-900">{skill.score}</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div style={{ width: skill.value }} className="h-2 bg-[#0E9F6E] rounded-full transition-all duration-1000" />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* PORTFOLIO QUICK */}
          <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
            <h3 className="font-bold text-gray-900 mb-4">Portfolio (Quick)</h3>
            <ul className="space-y-4">
              {profile.quickPortfolio.map((item, idx) => (
                <li key={idx} className="flex items-start gap-4 p-2 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
                  <img src={item.image} className="w-14 h-14 object-cover rounded-lg border" alt="Project" />
                  <div>
                    <div className="font-semibold text-gray-900 text-sm">{item.title}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{item.desc}</div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-4 pt-3 border-t text-center">
              <a href="#portfolio" className="text-[#0E9F6E] text-sm font-semibold hover:underline">View full portfolio →</a>
            </div>
          </section>
          
           {/* CERTIFICATIONS */}
           <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
            <h3 className="font-bold text-gray-900 mb-3">Certifications</h3>
            <div className="grid grid-cols-2 gap-3">
              {profile.certifications.map((cert, idx) => (
                <div key={idx} className="p-3 border border-gray-200 rounded-lg bg-gray-50 text-center">
                  <div className="text-xs text-gray-500 mb-1">{cert.provider}</div>
                  <div className="text-sm font-semibold text-gray-800">{cert.name}</div>
                </div>
              ))}
            </div>
          </section>

        </aside>

        {/* MAIN CONTENT */}
        <section className="lg:col-span-8 space-y-6">
          
          {/* FULL PORTFOLIO */}
          <section id="portfolio" className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <h2 className="text-xl font-bold text-gray-900">Portfolio — Case Studies</h2>
              <div className="flex gap-3">
                <button 
                  onClick={cycleFilter}
                  className="px-4 py-1.5 rounded-lg border border-gray-300 text-sm font-medium hover:bg-gray-50 flex items-center gap-2 min-w-[120px] justify-center"
                >
                  <Filter size={14} />
                  Filter: {filter}
                </button>
                <button 
                  onClick={() => setProjectModalOpen(true)}
                  className="px-4 py-1.5 rounded-lg bg-black text-white text-sm font-medium hover:bg-gray-800 flex items-center gap-2"
                >
                  <Plus size={14} />
                  Add Project
                </button>
              </div>
            </div>
            
            {displayedProjects.length === 0 ? (
               <div className="text-center py-10 text-gray-500 bg-gray-50 rounded-xl border border-dashed">
                 No projects found in this category.
               </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn">
                {displayedProjects.map((project) => (
                  <article key={project.id} className="group border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-all bg-white">
                    <div className="overflow-hidden h-48 relative">
                      <img src={project.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Portfolio" onError={(e) => (e.target as HTMLImageElement).src = "https://via.placeholder.com/800x420"}/>
                      <span className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded backdrop-blur-sm">
                        {project.category}
                      </span>
                    </div>
                    <div className="p-5">
                      <h3 className="font-bold text-lg text-gray-900 mb-2">{project.title}</h3>
                      <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                        Role: {project.role} • Tools: {project.tools} • Duration: {project.duration}
                      </p>
                      <div className="flex gap-2 flex-wrap">
                        {project.tags.map((tag, i) => (
                          <span key={i} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md">{tag}</span>
                        ))}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>

          {/* WORK HISTORY */}
          <section id="history" className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Work History & Feedback</h2>
              <div className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">21 Reviews</div>
            </div>
            <ul className="space-y-4">
              {[
                {
                  title: "E-commerce Store Design",
                  client: "SoulWear Fashion",
                  price: "$1,200",
                  duration: "3 months",
                  rating: "5.0",
                  text: "Excellent work — delivered on time."
                },
                {
                  title: "Mobile UI Redesign",
                  client: "Retailer A",
                  price: "$800",
                  duration: "1 month",
                  rating: "4.9",
                  text: "Delivered clean UI and reusable components."
                }
              ].map((job) => (
                <li key={job.title} className="border border-gray-200 p-5 rounded-xl hover:bg-gray-50 transition-colors">
                  <div className="flex flex-col sm:flex-row justify-between gap-4">
                    <div>
                      <div className="font-bold text-gray-900 text-lg">{job.title}</div>
                      <div className="text-sm text-gray-500 mt-1">Client: {job.client} • {job.price}</div>
                      <div className="text-sm mt-3 text-gray-600 italic">"{job.text}"</div>
                    </div>
                    <div className="flex sm:flex-col items-center sm:items-end gap-2 sm:gap-1 min-w-[100px]">
                      <div className="font-semibold text-gray-900">{job.duration}</div>
                      <div className="flex items-center text-sm text-gray-700 bg-yellow-50 px-2 py-1 rounded border border-yellow-100">
                        <Star size={12} className="fill-yellow-400 text-yellow-400 mr-1"/> {job.rating}
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {/* SERVICES */}
          <section id="services" className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Services Offered</h2>
              <button className="text-sm text-[#0E9F6E] font-semibold hover:underline">Manage Services</button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  title: "Mobile App Development",
                  desc: "Native & cross-platform • From $35/hr",
                  eta: "2-6 weeks"
                },
                {
                  title: "UI/UX Design",
                  desc: "Wireframes & prototypes • From $25/hr",
                  eta: "1-3 weeks"
                }
              ].map((srv) => (
                <div key={srv.title} className="p-5 border border-gray-200 rounded-xl hover:border-[#0E9F6E] transition-colors group cursor-pointer bg-white">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-gray-900 group-hover:text-[#0E9F6E] transition-colors">{srv.title}</h4>
                      <div className="text-sm text-gray-500 mt-2">{srv.desc}</div>
                    </div>
                  </div>
                  <div className="mt-4 pt-3 border-t text-xs font-semibold text-gray-400 uppercase tracking-wide">
                      Est. Time: {srv.eta}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* EARNINGS */}
          <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Earnings & Analytics</h2>
              <div className="text-sm text-gray-500 space-x-2">
                 <span>Export:</span>
                 <button className="text-[#0E9F6E] hover:underline font-medium">PDF</button>
                 <span>•</span>
                 <button className="text-[#0E9F6E] hover:underline font-medium">CSV</button>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="p-5 border border-gray-200 rounded-xl bg-gray-50">
                <div className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Monthly Earnings (6mo)</div>
                <div className="h-40 flex items-end gap-2 mt-4">
                  {[40, 56, 32, 48, 64].map((h, i) => (
                    <div key={i} className={`flex-1 rounded-t-sm transition-all hover:opacity-80 ${i % 2 === 1 || i === 4 ? "bg-[#0E9F6E]" : "bg-gray-300"}`} style={{ height: `${h}%` }} title={`Month ${i+1}`} />
                  ))}
                </div>
              </div>
              <div className="p-5 border border-gray-200 rounded-xl bg-white">
                <div className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Top Clients</div>
                <ul className="space-y-3 text-sm">
                  <li className="flex justify-between items-center p-2 hover:bg-gray-50 rounded">
                    <span className="font-medium text-gray-700">SoulWear Fashion</span>
                    <span className="font-bold text-gray-900 bg-green-50 px-2 py-0.5 rounded text-green-700">$2,400</span>
                  </li>
                  <li className="flex justify-between items-center p-2 hover:bg-gray-50 rounded">
                    <span className="font-medium text-gray-700">Retailer A</span>
                    <span className="font-bold text-gray-900 bg-green-50 px-2 py-0.5 rounded text-green-700">$800</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* SOCIAL & CONTACT */}
          <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Social & Contact</h2>
            <div className="flex gap-3 flex-wrap">
              {profile.socials.map((s, idx)=> (
                <a key={idx} className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-600 hover:text-[#0E9F6E] hover:border-[#0E9F6E] transition-all text-sm font-medium" href={s.url}>
                  {s.platform}
                </a>
              ))}
            </div>
            <div className="mt-6 pt-6 border-t border-gray-100">
              <button className="w-full sm:w-auto bg-gray-900 text-white px-6 py-2.5 rounded-lg hover:bg-gray-800 transition-colors font-medium shadow-lg shadow-gray-200">
                 Invite to Job
              </button>
            </div>
          </section>
        </section>
      </main>

    </div>
  );
}