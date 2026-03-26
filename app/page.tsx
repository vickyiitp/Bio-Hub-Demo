"use client";

import React, { useState, useEffect } from "react";
import BuilderLayout from "@/components/BuilderLayout";
import MobilePreview from "@/components/MobilePreview";
import LinkManager from "@/components/LinkManager";
import ThemeSelector from "@/components/ThemeSelector";
import AnalyticsPanel from "@/components/AnalyticsPanel";
import { loadState, saveState, type AppState, defaultState } from "@/utils/storage";

export default function Home() {
  const [state, setState] = useState<AppState | null>(null);
  const [activeTab, setActiveTab] = useState("links");

  // Load state on mount
  useEffect(() => {
    const saved = loadState();
    setState(saved);
  }, []);

  // Save state on change
  useEffect(() => {
    if (state) {
      saveState(state);
    }
  }, [state]);

  if (!state) return (
    <div className="h-screen w-full flex items-center justify-center bg-slate-50">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
        <p className="text-slate-500 font-medium font-mono text-sm">LOADING BIOHUB...</p>
      </div>
    </div>
  );

  const setLinks = (links: any) => setState({ ...state, links });
  const setTheme = (theme: string) => setState({ ...state, theme });
  const setProfile = (profile: any) => setState({ ...state, profile });

  return (
    <BuilderLayout
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      preview={<MobilePreview state={state} />}
    >
      {activeTab === "links" && (
        <div className="space-y-8 pb-10">
          {/* Profile Editor */}
          <div className="p-6 bg-slate-50 border border-slate-100 rounded-3xl space-y-4">
            <div className="flex items-center gap-4">
              <div className="relative group cursor-pointer">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-sm transition-transform group-hover:scale-105">
                  <img src={state.profile.avatar} alt="Avatar" className="w-full h-full object-cover" />
                </div>
                <div className="absolute inset-0 bg-black/20 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                   <span className="text-[10px] text-white font-bold">CHANGE</span>
                </div>
              </div>
              <div className="flex-1 space-y-1">
                <input
                  type="text"
                  className="w-full bg-transparent font-bold text-lg text-slate-800 focus:outline-none focus:bg-white/50 px-1 rounded"
                  value={state.profile.name}
                  onChange={(e) => setProfile({ ...state.profile, name: e.target.value })}
                  placeholder="Your Name"
                />
                <input
                  type="text"
                  className="w-full bg-transparent text-sm text-slate-500 focus:outline-none focus:bg-white/50 px-1 rounded"
                  value={state.profile.bio}
                  onChange={(e) => setProfile({ ...state.profile, bio: e.target.value })}
                  placeholder="Enter a short bio or tagline"
                />
              </div>
            </div>
          </div>

          <LinkManager links={state.links} setLinks={setLinks} />
        </div>
      )}

      {activeTab === "themes" && (
        <ThemeSelector currentTheme={state.theme} setTheme={setTheme} />
      )}

      {activeTab === "analytics" && (
        <AnalyticsPanel links={state.links} />
      )}
    </BuilderLayout>
  );
}
