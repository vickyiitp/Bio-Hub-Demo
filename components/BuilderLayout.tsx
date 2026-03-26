"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Layers, Link as LinkIcon, BarChart3, Settings } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface BuilderLayoutProps {
  children: React.ReactNode;
  preview: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function BuilderLayout({
  children,
  preview,
  activeTab,
  setActiveTab,
}: BuilderLayoutProps) {
  const tabs = [
    { id: "links", label: "Links", icon: LinkIcon },
    { id: "themes", label: "Themes", icon: Layers },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
  ];

  return (
    <div className="flex h-screen w-full bg-[#f8fafc] overflow-hidden">
      {/* Sidebar Navigation */}
      <div className="w-20 bg-white border-r border-slate-200 flex flex-col items-center py-8 gap-8">
        <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">
          B
        </div>
        <nav className="flex flex-col gap-4 flex-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "p-3 rounded-xl transition-all duration-200 relative group",
                activeTab === tab.id
                  ? "bg-indigo-50 text-indigo-600"
                  : "text-slate-400 hover:text-slate-600 hover:bg-slate-50"
              )}
            >
              <tab.icon size={24} />
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeTabIndicator"
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-indigo-600 rounded-r-full"
                />
              )}
              {/* Tooltip */}
              <div className="absolute left-16 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                {tab.label}
              </div>
            </button>
          ))}
        </nav>
        <button className="p-3 text-slate-400 hover:text-slate-600 rounded-xl transition-all">
          <Settings size={24} />
        </button>
      </div>

      {/* Editor Panel */}
      <div className="flex-1 max-w-[450px] bg-white border-r border-slate-200 flex flex-col overflow-hidden">
        <header className="px-6 py-6 border-b border-slate-100 flex items-center justify-between">
          <h1 className="text-xl font-semibold capitalize text-slate-900">{activeTab}</h1>
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
              Live Preview
            </span>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.2 }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Preview Panel */}
      <div className="flex-[1.5] bg-[#f1f5f9] flex items-center justify-center p-8 relative overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-200/30 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[30%] h-[30%] bg-pink-200/20 blur-[100px] rounded-full" />

        <div className="w-full h-full flex items-center justify-center scale-90 lg:scale-100">
          {preview}
        </div>

        {/* Floating Actions */}
        <div className="absolute bottom-8 right-8 flex gap-3">
          <button className="px-5 py-2.5 bg-white shadow-sm border border-slate-200 rounded-full font-medium text-slate-700 hover:shadow-md transition-all active:scale-95">
            Share
          </button>
          <button className="px-5 py-2.5 bg-indigo-600 text-white shadow-lg shadow-indigo-200 rounded-full font-medium hover:bg-indigo-700 transition-all active:scale-95">
            Publish
          </button>
        </div>
      </div>
    </div>
  );
}
