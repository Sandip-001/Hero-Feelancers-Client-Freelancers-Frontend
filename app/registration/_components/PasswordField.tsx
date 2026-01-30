"use client"
import React, { ChangeEvent } from 'react';
import { motion } from 'framer-motion';
import { 
  Lock, 
  AlertCircle, Eye, EyeOff} from 'lucide-react';
import { PasswordStrength } from '@/types/registration';


// ==================== PASSWORD FIELD COMPONENT ====================
const PasswordField = ({ 
  label, 
  name, 
  value, 
  onChange, 
  error,
  showPassword,
  toggleShow,
  showStrength = false,
  strength
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  showPassword: boolean;
  toggleShow: () => void;
  showStrength?: boolean;
  strength?: PasswordStrength;
}) => (
  <div>
    <label className="block text-sm font-medium mb-2">
      {label} <span className="text-red-500">*</span>
    </label>
    <div className="relative">
      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
      <input
        type={showPassword ? 'text' : 'password'}
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full pl-10 pr-12 py-3 border-2 rounded-lg focus:outline-none focus:ring-2  focus-within:ring-amber-400 transition ${
          error ? 'border-red-500 bg-red-50' : 'border-amber-200 bg-white'
        }`}
        placeholder="••••••••"
      />
      <button
        type="button"
        onClick={toggleShow}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
      >
        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
      </button>
    </div>
    {showStrength && value && strength && (
      <div className="mt-2">
        <div className="flex items-center justify-between text-xs mb-1">
          <span className="text-gray-600">Password strength</span>
          <span className={`font-medium ${
            strength.label === 'Strong' ? 'text-green-600' : 
            strength.label === 'Medium' ? 'text-yellow-600' : 'text-red-600'
          }`}>
            {strength.label}
          </span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <motion.div 
            className={`h-full ${strength.color}`}
            initial={{ width: 0 }}
            animate={{ width: `${(strength.score / 5) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>
    )}
    {error && (
      <motion.p 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-red-500 text-xs mt-1 flex items-center gap-1"
      >
        <AlertCircle size={12} /> {error}
      </motion.p>
    )}
  </div>
);

export default PasswordField;