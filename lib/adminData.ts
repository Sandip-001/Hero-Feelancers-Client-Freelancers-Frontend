
export type Status = 'active' | 'completed' | 'pending' | 'disputed';
export type TaskStatus = 'todo' | 'inprogress' | 'done';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'rm' | 'freelancer' | 'client';
  avatar?: string;
}

export interface Task {
  id: string;
  title: string;
  assignee: string; // Could be User ID in real app
  status: TaskStatus;
}

export interface Project {
  id: string;
  title: string;
  client: string;
  budget: string; // Stored as string for display like "₹1,20,000"
  deadline: string;
  rmId: string | null; // Relationship Manager ID
  progress: number; // 0 to 100
  status: Status;
  tasks: Task[];
  description?: string;
}

// --- Mock Data (Based on your HTML) ---

export const MOCK_RMS: User[] = [
  { id: 'RM1', name: 'Asha Mehra', email: 'asha@wearelove.global', role: 'rm' },
  { id: 'RM2', name: 'Samuel Lee', email: 'samuel@wearelove.global', role: 'rm' },
  { id: 'RM3', name: 'Deepa Iyer', email: 'deepa@wearelove.global', role: 'rm' },
];

export const MOCK_PROJECTS: Project[] = [
  {
    id: 'P-1001',
    title: 'E-commerce Store Design',
    client: 'SoulWear Fashion',
    budget: '₹1,20,000',
    deadline: '2025-11-10',
    rmId: 'RM1',
    progress: 48,
    status: 'active',
    tasks: [
      { id: 'T1', title: 'Homepage design', assignee: 'Designer Raj', status: 'todo' },
      { id: 'T2', title: 'Product CMS setup', assignee: 'Priya', status: 'inprogress' },
    ],
  },
  {
    id: 'P-1002',
    title: 'Spiritual Blog & Resources',
    client: 'WeAreLove',
    budget: '₹60,000',
    deadline: '2025-11-01',
    rmId: 'RM2',
    progress: 72,
    status: 'active',
    tasks: [],
  },
  {
    id: 'P-1003',
    title: 'HeroFreelancer MVP',
    client: 'Internal',
    budget: '₹2,50,000',
    deadline: '2025-12-20',
    rmId: null, // Unassigned
    progress: 10,
    status: 'pending',
    tasks: [],
  },
];