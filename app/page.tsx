import { Metadata } from "next";
import LandingPageClient from "./landingPageClient";

export const metadata: Metadata = {
  title: "Hero Freelancers | Find Top Freelancers & Best Projects",
  description:
    "Hire expert freelancers or find high-paying projects easily on Hero Freelancers. Simple, secure, and built for modern businesses & talented professionals.",
  keywords: [
    "hero freelancers",
    "freelancing website",
    "hire freelancers",
    "find projects",
    "remote work",
    "online jobs",
    "best freelancers",
    "post project",
    "IT freelancers",
    "India freelancing platform",
  ],
  openGraph: {
    title: "Hero Freelancers – Where Clients & Professionals Connect",
    description:
      "Join the future of freelancing — hire top talent or get hired for exclusive projects!",
    url: "https://herofreelancers.com/",
    siteName: "Hero Freelancers",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hero Freelancers | Freelance Marketplace",
    description:
      "Hire the best freelancers or find premium projects. Join Hero Freelancers now!",
  },
  robots: {
    index: true,
    follow: true,
  },
};

// --- Components ---

// const Hero = () => (
//   <section className="relative w-full bg-[#f2f9ff] py-16 px-6 md:px-12 flex flex-col md:flex-row items-center gap-12 overflow-hidden">
//     {/* Text Content */}
//     <motion.div
//       variants={staggerContainer}
//       initial="hidden"
//       animate="visible"
//       className="flex-1 z-10 space-y-6 md:pl-20 text-center md:text-left mt-10 md:mt-0"
//     >
//       <motion.h1 variants={fadeInUp} className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight">
//         Are you looking for <br /> Freelancers?
//       </motion.h1>
//       <motion.p variants={fadeInUp} className="text-gray-500 text-lg mx-auto md:mx-0 max-w-lg">
//         Hire Great Freelancers, Fast. Spacelance helps you hire elite freelancers at a moment's notice.
//       </motion.p>

//       <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto md:mx-0">
//         <motion.button
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.95 }}
//           className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-md font-medium transition-colors shadow-lg shadow-blue-300/50"
//         >
//           Hire a Freelancer
//         </motion.button>
//         <div className="relative flex-1">
//           <input
//             type="text"
//             placeholder="search freelance work"
//             className="w-full h-full px-4 py-3 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all"
//           />
//           <motion.button
//             whileHover={{ scale: 1.1 }}
//             className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-500 p-2 rounded-md text-white"
//           >
//             <Search size={16} />
//           </motion.button>
//         </div>
//       </motion.div>
//     </motion.div>

//     {/* Illustration Area */}
//     <div className="flex-1 relative w-full h-[350px] md:h-[500px] flex items-center justify-center">
//       {/* Decorative Blob with Motion */}
//       <motion.div
//         animate={{
//           scale: [1, 1.1, 1],
//           rotate: [0, 5, -5, 0]
//         }}
//         transition={{
//           duration: 10,
//           repeat: Infinity,
//           ease: "easeInOut" as const
//         }}
//         className="absolute top-10 right-10 w-[280px] h-[280px] md:w-[400px] md:h-[400px] bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
//       ></motion.div>

//       {/* Main Hero Image - Floating Effect */}
//       <motion.div
//         initial={{ opacity: 0, x: 50 }}
//         animate={{ opacity: 1, x: 0 }}
//         transition={{ duration: 0.8 }}
//         className="relative w-full max-w-xs md:max-w-lg"
//       >
//         <motion.div
//           animate={{ y: [-10, 10, -10] }}
//           transition={{
//             repeat: Infinity,
//             duration: 4,
//             ease: "easeInOut" as const
//           }}
//         >
//           <img
//             src="/images/landingpage/freelancer-illustration.png"
//             alt="Freelancer Illustration"
//             className="w-full h-auto object-contain -scale-x-100"
//           />
//         </motion.div>
//       </motion.div>
//     </div>
//   </section>
// );

