export type Milestone = { name: string; description: string; amount: string; date: string; completed: boolean; };
export type Applicant = { id: number; name: string; rating: number; earnings: string; appliedTime: string; about: string; avatar: string; };
export type ClientInfo = { name: string; location: string; rating: number; totalSpent: string; memberSince: string; verified: boolean; industry?: string; jobCount?: number; };
export type ManagerInfo = { name: string; role: string; phone: string; whatsapp: string; avatar: string; };

export type Project = {
  id: number; proposalId?: string | number; title: string; category: string; description: string; 
  budget: string; type: "Fixed" | "Hourly";
  experienceLevel: "Entry" | "Intermediate" | "Expert"; 
  postedTime: string; 
  dateRange: string; proposals: number; 
  status: "Pending" | "Applied" | "Awarded" | "Declined" | "Dispute";
  closed: string | null; rating: number | null; milestones: Milestone[] | null; isBookmarked: boolean;
  appliedDate?: string; declineReason?: string; disputeReason?: string;
  client?: ClientInfo; 
  manager?: ManagerInfo;
  applicants?: Applicant[];
  skills?: string[];
  myBidAmount?: string; 
  bidStatus?: "Pending" | "Accepted" | "Rejected" | "Awarded" | "Declined" | "Withdrawn";
  coverLetter?: string; 
  proposedDuration?: string;
};

export const MOCK_APPLICANTS: Applicant[] = [
  { id: 101, name: "Sarah J.", rating: 4.9, earnings: "$45k+", appliedTime: "2 hours ago", about: "Expert UI/UX designer...", avatar: "SJ" },
];

export const DEFAULT_MANAGER: ManagerInfo = {
  name: "Sophia Williams",
  role: "Senior Project Manager",
  phone: "+1 (555) 123-4567",
  whatsapp: "+1 (555) 987-6543",
  avatar: "https://randomuser.me/api/portraits/women/44.jpg"
};

// export const INITIAL_PROJECTS: Project[] = [
//   { 
//     id: 1, 
//     title: "Cab App UI/UX Design for iOS - Luxury Travel", 
//     category: "Design", 
//     type: "Fixed",
//     experienceLevel: "Expert",
//     postedTime: "5 hours ago",
//     description: "I will design UI UX for mobile app with figma for ios. Adarsh Group is venturing into homes Inspired by the millennial generation. We need a clean, modern interface that rivals Uber and Lyft but focuses on luxury travel. The design must be pixel perfect and ready for development.", 
//     budget: "$4,500", 
//     dateRange: "22 Jan - 22 Feb", 
//     proposals: 12, 
//     status: "Pending", 
//     closed: null, rating: null, milestones: null, isBookmarked: false,
//     skills: ["Figma", "Mobile Design", "Prototyping", "iOS", "Auto Layout"],
//     client: { name: "Adarsh Group", location: "New York, USA", rating: 4.9, totalSpent: "$150k+", memberSince: "2018", verified: true, jobCount: 12, industry: "Technology" },
//     applicants: MOCK_APPLICANTS,
//     manager: DEFAULT_MANAGER
//   },
//   { 
//     id: 2, 
//     title: "E-Commerce Shopify Redesign - Conversion Focused", 
//     category: "Web Development", 
//     type: "Hourly",
//     experienceLevel: "Intermediate",
//     postedTime: "12 minutes ago",
//     description: "Looking for an expert to redesign our Shopify store. Need modern aesthetic and improved conversion funnel. The current theme is slow and unresponsive. We need someone who understands Liquid and React.", 
//     budget: "$45/hr", 
//     dateRange: "15 Mar - 30 Apr", 
//     proposals: 8, 
//     status: "Pending", 
//     closed: null, rating: null, milestones: null, isBookmarked: true,
//     skills: ["Shopify", "React", "Liquid", "CSS"],
//     client: { name: "TrendSetter Clothing", location: "London, UK", rating: 4.5, totalSpent: "$20k+", memberSince: "2021", verified: true, jobCount: 5, industry: "Retail" },
//     applicants: MOCK_APPLICANTS,
//     manager: DEFAULT_MANAGER
//   },
//   { 
//     id: 3, 
//     title: "CAB APP DEVELOPMENT", 
//     category: "Mobile Dev", 
//     type: "Fixed", 
//     experienceLevel: "Expert",
//     postedTime: "2 days ago",
//     description: "I will design UI UX for mobile app with figma for ios Adarsh Group is venturing into homes Inspired by the millennial generation- Adarsh Greens...", 
//     budget: "$4,500", 
//     dateRange: "22-01-22 to 22-01-22", 
//     proposals: 12, 
//     status: "Applied", 
//     closed: null, rating: null, milestones: null, isBookmarked: false, 
//     appliedDate: "Oct 12, 2023",
//     myBidAmount: "$137.00", 
//     bidStatus: "Pending",
//     manager: { ...DEFAULT_MANAGER, name: "David Chen", avatar: "https://randomuser.me/api/portraits/men/32.jpg" }
//   },
//   { 
//     id: 4, 
//     title: "Real Estate Portal App", 
//     category: "Mobile Dev", 
//     type: "Fixed", 
//     experienceLevel: "Expert", 
//     postedTime: "1 month ago", 
//     description: "Full stack development for a property listing app. Geolocation and Maps integration.", 
//     budget: "$8,000", 
//     dateRange: "Completed", 
//     proposals: 12, 
//     status: "Awarded", 
//     closed: "12 May 2025", 
//     rating: 5, 
//     isBookmarked: false, 
//     milestones: [
//       { name: "UI/UX Design", description: "Figma Designs Approved", amount: "$2,000", date: "30 June", completed: true },
//       { name: "Frontend Dev", description: "React Native Screens", amount: "$3,000", date: "31 July", completed: true },
//       { name: "Backend & API", description: "Node.js & MongoDB", amount: "$3,000", date: "Pending", completed: false }
//     ],
//     client: { name: "RealtyTech", location: "Austin, TX", rating: 5.0, totalSpent: "$50k+", memberSince: "2020", verified: true, jobCount: 3, industry: "Real Estate" },
//     manager: DEFAULT_MANAGER
//   },
//   { id: 5, title: "Crypto Wallet Integration", category: "Web Development", type: "Fixed", experienceLevel: "Expert", postedTime: "2 weeks ago", description: "Need a developer to integrate MetaMask.", budget: "$3,000", dateRange: "Flexible", proposals: 50, status: "Declined", closed: null, rating: null, milestones: null, isBookmarked: false, appliedDate: "Sept 10, 2023", declineReason: "Client required a developer located in EST timezone only.", manager: DEFAULT_MANAGER },
//   { id: 6, title: "Corporate Landing Page", category: "Web Development", type: "Fixed", experienceLevel: "Entry", postedTime: "3 days ago", description: "Build a 5-page corporate website.", budget: "$800", dateRange: "Urgent", proposals: 5, status: "Dispute", closed: null, rating: null, milestones: null, isBookmarked: false, disputeReason: "Client is claiming the work does not match the provided Figma design.", manager: DEFAULT_MANAGER },
// ];