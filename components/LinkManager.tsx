"use client";

import React, { useState } from "react";
import { 
  Plus, 
  GripVertical, 
  Trash2, 
  ExternalLink,
  Youtube,
  Instagram,
  Twitter,
  Github,
  Mail,
  Globe
} from "lucide-react";
import { motion, Reorder } from "framer-motion";
import type { LinkData } from "@/utils/storage";

interface LinkManagerProps {
  links: LinkData[];
  setLinks: (links: LinkData[]) => void;
}

const iconOptions = [
  { value: "globe", label: "Website", icon: Globe },
  { value: "instagram", label: "Instagram", icon: Instagram },
  { value: "youtube", label: "YouTube", icon: Youtube },
  { value: "twitter", label: "Twitter", icon: Twitter },
  { value: "github", label: "GitHub", icon: Github },
  { value: "mail", label: "Email", icon: Mail },
];

export default function LinkManager({ links, setLinks }: LinkManagerProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [newLink, setNewLink] = useState({ title: "", url: "", icon: "globe" });

  const addLink = () => {
    if (!newLink.title || !newLink.url) return;
    const link: LinkData = {
      id: Math.random().toString(36).substr(2, 9),
      title: newLink.title,
      url: newLink.url.startsWith("http") ? newLink.url : `https://${newLink.url}`,
      icon: newLink.icon,
      clicks: 0,
    };
    setLinks([...links, link]);
    setNewLink({ title: "", url: "", icon: "globe" });
    setIsAdding(false);
  };

  const removeLink = (id: string) => {
    setLinks(links.filter((l) => l.id !== id));
  };

  const updateLink = (id: string, updates: Partial<LinkData>) => {
    setLinks(links.map((l) => (l.id === id ? { ...l, ...updates } : l)));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-sm font-medium text-slate-500 uppercase tracking-wider">Your Links</h2>
        {!isAdding && (
          <button
            onClick={() => setIsAdding(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-all active:scale-95"
          >
            <Plus size={16} />
            Add Link
          </button>
        )}
      </div>

      {isAdding && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-white border-2 border-indigo-100 rounded-2xl shadow-sm space-y-4"
        >
          <div className="grid grid-cols-1 gap-4">
            <input
              type="text"
              placeholder="Link Title (e.g. My Portfolio)"
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm"
              value={newLink.title}
              onChange={(e) => setNewLink({ ...newLink, title: e.target.value })}
            />
            <input
              type="text"
              placeholder="URL (e.g. yoursite.com)"
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm"
              value={newLink.url}
              onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
            />
          </div>
          
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
            {iconOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setNewLink({ ...newLink, icon: opt.value })}
                className={`p-2 rounded-lg border flex-shrink-0 transition-all ${
                  newLink.icon === opt.value
                    ? "border-indigo-500 bg-indigo-50 text-indigo-600 shadow-sm"
                    : "border-slate-200 text-slate-400 hover:border-slate-300 hover:bg-slate-50"
                }`}
              >
                <opt.icon size={18} />
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 pt-2">
            <button
              onClick={addLink}
              disabled={!newLink.title || !newLink.url}
              className="flex-1 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              Save Link
            </button>
            <button
              onClick={() => setIsAdding(false)}
              className="px-4 py-2 bg-slate-100 text-slate-600 text-sm font-semibold rounded-xl hover:bg-slate-200 transition-all"
            >
              Cancel
            </button>
          </div>
        </motion.div>
      )}

      <Reorder.Group axis="y" values={links} onReorder={setLinks} className="space-y-4">
        {links.map((link) => {
          const Icon = iconOptions.find(o => o.value === link.icon)?.icon || Globe;
          return (
            <Reorder.Item
              key={link.id}
              value={link}
              className="bg-white border border-slate-200 p-4 rounded-2xl shadow-sm hover:shadow-md transition-shadow group cursor-default"
            >
              <div className="flex items-center gap-4">
                <div className="text-slate-300 cursor-grab active:cursor-grabbing hover:text-slate-500 transition-colors">
                  <GripVertical size={20} />
                </div>
                
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <Icon size={16} className="text-indigo-600" />
                    <input
                      type="text"
                      className="font-semibold text-slate-800 focus:outline-none focus:bg-slate-50 px-1 rounded transition-colors w-full"
                      value={link.title}
                      onChange={(e) => updateLink(link.id, { title: e.target.value })}
                    />
                  </div>
                  <div className="flex items-center gap-2 ml-6 text-xs text-slate-400 truncate max-w-[200px]">
                    <span className="truncate italic">{link.url}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
                  >
                    <ExternalLink size={16} />
                  </a>
                  <button
                    onClick={() => removeLink(link.id)}
                    className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </Reorder.Item>
          );
        })}
      </Reorder.Group>

      {links.length === 0 && !isAdding && (
        <div className="text-center py-12 border-2 border-dashed border-slate-200 rounded-3xl">
          <p className="text-slate-400 text-sm">No links added yet. Click &quot;Add Link&quot; to start.</p>
        </div>
      )}
    </div>
  );
}
