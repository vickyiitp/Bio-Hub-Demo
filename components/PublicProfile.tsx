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

interface PublicProfileProps {
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

export default function PublicProfile({ state }: PublicProfileProps) {
  const currentTheme = themes[state.theme as ThemeType] || themes.glassmorphism;
  const { colors, styles } = currentTheme;

  const getBackgroundStyle = () => {
    if (colors.background.includes("gradient")) {
      return { background: colors.background };
    }
    return { backgroundColor: colors.background };
  };

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center py-12 px-6 transition-all duration-500"
      style={getBackgroundStyle()}
    >
      <div className="w-full max-w-lg flex flex-col items-center">
        {/* Avatar */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          key={state.profile.avatar}
          className="mb-6"
        >
          <div
            className="w-28 h-28 rounded-full border-2 p-1 overflow-hidden bg-white/10"
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
          className="text-2xl font-bold mb-2 text-center"
          style={{ color: colors.text, fontFamily: styles.fontFamily }}
        >
          @{state.profile.name.toLowerCase().replace(/\s+/g, "")}
        </motion.h1>

        <motion.p
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          key={state.profile.bio}
          className="text-base opacity-80 mb-10 text-center"
          style={{ color: colors.text, fontFamily: styles.fontFamily }}
        >
          {state.profile.bio}
        </motion.p>

        {/* Links List */}
        <div className="w-full flex flex-col gap-4 mb-16 text-slate-100">
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
                    <Icon size={24} />
                  </div>
                  <span className="font-semibold text-lg">{link.title}</span>
                </div>
                <ExternalLink
                  size={20}
                  className="opacity-0 group-hover/link:opacity-100 transition-opacity"
                />
              </motion.a>
            );
          })}
        </div>

        {/* Footer */}
        <div className="mt-auto pt-8 pb-4">
          <div className="flex items-center gap-1 opacity-50 text-xs font-medium" style={{ color: colors.text }}>
            <span>POWERED BY</span>
            <span className="font-bold">BIOHUB</span>
          </div>
        </div>
      </div>
    </div>
  );
}