// const Features = () => (
//   <section className="py-16 px-6 md:px-12 bg-white">
//     <motion.div
//       variants={staggerContainer}
//       initial="hidden"
//       whileInView="visible"
//       viewport={{ once: true, amount: 0.3 }}
//       className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center max-w-6xl mx-auto"
//     >
//       {[
//         { icon: User, title: "Create Account", desc: "First you have to create a account here." },
//         { icon: FileText, title: "Search work", desc: "Search the best freelance work here" },
//         { icon: Save, title: "Save and apply", desc: "Apply or save and start your work" }
//       ].map((feature, index) => (
//         <motion.div
//           key={index}
//           variants={fadeInUp}
//           whileHover={{ y: -10 }}
//           className="flex flex-col items-center gap-3 group p-6 rounded-xl hover:shadow-lg transition-all cursor-pointer bg-white"
//         >
//           <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 mb-2 group-hover:bg-blue-500 group-hover:text-white transition-colors duration-300">
//             <feature.icon size={32} />
//           </div>
//           <h3 className="text-lg font-bold text-gray-800">{feature.title}</h3>
//           <p className="text-sm text-gray-500">{feature.desc}</p>
//         </motion.div>
//       ))}
//     </motion.div>
//   </section>
// );

// const FindBest = () => (
//   <section className="py-20 px-6 md:px-12 bg-white overflow-hidden">
//     <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16">
//       {/* Left Image Side */}
//       <motion.div
//         initial={{ opacity: 0, x: -50 }}
//         whileInView={{ opacity: 1, x: 0 }}
//         transition={{ duration: 0.8 }}
//         viewport={{ once: true }}
//         className="relative flex-1 flex justify-center w-full"
//       >
//         <div className="relative w-full max-w-[350px] md:max-w-[450px] h-[350px] md:h-[400px]">
//           {/* Main Photo */}
//           <img
//             src="images/landingpage/professional-woman.png"
//             alt="Professional Woman"
//             className="w-full h-full object-cover -scale-x-100 rounded-lg md:rounded-none"
//           />

//           {/* Floating Stats Card 1 */}
//           <motion.div
//             animate={{ y: [0, -10, 0] }}
//             transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" as const, delay: 0.5 }}
//             className="absolute top-4 right-2 md:top-8 md:right-[80px] bg-white p-3 md:p-4 rounded-xl shadow-lg flex items-center gap-3 z-10"
//           >
//             <div className="bg-blue-100 p-2 rounded-full text-blue-600 font-bold text-sm md:text-lg">500+</div>
//             <div>
//               <p className="text-xs md:text-base text-gray-400">Freelancers</p>
//             </div>
//           </motion.div>

//           {/* Floating Stats Card 2 */}
//           <motion.div
//             animate={{ y: [0, -12, 0] }}
//             transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" as const }}
//             className="absolute bottom-4 right-2 md:bottom-[150px] md:-right-12 bg-white p-3 md:p-4 rounded-xl shadow-lg flex items-center gap-3 z-10"
//           >
//             <div className="bg-orange-100 p-2 rounded-full text-orange-600 font-bold text-sm md:text-lg">300+</div>
//             <div>
//               <p className="text-xs md:text-base text-gray-400">Works posted</p>
//             </div>
//           </motion.div>
//         </div>
//       </motion.div>

//       {/* Right Text Side */}
//       <motion.div
//         initial={{ opacity: 0, x: 50 }}
//         whileInView={{ opacity: 1, x: 0 }}
//         transition={{ duration: 0.8 }}
//         viewport={{ once: true }}
//         className="flex-1 space-y-6 text-center md:text-right"
//       >
//         <h2 className="text-4xl md:text-6xl font-bold text-gray-900">
//           Find The Best <br />
//           <span className="text-blue-500">Freelancers</span> Here
//         </h2>
//         <p className="text-gray-500 leading-relaxed">
//           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut erat bibendum ornare urna, cursus eget convallis feugiat imperdiet posuere justo suspendisse.
//         </p>
//         <p className="text-gray-500 leading-relaxed">
//           Dolor sit amet, consectetur adipiscing elit. Ut erat bibendum ornare urna, cursus eget convallis feugiat imperdiet posuere justo.
//         </p>
//       </motion.div>
//     </div>
//   </section>
// );

