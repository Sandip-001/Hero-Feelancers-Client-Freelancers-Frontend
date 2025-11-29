"use client";

import React, { useState } from "react";
import Image from "next/image";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { motion, AnimatePresence, Variants } from "framer-motion"; 
// import heroImg from "/images/landingpage/freelancer-illustration.png";
// import professionalImg from "/images/landingpage/professional-woman.png";
import {
  Search,
  User,
  FileText,
  Save,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Facebook,
  Twitter,
  Instagram,
  MapPin,
  Phone,
  Mail,
  Monitor,
  TrendingUp,
} from "lucide-react";

// --- Utility for tw-merge ---
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Animation Variants ---
const fadeInUp : Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const hoverScale = {
  scale: 1.05,
  transition: { duration: 0.2 },
};

const tapScale = {
  scale: 0.95,
};

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
  }),
};

// --- Data & Constants ---
// Expanded data to allow for sliding functionality
const CATEGORIES = [
  { name: "Graphics Design", img: "https://images.unsplash.com/photo-1690228254548-31ef53e40cd1?w=600&auto=format&fit=crop&q=60" },
  { name: "Cartoon Animation", img: "https://images.unsplash.com/photo-1753301037302-db30ae8e0146?w=600&auto=format&fit=crop&q=60" },
  { name: "Illustration", img: "https://images.unsplash.com/photo-1615184697985-c9bde1b07da7?auto=format&fit=crop&q=80&w=600" },
  { name: "Flyers & Vouchers", img: "https://images.unsplash.com/photo-1583407723467-9b2d22504831?w=600&auto=format&fit=crop&q=60" },
  { name: "Logo Design", img: "https://images.unsplash.com/photo-1498075702571-ecb018f3752d?w=600&auto=format&fit=crop&q=60" },
  { name: "Social Graphics", img: "https://images.unsplash.com/photo-1637416067365-2b5e7e8fe8fa?w=600&auto=format&fit=crop&q=60" },
  { name: "Article Writing", img: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&q=80&w=600" },
  { name: "Video Editing", img: "https://images.unsplash.com/photo-1574717025058-2f8737d2e2b7?w=600&auto=format&fit=crop&q=60" },
];

const BASE_WORKS = [
  {
    icon: <Monitor className="w-8 h-8 text-blue-500" />,
    title: "Logo Design",
    desc: "Need a professional logo for our writing studio/jewelry company.",
    bid: "$ 500",
    color: "bg-blue-50",
  },
  {
    icon: <FileText className="w-8 h-8 text-green-500" />,
    title: "Graphic Design",
    desc: "We need a graphic designer with UI/UX skills for our furniture company.",
    bid: "$ 500",
    color: "bg-green-50",
  },
  {
    icon: <TrendingUp className="w-8 h-8 text-orange-500" />,
    title: "Need a SEO",
    desc: "Need an SEO for our company who will let our company to a higher level.",
    bid: "$ 300",
    color: "bg-orange-50",
  },
];
// Duplicate data to create 3 pages of 3 items (9 total)
const RECENT_WORKS = [...BASE_WORKS, ...BASE_WORKS.map(w => ({...w, title: w.title + " (II)"})), ...BASE_WORKS.map(w => ({...w, title: w.title + " (III)"}))];

const BASE_PORTFOLIOS = [
  { name: "Bunny.design", role: "UI/UX Designer", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200" },
  { name: "Bhaskar Tiwari", role: "Graphic Designer", img: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&q=80&w=200" },
  { name: "Aksara Joshi", role: "Graphic Designer", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200" },
];
// Duplicate data to create 3 pages of 3 items (9 total)
const PORTFOLIOS = [...BASE_PORTFOLIOS, ...BASE_PORTFOLIOS.map(p => ({...p, name: p.name + " 2"})), ...BASE_PORTFOLIOS.map(p => ({...p, name: p.name + " 3"}))];

// --- Components ---

const Navbar = () => (
  <motion.nav 
    initial={{ y: -100, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.5 }}
    // UPDATED CLASSNAME BELOW:
    className="fixed left-0 right-0 top-4 mx-auto w-[95%] md:max-w-6xl py-4 px-6 md:px-12 flex justify-between items-center bg-white/90 backdrop-blur-md z-50 shadow-md rounded-2xl border border-gray-100"
  >
    <div className="flex items-center gap-2 cursor-pointer">
      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">S</div>
      <span className="text-xl font-bold text-gray-700">spacelance</span>
    </div>
    
    <div className="hidden md:flex gap-8 text-sm font-medium text-gray-600">
      <a href="#" className="text-blue-600">Home</a>
      <a href="#" className="hover:text-blue-600 transition-colors">Find work</a>
      <a href="#" className="hover:text-blue-600 transition-colors">Find Freelancers</a>
      <a href="#" className="hover:text-blue-600 transition-colors">Log In</a>
      <a href="#" className="hover:text-blue-600 transition-colors">Sign Up</a>
    </div>

    <motion.button 
      whileHover={{ scale: 1.05 }} // Added inline for demo, replace with your variable
      whileTap={{ scale: 0.95 }}   // Added inline for demo, replace with your variable
      className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2.5 rounded-full text-sm font-medium transition-colors shadow-blue-200 shadow-lg"
    >
      Post a project
    </motion.button>
  </motion.nav>
);

const Hero = () => (
  <section className="relative w-full bg-[#f2f9ff] py-16 px-6 md:px-12 flex flex-col md:flex-row items-center gap-12 overflow-hidden">
    {/* Text Content */}
    <motion.div 
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="flex-1 z-10 space-y-6"
    >
      <motion.h1 variants={fadeInUp} className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight">
        Are you looking for <br /> Freelancers?
      </motion.h1>
      <motion.p variants={fadeInUp} className="text-gray-500 max-w-lg text-lg">
        Hire Great Freelancers, Fast. Spacelance helps you hire elite freelancers at a moment's notice.
      </motion.p>

      <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 max-w-md">
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-md font-medium transition-colors shadow-lg shadow-blue-300/50"
        >
          Hire a Freelancer
        </motion.button>
        <div className="relative flex-1">
          <input 
            type="text" 
            placeholder="search freelance work" 
            className="w-full h-full px-4 py-3 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all"
          />
          <motion.button 
            whileHover={{ scale: 1.1 }}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-500 p-2 rounded-md text-white"
          >
            <Search size={16} />
          </motion.button>
        </div>
      </motion.div>
    </motion.div>

    {/* Illustration Area */}
    <div className="flex-1 relative w-full h-[400px] md:h-[500px] flex items-center justify-center">
      {/* Decorative Blob with Motion */}
      <motion.div 
        animate={{ 
          scale: [1, 1.1, 1],
          rotate: [0, 5, -5, 0]
        }}
        transition={{ 
          duration: 10, 
          repeat: Infinity,
          ease: "easeInOut" as const 
        }}
        className="absolute top-10 right-10 w-[400px] h-[400px] bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
      ></motion.div>
      
      {/* Main Hero Image - Floating Effect */}
      <motion.div 
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="relative w-full max-w-lg"
      >
         <motion.div
            animate={{ y: [-10, 10, -10] }}
            transition={{ 
               repeat: Infinity, 
               duration: 4, 
               ease: "easeInOut" as const
            }}
         >
            <img 
              src="/images/landingpage/freelancer-illustration.png"
              alt="Freelancer Illustration"
              className="w-full h-auto object-contain -scale-x-100"
            />
         </motion.div>
      </motion.div>
    </div>
  </section>
);

const Features = () => (
  <section className="py-16 px-6 md:px-12 bg-white">
    <motion.div 
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center max-w-6xl mx-auto"
    >
      {[
        { icon: User, title: "Create Account", desc: "First you have to create a account here." },
        { icon: FileText, title: "Search work", desc: "Search the best freelance work here" },
        { icon: Save, title: "Save and apply", desc: "Apply or save and start your work" }
      ].map((feature, index) => (
        <motion.div 
          key={index}
          variants={fadeInUp}
          whileHover={{ y: -10 }}
          className="flex flex-col items-center gap-3 group p-6 rounded-xl hover:shadow-lg transition-all cursor-pointer bg-white"
        >
          <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 mb-2 group-hover:bg-blue-500 group-hover:text-white transition-colors duration-300">
             <feature.icon size={32} />
          </div>
          <h3 className="text-lg font-bold text-gray-800">{feature.title}</h3>
          <p className="text-sm text-gray-500">{feature.desc}</p>
        </motion.div>
      ))}
    </motion.div>
  </section>
);

const FindBest = () => (
  <section className="py-20 px-6 md:px-12 bg-white overflow-hidden">
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16">
      {/* Left Image Side */}
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="relative flex-1 flex justify-center"
      >
        <div className="relative w-[450px] h-[400px]">
          {/* Main Photo */}
          <img 
            src="images/landingpage/professional-woman.png"
            alt="Professional Woman" 
            className="w-full h-full object-cover -scale-x-100"
          />
          
          {/* Floating Stats Card 1 */}
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" as const, delay: 0.5 }}
            className="absolute top-8 right-[80px] bg-white p-4 rounded-xl shadow-lg flex items-center gap-3 z-10"
          >
             <div className="bg-blue-100 p-2 rounded-full text-blue-600 font-bold text-l">500+</div>
             <div>
               <p className="text-l text-gray-400">Freelancers</p>
             </div>
          </motion.div>

          {/* Floating Stats Card 2 */}
          <motion.div 
             animate={{ y: [0, -12, 0] }}
             transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" as const}}
             className="absolute bottom-[150px] -right-12 bg-white p-4 rounded-xl shadow-lg flex items-center gap-3 z-10"
          >
             <div className="bg-orange-100 p-2 rounded-full text-orange-600 font-bold text-l">300+</div>
             <div>
               <p className="text-l text-gray-400">Freelance work posted</p>
             </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Right Text Side */}
      <motion.div 
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="flex-1 space-y-6 text-right"
      >
        <h2 className="text-6xl font-bold text-gray-900">
          Find The Best <br />
          <span className="text-blue-500">Freelancers</span> Here
        </h2>
        <p className="text-gray-500 leading-relaxed">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut erat bibendum ornare urna, cursus eget convallis feugiat imperdiet posuere justo suspendisse.
        </p>
        <p className="text-gray-500 leading-relaxed">
          Dolor sit amet, consectetur adipiscing elit. Ut erat bibendum ornare urna, cursus eget convallis feugiat imperdiet posuere justo.
        </p>
      </motion.div>
    </div>
  </section>
);

const RecentWorksSection = () => {
  // State for sliding logic
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState(0);
  const itemsPerPage = 3;
  const numPages = Math.ceil(RECENT_WORKS.length / itemsPerPage);

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    // Loop around logic
    setPage((prev) => {
      let next = prev + newDirection;
      if (next < 0) return numPages - 1;
      if (next >= numPages) return 0;
      return next;
    });
  };

  const currentItems = RECENT_WORKS.slice(page * itemsPerPage, (page * itemsPerPage) + itemsPerPage);

  return (
    <section className="py-16 px-6 md:px-12 bg-gray-50 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-end mb-12">
          <div>
            <p className="text-gray-400 text-sm mb-2">The latest freelance work!</p>
            <h2 className="text-3xl font-bold text-gray-900">Recently Posted <span className="text-blue-500">Works</span></h2>
          </div>
          <div className="flex gap-2">
             <motion.button 
              whileTap={tapScale} 
              onClick={() => paginate(-1)}
              className="p-2 rounded-full bg-white text-blue-500 shadow-sm hover:bg-blue-50 z-10"
             >
                <ChevronLeft size={20} />
             </motion.button>
             <motion.button 
              whileTap={tapScale} 
              onClick={() => paginate(1)}
              className="p-2 rounded-full bg-blue-500 text-white shadow-sm hover:bg-blue-600 z-10"
             >
                <ChevronRight size={20} />
             </motion.button>
          </div>
        </div>

        {/* Animated Grid Container */}
        <div className="relative h-[300px] md:h-[280px]">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div 
              key={page}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              className="absolute w-full grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {currentItems.map((work, idx) => (
                <motion.div 
                  key={idx}
                  whileHover={{ y: -5, boxShadow: "0 10px 30px -10px rgba(0,0,0,0.1)" }}
                  className="bg-white p-6 rounded-xl shadow-sm transition-all flex flex-col items-center text-center border border-gray-100 h-[280px]"
                >
                  <div className={cn("w-14 h-14 rounded-full flex items-center justify-center mb-4", work.color)}>
                    {work.icon}
                  </div>
                  <h3 className="font-bold text-lg text-gray-800 mb-2">{work.title}</h3>
                  <p className="text-gray-500 text-sm mb-6 line-clamp-3">{work.desc}</p>
                  <div className="w-full flex justify-between items-center mt-auto border-t pt-4">
                    <div>
                      <p className="text-xs text-gray-400">Highest bid</p>
                      <p className="font-bold text-gray-800">{work.bid}</p>
                    </div>
                    <button className="text-blue-500 text-sm font-semibold hover:underline">Apply now</button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

const CategoriesSection = () => (
  <section className="py-20 px-6 md:px-12 bg-white">
    <div className="max-w-6xl mx-auto text-center">
      <h2 className="text-3xl font-bold text-gray-900 mb-12">
        Choose Different <span className="text-blue-500">Category</span>
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {CATEGORIES.map((cat, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: idx * 0.05 }}
            viewport={{ once: true }}
            className="relative group overflow-hidden rounded-xl h-40 cursor-pointer"
          >
            <Image 
              src={cat.img} 
              alt={cat.name}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors flex items-center justify-center">
               <span className="text-white font-semibold text-sm md:text-base">{cat.name}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.button 
        whileHover={hoverScale}
        whileTap={tapScale}
        className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-md font-medium transition-colors"
      >
        More Categories
      </motion.button>
    </div>
  </section>
);

const PortfolioSection = () => {
  const [page, setPage] = useState(0);
  const itemsPerPage = 3;
  const numPages = Math.ceil(PORTFOLIOS.length / itemsPerPage);
  
  const currentItems = PORTFOLIOS.slice(page * itemsPerPage, (page * itemsPerPage) + itemsPerPage);

  return (
    <section className="py-16 px-6 md:px-12 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto text-center">
        <p className="text-gray-400 text-sm mb-2">Logos, websites, book covers & more!</p>
        <h2 className="text-3xl font-bold text-gray-900 mb-12">
          Checkout The Best <span className="text-blue-500">Portfolios</span> Here
        </h2>

        {/* Slider Container with Fixed Height */}
        <div className="relative h-[320px] mb-8">
           <AnimatePresence mode="wait">
             <motion.div 
                key={page}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-8 absolute w-full"
             >
              {currentItems.map((item, idx) => (
                <motion.div 
                  key={idx}
                  whileHover={{ y: -10 }}
                  className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all text-left group"
                >
                  <div className="relative h-48 w-full bg-gray-200 rounded-lg overflow-hidden mb-4">
                    <Image src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=400" fill alt="Portfolio Work" className="object-cover" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img src={item.img} alt={item.name} className="w-10 h-10 rounded-full object-cover" />
                      <div>
                        <h4 className="font-bold text-gray-800 text-sm">{item.name}</h4>
                        <p className="text-xs text-gray-500">{item.role}</p>
                      </div>
                    </div>
                    <motion.button whileHover={{ x: 5 }} className="text-blue-200 group-hover:text-blue-500 transition-colors"><ArrowRight size={20}/></motion.button>
                  </div>
                </motion.div>
              ))}
             </motion.div>
           </AnimatePresence>
        </div>
        
        {/* Slider dots indicator */}
        <div className="flex justify-center gap-2 mt-6">
           {Array.from({ length: numPages }).map((_, idx) => (
             <motion.button 
                key={idx}
                onClick={() => setPage(idx)}
                whileHover={{ scale: 1.2 }}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300", 
                  idx === page ? "w-8 bg-blue-500" : "w-2 bg-gray-300 hover:bg-blue-300"
                )}
             />
           ))}
        </div>
      </div>
    </section>
  );
};

const Newsletter = () => (
  <section className="py-20 px-6 md:px-12 bg-[#eafbf7]">
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="max-w-4xl mx-auto text-center"
    >
      <h2 className="text-3xl font-bold text-gray-900 mb-4">Newsletter Subscription</h2>
      <p className="text-gray-500 mb-8 text-sm">
        Subscribe to our newsletter to get new freelance work and projects
      </p>
      
      <div className="max-w-md mx-auto bg-white p-1 rounded-full shadow-sm flex pl-4 focus-within:ring-2 ring-blue-200 transition-all">
        <input 
           type="email" 
           placeholder="Enter your email address" 
           className="flex-1 outline-none text-sm text-gray-600 bg-transparent"
        />
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={tapScale}
          className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-2.5 rounded-full text-sm font-medium transition-colors"
        >
          Subscribe
        </motion.button>
      </div>
    </motion.div>
  </section>
);

const Footer = () => (
  <footer className="py-16 px-6 md:px-12 bg-white border-t">
    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-xs">S</div>
          <span className="text-lg font-bold text-gray-700">spacelance</span>
        </div>
        <p className="text-xs text-gray-500 leading-relaxed">
          Powerful freelance marketplace system with ability to change the Users (Freelancers & Clients).
        </p>
        <div className="flex gap-4 text-gray-700">
           <Instagram size={18} className="hover:text-blue-500 cursor-pointer transition-colors"/>
           <Twitter size={18} className="hover:text-blue-500 cursor-pointer transition-colors" />
           <Facebook size={18} className="hover:text-blue-500 cursor-pointer transition-colors"/>
        </div>
      </div>

      <div>
        <h4 className="font-bold text-gray-800 mb-4 text-sm">For Clients</h4>
        <ul className="space-y-2 text-xs text-gray-500">
          <li className="hover:text-blue-500 cursor-pointer transition-colors">Find Freelancers</li>
          <li className="hover:text-blue-500 cursor-pointer transition-colors">Post Project</li>
          <li className="hover:text-blue-500 cursor-pointer transition-colors">Refund Policy</li>
          <li className="hover:text-blue-500 cursor-pointer transition-colors">Privacy Policy</li>
        </ul>
      </div>

      <div>
        <h4 className="font-bold text-gray-800 mb-4 text-sm">For Freelancers</h4>
        <ul className="space-y-2 text-xs text-gray-500">
          <li className="hover:text-blue-500 cursor-pointer transition-colors">Find Work</li>
          <li className="hover:text-blue-500 cursor-pointer transition-colors">Create Account</li>
        </ul>
      </div>

      <div>
        <h4 className="font-bold text-gray-800 mb-4 text-sm">Call Us</h4>
        <ul className="space-y-3 text-xs text-gray-500">
          <li className="flex items-center gap-2">
             <MapPin size={14} className="text-gray-400" /> Kenya
          </li>
          <li className="flex items-center gap-2">
             <Phone size={14} className="text-gray-400" /> +123 456 7890
          </li>
          <li className="flex items-center gap-2">
             <Mail size={14} className="text-gray-400" /> hello@say.com
          </li>
        </ul>
      </div>
    </div>
    
    <div className="max-w-6xl mx-auto mt-12 pt-8 border-t text-center">
       <p className="text-xs text-gray-400">2025 Spacelance. All right reserved</p>
    </div>
  </footer>
);

export default function LandingPage() {
  return (
    <main className="min-h-screen font-sans">
      <Navbar />
      <Hero />
      <Features />
      <FindBest />
      <RecentWorksSection />
      <CategoriesSection />
      <PortfolioSection />
      <Newsletter />
      <Footer />
    </main>
  );
}