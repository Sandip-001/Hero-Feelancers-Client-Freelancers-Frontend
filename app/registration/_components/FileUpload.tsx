"use client"
import React, { ChangeEvent } from 'react';
import { motion } from 'framer-motion';
import { 
  Upload, 
  AlertCircle, FileText, X} from 'lucide-react';



// ==================== FILE UPLOAD COMPONENT ====================
const FileUpload = ({ 
  file, 
  onChange, 
  error,
  fileInputRef 
}: {
  file: File | null | undefined;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  fileInputRef: React.RefObject<HTMLInputElement>;
}) => (
  <div>
    <label className="block text-sm font-medium mb-2">
      Resume <span className="text-red-500">*</span>
    </label>
    <input
      ref={fileInputRef}
      type="file"
      onChange={onChange}
      accept=".pdf,.doc,.docx"
      className="hidden"
    />
    <div
      onClick={() => fileInputRef.current?.click()}
      className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all ${
        error ? 'border-red-500 bg-red-50' : 'border-amber-200 hover:border-blue-500 hover:bg-blue-50'
      }`}
    >
      {file ? (
        <div className="flex items-center justify-center gap-3">
          <FileText className="text-blue-600" size={24} />
          <div className="text-left">
            <p className="text-sm font-medium text-gray-900">{file.name}</p>
            <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(2)} KB</p>
          </div>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              if (fileInputRef.current) fileInputRef.current.value = '';
            }}
            className="p-1 hover:bg-gray-200 rounded-full transition"
          >
            <X size={16} className="text-gray-500" />
          </button>
        </div>
      ) : (
        <div>
          <Upload className="mx-auto mb-2 text-gray-400" size={32} />
          <p className="text-sm font-medium text-gray-700">Click to upload resume</p>
          <p className="text-xs text-gray-500 mt-1">PDF or Word (Max 2MB)</p>
        </div>
      )}
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

export default FileUpload;