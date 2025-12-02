import { AnimatePresence, motion, Variants } from "framer-motion";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import Link from "next/link";
import { ClassValue, clsx } from "clsx";


import {
  ChevronDown,
  Menu,
  X,
} from "lucide-react";

// --- Utility for tw-merge ---
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Dropdown Data ---

const WORK_DROPDOWN_DATA = [
  {
    category: "Admin & support",
    items: ["Cold callers", "Content moderators", "Lead generation specialists", "Personal assistants", "Virtual assistants"]
  },
  {
    category: "AI & emerging tech",
    items: ["Automation engineers", "Chatbot developers", "Computer vision engineers", "Ethical hackers", "Machine learning engineers"]
  },
  {
    category: "Design & creative jobs",
    items: ["Canva jobs", "Graphic design jobs", "Illustration jobs", "Logo design jobs", "Web design jobs"]
  },
  {
    category: "Development & tech jobs",
    items: ["Mobile app development jobs", "Python jobs", "Software development jobs", "Web development jobs", "WordPress jobs"]
  },
  {
    category: "Marketing jobs",
    items: ["Digital marketing jobs", "Email marketing jobs", "Google Ads jobs", "SEO jobs", "Social media management jobs"]
  },
  {
    category: "Video, audio & animation",
    items: ["Animation jobs", "Audio editing jobs", "Music production jobs", "Video editing jobs", "Voice over jobs"]
  },
  {
    category: "Writing & content jobs",
    items: ["Book editing jobs", "Content writing jobs", "Copywriting jobs", "Email copywriting jobs", "Ghostwriting jobs"]
  }
];


// --- Freelancer Dropdown Data ---
const FREELANCER_DROPDOWN_DATA = [
  {
    category: "Admin & support",
    items: ["Cold callers", "Content moderators", "Lead generation specialists", "Personal assistants", "Virtual assistants"]
  },
  {
    category: "AI & emerging tech",
    items: ["Automation engineers", "Chatbot developers", "Computer vision engineers", "Ethical hackers", "Machine learning engineers"]
  },
  {
    category: "Design & creative",
    items: ["Graphic designers", "Illustrators", "Logo designers", "UX designers", "Web designers"]
  },
  {
    category: "Development & tech",
    items: ["Mobile app developers", "Python developers", "Software developers", "Web developers", "WordPress developers"]
  },
  {
    category: "Marketing",
    items: ["Digital marketers", "Email marketers", "Google Ads experts", "SEO experts", "Social media managers"]
  },
  {
    category: "Video, audio & animation",
    items: ["Animators", "Audio editors", "Music producers", "Video editors", "Voice actors"]
  },
  {
    category: "Writing & content",
    items: ["Book editors", "Content writers", "Copywriters", "Email copywriters", "Ghostwriters"]
  }
];



