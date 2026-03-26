"use client";

import React from "react";
import { motion } from "framer-motion";
import { themes, type ThemeType } from "@/utils/themes";
import { Check } from "lucide-react";

interface ThemeSelectorProps {
  currentTheme: string;
  setTheme: (theme: string) => void;
}

export default function ThemeSelector({ currentTheme, setTheme }: ThemeSelectorProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-2">Select Theme</h2>
      <div className="grid grid-cols-1 gap-4">
        {(Object.keys(themes) as ThemeType[]).map((themeId) => {
          const theme = themes[themeId];
          const isSelected = currentTheme === themeId;

          return (
            <button
              key={themeId}
              onClick={() => setTheme(themeId)}
              className={`relative overflow-hidden group p-1 transition-all rounded-[20px] ${
                isSelected ? "ring-2 ring-indigo-600 ring-offset-2" : "ring-1 ring-slate-200 hover:ring-indigo-300"
              }`}
            >
              <div
                className="w-full aspect-[4/3] rounded-2xl flex flex-col p-4 relative"
                style={{ background: theme.colors.background }}
              >
                {/* Theme Preview Cards */}
                <div className="mt-auto space-y-2">
                  <div
                    className="w-full h-4 rounded-lg flex items-center px-2 opacity-80"
                    style={{
                      backgroundColor: theme.colors.card,
                      borderRadius: theme.styles.borderRadius,
                      border: `${theme.styles.borderWidth} solid ${theme.colors.border}`,
                      boxShadow: theme.styles.boxShadow,
                    }}
                  >
                    <div className="w-2 h-2 rounded-full opacity-50" style={{ backgroundColor: theme.colors.text }} />
                  </div>
                  <div
                    className="w-3/4 h-4 rounded-lg flex items-center px-2 opacity-80"
                    style={{
                      backgroundColor: theme.colors.card,
                      borderRadius: theme.styles.borderRadius,
                      border: `${theme.styles.borderWidth} solid ${theme.colors.border}`,
                      boxShadow: theme.styles.boxShadow,
                    }}
                  >
                   <div className="w-2 h-2 rounded-full opacity-50" style={{ backgroundColor: theme.colors.text }} />
                  </div>
                </div>

                <div className="absolute top-4 left-4">
                  <div
                    className="text-xs font-bold px-2 py-1 rounded"
                    style={{ backgroundColor: theme.colors.primary, color: theme.colors.background }}
                  >
                    {theme.name}
                  </div>
                </div>

                {isSelected && (
                  <div className="absolute top-4 right-4 bg-indigo-600 text-white p-1 rounded-full shadow-lg">
                    <Check size={14} />
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
