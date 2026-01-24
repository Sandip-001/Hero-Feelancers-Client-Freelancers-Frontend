export interface ClientRegisterPayload {
  fullName: string;
  email: string;
  phone: string;
  whatsapp?: string;
  address: string;
  companyName: string;
  companyRole?: string;
  projectType: string;
  password: string;
}

export interface FreelancerRegisterPayload {
  fullName: string;
  email: string;
  phone: string;
  whatsapp?: string;
  address: string;
  experienceLevel: string;
  skills: string[];
  portfolioUrl?: string;
  resume: File;
  password: string;
}

export interface VerifyOtpPayload {
  email: string;
  otp: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}