export default function Navbar() {
  // Desktop Hover State
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  
  // Mobile Menu States
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMobileCategory, setActiveMobileCategory] = useState<string | null>(null);

  // Helper to toggle mobile accordions
  const toggleMobileCategory = (category: string) => {
    setActiveMobileCategory(activeMobileCategory === category ? null : category);
  };

  return (
    <>
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="fixed left-0 right-0 top-4 mx-auto w-[90%] max-w-6xl z-50"
      >
        <div className="relative bg-white/90 backdrop-blur-md shadow-md rounded-2xl border border-gray-100 py-4 px-6 md:px-8 flex justify-between items-center z-50">
          
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer z-50">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">HF</div>
            <span className="text-xl font-bold text-gray-700">HeroFreelancer</span>
          </div>
          
          {/* ==================== DESKTOP MENU (>768px) ==================== */}
          <div className="hidden md:flex gap-6 lg:gap-8 text-sm font-medium text-gray-600 h-full items-center">
            <a href="#" className="hover:text-blue-600 transition-colors">Home</a>
            
            {/* --- Desktop Dropdown 1: Find Work --- */}
            <div 
              className="relative h-full flex items-center py-2"
              onMouseEnter={() => setActiveDropdown('work')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <a href="#" className={cn("transition-colors flex items-center gap-1", activeDropdown === 'work' ? "text-blue-600" : "hover:text-blue-600")}>
                Find work <ChevronDown size={14} className={cn("transition-transform duration-200", activeDropdown === 'work' ? "rotate-180" : "")}/>
              </a>
              
              <AnimatePresence>
                {activeDropdown === 'work' && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 15 }}
                    transition={{ duration: 0.2 }}
                    // RESPONSIVE WIDTH: Uses 90vw on tablets, fixed widths on larger screens
                    className="absolute top-full left-[-200px] -translate-x-1/2 mt-6 w-[70vw] md:w-[550px] lg:w-[630px] bg-white rounded-xl shadow-2xl border border-gray-100 p-6 lg:p-8 cursor-default max-h-[80vh] overflow-y-auto"
                  >
                    <div className="absolute -top-6 left-0 w-full h-6 bg-transparent" />
                    {/* RESPONSIVE GRID: 2 cols on tablet, 4 cols on desktop */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-8 gap-x-6">
                      {WORK_DROPDOWN_DATA.map((section, idx) => (
                        <div key={idx} className="space-y-3">
                          <h4 className="font-bold text-gray-900 text-sm border-b border-gray-100 pb-2">{section.category}</h4>
                          <ul className="space-y-2">
                            {section.items.map((item, itemIdx) => (
                              <li key={itemIdx}>
                                <Link href={`/jobs/${item.toLowerCase().replace(/\s+/g, '-')}`} className="text-xs text-gray-500 hover:text-blue-500 hover:underline transition-all block">{item}</Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                      <div className="flex flex-col justify-end space-y-3 col-span-2 lg:col-span-1">
                          <div className="bg-blue-50 p-4 rounded-lg">
                             <h4 className="font-bold text-blue-800 text-sm mb-1">Freelancer Plus</h4>
                             <p className="text-xs text-blue-600 mb-3">Get noticed by top clients and win more work.</p>
                             <a href="#" className="text-xs font-bold text-white bg-blue-600 px-4 py-2 rounded-md inline-block hover:bg-blue-700 transition-colors">Join Now</a>
                          </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* --- Desktop Dropdown 2: Find Freelancers --- */}
            <div 
              className="relative h-full flex items-center py-2"
              onMouseEnter={() => setActiveDropdown('freelancers')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <a href="#" className={cn("transition-colors flex items-center gap-1", activeDropdown === 'freelancers' ? "text-blue-600" : "hover:text-blue-600")}>
                Find Freelancers <ChevronDown size={14} className={cn("transition-transform duration-200", activeDropdown === 'freelancers' ? "rotate-180" : "")}/>
              </a>
              
              <AnimatePresence>
                {activeDropdown === 'freelancers' && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 15 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-[-200px] -translate-x-1/2 mt-6 w-[70vw] md:w-[550px] lg:w-[630px] bg-white rounded-xl shadow-2xl border border-gray-100 p-6 lg:p-8 cursor-default max-h-[80vh] overflow-y-auto"
                  >
                    <div className="absolute -top-6 left-0 w-full h-6 bg-transparent" />
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-8 gap-x-6">
                      {FREELANCER_DROPDOWN_DATA.map((section, idx) => (
                        <div key={idx} className="space-y-3">
                          <h4 className="font-bold text-gray-900 text-sm border-b border-gray-100 pb-2">{section.category}</h4>
                          <ul className="space-y-2">
                            {section.items.map((item, itemIdx) => (
                              <li key={itemIdx}>
                                <Link href={`/freelancers/${item.toLowerCase().replace(/\s+/g, '-')}`} className="text-xs text-gray-500 hover:text-blue-500 hover:underline transition-all block">{item}</Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                      <div className="flex flex-col justify-end space-y-3 col-span-2 lg:col-span-1">
                          <div className="bg-orange-50 p-4 rounded-lg">
                             <h4 className="font-bold text-orange-800 text-sm mb-1">Book Consultation</h4>
                             <p className="text-xs text-orange-600 mb-3">Talk to an expert to find the perfect talent.</p>
                             <a href="#" className="text-xs font-bold text-white bg-orange-500 px-4 py-2 rounded-md inline-block hover:bg-orange-600 transition-colors">Book Now</a>
                          </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link href="/login" className="hover:text-blue-600 transition-colors">Log In</Link>
            <Link href="/signup" className="hover:text-blue-600 transition-colors">Sign Up</Link>
            
            
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 lg:px-6 lg:py-2.5 rounded-full text-xs lg:text-sm font-medium transition-colors shadow-blue-200 shadow-lg whitespace-nowrap"
            ><Link href="/signup">
              Post a project
              </Link>
            </motion.button>
            
          </div>

          {/* ==================== MOBILE HAMBURGER BUTTON (<768px) ==================== */}
          <div className="md:hidden flex items-center gap-4">
            <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
              <Menu size={24} />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* ==================== MOBILE FULL SCREEN MENU ==================== */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-white z-[60] overflow-y-auto"
          >
            <div className="p-6">
              {/* Header */}
              <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">HF</div>
                  <span className="text-xl font-bold text-gray-700">HeroFreelancer</span>
                </div>
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-gray-500 bg-gray-100 rounded-full">
                  <X size={24} />
                </button>
              </div>

              {/* Mobile Links */}
              <div className="flex flex-col gap-6">
                <a href="#" className="text-lg font-bold text-gray-800">Home</a>

                {/* --- Mobile Accordion 1: Find Work --- */}
                <div>
                  <button 
                    onClick={() => toggleMobileCategory('work')}
                    className="flex justify-between items-center w-full text-lg font-bold text-gray-800 mb-2"
                  >
                    Find Work <ChevronDown size={20} className={cn("transition-transform", activeMobileCategory === 'work' ? "rotate-180" : "")}/>
                  </button>
                  <AnimatePresence>
                    {activeMobileCategory === 'work' && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden bg-gray-50 rounded-lg"
                      >
                        <div className="p-4 space-y-6">
                           {WORK_DROPDOWN_DATA.map((section, idx) => (
                             <div key={idx}>
                               <h5 className="font-semibold text-sm text-blue-600 mb-2">{section.category}</h5>
                               <ul className="space-y-2 border-l-2 border-gray-200 pl-3">
                                 {section.items.map((item, i) => (
                                   <li key={i}><a href="#" className="text-sm text-gray-600 block py-1">{item}</a></li>
                                 ))}
                               </ul>
                             </div>
                           ))}
                           <div className="bg-blue-100 p-4 rounded-md">
                             <p className="font-bold text-blue-700 text-sm">Freelancer Plus</p>
                             <a href="#" className="text-xs text-blue-600 underline">Join Now</a>
                           </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* --- Mobile Accordion 2: Find Freelancers --- */}
                <div>
                  <button 
                    onClick={() => toggleMobileCategory('freelancers')}
                    className="flex justify-between items-center w-full text-lg font-bold text-gray-800 mb-2"
                  >
                    Find Freelancers <ChevronDown size={20} className={cn("transition-transform", activeMobileCategory === 'freelancers' ? "rotate-180" : "")}/>
                  </button>
                  <AnimatePresence>
                    {activeMobileCategory === 'freelancers' && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden bg-gray-50 rounded-lg"
                      >
                         <div className="p-4 space-y-6">
                           {FREELANCER_DROPDOWN_DATA.map((section, idx) => (
                             <div key={idx}>
                               <h5 className="font-semibold text-sm text-orange-600 mb-2">{section.category}</h5>
                               <ul className="space-y-2 border-l-2 border-gray-200 pl-3">
                                 {section.items.map((item, i) => (
                                   <li key={i}><a href="#" className="text-sm text-gray-600 block py-1">{item}</a></li>
                                 ))}
                               </ul>
                             </div>
                           ))}
                           <div className="bg-orange-100 p-4 rounded-md">
                             <p className="font-bold text-orange-700 text-sm">Book Consultation</p>
                             <a href="#" className="text-xs text-orange-600 underline">Book Now</a>
                           </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <Link href="/login" className="text-lg font-bold text-gray-800">Log In</Link>
                <Link href="/signup" className="text-lg font-bold text-white bg-blue-600 px-4 py-2 rounded-full shadow-lg shadow-blue-200 inline-block text-center">Sign Up</Link>
                {/* <a href="#" className="text-lg font-bold text-gray-800">Sign Up</a> */}

                
                
                <button className="bg-blue-500 text-white w-full py-3 rounded-xl font-bold shadow-lg shadow-blue-200 mt-4">
                  Post a Project
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};