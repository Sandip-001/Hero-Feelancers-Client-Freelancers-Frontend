"use client";

import React, { useState, KeyboardEvent } from "react";
import { motion } from "framer-motion";
import { AlertCircle, X } from "lucide-react";

const SkillsSelector = ({
  selectedSkills,
  onToggle,
  error,
  skillsList,
  isOtherSkill,
  setIsOtherSkill,
}: {
  selectedSkills: string[];
  onToggle: (skill: string) => void;
  error?: string;
  skillsList: string[];
  isOtherSkill: boolean;
  setIsOtherSkill: (v: boolean) => void;
}) => {
  const [customSkill, setCustomSkill] = useState("");
  const [customError, setCustomError] = useState("");

  // 👉 Custom skills = selectedSkills - predefined skills - "other"
  const customSkills = selectedSkills.filter(
    (skill) => !skillsList.includes(skill) && skill.toLowerCase() !== "other"
  );

  const handleAddCustomSkill = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;

    e.preventDefault();
    const skill = customSkill.trim();

    if (!skill) return;

    // 🔴 Already added
    if (selectedSkills.some((s) => s.toLowerCase() === skill.toLowerCase())) {
      setCustomError("Skill already added");
      return;
    }

    // 🔴 Exists in predefined list
    if (
      skillsList
        .filter((s) => s !== "other")
        .some((s) => s.toLowerCase() === skill.toLowerCase())
    ) {
      setCustomError(
        "Please choose this skill from the skills list. It is already available."
      );
      return;
    }

    // ✅ Add custom skill
    onToggle(skill);
    setCustomSkill("");
    setCustomError("");
  };

  return (
    <div>
      <label className="block text-sm font-medium mb-2">
        Skills <span className="text-red-500">*</span>
      </label>

      {/* ================= PREDEFINED SKILLS ================= */}
      <div className="flex flex-wrap gap-2 p-4 border-2 border-amber-200 rounded-lg bg-white">
        {skillsList.map((skill) => (
          <motion.button
            key={skill}
            type="button"
            onClick={() => {
              if (skill.toLowerCase() === "other") {
                setIsOtherSkill(!isOtherSkill);
                return;
              }

              onToggle(skill);
              setCustomError("");
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              skill.toLowerCase() === "other"
                ? isOtherSkill
                  ? "bg-gradient-to-r from-yellow-500 to-yellow-600 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                : selectedSkills.includes(skill)
                ? "bg-gradient-to-r from-yellow-500 to-yellow-600 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {skill}
          </motion.button>
        ))}
      </div>

      {/* ================= CUSTOM SKILLS ================= */}
      {customSkills.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {customSkills.map((skill) => (
            <motion.div
              key={skill}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-white text-sm font-medium"
            >
              {skill}
              <button
                type="button"
                onClick={() => onToggle(skill)}
                className="hover:text-red-200"
              >
                <X size={14} />
              </button>
            </motion.div>
          ))}
        </div>
      )}

      {/* ================= OTHER INPUT ================= */}
      {isOtherSkill && (
        <div className="mt-4">
          <input
            type="text"
            value={customSkill}
            onChange={(e) => {
              setCustomSkill(e.target.value);
              setCustomError("");
            }}
            onKeyDown={handleAddCustomSkill}
            placeholder="Type skill & press Enter"
            className="w-full px-4 py-3 border-2 border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />

          {customError && (
            <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
              <AlertCircle size={12} /> {customError}
            </p>
          )}
        </div>
      )}

      {/* ================= MAIN ERROR ================= */}
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-red-500 text-xs mt-2 flex items-center gap-1"
        >
          <AlertCircle size={12} /> {error}
        </motion.p>
      )}
    </div>
  );
};

export default SkillsSelector;
