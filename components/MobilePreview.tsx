"use client";

import React from "react";
import { motion } from "framer-motion";
import { themes, type ThemeType } from "@/utils/themes";
import type { AppState } from "@/utils/storage";
import {
  Globe,
  Instagram,
  Youtube,
  Twitter,
  Github,
  Mail,
  ExternalLink,
} from "lucide-react";

interface MobilePreviewProps {
  state: AppState;
}

const iconMap: Record<string, any> = {
  globe: Globe,
  instagram: Instagram,
  youtube: Youtube,
  twitter: Twitter,
  github: Github,
  mail: Mail,
};

export default function MobilePreview({ state }: MobilePreviewProps) {
  const currentTheme = themes[state.theme as ThemeType] || themes.glassmorphism;
  const { colors, styles } = currentTheme;

  const getBackgroundStyle = () => {
    if (colors.background.includes("gradient")) {
      return { background: colors.background };
    }
    return { backgroundColor: colors.background };
  };

  return (
    <div className="relative group">
      {/* Phone Frame */}
      <div className="relative w-[340px] h-[680px] bg-[#000000] rounded-[3rem] p-3 shadow-[0_0_0_8px_#1e293b,0_20px_50px_rgba(0,0,0,0.15)] overflow-hidden border-[6px] border-[#1e293b]">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-[#1e293b] rounded-b-2xl z-50 flex items-center justify-center">
          <div className="w-10 h-1.5 bg-slate-700 rounded-full" />
        </div>

        {/* Content Area */}
        <div
          className="w-full h-full rounded-[2.2rem] overflow-y-auto custom-scrollbar p-6 pt-12 flex flex-col items-center transition-all duration-500"
          style={getBackgroundStyle()}
        >
          {/* Avatar */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            key={state.profile.avatar}
            className="mb-4"
          >
            <div
              className="w-24 h-24 rounded-full border-2 p-1 overflow-hidden bg-white/10"
              style={{ borderColor: colors.primary }}
            >
              <img
                src={state.profile.avatar}
                alt={state.profile.name}
                className="w-full h-full object-cover rounded-full"
              />
            </div>
          </motion.div>

          {/* Profile Name */}
          <motion.h1
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            key={state.profile.name}
            className="text-xl font-bold mb-1 text-center"
            style={{ color: colors.text, fontFamily: styles.fontFamily }}
          >
            @{state.profile.name.toLowerCase().replace(/\s+/g, "")}
          </motion.h1>

          <motion.p
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            key={state.profile.bio}
            className="text-sm opacity-80 mb-8 text-center max-w-[240px]"
            style={{ color: colors.text, fontFamily: styles.fontFamily }}
          >
            {state.profile.bio}
          </motion.p>

          {/* Links List */}
          <div className="w-full flex flex-col gap-4 mb-10 text-slate-100">
            {state.links.map((link, index) => {
              const Icon = iconMap[link.icon as string] || Globe;
              return (
                <motion.a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full p-4 flex items-center justify-between group/link transition-all duration-300 ${styles.blur || ""}`}
                  style={{
                    backgroundColor: colors.card,
                    borderRadius: styles.borderRadius,
                    border: `${styles.borderWidth} solid ${colors.border}`,
                    color: colors.text,
                    boxShadow: styles.boxShadow,
                    fontFamily: styles.fontFamily,
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-white/10 group-hover/link:bg-white/20 transition-colors">
                      <Icon size={20} />
                    </div>
                    <span className="font-semibold">{link.title}</span>
                  </div>
                  <ExternalLink
                    size={16}
                    className="opacity-0 group-hover/link:opacity-100 transition-opacity"
                  />
                </motion.a>
              );
            })}
          </div>

          {/* Footer */}
          <div className="mt-auto pt-4 pb-2">
            <div className="flex items-center gap-1 opacity-50 text-[10px] font-medium" style={{ color: colors.text }}>
              <span>POWERED BY</span>
              <span className="font-bold">BIOHUB</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
