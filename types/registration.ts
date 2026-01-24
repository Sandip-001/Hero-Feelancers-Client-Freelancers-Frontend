// ==================== TYPES ====================
export interface RegistrationFormData {
  fullName: string;
  email: string;
  phone: string;
  whatsapp: string;
  address: string;
  password: string;
  confirmPassword: string;
  companyName?: string;
  designation?: string;
  projectType?: string;
  resume?: File | null;
  skills: string[];
  experienceLevel?: string;
  portfolioUrl?: string;
}

export interface FormErrors {
  [key: string]: string;
}

export interface PasswordStrength {
  score: number;
  label: string;
  color: string;
}