// const RecentWorksSection = () => {
//   const [page, setPage] = useState(0);
//   const [direction, setDirection] = useState(0);
//   const itemsPerPage = 3;
//   const numPages = Math.ceil(RECENT_WORKS.length / itemsPerPage);

//   const paginate = (newDirection: number) => {
//     setDirection(newDirection);
//     setPage((prev) => {
//       let next = prev + newDirection;
//       if (next < 0) return numPages - 1;
//       if (next >= numPages) return 0;
//       return next;
//     });
//   };

//   const currentItems = RECENT_WORKS.slice(page * itemsPerPage, (page * itemsPerPage) + itemsPerPage);

//   return (
//     <section className="py-16 px-6 md:px-12 bg-gray-50 overflow-hidden">
//       <div className="max-w-6xl mx-auto">
//         <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4 md:gap-0">
//           <div className="text-center md:text-left w-full md:w-auto">
//             <p className="text-gray-400 text-sm mb-2">The latest freelance work!</p>
//             <h2 className="text-3xl font-bold text-gray-900">Recently Posted <span className="text-blue-500">Works</span></h2>
//           </div>
//           <div className="flex gap-2 mx-auto md:mx-0">
//             <motion.button
//               whileTap={tapScale}
//               onClick={() => paginate(-1)}
//               className="p-2 rounded-full bg-white text-blue-500 shadow-sm hover:bg-blue-50 z-10"
//             >
//               <ChevronLeft size={20} />
//             </motion.button>
//             <motion.button
//               whileTap={tapScale}
//               onClick={() => paginate(1)}
//               className="p-2 rounded-full bg-blue-500 text-white shadow-sm hover:bg-blue-600 z-10"
//             >
//               <ChevronRight size={20} />
//             </motion.button>
//           </div>
//         </div>

//         {/* Animated Grid Container - Mobile Height Adjusted to fit stacked items */}
//         <div className="relative h-[920px] md:h-[280px]">
//           <AnimatePresence initial={false} custom={direction}>
//             <motion.div
//               key={page}
//               custom={direction}
//               variants={slideVariants}
//               initial="enter"
//               animate="center"
//               exit="exit"
//               transition={{
//                 x: { type: "spring", stiffness: 300, damping: 30 },
//                 opacity: { duration: 0.2 }
//               }}
//               className="absolute w-full grid grid-cols-1 md:grid-cols-3 gap-6"
//             >
//               {currentItems.map((work, idx) => (
//                 <motion.div
//                   key={idx}
//                   whileHover={{ y: -5, boxShadow: "0 10px 30px -10px rgba(0,0,0,0.1)" }}
//                   className="bg-white p-6 rounded-xl shadow-sm transition-all flex flex-col items-center text-center border border-gray-100 h-[280px]"
//                 >
//                   <div className={cn("w-14 h-14 rounded-full flex items-center justify-center mb-4", work.color)}>
//                     {work.icon}
//                   </div>
//                   <h3 className="font-bold text-lg text-gray-800 mb-2">{work.title}</h3>
//                   <p className="text-gray-500 text-sm mb-6 line-clamp-3">{work.desc}</p>
//                   <div className="w-full flex justify-between items-center mt-auto border-t pt-4">
//                     <div className="text-left">
//                       <p className="text-xs text-gray-400">Highest bid</p>
//                       <p className="font-bold text-gray-800">{work.bid}</p>
//                     </div>
//                     <button className="text-blue-500 text-sm font-semibold hover:underline">Apply now</button>
//                   </div>
//                 </motion.div>
//               ))}
//             </motion.div>
//           </AnimatePresence>
//         </div>
//       </div>
//     </section>
//   );
// };

// const CategoriesSection = () => (
//   <section className="py-20 px-6 md:px-12 bg-white">
//     <div className="max-w-6xl mx-auto text-center">
//       <h2 className="text-3xl font-bold text-gray-900 mb-12">
//         Choose Different <span className="text-blue-500">Category</span>
//       </h2>

