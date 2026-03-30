"use client";

import React, { useState, useEffect } from "react";
import BuilderLayout from "@/components/BuilderLayout";
import MobilePreview from "@/components/MobilePreview";
import LinkManager from "@/components/LinkManager";
import ThemeSelector from "@/components/ThemeSelector";
import AnalyticsPanel from "@/components/AnalyticsPanel";
import { type AppState, defaultState } from "@/utils/storage";
import { fetchAppState, saveAppStateToDB, checkAdminPassword } from "../actions";

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  
  const [state, setState] = useState<AppState | null>(null);
  const [activeTab, setActiveTab] = useState("links");
  const [isSaving, setIsSaving] = useState(false);

  // Load state on mount if authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchAppState().then((saved) => {
        if (saved) {
          setState(saved);
        } else {
          setState(defaultState);
        }
      });
    }
  }, [isAuthenticated]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const valid = await checkAdminPassword(password);
    if (valid) {
      setIsAuthenticated(true);
      setAuthError("");
    } else {
      setAuthError("Invalid password");
    }
  };

  const handleSave = async () => {
    if (state) {
      setIsSaving(true);
      await saveAppStateToDB(state);
      setIsSaving(false);
      alert("Saved successfully!");
    }
  };

  if (!isAuthenticated) return (
    <div className="h-screen w-full flex items-center justify-center bg-slate-50">
      <form onSubmit={handleLogin} className="flex flex-col items-center gap-4 bg-white p-8 rounded-2xl shadow-sm border border-slate-100 min-w-[320px]">
        <h2 className="font-bold text-xl text-slate-800">Admin Login</h2>
        <input 
          type="password" 
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Enter password"
          className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-blue-500 text-black text-center"
        />
        {authError && <p className="text-red-500 text-sm">{authError}</p>}
        <button type="submit" className="w-full py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-900 font-medium">
          Login
        </button>
      </form>
    </div>
  );

  if (!state) return (
    <div className="h-screen w-full flex items-center justify-center bg-slate-50">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
        <p className="text-slate-500 font-medium font-mono text-sm">LOADING STORED STATE...</p>
      </div>
    </div>
  );

  const setLinks = (links: any) => setState({ ...state, links });
  const setTheme = (theme: string) => setState({ ...state, theme });
  const setProfile = (profile: any) => setState({ ...state, profile });

  return (
    <div className="relative">
      <div className="absolute top-4 right-4 z-50">
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-full font-medium shadow-sm transition-all shadow-indigo-600/20"
        >
          {isSaving ? "Saving..." : "Save Changes"}
        </button>
      </div>

      <BuilderLayout
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        preview={<MobilePreview state={state} />}
      >
        {activeTab === "links" && (
          <div className="space-y-8 pb-10 mt-12">
            {/* Profile Editor */}
            <div className="p-6 bg-slate-50 border border-slate-100 rounded-3xl space-y-4">
              <div className="flex items-center gap-4">
                <div className="relative group cursor-pointer flex-shrink-0">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-sm transition-transform group-hover:scale-105 bg-slate-200">
                    <img src={state.profile.avatar} alt="Avatar" className="w-full h-full object-cover" />
                  </div>
                  <div className="absolute inset-0 bg-black/20 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                     <span className="text-[10px] text-white font-bold">CHANGE</span>
                  </div>
                </div>
                <div className="flex-1 space-y-2">
                  <input
                    type="text"
                    className="w-full bg-transparent font-bold text-lg text-slate-800 border-b border-transparent hover:border-slate-200 focus:border-indigo-400 focus:outline-none transition-colors"
                    value={state.profile.name}
                    onChange={(e) => setProfile({ ...state.profile, name: e.target.value })}
                    placeholder="Your Name"
                  />
                  <input
                    type="text"
                    className="w-full bg-transparent text-sm text-slate-500 border-b border-transparent hover:border-slate-200 focus:border-indigo-400 focus:outline-none transition-colors"
                    value={state.profile.bio}
                    onChange={(e) => setProfile({ ...state.profile, bio: e.target.value })}
                    placeholder="Enter a short bio or tagline"
                  />
                  <input
                    type="text"
                    className="w-full bg-transparent text-xs text-indigo-500 border-b border-transparent hover:border-slate-200 focus:border-indigo-400 focus:outline-none transition-colors"
                    value={state.profile.avatar}
                    onChange={(e) => setProfile({ ...state.profile, avatar: e.target.value })}
                    placeholder="Avatar Image URL"
                  />
                </div>
              </div>
            </div>

            <LinkManager links={state.links} setLinks={setLinks} />
          </div>
        )}

        {activeTab === "themes" && (
          <div className="mt-12">
            <ThemeSelector currentTheme={state.theme} setTheme={setTheme} />        
          </div>
        )}

        {activeTab === "analytics" && (
          <div className="mt-12">
            <AnalyticsPanel links={state.links} />
          </div>
        )}
      </BuilderLayout>
    </div>
  );
}