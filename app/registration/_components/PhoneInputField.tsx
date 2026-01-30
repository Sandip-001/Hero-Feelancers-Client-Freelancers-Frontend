"use client";

import React from "react";
import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

interface Props {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  icon?: any;
  placeholder: string;
  required?: boolean;
  defaultCountry?: any;
}

const PhoneInputField = ({
  label,
  value,
  onChange,
  error,
  icon: Icon,
  placeholder,
  required = false,
  defaultCountry = "IN",
}: Props) => {
  return (
    <div>
      {/* LABEL */}
      <label className="block text-sm font-medium mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      {/* INPUT WRAPPER */}
      <div className="relative">
        {/* ICON */}
        {Icon && (
          <Icon
            className="absolute top-1/2 -translate-y-1/2 left-3 text-gray-400 z-10"
            size={18}
          />
        )}

        {/* PHONE INPUT */}
        <PhoneInput
          international
          defaultCountry={defaultCountry}
          value={value}
          onChange={(val) => onChange(val || "")}
          placeholder={placeholder}
          className={`w-full ${
            Icon ? "pl-10" : ""
          } pr-4 py-3 border-2 rounded-lg focus-within:outline-none focus-within:ring-2 focus-within:ring-amber-400 transition ${
            error
              ? "border-red-500 bg-red-50"
              : "border-amber-200 bg-white" 
          }`}
        />
      </div>

      {/* ERROR */}
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
};

export default PhoneInputField;