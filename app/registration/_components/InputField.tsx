"use client";
import React, { ChangeEvent } from "react";
import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";

// ==================== INPUT FIELD COMPONENT ====================
const InputField = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  error,
  icon: Icon,
  placeholder,
  required = false,
  maxLength,
  rows,
}: {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  error?: string;
  icon?: any;
  placeholder: string;
  required?: boolean;
  maxLength?: number;
  rows?: number;
}) => {
  const isTextarea = rows !== undefined;
  const InputComponent = isTextarea ? "textarea" : "input";

  return (
    <div>
      <label className="block text-sm font-medium mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        {Icon && (
          <Icon
            className={`absolute ${
              isTextarea ? "top-3" : "top-1/2 -translate-y-1/2"
            } left-3 text-gray-400`}
            size={18}
          />
        )}
        <InputComponent
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          maxLength={maxLength}
          rows={rows}
          className={`w-full ${
            Icon ? "pl-10" : ""
          } border-2 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2  focus-within:ring-amber-400 transition ${
            error ? "border-red-500 bg-red-50" : "border-amber-200 bg-white"
          } ${isTextarea ? "resize-none" : ""}`}
          placeholder={placeholder}
        />
      </div>
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

export default InputField;