//       <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
//         {CATEGORIES.map((cat, idx) => (
//           <motion.div
//             key={idx}
//             initial={{ opacity: 0, scale: 0.9 }}
//             whileInView={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 0.5, delay: idx * 0.05 }}
//             viewport={{ once: true }}
//             className="relative group overflow-hidden rounded-xl h-40 cursor-pointer"
//           >
//             <Image
//               src={cat.img}
//               alt={cat.name}
//               fill
//               className="object-cover group-hover:scale-110 transition-transform duration-500"
//             />
//             <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors flex items-center justify-center">
//               <span className="text-white font-semibold text-sm md:text-base">{cat.name}</span>
//             </div>
//           </motion.div>
//         ))}
//       </div>

//       <motion.button
//         whileHover={hoverScale}
//         whileTap={tapScale}
//         className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-md font-medium transition-colors"
//       >
//         More Categories
//       </motion.button>
//     </div>
//   </section>
// );

// const PortfolioSection = () => {
//   const [page, setPage] = useState(0);
//   const itemsPerPage = 3;
//   const numPages = Math.ceil(PORTFOLIOS.length / itemsPerPage);

//   const currentItems = PORTFOLIOS.slice(page * itemsPerPage, (page * itemsPerPage) + itemsPerPage);

//   return (
//     <section className="py-16 px-6 md:px-12 bg-white overflow-hidden">
//       <div className="max-w-6xl mx-auto text-center">
//         <p className="text-gray-400 text-sm mb-2">Logos, websites, book covers & more!</p>
//         <h2 className="text-3xl font-bold text-gray-900 mb-12">
//           Checkout The Best <span className="text-blue-500">Portfolios</span> Here
//         </h2>

//         {/* Slider Container with Responsive Height for stacked items on mobile */}
//         <div className="relative h-[820px] md:h-[320px] mb-8">
//           <AnimatePresence mode="wait">
//             <motion.div
//               key={page}
//               initial={{ opacity: 0, x: 20 }}
//               animate={{ opacity: 1, x: 0 }}
//               exit={{ opacity: 0, x: -20 }}
//               transition={{ duration: 0.3 }}
//               className="grid grid-cols-1 md:grid-cols-3 gap-8 absolute w-full"
//             >
//               {currentItems.map((item, idx) => (
//                 <motion.div
//                   key={idx}
//                   whileHover={{ y: -10 }}
//                   className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all text-left group"
//                 >
//                   <div className="relative h-48 w-full bg-gray-200 rounded-lg overflow-hidden mb-4">
//                     <Image src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=400" fill alt="Portfolio Work" className="object-cover" />
//                   </div>
//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center gap-3">
//                       <img src={item.img} alt={item.name} className="w-10 h-10 rounded-full object-cover" />
//                       <div>
//                         <h4 className="font-bold text-gray-800 text-sm">{item.name}</h4>
//                         <p className="text-xs text-gray-500">{item.role}</p>
//                       </div>
//                     </div>
//                     <motion.button whileHover={{ x: 5 }} className="text-blue-200 group-hover:text-blue-500 transition-colors"><ArrowRight size={20} /></motion.button>
//                   </div>
//                 </motion.div>
//               ))}
//             </motion.div>
//           </AnimatePresence>
//         </div>

//         {/* Slider dots indicator */}
//         <div className="flex justify-center gap-2 mt-6">
//           {Array.from({ length: numPages }).map((_, idx) => (
//             <motion.button
//               key={idx}
//               onClick={() => setPage(idx)}
//               whileHover={{ scale: 1.2 }}
//               className={cn(
//                 "h-1.5 rounded-full transition-all duration-300",
//                 idx === page ? "w-8 bg-blue-500" : "w-2 bg-gray-300 hover:bg-blue-300"
//               )}
//             />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// const Newsletter = () => (
//   <section className="py-20 px-6 md:px-12 bg-[#eafbf7]">
//     <motion.div
//       initial={{ opacity: 0, scale: 0.9 }}
//       whileInView={{ opacity: 1, scale: 1 }}
//       transition={{ duration: 0.5 }}
//       viewport={{ once: true }}
//       className="max-w-4xl mx-auto text-center"
//     >
//       <h2 className="text-3xl font-bold text-gray-900 mb-4">Newsletter Subscription</h2>
//       <p className="text-gray-500 mb-8 text-sm">
//         Subscribe to our newsletter to get new freelance work and projects
//       </p>

//       <div className="max-w-md mx-auto bg-white p-2 md:p-1 rounded-2xl md:rounded-full shadow-sm flex flex-col sm:flex-row pl-2 md:pl-4 focus-within:ring-2 ring-blue-200 transition-all gap-2 sm:gap-0">
//         <input
//           type="email"
//           placeholder="Enter your email address"
//           className="flex-1 outline-none text-sm text-gray-600 bg-transparent py-2 sm:py-0 px-2 sm:px-0"
//         />
//         <motion.button
//           whileHover={{ scale: 1.05 }}
//           whileTap={tapScale}
//           className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-2.5 rounded-xl md:rounded-full text-sm font-medium transition-colors w-full sm:w-auto"
//         >
//           Subscribe
//         </motion.button>
//       </div>
//     </motion.div>
//   </section>
// );

// const Footer = () => (
//   <footer className="py-16 px-6 md:px-12 bg-white border-t">
//     <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 text-center md:text-left">
//       <div className="space-y-4 flex flex-col items-center md:items-start">
//         <div className="flex items-center gap-2">
//           <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-xs">S</div>
//           <span className="text-lg font-bold text-gray-700">spacelance</span>
//         </div>
//         <p className="text-xs text-gray-500 leading-relaxed max-w-xs md:max-w-none">
//           Powerful freelance marketplace system with ability to change the Users (Freelancers & Clients).
//         </p>
//         <div className="flex gap-4 text-gray-700">
//           <Instagram size={18} className="hover:text-blue-500 cursor-pointer transition-colors" />
//           <Twitter size={18} className="hover:text-blue-500 cursor-pointer transition-colors" />
//           <Facebook size={18} className="hover:text-blue-500 cursor-pointer transition-colors" />
//         </div>
//       </div>

//       <div>
//         <h4 className="font-bold text-gray-800 mb-4 text-sm">For Clients</h4>
//         <ul className="space-y-2 text-xs text-gray-500">
//           <li className="hover:text-blue-500 cursor-pointer transition-colors">Find Freelancers</li>
//           <li className="hover:text-blue-500 cursor-pointer transition-colors">Post Project</li>
//           <li className="hover:text-blue-500 cursor-pointer transition-colors">Refund Policy</li>
//           <li className="hover:text-blue-500 cursor-pointer transition-colors">Privacy Policy</li>
//         </ul>
//       </div>

//       <div>
//         <h4 className="font-bold text-gray-800 mb-4 text-sm">For Freelancers</h4>
//         <ul className="space-y-2 text-xs text-gray-500">
//           <li className="hover:text-blue-500 cursor-pointer transition-colors">Find Work</li>
//           <li className="hover:text-blue-500 cursor-pointer transition-colors">Create Account</li>
//         </ul>
//       </div>

//       <div>
//         <h4 className="font-bold text-gray-800 mb-4 text-sm">Call Us</h4>
//         <ul className="space-y-3 text-xs text-gray-500 flex flex-col items-center md:items-start">
//           <li className="flex items-center gap-2">
//             <MapPin size={14} className="text-gray-400" /> Kenya
//           </li>
//           <li className="flex items-center gap-2">
//             <Phone size={14} className="text-gray-400" /> +123 456 7890
//           </li>
//           <li className="flex items-center gap-2">
//             <Mail size={14} className="text-gray-400" /> hello@say.com
//           </li>
//         </ul>
//       </div>
//     </div>

//     <div className="max-w-6xl mx-auto mt-12 pt-8 border-t text-center">
//       <p className="text-xs text-gray-400">2025 Spacelance. All right reserved</p>
//     </div>
//   </footer>
// );

export default function LandingPage() {
  return (

    <LandingPageClient />
    // <main className="min-h-screen font-sans">
    
    //   <Hero />
    //   <Features />
    //   <FindBest />
    //   <RecentWorksSection />
    //   <CategoriesSection />
    //   <PortfolioSection />
    //   <Newsletter />
    //   <Footer />
    // </main>
  );
}